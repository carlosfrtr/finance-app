"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../api";

export default function HomePage() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get("/members");
        setMembers(response.data || []);
      } catch (err) {
        setError("Erro ao carregar membros");
      }
    };

    fetchMembers();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Membros (futuro login)</h1>

      {members.length === 0 ? (
        <p>Nenhum membro encontrado.</p>
      ) : (
        <ul className="list-disc pl-5">
          {members.map((member) => (
            <li key={member.id} className="mb-2">
              <Link href={`/${member.id}`} className="text-blue-500 hover:underline">
                {member.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
