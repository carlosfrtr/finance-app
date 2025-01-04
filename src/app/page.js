"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [ip, setIp] = useState([]);
  
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('/api/ip');
        const data = await response.json();
        setIp(data.ip);
      } catch (err) {
        console.error('Erro ao obter o IP:', err);
      }
    };

    fetchIp();
  }, []);

  const login = (type) => {
    window.location.href = process.env.PUBLIC_SERVER_URL + '/oauth2/authorization/' + type;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <div className="space-y-4">
        <button
          onClick={() => login("google")}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Login com Google
        </button>
        <button
          onClick={() => login("github")}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800"
        >
          <FontAwesomeIcon icon={faGithub} className="mr-2" />
          Login com Github
        </button>
      </div>
      <div className="mt-8">
        <p className="text-center text-gray-500">Seu IP: {ip}</p>
      </div>
    </div>
  );
}