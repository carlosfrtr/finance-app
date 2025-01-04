"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import api from "../../api";

export default function MemberCategory() {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory) {
      setCategoryId(selectedCategory);
    } else {
      // Handle the case where there is no selected category in localStorage
      setError("Nenhuma categoria selecionada.");
    }
  }, []);

  useEffect(() => {
    if (categoryId) {
      const fetchExpenses = async () => {
        try {
          const response = await api.get("/expenses/search", {
            params: { categoryId },
          });
          setExpenses(response.data || []);
        } catch (err) {
          setError("Erro ao carregar despesas");
        }
      };

      fetchExpenses();
    }
  }, [categoryId, router]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Despesas do Membro</h1>
      {expenses.length === 0 ? (
            <p>Nenhuma despesa encontrada para este membro.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expenses.map((expense) => (
                <div key={expense.id} className="p-4 border rounded shadow">
                <h3 className="text-lg font-semibold">{expense.description}</h3>
                <p>Categoria: {expense.category}</p>
                <p>Valor: R$ {expense.amount}</p>
                <p>Método de Pagamento: {expense.paymentMethod}</p>
                <p>Data: {new Date(expense.date).toLocaleDateString()}</p>
                </div>
            ))}
            </div>
        )}
    </div>
    );
}