import Image from "next/image";
import Navbar from "./components/navbar";
import Link from "next/link";
import Footer from "./components/footer";

export default function Home() {
  const heroText = {
    title : 'Analyze Your Restaurant Reviews with Machine Learning',
    body : 'Upload your CSV files of your restaurant review and get instant analysis results through advanced machine learning algorithms. Transform your data into beautiful, easy-to-understand visual reports.'
  }
  const featuresText = [
    {
      title : 'Powerful Features for Data Analysis',
      description : 'Our tool makes data analysis simple and accessible for everyone, regardless of technical expertise.'
    },
    {
      title : 'Easy CSV Upload',
      description : 'Simply drag and drop your CSV files or browse to upload. Our system supports various CSV formats and processes large datasets efficiently.'
    },
    {
      title : 'ML Analysis',
      description : 'Powerful machine learning algorithms automatically analyze your data to identify patterns, trends, and anomalies you might miss.'
    },
    {
      title : 'Visual Graphs',
      description : 'Get beautiful, interactive charts and graphs that make your data easy to understand and share with others.'
    }
  ]
  return (
    <>
      <Navbar />
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {heroText.title}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {heroText.body}
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="/analyze" className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2">
                <span>Get Started Now</span>
              </Link>
            </div>
          </div>
          <div>
            <img src="https://placehold.co/600x400/E2E8F0/4A5568?text=Dashboard+Analytics" alt="Dashboard Analytics" className="rounded-lg shadow-2xl"></img>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900"> {featuresText[0].title}</h2>
            <p className="text-gray-600 mt-2">{featuresText[0].description}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg"  className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 15l-4-4m0 0l4-4m-4 4h12" /></svg>
              </div>
              <h3 className="text-xl text-gray-900 font-semibold mb-2">{featuresText[1].title}</h3>
              <p className="text-gray-600">{featuresText[1].description}</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              </div>
              <h3 className="text-xl text-gray-900 font-semibold mb-2">{featuresText[2].title}</h3>
              <p className="text-gray-600">{featuresText[2].description}</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
              </div>
              <h3 className="text-xl text-gray-900 font-semibold mb-2">{featuresText[3].title}</h3>
              <p className="text-gray-600">{featuresText[3].description}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
