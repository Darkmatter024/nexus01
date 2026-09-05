#Requires -Version 5.1
<#
  tools/stamp.ps1 - record a device adjudication in VERIFIED, and commit it.

  VERIFIED IS OWNER-ONLY. RUN IT FROM YOUR OWN TERMINAL.

  Why your terminal specifically, and not just "because the rule says so":
  tools/hooks/phantom-guard.js blocks any commit that includes VERIFIED unless the environment
  carries PHANTOM_GUARD_VIA=githook. An agent's commit is intercepted by the PreToolUse hook, which
  runs in a process spawned BEFORE the agent's shell exists, so it cannot set that variable. Your
  terminal commit skips PreToolUse entirely and runs tools/githooks/pre-commit, which sets it. That
  is the two-key property. It needs `git config core.hooksPath tools/githooks` set in this clone.

  ! THE ORDER OF LINES IN VERIFIED IS LOAD-BEARING - THIS IS THE WHOLE REASON THIS SCRIPT EXISTS.
    The guard reads the FIRST WHITESPACE-DELIMITED TOKEN OF THE ENTIRE FILE:
        const verifiedToken = (verified || '').split(/\s+/)[0] || '';
        if (verifiedToken !== oldVersion) { block }
    and compares it to `git show HEAD:version.json`. So the newest adjudication must be line 1.
    Put an older version first and the next version.json bump is blocked with a message that does
    not explain why. This script always PREPENDS.

  A FAILED stamp is not a pass. It records that the owner put the version on a phone and ruled on
  it, which is the only question the gate asks. It does not license promoting that version.
  (Owner ruling 2026-09-03, quoted in phantom-guard.js.)

  Usage:
    .\tools\stamp.ps1 VERIFIED                     stamp version.json's current version as passed
    .\tools\stamp.ps1 FAILED                       stamp it as failed; the next ship is its fix
    .\tools\stamp.ps1 FAILED -Version phantom-v1.14.578 -Note "blockers cell counted a zero"
    .\tools\stamp.ps1 VERIFIED -DryRun             show the resulting file, write nothing
#>
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true, Position = 0)]
  [ValidateSet('VERIFIED', 'FAILED')]
  [string]$Outcome,

  [string]$Version,
  [string]$Note,
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

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

function Stop-Stamp {
  param([string]$Reason)
  Write-Host ''
  Write-Host "STOP: $Reason" -ForegroundColor Red
  Write-Host 'VERIFIED was not changed.' -ForegroundColor Red
  exit 1
}

$VerifiedFile = Join-Path $RepoRoot 'VERIFIED'

# ---- Which version are we adjudicating? Default to what version.json currently carries. ----
if (-not $Version) {
  try { $Version = (Get-Content -Raw (Join-Path $RepoRoot 'version.json') | ConvertFrom-Json).version }
  catch { Stop-Stamp "could not read version.json: $($_.Exception.Message)" }
}
if ($Version -notmatch '^phantom-v\d+\.\d+\.\d+$') {
  Stop-Stamp "version '$Version' is not of the form phantom-vMAJOR.MINOR.PATCH"
}

# ---- Guard: stamps are committed on main. ----
$branch = (Invoke-Git @('rev-parse', '--abbrev-ref', 'HEAD')).Trim()
if ($branch -ne 'main') {
  Stop-Stamp "HEAD is on '$branch', not main. Stamps are committed on main."
}

# ---- Guard: hooksPath must be wired, or this commit is ungated AND the guard cannot allow it. ----
$hooksPath = (Invoke-Git @('config', '--get', 'core.hooksPath') -AllowFail)
if (-not $hooksPath -or $hooksPath.Trim() -ne 'tools/githooks') {
  Stop-Stamp 'core.hooksPath is not tools/githooks. Run:  git config core.hooksPath tools/githooks'
}

# ---- Read the existing register. ----
$existing = @()
if (Test-Path $VerifiedFile) {
  $existing = @(Get-Content $VerifiedFile | Where-Object { $_.Trim().Length -gt 0 })
}

# ---- Guard: refuse a duplicate adjudication of the same version. ----
$already = $existing | Where-Object { $_.Trim().Split(' ')[0] -eq $Version } | Select-Object -First 1
if ($already) {
  Stop-Stamp "$Version is already adjudicated in VERIFIED as: '$already'. Edit it by hand if it is genuinely wrong."
}

# ---- Build the new line. Token 0 must be the version - nothing may precede it. ----
$line = "$Version $Outcome"
if ($Note) { $line = "$line - $Note" }

# NEWEST FIRST. See the header - the guard reads token[0] of the whole file.
$new = @($line) + $existing

Write-Host 'VERIFIED will become:' -ForegroundColor Cyan
$new | ForEach-Object { Write-Host "  $_" }
Write-Host ''
Write-Host "Gate token (must equal HEAD's version.json on the next bump): $($new[0].Split(' ')[0])" -ForegroundColor Cyan

if ($DryRun) {
  Write-Host 'DRY RUN - nothing written.' -ForegroundColor Yellow
  exit 0
}

# -Encoding ascii, deliberately: PowerShell 5.1's utf8 writes a BOM. The content is pure ASCII, and
# a BOM ahead of token 0 is exactly the kind of invisible breakage this file must never introduce.
Set-Content -Path $VerifiedFile -Value $new -Encoding ascii

$msg = "stamp: $Version $Outcome"
if ($Note) { $msg = "$msg - $Note" }

Invoke-Git @('add', 'VERIFIED') | Out-Null
try { Invoke-Git @('commit', '-m', $msg) | Out-Null }
catch {
  Write-Host ''
  Write-Host 'The commit was refused. If the message mentions VERIFIED being owner-only, this ran' -ForegroundColor Yellow
  Write-Host 'through the agent path rather than your terminal. VERIFIED is left modified but' -ForegroundColor Yellow
  Write-Host 'uncommitted - inspect with: git diff VERIFIED' -ForegroundColor Yellow
  Stop-Stamp $_.Exception.Message
}

Write-Host ''
Invoke-Git @('log', '-1', '--oneline') | ForEach-Object { Write-Host "  $_" -ForegroundColor Green }
Write-Host ''
Write-Host 'Stamped locally. Push it with:  git push origin main' -ForegroundColor Cyan
if ($Outcome -eq 'FAILED') {
  Write-Host "$Version is recorded as FAILED. That is not a pass - do not promote it. The next ship is its fix." -ForegroundColor Yellow
}
