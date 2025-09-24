import React from 'react'
import { Metadata } from 'next'
import { Navigation, Footer } from '@/components/layout'
import { ErrorBoundary } from '@/components/common'

export const metadata: Metadata = {
  title: 'Cookie Policy - TiDB for AI',
  description: 'Cookie Policy for TiDB for AI - Learn about how we use cookies and similar tracking technologies.',
  keywords: ['cookie policy', 'cookies', 'tracking', 'privacy'],
}

const Cookies: React.FC = () => {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-white dark:bg-black">
        <Navigation />
        <div className="pt-24">
          <div className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                  Cookie Policy
                </h1>

                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      1. What Are Cookies?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Cookies are small text files that are placed on your device when you visit our website.
                      They help us provide you with a better experience by remembering your preferences and
                      understanding how you use our service.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      2. Types of Cookies We Use
                    </h2>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Essential Cookies
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        These cookies are necessary for the website to function properly. They enable basic
                        functions like page navigation and access to secure areas.
                      </p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                        <li>Authentication cookies</li>
                        <li>Security cookies</li>
                        <li>Session management cookies</li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Analytics Cookies
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        These cookies help us understand how visitors interact with our website by
                        collecting and reporting information anonymously.
                      </p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                        <li>Google Analytics</li>
                        <li>Usage statistics</li>
                        <li>Performance monitoring</li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Functional Cookies
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        These cookies enable enhanced functionality and personalization, such as
                        remembering your preferences and settings.
                      </p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                        <li>Theme preferences (dark/light mode)</li>
                        <li>Language preferences</li>
                        <li>User interface customizations</li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Marketing Cookies
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        These cookies track your browsing habits to enable us to show advertising
                        which is more likely to be of interest to you.
                      </p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                        <li>Advertising cookies</li>
                        <li>Social media integration</li>
                        <li>Remarketing pixels</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      3. Third-Party Cookies
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We may use third-party services that place cookies on your device. These include:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                      <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                      <li><strong>Social Media Platforms:</strong> For social sharing and login functionality</li>
                      <li><strong>CDN Services:</strong> For content delivery and performance optimization</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      4. Managing Your Cookie Preferences
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      You have several options for managing cookies:
                    </p>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Browser Settings
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        Most browsers allow you to control cookies through their settings:
                      </p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                        <li>Block all cookies</li>
                        <li>Block third-party cookies only</li>
                        <li>Delete cookies when you close your browser</li>
                        <li>Allow cookies from specific sites</li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Opt-Out Links
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        You can opt out of specific tracking services:
                      </p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                        <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 dark:text-blue-400 hover:underline">Google Analytics Opt-out</a></li>
                        <li><a href="https://www.youronlinechoices.com/" className="text-blue-600 dark:text-blue-400 hover:underline">Your Online Choices</a></li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      5. Cookie Retention
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Different cookies have different lifespans:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                      <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                      <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until manually deleted</li>
                      <li><strong>Essential cookies:</strong> Retained for the duration of your session</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      6. Updates to This Policy
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We may update this Cookie Policy from time to time. We will notify you of any
                      changes by posting the new policy on this page and updating the &quot;last updated&quot; date.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      7. Contact Us
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      If you have any questions about this Cookie Policy, please contact us at:
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

export default Cookies