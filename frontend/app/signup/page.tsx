'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiUserPlus } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!');
      // Redirect or perform additional actions upon successful signup
    } catch (error) {
      const err = error as unknown;
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Google signup successful!');
      // Redirect or perform additional actions upon successful signup
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(error.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-green-50">
      <h1 className="text-4xl font-bold mb-6 text-green-900 drop-shadow-lg animate-fadeIn">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="relative">
          <label className="block text-green-800 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 transition-all transform hover:scale-105"
            required
          />
        </div>
        <div className="relative">
          <label className="block text-green-800 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 transition-all transform hover:scale-105"
            required
          />
        </div>
        <div className="relative">
          <label className="block text-green-800 mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 transition-all transform hover:scale-105"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-800 text-white py-3 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-green-900"
        >
          <FiUserPlus className="inline mr-2" /> Sign Up
        </button>
      </form>
      <p className="mt-4 text-green-800">
        Already have an account?{' '}
        <Link href="/login" className="text-green-800 underline hover:text-green-900 transition-colors">
          Login
        </Link>
      </p>
      <button
        onClick={handleGoogleSignup}
        className="mt-6 w-full max-w-md flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-100 transform hover:scale-105"
      >
        <FcGoogle size={24} /> Continue with Google
      </button>
    </div>
  );
}
