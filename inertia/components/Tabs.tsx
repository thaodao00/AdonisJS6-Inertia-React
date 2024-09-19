import { useState } from 'react'
import TabProfile from './TabProfile'

export function TabsComponent() {
   
    
  const [activeTab, setActiveTab] = useState(0)
  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <TabProfile  />
      case 1:
        return <p>This is the content for the Dashboard tab.</p>
      case 2:
        return <p>This is the content for the Settings tab.</p>

      default:
        return <p>Select a tab to see its content.</p>
    }
  }
  return (
    <div className="md:flex m-10">
      <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        <li>
          <button
            className={`inline-flex items-center px-4 py-3  bg-blue-700 rounded-lg  w-full ${activeTab === 0 ? 'bg-blue-700 text-white' : 'bg-gray-50 text-black'}`}
            onClick={() => handleTabClick(0)}
            aria-current="page"
          >
            Profile
          </button>
        </li>
        <li>
          <button
            className={`inline-flex items-center px-4 py-3  bg-blue-700 rounded-lg  w-full ${activeTab === 1 ? 'bg-blue-700 text-white' : 'bg-gray-50 text-black'}`}
            onClick={() => handleTabClick(1)}
          >
            Dashboard
          </button>
        </li>
        <li>
          <button
            className={`inline-flex items-center px-4 py-3  bg-blue-700 rounded-lg  w-full ${activeTab === 2 ? 'bg-blue-700 text-white' : 'bg-gray-50 text-black'}`}
            onClick={() => handleTabClick(2)}
          >
            Settings
          </button>
        </li>
      </ul>
      <div className="p-6 bg-gray-50 text-black text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        {renderContent()}
      </div>
    </div>
  )
}
