import Link from 'next/link'
import { Home, Upload, BarChart, Settings, LogOut } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="flex flex-col h-full w-64 bg-white dark:bg-gray-800 border-r">
      <nav className="flex-1 overflow-y-auto mt-8">
        <ul className="p-4 space-y-2">
          <li>
            <Link href="/dashboard" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard/upload" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Upload className="mr-3 h-5 w-5" />
              Upload Data
            </Link>
          </li>
          <li>
            <Link href="/dashboard/analytics" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <BarChart className="mr-3 h-5 w-5" />
              Analytics
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t">
        <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}

