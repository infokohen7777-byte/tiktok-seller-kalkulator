import React from 'react';
import { ProductCalculation } from '../../types';
import { formatRupiah } from '../../lib/utils';
import DisplayRow from '../calculator/DisplayRow';

interface ProductDetailProps {
  product: ProductCalculation;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const getProfitColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-slate-800';
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold text-md text-slate-700 mb-2 border-b pb-1">Harga & Margin</h3>
        <DisplayRow label="HPP" value={formatRupiah(product.hpp)} />
        <DisplayRow label="Margin Profit" value={`${product.marginProfitValue}${product.marginProfitMode}`} />
        <DisplayRow label="Harga Jual" value={formatRupiah(product.hargaJual)} />
        <DisplayRow label="Diskon Toko" value={formatRupiah(product.diskonToko)} />
      </div>
      <div>
        <h3 className="font-bold text-md text-slate-700 mb-2 border-b pb-1">Perhitungan Campaign</h3>
        <DisplayRow label="Potongan Campaign" value={`${product.potonganCampaignPersen}% (${formatRupiah(product.potonganCampaignRp)})`} />
        <DisplayRow label="Subsidi Campaign Toko" value={`${product.subsidiCampaignTokoPersen}% (${formatRupiah(product.subsidiCampaignTokoRp)})`} />
        <DisplayRow label="Harga Final / Etalase" value={formatRupiah(product.hargaFinalEtalase)} />
      </div>
      <div>
        <h3 className="font-bold text-md text-slate-700 mb-2 border-b pb-1">Biaya-Biaya</h3>
        <DisplayRow label="Komisi Platform" value={`${product.komisiPlatformPersen}% (${formatRupiah(product.komisiPlatformRp)})`} />
        <DisplayRow label="Komisi Dinamis" value={`${product.komisiDinamisPersen}% (${formatRupiah(product.komisiDinamisRp)})`} />
        <DisplayRow label="Cashback Bonus" value={`${product.cashbackBonusPersen}% (${formatRupiah(product.cashbackBonusRp)})`} />
        <DisplayRow label="Biaya Pre Order" value={`${product.biayaPreOrderPersen || 0}% (${formatRupiah(product.biayaPreOrderRp || 0)})`} />
        <DisplayRow label="Biaya Layanan Mall" value={`${product.biayaLayananMallPersen || 0}% (${formatRupiah(product.biayaLayananMallRp || 0)})`} />
        <DisplayRow label="Biaya Pemrosesan" value={formatRupiah(product.biayaPemrosesan)} />
        <DisplayRow label="Biaya Operasional" value={`${product.biayaOperasionalValue}${product.biayaOperasionalMode} (${formatRupiah(product.biayaOperasionalRp)})`} />
        <DisplayRow label="Total Biaya Marketplace" value={formatRupiah(product.totalBiayaMarketplace)} />
      </div>
       <div>
        <h3 className="font-bold text-md text-slate-700 mb-2 border-b pb-1">Total & Profit</h3>
        <DisplayRow label="Total Penghasilan Seller" value={formatRupiah(product.totalPenghasilanSeller)} />
        <DisplayRow label="Total Penyelesaian Pembayaran" value={formatRupiah(product.totalPenyelesaianPembayaran)} />
        <DisplayRow label="Biaya Iklan / Pesanan" value={`${formatRupiah(product.biayaIklanPerPesanan)} (+PPN: ${formatRupiah(product.biayaIklanDenganPpn)})`} />
        <DisplayRow label="Final Profit" value={formatRupiah(product.finalProfit)} valueColor={getProfitColor(product.finalProfit)}/>
      </div>
    </div>
  );
};

export default ProductDetail;