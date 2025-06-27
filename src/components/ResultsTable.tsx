import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ExternalLink, Star, GitFork, AlertCircle, Calendar } from 'lucide-react';
import { MADMResult } from '../types';

interface ResultsTableProps {
  results: MADMResult[];
}

type SortField = 'rank' | 'name' | 'score' | 'stars' | 'forks' | 'lastUpdate';
type SortDirection = 'asc' | 'desc';

export function ResultsTable({ results }: ResultsTableProps) {
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedResults = [...results].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortField) {
      case 'rank':
        aValue = a.rank;
        bValue = b.rank;
        break;
      case 'name':
        aValue = a.framework.name.toLowerCase();
        bValue = b.framework.name.toLowerCase();
        break;
      case 'score':
        aValue = a.score;
        bValue = b.score;
        break;
      case 'stars':
        aValue = a.framework.stars;
        bValue = b.framework.stars;
        break;
      case 'forks':
        aValue = a.framework.forks;
        bValue = b.framework.forks;
        break;
      case 'lastUpdate':
        aValue = a.framework.lastUpdate.getTime();
        bValue = b.framework.lastUpdate.getTime();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = sortedResults.slice(startIndex, startIndex + itemsPerPage);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp className="w-4 h-4 opacity-30" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-indigo-600" /> : 
      <ChevronDown className="w-4 h-4 text-indigo-600" />;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (rank === 2) return 'bg-gray-100 text-gray-800 border-gray-200';
    if (rank === 3) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (rank <= 10) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-gray-50 text-gray-600 border-gray-200';
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Detailed Results</h3>
        <p className="text-sm text-gray-600 mt-1">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, results.length)} of {results.length} frameworks
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('rank')}
              >
                <div className="flex items-center space-x-1">
                  <span>Rank</span>
                  <SortIcon field="rank" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Framework</span>
                  <SortIcon field="name" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('score')}
              >
                <div className="flex items-center space-x-1">
                  <span>MADM Score</span>
                  <SortIcon field="score" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('stars')}
              >
                <div className="flex items-center space-x-1">
                  <span>Stars</span>
                  <SortIcon field="stars" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('forks')}
              >
                <div className="flex items-center space-x-1">
                  <span>Forks</span>
                  <SortIcon field="forks" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Language
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('lastUpdate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Last Update</span>
                  <SortIcon field="lastUpdate" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedResults.map((result) => (
              <tr key={result.framework.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRankBadgeColor(result.rank)}`}>
                    #{result.rank}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">{result.framework.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs" title={result.framework.description}>
                      {result.framework.description || 'No description available'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{result.score.toFixed(3)}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${result.score * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    {result.framework.stars.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <GitFork className="w-4 h-4 text-gray-400 mr-1" />
                    {result.framework.forks.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                    {result.framework.language}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                    {formatDate(result.framework.lastUpdate)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={result.framework.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      currentPage === page
                        ? 'bg-indigo-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
          
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}