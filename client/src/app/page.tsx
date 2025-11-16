'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Zap, Target, Rocket, BarChart3, FileText, Presentation, Menu, X, Brain, TrendingUp, Sparkles, ShoppingCart, CheckCircle2, Globe, Users, Megaphone, Shield, Headphones, LineChart } from 'lucide-react'
import { Ripple } from '@/components/ui/ripple'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const menuItems = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
]

export default function Home() {
  const { user, isLoaded } = useUser()
  const [menuState, setMenuState] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Ripple Effect */}
      <Ripple
        mainCircleSize={120}
        mainCircleOpacity={0.04}
        numCircles={4}
        className="opacity-30"
      />

      {/* Navigation */}
      <header>
        <nav
          data-state={menuState && "active"}
          className={cn(
            "group fixed top-0 z-20 w-full bg-white/35 backdrop-blur transition-all duration-300",
            isScrolled
              ? ""
              : "border-b border-dashed border-gray-200"
          )}
        >
          <div className="m-auto max-w-6xl px-6">
            <div className={cn(
              "flex flex-wrap items-center justify-between gap-6 lg:gap-0 transition-all duration-300",
              isScrolled ? "py-2 lg:py-2.5" : "py-3 lg:py-4"
            )}>
              <div className="flex w-full justify-between lg:w-auto">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex items-center space-x-2"
                >
                  <h1 className="text-xl font-semibold text-gray-900">Foundry</h1>
                </Link>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              <div className="bg-white group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-gray-100 p-6 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0">
                <div className="lg:pr-4">
                  <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="text-gray-600 hover:text-gray-900 block duration-150"
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:border-gray-100 lg:pl-6">
                  {user ? (
                    <Button asChild size="sm" className="bg-black hover:bg-gray-800 text-white shadow-none">
                      <Link href="/dashboard">
                        <span>Dashboard</span>
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild variant="outline" size="sm" className="shadow-none">
                        <Link href="/sign-in">
                          <span>Login</span>
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="bg-black hover:bg-gray-800 text-white shadow-none">
                        <Link href="/sign-in">
                          <span>Get Started</span>
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
        >
          <div className="w-[35rem] h-[80rem] -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-[80rem] -translate-y-87.5 absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        <section className="overflow-hidden bg-white">
          <div className="relative mx-auto max-w-5xl px-6 pt-52 pb-28 lg:pt-48 lg:pb-24">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl">
                Launch Your Business In Hours, Not Months
              </h1>
              <p className="mx-auto my-8 max-w-2xl text-xl text-gray-600">
                AI-powered platform that automates everything from market research to store setup,
                legal docs to investor pitches. Your entire business infrastructure, automated.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
                {user ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-black hover:bg-gray-800 text-white h-12 px-8 text-base font-medium">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/sign-in">
                    <Button size="lg" className="bg-black hover:bg-gray-800 text-white h-12 px-8 text-base font-medium">
                      Start Building Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto -mt-16 w-full max-w-[1400px] px-6">
            <div className="relative bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-xl border border-gray-200/50 rounded-t-2xl p-8 shadow-2xl [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
              {/* Mock Terminal/Chat Interface */}
              <div className="bg-white/90 backdrop-blur-sm border-x border-t border-gray-200/50 rounded-t-xl overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200/50 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white text-xs font-bold">
                        F
                      </div>
                      <span className="text-sm font-medium text-gray-900">Foundry AI</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pt-6 pb-0 space-y-6 h-[540px] overflow-hidden bg-gradient-to-b from-white to-gray-50/30">
                  {/* AI Message */}
                  <div className="flex gap-4 animate-in slide-in-from-left duration-500">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center flex-shrink-0 shadow-md text-white text-sm font-bold">
                      F
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-3.5 max-w-[85%] shadow-sm">
                      <p className="text-sm text-gray-800 leading-relaxed">Hi! I'm Foundry. I can help you set up your entire business infrastructure. What would you like to build today?</p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex gap-4 justify-end animate-in slide-in-from-right duration-500">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl rounded-tr-sm px-5 py-3.5 max-w-[85%] shadow-lg">
                      <p className="text-sm leading-relaxed">I want to launch an eco-friendly skincare e-commerce store</p>
                    </div>
                  </div>

                  {/* AI Response with Agent Cards */}
                  <div className="flex gap-4 animate-in slide-in-from-left duration-500">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center flex-shrink-0 shadow-md text-white text-sm font-bold">
                      F
                    </div>
                    <div className="space-y-3 max-w-[85%]">
                      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-3.5 shadow-sm">
                        <p className="text-sm text-gray-800 leading-relaxed mb-3">Perfect! I'm coordinating with our specialized agents to build your business:</p>
                      </div>

                      {/* Agent Status Cards */}
                      <div className="space-y-2">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Research Agent</p>
                            <p className="text-xs text-gray-500">Analyzing market trends & demand</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-900 animate-pulse"></div>
                            <span className="text-xs text-gray-600 font-medium">Active</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Brand Agent</p>
                            <p className="text-xs text-gray-500">Creating brand identity & assets</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-900 animate-pulse"></div>
                            <span className="text-xs text-gray-600 font-medium">Active</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">E-Commerce Agent</p>
                            <p className="text-xs text-gray-500">Setting up Shopify store</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-900 animate-pulse"></div>
                            <span className="text-xs text-gray-600 font-medium">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  <div className="flex gap-4 animate-in fade-in duration-500">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center flex-shrink-0 shadow-md text-white text-sm font-bold">
                      F
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-3 shadow-sm">
                      <div className="flex gap-1.5 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Extra content to show cut-off effect */}
                  <div className="flex gap-4 opacity-50">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center flex-shrink-0 shadow-md text-white text-sm font-bold">
                      F
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-3.5 max-w-[85%] shadow-sm">
                      <p className="text-sm text-gray-800 leading-relaxed">Great news! Your business infrastructure is ready...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* AI Agents Section */}
      <div id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">8 Specialized AI Agents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each agent is purpose-built to handle a critical aspect of your business. They work together seamlessly to automate your entire operation.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Research Agent - With visual mockup */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Market Research Agent</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Analyzes market trends, competitor landscapes, and identifies profitable opportunities in real-time.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex-1">
                <div className="space-y-4 h-full flex flex-col">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Market Size</p>
                      <p className="text-2xl font-semibold text-gray-900">$4.2B</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Growth Rate</p>
                      <p className="text-2xl font-semibold text-gray-900">+32%</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Competition Level</span>
                      <span className="text-xs text-gray-500">Updated 2h ago</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-sm h-1.5 mb-2">
                      <div className="bg-gray-900 h-1.5 rounded-sm" style={{ width: '22%' }}></div>
                    </div>
                    <p className="text-xs text-gray-600">Low competitive pressure</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Key Insights</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-900 mt-1.5"></div>
                        <p className="text-xs text-gray-600 leading-relaxed">Strong demand in urban markets (18-35 demographic)</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-900 mt-1.5"></div>
                        <p className="text-xs text-gray-600 leading-relaxed">Sustainability trends driving 40% purchase decisions</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-900 mt-1.5"></div>
                        <p className="text-xs text-gray-600 leading-relaxed">Direct-to-consumer model shows 3x higher margins</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Competitors</p>
                        <p className="text-sm font-medium text-gray-900">12 active</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Market Entry</p>
                        <p className="text-sm font-medium text-gray-900">Favorable</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Agent - With color palette */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Brand Identity Agent</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Creates comprehensive brand identity including logos, color schemes, and visual guidelines.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex-1">
                <div className="space-y-4">
                  <div className="bg-white rounded border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-gray-900">EcoGlow</p>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">Brand Identity</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">Natural beauty, sustainably crafted</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded border border-gray-200 p-3">
                      <p className="text-xs text-gray-500 mb-2">Typography</p>
                      <p className="text-sm font-medium text-gray-900">Inter, SF Pro</p>
                    </div>
                    <div className="bg-white rounded border border-gray-200 p-3">
                      <p className="text-xs text-gray-500 mb-2">Style</p>
                      <p className="text-sm font-medium text-gray-900">Modern, Clean</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">Color Palette</p>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded bg-gray-900 border border-gray-300"></div>
                      <div className="w-8 h-8 rounded bg-gray-600 border border-gray-300"></div>
                      <div className="w-8 h-8 rounded bg-gray-300 border border-gray-300"></div>
                      <div className="w-8 h-8 rounded bg-white border border-gray-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* E-Commerce Agent - With store preview */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">E-Commerce Agent</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Deploys fully-functional Shopify stores with products, payments, and inventory management.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex-1">
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Product Setup</p>
                      <p className="text-xs text-gray-500 mt-0.5">24 items configured</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-900 text-white rounded">Complete</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payment Gateway</p>
                      <p className="text-xs text-gray-500 mt-0.5">Stripe integrated</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-900 text-white rounded">Complete</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Theme Customization</p>
                      <p className="text-xs text-gray-500 mt-0.5">Brand colors applied</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-900 text-white rounded">Complete</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing Agent - With performance metrics */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Marketing Agent</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Generates targeted ad campaigns for Google and Meta with optimized copy and targeting.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Campaign Performance</p>
                    <span className="text-xs px-2 py-1 bg-gray-900 text-white rounded">Active</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded border border-gray-200 p-3">
                      <p className="text-xs text-gray-500 mb-1">Reach</p>
                      <p className="text-xl font-semibold text-gray-900">2.4K</p>
                    </div>
                    <div className="bg-white rounded border border-gray-200 p-3">
                      <p className="text-xs text-gray-500 mb-1">CTR</p>
                      <p className="text-xl font-semibold text-gray-900">4.2%</p>
                    </div>
                    <div className="bg-white rounded border border-gray-200 p-3">
                      <p className="text-xs text-gray-500 mb-1">CPC</p>
                      <p className="text-xl font-semibold text-gray-900">$0.42</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600">Running on Google Ads & Meta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Compact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Legal Agent */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Agent</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Generates LLC docs, privacy policies, terms of service, and NDAs.
              </p>
            </div>

            {/* Support Agent */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Support Agent</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                24/7 customer service automation with email and chat templates.
              </p>
            </div>

            {/* Outreach Agent */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Outreach Agent</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Finds micro-influencers and automates collaboration outreach.
              </p>
            </div>

            {/* Investor Agent */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Investor Agent</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Creates pitch decks with financials and market analysis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Everything you need. Nothing you don't.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {/* Feature 1 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">Instant deployment</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Launch your complete business infrastructure in minutes, not months
              </p>
            </div>

            {/* Feature 2 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="w-4 h-4 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">Production ready</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Thoroughly tested and launch-prepared with industry best practices
              </p>
            </div>

            {/* Feature 3 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">Intelligent automation</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                AI agents work together autonomously to handle complex business tasks
              </p>
            </div>

            {/* Feature 4 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">Real-time insights</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Track performance with detailed analytics and actionable business data
              </p>
            </div>

            {/* Feature 5 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">Compliance built-in</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Automatic generation of legal documents and regulatory compliance
              </p>
            </div>

            {/* Feature 6 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">Multi-channel ready</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Seamlessly deploy across e-commerce, social, and marketing platforms
              </p>
            </div>

            {/* Feature 7 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">Customer-first approach</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Automated support and engagement tools to delight your customers
              </p>
            </div>

            {/* Feature 8 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <LineChart className="w-4 h-4 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">Scale automatically</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Infrastructure that grows with your business without manual intervention
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
          </div>

          <div className="relative">
            {/* Timeline Lines - with gaps */}
            <div className="hidden lg:block absolute top-3 left-0 right-0">
              <div className="absolute h-0.5 bg-gray-200" style={{ left: '12%', width: '18%' }}></div>
              <div className="absolute h-0.5 bg-gray-200" style={{ left: '45%', width: '18%' }}></div>
              <div className="absolute h-0.5 bg-gray-200" style={{ left: '78%', width: '18%' }}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 relative">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <ArrowRight className="w-6 h-6 text-gray-900" />
                  <span className="text-sm font-medium text-gray-500">Step 1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Describe your vision</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Tell us about your business idea, target market, and goals. Our AI understands your vision and translates it into actionable plans.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-gray-900" />
                  <span className="text-sm font-medium text-gray-500">Step 2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI builds everything</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Watch as 8 specialized agents work together to create your store, branding, legal docs, marketing campaigns, and investor materials.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="w-6 h-6 text-gray-900" />
                  <span className="text-sm font-medium text-gray-500">Step 3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Launch & scale</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Deploy your complete business infrastructure and let AI agents handle operations, optimization, and growth on autopilot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Start building your business with AI-powered tools
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {user ? (
              <Link href="/dashboard">
                <Button size="sm" className="bg-black hover:bg-gray-800 text-white h-10 px-6 text-sm font-medium">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link href="/sign-in">
                <Button size="sm" className="bg-black hover:bg-gray-800 text-white h-10 px-6 text-sm font-medium">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-lg font-semibold text-gray-900">Foundry</span>
            </div>
            <p className="text-sm text-gray-500 text-center md:text-right">
              © 2025 Foundry. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
