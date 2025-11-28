import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from './pages/LoginPage';
import CalculatorPage from './pages/CalculatorPage';
import ProductListPage from './pages/ProductListPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export type Page = 'calculator' | 'productList';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>('calculator');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('isAuthenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = useCallback((email: string) => {
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('userEmail', email);
    setIsAuthenticated(true);
  }, []);

  const handleNavigation = useCallback((page: Page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  }, []);

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={handleNavigation}
        currentPage={currentPage}
      />
      <main className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        {currentPage === 'calculator' && <CalculatorPage />}
        {currentPage === 'productList' && <ProductListPage />}
      </main>
    </div>
  );
};

export default App;