import React, { useState, useEffect, useMemo } from 'react';
import { User } from 'firebase/auth';
import { collection, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Search, PackageOpen } from 'lucide-react';
import { ProductCalculation } from '../types';
import ProductAccordion from '../components/product/ProductAccordion';
import Input from '../components/ui/Input';

interface ProductListPageProps {
  user: User;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ user }) => {
  const [products, setProducts] = useState<ProductCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const userProductsCollection = collection(db, 'users', user.uid, 'products');
    const q = query(userProductsCollection);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productsData: ProductCalculation[] = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ ...doc.data() as ProductCalculation, firestoreId: doc.id });
      });
      setProducts(productsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products: ", error);
      alert("Gagal memuat data produk.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (firestoreId: string) => {
    if (!firestoreId) {
      alert('Error: ID produk tidak valid.');
      return;
    }
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      if (!user) {
        alert('Error: Pengguna tidak terautentikasi.');
        return;
      }
      try {
        const productDocRef = doc(db, 'users', user.uid, 'products', firestoreId);
        await deleteDoc(productDocRef);
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Gagal menghapus produk.");
      }
    }
  };
  
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.namaProduk.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);
  
  if (loading) {
    return <div className="text-center p-10">Memuat data produk...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <Input 
          type="text"
          placeholder="Cari nama produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search size={18} className="text-slate-400" />}
        />
      </div>

      <div className="space-y-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductAccordion 
              key={product.firestoreId || product.id}
              product={product}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center py-10 px-6 bg-white rounded-xl shadow-md">
            <PackageOpen size={48} className="mx-auto text-slate-400" />
            <h3 className="mt-4 text-lg font-semibold text-slate-700">Belum Ada Data</h3>
            <p className="mt-1 text-sm text-slate-500">
              Anda belum menyimpan perhitungan apapun. Silakan buat perhitungan baru di halaman Kalkulator.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;