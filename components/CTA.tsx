'use client'

import { ArrowRight, Check, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-1 mb-12">
          <div className="bg-white dark:bg-black rounded-[22px] px-12 py-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-full px-4 py-2 mb-8">
              <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Join 10,000+ AI developers
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Build with
              <br />
              <span className="gradient-text">AI-Native TiDB?</span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Start building intelligent applications today with our free tier.
              Scale as you grow with enterprise-grade reliability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="group bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                Start Free Trial
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 font-semibold text-lg">
                Browse Examples
              </button>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-6 text-left max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center shrink-0">
                  <Check size={16} className="text-green-600 dark:text-green-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center shrink-0">
                  <Check size={16} className="text-green-600 dark:text-green-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">5GB free storage</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center shrink-0">
                  <Check size={16} className="text-green-600 dark:text-green-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Community support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary CTAs */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg group">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need Enterprise Support?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Get dedicated support, custom deployment options, and enterprise-grade SLAs
              for your production AI applications.
            </p>
            <button className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all duration-200">
              Contact Sales
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg group">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Community
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Connect with other AI developers, share your projects, and get help
              from our community of experts.
            </p>
            <button className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all duration-200">
              Join Discord
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}