"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import api from '../../api';

export default function MemberDashboard({ params }) {
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      const response = await api.get(`/members`);
      setMember(response.data);
    };

    fetchMember();
  }, []);

  useEffect(() => {
    if (member) {
      const fetchCategories = async () => {
        try {
          const response = await api.get(`/members/categories`);
          setCategories(response.data || []);
        } catch (err) {
          setError("Erro ao carregar categorias");
        }
      };

      fetchCategories();
    }
  }, [member]);

  return (
    <div className="p-4">
      {error && <p>{error}</p>}
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {member && <h2 className="text-xl mb-2">{member.name}</h2>}
      {categories.length === 0 ? (
            <p>Nenhuma categoria encontrada para este membro.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
                <div key={category.id} className="p-4 border rounded shadow">
                  <Link href={`/category`} className="text-blue-500 hover:underline" onClick={() => handleCategoryClick(category.id)}>
                    <h3 className="text-lg font-semibold">{category.category}</h3>
                  </Link>
                  <p>Limite mensal: R$ {category.monthlyLimit}</p>
                  <p>Limite gasto: {category.spent}</p>
                </div>
            ))}
            </div>
        )}
        <Link href={`/register/expense`} className="text-blue-500 hover:underline">
          <h3 className="text-lg font-semibold">Cadastre agora uma despesa!</h3>
        </Link>
    </div>
  );
}