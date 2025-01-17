// filepath: /Users/torres/git/finance-app/src/app/layout.js
"use client"; // Indica que esse componente é do lado do cliente

import './globals.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Check the current path and set showMenu accordingly
    setShowMenu(window.location.pathname !== '/login');
  }, []);

  return (
    <html lang="en">
      <body>
        <div>
          <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/">
                <img src="/finance-app.webp" alt="Logo" className="h-20 w-auto" />
              </Link>
              {showMenu && (
                <nav>
                  <ul className="flex space-x-4">
                    <li>
                      <Link href="/register/expense" className="block p-2 hover:bg-gray-700 rounded">
                        <span className="hover:underline">Expense</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/register/category" className="block p-2 hover:bg-gray-700 rounded">
                        <span className="hover:underline">Category</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </header>
          <main className="container mx-auto p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}