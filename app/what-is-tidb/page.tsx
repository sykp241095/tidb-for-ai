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
      <section className="pt-32 pb-16 px-2 sm:px-2 lg:px-4 flex flex-col">
        <div className="max-w-[90vw] lg:max-w-[95vw] mx-auto">
          <div className="text-center mb-16">
            <h1 className="relative text-4xl md:text-5xl font-bold mb-8 inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 dark:from-blue-400 dark:via-green-300 dark:to-purple-400">
                TiDB Architecture
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 dark:from-blue-400 dark:via-green-300 dark:to-purple-400 rounded-full"></span>
            </h1>
            <p className="text-base max-w-3xl mx-auto mb-0">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded mr-2 font-medium">Interactive</span>
              architecture diagram - <span className="italic">drag nodes</span> around and <span className="font-medium underline decoration-dotted underline-offset-2">zoom to explore</span>
            </p>
          </div>

          <TiDBArchitectureDiagram />

          <div className="mt-12 mb-12 text-center">
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