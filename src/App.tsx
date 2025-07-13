import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Shield, Building2, Network, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import DigitalFootprint from "./pages/DigitalFootprint";
import FileAnalysisPage from "./pages/FileAnalysisPage";
import { useTheme } from "./hooks/useTheme";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white shadow-sm dark:bg-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                ReconGraph
              </span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              to="/"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium dark:text-white text-gray-900"
            >
              Home
            </Link>
            <Link
              to="/scan"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-white hover:text-gray-900"
            >
              Scan
            </Link>
            <Link
              to="/analyze"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-white hover:text-gray-900"
            >
              Analyze
            </Link>
            <Link
              to="/footprint"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-white hover:text-gray-900"
            >
              Digital Footprint
            </Link>
            <a
              href="mailto:hello@recongraph.xyz"
             className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-white hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
            Contact
            </a>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center cursor-pointer p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-white dark:hover:text-white"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-white"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/scan"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-white"
              onClick={() => setIsOpen(false)}
            >
              Scan
            </Link>
            <Link
              to="/footprint"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-white"
            >
              Digital Footprint
            </Link>
            <Link
              to="/analyze"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-white"
              onClick={() => setIsOpen(false)}
            >
              Analyze
            </Link>
            <a
              href="mailto:hello@recongraph.xyz"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-white"
              onClick={() => setIsOpen(false)}
            >
            Contact
            </a>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center cursor-pointer justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-white dark:hover:text-white"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-200 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Contact / Brand */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">
              ReconGraph
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="mailto:hello@recongraph.xyz"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Contact / Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Docs / How-to */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="https://github.com/basedBaba/ReconGraph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="te xt-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Docs & How-Tos
                </a>
              </li>
            </ul>
          </div>

          {/* Community / GitHub */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">
              Community
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="https://github.com/basedBaba/ReconGraph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/basedBaba/ReconGraph#contributing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Contribute
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Fine Print */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">
              Fine Print
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center dark:text-gray-500">
          &copy; {new Date().getFullYear()} ReconGraph. Built by hackers, for hackers.
          </p>
        </div>
      </div>
    </footer>
  );
}




function App() {
  return (
    <Router>
      <div className="min-h-screen flex dark:bg-black flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/analyze" element={<FileAnalysisPage />} />
            <Route path="/footprint" element={<DigitalFootprint />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
