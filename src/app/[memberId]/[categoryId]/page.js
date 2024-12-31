"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import api from "../../../api";

export default function MemberDashboard({ params }) {
  const { memberId, categoryId } = params; // Obtém o memberId da URL
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
      return <p>Carregando...</p>;
    }

    if (!session) {
      router.push("/");
      return null;
    }

    const fetchExpenses = async () => {
      try {
        const response = await api.get("/expenses/search", {
          params: { memberId, categoryId },
        });
        setExpenses(response.data || []);
      } catch (err) {
        setError("Erro ao carregar despesas");
      }
    };

    fetchExpenses();
  }, [memberId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard do Membro</h1>
      <h2 className="text-xl mb-2">ID do Membro: {memberId}</h2>
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