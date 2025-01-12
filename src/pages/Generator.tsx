import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { generateImage } from '../lib/huggingface';
import { supabase } from '../lib/supabase';
import { Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Generator() {
  const { user, profile } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile || profile.credits < 1) {
      toast.error('Insufficient credits');
      return;
    }

    setLoading(true);
    try {
      const imageBlob = await generateImage(prompt);
      const imageUrl = URL.createObjectURL(imageBlob);
      setGeneratedImage(imageUrl);

      // Update credits
      const { error } = await supabase
        .from('profiles')
        .update({ credits: profile.credits - 1 })
        .eq('id', user.id);

      if (error) throw error;
      
      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error('Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Please login to generate images</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">AI Image Generator</h1>
          <p className="mb-4">Credits remaining: {profile?.credits || 0}</p>
          
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter your prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? (
                'Generating...'
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Image
                </>
              )}
            </button>
          </form>

          {generatedImage && (
            <div className="mt-6">
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}