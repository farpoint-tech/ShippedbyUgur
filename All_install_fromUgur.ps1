<#
.SYNOPSIS
    All_install_fromUgur - Umfassendes Installationsscript für alle Ugur Koc Intune Tools

.DESCRIPTION
    Dieses Script installiert automatisch alle Tools von Ugur Koc für Microsoft Intune Management,
    inklusive aller Voraussetzungen und Abhängigkeiten. Es bietet verschiedene Authentifizierungsoptionen
    und eine benutzerfreundliche Oberfläche.

.PARAMETER InstallMode
    Installationsmodus: 'All' für alle Tools, 'Top3' für wichtigste 3 Tools, 'Essential' für wichtigste Tools, 'Custom' für Auswahl

.PARAMETER AuthMethod
    Authentifizierungsmethode: 'Interactive', 'DeviceCode', 'Certificate'

.PARAMETER SkipPrerequisites
    Überspringt die Installation der Voraussetzungen

.PARAMETER LogPath
    Pfad für die Logdatei (Standard: $env:TEMP\All_install_fromUgur.log)

.EXAMPLE
    .\All_install_fromUgur.ps1
    Installiert die TOP 3 wichtigsten Tools mit interaktiver Authentifizierung

.EXAMPLE
    .\All_install_fromUgur.ps1 -InstallMode All
    Installiert alle verfügbaren Tools

.EXAMPLE
    .\All_install_fromUgur.ps1 -InstallMode Essential -AuthMethod DeviceCode
    Installiert Essential Tools mit Device Code Flow

.NOTES
    Autor: Philipp Schmidt
    Version: 1.0
    Erstellt: August 2025
    Basiert auf Tools von Ugur Koc (Microsoft MVP)
    
    Voraussetzungen:
    - PowerShell 5.1 oder höher (PowerShell 7 empfohlen)
    - Administrator-Rechte
    - Internet-Verbindung
    
    Unterstützte Tools:
    TOP 3 (Höchste Priorität):
    - IntuneManagement (Micke-K) - Umfassendes GUI-Tool für komplette Intune-Verwaltung
    - IntuneAssignmentChecker (Ugur Koc) - Analyse und Audit von Intune-Zuweisungen
    - IntuneMonitoring (Ugur Koc) - Azure Workbook Templates für Intune Monitoring
    
    Essential Tools:
    - TenuVault (Backup & Restore)
    - DeviceOffboardingManager (Geräte-Offboarding)
    - IntuneOffboarding (Erweiterte Offboarding-Scripts)
    
    Standard Tools:
    - Intune (Script-Sammlung)
    - IntuneBrew (macOS App Management)
    - Get-WindowsAutopilotImportGUI (AutoPilot Import)
    
    Advanced Tools:
    - IntuneRBAC (RBAC Management)
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory = $false)]
    [ValidateSet('All', 'Top3', 'Essential', 'Custom')]
    [string]$InstallMode = 'Top3',
    
    [Parameter(Mandatory = $false)]
    [ValidateSet('Interactive', 'DeviceCode', 'Certificate')]
    [string]$AuthMethod = 'Interactive',
    
    [Parameter(Mandatory = $false)]
    [switch]$SkipPrerequisites,
    
    [Parameter(Mandatory = $false)]
    [string]$LogPath = "$env:TEMP\All_install_fromUgur.log"
)

# Globale Variablen
$script:LogPath = $LogPath
$script:StartTime = Get-Date
$script:ErrorCount = 0
$script:SuccessCount = 0

# Farben für die Ausgabe
$Colors = @{
    Success = 'Green'
    Warning = 'Yellow'
    Error = 'Red'
    Info = 'Cyan'
    Header = 'Magenta'
    Highlight = 'White'
}

# Tool-Definitionen (Priorisiert nach Wichtigkeit)
$Tools = @{
    # TOP 3 TOOLS (Höchste Priorität)
    'IntuneManagement' = @{
        Name = 'IntuneManagement'
        Description = 'Umfassendes GUI-Tool für komplette Intune-Verwaltung'
        InstallCommand = 'Custom' # GitHub Clone
        Category = 'Top3'
        Priority = 1
        RequiresPowerShell7 = $false
        RequiresAdmin = $false
        Dependencies = @('Microsoft.Graph')
        GitHub = 'https://github.com/Micke-K/IntuneManagement'
        Author = 'Micke-K'
        Features = @('Complete Intune Management', 'Backup/Restore', 'Bulk Operations', 'Policy Management')
    }
    'IntuneAssignmentChecker' = @{
        Name = 'IntuneAssignmentChecker'
        Description = 'Analyse und Audit von Intune-Zuweisungen'
        InstallCommand = 'Install-PSResource -Name IntuneAssignmentChecker -Scope CurrentUser -TrustRepository'
        Category = 'Top3'
        Priority = 2
        RequiresPowerShell7 = $true
        RequiresAdmin = $false
        Dependencies = @('Microsoft.Graph', 'PSResourceGet')
        Website = 'https://intuneassignmentchecker.ugurkoc.de/'
        GitHub = 'https://github.com/ugurkocde/IntuneAssignmentChecker'
        Author = 'Ugur Koc'
        Features = @('Assignment Analysis', 'HTML Reports', 'Interactive Dashboard', 'Auto-Update')
    }
    'IntuneMonitoring' = @{
        Name = 'IntuneMonitoring'
        Description = 'Azure Workbook Templates für Intune Monitoring'
        InstallCommand = 'Custom' # GitHub Clone
        Category = 'Top3'
        Priority = 3
        RequiresPowerShell7 = $false
        RequiresAdmin = $false
        Dependencies = @()
        Website = 'https://www.intunemonitoring.com/'
        GitHub = 'https://github.com/ugurkocde/IntuneMonitoring'
        Author = 'Ugur Koc'
        Features = @('Azure Workbooks', 'Real-time Monitoring', '60-Second Setup', 'No App Registration')
    }
    
    # ESSENTIAL TOOLS
    'TenuVault' = @{
        Name = 'TenuVault'
        Description = 'Backup und Restore für Intune-Umgebungen'
        InstallCommand = 'Install-Script -Name TenuVault -Force -Scope CurrentUser'
        Category = 'Essential'
        Priority = 4
        RequiresPowerShell7 = $false
        RequiresAdmin = $true
        Dependencies = @('Microsoft.Graph')
        Website = 'https://www.tenuvault.com/'
        GitHub = 'https://github.com/ugurkocde/TenuVault'
        Author = 'Ugur Koc'
        Features = @('Automated Backups', 'One-Click Restore', 'Data Sovereignty', 'Cloud Portal')
    }
    'DeviceOffboardingManager' = @{
        Name = 'DeviceOffboardingManager'
        Description = 'PowerShell GUI-Tool für Geräte-Offboarding'
        InstallCommand = 'Install-Script -Name DeviceOffboardingManager -Force -Scope CurrentUser'
        Category = 'Essential'
        Priority = 5
        RequiresPowerShell7 = $false
        RequiresAdmin = $true
        Dependencies = @('Microsoft.Graph', 'AzureAD')
        Website = 'https://intuneoffboarding.com/'
        GitHub = 'https://github.com/ugurkocde/DeviceOffboardingManager'
        Author = 'Ugur Koc'
        Features = @('Multi-Service Integration', 'Bulk Operations', 'Real-Time Dashboard', 'BitLocker Keys')
    }
    'IntuneOffboarding' = @{
        Name = 'IntuneOffboarding'
        Description = 'Erweiterte Offboarding-Scripts und -Tools'
        InstallCommand = 'Custom' # GitHub Clone
        Category = 'Essential'
        Priority = 6
        RequiresPowerShell7 = $false
        RequiresAdmin = $false
        Dependencies = @('Microsoft.Graph')
        GitHub = 'https://github.com/ugurkocde/IntuneOffboarding'
        Author = 'Ugur Koc'
        Features = @('Advanced Offboarding', 'Custom Scripts', 'Automation Ready')
    }
    
    # STANDARD TOOLS
    'Intune' = @{
        Name = 'Intune'
        Description = 'Sammlung von Intune-bezogenen Scripts und Tools'
        InstallCommand = 'Custom' # GitHub Clone
        Category = 'Standard'
        Priority = 7
        RequiresPowerShell7 = $false
        RequiresAdmin = $false
        Dependencies = @('Microsoft.Graph')
        GitHub = 'https://github.com/ugurkocde/Intune'
        Author = 'Ugur Koc'
        Features = @('Script Collection', 'PowerShell Tools', 'Automation Scripts', 'Best Practices')
    }
    'IntuneBrew' = @{
        Name = 'IntuneBrew'
        Description = 'macOS-App-Management in Intune'
        InstallCommand = 'Install-Script -Name IntuneBrew -Force -Scope CurrentUser'
        Category = 'Standard'
        Priority = 8
        RequiresPowerShell7 = $true
        RequiresAdmin = $true
        Dependencies = @('Microsoft.Graph')
        Website = 'https://www.intunebrew.com/'
        GitHub = 'https://github.com/ugurkocde/IntuneBrew'
        Author = 'Ugur Koc'
        Features = @('508 Apps Available', '1,975+ Admins', 'Web Portal', 'Azure Runbook')
    }
    'Get-WindowsAutopilotImportGUI' = @{
        Name = 'Get-WindowsAutopilotImportGUI'
        Description = 'GUI für AutoPilot-Import'
        InstallCommand = 'Install-Script -Name Get-WindowsAutopilotImportGUI -Force -Scope CurrentUser'
        Category = 'Standard'
        Priority = 9
        RequiresPowerShell7 = $false
        RequiresAdmin = $true
        Dependencies = @('WindowsAutopilot')
        GitHub = 'https://github.com/ugurkocde/Get-WindowsAutopilotImportGUI'
        Author = 'Ugur Koc'
        Features = @('Group Tag Selection', 'Automatic Reboot', 'Network Troubleshooting')
    }
    
    # ADVANCED TOOLS
    'IntuneRBAC' = @{
        Name = 'IntuneRBAC'
        Description = 'RBAC-Management mit Security Review Dashboard'
        InstallCommand = 'Custom' # GitHub Clone
        Category = 'Advanced'
        Priority = 10
        RequiresPowerShell7 = $false
        RequiresAdmin = $false
        Dependencies = @('Microsoft.Graph')
        GitHub = 'https://github.com/ugurkocde/IntuneRBAC'
        Author = 'Ugur Koc'
        Features = @('Security Review Dashboard', 'Health Score 0-100', 'Risk Assessment', 'Interactive Reports')
    }
    'brewpkg' = @{
        Name = 'brewpkg'
        Description = 'Package management tool'
        InstallCommand = 'Custom' # GitHub Clone
        Category = 'Standard'
        Priority = 11
        RequiresPowerShell7 = $false
        RequiresAdmin = $false
        Dependencies = @()
        GitHub = 'https://github.com/ugurkocde/brewpkg'
        Author = 'Ugur Koc'
        Features = @('Package Management', 'Tool Installation', 'Dependency Management')
    }
}

# Logging-Funktionen
function Write-LogMessage {
    param(
        [string]$Message,
        [string]$Level = 'INFO',
        [string]$Color = 'White'
    )
    
    $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $logEntry = "[$timestamp] [$Level] $Message"
    
    # Konsolen-Ausgabe mit Farbe
    Write-Host $logEntry -ForegroundColor $Color
    
    # Log-Datei
    try {
        Add-Content -Path $script:LogPath -Value $logEntry -ErrorAction SilentlyContinue
    }
    catch {
        # Fallback wenn Log-Datei nicht geschrieben werden kann
    }
}

function Write-Success {
    param([string]$Message)
    Write-LogMessage -Message "✓ $Message" -Level 'SUCCESS' -Color $Colors.Success
    $script:SuccessCount++
}

function Write-Warning {
    param([string]$Message)
    Write-LogMessage -Message "⚠ $Message" -Level 'WARNING' -Color $Colors.Warning
}

function Write-Error {
    param([string]$Message)
    Write-LogMessage -Message "✗ $Message" -Level 'ERROR' -Color $Colors.Error
    $script:ErrorCount++
}

function Write-Info {
    param([string]$Message)
    Write-LogMessage -Message "ℹ $Message" -Level 'INFO' -Color $Colors.Info
}

function Write-Header {
    param([string]$Message)
    Write-Host ""
    Write-Host "=" * 80 -ForegroundColor $Colors.Header
    Write-Host $Message -ForegroundColor $Colors.Header
    Write-Host "=" * 80 -ForegroundColor $Colors.Header
    Write-Host ""
}

# Voraussetzungen prüfen
function Test-Prerequisites {
    Write-Header "Überprüfung der Systemvoraussetzungen"
    
    $issues = @()
    
    # PowerShell Version
    $psVersion = $PSVersionTable.PSVersion
    Write-Info "PowerShell Version: $($psVersion.ToString())"
    
    if ($psVersion.Major -lt 5) {
        $issues += "PowerShell 5.1 oder höher erforderlich (aktuell: $($psVersion.ToString()))"
    }
    elseif ($psVersion.Major -eq 5 -and $psVersion.Minor -eq 0) {
        $issues += "PowerShell 5.1 oder höher erforderlich (aktuell: $($psVersion.ToString()))"
    }
    else {
        Write-Success "PowerShell Version ist kompatibel"
    }
    
    # Administrator-Rechte
    $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
    if ($isAdmin) {
        Write-Success "Administrator-Rechte verfügbar"
    }
    else {
        Write-Warning "Keine Administrator-Rechte - einige Tools können nicht installiert werden"
    }
    
    # Execution Policy
    $executionPolicy = Get-ExecutionPolicy
    Write-Info "Execution Policy: $executionPolicy"
    
    if ($executionPolicy -eq 'Restricted') {
        $issues += "Execution Policy ist auf 'Restricted' gesetzt - Scripts können nicht ausgeführt werden"
    }
    else {
        Write-Success "Execution Policy erlaubt Script-Ausführung"
    }
    
    # Internet-Verbindung
    try {
        $testConnection = Test-NetConnection -ComputerName "www.powershellgallery.com" -Port 443 -InformationLevel Quiet -ErrorAction SilentlyContinue
        if ($testConnection) {
            Write-Success "Internet-Verbindung zur PowerShell Gallery verfügbar"
        }
        else {
            $issues += "Keine Verbindung zur PowerShell Gallery möglich"
        }
    }
    catch {
        $issues += "Fehler beim Testen der Internet-Verbindung: $($_.Exception.Message)"
    }
    
    # TLS 1.2 Support
    try {
        $securityProtocol = [Net.ServicePointManager]::SecurityProtocol
        if ($securityProtocol -band [Net.SecurityProtocolType]::Tls12) {
            Write-Success "TLS 1.2 ist aktiviert"
        }
        else {
            Write-Warning "TLS 1.2 wird aktiviert..."
            [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
            Write-Success "TLS 1.2 wurde aktiviert"
        }
    }
    catch {
        $issues += "Fehler beim Aktivieren von TLS 1.2: $($_.Exception.Message)"
    }
    
    if ($issues.Count -gt 0) {
        Write-Header "Kritische Probleme gefunden"
        foreach ($issue in $issues) {
            Write-Error $issue
        }
        
        $continue = Read-Host "Möchten Sie trotz der Probleme fortfahren? (y/N)"
        if ($continue -ne 'y' -and $continue -ne 'Y') {
            Write-Info "Installation abgebrochen"
            exit 1
        }
    }
    else {
        Write-Success "Alle Systemvoraussetzungen erfüllt"
    }
}

# PowerShell Module installieren
function Install-RequiredModules {
    Write-Header "Installation der erforderlichen PowerShell Module"
    
    $requiredModules = @(
        @{ Name = 'PSResourceGet'; MinVersion = '1.0.0'; Description = 'Moderne PowerShell Package Management' },
        @{ Name = 'Microsoft.Graph'; MinVersion = '2.0.0'; Description = 'Microsoft Graph PowerShell SDK' },
        @{ Name = 'Microsoft.Graph.Authentication'; MinVersion = '2.0.0'; Description = 'Microsoft Graph Authentifizierung' },
        @{ Name = 'Microsoft.Graph.Intune'; MinVersion = '2.0.0'; Description = 'Microsoft Graph Intune Module' },
        @{ Name = 'AzureAD'; MinVersion = '2.0.0'; Description = 'Azure Active Directory PowerShell Module' },
        @{ Name = 'WindowsAutopilot'; MinVersion = '5.0.0'; Description = 'Windows Autopilot PowerShell Module' },
        @{ Name = 'ImportExcel'; MinVersion = '7.0.0'; Description = 'Excel Import/Export Module (optional)' }
    )
    
    foreach ($module in $requiredModules) {
        Write-Info "Überprüfe Modul: $($module.Name)"
        
        try {
            $installedModule = Get-Module -Name $module.Name -ListAvailable | Sort-Object Version -Descending | Select-Object -First 1
            
            if ($installedModule) {
                if ($installedModule.Version -ge [Version]$module.MinVersion) {
                    Write-Success "$($module.Name) v$($installedModule.Version) ist bereits installiert"
                    continue
                }
                else {
                    Write-Warning "$($module.Name) v$($installedModule.Version) ist veraltet (benötigt: v$($module.MinVersion))"
                }
            }
            
            Write-Info "Installiere $($module.Name)..."
            
            # Versuche zuerst mit PSResourceGet (PowerShell 7+)
            if (Get-Command Install-PSResource -ErrorAction SilentlyContinue) {
                Install-PSResource -Name $module.Name -Scope CurrentUser -TrustRepository -Force -ErrorAction Stop
            }
            else {
                # Fallback auf Install-Module
                Install-Module -Name $module.Name -Scope CurrentUser -Force -AllowClobber -ErrorAction Stop
            }
            
            Write-Success "$($module.Name) erfolgreich installiert"
        }
        catch {
            if ($module.Name -eq 'ImportExcel') {
                Write-Warning "Optionales Modul $($module.Name) konnte nicht installiert werden: $($_.Exception.Message)"
            }
            else {
                Write-Error "Fehler beim Installieren von $($module.Name): $($_.Exception.Message)"
            }
        }
    }
}

# Tool-Auswahl basierend auf Modus
function Get-ToolsToInstall {
    param([string]$Mode)
    
    switch ($Mode) {
        'Top3' {
            Write-Info "Installiere die TOP 3 wichtigsten Tools..."
            return $Tools.GetEnumerator() | Where-Object { $_.Value.Category -eq 'Top3' } | Sort-Object { $_.Value.Priority }
        }
        'Essential' {
            Write-Info "Installiere Essential Tools (inkl. TOP 3)..."
            return $Tools.GetEnumerator() | Where-Object { $_.Value.Category -in @('Top3', 'Essential') } | Sort-Object { $_.Value.Priority }
        }
        'Custom' {
            Write-Header "Tool-Auswahl"
            Write-Info "Verfügbare Tools (sortiert nach Priorität):"
            
            $toolList = @()
            $index = 1
            
            # Sortiere Tools nach Priorität
            $sortedTools = $Tools.GetEnumerator() | Sort-Object { $_.Value.Priority }
            
            foreach ($tool in $sortedTools) {
                $categoryIcon = switch ($tool.Value.Category) {
                    'Top3' { '🏆' }
                    'Essential' { '⭐' }
                    'Standard' { '🔧' }
                    'Advanced' { '🚀' }
                    default { '📦' }
                }
                
                $authorInfo = if ($tool.Value.Author) { " ($($tool.Value.Author))" } else { "" }
                Write-Host "[$index] $categoryIcon $($tool.Value.Name)$authorInfo - $($tool.Value.Description)" -ForegroundColor $Colors.Highlight
                
                if ($tool.Value.Features) {
                    Write-Host "    Features: $($tool.Value.Features -join ', ')" -ForegroundColor $Colors.Info
                }
                
                $toolList += $tool
                $index++
            }
            
            Write-Host ""
            Write-Host "Schnellauswahl:" -ForegroundColor $Colors.Header
            Write-Host "  'top3' - Nur die TOP 3 Tools" -ForegroundColor $Colors.Info
            Write-Host "  'essential' - TOP 3 + Essential Tools" -ForegroundColor $Colors.Info
            Write-Host "  'all' - Alle verfügbaren Tools" -ForegroundColor $Colors.Info
            Write-Host ""
            
            $selection = Read-Host "Geben Sie die Nummern der zu installierenden Tools ein (z.B. 1,2,3) oder eine Schnellauswahl"
            
            switch ($selection.ToLower()) {
                'top3' { 
                    return $Tools.GetEnumerator() | Where-Object { $_.Value.Category -eq 'Top3' } | Sort-Object { $_.Value.Priority }
                }
                'essential' { 
                    return $Tools.GetEnumerator() | Where-Object { $_.Value.Category -in @('Top3', 'Essential') } | Sort-Object { $_.Value.Priority }
                }
                'all' { 
                    return $sortedTools
                }
                default {
                    $selectedIndices = $selection -split ',' | ForEach-Object { [int]$_.Trim() }
                    $selectedTools = @()
                    
                    foreach ($index in $selectedIndices) {
                        if ($index -ge 1 -and $index -le $toolList.Count) {
                            $selectedTools += $toolList[$index - 1]
                        }
                    }
                    
                    return $selectedTools
                }
            }
        }
        default {
            Write-Info "Installiere alle verfügbaren Tools..."
            return $Tools.GetEnumerator() | Sort-Object { $_.Value.Priority }
        }
    }
}

# Einzelnes Tool installieren
function Install-Tool {
    param(
        [hashtable]$Tool
    )
    
    Write-Info "Installiere $($Tool.Name)..."
    
    # PowerShell 7 Anforderung prüfen
    if ($Tool.RequiresPowerShell7 -and $PSVersionTable.PSVersion.Major -lt 7) {
        Write-Warning "$($Tool.Name) benötigt PowerShell 7, aber PowerShell $($PSVersionTable.PSVersion.Major) ist installiert"
        $continue = Read-Host "Trotzdem versuchen zu installieren? (y/N)"
        if ($continue -ne 'y' -and $continue -ne 'Y') {
            Write-Warning "$($Tool.Name) übersprungen"
            return
        }
    }
    
    # Admin-Rechte prüfen
    if ($Tool.RequiresAdmin) {
        $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
        if (-not $isAdmin) {
            Write-Warning "$($Tool.Name) benötigt Administrator-Rechte, aber das Script läuft nicht als Administrator"
            Write-Warning "$($Tool.Name) übersprungen"
            return
        }
    }
    
    try {
        if ($Tool.InstallCommand -eq 'Custom') {
            # Spezielle Installation für GitHub-Tools
            Install-GitHubTool -Tool $Tool
        }
        else {
            # Standard PowerShell Gallery Installation
            Invoke-Expression $Tool.InstallCommand
            Write-Success "$($Tool.Name) erfolgreich installiert"
        }
    }
    catch {
        Write-Error "Fehler beim Installieren von $($Tool.Name): $($_.Exception.Message)"
    }
}

# GitHub Tools installieren
function Install-GitHubTool {
    param([hashtable]$Tool)
    
    $toolsPath = "$env:USERPROFILE\Documents\PowerShell\UgurTools"
    
    if (-not (Test-Path $toolsPath)) {
        New-Item -Path $toolsPath -ItemType Directory -Force | Out-Null
    }
    
    $toolPath = Join-Path $toolsPath $Tool.Name
    
    if (Test-Path $toolPath) {
        Write-Warning "$($Tool.Name) ist bereits in $toolPath vorhanden"
        $update = Read-Host "Möchten Sie es aktualisieren? (y/N)"
        if ($update -eq 'y' -or $update -eq 'Y') {
            Remove-Item -Path $toolPath -Recurse -Force
        }
        else {
            Write-Info "$($Tool.Name) übersprungen"
            return
        }
    }
    
    try {
        if (Get-Command git -ErrorAction SilentlyContinue) {
            # Git ist verfügbar
            Write-Info "Klone $($Tool.Name) von GitHub..."
            git clone $Tool.GitHub $toolPath
            Write-Success "$($Tool.Name) erfolgreich von GitHub geklont nach $toolPath"
        }
        else {
            # Git nicht verfügbar - Download als ZIP
            Write-Info "Git nicht gefunden, lade $($Tool.Name) als ZIP herunter..."
            
            $zipUrl = $Tool.GitHub + "/archive/refs/heads/main.zip"
            $zipPath = "$env:TEMP\$($Tool.Name).zip"
            
            Invoke-WebRequest -Uri $zipUrl -OutFile $zipPath
            
            # ZIP extrahieren
            if (Get-Command Expand-Archive -ErrorAction SilentlyContinue) {
                Expand-Archive -Path $zipPath -DestinationPath $env:TEMP -Force
                $extractedPath = "$env:TEMP\$($Tool.Name)-main"
                Move-Item -Path $extractedPath -Destination $toolPath
                Remove-Item -Path $zipPath -Force
                Write-Success "$($Tool.Name) erfolgreich heruntergeladen nach $toolPath"
            }
            else {
                Write-Error "Kann ZIP-Datei nicht extrahieren - Expand-Archive nicht verfügbar"
            }
        }
    }
    catch {
        Write-Error "Fehler beim Herunterladen von $($Tool.Name): $($_.Exception.Message)"
    }
}

# Zusammenfassung anzeigen
function Show-Summary {
    Write-Header "Installationszusammenfassung"
    
    $endTime = Get-Date
    $duration = $endTime - $script:StartTime
    
    Write-Info "Installation abgeschlossen in $($duration.TotalMinutes.ToString('F1')) Minuten"
    Write-Success "Erfolgreich installierte Tools: $script:SuccessCount"
    
    if ($script:ErrorCount -gt 0) {
        Write-Error "Fehler aufgetreten: $script:ErrorCount"
    }
    
    Write-Host ""
    Write-Info "Nächste Schritte:"
    Write-Host "1. Starten Sie PowerShell neu, um alle Module zu laden" -ForegroundColor $Colors.Highlight
    Write-Host "2. Authentifizieren Sie sich mit Microsoft Graph:" -ForegroundColor $Colors.Highlight
    Write-Host "   Connect-MgGraph -Scopes 'DeviceManagementConfiguration.ReadWrite.All'" -ForegroundColor $Colors.Info
    Write-Host "3. Testen Sie die Tools:" -ForegroundColor $Colors.Highlight
    Write-Host "   - TenuVault" -ForegroundColor $Colors.Info
    Write-Host "   - IntuneAssignmentChecker" -ForegroundColor $Colors.Info
    Write-Host "   - DeviceOffboardingManager" -ForegroundColor $Colors.Info
    
    Write-Host ""
    Write-Info "Weitere Informationen:"
    Write-Host "- Website: https://farpoint-tech.github.io/ShippedbyUgur/" -ForegroundColor $Colors.Info
    Write-Host "- GitHub: https://github.com/farpoint-tech/ShippedbyUgur" -ForegroundColor $Colors.Info
    Write-Host "- Autor der Tools: Ugur Koc (Microsoft MVP)" -ForegroundColor $Colors.Info
    Write-Host "- Log-Datei: $script:LogPath" -ForegroundColor $Colors.Info
}

# Hauptfunktion
function Main {
    # Banner anzeigen
    Write-Host ""
    Write-Host "╔══════════════════════════════════════════════════════════════════════════════╗" -ForegroundColor $Colors.Header
    Write-Host "║                        All_install_fromUgur v1.0                            ║" -ForegroundColor $Colors.Header
    Write-Host "║                                                                              ║" -ForegroundColor $Colors.Header
    Write-Host "║              Automatische Installation aller Ugur Koc Intune Tools          ║" -ForegroundColor $Colors.Header
    Write-Host "║                                                                              ║" -ForegroundColor $Colors.Header
    Write-Host "║                    Erstellt von: Philipp Schmidt                            ║" -ForegroundColor $Colors.Header
    Write-Host "║                    Basiert auf Tools von: Ugur Koc (MVP)                    ║" -ForegroundColor $Colors.Header
    Write-Host "╚══════════════════════════════════════════════════════════════════════════════╝" -ForegroundColor $Colors.Header
    Write-Host ""
    
    Write-Info "Installationsmodus: $InstallMode"
    Write-Info "Authentifizierungsmethode: $AuthMethod"
    Write-Info "Log-Datei: $script:LogPath"
    
    # Voraussetzungen prüfen
    if (-not $SkipPrerequisites) {
        Test-Prerequisites
        Install-RequiredModules
    }
    else {
        Write-Warning "Überspringe Voraussetzungen-Prüfung"
    }
    
    # Tools auswählen und installieren
    $toolsToInstall = Get-ToolsToInstall -Mode $InstallMode
    
    if ($toolsToInstall.Count -eq 0) {
        Write-Warning "Keine Tools zur Installation ausgewählt"
        return
    }
    
    Write-Header "Installation der ausgewählten Tools"
    Write-Info "Installiere $($toolsToInstall.Count) Tool(s)..."
    
    foreach ($toolEntry in $toolsToInstall) {
        Install-Tool -Tool $toolEntry.Value
    }
    
    # Zusammenfassung
    Show-Summary
}

# Script ausführen
try {
    Main
}
catch {
    Write-Error "Kritischer Fehler: $($_.Exception.Message)"
    Write-Info "Vollständiger Fehler wurde in die Log-Datei geschrieben: $script:LogPath"
    exit 1
}
finally {
    Write-Host ""
    Write-Host "Drücken Sie eine beliebige Taste zum Beenden..." -ForegroundColor $Colors.Info
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

