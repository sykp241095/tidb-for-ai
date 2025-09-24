import React from 'react'
import { Metadata } from 'next'
import { Navigation, Footer } from '@/components/layout'
import { ErrorBoundary } from '@/components/common'

export const metadata: Metadata = {
  title: 'Terms of Service - TiDB for AI',
  description: 'Terms of Service for TiDB for AI - Legal terms and conditions for using our AI-native database platform.',
  keywords: ['terms of service', 'terms and conditions', 'legal', 'agreement'],
}

const Terms: React.FC = () => {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-white dark:bg-black">
        <Navigation />
        <div className="pt-24">
          <div className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                  Terms of Service
                </h1>

                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      1. Acceptance of Terms
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      By accessing and using TiDB for AI services, you accept and agree to be bound by the
                      terms and provision of this agreement.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      2. Description of Service
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      TiDB for AI provides an AI-native database platform that combines vector search,
                      full-text search, and MySQL compatibility for modern AI applications.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      3. User Accounts and Responsibilities
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      To access certain features of our service, you may be required to create an account.
                      You are responsible for:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                      <li>Maintaining the confidentiality of your account credentials</li>
                      <li>All activities that occur under your account</li>
                      <li>Providing accurate and complete information</li>
                      <li>Notifying us immediately of any unauthorized use</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      4. Acceptable Use Policy
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      You agree not to use our service to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe upon intellectual property rights</li>
                      <li>Transmit malicious code or conduct security attacks</li>
                      <li>Interfere with or disrupt the service</li>
                      <li>Use the service for unauthorized commercial purposes</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      5. Data and Privacy
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Your privacy is important to us. Please review our Privacy Policy, which also
                      governs your use of the service, to understand our practices.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      6. Service Availability
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We strive to provide reliable service, but we do not guarantee that the service
                      will be available at all times. We may modify, suspend, or discontinue the
                      service at any time with or without notice.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      7. Intellectual Property
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      The service and its original content, features, and functionality are owned by
                      TiDB for AI and are protected by international copyright, trademark, patent,
                      trade secret, and other intellectual property laws.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      8. Limitation of Liability
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      In no event shall TiDB for AI be liable for any indirect, incidental, special,
                      consequential, or punitive damages, including without limitation, loss of profits,
                      data, use, goodwill, or other intangible losses.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      9. Termination
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We may terminate or suspend your account and bar access to the service immediately,
                      without prior notice or liability, under our sole discretion, for any reason
                      whatsoever and without limitation.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      10. Changes to Terms
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We reserve the right to modify or replace these Terms at any time. If a revision
                      is material, we will provide at least 30 days notice prior to any new terms
                      taking effect.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      11. Contact Information
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      If you have any questions about these Terms of Service, please contact us at:
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Email: legal@tidb.ai<br />
                      Address: TiDB for AI Legal Team
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </ErrorBoundary>
  )
}

export default Terms