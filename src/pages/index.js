"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../api';
import { useMemberContext } from '../contexts/member-provider';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
  RadialLinearScale,
  ArcElement
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Title,
    Legend,
    ArcElement,
    Legend
   );

export default function MemberDashboard({ params }) {
  const { member } = useMemberContext();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  // se member nao definido, redireciona para login
  useEffect(() => {
    if (!member) {
      window.location.href = '/login';
    }
  }, [member]);
  

  useEffect(() => {
    if (member) {
      const fetchCategories = async () => {
        try {
          const response = await api.get(`/members/categories`);
          setCategories(response.data || []);
        } catch (err) {
          setError('Erro ao buscar categorias.');
          
        }
      };

      fetchCategories();
    }
  }, [member]);

  return (
    <div className="p-4">
      {error && <p>{error}</p>}
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {categories.length === 0 ? (
            <p>Nenhuma categoria encontrada para este membro.</p>
        ) : (
            <div className="p-12 border rounded shadow">
              <PolarArea
                data={{
                  labels: categories.map(category => category.category),
                  datasets: [
                    {
                      label: 'Total Gasto',
                      data: categories.map(category => category.spent),
                      backgroundColor: categories.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
                      borderColor: categories.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
        )}
    </div>
  );
}