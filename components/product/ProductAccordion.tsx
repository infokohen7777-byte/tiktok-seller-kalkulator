import React, { useState } from 'react';
import { ChevronDown, Trash2 } from 'lucide-react';
import { ProductCalculation } from '../../types';
import ProductDetail from './ProductDetail';

interface ProductAccordionProps {
  product: ProductCalculation;
  onDelete: (id: string) => void;
}

const ProductAccordion: React.FC<ProductAccordionProps> = ({ product, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(product.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-bold text-slate-800">{product.namaProduk}</span>
        <div className="flex items-center">
          <button 
            onClick={handleDelete}
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-full mr-2"
            aria-label="Hapus produk"
          >
            <Trash2 size={18} />
          </button>
          <ChevronDown
            size={20}
            className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[2000px]' : 'max-h-0'
        }`}
      >
        <div className="p-6 border-t border-slate-200">
          <ProductDetail product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductAccordion;
