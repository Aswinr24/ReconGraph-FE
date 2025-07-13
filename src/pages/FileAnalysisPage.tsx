import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  FileUp,
  AlertTriangle,
  Search,
  Download,
  Lock,
  Terminal,
  Network,
  Database,
  Shield,
  File,
  Play,
  Clock,
  X,
  AlertCircle,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface TimelineEvent {
  id: number;
  timestamp: string;
  technique: string;
  category: string;
  riskLevel: string;
  description: string;
  mitreRef: string;
  details: {
    apis: string[];
    strings: string[];
    metadata: {
      offset: string;
      section: string;
    };
  };
}

function FileAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      startAnalysis(file);
    }
  };

  const startAnalysis = async (file: File) => {
    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/capa_analyze`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to analyze the file");
      }

      const data = await response.json();
      setResults(data);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 2000);
    } catch (error) {
      console.error("Error during file analysis:", error);
      setIsAnalyzing(false);
    }
  };

  const handleExport = () => {
    if (!results) return;
    const jsonString = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analysis_report.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const [currentStep, setCurrentStep] = useState(0);
  // ...existing code...
  const [filteredTimeline, setFilteredTimeline] = useState<any[]>([]);

  useEffect(() => {
    if (results && !results.error) {
      const timeline = Object.entries(results)
        .flatMap(([category, events]) =>
          events.map((event: any) => ({ category, ...event }))
        )
        .filter((event) =>
          Object.keys(event)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      setFilteredTimeline(timeline);
    } else {
      setFilteredTimeline([]);
    }
  }, [results, searchQuery]);
  // ...existing code...

  const groupedTimeline = filteredTimeline.reduce((acc, event) => {
    const { category, techniqueName, url, description } = event;
    
    if (!acc[category]) {
      acc[category] = [];
    }
    
    acc[category].push({ 
      techniqueName, 
      url, 
      description 
    });
    
    return acc;
  }, {});

  // ...existing code...

  // Automatically progress the steps every 2 seconds
  useEffect(() => {
    if (
      analysisComplete &&
      results &&
      !results.error &&
      currentStep < filteredTimeline.length
    ) {
      const interval = setInterval(() => {
        setCurrentStep((prevStep) => {
          if (prevStep < filteredTimeline.length - 1) {
            return prevStep + 1;
          } else {
            clearInterval(interval); // Stop the interval when the last step is reached
            return prevStep;
          }
        });
      }, 2000); // 2 seconds interval for step progression
      console.log(filteredTimeline, "hey");
      console.log(groupedTimeline, "groupedTimeline");
      return () => clearInterval(interval); // Cleanup interval on component unmount
    } else if (results?.error) {
      setErrorMessage(results.error); // Display error message
    }
  }, [analysisComplete, results, currentStep, filteredTimeline]);

  const [errorMessage, setErrorMessage] = useState("");
const [filteredResults, setFilteredResults] = useState<any>({});

useEffect(() => {
  if (results && !results.error) {
    const filtered = Object.entries(results)
      .reduce((acc, [category, events]) => {
        const filteredEvents = events.filter((event: any) =>
          Object.values(event)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
        
        if (filteredEvents.length > 0) {
          acc[category] = filteredEvents;
        }
        
        return acc;
      }, {});
    
    setFilteredResults(filtered);
  } else {
    setFilteredResults({});
  }
}, [results, searchQuery]);

// Category icon mapping
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Defense Evasion":
      return <Shield className="h-5 w-5" />;
    case "Discovery":
      return <Search className="h-5 w-5" />;
    case "Execution":
      return <Play className="h-5 w-5" />;
    case "Persistence":
      return <Clock className="h-5 w-5" />;
    default:
      return <AlertCircle className="h-5 w-5" />;
  }
};

// Category color mapping
const getCategoryColor = (category: string) => {
  switch (category) {
    case "Defense Evasion":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200";
    case "Discovery":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200";
    case "Execution":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200";
    case "Persistence":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-200";
  }
};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white  sm:text-4xl">
          File Analysis
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Upload files to analyze their behavior and detect malicious
          capabilities
        </p>
      </div>
      {/* File Upload Section */}
      <div className="bg-stone-100 dark:bg-zinc-900 dark:text-white  shadow sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <div className="max-w-xl mx-auto">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
            >
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <span>Upload a file for analysis</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Executables, DLLs, or documents up to 50MB
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    
      {isAnalyzing && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing file...</p>
        </div>
      )}
      {analysisComplete &&
      results &&
      (results?.error ? (
        <div className="text-center text-red-600">
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div className="bg-stone-100 dark:bg-zinc-900 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {/* File Summary */}
            <div className="mb-8 border-b pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                    Analysis Summary
                  </h2>
                  <div className="mt-4 grid grid-cols-2 gap-4 gap-x-16">
                  <div>
                      <p className="text-sm text-gray-500 dark:text-gray-200">File Name</p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-gray-200 block sm:hidden">
                        {file?.name.length > 10
                          ? `${file?.name.slice(0, 10)}...`
                          : file?.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-gray-200 hidden sm:block">
                        {file?.name.length > 20
                          ? `${file?.name.slice(0, 20)}....${file?.name.slice(-20)}`
                          : file?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-200">
                        File Size
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                        {file ? (file.size / (1024 * 1024)).toFixed(2) : "N/A"} MB
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-200">
                        Type
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                        {file?.type || "Unknown Type"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-200">
                        Analysis Date
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                        {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleExport}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                Analysis Results
              </h3>
              
              {Object.keys(filteredResults).length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No results found matching your search criteria.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(filteredResults).map(([category, techniques]) => (
                    <div
                      key={category}
                      className={`border rounded-lg p-6 transition-all duration-200 hover:shadow-lg ${getCategoryColor(category)}`}
                    >
                      {/* Category Header */}
                      <div className="flex items-center space-x-3 mb-4">
                        {getCategoryIcon(category)}
                        <h4 className="text-lg font-semibold">{category}</h4>
                      </div>
                      
                      {/* Techniques Count */}
                      <div className="mb-4">
                        <span className="text-sm font-medium">
                          {techniques.length} technique{techniques.length !== 1 ? 's' : ''} found
                        </span>
                      </div>
                      
                      {/* Techniques List */}
                      <div className="space-y-3">
                        {techniques.slice(0, 3).map((technique: any, idx: number) => (
                          <div key={idx} className="border-t pt-3 first:border-t-0 first:pt-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h5 className="font-medium text-sm leading-tight">
                                  {technique.techniqueName}
                                </h5>
                                {technique.description && (
                                  <p className="text-xs mt-1 opacity-80 line-clamp-2">
                                    {technique.description}
                                  </p>
                                )}
                              </div>
                              {technique.url && (
                                <a
                                  href={technique.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2 text-xs hover:underline flex-shrink-0"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        {techniques.length > 3 && (
                          <button
                            onClick={() => setSelectedEvent(category)}
                            className="text-sm font-medium hover:underline mt-2"
                          >
                            View all {techniques.length} techniques →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FileAnalysisPage;
