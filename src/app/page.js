"use client";

export default function HomePage() {

  const login = (type) => {
    window.location.href = process.env.NEXT_PUBLIC_API_BASE_URL + '/oauth2/authorization/' + type;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Login com Google</h1>

        <button
          onClick={() => login("google")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login com Google
        </button>
        <button
          onClick={() => login("github")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Login com Github
      </button>

        <div>
          <p className="mb-4">Olá, {}!</p>
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Sair
          </button>
        </div>
    </div>
  );
}
