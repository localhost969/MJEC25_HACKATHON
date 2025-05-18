import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { 
  CodeBracketIcon, 
  AdjustmentsHorizontalIcon, 
  MagnifyingGlassIcon,
  CheckCircleIcon,
  BookmarkIcon,
  ChevronRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { getAllProblems } from '../lib/practiceProblems';

// Define problem types and difficulty
type Difficulty = 'Easy' | 'Medium' | 'Hard';
type Tag = 'Array' | 'String' | 'Hash Table' | 'Math' | 'Dynamic Programming' | 'Sorting' | 'Greedy' | 'Depth-First Search' | 'Binary Search' | 'Tree' | 'Matrix' | 'Graph';

interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  likes: number;
  dislikes: number;
  acceptance: number;
  tags: Tag[];
  companies: string[];
  solved: boolean;
  attempted: boolean;
  bookmarked: boolean;
}

export default function PracticeProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'id' | 'acceptance' | 'likes'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'solved' | 'attempted' | 'todo'>('all');

  // Fetch problems on component mount
  useEffect(() => {
    const allProblems = getAllProblems();
    setProblems(allProblems);
    setFilteredProblems(allProblems);
  }, []);

  // Apply filters when any filter changes
  useEffect(() => {
    let result = [...problems];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(problem => 
        problem.title.toLowerCase().includes(query) || 
        problem.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply difficulty filter
    if (selectedDifficulty !== 'All') {
      result = result.filter(problem => problem.difficulty === selectedDifficulty);
    }
    
    // Apply tag filters
    if (selectedTags.length > 0) {
      result = result.filter(problem => 
        selectedTags.some(tag => problem.tags.includes(tag))
      );
    }
    
    // Apply status filter
    if (statusFilter === 'solved') {
      result = result.filter(problem => problem.solved);
    } else if (statusFilter === 'attempted') {
      result = result.filter(problem => problem.attempted && !problem.solved);
    } else if (statusFilter === 'todo') {
      result = result.filter(problem => !problem.attempted && !problem.solved);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'id') {
        comparison = a.id - b.id;
      } else if (sortBy === 'acceptance') {
        comparison = a.acceptance - b.acceptance;
      } else if (sortBy === 'likes') {
        comparison = a.likes - b.dislikes - (b.likes - b.dislikes);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredProblems(result);
  }, [problems, searchQuery, selectedDifficulty, selectedTags, statusFilter, sortBy, sortOrder]);

  const handleTagClick = (tag: Tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDifficulty('All');
    setSelectedTags([]);
    setStatusFilter('all');
    setSortBy('id');
    setSortOrder('asc');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Practice Problems</h1>
          <p className="mt-1 text-sm text-gray-500">
            Sharpen your coding skills with our collection of practice problems. 
            From easy warm-ups to challenging algorithms.
          </p>
        </div>

        {/* Filters and search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <AdjustmentsHorizontalIcon className="h-4 w-4 mr-1.5" />
                Filters
              </button>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Problems</option>
                <option value="solved">Solved</option>
                <option value="attempted">Attempted</option>
                <option value="todo">To Do</option>
              </select>
              
              <div className="flex items-center space-x-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="id">ID</option>
                  <option value="acceptance">Acceptance</option>
                  <option value="likes">Likes</option>
                </select>
                <button
                  onClick={toggleSortOrder}
                  className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-400 hover:text-gray-500"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Advanced filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Difficulty</h3>
                  <div className="space-x-2">
                    {(['All', 'Easy', 'Medium', 'Hard'] as const).map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          selectedDifficulty === difficulty
                            ? difficulty === 'Easy'
                              ? 'bg-green-100 text-green-800'
                              : difficulty === 'Medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : difficulty === 'Hard'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {(['Array', 'String', 'Hash Table', 'Math', 'Dynamic Programming'] as Tag[]).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      Show more...
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end items-end">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Problem list */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acceptance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Likes
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProblems.map((problem) => (
                  <tr key={problem.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {problem.solved ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      ) : problem.attempted ? (
                        <div className="h-5 w-5 rounded-full border-2 border-yellow-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-200" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {problem.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        href={`/practice/${problem.slug}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-900"
                      >
                        {problem.title}
                      </Link>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {problem.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {tag}
                          </span>
                        ))}
                        {problem.tags.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            +{problem.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        problem.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-800'
                          : problem.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {problem.acceptance.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <StarIconSolid className="h-4 w-4 text-yellow-400" />
                        <span>{problem.likes}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-blue-600">
                          <BookmarkIcon className={`h-5 w-5 ${problem.bookmarked ? 'text-blue-500' : ''}`} />
                        </button>
                        <Link 
                          href={`/practice/${problem.slug}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-900"
                        >
                          Solve
                          <ChevronRightIcon className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredProblems.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <CodeBracketIcon className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium">No problems found</p>
                        <p className="text-sm">Try adjusting your filters or search query</p>
                        <button 
                          onClick={clearFilters}
                          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">25</span> of{' '}
                  <span className="font-medium">{filteredProblems.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    &laquo;
                  </button>
                  <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    10
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    &raquo;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 