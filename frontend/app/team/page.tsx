'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaLeaf } from 'react-icons/fa';
import { FaGoogleScholar, FaXTwitter } from 'react-icons/fa6';
import { IoIosPeople } from "react-icons/io";

// const floatingLeaves = [...Array(12)].map((_, i) => ({
//   id: i,
//   style: {
//     left: `${Math.random() * 100}%`,
//     top: `${Math.random() * 100}%`,
//     scale: 0.5 + Math.random() * 0.5,
//     rotate: Math.random() * 360
//   }
// }));

const skillStyles = [
  { bg: 'bg-green-100', text: 'text-green-700' },
  { bg: 'bg-blue-100', text: 'text-blue-700' },
  { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  { bg: 'bg-purple-100', text: 'text-purple-700' },
  { bg: 'bg-pink-100', text: 'text-pink-700' },
  { bg: 'bg-indigo-100', text: 'text-indigo-700' },
];

const teamMembers = [
  {
    name: 'Sneha Dwivedi',
    image: 'https://i.ibb.co/wFB0nxmF/snehaa.jpg',
    about: 'BACKEND DEV & ML ENGINEER',
    skills: ['PYTHON', 'FLASK', 'AI/ML', 'HUGGING FACE', 'FIREBASE', 'API'],
    contribution: 'Developed the entire Backend while Researching & contributing to multiple Model Training.',
    github: 'https://github.com/dwivedisneha',
    linkedin: 'https://linkedin.com/in/sneha-dwivedi-0b413426b',
    instagram: 'https://instagram.com/_snehadwivedi26',
    doodle: { color: 'bg-pink-200', image: '/images/doodle-pink.png' },
  },
  { 
    name: 'Aditya',
    image: 'https://i.ibb.co/S4CjwKCb/addiii.jpg',
    about: 'AI/ML ENGINEER & FULL-STACK DEV',
    skills: ['PYTHON', 'AI/ML', 'PYTORCH', 'NEXT.JS', 'API', 'DEEP LEARNING'],
    contribution: 'Developed & Finetuned Core & Multiple ML Models & Integrated it into the Platform.',
    github: 'https://github.com/adityaxanand',
    linkedin: 'https://linkedin.com/in/adityaxanand',
    instagram: 'https://instagram.com/anandxaditya',
    doodle: { color: 'bg-blue-200', image: '/images/doodle-blue.png' },
  },
  {
    name: 'Shruti Kumari',
    image: 'https://i.ibb.co/B5dw8K7S/shruti.jpg',
    about: 'ML/FRONTEND DEV & UI/UX DESIGNER',
    skills: ['TAILWIND CSS', 'FRAMER MOTION', 'AI/ML', 'FIGMA', 'NEXT.JS'],
    contribution: 'Designed the entire UI & Optimized User Experience & contributed in training multiple Models.',
    github: 'https://github.com/shruti',
    linkedin: 'https://linkedin.com/in/shruti',
    instagram: 'https://instagram.com/shruti',
    doodle: { color: 'bg-blue-200', image: '/images/doodle-blue.png' },
  },
  {
    name: 'Shubham Mohapatra',
    image: 'https://i.ibb.co/tMb9sFmY/shubhh.jpg',
    about: 'ML ENGINEER & FULL-STACK APPLICATION DEV',
    skills: ['TENSORFLOW', 'FLASK', 'REACT NATIVE', 'POSTMAN', 'PYTHON', 'AI/ML'],
    contribution: 'Significantly contributed in Creating & Training the core Model, Architecture & API Endpoints.',
    github: 'https://github.com/shubham',
    linkedin: 'https://linkedin.com/in/shubham',
    instagram: 'https://instagram.com/shubham',
    doodle: { color: 'bg-blue-200', image: '/images/doodle-blue.png' },
  },
  {
    name: 'Ajit Pal',
    image: 'https://i.ibb.co/cXDZPfCH/pal.jpg',
    about: 'DATA ENGINEER & ML DEV',
    skills: ['PYTHON', 'OPENCV', 'SCIKIT-IMAGE', 'ML', 'NUMPY'],
    contribution: 'Contributed in Dataset Creation, Feature Extraction, Augmentation & Visualization.',
    github: 'https://github.com/ajit',
    linkedin: 'https://www.linkedin.com/in/ajit-pal-709b82278/',
    instagram: 'https://instagram.com/_ajitpal21',
    doodle: { color: 'bg-blue-200', image: '/images/doodle-blue.png' },
  },
  {
    name: 'Trishit Kr. Maity',
    image: 'https://i.ibb.co/hx6LRhzD/trishit.jpg',
    about: 'AI/ML DEV & DATA ENGINEER',
    skills: ['PYTHON', 'OPENCV', 'ML', 'POSTMAN', 'NUMPY'],
    contribution: 'Researched & worked with Evaluation, Testing & Data Preprocessing.',
    github: 'https://github.com/trishit',
    linkedin: 'https://linkedin.com/in/trishit',
    instagram: 'https://instagram.com/trishit',
    doodle: { color: 'bg-blue-200', image: '/images/doodle-blue.png' },
  },
];

const mentorDetails = {
  name: 'Dr. Sourav Kumar Giri',
  image: 'https://i.ibb.co/Kp19WYJJ/Sourav.jpg',
  about: 'Asst. Professor, KIIT University',
  bio: 'Sourav Kumar Giri received the bachelor’s degree(B.Tech) in computer science and engineering from the National Institute of Technology Rourkela, Odisha, India in 2009, the M.Tech degree in information & communication technology from the Indian Institute of Technology Kharagpur, WestBengal in 2015. He is having more than 13 years of experience in teaching & academics and more than 6 years of experience in research. One of his manuscript entitled "Intelligent computing on time-series data analysis and prediction of COVID-19 pandemics" is listed in global literature on CORONA virus disease on the official website of the World Health Organization (WHO).',
  researchAreas: ['Machine Learning', 'Artificial Intelligence', 'Blockchain Technology'],
  email: 'sourav.girifcs@kiit.ac.in',
  socialLinks: {
    twitter: 'https://x.com/souravkumargiri',
    linkedin: 'https://www.linkedin.com/in/sourav-kumar-giri-30b13b18/',
    googleScholar: 'https://scholar.google.com/citations?user=SmZ7N5cAAAAJ&hl=en'
  },
  publications: [
    { 
      title: 'A novel CNN-LSTM hybrid model for prediction of electro-mechanical impedance signal based bond strength monitoring', 
      year: 2022,
      link: 'https://www.mdpi.com/1424-8220/22/24/9920'
    },
    { 
      title: 'Intelligent computing on time-series data analysis and prediction of COVID-19 pandemics', 
      year: 2021,
      link: 'https://www.sciencedirect.com/science/article/pii/S0167865521002762'
    },
    { 
      title: 'BIFM: Big-data driven intelligent forecasting model for COVID-19', 
      year: 2021,
      link: 'https://ieeexplore.ieee.org/abstract/document/9474452/'
    }
  ],
  doodle: { color: 'bg-purple-200', image: '/images/doodle-purple.png' }
};



export default function TeamPage() {

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
    <div className="min-h-screen bg-[#f8fcf8] text-gray-900 font-inter overflow-hidden pt-20 scroll-smooth" style={{scrollBehavior: 'smooth'}}>
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

      {/* Hero Section */}
      <motion.header 
        className="pt-24 pb-16 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="mb-8 inline-block"
            whileHover={{ scale: 1.1 }}
          >
            <IoIosPeople className="w-34 h-34 text-emerald-800 mb-8 animate-float" />
          </motion.div>
          
          <h1 className="text-6xl font-black text-green-800 leading-tight font-poppins">
            Cultivating Innovation with
            <br />
            <span className="text-emerald-800 bg-[#f8fcf8] px-4 relative z-10">
              Phyto<span className="text-stone-700">Sense</span>
              <motion.div
                className="absolute -left-4 -right-4 bottom-0 h-3 bg-green-200/50 -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </span>
          </h1>
          
          <div className="mt-8 max-w-2xl mx-auto">
            <motion.p 
              className="text-xl text-green-800/90 font-medium font-poppins"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              A collective of passionate innovators merging botany with 
              cutting-edge AI to nurture healthier ecosystems
            </motion.p>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-1 w-24 bg-green-300/40 rounded-full" />
          <FaLeaf className="text-green-500/60 w-8 h-8 animate-pulse" />
          <div className="h-1 w-24 bg-green-300/40 rounded-full" />
        </div>
      </motion.header>

      {/* Mission Section */}
      <motion.div 
        className="max-w-5xl mx-4 lg:mx-auto mb-20 p-8 bg-white/95 backdrop-blur-lg rounded-3xl shadow-lg border border-green-200/30"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-green-900 mb-4 font-poppins">
              Our Botanical Mission
            </h2>
            <p className="text-green-800/90 leading-relaxed">
              We&apos;re pioneering AI-driven plant health solutions through:
            </p>
            <ul className="mt-4 space-y-3">
              {['Neural networks trained on 75k+ plant images', 'Real-time disease pattern recognition', 'Sustainable agricultural insights', 'Pretrained on 50M Dataset of VGG, GoogleNet & ResNet'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-green-800/90">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50/50 rounded-xl p-6 flex flex-col items-center justify-center space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">6.2M+</div>
              <div className="text-sm text-green-700/80 font-medium">Plant Data Points Analyzed</div>
            </div>
            <div className="w-16 h-1 bg-green-300 rounded-full" />
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">99.7%</div>
              <div className="text-sm text-green-700/80 font-medium">Detection Accuracy Rate</div>
            </div>
          </div>
        </div>
      </motion.div>

      <h2 className="text-3xl font-bold text-green-900 mb-8 text-center font-poppins">
          Our Team (Led By: &quot;We don&apos;t know &quot;)
        </h2>

      {/* Enhanced Profile Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="relative group bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden" // border border-green-100
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
          >
            {/* Enhanced Doodle Header */}
            <div className="relative h-32 w-full overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-center bg-cover opacity-25"
                style={{ backgroundImage: `url('${member.doodle.image}')` }}
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="absolute inset-0 bg-green bg-opacity-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-green-900/10" /> {/*from-pink-900/100 to-pink-900/5}
              
              {/* Animated Doodle Elements */}
              <motion.div
                className="absolute top-4 left-4 opacity-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <FaLeaf className="w-6 h-6 rotate-12" />
              </motion.div>
            </div>

            {/* Profile Content */}
            <div className="px-5 pt-5 pb-6 text-center">
              {/* Profile Image */}
              <div className="relative -mt-16 mb-4">
                <motion.div
                  className="mx-auto w-24 h-24 rounded-full border-4 border-white shadow-2xl overflow-hidden relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-green-200/50" />
                </motion.div>
              </div>

              {/* Name & About */}
              <h2 className="text-xl font-bold text-green-900 mb-2 font-poppins">
                {member.name}
              </h2>
              <p className="text-sm text-green-800/85 mb-4 px-3 leading-relaxed">
                {member.about}
              </p>

              {/* Skills */}
              <div className="mb-4 flex flex-wrap justify-center gap-2">
                {member.skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      skillStyles[idx % skillStyles.length].bg
                    } ${skillStyles[idx % skillStyles.length].text}`}
                    whileHover={{ y: -1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Contribution */}
              <p className="text-sm text-green-700/90 italic mb-5 px-3">
                &quot;{member.contribution}&quot;
              </p>

              {/* Social Links */}
              <motion.div className="flex justify-center gap-3">
                {[
                  { icon: FaGithub, link: member.github },
                  { icon: FaLinkedin, link: member.linkedin },
                  { icon: FaInstagram, link: member.instagram }
                ].map((Social, i) => (
                  <motion.a
                    key={i}
                    href={Social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-green-50 hover:bg-green-100 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Social.icon className="w-5 h-5 text-green-800/90" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Floating Accent */}
            <FaLeaf className="absolute top-3 right-3 w-6 h-6 text-green-200/40 animate-spin-slow" />
          </motion.div>
        ))}
      </div>

      {/* Mentor Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-green-900 mb-8 text-center font-poppins">
          Our Mentor
        </h2>
        
        <motion.div
          className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
          whileHover={{ y: -4 }}
        >
          {/* Mentor Header */}
          <div className="relative h-40 w-full overflow-hidden bg-gradient-to-r from-purple-100 to-indigo-100">
            <motion.div
              className="absolute inset-0 bg-center bg-cover opacity-20"
              style={{ backgroundImage: `url('${mentorDetails.doodle.image}')` }}
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 1, -1, 0]
              }}
              transition={{ 
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-purple-900/5" />
          </div>

          {/* Mentor Content */}
          <div className="px-8 py-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Profile */}
              <div className="flex flex-col items-center md:w-1/3">
                <div className="relative -mt-20 mb-4">
                  <motion.div
                    className="mx-auto w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={mentorDetails.image}
                      alt={mentorDetails.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-purple-200/50" />
                  </motion.div>
                </div>

                <h2 className="text-2xl font-bold text-green-900 mb-1 font-poppins">
                  {mentorDetails.name}
                </h2>
                <p className="text-green-800/85 mb-4 text-center">
                  {mentorDetails.about}
                </p>

                <div className="flex gap-4 mb-6">
                  <motion.a
                    href={mentorDetails.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaXTwitter className="w-6 h-6 text-purple-700 hover:text-purple-900" />
                  </motion.a>
                  <motion.a
                    href={mentorDetails.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaLinkedin className="w-6 h-6 text-purple-700 hover:text-purple-900" />
                  </motion.a>

                  <motion.a
                    href={mentorDetails.socialLinks.googleScholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaGoogleScholar className="w-6 h-6 text-purple-700 hover:text-purple-900" />
                  </motion.a>
                </div>

                <a 
                  href={`mailto:${mentorDetails.email}`}
                  className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  Contact
                </a>
              </div>

              {/* Right Column - Details */}
              <div className="md:w-2/3 space-y-6">
                {/* About Section */}
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-3">About</h3>
                  <p className="text-green-800/90 leading-relaxed">
                    {mentorDetails.bio}
                  </p>
                </div>

                {/* Research Areas */}
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Research Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentorDetails.researchAreas.map((area, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full"
                        whileHover={{ y: -2 }}
                      >
                        {area}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Publications */}
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Recent Publications</h3>
                  <ul className="space-y-2">
                    {mentorDetails.publications.map((pub, idx) => (
                      <motion.li 
                        key={idx}
                        className="flex items-start gap-2 text-green-800/90"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-purple-500 mt-1">•</span>
                        <a 
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-purple-700 transition-colors"
                        >
                          {pub.title} ({pub.year})
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Accent */}
          <FaLeaf className="absolute top-4 right-4 w-8 h-8 text-purple-200/40 animate-spin-slow" />
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        className="p-8 text-center bg-white/80 backdrop-blur-sm border-t border-green-200/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <FaLeaf className="text-green-600 w-6 h-6 animate-float" />
            <FaLeaf className="text-green-500 w-6 h-6 animate-float delay-100" />
            <FaLeaf className="text-green-400 w-6 h-6 animate-float delay-200" />
          </div>
          <p className="text-green-700/80 text-sm">
            © {new Date().getFullYear()} PhytoSense | Growing a healthier future through AI
          </p>
        </div>
      </motion.footer>

      <style jsx global>{`
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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 7s ease-in-out 1s infinite;
        }
      `}</style>
    </div>
  );
}




//####-----ORIGINAL PROFILE CARD-----

// {/* Profile Cards Grid */}
// <div className="max-w-7xl mx-auto px-4 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
// {teamMembers.map((member, index) => {
//   return (
//     <motion.div
//       key={index}
//       className="relative bg-white rounded-xl shadow-lg border border-green-200 overflow-hidden group"
//       whileHover={{ scale: 1.05 }}
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1 }}
//     >
//       {/* Card Doodle Header */}
//       <div className={`relative h-28 w-full overflow-hidden ${member.doodle.color}`}>
//         {/* Doodle background image */}
//         <div className="absolute inset-0 bg-center bg-cover opacity-40"
//           style={{ backgroundImage: `url('${member.doodle.image}')` }}
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-10" />
//       </div>

//       {/* Profile Image - Overlapping the doodle header */}
//       <div className="relative flex justify-center">
//         <div className="relative -mt-12 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
//           <motion.div
//             className="absolute inset-0 rounded-full border-4 border-green-700 shadow-xl"
//             initial={{ opacity: 0.5 }}
//             animate={{ opacity: [0.5, 1, 0.5] }}
//             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//           />
//           <Image
//             src={member.image}
//             alt={member.name}
//             fill
//             className="object-cover rounded-full"
//           />
//         </div>
//       </div>

//       {/* Card Body */}
//       <div className="px-6 pt-6 pb-4 text-center">
//         <h2 className="text-xl font-bold text-green-900 font-poppins">
//           {member.name}
//         </h2>
//         <p className="text-sm text-gray-600 mt-1 font-poppins">
//           {member.about}
//         </p>

//         {/* Skills Section */}
//         <div className="mt-4 flex flex-wrap justify-center gap-2">
//           {member.skills.map((skill, idx) => {
//             const style = skillStyles[idx % skillStyles.length];
//             return (
//               <span
//                 key={idx}
//                 className={`px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-full ${style.bg} ${style.text}`}
//               >
//                 {skill}
//               </span>
//             );
//           })}
//         </div>

//         {/* Contribution */}
//         <p className="mt-4 text-center text-gray-700 italic text-sm font-poppins">
//           {member.contribution}
//         </p>

//         {/* Social Links */}
//         <div className="mt-6 flex justify-center gap-4">
//           <motion.a
//             href={member.github}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="transition duration-200"
//             whileHover={{ scale: 1.15, rotate: 360 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <FaGithub size={20} className="text-green-800 hover:text-green-900" />
//           </motion.a>
//           <motion.a
//             href={member.linkedin}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="transition duration-200"
//             whileHover={{ scale: 1.15, rotate: 360 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <FaLinkedin size={20} className="text-green-800 hover:text-green-900" />
//           </motion.a>
//           <motion.a
//             href={member.instagram}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="transition duration-200"
//             whileHover={{ scale: 1.15, rotate: 360 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <FaInstagram size={20} className="text-green-800 hover:text-green-900" />
//           </motion.a>
//         </div>
//       </div>

//       {/* Floating Decorative Icon */}
//       <FaLeaf
//         size={36}
//         className="absolute top-2 right-2 text-green-300 opacity-20 animate-spin-slow"
//       />
//     </motion.div>
//   );
// })}
// </div>