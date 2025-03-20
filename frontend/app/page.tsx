'use client';

import Link from 'next/link';
import { FiLogIn, FiUserPlus, FiArrowRight } from 'react-icons/fi';

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-gray-100">
        <div className="text-2xl font-bold">PhytoSense</div>
        <div className="space-x-4">
          <Link href="/login" className="flex items-center text-blue-500 hover:text-blue-700">
            <FiLogIn className="mr-1" /> Login
          </Link>
          <Link href="/signup" className="flex items-center text-blue-500 hover:text-blue-700">
            <FiUserPlus className="mr-1" /> Signup
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="p-8">
        <section className="text-center my-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to PhytoSense</h1>
          <p className="text-lg text-gray-700">
            Advanced AI-powered plant disease detection to safeguard your crops.
          </p>
          <Link href="/upload" className="inline-flex items-center mt-6 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">
            Get Started <FiArrowRight className="ml-2" />
          </Link>
        </section>

        {/* Project Details Sections */}
        <section className="my-12 grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-3">Easy Image Upload</h2>
            <p className="text-gray-700">
              Drag & drop images or capture using your device's camera.
            </p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-3">Accurate Detection</h2>
            <p className="text-gray-700">
              Leverage cutting-edge AI technology for real-time, accurate predictions.
            </p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-3">Detailed Analysis</h2>
            <p className="text-gray-700">
              Get comprehensive insights and actionable details to manage plant health.
            </p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-3">User-Friendly Interface</h2>
            <p className="text-gray-700">
              A modern, intuitive design making it simple for everyone to use.
            </p>
          </div>
        </section>

        <section className="my-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose PhytoSense?</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Combining the latest in AI with a user-centric design, PhytoSense provides a reliable and efficient solution for detecting and managing plant diseases. Protect your crops and ensure healthy yields with our innovative approach.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-6 bg-gray-100 text-center">
        © {new Date().getFullYear()} PhytoSense. All rights reserved.
      </footer>
    </div>
  );
}
