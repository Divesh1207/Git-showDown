import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Contact Us</h1>
      <p className="text-gray-700 text-center mb-6">
        We’d love to hear from you! Here’s how you can reach us:
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <p className="text-gray-600">
          Email: <a href="mailto:contact@githubshowdown.com" className="text-blue-600 hover:underline">diveshp904@gmail.com</a>
        </p>
        <p className="text-gray-600">Location: <span className="text-gray-500">Your Heart ❤️</span></p>
      </div>
    </div>
  );
}
