import React, { useState } from 'react';
import { Search, Database, Activity, AlertTriangle, Shield } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";  // Changed from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PeptideDatabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeptide, setSelectedPeptide] = useState(null);

  // Mock data for demonstration
  const mockPeptides = [
    {
      id: 'PEP001',
      sequence: 'KLWMRWYSPTTRRYG',
      length: 15,
      properties: {
        antimicrobialActivity: 0.85,
        hostToxicity: 0.12,
        stability: 0.76,
        membraneAffinity: 0.92
      },
      source: 'Komodo Dragon (Varanus komodoensis)',
      experimentalData: {
        effectiveAgainst: ['S. aureus', 'E. coli', 'P. aeruginosa'],
        minInhibitoryConc: '2.5 µg/mL',
        experimentDate: '2024-01-15'
      }
    },
    // More mock data would be here in production
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    // In production, this would trigger an API call
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Antimicrobial Peptide Database</h1>
        <p className="text-gray-600">Comprehensive database of peptide sequences and their antimicrobial properties</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="flex gap-4 max-w-2xl">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by sequence, properties, or source organism..."
              className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Search className="absolute right-4 top-4 text-gray-400" />
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sequences</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,000,000</div>
            <p className="text-xs text-muted-foreground">
              Experimentally validated peptides
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Peptides</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245,678</div>
            <p className="text-xs text-muted-foreground">
              With antimicrobial activity
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Tests</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">754,322</div>
            <p className="text-xs text-muted-foreground">
              Negative results recorded
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resistant Strains</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              Targeted pathogens
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPeptides.map((peptide) => (
          <Card 
            key={peptide.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedPeptide(peptide)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{peptide.id}</CardTitle>
              <CardDescription>Source: {peptide.source}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Sequence</p>
                  <p className="font-mono">{peptide.sequence}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Activity</p>
                    <p className="text-lg font-semibold">
                      {(peptide.properties.antimicrobialActivity * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Toxicity</p>
                    <p className="text-lg font-semibold">
                      {(peptide.properties.hostToxicity * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={selectedPeptide !== null} onOpenChange={() => setSelectedPeptide(null)}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              {selectedPeptide?.id} Details
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              {selectedPeptide && (
                <>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <h3 className="font-semibold mb-2">Source Organism</h3>
                      <p>{selectedPeptide.source}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Sequence</h3>
                      <p className="font-mono bg-gray-100 p-2 rounded">
                        {selectedPeptide.sequence}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <h3 className="font-semibold mb-2">Antimicrobial Activity</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{width: `${selectedPeptide.properties.antimicrobialActivity * 100}%`}}
                          ></div>
                        </div>
                        <span className="text-sm">
                          {(selectedPeptide.properties.antimicrobialActivity * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Host Toxicity</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-red-600 h-2.5 rounded-full" 
                            style={{width: `${selectedPeptide.properties.hostToxicity * 100}%`}}
                          ></div>
                        </div>
                        <span className="text-sm">
                          {(selectedPeptide.properties.hostToxicity * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PeptideDatabase;