import React from 'react'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">PeptideBase</h1>
      <p className="text-gray-600">A comprehensive database for antimicrobial peptides</p>
      
      {/* Once connected to backend, display a message */}
      <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
        Server Status: Backend Connected
      </div>
    </div>
  )
}

export default App