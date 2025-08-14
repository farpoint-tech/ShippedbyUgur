import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Intune Management
            <span className="text-orange-500 ml-2">Shipped by Ugur</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Kostenlose Tools und Scripts für effizientes Intune Management
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-orange-50">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">
              TenuVault
              <Badge className="bg-orange-500 ml-2">Haupttool</Badge>
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Backup und Restore für Intune-Umgebungen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Das wichtigste Tool für automatisierte Backups und One-Click Restore.
            </p>
            <div className="mt-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Mehr erfahren
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default App

