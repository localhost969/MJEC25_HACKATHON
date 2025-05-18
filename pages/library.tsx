import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { 
  BookOpenIcon, 
  AcademicCapIcon, 
  ClockIcon, 
  MagnifyingGlassIcon, 
  ArrowTopRightOnSquareIcon,
  BookmarkIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ServerIcon,
  PlusIcon,
  XMarkIcon,
  BookmarkSquareIcon,
  EllipsisVerticalIcon,
  LinkIcon,
  ShareIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

// Example resource data
const resources = [
  {
    id: "1",
    title: "FreeCodeCamp",
    category: "Interactive Learning",
    description: "Learn to code for free with interactive coding challenges and projects",
    icon: <CodeBracketIcon className="h-6 w-6" />,
    lastUpdated: new Date("2024-03-15").toISOString(),
    href: "https://www.freecodecamp.org/"
  },
  {
    id: "2",
    title: "The Odin Project",
    category: "Full Stack",
    description: "Full-stack curriculum with hands-on projects and real-world applications",
    icon: <BookOpenIcon className="h-6 w-6" />,
    lastUpdated: new Date("2024-03-10").toISOString(),
    href: "https://www.theodinproject.com/"
  },
  {
    id: "3",
    title: "MDN Web Docs",
    category: "Documentation",
    description: "Comprehensive documentation for web technologies and APIs",
    icon: <DocumentTextIcon className="h-6 w-6" />,
    lastUpdated: new Date("2024-03-20").toISOString(),
    href: "https://developer.mozilla.org/"
  },
  {
    id: "4",
    title: "CS50 by Harvard",
    category: "Computer Science",
    description: "Harvard's introduction to computer science and programming",
    icon: <ServerIcon className="h-6 w-6" />,
    lastUpdated: new Date("2024-03-05").toISOString(),
    href: "https://cs50.harvard.edu/"
  },
  {
    id: "5",
    title: "GitHub Student Pack",
    category: "Developer Tools",
    description: "Free developer tools and resources for students",
    icon: <CodeBracketIcon className="h-6 w-6" />,
    lastUpdated: new Date("2024-03-01").toISOString(),
    href: "https://education.github.com/pack"
  },
  {
    id: "6",
    title: "Scrimba",
    category: "Interactive Learning",
    description: "Interactive coding screencasts and hands-on exercises",
    icon: <CodeBracketIcon className="h-6 w-6" />,
    lastUpdated: new Date("2024-03-18").toISOString(),
    href: "https://scrimba.com/"
  },
  {
    id: "7",
    title: "Codecademy Free",
    category: "Interactive Learning",
    description: "Free coding lessons and interactive exercises",
    icon: <CodeBracketIcon className="h-6 w-6" />,
    lastUpdated: new Date("2024-03-12").toISOString(),
    href: "https://www.codecademy.com/catalog/subject/web-development"
  },
  {
    id: "8",
    title: "Khan Academy",
    category: "Programming",
    description: "Free computer programming courses and tutorials",
    icon: <BookOpenIcon className="h-6 w-6" />,
    lastUpdated: new Date("2024-03-08").toISOString(),
    href: "https://www.khanacademy.org/computing/computer-programming"
  },
  {
    id: "9",
    title: "React Hooks Tutorial",
    category: "Tutorial",
    description: "A comprehensive guide to React Hooks with practical examples and best practices",
    icon: <CodeBracketIcon className="h-6 w-6" />,
    lastUpdated: new Date("2024-03-17").toISOString(),
    href: "https://reactjs.org/docs/hooks-intro.html"
  },
  {
    id: "10",
    title: "Python Data Science Tutorial",
    category: "Tutorial",
    description: "Learn data science with Python, covering NumPy, Pandas, and Matplotlib",
    icon: <CodeBracketIcon className="h-6 w-6" />,
    lastUpdated: new Date("2024-03-14").toISOString(),
    href: "https://www.w3schools.com/python/python_ml_getting_started.asp"
  },
  {
    id: "11",
    title: "Docker for Beginners",
    category: "Tutorial",
    description: "Step-by-step guide to containerization with Docker",
    icon: <ServerIcon className="h-6 w-6" />,
    lastUpdated: new Date("2024-03-19").toISOString(),
    href: "https://docs.docker.com/get-started/"
  },
  {
    id: "12",
    title: "Git & GitHub Tutorial",
    category: "Tutorial",
    description: "Master version control with Git and GitHub",
    icon: <CodeBracketIcon className="h-6 w-6" />,
    lastUpdated: new Date("2024-03-16").toISOString(),
    href: "https://docs.github.com/en/get-started/quickstart"
  }
];

const categories = [
  "Interactive Learning",
  "Full Stack",
  "Documentation",
  "Computer Science",
  "Developer Tools",
  "Programming",
  "Tutorial",
  "Cheat Sheet"
];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [newResource, setNewResource] = useState({
    title: "",
    category: "",
    description: "",
    href: ""
  });
  const [filteredResources, setFilteredResources] = useState(resources);
  const [savedResources, setSavedResources] = useState<string[]>([]);

  // Load saved resources from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedResources');
    if (saved) {
      setSavedResources(JSON.parse(saved));
    }
  }, []);

  // Save resources to localStorage when they change
  useEffect(() => {
    localStorage.setItem('savedResources', JSON.stringify(savedResources));
  }, [savedResources]);

  useEffect(() => {
    const filtered = resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === "all") return matchesSearch;
      if (activeTab === "documentation") return matchesSearch && resource.category === "Documentation";
      if (activeTab === "tutorials") return matchesSearch && resource.category === "Tutorial";
      if (activeTab === "cheat-sheets") return matchesSearch && resource.category === "Cheat Sheet";
      if (activeTab === "saved") return matchesSearch && savedResources.includes(resource.id);
      
      return matchesSearch;
    });
    
    setFilteredResources(filtered);
  }, [searchQuery, activeTab, savedResources]);

  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };

  const handleAddResource = () => {
    if (newResource.title && newResource.category && newResource.description && newResource.href) {
      const newId = (resources.length + 1).toString();
      const newResourceWithId = {
        ...newResource,
        id: newId,
        icon: <BookOpenIcon className="h-6 w-6" />,
        lastUpdated: new Date().toISOString()
      };
      
      // @ts-ignore - This is fine for our example
      resources.push(newResourceWithId);
      setFilteredResources([...resources]);
      setNewResource({ title: "", category: "", description: "", href: "" });
      setIsAddDialogOpen(false);
    }
  };

  const toggleSaveResource = (resourceId: string) => {
    setSavedResources(prev => {
      if (prev.includes(resourceId)) {
        return prev.filter(id => id !== resourceId);
      } else {
        return [...prev, resourceId];
      }
    });
  };

  const isResourceSaved = (resourceId: string) => savedResources.includes(resourceId);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show a toast notification
    alert("Link copied to clipboard!");
  };

  const shareResource = (title: string, url: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url
      }).catch(console.error);
    } else {
      copyToClipboard(url);
    }
  };

  return (
 <Layout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Resource Library</h1>
          <button 
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Resource
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-3 pl-10 text-sm border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search resources by title, description, or category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === "all" 
                ? "bg-blue-100 text-blue-700 font-medium" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Resources
          </button>
          <button
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === "documentation" 
                ? "bg-blue-100 text-blue-700 font-medium" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("documentation")}
          >
            Documentation
          </button>
          <button
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === "tutorials" 
                ? "bg-blue-100 text-blue-700 font-medium" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("tutorials")}
          >
            Tutorials
          </button>
          <button
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === "cheat-sheets" 
                ? "bg-blue-100 text-blue-700 font-medium" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("cheat-sheets")}
          >
            Cheat Sheets
          </button>
          <button
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === "saved" 
                ? "bg-blue-100 text-blue-700 font-medium" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </button>
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div key={resource.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-md mr-3">
                        {resource.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{resource.title}</h3>
                        <p className="text-xs text-gray-500">{resource.category}</p>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </button>
                      
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                        <div className="py-1">
                          <button 
                            onClick={() => toggleSaveResource(resource.id)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            {isResourceSaved(resource.id) ? (
                              <>
                                <BookmarkSolidIcon className="w-4 h-4 mr-2 text-blue-600" />
                                Remove from saved
                              </>
                            ) : (
                              <>
                                <BookmarkIcon className="w-4 h-4 mr-2" />
                                Save resource
                              </>
                            )}
                          </button>
                          <button 
                            onClick={() => copyToClipboard(resource.href)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <DocumentDuplicateIcon className="w-4 h-4 mr-2" />
                            Copy link
                          </button>
                          <button 
                            onClick={() => shareResource(resource.title, resource.href)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <ShareIcon className="w-4 h-4 mr-2" />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      <span>Updated {formatLastUpdated(resource.lastUpdated)}</span>
                    </div>
                    <a 
                      href={resource.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      View
                      <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            {activeTab === "saved" && savedResources.length === 0 ? (
              <>
                <BookmarkSquareIcon className="w-12 h-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No saved resources</h3>
                <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                  You haven't saved any resources yet. Browse the library and click the bookmark icon to save resources for later.
                </p>
                <button 
                  onClick={() => setActiveTab("all")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Browse All Resources
                </button>
              </>
            ) : (
              <>
                <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No resources found</h3>
                <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                  We couldn't find any resources matching your search. Try adjusting your search terms or browse all resources.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("all");
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  View All Resources
                </button>
              </>
            )}
          </div>
        )}

        {/* Add Resource Modal */}
        {isAddDialogOpen && (
          <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="flex justify-between items-center border-b px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Resource</h3>
                <button onClick={() => setIsAddDialogOpen(false)} className="text-gray-400 hover:text-gray-500">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={newResource.category}
                    onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={newResource.description}
                    onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                  />
                </div>
                
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    id="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={newResource.href}
                    onChange={(e) => setNewResource({ ...newResource, href: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="border-t px-6 py-4 flex justify-end space-x-3">
                <button
                  onClick={() => setIsAddDialogOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddResource}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Resource
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
