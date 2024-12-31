"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Login com Google</h1>

      {!session ? (
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login com Google
        </button>
      ) : (
        <div>
          <p className="mb-4">Olá, {session.user.name}!</p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
