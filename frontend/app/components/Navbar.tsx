// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineMenu, 
  HiX,
  HiOutlineLogin,
  HiOutlineUserAdd,
  HiOutlineLogout,
  HiOutlineUser 
} from 'react-icons/hi';
import { FaLeaf } from 'react-icons/fa';
// import { GiPlantWatering } from 'react-icons/gi';
import { Playfair_Display } from 'next/font/google';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export default function Navbar() {
    const { user } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Team', path: '/team' },
        { name: 'Model', path: '/about' },
        { name: 'Insights', path: '/publications' },
        { name: 'Results', path: '/results' },
        { name: 'Scope', path: '/scope' },
    ];

    const menuVariants = {
        open: { 
            opacity: 1,
            y: 0,
            transition: { 
                type: 'spring',
                mass: 0.5,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        closed: { 
            opacity: 0,
            y: -20,
            transition: { 
                duration: 0.3,
                staggerChildren: 0.05,
                staggerDirection: -1
            } 
        },
    };

    const itemVariants = {
        open: { 
            opacity: 1, 
            y: 0,
            transition: { type: 'spring', stiffness: 300 }
        },
        closed: { 
            opacity: 0, 
            y: -15,
            transition: { duration: 0.2 }
        },
    };

    return (
        <nav className={`fixed left-1/2 -translate-x-1/2 top-4 z-50 
                transition-all duration-500 rounded-2xl
                ${scrolled ? 'backdrop-blur-xl bg-white/30' : 'backdrop-blur-lg bg-white/60'}
                border border-white/20 shadow-glass
                w-[90%] md:w-[65%]`}>
            
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        <Link href="/" className="flex items-center group space-x-3">
                            <motion.div
                                whileHover={{ rotate: -15, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="origin-center"
                            >
                                <FaLeaf className="w-9 h-9 text-emerald-600 transition-colors" />
                            </motion.div>
                            <span className={`${playfair.variable} text-3xl font-bold 
                                text-slate-800 tracking-tight`}>
                                PhytoSense
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex gap-8">
                            {navLinks.map((link) => (
                                <motion.div key={link.name} whileHover={{ scale: 1.05 }}>
                                    <Link
                                        href={link.path}
                                        className="relative text-slate-600 hover:text-slate-800 
                                        font-medium transition-colors"
                                    >
                                        <motion.span
                                            className="block relative py-1"
                                            initial={{ scale: 1 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {link.name}
                                            <motion.span
                                                className="absolute bottom-0 left-0 w-full h-px bg-emerald-500/50 origin-left"
                                                initial={{ scaleX: 0 }}
                                                whileHover={{ scaleX: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </motion.span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex gap-4 ml-6">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <motion.div 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 text-emerald-600"
                                    >
                                        <HiOutlineUser className="w-6 h-6" />
                                        <span className="font-medium">{user.email?.split('@')[0]}</span>
                                    </motion.div>
                                    <motion.div 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <button
                                                onClick={handleLogout}
                                                className="flex items-center px-5 py-2.5 cursor-pointer bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-all shadow-md gap-2"
                                        >
                                                <HiOutlineLogout className="w-5 h-5" />
                                                <span className="font-medium">Logout</span>
                                        </button>
                                    </motion.div>
                                </div>
                            ) : (
                                <>
                                    <motion.div 
                                        whileHover={{ scale: 1.05 }} 
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href="/login"
                                            className="flex items-center px-5 py-2.5 bg-emerald-600 text-white 
                                            rounded-xl hover:bg-emerald-700 transition-all shadow-md gap-2"
                                        >
                                            <HiOutlineLogin className="w-5 h-5" />
                                            <span className="font-medium">Login</span>
                                        </Link>
                                    </motion.div>
                                    <motion.div 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href="/signup"
                                            className="flex items-center px-5 py-2.5 border-2 border-emerald-600 
                                            text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all gap-2"
                                        >
                                            <HiOutlineUserAdd className="w-5 h-5" />
                                            <span className="font-medium">Signup</span>
                                        </Link>
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2.5 rounded-xl hover:bg-slate-100/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {mobileMenuOpen ? (
                            <HiX className="w-7 h-7 text-slate-700" />
                        ) : (
                            <HiOutlineMenu className="w-7 h-7 text-slate-700" />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="md:hidden absolute w-full top-20 bg-white/95 backdrop-blur-xl 
                        border-t border-white/20 shadow-glass"
                    >
                        <div className="px-6 py-5 space-y-3">
                            {navLinks.map((link) => (
                                <motion.div key={link.name} variants={itemVariants}>
                                    <Link
                                        href={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-5 py-3.5 text-slate-700 hover:bg-slate-100/50 
                                        rounded-xl transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="pt-6 space-y-4 border-t border-slate-100/50">
                                {user ? (
                                    <>
                                        <motion.div variants={itemVariants}>
                                        <motion.div variants={itemVariants}>
                                                <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center justify-center px-6 py-3.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 gap-2"
                                                >
                                                        <HiOutlineLogout className="w-5 h-5" />
                                                        <span className="font-medium">Logout</span>
                                                </button>
                                        </motion.div>
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <div className="flex items-center justify-center gap-2 text-emerald-600">
                                                <HiOutlineUser className="w-5 h-5" />
                                                <span>{user.email?.split('@')[0]}</span>
                                            </div>
                                        </motion.div>
                                    </>
                                ) : (
                                    <>
                                        <motion.div variants={itemVariants}>
                                            <Link
                                                href="/login"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-center px-6 py-3.5 bg-emerald-600 
                                                text-white rounded-xl hover:bg-emerald-700 gap-2"
                                            >
                                                <HiOutlineLogin className="w-5 h-5" />
                                                <span className="font-medium">Login</span>
                                            </Link>
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <Link
                                                href="/signup"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-center px-6 py-3.5 border-2 
                                                border-emerald-600 text-emerald-600 rounded-xl hover:bg-emerald-50 gap-2"
                                            >
                                                <HiOutlineUserAdd className="w-5 h-5" />
                                                <span className="font-medium">Signup</span>
                                            </Link>
                                        </motion.div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
                body {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </nav>
    );
}