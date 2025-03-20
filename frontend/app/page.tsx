'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FiUpload,
  FiActivity,
  FiBarChart2,
  FiGlobe,
  FiArrowRight,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Update scroll progress meter based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      const percent = (currentScroll / totalScroll) * 100;
      setScrollProgress(percent);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Markers for timeline (desktop only)
  const markers = [
    { threshold: 10, label: 'Upload', icon: <FiUpload size={18} /> },
    { threshold: 40, label: 'Detect', icon: <FiActivity size={18} /> },
    { threshold: 70, label: 'Analyze', icon: <FiBarChart2 size={18} /> },
    { threshold: 90, label: 'Impact', icon: <FiGlobe size={18} /> },
  ];

  return (
    <>
      <div className="relative bg-green-50 text-slate-800 min-h-screen">
        {/* Vertical Timeline Meter (hidden on mobile) */}
        <div className="hidden md:block fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
          <div className="w-2 h-80 bg-gray-200 rounded-full relative overflow-hidden shadow-inner">
            <div
              style={{ height: `${scrollProgress}%` }}
              className="bg-green-800 rounded-full transition-all duration-300"
            ></div>
            {markers.map((marker, idx) => {
              const active = scrollProgress >= marker.threshold;
              return (
                <div
                  key={idx}
                  style={{ top: `${(marker.threshold / 100) * 80 - 7}px` }}
                  className={`absolute left-[-6px] flex items-center gap-1 transform -translate-y-1/2 transition-all duration-300 text-xs font-medium ${
                    active ? 'text-green-800' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      active ? 'bg-green-800' : 'bg-gray-400'
                    }`}
                  ></div>
                  <span>{marker.label}</span>
                  <span>{marker.icon}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 bg-white bg-opacity-95 shadow-sm sticky top-0 z-40">
          <div className="flex items-center space-x-2">
            <FaLeaf size={28} className="text-green-800 animate-spin-slow" />
            <span className="text-xl font-bold text-green-800">PhytoSense</span>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/login"
              className="flex items-center justify-center w-32 h-10 border-2 border-blue-900 text-blue-900 bg-transparent rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-900 hover:text-white text-base"
            >
              <FiLogIn className="mr-1" /> Login
            </Link>
            <Link
              href="/signup"
              className="flex items-center justify-center w-32 h-10 border-2 border-blue-900 text-blue-900 bg-transparent rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-900 hover:text-white text-base"
            >
              <FiUserPlus className="mr-1" /> Signup
            </Link>
          </div>
          {/* Mobile Nav Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <FiX size={24} className="text-green-800" />
              ) : (
                <FiMenu size={24} className="text-green-800" />
              )}
            </button>
          </div>
        </nav>
        {/* Mobile Nav Popup */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col space-y-2 z-50">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full h-10 border-2 border-blue-900 text-blue-900 bg-transparent rounded-lg transition-all duration-300 hover:bg-blue-900 hover:text-white text-sm"
            >
              <FiLogIn className="mr-1" /> Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full h-10 border-2 border-blue-900 text-blue-900 bg-transparent rounded-lg transition-all duration-300 hover:bg-blue-900 hover:text-white text-sm"
            >
              <FiUserPlus className="mr-1" /> Signup
            </Link>
          </div>
        )}

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-50 to-green-100 px-4 py-12">
          <FaLeaf size={64} className="text-green-800 mb-4 animate-bounce" />
          <h1 className="text-5xl font-extrabold text-green-900 mb-4 text-center drop-shadow-md">
            Welcome to PhytoSense
          </h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-3xl text-center">
            Advanced AI-powered plant disease detection to safeguard your crops globally.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center px-8 py-4 bg-green-800 text-white rounded-full hover:bg-green-900 transition-colors duration-300 shadow-lg"
          >
            Get Started <FiArrowRight className="ml-3" />
          </Link>
        </section>

        {/* Scrolling Content Sections in Soft Card Format */}
        <section className="px-6 py-12 bg-white">
          <div className="max-w-4xl mx-auto space-y-20">
            {/* Section 1: Easy Image Upload */}
            <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <FiUpload size={32} className="text-green-800" />
                <h2 className="text-4xl font-semibold text-green-900">Easy Image Upload</h2>
              </div>
              <p className="text-xl text-gray-600">
                Simply drag &amp; drop your plant image or capture it using your device&apos;s camera.
              </p>
            </div>
            {/* Section 2: Accurate Detection */}
            <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <FiActivity size={32} className="text-green-800" />
                <h2 className="text-4xl font-semibold text-green-900">Accurate Detection</h2>
              </div>
              <p className="text-xl text-gray-600">
                Our state-of-the-art AI analyzes your images in real time, ensuring reliable and precise diagnostics.
              </p>
            </div>
            {/* Section 3: Detailed Analysis */}
            <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <FiBarChart2 size={32} className="text-green-800" />
                <h2 className="text-4xl font-semibold text-green-900">Detailed Analysis</h2>
              </div>
              <p className="text-xl text-gray-600">
                Receive comprehensive insights and actionable recommendations to improve plant health and maximize yields.
              </p>
            </div>
            {/* Section 4: Global Impact */}
            <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <FiGlobe size={32} className="text-green-800" />
                <h2 className="text-4xl font-semibold text-green-900">Global Impact</h2>
              </div>
              <p className="text-xl text-gray-600">
                Trusted by farmers worldwide, PhytoSense is revolutionizing sustainable agriculture on a global scale.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-6 bg-white text-center shadow-sm">
          © {new Date().getFullYear()} PhytoSense
        </footer>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
        body {
          font-family: 'Roboto', sans-serif;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </>
  );
}
