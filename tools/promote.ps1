#Requires -Version 5.1
<#
  tools/promote.ps1 - THE ONLY PROMOTE PATH.

  Owner ruling 2026-09-05 (OWNER-RULINGS.md): promote is owner-only. Claude Code never moves
  `release`, in any mode, with no session-order exception. This script exists so the owner runs
  one command instead of a four-command chain that has to be typed correctly every time.

  RUN IT FROM YOUR OWN TERMINAL.

  ! That rule is PROCEDURAL, not enforced by this file. Nothing here can tell who invoked it -
    same posture the commit guard states about itself: a seatbelt, not an immobiliser. The
    protection is that the rule is written down and that this is the only sanctioned path.

  What it does, and where each step comes from:
    - the promote itself is CLAUDE.md's documented line:
        git checkout release; git merge --ff-only main; git push origin release; git checkout main
    - `;` not `&&` because this box's shell is Windows PowerShell 5.1, where `&&` is a parser
      error that kills the chain before the first git runs, silently.
    - "A promote is a fast-forward or it is a STOP" - --ff-only, and the result is re-checked.
    - forbidden to everyone: any commit on `release`, any non-fast-forward, any --force.
    - "a ship John cannot reach is not a ship" - it confirms the SERVED bytes at the end.

  Usage:
    .\tools\promote.ps1            promote main -> release
    .\tools\promote.ps1 -DryRun    show exactly what would move, change nothing
#>
[CmdletBinding()]
param(
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

# Repo root is this script's parent's parent (tools/promote.ps1 -> repo).
$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $RepoRoot

function Invoke-Git {
  param([Parameter(Mandatory = $true)][string[]]$GitArgs, [switch]$AllowFail)
  $out = & git @GitArgs
  if ($LASTEXITCODE -ne 0 -and -not $AllowFail) {
    throw "git $($GitArgs -join ' ') failed with exit code $LASTEXITCODE"
  }
  return $out
}

function Stop-Promote {
  param([string]$Reason)
  Write-Host ''
  Write-Host "STOP: $Reason" -ForegroundColor Red
  Write-Host 'Nothing was moved.' -ForegroundColor Red
  exit 1
}

Write-Host "PHANTOM promote - repo $RepoRoot" -ForegroundColor Cyan
Write-Host ''

# ---- Guard 1: clean working tree. A promote carries committed work only. ----
$dirty = Invoke-Git @('status', '--porcelain', '--untracked-files=no')
if ($dirty) {
  Write-Host 'Uncommitted tracked changes:' -ForegroundColor Yellow
  $dirty | ForEach-Object { Write-Host "  $_" }
  Stop-Promote 'working tree is not clean. Commit or stash first.'
}

# ---- Guard 2: you must be on main. Never surprise-switch the owner's branch. ----
$branch = (Invoke-Git @('rev-parse', '--abbrev-ref', 'HEAD')).Trim()
if ($branch -ne 'main') {
  Stop-Promote "HEAD is on '$branch', not main. Checkout main yourself, then re-run."
}

# ---- Guard 3: main must already be pushed. Otherwise release would carry commits origin/main
#      does not have, and the served branch would lead the reviewed one. ----
Invoke-Git @('fetch', '--quiet', 'origin') | Out-Null
$localMain = (Invoke-Git @('rev-parse', 'main')).Trim()
$originMain = (Invoke-Git @('rev-parse', 'origin/main')).Trim()
if ($localMain -ne $originMain) {
  Stop-Promote "main ($($localMain.Substring(0,7))) does not match origin/main ($($originMain.Substring(0,7))). Push main first."
}

# ---- What would move ----
$pending = Invoke-Git @('log', '--oneline', 'release..main')
if (-not $pending) {
  Write-Host 'release is already level with main. Nothing to promote.' -ForegroundColor Green
  exit 0
}
Write-Host 'Commits this promote would publish:' -ForegroundColor Cyan
$pending | ForEach-Object { Write-Host "  $_" }
Write-Host ''

# ---- Guard 4: it must be a fast-forward. release must be an ancestor of main. ----
Invoke-Git @('merge-base', '--is-ancestor', 'release', 'main') -AllowFail | Out-Null
if ($LASTEXITCODE -ne 0) {
  Stop-Promote 'release is NOT an ancestor of main - this would not be a fast-forward.'
}

if ($DryRun) {
  Write-Host 'DRY RUN - nothing moved.' -ForegroundColor Yellow
  exit 0
}

# ---- The promote. CLAUDE.md's documented line, with each step checked. ----
$before = (Invoke-Git @('rev-parse', 'release')).Trim()
try {
  Invoke-Git @('checkout', 'release') | Out-Null
  Invoke-Git @('merge', '--ff-only', 'main') | Out-Null
  Invoke-Git @('push', 'origin', 'release') | Out-Null
}
catch {
  Invoke-Git @('checkout', 'main') -AllowFail | Out-Null
  Stop-Promote "promote failed: $($_.Exception.Message)"
}
finally {
  # Always land back on main, even if something above threw.
  $now = (Invoke-Git @('rev-parse', '--abbrev-ref', 'HEAD')).Trim()
  if ($now -ne 'main') { Invoke-Git @('checkout', 'main') -AllowFail | Out-Null }
}

$after = (Invoke-Git @('rev-parse', 'release')).Trim()
Write-Host ''
Write-Host "release $($before.Substring(0,7)) -> $($after.Substring(0,7))" -ForegroundColor Green
Invoke-Git @('log', '-1', '--oneline') | ForEach-Object { Write-Host "  $_" }

# ---- Confirm the SERVED bytes. A ship you cannot reach is not a ship. ----
Write-Host ''
# PowerShell 5.1 does not negotiate TLS 1.2 by default; github.io refuses anything older, and the
# failure surfaces as an unhelpful 'could not create SSL/TLS secure channel'.
try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}
Write-Host 'Checking served version (Pages may take a minute to rebuild)...' -ForegroundColor Cyan
$expected = $null
try { $expected = (Get-Content -Raw version.json | ConvertFrom-Json).version } catch {}

$served = $null
for ($i = 1; $i -le 20; $i++) {
  try {
    $u = "https://darkmatter024.github.io/phantom/version.json?cb=$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())-$i"
    $served = (Invoke-RestMethod -Uri $u -TimeoutSec 20).version
  }
  catch { $served = $null }
  if ($served -eq $expected) { break }
  Start-Sleep -Seconds 15
}

if ($served -eq $expected) {
  Write-Host "SERVED: $served" -ForegroundColor Green
  Write-Host 'Promoted and reachable. Verify on the phone, then stamp with tools\stamp.ps1.'
}
else {
  Write-Host "Expected $expected but live still serves $served after ~5 minutes." -ForegroundColor Yellow
  Write-Host 'The push succeeded - this is Pages lagging or failing to build. Check the repo Actions/Pages status.'
}
