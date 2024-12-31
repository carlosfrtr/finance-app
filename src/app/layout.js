// filepath: /Users/torres/git/finance-app/src/app/layout.js
"use client"; // Indica que esse componente é do lado do cliente

import '../app/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}