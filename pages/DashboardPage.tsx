import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Page } from '../App';
import { Calculator, List, ArrowRight } from 'lucide-react';

interface DashboardPageProps {
  user: User;
  onNavigate: (page: Page) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onNavigate }) => {
  const [productCount, setProductCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchProductCount = async () => {
      if (!user) return;
      try {
        const userProductsCollection = collection(db, 'users', user.uid, 'products');
        const querySnapshot = await getDocs(userProductsCollection);
        setProductCount(querySnapshot.size);
      } catch (error) {
        console.error("Error fetching product count: ", error);
        setProductCount(0); // Set to 0 on error
      }
    };

    fetchProductCount();
  }, [user]);

  const NavCard = ({ title, description, icon, page, count }: { title: string, description: string, icon: React.ReactNode, page: Page, count?: number | null }) => (
    <button
      onClick={() => onNavigate(page)}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-left w-full flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center text-cyan-600 mb-3">
          {icon}
          <h3 className="text-xl font-bold text-slate-800 ml-3">{title}</h3>
        </div>
        <p className="text-slate-600">{description}</p>
      </div>
      <div className="flex justify-between items-center mt-6">
        {count !== undefined ? (
           <span className="text-sm font-medium text-slate-500">
             {count === null ? 'Memuat...' : `${count} produk tersimpan`}
           </span>
        ) : <div />}
        <div className="flex items-center text-cyan-600 font-semibold">
          Lanjutkan <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </button>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Selamat Datang!</h1>
        <p className="text-slate-600 mt-1">
          Anda login sebagai <span className="font-semibold text-cyan-700">{user.email}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NavCard
          title="Kalkulator ROAS"
          description="Buat perhitungan baru untuk menganalisis profitabilitas produk Anda."
          icon={<Calculator size={28} />}
          page="calculator"
        />
        <NavCard
          title="Daftar Produk"
          description="Lihat, kelola, dan hapus semua perhitungan produk yang telah Anda simpan."
          icon={<List size={28} />}
          page="productList"
          count={productCount}
        />
      </div>
    </div>
  );
};

export default DashboardPage;