import { ThemeToggle } from './components/ThemeToggle'

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">HelpDesk</span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              HelpDesk Application
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Your comprehensive support solution for all your help desk needs.
            </p>
            <div className="space-y-4">
              <a
                href="/chatHome"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Go to Chat Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
