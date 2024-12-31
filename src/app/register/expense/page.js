"use client";

import React, { useEffect, useState } from 'react';
import api from "../../../api";

export default function RegisterExpense() {
  const [member, setMember] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ description: "", amount: "", date: "", paymentMethod: "", memberId: "", categoryId: "" });
  const [message, setMessage] = useState("");
  const paymentMethods = ["CASH", "CREDIT_CARD", "DEBIT_CARD", "BANK_TRANSFER", "OTHER"];

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get(`/categories`);
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/expenses", formData);
      setMessage("Expense cadastrado com sucesso!");
      setFormData({ description: "", amount: "", date: "", paymentMethod: "", memberId: "", categoryId: "" });
    } catch (error) {
      setMessage("Erro ao cadastrar Expense.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Cadastro de Despesa</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Valor"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="Data"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Método de Pagamento</option>
          {paymentMethods.map((method) => (
            <option key={method} value={method}>
              {method.replace("_", " ")}
            </option>
          ))}
        </select>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Selecione uma Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Cadastrar
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </div>
  );
}