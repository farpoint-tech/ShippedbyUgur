# All_install_fromUgur

Umfassendes PowerShell-Installationsscript für alle Microsoft Intune Management Tools von Ugur Koc.

## Übersicht

Dieses Script automatisiert die Installation aller wichtigen Intune-Management-Tools von Ugur Koc (Microsoft MVP), inklusive aller erforderlichen Abhängigkeiten und Voraussetzungen. Es bietet eine benutzerfreundliche Oberfläche mit verschiedenen Installationsmodi und Authentifizierungsoptionen.

## Unterstützte Tools

### 🏆 TOP 3 Tools (Höchste Priorität)

| Tool | Autor | Beschreibung | Features |
|------|-------|-------------|----------|
| **IntuneManagement** | Micke-K | Umfassendes GUI-Tool für komplette Intune-Verwaltung | Complete Management, Backup/Restore, Bulk Operations |
| **IntuneAssignmentChecker** | Ugur Koc | Analyse und Audit von Intune-Zuweisungen | v3.4.1, 7,208+ Downloads, HTML Reports |
| **IntuneMonitoring** | Ugur Koc | Azure Workbook Templates für Intune Monitoring | 60-Second Setup, Real-time Monitoring |

### ⭐ Essential Tools

| Tool | Beschreibung | Version | Downloads |
|------|-------------|---------|-----------|
| **TenuVault** | Backup und Restore für Intune-Umgebungen | Latest | N/A |
| **DeviceOffboardingManager** | PowerShell GUI-Tool für Geräte-Offboarding | v0.2.1 | 5,239+ |
| **IntuneOffboarding** | Erweiterte Offboarding-Scripts und -Tools | Latest | N/A |

### 🔧 Standard Tools

| Tool | Beschreibung | Besonderheiten |
|------|-------------|----------------|
| **Intune** | Sammlung von Intune-bezogenen Scripts und Tools | Script Collection, Best Practices |
| **IntuneBrew** | macOS-App-Management in Intune | 508 Apps verfügbar, 1,975+ Admins |
| **Get-WindowsAutopilotImportGUI** | GUI für AutoPilot-Import | 34,829+ Downloads |

### 🚀 Advanced Tools

| Tool | Beschreibung | Installation |
|------|-------------|--------------|
| **IntuneRBAC** | RBAC-Management mit Security Review Dashboard | GitHub Clone |

## Systemvoraussetzungen

### Mindestanforderungen
- **Windows 10/11** oder **Windows Server 2016+**
- **PowerShell 5.1** oder höher (PowerShell 7 empfohlen)
- **Internet-Verbindung** für Downloads
- **Administrator-Rechte** (für die meisten Tools erforderlich)

### Empfohlene Konfiguration
- **PowerShell 7.x** (neueste Version)
- **Windows Terminal** für bessere Darstellung
- **Git** (optional, für GitHub-Tools)

## Installation

### Schnellstart

1. **Script herunterladen:**
   ```powershell
   # Direkt ausführen (empfohlen)
   Invoke-WebRequest -Uri "https://raw.githubusercontent.com/farpoint-tech/ShippedbyUgur/main/All_install_fromUgur.ps1" -OutFile "All_install_fromUgur.ps1"
   ```

2. **Execution Policy setzen (falls erforderlich):**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Script ausführen:**
   ```powershell
   .\All_install_fromUgur.ps1
   ```

### Erweiterte Installationsoptionen

#### TOP 3 Tools installieren (Standard, empfohlen)
```powershell
.\All_install_fromUgur.ps1 -InstallMode Top3
```

#### Alle Tools installieren
```powershell
.\All_install_fromUgur.ps1 -InstallMode All
```

#### Essential Tools installieren (TOP 3 + Essential)
```powershell
.\All_install_fromUgur.ps1 -InstallMode Essential
```

#### Benutzerdefinierte Tool-Auswahl
```powershell
.\All_install_fromUgur.ps1 -InstallMode Custom
```

#### Mit Device Code Flow (für MFA-Umgebungen)
```powershell
.\All_install_fromUgur.ps1 -AuthMethod DeviceCode
```

#### Voraussetzungen überspringen
```powershell
.\All_install_fromUgur.ps1 -SkipPrerequisites
```

## Parameter

| Parameter | Typ | Standard | Beschreibung |
|-----------|-----|----------|-------------|
| `InstallMode` | String | 'Top3' | Installationsmodus: 'All', 'Top3', 'Essential', 'Custom' |
| `AuthMethod` | String | 'Interactive' | Authentifizierung: 'Interactive', 'DeviceCode', 'Certificate' |
| `SkipPrerequisites` | Switch | false | Überspringt Voraussetzungen-Prüfung |
| `LogPath` | String | `$env:TEMP\All_install_fromUgur.log` | Pfad für Log-Datei |

## Funktionen

### Automatische Systemprüfung
- PowerShell-Version
- Administrator-Rechte
- Execution Policy
- Internet-Verbindung
- TLS 1.2 Support

### Intelligente Modulinstallation
- **PSResourceGet** (moderne Package-Verwaltung)
- **Microsoft.Graph** (vollständiges SDK)
- **AzureAD** (Legacy-Support)
- **WindowsAutopilot** (AutoPilot-Tools)
- **ImportExcel** (optional für Reports)

### Flexible Tool-Installation
- PowerShell Gallery Integration
- GitHub Repository Cloning
- Automatische Abhängigkeitsauflösung
- Fehlerbehandlung und Retry-Logik

### Benutzerfreundliche Oberfläche
- Farbige Konsolen-Ausgabe
- Fortschrittsanzeigen
- Detaillierte Logging
- Interaktive Bestätigungen

## Nach der Installation

### 1. PowerShell neu starten
```powershell
# Neue PowerShell-Sitzung starten
pwsh
```

### 2. Microsoft Graph Authentifizierung
```powershell
# Verbindung zu Microsoft Graph herstellen
Connect-MgGraph -Scopes "DeviceManagementConfiguration.ReadWrite.All", "DeviceManagementApps.ReadWrite.All", "DeviceManagementManagedDevices.ReadWrite.All"
```

### 3. Tools testen

#### TenuVault
```powershell
# TenuVault starten
TenuVault
```

#### IntuneAssignmentChecker
```powershell
# Assignment Checker ausführen
IntuneAssignmentChecker
```

#### DeviceOffboardingManager
```powershell
# Device Offboarding Manager starten
DeviceOffboardingManager
```

## Authentifizierungsoptionen

### Interactive Authentication (Standard)
- Browser-basierte Anmeldung
- Unterstützt MFA
- Einfachste Option für Endbenutzer

### Device Code Flow
- Für Umgebungen ohne Browser
- MFA-kompatibel
- Ideal für Remote-Sitzungen

### Certificate-based Authentication
- Für Automation und Scripts
- Höchste Sicherheit
- Erfordert App-Registrierung

## Troubleshooting

### Häufige Probleme

#### Execution Policy Fehler
```powershell
# Lösung: Execution Policy temporär setzen
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

#### Module können nicht installiert werden
```powershell
# Lösung: PowerShell Gallery vertrauen
Set-PSRepository -Name PSGallery -InstallationPolicy Trusted
```

#### TLS-Verbindungsfehler
```powershell
# Lösung: TLS 1.2 aktivieren
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
```

#### Keine Administrator-Rechte
```powershell
# Lösung: PowerShell als Administrator starten
Start-Process powershell -Verb RunAs
```

### Log-Datei analysieren
```powershell
# Log-Datei öffnen
Get-Content "$env:TEMP\All_install_fromUgur.log" | Out-GridView
```

## Deinstallation

### PowerShell Gallery Tools entfernen
```powershell
# Einzelne Tools deinstallieren
Uninstall-Script -Name TenuVault
Uninstall-Script -Name DeviceOffboardingManager
Uninstall-Script -Name IntuneBrew
Uninstall-Script -Name Get-WindowsAutopilotImportGUI

# PSResource-basierte Tools
Uninstall-PSResource -Name IntuneAssignmentChecker
```

### GitHub Tools entfernen
```powershell
# Lokale Kopien löschen
Remove-Item -Path "$env:USERPROFILE\Documents\PowerShell\UgurTools" -Recurse -Force
```

### Module entfernen (optional)
```powershell
# Nur wenn nicht anderweitig benötigt
Uninstall-Module -Name Microsoft.Graph -AllVersions
Uninstall-Module -Name AzureAD -AllVersions
Uninstall-Module -Name WindowsAutopilot -AllVersions
```

## Sicherheitshinweise

### Script-Validierung
- Überprüfen Sie das Script vor der Ausführung
- Laden Sie nur von vertrauenswürdigen Quellen herunter
- Verwenden Sie Code-Signing wenn verfügbar

### Berechtigungen
- Das Script benötigt Administrator-Rechte
- Installiert Module nur im CurrentUser-Scope
- Keine Systemänderungen außerhalb PowerShell

### Netzwerk-Sicherheit
- Alle Downloads über HTTPS
- TLS 1.2 wird erzwungen
- Keine Übertragung von Anmeldedaten

## Unterstützung

### Offizielle Quellen
- **Website**: https://farpoint-tech.github.io/ShippedbyUgur/
- **GitHub**: https://github.com/farpoint-tech/ShippedbyUgur
- **Ugur Koc**: https://ugurkoc.de/

### Community
- **GitHub Issues**: Für Bugs und Feature-Requests
- **Diskussionen**: Für allgemeine Fragen
- **LinkedIn**: Ugur Koc (Microsoft MVP)

## Lizenz

Dieses Script ist unter der MIT-Lizenz veröffentlicht. Die installierten Tools unterliegen ihren jeweiligen Lizenzen.

## Changelog

### Version 1.0 (August 2025)
- Erste Veröffentlichung
- Unterstützung für 7 Tools
- Automatische Voraussetzungen-Prüfung
- Flexible Installationsmodi
- Umfassende Fehlerbehandlung

## Mitwirkende

- **Philipp Schmidt** - Script-Entwicklung und Dokumentation
- **Ugur Koc** - Originalautor aller Tools (Microsoft MVP)
- **Community** - Feedback und Testing

---

*Erstellt von: Philipp Schmidt | Version: 1.0 | Stand: August 2025*

