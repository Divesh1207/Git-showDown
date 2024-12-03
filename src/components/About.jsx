import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin} from 'react-icons/fa';

export default function About() {
  const socialLinks = [
    { 
      icon: <FaGithub className="h-5 w-5" />,
      href: "https://github.com/Divesh1207",
      label: "GitHub"
    },
    { 
      icon: <FaTwitter className="h-5 w-5" />,
      href: "https://x.com/divesh1207",
      label: "Twitter"
    },
    { 
      icon: <FaLinkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/divesh-pandey-161419218/",
      label: "LinkedIn"
    }
  ];

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        About GitHub Showdown
      </h1>
      
      <p className="text-gray-700 text-center mb-8">
        This application helps you compare GitHub profiles. Enter the usernames to see who has more contributions!
      </p>

      <div className=" ">
        
        

       
        <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-center">Our Mission</h2>
          <p className="text-gray-700 mb-2">
            At GitHub Showdown, we aim to provide developers and tech enthusiasts a platform to compare their GitHub contributions and showcase their skills.
          </p>
          <p className="text-gray-700 mb-2">
            We believe in the power of collaboration and continuous learning, and our tool helps users gain insights into their coding journey.
          </p>
          <p className="text-gray-700">
            Join us in building a stronger developer community and let your contributions shine!
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Social Links</h2>
          <div className="flex justify-center space-x-4 mb-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-2 border rounded hover:bg-gray-100 transition"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-2 text-center">For any queries!</h3>
          <p className="text-gray-600 text-center">Follow my social media channels to stay updated with the latest features about GitHub Showdown.</p>
        </div>
      </div>
    </div>
  );
}
