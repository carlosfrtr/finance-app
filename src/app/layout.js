// filepath: /Users/torres/git/finance-app/src/app/layout.js
"use client"; // Indica que esse componente é do lado do cliente

import './globals.css';

import { MemberProvider } from '../contexts/member-provider';

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body>
          <div>
            <MemberProvider>
                  {({ member }) => (
                    <>
                    {member ? (
                      <div>Welcome, {member.name}!</div>
                    ) : (
                      <div>Please log in.</div>
                    )}
                    </>
                  )}
            </MemberProvider>
            <main className="container mx-auto p-4">
              {children}
            </main>
          </div>
        </body>
      </html>
  );
}