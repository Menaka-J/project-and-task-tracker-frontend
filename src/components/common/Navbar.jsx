
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import Logo from './Logo';
// import { FiUser, FiLogOut, FiMenu, FiX, FiHome, FiFolder, FiList } from 'react-icons/fi';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const userRole = user?.role?.includes('ADMIN') ? 'Admin' : 'Member';

//   return (
//     <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
//       <div className="container mx-auto px-4 max-w-7xl">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             {/* Use Logo Component */}
//             <Logo size="md" />
            
//             <div className="hidden md:flex ml-10 space-x-1">
//               <Link
//                 to="/dashboard"
//                 className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
//               >
//                 <FiHome className="h-4 w-4" />
//                 Dashboard
//               </Link>
//               <Link
//                 to="/projects"
//                 className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
//               >
//                 <FiFolder className="h-4 w-4" />
//                 Projects
//               </Link>
//               <Link
//                 to="/tasks"
//                 className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
//               >
//                 <FiList className="h-4 w-4" />
//                 Task Board
//               </Link>
//             </div>
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             <div className="relative">
//               <button
//                 onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                 className="flex items-center space-x-3 focus:outline-none hover:bg-gray-50 rounded-lg px-3 py-2 transition-all"
//               >
//                 <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-2 shadow-md">
//                   <FiUser className="h-4 w-4 text-white" />
//                 </div>
//                 <div className="text-left">
//                   <p className="text-sm font-semibold text-gray-900">{user?.name?.split(' ')[0] || user?.name}</p>
//                   <p className="text-xs text-gray-500">{userRole}</p>
//                 </div>
//               </button>

//               {isUserMenuOpen && (
//                 <>
//                   <div 
//                     className="fixed inset-0 z-10"
//                     onClick={() => setIsUserMenuOpen(false)}
//                   />
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 animate-fade-in">
//                     <div className="px-4 py-2 border-b border-gray-100">
//                       <p className="text-sm font-medium text-gray-900">{user?.name}</p>
//                       <p className="text-xs text-gray-500">{user?.email}</p>
//                     </div>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
//                     >
//                       <FiLogOut className="h-4 w-4" />
//                       Logout
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="text-gray-600 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-50"
//             >
//               {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden border-t border-gray-200 animate-slide-up bg-white">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             <Link
//               to="/dashboard"
//               className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <FiHome className="h-4 w-4" />
//               Dashboard
//             </Link>
//             <Link
//               to="/projects"
//               className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <FiFolder className="h-4 w-4" />
//               Projects
//             </Link>
//             <Link
//               to="/tasks"
//               className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <FiList className="h-4 w-4" />
//               Task Board
//             </Link>
//             <div className="border-t border-gray-200 my-2"></div>
//             <div className="px-3 py-2">
//               <p className="text-sm font-medium text-gray-900">{user?.name}</p>
//               <p className="text-xs text-gray-500">{user?.email}</p>
//             </div>
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setIsMobileMenuOpen(false);
//               }}
//               className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';  // ADD THIS
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';  // ADD THIS
import { FiUser, FiLogOut, FiMenu, FiX, FiHome, FiFolder, FiList } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode } = useTheme();  // ADD THIS
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userRole = user?.role?.includes('ADMIN') ? 'Admin' : 'Member';

  return (
    <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900/80 backdrop-blur-md border-gray-700' 
        : 'bg-white/80 backdrop-blur-md border-gray-200'
    }`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo size="md" />
            
            <div className="hidden md:flex ml-10 space-x-2">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <FiHome className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/projects"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <FiFolder className="h-4 w-4" />
                Projects
              </Link>
              <Link
                to="/tasks"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <FiList className="h-4 w-4" />
                Task Board
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />  {/* THEME TOGGLE BUTTON */}
            
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center space-x-3 focus:outline-none rounded-xl px-3 py-2 transition-all duration-200 ${
                  darkMode 
                    ? 'hover:bg-gray-800' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-2 shadow-md">
                  <FiUser className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user?.name?.split(' ')[0] || user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{userRole}</p>
                </div>
              </button>

              {isUserMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl py-2 z-20 animate-fade-in ${
                    darkMode 
                      ? 'bg-gray-800 border border-gray-700' 
                      : 'bg-white border border-gray-100'
                  }`}>
                    <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                    >
                      <FiLogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg ${
                darkMode 
                  ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`md:hidden border-t animate-slide-up ${
          darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-base font-medium ${
                darkMode 
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiHome className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/projects"
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-base font-medium ${
                darkMode 
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiFolder className="h-5 w-5" />
              Projects
            </Link>
            <Link
              to="/tasks"
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-base font-medium ${
                darkMode 
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiList className="h-5 w-5" />
              Task Board
            </Link>
            <div className={`border-t my-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
            <div className="px-3 py-2">
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;