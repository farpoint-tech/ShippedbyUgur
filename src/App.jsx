import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { 
  Database, 
  BarChart3, 
  Smartphone, 
  Apple, 
  Shield, 
  Zap,
  Search,
  ExternalLink,
  Github,
  Globe,
  Star,
  Download,
  Users,
  Sparkles
} from 'lucide-react'
import './App.css'

const tools = [
  {
    id: 'tenuvault',
    name: 'TenuVault',
    category: 'backup',
    description: 'Backup und Restore für Intune-Umgebungen',
    features: ['Automatisierte tägliche Backups', 'One-Click Restore', '100% Datensouveränität', 'PowerShell + Cloud Portal'],
    installation: 'Install-Script -Name TenuVault',
    github: 'https://github.com/ugurkocde/TenuVault',
    website: 'https://www.tenuvault.com/',
    stars: 13,
    downloads: 'N/A',
    isMain: true,
    tags: ['Backup', 'Restore', 'SaaS', 'PowerShell']
  },
  {
    id: 'intune-monitoring',
    name: 'IntuneMonitoring',
    category: 'monitoring',
    description: 'Azure Workbook Templates für Intune Monitoring',
    features: ['Dashboard in 60 Sekunden', 'Keine App-Registrierung', 'Real-time Monitoring', 'Copy & Paste Deployment'],
    github: 'https://github.com/ugurkocde/IntuneMonitoring',
    website: 'https://www.intunemonitoring.com/',
    stars: 28,
    forks: 3,
    version: '0.2',
    tags: ['Azure Workbooks', 'Dashboard', 'Templates', 'Real-time']
  },
  {
    id: 'device-offboarding',
    name: 'DeviceOffboardingManager',
    category: 'device-management',
    description: 'PowerShell GUI-Tool für Geräte-Offboarding',
    features: ['Multi-Service Integration', 'Bulk-Operationen', 'Real-Time Dashboard', 'BitLocker Key Retrieval'],
    installation: 'Install-Script -Name DeviceOffboardingManager',
    github: 'https://github.com/ugurkocde/DeviceOffboardingManager',
    website: 'https://intuneoffboarding.com/',
    stars: 179,
    forks: 30,
    downloads: '5,239',
    version: '0.2.1',
    isUpdated: true,
    tags: ['Offboarding', 'Bulk', 'GUI', 'Multi-Service']
  },
  {
    id: 'assignment-checker',
    name: 'IntuneAssignmentChecker',
    category: 'monitoring',
    description: 'Analyse und Audit von Intune-Zuweisungen',
    features: ['Zuweisungsanalyse für Benutzer/Gruppen/Geräte', 'Interactive HTML Reports', 'Auto-Update Feature', 'Certificate-based Auth'],
    installation: 'Install-PSResource IntuneAssignmentChecker',
    github: 'https://github.com/ugurkocde/IntuneAssignmentChecker',
    website: 'https://intuneassignmentchecker.ugurkoc.de/',
    stars: 345,
    forks: 53,
    downloads: '7,208',
    version: '3.4.1',
    isUpdated: true,
    tags: ['Analyse', 'Zuweisungen', 'GUI', 'Interactive']
  },
  {
    id: 'intune-brew',
    name: 'IntuneBrew',
    category: 'macos',
    description: 'macOS-App-Management in Intune mit Web Portal',
    features: ['508 Apps verfügbar', '1,975 Admins nutzen es weltweit', 'Web Portal + PowerShell + Azure Runbook', 'Automatische Updates'],
    installation: 'Install-Script IntuneBrew -Force',
    github: 'https://github.com/ugurkocde/IntuneBrew',
    website: 'https://www.intunebrew.com/',
    stars: 173,
    forks: 34,
    users: '1,975',
    apps: '508',
    isPopular: true,
    tags: ['macOS', 'Apps', 'Web Portal', 'Automation']
  },
  {
    id: 'intune-rbac',
    name: 'IntuneRBAC',
    category: 'security',
    description: 'RBAC-Management mit Security Review Dashboard',
    features: ['Security Review Dashboard (v0.5.0)', 'Health Score 0-100', 'Risk Assessment', 'Interactive HTML Reports'],
    github: 'https://github.com/ugurkocde/IntuneRBAC',
    stars: 86,
    forks: 12,
    version: '0.5.0',
    isUpdated: true,
    tags: ['RBAC', 'Security', 'Risk Assessment', 'Dashboard']
  },
  {
    id: 'intune-automation',
    name: 'IntuneAutomation',
    category: 'automation',
    description: 'PowerShell Scripts für Intune-Automatisierung',
    features: ['Script-Sammlung', 'Deploy to Azure Button', 'Best Practices FAQ', 'Graph API Integration'],
    github: 'https://github.com/ugurkocde/IntuneAutomation',
    website: 'https://www.intuneautomation.com/',
    stars: 48,
    forks: 9,
    isNew: true,
    tags: ['Automation', 'PowerShell', 'Scripts', 'Azure']
  },
  {
    id: 'device-query',
    name: 'IntuneDeviceQuery',
    category: 'monitoring',
    description: 'KQL-Queries für Intune',
    features: ['Ready-to-use KQL-Queries', 'Umfangreiche Sammlung', 'Copy & Paste'],
    github: 'https://github.com/ugurkocde/IntuneDeviceQuery',
    stars: 110,
    forks: 11,
    tags: ['KQL', 'Queries', 'Analytics']
  },
  {
    id: 'autopilot-gui',
    name: 'Get-WindowsAutopilotImportGUI',
    category: 'automation',
    description: 'GUI für AutoPilot-Import',
    features: ['Group Tag-Auswahl', 'Automatischer Reboot', 'Netzwerk-Troubleshooting'],
    installation: 'Install-Script -Name Get-WindowsAutopilotImportGUI',
    downloads: '34,829',
    tags: ['AutoPilot', 'GUI', 'Import']
  },
  {
    id: 'intunemacadmins',
    name: 'intunemacadmins',
    category: 'macos',
    description: 'Community-Plattform für macOS-Management mit Intune',
    features: ['Detaillierte Guides', 'Scripts und Best Practices', 'Community-driven'],
    github: 'https://github.com/ugurkocde/intunemacadmins',
    stars: 68,
    forks: 31,
    tags: ['macOS', 'Community', 'Guides']
  },
  {
    id: 'intune-scripts',
    name: 'Intune Scripts Collection',
    category: 'automation',
    description: 'Sammlung von Intune-bezogenen Scripts',
    github: 'https://github.com/ugurkocde/Intune',
    stars: 75,
    forks: 15,
    tags: ['Scripts', 'Collection', 'PowerShell']
  },
  {
    id: 'kql-intune',
    name: 'KQL_Intune',
    category: 'monitoring',
    description: 'KQL-Queries speziell für Intune',
    github: 'https://github.com/ugurkocde/KQL_Intune',
    stars: 88,
    forks: 11,
    tags: ['KQL', 'Queries', 'Analytics']
  }
]

const categories = {
  'backup': { name: 'Backup & Restore', icon: Database, color: 'bg-blue-500' },
  'monitoring': { name: 'Monitoring & Reporting', icon: BarChart3, color: 'bg-green-500' },
  'device-management': { name: 'Device Management', icon: Smartphone, color: 'bg-purple-500' },
  'macos': { name: 'macOS-spezifisch', icon: Apple, color: 'bg-gray-500' },
  'security': { name: 'Security & RBAC', icon: Shield, color: 'bg-red-500' },
  'automation': { name: 'Automation', icon: Zap, color: 'bg-yellow-500' }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const totalDownloads = tools.reduce((acc, tool) => {
    if (tool.downloads && tool.downloads !== 'N/A') {
      return acc + parseInt(tool.downloads.replace(',', ''))
    }
    return acc
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Intune Management
                <span className="text-orange-500 ml-2">Shipped by Ugur</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Kostenlose Tools und Scripts für effizientes Intune Management
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" asChild>
                <a href="https://ugurkoc.de" target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4 mr-2" />
                  Website
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/ugurkocde" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Tools durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-lg py-3"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="mb-2"
            >
              Alle
            </Button>
            {Object.entries(categories).map(([key, category]) => {
              const Icon = category.icon
              return (
                <Button
                  key={key}
                  variant={selectedCategory === key ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(key)}
                  className="mb-2"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Main Tool (TenuVault) */}
        {filteredTools.find(tool => tool.isMain) && (
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-orange-50 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-blue-900 flex items-center">
                    <Database className="w-6 h-6 mr-2" />
                    TenuVault
                    <Badge className="bg-orange-500 ml-2">Haupttool</Badge>
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Backup und Restore für Intune-Umgebungen
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold">13</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Hauptfunktionen:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Automatisierte tägliche Backups</li>
                    <li>• One-Click Restore</li>
                    <li>• 100% Datensouveränität</li>
                    <li>• PowerShell + Cloud Portal</li>
                  </ul>
                </div>
                <div>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-4">
                    Install-Script -Name TenuVault
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {['Backup', 'Restore', 'SaaS', 'PowerShell'].map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" asChild>
                      <a href="https://www.tenuvault.com/" target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-1" />
                        Website
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://github.com/ugurkocde/TenuVault" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-1" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTools.filter(tool => !tool.isMain).map(tool => {
            const categoryInfo = categories[tool.category]
            const Icon = categoryInfo?.icon || Zap

            return (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow relative">
                {tool.isNew && (
                  <Badge className="absolute -top-2 -right-2 bg-green-500">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Neu
                  </Badge>
                )}
                {tool.isUpdated && (
                  <Badge className="absolute -top-2 -right-2 bg-blue-500">
                    Aktualisiert
                  </Badge>
                )}
                {tool.isPopular && (
                  <Badge className="absolute -top-2 -right-2 bg-purple-500">
                    <Users className="w-3 h-3 mr-1" />
                    Beliebt
                  </Badge>
                )}
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Icon className="w-5 h-5 mr-2" />
                      {tool.name}
                    </CardTitle>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      {tool.stars && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          {tool.stars}
                        </div>
                      )}
                      {tool.forks && (
                        <div className="flex items-center">
                          <span className="mr-1">🍴</span>
                          {tool.forks}
                        </div>
                      )}
                    </div>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                  {tool.version && (
                    <Badge variant="outline" className="w-fit">
                      v{tool.version}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium mb-2">Features:</h5>
                      <ul className="text-sm space-y-1">
                        {tool.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                    </div>

                    {tool.installation && (
                      <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
                        {tool.installation}
                      </div>
                    )}

                    {(tool.downloads || tool.users || tool.apps) && (
                      <div className="flex flex-wrap gap-2 text-xs">
                        {tool.downloads && (
                          <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                            <Download className="w-3 h-3 mr-1" />
                            {tool.downloads} Downloads
                          </div>
                        )}
                        {tool.users && (
                          <div className="flex items-center bg-purple-100 px-2 py-1 rounded">
                            <Users className="w-3 h-3 mr-1" />
                            {tool.users} Admins
                          </div>
                        )}
                        {tool.apps && (
                          <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                            <Apple className="w-3 h-3 mr-1" />
                            {tool.apps} Apps
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {tool.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      {tool.website && (
                        <Button size="sm" asChild>
                          <a href={tool.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="w-4 h-4 mr-1" />
                            Website
                          </a>
                        </Button>
                      )}
                      {tool.github && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={tool.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-1" />
                            GitHub
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-to-r from-orange-50 to-blue-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl text-orange-900">
              Schnellstart - Die wichtigsten Tools
            </CardTitle>
            <CardDescription>
              Installieren Sie diese drei Tools für den sofortigen Einstieg
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
              <div className="space-y-2">
                <div># Backup & Restore (Haupttool)</div>
                <div>Install-Script -Name TenuVault</div>
                <div className="mt-3"># Zuweisungsanalyse</div>
                <div>Install-PSResource IntuneAssignmentChecker</div>
                <div className="mt-3"># Geräte-Offboarding</div>
                <div>Install-Script -Name DeviceOffboardingManager</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-blue-600">{totalDownloads.toLocaleString()}+</div>
            <div className="text-sm text-gray-600">Downloads</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-green-600">{tools.length}+</div>
            <div className="text-sm text-gray-600">Tools</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-gray-600">Open Source</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-orange-600">1,975+</div>
            <div className="text-sm text-gray-600">Admins weltweit</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Erstellt von <strong>Ugur Koc</strong> - Microsoft MVP für Intune und Security Copilot
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://ugurkoc.de" className="text-blue-600 hover:text-blue-800">
                Blog
              </a>
              <a href="https://github.com/ugurkocde" className="text-blue-600 hover:text-blue-800">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ugur-koc/" className="text-blue-600 hover:text-blue-800">
                Newsletter
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Dokumentation erstellt von: Philipp Schmidt | Version: V1.1 | Stand: August 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

