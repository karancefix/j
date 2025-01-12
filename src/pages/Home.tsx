import React from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Zap, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Create Amazing Images with AI
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Transform your ideas into stunning visuals with our advanced AI image generator.
            Start creating now with 10 free credits!
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="mt-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="bg-indigo-100 rounded-lg p-3 inline-block">
                <Wand2 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Easy to Use</h3>
              <p className="mt-2 text-gray-500">
                Simply describe what you want, and our AI will bring your vision to life.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="bg-indigo-100 rounded-lg p-3 inline-block">
                <Zap className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Lightning Fast</h3>
              <p className="mt-2 text-gray-500">
                Generate high-quality images in seconds with our advanced AI technology.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="bg-indigo-100 rounded-lg p-3 inline-block">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Secure & Private</h3>
              <p className="mt-2 text-gray-500">
                Your data and creations are protected with enterprise-grade security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}