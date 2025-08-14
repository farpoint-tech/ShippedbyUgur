import React, { useState, useMemo } from 'react';
import { Search, Download, ExternalLink, Github, Globe, Star, Users, Package, Trophy, Zap, Wrench, Rocket } from 'lucide-react';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tools = [
    // TOP 3 TOOLS (Höchste Priorität)
    {
      id: 'intune-management',
      name: 'IntuneManagement',
      author: 'Micke-K',
      description: 'Umfassendes GUI-Tool für komplette Intune-Verwaltung',
      category: 'top3',
      priority: 1,
      features: ['Complete Intune Management', 'Backup/Restore', 'Bulk Operations', 'Policy Management'],
      github: 'https://github.com/Micke-K/IntuneManagement',
      installation: 'GitHub Clone',
      downloads: 'N/A',
      version: 'Latest',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'intune-assignment-checker',
      name: 'IntuneAssignmentChecker',
      author: 'Ugur Koc',
      description: 'Analyse und Audit von Intune-Zuweisungen',
      category: 'top3',
      priority: 2,
      features: ['Assignment Analysis', 'HTML Reports', 'Interactive Dashboard', 'Auto-Update'],
      github: 'https://github.com/ugurkocde/IntuneAssignmentChecker',
      website: 'https://intuneassignmentchecker.ugurkoc.de/',
      installation: 'Install-PSResource IntuneAssignmentChecker',
      downloads: '7,208+',
      version: 'v3.4.1',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'intune-monitoring',
      name: 'IntuneMonitoring',
      author: 'Ugur Koc',
      description: 'Azure Workbook Templates für Intune Monitoring',
      category: 'top3',
      priority: 3,
      features: ['Azure Workbooks', 'Real-time Monitoring', '60-Second Setup', 'No App Registration'],
      github: 'https://github.com/ugurkocde/IntuneMonitoring',
      website: 'https://www.intunemonitoring.com/',
      installation: 'GitHub Clone',
      downloads: 'N/A',
      version: 'Latest',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-500'
    },
    
    // ESSENTIAL TOOLS
    {
      id: 'tenuvault',
      name: 'TenuVault',
      author: 'Ugur Koc',
      description: 'Backup und Restore für Intune-Umgebungen',
      category: 'essential',
      priority: 4,
      features: ['Automated Backups', 'One-Click Restore', 'Data Sovereignty', 'Cloud Portal'],
      github: 'https://github.com/ugurkocde/TenuVault',
      website: 'https://www.tenuvault.com/',
      installation: 'Install-Script TenuVault',
      downloads: 'N/A',
      version: 'Latest',
      icon: <Star className="w-6 h-6" />,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'device-offboarding-manager',
      name: 'DeviceOffboardingManager',
      author: 'Ugur Koc',
      description: 'PowerShell GUI-Tool für Geräte-Offboarding',
      category: 'essential',
      priority: 5,
      features: ['Multi-Service Integration', 'Bulk Operations', 'Real-Time Dashboard', 'BitLocker Keys'],
      github: 'https://github.com/ugurkocde/DeviceOffboardingManager',
      website: 'https://intuneoffboarding.com/',
      installation: 'Install-Script DeviceOffboardingManager',
      downloads: '5,239+',
      version: 'v0.2.1',
      icon: <Star className="w-6 h-6" />,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'intune-offboarding',
      name: 'IntuneOffboarding',
      author: 'Ugur Koc',
      description: 'Erweiterte Offboarding-Scripts und -Tools',
      category: 'essential',
      priority: 6,
      features: ['Advanced Offboarding', 'Custom Scripts', 'Automation Ready'],
      github: 'https://github.com/ugurkocde/IntuneOffboarding',
      installation: 'GitHub Clone',
      downloads: 'N/A',
      version: 'Latest',
      icon: <Star className="w-6 h-6" />,
      color: 'from-blue-400 to-blue-600'
    },
    
    // STANDARD TOOLS
    {
      id: 'intune',
      name: 'Intune',
      author: 'Ugur Koc',
      description: 'Sammlung von Intune-bezogenen Scripts und Tools',
      category: 'standard',
      priority: 7,
      features: ['Script Collection', 'PowerShell Tools', 'Automation Scripts', 'Best Practices'],
      github: 'https://github.com/ugurkocde/Intune',
      installation: 'GitHub Clone',
      downloads: 'N/A',
      version: 'Latest',
      icon: <Wrench className="w-6 h-6" />,
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'intune-brew',
      name: 'IntuneBrew',
      author: 'Ugur Koc',
      description: 'macOS-App-Management in Intune',
      category: 'standard',
      priority: 8,
      features: ['508 Apps Available', '1,975+ Admins', 'Web Portal', 'Azure Runbook'],
      github: 'https://github.com/ugurkocde/IntuneBrew',
      website: 'https://www.intunebrew.com/',
      installation: 'Install-Script IntuneBrew',
      downloads: 'N/A',
      version: 'Latest',
      icon: <Wrench className="w-6 h-6" />,
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'autopilot-import-gui',
      name: 'Get-WindowsAutopilotImportGUI',
      author: 'Ugur Koc',
      description: 'GUI für AutoPilot-Import',
      category: 'standard',
      priority: 9,
      features: ['Group Tag Selection', 'Automatic Reboot', 'Network Troubleshooting'],
      github: 'https://github.com/ugurkocde/Get-WindowsAutopilotImportGUI',
      installation: 'Install-Script Get-WindowsAutopilotImportGUI',
      downloads: '34,829+',
      version: 'Latest',
      icon: <Wrench className="w-6 h-6" />,
      color: 'from-green-400 to-green-600'
    },
    
    // ADVANCED TOOLS
    {
      id: 'intune-rbac',
      name: 'IntuneRBAC',
      author: 'Ugur Koc',
      description: 'RBAC-Management mit Security Review Dashboard',
      category: 'advanced',
      priority: 10,
      features: ['Security Review Dashboard', 'Health Score 0-100', 'Risk Assessment', 'Interactive Reports'],
      github: 'https://github.com/ugurkocde/IntuneRBAC',
      installation: 'GitHub Clone',
      downloads: 'N/A',
      version: 'v0.5.0',
      icon: <Rocket className="w-6 h-6" />,
      color: 'from-purple-400 to-purple-600'
    }
  ];

  const categories = [
    { id: 'all', name: 'Alle Tools', icon: <Package className="w-4 h-4" /> },
    { id: 'top3', name: 'TOP 3', icon: <Trophy className="w-4 h-4" /> },
    { id: 'essential', name: 'Essential', icon: <Star className="w-4 h-4" /> },
    { id: 'standard', name: 'Standard', icon: <Wrench className="w-4 h-4" /> },
    { id: 'advanced', name: 'Advanced', icon: <Rocket className="w-4 h-4" /> }
  ];

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.priority - b.priority);
  }, [searchTerm, selectedCategory]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'top3': return <Trophy className="w-5 h-5" />;
      case 'essential': return <Star className="w-5 h-5" />;
      case 'standard': return <Wrench className="w-5 h-5" />;
      case 'advanced': return <Rocket className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'top3': return 'text-yellow-600 bg-yellow-100';
      case 'essential': return 'text-blue-600 bg-blue-100';
      case 'standard': return 'text-green-600 bg-green-100';
      case 'advanced': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-orange-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Intune Management - Shipped by Ugur
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Umfassende Sammlung von kostenlosen Tools für effizientes Microsoft Intune Management
            </p>
            
            {/* All_install_fromUgur Highlight */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 mb-6 text-white">
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">All_install_fromUgur</h2>
              </div>
              <p className="text-lg mb-4">
                🚀 Automatisches Installationsscript für alle Tools - Jetzt mit TOP 3 Priorisierung!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://raw.githubusercontent.com/farpoint-tech/ShippedbyUgur/main/All_install_fromUgur.ps1"
                  className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
                  download
                >
                  <Download className="w-5 h-5 mr-2" />
                  Script herunterladen
                </a>
                <a
                  href="https://raw.githubusercontent.com/farpoint-tech/ShippedbyUgur/main/Quick_Install_Guide.md"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
                  download
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Schnellstart-Guide
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="text-2xl font-bold text-orange-600">10+</div>
                <div className="text-gray-600">Professionelle Tools</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="text-2xl font-bold text-blue-600">47,047+</div>
                <div className="text-gray-600">Downloads insgesamt</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-gray-600">Open Source & Kostenlos</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tools durchsuchen..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div key={tool.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${tool.color}`}></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${tool.color} text-white mr-3`}>
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                      <p className="text-sm text-gray-600">von {tool.author}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getCategoryColor(tool.category)}`}>
                    {getCategoryIcon(tool.category)}
                    <span className="ml-1 capitalize">{tool.category}</span>
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{tool.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tool.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                    {tool.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{tool.features.length - 3} mehr
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Version:</span>
                    <div className="text-gray-900">{tool.version}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Downloads:</span>
                    <div className="text-gray-900">{tool.downloads}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="font-medium text-gray-600 text-sm">Installation:</span>
                  <code className="block mt-1 p-2 bg-gray-100 rounded text-sm text-gray-800 font-mono">
                    {tool.installation}
                  </code>
                </div>

                <div className="flex gap-2">
                  <a
                    href={tool.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                  {tool.website && (
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Keine Tools gefunden</h3>
            <p className="text-gray-500">Versuchen Sie einen anderen Suchbegriff oder Filter.</p>
          </div>
        )}
      </div>

      {/* Schnellstart Section */}
      <div className="bg-white border-t-4 border-gradient-to-r from-orange-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Schnellstart</h2>
            <p className="text-xl text-gray-600">Installieren Sie alle Tools mit einem einzigen Script</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">PowerShell als Administrator öffnen</h3>
              <p className="text-gray-600">Windows Key + X → "Windows PowerShell (Administrator)"</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Script herunterladen und ausführen</h3>
              <div className="bg-gray-100 rounded-lg p-4 mt-2">
                <code className="text-sm text-gray-800 font-mono">
                  Invoke-WebRequest -Uri "https://raw.githubusercontent.com/farpoint-tech/ShippedbyUgur/main/All_install_fromUgur.ps1" -OutFile "All_install_fromUgur.ps1"<br/>
                  .\All_install_fromUgur.ps1
                </code>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Tools verwenden</h3>
              <p className="text-gray-600">PowerShell neu starten und mit Microsoft Graph verbinden</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">🏆 Standard: TOP 3 Tools</h3>
              <p className="mb-4">Das Script installiert standardmäßig die 3 wichtigsten Tools:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <strong>IntuneManagement</strong><br/>
                  Komplette Intune-Verwaltung
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <strong>IntuneAssignmentChecker</strong><br/>
                  Zuweisungsanalyse
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <strong>IntuneMonitoring</strong><br/>
                  Real-time Monitoring
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Über das Projekt</h3>
              <p className="text-gray-300">
                Eine umfassende Sammlung von kostenlosen Tools für Microsoft Intune Management, 
                entwickelt von der Community für die Community.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Autoren</h3>
              <div className="space-y-2 text-gray-300">
                <div><strong>Ugur Koc</strong> - Microsoft MVP, Originalautor der Tools</div>
                <div><strong>Micke-K</strong> - IntuneManagement Tool</div>
                <div><strong>Philipp Schmidt</strong> - Sammlung und Dokumentation</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <div className="space-y-2">
                <a href="https://github.com/farpoint-tech/ShippedbyUgur" className="text-blue-400 hover:text-blue-300 flex items-center">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Repository
                </a>
                <a href="https://ugurkoc.de/" className="text-blue-400 hover:text-blue-300 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Ugur Koc Website
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Intune Management Tools Collection. Alle Tools sind Open Source und kostenlos verfügbar.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

