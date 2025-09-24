import React from 'react'
import { Metadata } from 'next'
import { Navigation, Footer } from '@/components/layout'
import { ErrorBoundary } from '@/components/common'

export const metadata: Metadata = {
  title: 'Privacy Policy - TiDB for AI',
  description: 'Privacy Policy for TiDB for AI - Learn how we collect, use, and protect your personal information.',
  keywords: ['privacy policy', 'data protection', 'GDPR', 'privacy'],
}

const Privacy: React.FC = () => {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-white dark:bg-black">
        <Navigation />
        <div className="pt-24">
          <div className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                  Privacy Policy
                </h1>

                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      1. Information We Collect
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We collect information you provide directly to us, such as when you create an account,
                      use our services, or contact us for support.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                      <li>Account information (name, email address, password)</li>
                      <li>Usage data and analytics</li>
                      <li>Device and browser information</li>
                      <li>IP address and location data</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      2. How We Use Your Information
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                      <li>Provide, maintain, and improve our services</li>
                      <li>Process transactions and send related information</li>
                      <li>Send technical notices and support messages</li>
                      <li>Respond to your comments and questions</li>
                      <li>Monitor and analyze trends and usage</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      3. Information Sharing
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We do not sell, trade, or otherwise transfer your personal information to third parties
                      without your consent, except as described in this policy.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      4. Data Security
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We implement appropriate technical and organizational security measures to protect
                      your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      5. Data Retention
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We retain your personal information for as long as necessary to provide our services
                      and fulfill the purposes outlined in this policy, unless a longer retention period
                      is required or permitted by law.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      6. Your Rights
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      You have the right to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                      <li>Access your personal information</li>
                      <li>Correct inaccurate or incomplete information</li>
                      <li>Delete your personal information</li>
                      <li>Object to processing of your information</li>
                      <li>Data portability</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      7. Cookies and Tracking
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We use cookies and similar tracking technologies to enhance your experience.
                      For more information, please see our Cookie Policy.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      8. Contact Us
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      If you have any questions about this Privacy Policy, please contact us at:
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Email: privacy@tidb.ai<br />
                      Address: TiDB for AI Privacy Team
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

export default Privacy