import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../contexts/AuthContext';
import { Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Pricing() {
  const { user } = useAuth();

  const handleSubscribe = async () => {
    if (!user) {
      toast.error('Please login first');
      return;
    }

    const stripe = await stripePromise;
    if (!stripe) return;

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
        userId: user.id,
      }),
    });

    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      toast.error(result.error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Free Plan</h2>
            <p className="text-gray-600 mb-6">Perfect for trying out our service</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Zap className="h-5 w-5 text-green-500 mr-2" />
                10 free credits
              </li>
              <li className="flex items-center">
                <Zap className="h-5 w-5 text-green-500 mr-2" />
                Basic support
              </li>
            </ul>
            <p className="text-3xl font-bold mb-6">$0</p>
            <button
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              disabled
            >
              Current Plan
            </button>
          </div>

          <div className="bg-indigo-600 p-8 rounded-lg shadow-md text-white">
            <h2 className="text-2xl font-bold mb-4">Pro Plan</h2>
            <p className="text-indigo-200 mb-6">For serious creators</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Zap className="h-5 w-5 text-indigo-300 mr-2" />
                1000 credits monthly
              </li>
              <li className="flex items-center">
                <Zap className="h-5 w-5 text-indigo-300 mr-2" />
                Priority support
              </li>
              <li className="flex items-center">
                <Zap className="h-5 w-5 text-indigo-300 mr-2" />
                Higher quality generations
              </li>
            </ul>
            <p className="text-3xl font-bold mb-6">$29/month</p>
            <button
              onClick={handleSubscribe}
              className="w-full px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}