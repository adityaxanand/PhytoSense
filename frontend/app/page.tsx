'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useTransform, useScroll } from 'framer-motion';
import { 
  FiUpload, 
  FiActivity, 
  FiBarChart2, 
  FiGlobe, 
  FiArrowRight, 
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiPlay,
  FiInfo
} from 'react-icons/fi';
import { FaLeaf, FaSeedling } from 'react-icons/fa';
import { FaBoxesStacked } from 'react-icons/fa6';
import ScrollIndicator from './components/ScrollIndicator';
// import LinkedinHead from './components/LinkedinHead';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: FiUpload, title: "Easy Image Upload", color: "bg-amber-400" },
    { icon: FiActivity, title: "Accurate Detection", color: "bg-emerald-400" },
    { icon: FiBarChart2, title: "Detailed Analysis", color: "bg-teal-400" },
    { icon: FiGlobe, title: "Global Impact", color: "bg-sky-400" },
  ];


  //FLoating Elements
  const [floatingLeaves, setFloatingLeaves] = useState<{ id: number; style: { left: string; top: string; scale: number; rotate: number } }[]>([]);
  
  useEffect(() => {
    const leaves = [...Array(12)].map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        scale: 0.5 + Math.random() * 0.5,
        rotate: Math.random() * 360
      }
    }));
    setFloatingLeaves(leaves);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
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

      {/* Animated Progress Orb */}
      <motion.div 
        className="fixed right-8 bottom-8 w-16 h-16 rounded-full bg-emerald-500 shadow-xl z-50"
        style={{ scale }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
          {Math.round(scrollProgress)}%
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-center"
        >
          <div className="relative inline-block">
            <FaLeaf className="text-emerald-900 w-24 h-24 mb-8 animate-float" />
            <div className="absolute inset-0 bg-emerald-100 blur-2xl opacity-50 rounded-full" />
          </div>
            <h1 className="text-6xl font-bold text-emerald-800 mb-6 font-sans font-poppins font-extrabold">
            Phyto<span className="text-stone-700">Sense</span>
            </h1>
          <p className="text-2xl text-emerald-700 mb-12 max-w-2xl leading-relaxed font-semibold">
            Revolutionizing agriculture through AI-powered plant health analysis
          </p>
          <motion.div whileHover={{ scale: 1 }}>
            <Link
              href="/upload"
              className="inline-flex items-center px-12 py-5 bg-emerald-800 text-white rounded-full 
              hover:bg-emerald-900 transition-all shadow-lg text-lg font-medium group"
            >
              <span>Get Started</span>
              <FiArrowRight className="ml-4 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scrolling Indicator */}
        <ScrollIndicator />
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          className={`p-8 rounded-3xl ${feature.color} bg-opacity-30 backdrop-blur-md 
          hover:bg-opacity-40 hover:shadow-xl transition-all duration-300 group`}
        >
          <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20 shadow-md group-hover:scale-110 transition-transform">
            <feature.icon className="w-10 h-10 text-yellow-600 group-hover:text-opacity-90 transition-colors" />
          </div>
          <h3 className="text-xl font-semibold text-white text-opacity-90 mb-4 font-sans tracking-wide group-hover:text-opacity-100 transition-colors">
            {feature.title}
          </h3>
          <p className="text-white text-opacity-70 leading-relaxed font-light group-hover:text-opacity-90 transition-colors">
            {[
          "Intuitive interface for quick plant image submission",
          "Advanced neural networks for precise disease detection",
          "Comprehensive health reports with actionable insights",
          "Supporting sustainable farming worldwide"
            ][i]}
          </p>
        </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 bg-emerald-50">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl font-extrabold text-emerald-800 leading-tight">
              See It in Action
            </h2>
            <p className="text-emerald-700 text-lg leading-relaxed">
              Experience how PhytoSense leverages cutting-edge computer vision to analyze plant health in real-time.
            </p>
            <div className="flex gap-6">
              <motion.button
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-[10px] shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-medium tracking-wide"
                onClick={() => {
                  const iframe = document.querySelector('iframe');
                  if (iframe) {
                    iframe.src += "&autoplay=1";
                  }
                }}
              >
                <span className="flex items-center gap-2">
                  <FiPlay className="w-5 h-5" />
                  Watch Demo
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 cursor-pointer border-emerald-500 text-emerald-500 rounded-[10px] shadow-lg hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300 text-lg font-medium tracking-wide"
              >
                <span className="flex items-center gap-2">
                  <FiInfo className="w-5 h-5" />
                  Learn More
                </span>
              </motion.button>
            </div>
          </div>
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="aspect-video bg-emerald-100 rounded-2xl shadow-xl overflow-hidden"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/4tqPU5fxilk?si=rqg08_i6mYLnJb6L"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50, y: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-amber-300 rounded-2xl rotate-12 shadow-lg"
            />
            <motion.div
              initial={{ opacity: 0, x: -50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-teal-300 rounded-2xl -rotate-12 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-12">
        Our Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: "99%+", label: "Accuracy Rate", icon: FiBarChart2 },
          { value: "75K+", label: "Plants Analyzed", icon: FaSeedling },
          { value: "38+", label: "Diseases Detected", icon: FiActivity },
          { value: "6+", label: "Models", icon: FaBoxesStacked },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="relative p-8 text-center bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
          <stat.icon className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="mt-10 text-5xl font-extrabold text-emerald-700 group-hover:text-emerald-800 transition-colors duration-300">
          {stat.value}
            </div>
            <div className="text-lg font-medium text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300">
          {stat.label}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-emerald-100 opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-300"></div>
          </motion.div>
        ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"> {/* Initially grid-cols-4 was there I changed to add linkedin header to 5 */}
        {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12"> */}
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <FaLeaf className="w-8 h-8 text-emerald-400" />
              <span className="text-xl font-semibold">PhytoSense</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering agriculture through intelligent plant health solutions
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-emerald-400 font-medium mb-4">Solutions</h4>
            <nav className="space-y-3">
              <Link href="/farmers" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                For Farmers
              </Link>
              <Link href="/enterprise" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Application Solutions
              </Link>
              <Link href="/research" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Research
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-emerald-400 font-medium mb-4">Resources</h4>
            <nav className="space-y-3">
              <Link href="/blog" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Insights
              </Link>
              <Link href="/documentation" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Documentation
              </Link>
              <Link href="/case-studies" className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm">
                Case Studies
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-emerald-400 font-medium mb-4">Connect</h4>
            <div className="space-y-3 text-sm">
              <p className="text-slate-300">contact@phytosense.com</p>
              <p className="text-slate-300">+91 69696 96969</p>
              <div className="flex gap-4 mt-4">
                <Link href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  <FiLinkedin className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  <FiTwitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  <FiGithub className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Linkedin Head */}
          <div className="space-y-4">
            <h4 className="text-emerald-400 font-medium mb-4">{/* Put the label sth like Connect on linkedin or etc. */}</h4>
            <div className="space-y-3 text-sm">
              {/* <LinkedinHead /> */}
            </div>
          </div>
          
          
        </div>

        

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} PhytoSense. All rights reserved.
          </p>
        </div>
      </div>
      </footer>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }

        @keyframes scroll-pulse {
        0% { transform: translateY(0); opacity: 0.8; }
        50% { transform: translateY(8px); opacity: 1; }
        100% { transform: translateY(0); opacity: 0.8; }
      }
      `}</style>
    </div>
  );
}