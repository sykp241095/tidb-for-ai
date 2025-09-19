'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import TiDBArchitectureDiagram from '@/components/TiDBArchitectureDiagram'

export default function WhatIsTiDB() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      {/* Interactive Architecture Diagram */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              TiDB Architecture
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Interactive architecture diagram - drag nodes around and zoom to explore
            </p>
          </div>

          <TiDBArchitectureDiagram />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              💡 Use mouse wheel to zoom, drag to pan, and move nodes around
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}