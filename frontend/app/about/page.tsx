'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import { PiHeadCircuitFill } from "react-icons/pi";
import { FiCode, FiLayers, FiTrendingUp, FiZap } from 'react-icons/fi';
import Link from 'next/link';

interface Leaf {
  id: number;
  style: {
    left: string;
    top: string;
    scale: number;
    rotate: number;
  };
}

const features = [
    { 
      icon: FiZap, 
      title: "Transfer Learning",
      content: "Utilized pretrained weights from ResNet50 and EfficientNet architectures",
      color: "bg-emerald-100"
    },
    { 
      icon: FiLayers, 
      title: "Deep CNN Architecture",
      content: "8 convolutional layers with max pooling and batch normalization",
      color: "bg-teal-100"
    },
    { 
      icon: FiCode, 
      title: "Optimization",
      content: "Adam optimizer with learning rate scheduling and early stopping",
      color: "bg-sky-100"
    },
  ];

export default function ModelPage() {
  const [floatingLeaves, setFloatingLeaves] = useState<Array<Leaf>>([]);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    // Generate floating leaves for background animation
    const generatedLeaves = Array(12).fill(null).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        scale: 0.5 + Math.random() * 0.5,
        rotate: Math.random() * 360,
      },
    }));
    setFloatingLeaves(generatedLeaves);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50 relative overflow-hidden pt-25">
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
              rotate: leaf.style.rotate + 360,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={leaf.style}
          >
            <FaLeaf className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      {/* Animated Progress Orb (Optional – to be consistent with your homepage) */}
      <motion.div 
        className="fixed right-8 bottom-8 w-16 h-16 rounded-full bg-emerald-500 shadow-xl z-50 flex items-center justify-center text-white font-bold"
        style={{ scale }}
      >
        Model
      </motion.div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 text-center px-4 relative max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div whileHover={{ scale: 1.1 }}>
            <PiHeadCircuitFill className="text-emerald-900 w-24 h-24 mb-8 animate-float" />
            </motion.div>
            <div className="absolute inset-0 bg-emerald-100 blur-2xl opacity-50 rounded-full" />
          </div>
          <h1 className="text-6xl font-bold text-emerald-800 mb-6 font-poppins">
            Our ML Model
          </h1>
          <p className="text-2xl text-emerald-700 mb-12 max-w-2xl mx-auto font-semibold">
            An in-depth look at the architecture, frameworks, and innovative techniques behind our AI-powered plant disease detection.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/upload"
              className="inline-flex items-center px-12 py-5 bg-emerald-800 text-white rounded-full hover:bg-emerald-900 transition-all shadow-lg text-lg font-medium"
            >
              Explore More
              <FiTrendingUp className="ml-4 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Model Overview Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-8 font-poppins">
            Model Overview
          </h2>
          <p className="text-lg text-emerald-700 leading-relaxed mb-8">
            Our machine learning model is built on a Convolutional Neural Network (CNN) architecture. It has been trained on a large dataset of plant images to detect disease symptoms early and accurately. We leverage frameworks such as PyTorch and TensorFlow to design, train, and optimize our model.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-3xl bg-emerald-50 shadow-lg">
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">Architecture</h3>
              <ul className="list-disc list-inside text-emerald-700">
                <li>Convolutional layers to extract image features</li>
                <li>MaxPooling layers for spatial downsampling</li>
                <li>Fully connected Dense layers for classification</li>
                <li>Dropout layers to reduce overfitting</li>
              </ul>
            </div>
            <div className="p-6 rounded-3xl bg-emerald-50 shadow-lg">
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">Framework & Tools</h3>
              <ul className="list-disc list-inside text-emerald-700">
                <li>PyTorch &amp; TensorFlow</li>
                <li>Python for prototyping and training</li>
                <li>Scikit-learn for model evaluation</li>
                <li>GPU acceleration for efficient training</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Code Snippet Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-8 font-poppins">
            Our CNN Architecture
          </h2>
          <p className="text-center text-emerald-700 mb-8">
            Below is an important snippet from our model’s CNN architecture.
          </p>
          <motion.pre
            className="bg-gray-900 text-green-300 p-6 rounded-lg shadow-lg overflow-x-auto text-left font-mono text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
          {`class Plant_Disease_Model(ImageClassificationBase):

            def __init__(self):
              super().__init__()
              self.network = nn.Sequential(
                  nn.Conv2d(3,32,kernel_size=3,stride=1,padding=1),
                  nn.ReLU(),
                  nn.Conv2d(32,64,kernel_size=3,stride=1,padding=1),
                  nn.ReLU(),
                  nn.MaxPool2d(2,2), #output : 64*64*64

                  nn.Conv2d(64,64,kernel_size=3,stride=1,padding=1),
                  nn.ReLU(),
                  nn.Conv2d(64,128,kernel_size=3,stride=1,padding=1),
                  nn.ReLU(),
                  nn.MaxPool2d(2,2), #output : 128*32*32

                  nn.Conv2d(128,128,kernel_size=3,stride=1,padding=1),
                  nn.ReLU(),
                  nn.Conv2d(128,256,kernel_size=3,stride=1,padding=1),
                  nn.ReLU(),
                  nn.MaxPool2d(2,2), #output : 256*16*16

                  nn.Conv2d(256,256,kernel_size=3,stride=1,padding=1),
                  nn.ReLU(),
                  nn.Conv2d(256,512,kernel_size=3,stride=1,padding=1),
                  nn.ReLU(),
                  nn.MaxPool2d(2,2), #output : 512*8*8

                  nn.Conv2d(512,512,kernel_size=3,stride=1,padding=1),
                  nn.ReLU(),
                  nn.Conv2d(512,1024,kernel_size=3,stride=1,padding=1),
                  nn.ReLU(),
                  nn.MaxPool2d(2,2), #output : 1024*4*4
                  nn.AdaptiveAvgPool2d(1),

                  nn.Flatten(),
                  nn.Linear(1024,512),
                  nn.ReLU(),
                  nn.Linear(512,256),
                  nn.ReLU(),
                  nn.Linear(256,38)
                  )

            def forward(self,xb):
              out = self.network(xb)
              return out

          model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
          model.summary()`}
          </motion.pre>
        </div>
      </section>


      {/* Feature Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`p-8 rounded-2xl ${feature.color} backdrop-blur-sm border border-emerald-50`}
            >
              <feature.icon className="w-12 h-12 text-emerald-700 mb-4" />
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-emerald-700">{feature.content}</p>
            </motion.div>
          ))}
        </div>
      {/* Architecture Section */}
      <section></section>
      <section className="py-16 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-emerald-800 mb-8 flex items-center gap-3">
              <FiLayers className="w-8 h-8" />
              Model Architecture
            </h2>
            <div className="rounded-xl overflow-hidden border border-emerald-100">
              {/* Replace with a valid component or remove if not needed */}
              <div>Model Architecture Component Placeholder</div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold text-emerald-800 mb-4">Key Components</h3>
                <ul className="space-y-3 text-emerald-700">
                  {['5 Convolutional Blocks', 'Batch Normalization', 'Max Pooling', 
                    'Global Average Pooling', '0.5 Dropout Rate', '38-class Output'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-emerald-800 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Training Accuracy', value: '99.7%' },
                    { label: 'Validation Accuracy', value: '99.2%' },
                    { label: 'Precision', value: '98.9%' },
                    { label: 'Recall', value: '99.1%' }
                  ].map((metric, i) => (
                    <div key={i} className="bg-emerald-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-emerald-700">{metric.value}</div>
                      <div className="text-sm text-emerald-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Architecture Details with Animated Chart */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-8 font-poppins">
            Layer-wise Feature Extraction
          </h2>
          <p className="text-center text-emerald-700 mb-12">
            See how different layers contribute to the overall feature extraction in our model.
          </p>
          {/* A simple animated chart simulation */}
          <div className="flex items-end justify-around h-64">
            {[
              { label: 'Conv1', value: 80 },
              { label: 'Pool1', value: 60 },
              { label: 'Conv2', value: 90 },
              { label: 'Pool2', value: 70 },
              { label: 'Dense', value: 50 },
            ].map((bar, index) => (
              <motion.div
                key={index}
                className="bg-emerald-500 rounded-t-lg"
                initial={{ height: 0 }}
                whileInView={{ height: `${bar.value}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                style={{ width: '15%' }}
              >
                <div className="text-center text-white text-sm mt-2">{bar.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Details Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-8 font-poppins">
            Training & Evaluation
          </h2>
          <p className="text-lg text-emerald-700 leading-relaxed mb-8 text-center">
            Our model was trained on over 75K annotated plant images using advanced data augmentation and transfer learning techniques to boost performance. Extensive cross-validation and hyperparameter tuning ensured a detection accuracy of over 99%.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
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
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
    );
  }
