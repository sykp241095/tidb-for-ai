'use client'

import { Navigation, Footer } from '@/components/layout'
import { Hero } from '@/components/pages'
import { ErrorBoundary } from '@/components/common'
import Features from '@/components/Features'
import UseCases from '@/components/UseCases'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-white dark:bg-black">
        <Navigation />
        <Hero />
        <ErrorBoundary fallback={
          <div className="py-20 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Unable to load features section
            </p>
          </div>
        }>
          <Features />
        </ErrorBoundary>
        <ErrorBoundary fallback={
          <div className="py-20 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Unable to load use cases section
            </p>
          </div>
        }>
          <UseCases />
        </ErrorBoundary>
        <ErrorBoundary fallback={
          <div className="py-20 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Unable to load CTA section
            </p>
          </div>
        }>
          <CTA />
        </ErrorBoundary>
        <Footer />
      </main>
    </ErrorBoundary>
  )
}