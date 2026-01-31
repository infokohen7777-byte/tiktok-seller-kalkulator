
import React, { useState, useEffect, useCallback } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CalculatorPage from './pages/CalculatorPage';
import ProductListPage from './pages/ProductListPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export type Page = 'dashboard' | 'calculator' | 'productList';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  // FIX: Add missing state for sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setCurrentPage('dashboard');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleNavigation = useCallback((page: Page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      // User state akan otomatis null via onAuthStateChanged listener
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Gagal untuk logout.");
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memuat...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Header onMenuClick={() => setIsSidebarOpen(true)} onTitleClick={() => handleNavigation('dashboard')} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={handleNavigation}
        onLogout={handleLogout}
        currentPage={currentPage}
      />
      <main className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        {currentPage === 'dashboard' && <DashboardPage user={user} onNavigate={handleNavigation} />}
        {currentPage === 'calculator' && <CalculatorPage user={user} />}
        {currentPage === 'productList' && <ProductListPage user={user} />}
      </main>
    </div>
  );
};

export default App;
