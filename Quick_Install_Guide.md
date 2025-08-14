# Schnellinstallationsanleitung - All_install_fromUgur

## 🚀 Sofortinstallation (3 Schritte)

### Schritt 1: PowerShell als Administrator öffnen
```powershell
# Windows Key + X drücken, dann "Windows PowerShell (Administrator)" wählen
# Oder: Windows Terminal als Administrator starten
```

### Schritt 2: Script herunterladen und ausführen
```powershell
# Script herunterladen
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/farpoint-tech/ShippedbyUgur/main/All_install_fromUgur.ps1" -OutFile "All_install_fromUgur.ps1"

# Script ausführen
.\All_install_fromUgur.ps1
```

### Schritt 3: Den Anweisungen folgen
- Das Script prüft automatisch alle Voraussetzungen
- Installiert alle erforderlichen Module
- Installiert die TOP 3 wichtigsten Tools (Standard)
- Zeigt eine Zusammenfassung am Ende

## ⚡ Installationsmodi

### TOP 3 Tools (Standard, empfohlen)
```powershell
.\All_install_fromUgur.ps1 -InstallMode Top3
```

### Alle Tools
```powershell
.\All_install_fromUgur.ps1 -InstallMode All
```

### Essential Tools (TOP 3 + weitere wichtige)
```powershell
.\All_install_fromUgur.ps1 -InstallMode Essential
```

### Benutzerdefinierte Auswahl
```powershell
.\All_install_fromUgur.ps1 -InstallMode Custom
```

## 🔧 Nach der Installation

### PowerShell neu starten
```powershell
# Neue PowerShell-Sitzung öffnen
pwsh
```

### Mit Microsoft Graph verbinden
```powershell
Connect-MgGraph -Scopes "DeviceManagementConfiguration.ReadWrite.All"
```

### Tools testen
```powershell
# TenuVault starten
TenuVault

# IntuneAssignmentChecker ausführen
IntuneAssignmentChecker

# DeviceOffboardingManager starten
DeviceOffboardingManager
```

## ❓ Probleme?

### Execution Policy Fehler
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Keine Administrator-Rechte
- PowerShell als Administrator neu starten
- Windows Key + X → "Windows PowerShell (Administrator)"

### Internet-Verbindung
- Firewall/Proxy-Einstellungen prüfen
- VPN deaktivieren falls Probleme auftreten

## 📋 Was wird installiert?

### 🏆 TOP 3 Tools (Standard-Installation):
- **IntuneManagement** (Micke-K) - Umfassendes GUI-Tool für komplette Intune-Verwaltung
- **IntuneAssignmentChecker** (Ugur Koc) - Zuweisungsanalyse mit HTML Reports
- **IntuneMonitoring** (Ugur Koc) - Azure Workbook Templates für Monitoring

### ⭐ Essential Tools (bei -InstallMode Essential):
- **TenuVault** - Backup & Restore
- **DeviceOffboardingManager** - Geräte-Offboarding
- **IntuneOffboarding** - Erweiterte Offboarding-Scripts

### 🔧 Standard Tools (bei -InstallMode All):
- **Intune** - Script-Sammlung und Best Practices
- **IntuneBrew** - macOS App Management
- **Get-WindowsAutopilotImportGUI** - AutoPilot Import

### 🚀 Advanced Tools (bei -InstallMode All):
- **IntuneRBAC** - RBAC Management mit Security Dashboard

Plus alle erforderlichen PowerShell-Module:
- Microsoft.Graph
- PSResourceGet
- AzureAD
- WindowsAutopilot
- ImportExcel

## 🆘 Support

- **Vollständige Dokumentation**: All_install_fromUgur_README.md
- **GitHub**: https://github.com/farpoint-tech/ShippedbyUgur
- **Website**: https://farpoint-tech.github.io/ShippedbyUgur/

---

*Schnellstart-Guide | Version 1.0 | Philipp Schmidt*

