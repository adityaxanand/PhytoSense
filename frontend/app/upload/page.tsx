'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
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
    <div className="p-8">
      <Link href="/" className="inline-flex items-center mb-4 text-blue-500 hover:text-blue-700">
        <FiArrowLeft className="mr-1" />
        Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-6">Upload Your Image</h1>
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-6 cursor-pointer mb-6">
        <input {...getInputProps()} />
        <p>Drag & drop an image here or click to select one</p>
      </div>
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCameraCapture}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      {preview && (
        <div className="mb-6">
          <h3 className="text-xl font-medium">Preview:</h3>
          <img src={preview} alt="Uploaded" className="max-w-full mt-2" />
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit for Inference
      </button>
      {result && (
        <div className="mt-6">
          <h3 className="text-xl font-medium">Result:</h3>
          <p className="mt-2">{result}</p>
        </div>
      )}
    </div>
  );
}
