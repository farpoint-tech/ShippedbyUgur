# Tool-Analyse für All_install_fromUgur Script

## Übersicht aller Tools und deren Installationsanforderungen

### 1. TenuVault
- **Installation**: `Install-Script -Name TenuVault`
- **Voraussetzungen**: PowerShell 5.1+, Admin-Rechte
- **Abhängigkeiten**: Microsoft.Graph PowerShell Module
- **Authentifizierung**: Interactive/Certificate-based

### 2. IntuneAssignmentChecker
- **Installation**: `Install-PSResource IntuneAssignmentChecker`
- **Voraussetzungen**: PowerShell 7+, PSResourceGet
- **Abhängigkeiten**: Microsoft.Graph PowerShell Module
- **Authentifizierung**: Interactive/Certificate-based

### 3. DeviceOffboardingManager
- **Installation**: `Install-Script -Name DeviceOffboardingManager`
- **Voraussetzungen**: PowerShell 5.1+, Admin-Rechte
- **Abhängigkeiten**: Microsoft.Graph PowerShell Module, AzureAD Module
- **Authentifizierung**: Interactive

### 4. IntuneBrew
- **Installation**: `Install-Script IntuneBrew -Force`
- **Voraussetzungen**: PowerShell 7+, Admin-Rechte (für macOS-Management)
- **Abhängigkeiten**: Microsoft.Graph PowerShell Module
- **Authentifizierung**: Interactive/Certificate-based

### 5. IntuneRBAC
- **Installation**: GitHub Clone (kein PowerShell Gallery Package)
- **Voraussetzungen**: PowerShell 5.1+
- **Abhängigkeiten**: Microsoft.Graph PowerShell Module
- **Authentifizierung**: Interactive/Certificate-based

### 6. Get-WindowsAutopilotImportGUI
- **Installation**: `Install-Script -Name Get-WindowsAutopilotImportGUI`
- **Voraussetzungen**: PowerShell 5.1+, Admin-Rechte
- **Abhängigkeiten**: WindowsAutopilot PowerShell Module
- **Authentifizierung**: Interactive

### 7. IntuneMonitoring
- **Installation**: GitHub Clone (Azure Workbook Templates)
- **Voraussetzungen**: Azure-Zugang, Log Analytics Workspace
- **Abhängigkeiten**: Keine PowerShell-Module
- **Authentifizierung**: Azure Portal

### Gemeinsame Voraussetzungen:
1. **PowerShell 7** (empfohlen für alle Tools)
2. **PowerShell 5.1** (Mindestanforderung)
3. **Admin-Rechte** (für die meisten Installationen)
4. **Microsoft.Graph PowerShell Module**
5. **PSResourceGet Module** (für moderne Installationen)
6. **Execution Policy** auf RemoteSigned oder Unrestricted
7. **TLS 1.2** Support
8. **Internet-Verbindung** für Downloads

### Authentifizierungs-Optionen:
1. **Interactive Authentication** (Standard)
2. **Certificate-based Authentication** (für Automation)
3. **Device Code Flow** (für MFA-Umgebungen)

### Optionale Abhängigkeiten:
- **AzureAD PowerShell Module** (für ältere Tools)
- **WindowsAutopilot PowerShell Module**
- **ImportExcel Module** (für Reports)

