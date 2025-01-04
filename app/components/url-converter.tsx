'use client'

import { useState } from 'react'

export default function URLConverter() {
  const [githubURL, setGithubURL] = useState('')
  const [pagesURL, setPagesURL] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convertURL = (url: string) => {
    try {
      // Reset states
      setError('')
      setPagesURL('')

      // Validate if it's a GitHub URL
      const githubRegex = /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)/
      const match = url.match(githubRegex)

      if (!match) {
        setError('Please enter a valid GitHub repository URL')
        return
      }

      // Extract username and repo name
      const [, username, repo] = match
      
      // Create GitHub Pages URL
      const githubPagesURL = `https://${username}.github.io/${repo.replace('.git', '')}`
      setPagesURL(githubPagesURL)
    } catch (err) {
      setError('An error occurred while converting the URL')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pagesURL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError('Failed to copy to clipboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            GitHub Pages URL Converter
          </h1>
          <p className="text-gray-600">
            Convert your GitHub repository URL to its GitHub Pages URL
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter GitHub Repo URL(https://github.com/username/repo)"
              value={githubURL}
              onChange={(e) => setGithubURL(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => convertURL(githubURL)}
              className="bg-black hover:bg-gray-900 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Convert
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-center gap-2 text-red-700">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {pagesURL && (
            <div className="mt-4 space-y-2">
              <div className="font-medium text-gray-700">GitHub Pages URL:</div>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-gray-100 rounded-lg break-all text-sm">
                  {pagesURL}
                </code>
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 rounded-lg border transition-colors duration-200 flex items-center gap-2 ${
                    copied
                      ? 'bg-green-500 text-white border-transparent'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => window.open(pagesURL, '_blank')}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  <span>Visit</span>
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-600">
            <p>How it works:</p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>Enter your GitHub repository URL</li>
              <li>The converter extracts your username and repository name</li>
              <li>Creates the corresponding GitHub Pages URL in the format:</li>
              <code className="text-xs bg-gray-100 p-1 rounded">
                https://username.github.io/repository
              </code>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

