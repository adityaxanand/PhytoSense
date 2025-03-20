'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiArrowLeft,
  FiCamera,
  FiUpload,
} from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');

  // Handle drag-and-drop
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const accept: { [mime: string]: string[] } = { 'image/*': [] };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  // Handle camera capture
  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit image for inference
  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please upload an image first.');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('/api/infer', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error during inference:', error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-green-50 flex flex-col items-center py-10 px-4">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="flex items-center text-green-800 hover:text-green-900 self-start mb-4 transition-colors duration-300"
        >
          <FiArrowLeft className="mr-1" /> Back to Home
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-xl p-10 max-w-3xl w-full transition-transform duration-500 ease-in-out hover:scale-105">
          {/* Header with Plant Icon and Tagline */}
          <div className="flex flex-col items-center mb-6">
            <FaLeaf className="text-green-800 animate-pulse" size={52} />
            <h1 className="text-3xl font-bold text-green-900 mt-2">
              Upload Your Plant Image
            </h1>
            <p className="text-green-700 italic mt-1">
              Diagnose plant diseases at the speed of light.
            </p>
          </div>

          <hr className="border-green-300 mb-6" />

          {/* Drag & Drop Section */}
          <div className="mb-8">
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-green-800 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-green-900 transition-all duration-300"
            >
              <input {...getInputProps()} />
              <FiUpload size={56} className="text-green-800 mb-2 animate-bounce" />
              <p className="text-green-900 font-medium text-lg">
                Drag &amp; drop your image here or click to select one
              </p>
            </div>
          </div>

          {/* Camera Capture Button */}
          <div className="mb-8 flex justify-center">
            <div className="flex flex-col items-center">
              <label
                htmlFor="cameraInput"
                className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-900 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 flex items-center shadow-xl"
              >
                <FiCamera size={22} className="mr-3" />
                <span className="font-semibold">Capture &amp; Diagnose</span>
              </label>
              <input
                id="cameraInput"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleCameraCapture}
                className="hidden"
              />
            </div>
          </div>

          {/* Preview Section */}
          {preview && (
            <div className="mb-8 transition-opacity duration-500 ease-in-out">
              <h3 className="text-xl font-medium mb-2 text-green-900">Preview:</h3>
              <div className="w-full relative h-64 border border-green-300 rounded-lg shadow-sm transition-all duration-300">
                <Image 
                  src={preview} 
                  alt="Uploaded Preview" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-800 text-white py-3 rounded-lg mt-4 hover:bg-green-900 transition-colors duration-300 transform hover:scale-105 shadow-lg"
          >
            Diagnose Now
          </button>

          {/* Inference Result */}
          {result && (
            <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-lg shadow-sm transition-all duration-300">
              <h3 className="text-xl font-medium mb-2 text-green-900">Result:</h3>
              <p className="text-green-800">{result}</p>
            </div>
          )}
        </div>

        {/* Additional Content Section */}
        <div className="mt-10 max-w-3xl w-full">
          <div className="border-t border-green-300 pt-6">
            <h2 className="text-2xl font-bold text-green-900 mb-2">How It Works</h2>
            <p className="text-green-800 mb-4">
              Our state-of-the-art AI analyzes your plant images to identify potential diseases early.
              This allows you to take proactive steps to maintain healthy crops and ensure optimal yield.
            </p>
            <p className="text-green-800">
              Whether you use the drag &amp; drop option or your mobile camera, our system processes your image
              with precision and speed, delivering reliable diagnostic results instantly.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
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
        /* Animated background gradient with subtle royal green accents */
        .bg-animated-gradient {
          background: linear-gradient(270deg, #F0FDF4, #F0FDF4, #F0FDF4);
          background-size: 600% 600%;
          animation: gradientShift 10s ease infinite;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}
