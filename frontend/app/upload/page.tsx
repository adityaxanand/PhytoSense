'use client';

import { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCamera, FiUpload, FiZap, FiActivity } from 'react-icons/fi';
import { FaLeaf, FaMicroscope } from 'react-icons/fa';
import DiseaseInfo from '../components/DiseaseInfo'

const Particles = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-emerald-600/20 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${10 + Math.random() * 20}s infinite linear`,
        }}
        suppressHydrationWarning
      />
    ))}
  </div>
);

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [hasResults, setHasResults] = useState(false);
  const [generatedInfo, setGeneratedInfo] = useState<string>('')
  const [loadingInfo, setLoadingInfo] = useState<boolean>(false)


    useEffect(() => {
      if (hasResults) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, [hasResults]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    // if (file.size > 5 * 1024 * 1024) {
    //   alert('File size too large (max 5MB)');
    //   return;
    // }
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));

    // Reset the generated info when new file is selected
    setGeneratedInfo('');
    setResult('');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    // maxSize: 5 * 1024 * 1024
  });

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      // if (file.size > 5 * 1024 * 1024) {
      //   alert('File size too large (max 5MB)');
      //   return;
      // }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));

      // Reset the generated info when new file is selected
      setGeneratedInfo('');
      setResult('');
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please upload an image first.')
      return
    }
    
    setLoading(true)

    // Reset the generated info when new file is selected
    setGeneratedInfo('');
    setResult('');
    setHasResults(false) // Reset results state
    const formData = new FormData()
    formData.append('file', selectedFile)
    

    try {
      const res = await fetch('/api/infer', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      
      if (!res.ok) throw new Error(await res.text())
      
      const data = await res.json()
      setResult(data.result || data.error || 'Unknown result')
      setHasResults(true) // Set to true when we have results
    } catch (error) {
      console.error('Error:', error)
      setResult("Error processing the image. Please try again.")
    } finally {
      setLoading(false)
    }
  }


const handleGenerateInfo = async () => {
  if (!result) {
    alert('No diagnosis results available')
    return
  }

  setLoadingInfo(true)
  try {
    const res = await fetch('/api/generate-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ diagnosis: result })
    })

    const data = await res.json()
    
    if (!res.ok) {
      throw new Error(data.error || 'Failed to generate detailed report')
    }

    if (!data.info) {
      throw new Error('Received empty response from the server')
    }

    setGeneratedInfo(data.info)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Generation error:', error)
      setGeneratedInfo(`Error: ${error.message}`)
    } else {
      console.error('Unknown error:', error)
      setGeneratedInfo('Error: Failed to generate detailed information')
    }
  } finally {
    setLoadingInfo(false)
  }
}


  return (
    <div className="pt-15 min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-50 flex flex-col items-center justify-center relative overflow-hidden padding: pt-1 margin: mt-1">
      <Particles />
      
      <div className={`relative bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-200 p-8 shadow-xl w-full max-w-2xl mx-4 mb-8 ${hasResults ? 'min-h-[80vh]' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors group"
          >
            <FiArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            <span className="font-medium">Return Home</span>
          </Link>
          <FaMicroscope className="w-8 h-8 text-emerald-600" />
        </div>

        {/* Drag/Drop Area */}
        <div
          {...getRootProps({onClick: (e) => {
            e.stopPropagation();
          }})}
          className="group relative h-96 rounded-2xl border-2 border-dashed border-gray-200 bg-blue-50/50 cursor-pointer flex flex-col items-center justify-center gap-6 transition-all hover:border-emerald-500"
        >
          <input {...getInputProps({onClick: (e) => {
            e.stopPropagation();
          }})} />
          <FiUpload className="w-16 h-16 text-emerald-600 mb-4 mx-auto" />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Drag Plant Image
            </h2>
            <p className="text-gray-600">
              Supported formats: PNG, JPG, JPEG {/*, WEBP (max 5MB) */}
            </p>
            <div className="pt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  triggerCamera();
                }}
                className="inline-flex items-center gap-2 px-6 py-2 bg-white text-emerald-600 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm z-50"
                type="button"
              >
                <FiCamera className="w-5 h-5" />
                Capture Photo
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleCameraCapture}
                  className="hidden"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-100"
          >
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </motion.div>
        )}

        {/* Submit Button with FiZap */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-600 cursor-pointer text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-emerald-200 transition-all mt-8 disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <FiZap className="w-5 h-5 animate-pulse" />
              Processing Analysis...
            </div>
          ) : (
            <>
              <FaLeaf className="w-5 h-5" />
              Start Analysis
            </>
          )}
        </button>

        {/* Results Display */}
        {result && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <FiActivity className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">Diagnosis Report</h3>
                <p className="text-gray-700 mt-2">{result}</p>
              </div>
            </div>

            {!generatedInfo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <button
                  onClick={handleGenerateInfo}
                  disabled={loadingInfo}
                  className="w-full bg-gradient-to-r from-green-100 to-green-70 cursor-pointer hover:from-teal-200 hover:to-green-100 text-emerald-700 px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-3 transition-all duration-300"
                >
                  {loadingInfo ? (
                    <>
                      <FiZap className="animate-spin" />
                      Generating Comprehensive Report...
                    </>
                  ) : (
                    <>
                      <FaMicroscope className="w-5 h-5" />
                      Deep Dive Analysis
                      <FiArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {generatedInfo && <DiseaseInfo content={generatedInfo} />}
          </div>
        )}
      </div>
    </div>
  );
}