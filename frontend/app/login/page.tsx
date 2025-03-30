// app/login/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiLogIn, FiArrowRight, FiLock, FiMail } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch {
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch {
      setError('Google login failed');
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

// FLoating Leaves Part
  interface Leaf {
      id: number;
      style: {
        left: string;
        top: string;
        scale: number;
        rotate: number;
      };
    }
  
    const [floatingLeaves, setFloatingLeaves] = useState<Array<Leaf>>([]);
    useEffect(() => {
      // Generate leaves only on client side
      const generatedLeaves = Array(12).fill(null).map((_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          scale: 0.5 + Math.random() * 0.5,
          rotate: Math.random() * 360
        }
      }));
      setFloatingLeaves(generatedLeaves);
    }, []);


  return (
    <div className="pt-15 bg-[#f8fcf8] min-h-screen flex items-center justify-center p-6 relative overflow-hidden"> {/* bg-slate-50*/}
    {/* Floating Leaves Background */}
          <div className="fixed inset-0 pointer-events-none">
            {floatingLeaves.map((leaf) => (
              <motion.div
                key={leaf.id}
                className="absolute text-green-300/30"
                initial={{ y: 0, x: 0, rotate: leaf.style.rotate }}
                animate={{
                  y: [0, -100, -200, 0],
                  x: [0, 50, -50, 0],
                  rotate: leaf.style.rotate + 360
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={leaf.style}
              >
                <FaLeaf className="w-8 h-8" />
              </motion.div>
            ))}
          </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <FiLogIn className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-slate-600">Continue your plant care journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          {error && <p className="text-rose-600 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-emerald-600 cursor-pointer text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2"
          >
            <FiLogIn className="w-5 h-5" />
            Login
          </motion.button>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-4 text-slate-500 text-sm">or continue with</span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            className="w-full bg-white border cursor-pointer border-slate-200 py-3.5 rounded-xl flex items-center justify-center gap-3"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="text-slate-700 font-medium">Google</span>
          </motion.button>

          <p className="mt-8 text-center text-slate-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="text-emerald-600 font-medium hover:text-emerald-700 inline-flex items-center gap-1"
            >
              Sign Up <FiArrowRight className="mt-1" />
            </Link>
          </p>
        </form>
      </motion.div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
}