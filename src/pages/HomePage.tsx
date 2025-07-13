import React from "react";
import { Shield, Building2, Network } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-indigo-600 dark:bg-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">ReconGraph</span>
              <span className="block text-indigo-200">
                The Open Recon Toolkit for the Curious
              </span>
            </h1>
            <p className="mt-6 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl leading-relaxed">
              Scan targets, trace digital footprints, and dissect suspicious files — all in one place. Free, powerful, and built for the hacker in you.
            </p>
            <div className="mt-12 flex justify-center gap-x-6">
              <button className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-gray-50 transition-colors duration-200">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Three Tools. One Recon Suite.
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Scan, fingerprint, and dissect — all from your browser.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1: Target Scanner */}
              <div className="group cursor-pointer" onClick={() => navigate('/scan')}>
                <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-500 hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white text-center">
                    Target Scanner
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    Enter any IP or domain to uncover DNS records, blacklists,
                    shodan info, and known vulnerabilities.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="w-12 h-1 bg-indigo-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Feature 2: Digital Footprint Recon */}
              <div className="group cursor-pointer"
              onClick={() => navigate('/footprint')}>
                <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white text-center">
                    Digital Footprint
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    Track usernames, breached emails, SIM info, and account leaks
                    across the internet — fast and simple.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="w-12 h-1 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Feature 3: File Analyzer */}
              <div className="group cursor-pointer" onClick={() => navigate('/analyze')}
              >
                <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Network className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white text-center">
                    File Analyzer
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    Drop a suspicious binary. Get back MITRE ATT&CK techniques,
                    behavioral patterns, and reverse engineering leads via CAPA.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;