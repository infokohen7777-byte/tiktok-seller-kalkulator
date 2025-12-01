import React, { useState } from 'react';
import { DollarSign, Percent, Target, Receipt, BarChart, FilePlus, BrainCircuit } from 'lucide-react';
import { useRoasCalculator } from '../hooks/useRoasCalculator';
import { MarginMode, ProductCalculation } from '../types';
import { formatRupiah } from '../lib/utils';
import SectionCard from '../components/calculator/SectionCard';
import InputRow from '../components/calculator/InputRow';
import DisplayRow from '../components/calculator/DisplayRow';
import MarginInput from '../components/calculator/MarginInput';
import Button from '../components/ui/Button';
import Toast from '../components/ui/Toast';
import Input from '../components/ui/Input';
import CappedInputRow from '../components/calculator/CappedInputRow';

const CalculatorPage: React.FC = () => {
  const { inputs, calculations, setInputValue, resetCalculator, fullProductData } = useRoasCalculator();
  const [showToast, setShowToast] = useState(false);

  const handleNumericChange = (key: keyof typeof inputs, value: string) => {
    const numValue = value === '' || value === '-' ? 0 : parseFloat(value);
    setInputValue(key, isNaN(numValue) ? 0 : numValue);
  };
  
  const handleMaxCapChange = (key: keyof typeof inputs, value: string) => {
      const numValue = value === '' ? 999999999 : parseFloat(value);
      setInputValue(key, isNaN(numValue) ? 999999999 : numValue);
  }

  const handleSave = () => {
    if (!inputs.namaProduk) {
      alert('Nama Produk harus diisi sebelum menyimpan.');
      return;
    }
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      alert('Error: Pengguna tidak terautentikasi. Tidak dapat menyimpan data.');
      return;
    }

    const storageKey = `savedProducts_${userEmail}`;
    const savedProducts: ProductCalculation[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const newProducts = [...savedProducts, fullProductData];
    localStorage.setItem(storageKey, JSON.stringify(newProducts));
    
    setShowToast(true);
    resetCalculator();
  };

  const getProfitColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-slate-800';
  };

  return (
    <>
      <SectionCard title="Nama Produk" icon={<FilePlus />}>
        <Input
          type="text"
          placeholder="Masukkan nama produk..."
          value={inputs.namaProduk}
          onChange={(e) => setInputValue('namaProduk', e.target.value)}
        />
      </SectionCard>

      <SectionCard title="Harga & Margin" icon={<DollarSign />}>
        <InputRow label="HPP" type="number" value={inputs.hpp} onChange={e => handleNumericChange('hpp', e.target.value)} unit="Rp" />
        <MarginInput
          label="Margin Profit"
          value={inputs.marginProfitValue}
          mode={inputs.marginProfitMode}
          onValueChange={e => handleNumericChange('marginProfitValue', e.target.value)}
          onModeChange={mode => setInputValue('marginProfitMode', mode)}
          tooltipText="Margin dihitung dari HPP (Harga Pokok Penjualan)"
        />
        <DisplayRow label="Harga Jual" value={formatRupiah(calculations.hargaJual)} />
        <InputRow label="Diskon Toko" type="number" value={inputs.diskonToko} onChange={e => handleNumericChange('diskonToko', e.target.value)} unit="Rp" />
      </SectionCard>
      
      <SectionCard title="Perhitungan Campaign" icon={<Percent />}>
        <InputRow label="Potongan Campaign" type="number" value={inputs.potonganCampaignPersen} onChange={e => handleNumericChange('potonganCampaignPersen', e.target.value)} unit="%" calculatedValue={formatRupiah(calculations.potonganCampaignRp)} />
        <InputRow label="Subsidi Campaign Toko" type="number" value={inputs.subsidiCampaignTokoPersen} onChange={e => handleNumericChange('subsidiCampaignTokoPersen', e.target.value)} unit="%" calculatedValue={formatRupiah(calculations.subsidiCampaignTokoRp)} />
        <DisplayRow label="Subsidi Campaign TikTok" value={`${calculations.subsidiCampaignTikTokPersen.toFixed(2)}% (${formatRupiah(calculations.subsidiCampaignTikTokRp)})`} />
        <DisplayRow label="Harga Final / Etalase" value={formatRupiah(calculations.hargaFinalEtalase)} />
      </SectionCard>

      <SectionCard title="Total Penghasilan" icon={<Receipt />}>
        <DisplayRow label="Total Penghasilan Seller" value={formatRupiah(calculations.totalPenghasilanSeller)} tooltipText="Harga Jual - Diskon Toko - Potongan Campaign yang ditanggung Toko." />
      </SectionCard>

      <SectionCard title="Biaya-Biaya Marketplace" icon={<Receipt />}>
        <InputRow label="Komisi Platform" type="number" value={inputs.komisiPlatformPersen} onChange={e => handleNumericChange('komisiPlatformPersen', e.target.value)} unit="%" calculatedValue={formatRupiah(calculations.komisiPlatformRp)} />
        <CappedInputRow
          label="Komisi Dinamis"
          percentValue={inputs.komisiDinamisPersen}
          onPercentChange={e => handleNumericChange('komisiDinamisPersen', e.target.value)}
          capValue={inputs.maxKomisiDinamis}
          onCapChange={e => handleMaxCapChange('maxKomisiDinamis', e.target.value)}
          calculatedValue={formatRupiah(calculations.komisiDinamisRp)}
        />
        <CappedInputRow
          label="Cashback Bonus"
          percentValue={inputs.cashbackBonusPersen}
          onPercentChange={e => handleNumericChange('cashbackBonusPersen', e.target.value)}
          capValue={inputs.maxCashbackBonus}
          onCapChange={e => handleMaxCapChange('maxCashbackBonus', e.target.value)}
          calculatedValue={formatRupiah(calculations.cashbackBonusRp)}
        />
        <CappedInputRow
          label="Biaya Pre Order"
          percentValue={inputs.biayaPreOrderPersen}
          onPercentChange={e => handleNumericChange('biayaPreOrderPersen', e.target.value)}
          capValue={inputs.maxBiayaPreOrder}
          onCapChange={e => handleMaxCapChange('maxBiayaPreOrder', e.target.value)}
          calculatedValue={formatRupiah(calculations.biayaPreOrderRp)}
        />
        <CappedInputRow
          label="Biaya Layanan Mall"
          percentValue={inputs.biayaLayananMallPersen}
          onPercentChange={e => handleNumericChange('biayaLayananMallPersen', e.target.value)}
          capValue={inputs.maxBiayaLayananMall}
          onCapChange={e => handleMaxCapChange('maxBiayaLayananMall', e.target.value)}
          calculatedValue={formatRupiah(calculations.biayaLayananMallRp)}
        />
        <InputRow label="Biaya Pemrosesan" type="number" value={inputs.biayaPemrosesan} onChange={e => handleNumericChange('biayaPemrosesan', e.target.value)} unit="Rp" />
        <InputRow label="Afiliasi" type="number" value={inputs.afiliasiPersen} onChange={e => handleNumericChange('afiliasiPersen', e.target.value)} unit="%" calculatedValue={formatRupiah(calculations.afiliasiRp)} />
        <InputRow label="Komisi Afiliasi Toko" type="number" value={inputs.komisiAfiliasiTokoPersen} onChange={e => handleNumericChange('komisiAfiliasiTokoPersen', e.target.value)} unit="%" calculatedValue={formatRupiah(calculations.komisiAfiliasiTokoRp)} />
        <InputRow label="Live/Voucher Extra" type="number" value={inputs.liveVoucherExtraPersen} onChange={e => handleNumericChange('liveVoucherExtraPersen', e.target.value)} unit="%" calculatedValue={formatRupiah(calculations.liveVoucherExtraRp)} />
        <MarginInput label="Biaya Operasional" value={inputs.biayaOperasionalValue} mode={inputs.biayaOperasionalMode} onValueChange={e => handleNumericChange('biayaOperasionalValue', e.target.value)} onModeChange={mode => setInputValue('biayaOperasionalMode', mode)} />
      </SectionCard>
      
      <SectionCard title="Total Penyelesaian Pembayaran" icon={<DollarSign />}>
        <DisplayRow label="Total Penyelesaian Pembayaran" value={formatRupiah(calculations.totalPenyelesaianPembayaran)} tooltipText="Jumlah akhir yang diterima seller sebelum biaya iklan." />
      </SectionCard>

      <SectionCard title="Target Ideal" icon={<Target />}>
        <InputRow label="Target Persentase Keuntungan" type="number" value={inputs.targetPersentaseKeuntungan} onChange={e => handleNumericChange('targetPersentaseKeuntungan', e.target.value)} unit="%" calculatedValue={formatRupiah(calculations.targetKeuntunganRp)} />
        <DisplayRow label="Potensi Keuntungan" value={formatRupiah(calculations.potensiKeuntungan)} />
        <DisplayRow label="Target ROI Ideal" value={`${calculations.targetRoiIdeal.toFixed(2)}x`} tooltipText={`Budget Iklan: ${formatRupiah(calculations.budgetIklanIdeal)}`} />
        <DisplayRow label="ROI BEP / Impas" value={`${calculations.roiBep.toFixed(2)}x`} tooltipText={`Budget Iklan Maksimal: ${formatRupiah(calculations.budgetIklanMaksimal)}`} />
      </SectionCard>

      <SectionCard title="Analisis Performa Aktual" icon={<BarChart />}>
        <InputRow label="Input ROI Aktual" type="number" value={inputs.inputRoiAktual} onChange={e => handleNumericChange('inputRoiAktual', e.target.value)} unit="x" />
        <DisplayRow label="Biaya Iklan Aktual" value={formatRupiah(calculations.biayaIklanAktual)} />
        <DisplayRow label="Potensi Profit per Order" value={formatRupiah(calculations.potensiProfitPerOrder)} valueColor={getProfitColor(calculations.potensiProfitPerOrder)} />
        <DisplayRow label="Persentase Keuntungan" value={`${calculations.persentaseKeuntunganAktual.toFixed(2)}%`} valueColor={getProfitColor(calculations.persentaseKeuntunganAktual)} />
      </SectionCard>

      <SectionCard title="Analisis Biaya / Pesanan" icon={<BrainCircuit />}>
        <InputRow label="Biaya Iklan / Pesanan" type="number" value={inputs.biayaIklanPerPesanan} onChange={e => handleNumericChange('biayaIklanPerPesanan', e.target.value)} unit="Rp" calculatedValue={<span className="text-xs text-slate-500">PPN 11%: {formatRupiah(calculations.biayaIklanDenganPpn)}</span>} />
        <DisplayRow label="Pembayaran" value={formatRupiah(calculations.totalPenyelesaianPembayaran)} />
        <DisplayRow label="Profit" value={formatRupiah(calculations.finalProfit)} valueColor={getProfitColor(calculations.finalProfit)} />
      </SectionCard>

      <div className="mt-8">
        <Button onClick={handleSave} className="w-full text-lg py-3">
          Simpan Perhitungan
        </Button>
      </div>
      
      <Toast message="Data berhasil disimpan" show={showToast} onDismiss={() => setShowToast(false)} />
    </>
  );
};

export default CalculatorPage;