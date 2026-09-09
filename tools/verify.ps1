#Requires -Version 5.1
<#
  tools/verify.ps1 - THE ONE-COMMAND ADJUDICATION. Owner-only. Run it from your own terminal.

  What it fuses: stamp.ps1 (the register line) + git push main + promote.ps1 (release level with
  main, served bytes confirmed). One keystroke where there were two commands and a push between
  them. What it does NOT fuse: your eyes. The script cannot see the phone. PASS is your attestation
  that the version named was on the glass and did what its evidence table said; FAIL is the same
  attestation with the opposite finding. Both are adjudications. Both are recorded. Only a PASS
  moves anything.

  THE ORDER IT ENFORCES (owner ruling C, 2026-09-08 - tools/promote.ps1 Guard 4 header):
      .\tools\promote.ps1   ->   the phone (Pages serves release)   ->   .\tools\verify.ps1 <v> PASS|FAIL
  So the version you adjudicate is the one release ALREADY carries. The NOT-SERVED guard refuses
  a version release has never carried, because a stamp on unserved bytes is exactly how .581 was
  stamped VERIFIED off a dry-run misread on 2026-09-08 with no phone having seen it. That guard is
  CLAUDE.md's standing rule - "never stamps a version the served bytes have not carried" - made
  mechanical instead of remembered.

  THERE IS NO -DryRun IN THIS SCRIPT, BY DESIGN. Two dry-runs in the sibling scripts were read as
  real runs on 2026-09-06 and 2026-09-08 (c6d4931, 14028c8). A gate that can print reassuring text
  without doing the thing is a gate that will one day be believed. Every run of this script is
  real, and every run ends with one of these banners:
      PROMOTED <version>          stamped VERIFIED, main pushed, release level with main, SERVED
      RECORDED FAILED <version>   stamped FAILED with your reason, main pushed, release NOT moved
      REFUSED: <GUARD>            nothing written, nothing committed, nothing pushed, nothing moved
      STOPPED AT: <STEP>          a real path broke part-way; the banner says exactly how far it got

  Guards, all evaluated BEFORE anything is written, in this order:
      NO-OUTCOME / NO-VERSION / NO-REASON   the arguments themselves
      BRANCH                HEAD must be main
      HOOKS                 core.hooksPath must be tools/githooks (the two-key property)
      VERSION-MISMATCH      HEAD's version.json must carry the version you named
      DIRTY-TREE            no modified tracked files (untracked files are fine)
      ALREADY-ADJUDICATED   VERIFIED must not already rule on it
      NOT-SERVED            origin/release must carry it (fetched now, not remembered)
      SERVED-BYTES          the Pages URL must serve it right now

  Usage:
      .\tools\verify.ps1 583 PASS
      .\tools\verify.ps1 583 FAIL "strip still reads SYNCED on Build"
      .\tools\verify.ps1 583 PASS "optional note, recorded after the outcome"
  The outcome and the version may be given in either order; PASS/VERIFIED and FAIL/FAILED are
  synonyms. The bare build number is enough.

  Fixture-tested by tools/verify-selftest.ps1 in a throwaway clone. Run it after any edit here.
#>
[CmdletBinding()]
param(
  [Parameter(Position = 0)]
  [string]$First,

  [Parameter(Position = 1)]
  [string]$Second,

  [Parameter(Position = 2)]
  [string]$Reason
)

$ErrorActionPreference = 'Stop'

$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $RepoRoot
$ToolsDir = Join-Path $RepoRoot 'tools'
$VerifiedFile = Join-Path $RepoRoot 'VERIFIED'
$PagesVersionUrl = 'https://darkmatter024.github.io/phantom/version.json'

# PowerShell 5.1 does not negotiate TLS 1.2 by default; github.io refuses anything older.
try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}

function Invoke-Git {
  param([Parameter(Mandatory = $true)][string[]]$GitArgs, [switch]$AllowFail)
  $out = & git @GitArgs
  if ($LASTEXITCODE -ne 0 -and -not $AllowFail) {
    throw "git $($GitArgs -join ' ') failed with exit code $LASTEXITCODE"
  }
  return $out
}

function Write-Banner {
  param([string]$Text, [string]$Color)
  $bar = '=' * ($Text.Length + 10)
  Write-Host ''
  Write-Host "  $bar" -ForegroundColor $Color
  Write-Host "  ==== $Text ====" -ForegroundColor $Color
  Write-Host "  $bar" -ForegroundColor $Color
}

# A refusal happens BEFORE any write, so this line is a fact, not a hope.
function Stop-Refused {
  param([string]$Guard, [string]$Why, [string]$Next)
  Write-Banner "REFUSED: $Guard" 'Red'
  Write-Host "  $Why" -ForegroundColor Red
  Write-Host '  Nothing was written, committed, pushed or moved.' -ForegroundColor Red
  if ($Next) { Write-Host "  Next: $Next" -ForegroundColor Yellow }
  Write-Host ''
  exit 1
}

# A real path broke part-way. Say how far it got, from git and disk, never from a variable.
function Stop-Partial {
  param([string]$Step, [string]$What, [string]$Next)
  Write-Banner "STOPPED AT: $Step" 'Red'
  Write-Host "  $What" -ForegroundColor Red
  $line1 = '(VERIFIED missing)'
  if (Test-Path $VerifiedFile) { $line1 = @(Get-Content $VerifiedFile | Where-Object { $_.Trim().Length -gt 0 })[0] }
  $vstat = @(Invoke-Git @('status', '--porcelain', '--', 'VERIFIED') -AllowFail) -join ' '
  if (-not $vstat) { $vstat = 'clean' }
  Write-Host "  VERIFIED line 1 on disk: $line1   (git status: $vstat)" -ForegroundColor Yellow
  Write-Host "  HEAD: $((Invoke-Git @('log', '-1', '--oneline') -AllowFail) -join ' ')" -ForegroundColor Yellow
  if ($Next) { Write-Host "  Next: $Next" -ForegroundColor Yellow }
  Write-Host ''
  exit 1
}

# The primitives run as CHILD PROCESSES: their own `exit 1` ends them, not this script, and their
# exit code comes back as a value. Start-Process rather than the call operator, deliberately: the
# child shares this console, so its words and colours arrive exactly as if you had typed it, and
# its lines cannot leak into this function's return value. They did, in the first cut - the
# "exit code" came back as forty lines of stamp.ps1's output followed by 0, and every real path
# stopped at STAMP. The selftest caught it before anyone ran it live.
function Invoke-Primitive {
  param([string]$Script, [string[]]$PrimitiveArgs)
  $path = Join-Path $ToolsDir $Script
  if (-not (Test-Path $path)) { throw "$Script is missing from tools/" }
  $argv = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', $path) + @($PrimitiveArgs)
  $quoted = @($argv | ForEach-Object { if ($_ -eq '' -or $_ -match '\s') { '"' + $_ + '"' } else { $_ } })
  $p = Start-Process -FilePath 'powershell.exe' -ArgumentList ($quoted -join ' ') -NoNewWindow -Wait -PassThru
  return [int]$p.ExitCode
}

function Get-LiveVersion {
  try {
    # ${...} deliberately: '?' is a legal variable-name character in PowerShell, so the bare form
    # "$PagesVersionUrl?cb=" reads an empty variable named PagesVersionUrl?cb and every read fails.
    $u = "${PagesVersionUrl}?cb=$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"
    return [pscustomobject]@{ Version = (Invoke-RestMethod -Uri $u -TimeoutSec 20).version; Error = $null }
  }
  catch { return [pscustomobject]@{ Version = $null; Error = $_.Exception.Message } }
}

# ============================================================================================
# ARGUMENTS
# ============================================================================================

# Whichever token is PASS/FAIL is the outcome; the other is the version. Either order works.
$Outcome = $null
$versionArg = $null
foreach ($tok in @($First, $Second)) {
  if ([string]::IsNullOrWhiteSpace($tok)) { continue }
  $t = $tok.Trim().ToUpper()
  if ($t -eq 'PASS' -or $t -eq 'VERIFIED') { $Outcome = 'PASS' }
  elseif ($t -eq 'FAIL' -or $t -eq 'FAILED') { $Outcome = 'FAIL' }
  else { $versionArg = $tok.Trim() }
}
if (-not $Outcome) {
  Stop-Refused 'NO-OUTCOME' 'Say PASS or FAIL. That word is the adjudication.' '.\tools\verify.ps1 583 PASS     or     .\tools\verify.ps1 583 FAIL "what you saw"'
}
if (-not $versionArg) {
  Stop-Refused 'NO-VERSION' 'Name the version that was on the phone. The bare build number is enough.' ".\tools\verify.ps1 583 $Outcome"
}

# A bare build number is the natural thing to type. Same normalisation as stamp.ps1.
$Version = $versionArg
$asInt = 0
if ([int]::TryParse($Version, [ref]$asInt)) { $Version = 'phantom-v1.14.' + $Version }
elseif ($Version -like '1.14.*')  { $Version = 'phantom-v' + $Version }
elseif ($Version -like 'v1.14.*') { $Version = 'phantom-' + $Version }
if ($Version -notmatch '^phantom-v\d+\.\d+\.\d+$') {
  Stop-Refused 'NO-VERSION' "'$versionArg' is not a version. Expected a build number like 583, or phantom-v1.14.583."
}

if ($Reason) { $Reason = $Reason.Trim().Replace('"', "'") }
if ($Outcome -eq 'FAIL' -and -not $Reason) {
  Stop-Refused 'NO-REASON' 'A FAILED stamp without a reason is a ledger line nobody can act on. Say what you saw.' ".\tools\verify.ps1 $Version FAIL `"blank preview, no TRACE line`""
}

$OutcomeWord = 'VERIFIED'
if ($Outcome -eq 'FAIL') { $OutcomeWord = 'FAILED' }

Write-Host ''
Write-Host "VERIFY $Version $Outcome - REAL RUN. This script has no dry-run mode." -ForegroundColor Cyan
Write-Host "  repo $RepoRoot" -ForegroundColor DarkGray

# ============================================================================================
# GUARDS - every one runs before anything is written
# ============================================================================================

# ---- BRANCH ----
$branch = (Invoke-Git @('rev-parse', '--abbrev-ref', 'HEAD')).Trim()
if ($branch -ne 'main') {
  Stop-Refused 'BRANCH' "HEAD is on '$branch', not main. Stamps are committed on main." 'git checkout main, then re-run.'
}

# ---- HOOKS ----
$hooksPath = (Invoke-Git @('config', '--get', 'core.hooksPath') -AllowFail)
if (-not $hooksPath -or "$hooksPath".Trim() -ne 'tools/githooks') {
  Stop-Refused 'HOOKS' 'core.hooksPath is not tools/githooks, so the stamp commit would be ungated.' 'git config core.hooksPath tools/githooks'
}

# ---- VERSION-MISMATCH ----
$headVersion = $null
try { $headVersion = ((@(Invoke-Git @('show', 'HEAD:version.json'))) -join "`n" | ConvertFrom-Json).version }
catch { Stop-Refused 'VERSION-MISMATCH' "could not read HEAD's version.json: $($_.Exception.Message)" }

$verifiedLines = @()
if (Test-Path $VerifiedFile) {
  $verifiedLines = @(Get-Content $VerifiedFile | Where-Object { $_.Trim().Length -gt 0 })
}
function Get-Ruling {
  param([string]$v)
  if (-not $v) { return $null }
  return $verifiedLines | Where-Object { ($_.Trim() -split '[ ]+')[0] -eq $v } | Select-Object -First 1
}

if ($headVersion -ne $Version) {
  $why = "HEAD's version.json carries $headVersion, not $Version. You adjudicate the version main is parked on."
  $priorRuling = Get-Ruling $Version
  if ($priorRuling) { $why = "$why ($Version is already on record: '$priorRuling'.)" }
  Stop-Refused 'VERSION-MISMATCH' $why "If the phone showed $headVersion, re-run with that number. If main has moved past what the phone has, that is the stacking the gate forbids - stop and look."
}

# ---- DIRTY-TREE ----
$dirty = @(Invoke-Git @('status', '--porcelain', '--untracked-files=no') | Where-Object { $_.Trim().Length -gt 0 })
if ($dirty.Count -gt 0) {
  Write-Host ''
  Write-Host 'Modified tracked files:' -ForegroundColor Yellow
  $dirty | ForEach-Object { Write-Host "    $_" -ForegroundColor Yellow }
  Stop-Refused 'DIRTY-TREE' "$($dirty.Count) tracked file(s) modified. promote.ps1 refuses a dirty tree, and it must not refuse AFTER the stamp has landed." 'Commit or stash, then re-run.'
}

# ---- ALREADY-ADJUDICATED ----
$ruling = Get-Ruling $Version
if ($ruling) {
  Stop-Refused 'ALREADY-ADJUDICATED' "VERIFIED already rules on ${Version}: '$ruling'." 'A ruling is corrected by hand, with a reason in the commit - never re-stamped.'
}

# ---- NOT-SERVED ----
try { Invoke-Git @('fetch', '--quiet', 'origin') | Out-Null }
catch { Stop-Refused 'NOT-SERVED' "could not fetch origin: $($_.Exception.Message)" 'Check the connection, then re-run.' }

$servedRaw = @(Invoke-Git @('show', 'origin/release:version.json') -AllowFail)
$servedOk = ($LASTEXITCODE -eq 0)
$servedVersion = $null
if ($servedOk) {
  try { $servedVersion = (($servedRaw -join "`n") | ConvertFrom-Json).version } catch { $servedVersion = $null }
}
if ($servedVersion -ne $Version) {
  $has = 'origin/release has no readable version.json'
  if ($servedVersion) { $has = "origin/release carries $servedVersion" }
  Stop-Refused 'NOT-SERVED' "$has, so no phone has ever run $Version. A stamp here would be the .581 mistake: adjudicating bytes nobody served." 'Promote first: .\tools\promote.ps1 - then look at the phone, then re-run this.'
}

# ---- SERVED-BYTES ----
$live = Get-LiveVersion
if ($live.Version -ne $Version) {
  $saw = "the Pages URL could not be read ($($live.Error))"
  if ($live.Version) { $saw = "Pages serves $($live.Version) right now" }
  Stop-Refused 'SERVED-BYTES' "$saw, not $Version. origin/release carries it, so this is Pages still building, or a misread of SYS on the phone." 'Wait for the Pages build (a few minutes), confirm SYS on the phone names the version, then re-run.'
}

Write-Host "  guards: main, hooks, $Version at HEAD, tree clean, unruled, on origin/release, served by Pages" -ForegroundColor DarkGray

# ============================================================================================
# THE STAMP - both paths
# ============================================================================================

$steps = 2
if ($Outcome -eq 'PASS') { $steps = 4 }

$stampArgs = @($OutcomeWord, '-Version', $Version)
if ($Reason) { $stampArgs += @('-Note', $Reason) }

Write-Host ''
Write-Host "[1/$steps] stamp.ps1 $($stampArgs -join ' ')" -ForegroundColor Cyan
$stampExit = Invoke-Primitive 'stamp.ps1' $stampArgs
if ($stampExit -ne 0) {
  Stop-Partial 'STAMP' "stamp.ps1 exited $stampExit - its own refusal is printed above. Nothing was pushed or moved." 'Fix what it named, then re-run this exact command.'
}

# Assert the stamp from disk and git, not from stamp.ps1's exit code. stamp.ps1 only WARNS when a
# commit carries more than VERIFIED, and that is the one case that must never be pushed.
$diskLine = @(Get-Content $VerifiedFile | Where-Object { $_.Trim().Length -gt 0 })[0]
$diskTokens = @($diskLine.Trim() -split '[ ]+')
$committed = @(Invoke-Git @('show', '--name-only', '--format=', 'HEAD') | Where-Object { $_.Trim().Length -gt 0 })
$stampSha = (Invoke-Git @('rev-parse', '--short', 'HEAD')).Trim()
$stampProven = ($diskTokens.Count -ge 2) -and ($diskTokens[0] -eq $Version) -and ($diskTokens[1] -eq $OutcomeWord) -and
               ($committed.Count -eq 1) -and ($committed[0].Trim() -eq 'VERIFIED')
if (-not $stampProven) {
  Stop-Partial 'STAMP-UNPROVEN' "VERIFIED line 1 is '$diskLine' and HEAD ($stampSha) touches [$($committed -join ', ')]. Expected line 1 to read '$Version $OutcomeWord' and HEAD to carry VERIFIED alone. NOT pushed." 'Inspect: git log -1 --stat ; Get-Content .\VERIFIED -TotalCount 1. Unwind a wrong commit with: git reset --soft HEAD~1'
}

# ============================================================================================
# PUSH main - both paths
# ============================================================================================

Write-Host ''
Write-Host "[2/$steps] git push origin main" -ForegroundColor Cyan
try { Invoke-Git @('push', 'origin', 'main') | Out-Null }
catch {
  Stop-Partial 'PUSH' "the stamp is committed locally ($stampSha) but the push failed: $($_.Exception.Message). release was not moved." 'Finish by hand once the push can succeed:  git push origin main   then, for a PASS:  .\tools\promote.ps1'
}
$originMain = (Invoke-Git @('rev-parse', '--short', 'origin/main')).Trim()

# ============================================================================================
# FAIL path ends here. Nothing is promoted.
# ============================================================================================

if ($Outcome -eq 'FAIL') {
  $relSha = (Invoke-Git @('rev-parse', '--short', 'origin/release')).Trim()
  Write-Banner "RECORDED FAILED $Version" 'Yellow'
  Write-Host "  VERIFIED line 1:  $diskLine" -ForegroundColor Yellow
  Write-Host "  stamp commit:     $stampSha - pushed, origin/main is $originMain" -ForegroundColor Yellow
  Write-Host "  release:          NOT MOVED. origin/release is $relSha and still serves $Version, now on record as FAILED." -ForegroundColor Yellow
  Write-Host '  Next: the next ship is its fix. When that lands on main, promote it:  .\tools\promote.ps1' -ForegroundColor Yellow
  Write-Host ''
  exit 0
}

# ============================================================================================
# PASS path: promote, then prove the served bytes.
# ============================================================================================

$relBefore = (Invoke-Git @('rev-parse', '--short', 'origin/release')).Trim()
Write-Host ''
Write-Host "[3/$steps] promote.ps1" -ForegroundColor Cyan
$promoteExit = Invoke-Primitive 'promote.ps1' @()
if ($promoteExit -ne 0) {
  Stop-Partial 'PROMOTE' "stamped ($stampSha) and pushed, but promote.ps1 exited $promoteExit - its refusal is printed above. origin/release is still $relBefore." 'Fix what it named, then run  .\tools\promote.ps1  by hand. Do not re-run verify.ps1: the stamp is already on record.'
}

Write-Host ''
Write-Host "[4/$steps] served bytes" -ForegroundColor Cyan
Invoke-Git @('fetch', '--quiet', 'origin') -AllowFail | Out-Null
$relAfter = (Invoke-Git @('rev-parse', '--short', 'origin/release')).Trim()
$mainAfter = (Invoke-Git @('rev-parse', '--short', 'origin/main')).Trim()
$level = ($relAfter -eq $mainAfter)
$served = Get-LiveVersion
$servedOkNow = ($served.Version -eq $Version)

$releaseLine = "$relBefore -> $relAfter (level with origin/main)"
if (-not $level) { $releaseLine = "$relBefore -> $relAfter (origin/main is $mainAfter - NOT level, inspect)" }

if ($servedOkNow) { Write-Banner "PROMOTED $Version" 'Green' }
else { Write-Banner "PROMOTED $Version - PAGES NOT CONFIRMED" 'Yellow' }
Write-Host "  VERIFIED line 1:  $diskLine" -ForegroundColor Green
Write-Host "  stamp commit:     $stampSha - pushed, origin/main is $originMain" -ForegroundColor Green
Write-Host "  release:          $releaseLine" -ForegroundColor Green
if ($servedOkNow) {
  Write-Host "  SERVED: $($served.Version)" -ForegroundColor Green
  Write-Host "  Next: nothing is owed on $Version. The next ship may bump version.json." -ForegroundColor Green
}
else {
  $sv = "unreadable ($($served.Error))"
  if ($served.Version) { $sv = $served.Version }
  Write-Host "  SERVED: $sv - expected $Version. The push succeeded; this is Pages lagging or failing to build." -ForegroundColor Yellow
  Write-Host "  Next: confirm later at $PagesVersionUrl - the stamp and the promote are done and are not re-run." -ForegroundColor Yellow
}
Write-Host ''
exit 0
