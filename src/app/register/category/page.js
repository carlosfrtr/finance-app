"use client";

import React, { useEffect, useState } from 'react';
import api from "../../../api";

const CategoryForm = () => {
    const [formData, setFormData] = useState({ name: ""});
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Erro ao buscar categorias", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await api.post("/categories", formData);
          fetchCategories();
          setMessage("Category cadastrado com sucesso!");
        } catch (error) {
          setMessage("Erro ao cadastrar Category.");
        }
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/categories/${id}`);
            setCategories(categories.filter(category => category.id !== id));
        } catch (error) {
            console.error("Erro ao deletar categoria", error);
        }
    };

    return (
        <>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Cadastro de Categoria</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Cadastrar
            </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </div>
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Lista de Categorias</h2>
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="py-2">Nome</th>
                    <th className="py-2">Ações</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category, index) => (
                    <tr key={category.id || index}>
                        <td className="border px-4 py-2">{category.name}</td>
                        <td className="border px-4 py-2 text-center">
                            <button
                                onClick={() => handleDelete(category.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
        </>
    );
};

export default CategoryForm;