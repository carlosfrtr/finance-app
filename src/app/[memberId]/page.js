"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../api";

export default function MemberDashboard({ params }) {
  const { memberId } = params;
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(`/members/${memberId}/categories`);
        setCategories(response.data || []);
      } catch (err) {
        setError("Erro ao carregar categorias");
      }
    }

    fetchCategories();    
  }, [memberId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard do Membro</h1>
      <h2 className="text-xl mb-2">ID do Membro: {memberId}</h2>
      
      {categories.length === 0 ? (
        <p>Nenhuma categoria encontrada para este membro.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="p-4 border rounded shadow">
              <Link href={`/${memberId}/${category.id}`} className="text-blue-500 hover:underline">
                <h3 className="text-lg font-semibold">{category.category}</h3>
              </Link>
              <p>Limite Mensal: R$ {category.monthlyLimit}</p>
              <p>Total gasto: {category.spent}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
