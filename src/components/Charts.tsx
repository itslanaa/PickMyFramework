import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement
} from 'chart.js';
import { Bar, Radar, Pie } from 'react-chartjs-2';
import { MADMResult } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement
);

interface ChartsProps {
  results: MADMResult[];
  onChartsReady: (elements: HTMLElement[]) => void;
}

export function Charts({ results, onChartsReady }: ChartsProps) {
  const barChartRef = useRef<HTMLDivElement>(null);
  const radarChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [barChartRef.current, radarChartRef.current, pieChartRef.current].filter(Boolean) as HTMLElement[];
    onChartsReady(elements);
  }, [results, onChartsReady]);

  const top10Results = results.slice(0, 10);

  // Bar Chart Data
  const barData = {
    labels: top10Results.map(r => r.framework.name),
    datasets: [
      {
        label: 'Fuzzy MADM Score',
        data: top10Results.map(r => r.score),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Top 10 Frameworks by Fuzzy MADM Score',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
      },
    },
  };

  // Radar Chart Data (Top 5)
  const top5 = results.slice(0, 5);
  const radarData = {
    labels: ['Popularity', 'Community', 'Maintenance', 'Maturity'],
    datasets: top5.map((result, index) => ({
      label: result.framework.name,
      data: [
        result.framework.popularity,
        result.framework.community,
        result.framework.maintenance,
        result.framework.maturity
      ],
      borderColor: `hsl(${index * 72}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 72}, 70%, 50%, 0.2)`,
      borderWidth: 2,
      pointBackgroundColor: `hsl(${index * 72}, 70%, 50%)`,
    }))
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Top 5 Frameworks - Attribute Comparison',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 1,
      },
    },
  };

  // Pie Chart Data (Language Distribution)
  const languageCount = results.reduce((acc, result) => {
    const lang = result.framework.language || 'Unknown';
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = {
    labels: Object.keys(languageCount),
    datasets: [
      {
        data: Object.values(languageCount),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#C9CBCF'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Framework Distribution by Programming Language',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
  };

  return (
    <div className="space-y-8">
      <div ref={barChartRef} className="bg-white p-6 rounded-xl shadow-lg">
        <Bar data={barData} options={barOptions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div ref={radarChartRef} className="bg-white p-6 rounded-xl shadow-lg">
          <Radar data={radarData} options={radarOptions} />
        </div>

        <div ref={pieChartRef} className="bg-white p-6 rounded-xl shadow-lg">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}