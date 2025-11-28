import React, { useState, useEffect, useMemo } from 'react';
import { Search, PackageOpen } from 'lucide-react';
import { ProductCalculation } from '../types';
import ProductAccordion from '../components/product/ProductAccordion';
import Input from '../components/ui/Input';

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<ProductCalculation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
      const storageKey = `savedProducts_${userEmail}`;
      const savedProducts = JSON.parse(localStorage.getItem(storageKey) || '[]');
      setProducts(savedProducts);
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      const userEmail = sessionStorage.getItem('userEmail');
      if (!userEmail) {
        alert('Error: Pengguna tidak terautentikasi. Tidak dapat menghapus data.');
        return;
      }
      const storageKey = `savedProducts_${userEmail}`;
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem(storageKey, JSON.stringify(updatedProducts));
    }
  };
  
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.namaProduk.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

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
              key={product.id}
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