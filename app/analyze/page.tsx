'use client'
import { useState } from 'react'
import axios from 'axios';
import Navbar from '../section/navbar';

const Analyze = () => {
    const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e:any) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    setUploading(true)

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      alert('Upload berhasil!')
      console.log(res.data)
    } catch (err) {
      console.error('Gagal upload:', err)
      alert('Upload gagal')
    } finally {
      setUploading(false)
    }
  }
    return(
        <>
            <Navbar />
            <div className="bg-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Upload Your CSV File</h2>
                        <p className="text-gray-600 mt-2 mb-8">Get started by uploading your CSV file for instant analysis</p>
                    <label htmlFor="fileUpload" className="max-w-2xl mx-auto block border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition">
                        <input id="fileUpload" type="file" accept=".csv" onChange={handleFileChange} className="hidden"/>
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                        <p className="mt-2 text-lg font-semibold text-gray-700">Drop your CSV file here</p>
                        <p className="text-sm text-gray-500">or click to upload</p>
                    <span className="mt-4 inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Browse Files
                    </span>
                    </label>
                </div>
            </div>
        </>
    );
}

export default Analyze;