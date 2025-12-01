import { useState, useMemo, useCallback } from 'react';
import { CalculationInput, CalculationOutput, MarginMode, ProductCalculation } from '../types';

const PPN_RATE = 0.11;
const NO_LIMIT = 999999999;

const getInitialState = (): CalculationInput => ({
  id: `prod_${Date.now()}`,
  namaProduk: '',
  hpp: 0,
  marginProfitValue: 30,
  marginProfitMode: MarginMode.PERCENT,
  diskonToko: 0,
  potonganCampaignPersen: 5,
  subsidiCampaignTokoPersen: 50,
  komisiPlatformPersen: 4,
  komisiDinamisPersen: 2.1,
  maxKomisiDinamis: NO_LIMIT,
  cashbackBonusPersen: 0,
  maxCashbackBonus: NO_LIMIT,
  biayaPemrosesan: 1000,
  afiliasiPersen: 0,
  komisiAfiliasiTokoPersen: 0,
  liveVoucherExtraPersen: 0,
  biayaPreOrderPersen: 0,
  maxBiayaPreOrder: NO_LIMIT,
  biayaLayananMallPersen: 0,
  maxBiayaLayananMall: NO_LIMIT,
  biayaOperasionalValue: 5,
  biayaOperasionalMode: MarginMode.PERCENT,
  targetPersentaseKeuntungan: 20,
  inputRoiAktual: 0,
  biayaIklanPerPesanan: 0,
});

export const useRoasCalculator = (initialData?: ProductCalculation) => {
  const [inputs, setInputs] = useState<CalculationInput>(initialData || getInitialState());

  const setInputValue = useCallback(<K extends keyof CalculationInput>(key: K, value: CalculationInput[K]) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  }, []);

  const calculations = useMemo<CalculationOutput>(() => {
    const { 
      hpp, marginProfitValue, marginProfitMode, diskonToko, potonganCampaignPersen, subsidiCampaignTokoPersen,
      komisiPlatformPersen, komisiDinamisPersen, maxKomisiDinamis, cashbackBonusPersen, maxCashbackBonus,
      biayaPemrosesan, afiliasiPersen, komisiAfiliasiTokoPersen, liveVoucherExtraPersen,
      biayaPreOrderPersen, maxBiayaPreOrder, biayaLayananMallPersen, maxBiayaLayananMall,
      biayaOperasionalValue, biayaOperasionalMode, targetPersentaseKeuntungan, inputRoiAktual, biayaIklanPerPesanan
    } = inputs;

    // Harga Jual = HPP * (1 + Margin %)
    const hargaJual = marginProfitMode === MarginMode.PERCENT
      ? hpp * (1 + (marginProfitValue / 100))
      : hpp + marginProfitValue;

    const potonganCampaignRp = hargaJual * (potonganCampaignPersen / 100);
    const subsidiCampaignTokoRp = potonganCampaignRp * (subsidiCampaignTokoPersen / 100);
    const subsidiCampaignTikTokRp = potonganCampaignRp - subsidiCampaignTokoRp;
    const subsidiCampaignTikTokPersen = hargaJual > 0 ? (subsidiCampaignTikTokRp / hargaJual) * 100 : 0;
    const hargaFinalEtalase = hargaJual - diskonToko - potonganCampaignRp;

    // Total Penghasilan Seller = Harga Jual - Diskon Toko - Potongan Campaign ditanggung Toko (subsidiCampaignTokoRp)
    const totalPenghasilanSeller = hargaJual - diskonToko - subsidiCampaignTokoRp;

    // Basis Komisi = Harga Jual - Total Potongan Campaign
    const basisKomisi = hargaJual - potonganCampaignRp;
    const komisiPlatformRp = basisKomisi * (komisiPlatformPersen / 100);
    
    // Biaya dengan batas maksimal
    const komisiDinamisRp = Math.min(basisKomisi * (komisiDinamisPersen / 100), maxKomisiDinamis);
    const cashbackBonusRp = Math.min(basisKomisi * (cashbackBonusPersen / 100), maxCashbackBonus);
    const biayaPreOrderRp = Math.min(basisKomisi * (biayaPreOrderPersen / 100), maxBiayaPreOrder);
    const biayaLayananMallRp = Math.min(basisKomisi * (biayaLayananMallPersen / 100), maxBiayaLayananMall);

    const afiliasiRp = basisKomisi * (afiliasiPersen / 100);
    const komisiAfiliasiTokoRp = basisKomisi * (komisiAfiliasiTokoPersen / 100);
    const liveVoucherExtraRp = basisKomisi * (liveVoucherExtraPersen / 100);
    const biayaOperasionalRp = biayaOperasionalMode === MarginMode.PERCENT
      ? totalPenghasilanSeller * (biayaOperasionalValue / 100)
      : biayaOperasionalValue;
    
    const totalBiayaMarketplace = komisiPlatformRp + komisiDinamisRp + cashbackBonusRp + biayaPemrosesan + afiliasiRp + komisiAfiliasiTokoRp + liveVoucherExtraRp + biayaPreOrderRp + biayaLayananMallRp + biayaOperasionalRp;
    
    // Total Penyelesaian Pembayaran = Total Penghasilan Seller - Total Biaya Marketplace
    const totalPenyelesaianPembayaran = totalPenghasilanSeller - totalBiayaMarketplace;

    const profitSebelumIklan = totalPenyelesaianPembayaran - hpp;

    const targetKeuntunganRp = totalPenghasilanSeller * (targetPersentaseKeuntungan / 100);
    const potensiKeuntungan = profitSebelumIklan;
    const budgetIklanIdeal = potensiKeuntungan - targetKeuntunganRp > 0 ? potensiKeuntungan - targetKeuntunganRp : 0;
    const targetRoiIdeal = budgetIklanIdeal > 0 ? totalPenghasilanSeller / budgetIklanIdeal : 0;

    const budgetIklanMaksimal = profitSebelumIklan > 0 ? profitSebelumIklan : 0;
    const roiBep = budgetIklanMaksimal > 0 ? totalPenghasilanSeller / budgetIklanMaksimal : 0;
    
    const biayaIklanAktual = inputRoiAktual > 0 ? totalPenghasilanSeller / inputRoiAktual : 0;
    const potensiProfitPerOrder = profitSebelumIklan - biayaIklanAktual;
    const persentaseKeuntunganAktual = totalPenghasilanSeller > 0 ? (potensiProfitPerOrder / totalPenghasilanSeller) * 100 : 0;
    
    // Biaya iklan final adalah Biaya Iklan / Pesanan (input) * 1.11 (ditambah PPN 11%)
    const biayaIklanDenganPpn = biayaIklanPerPesanan * (1 + PPN_RATE);
    // Profit final adalah Total Penyelesaian Pembayaran - HPP - Biaya Iklan Final.
    const finalProfit = totalPenyelesaianPembayaran - hpp - biayaIklanDenganPpn;

    return {
      hargaJual, potonganCampaignRp, subsidiCampaignTokoRp, subsidiCampaignTikTokPersen, subsidiCampaignTikTokRp,
      hargaFinalEtalase, totalPenghasilanSeller, basisKomisi, komisiPlatformRp, komisiDinamisRp, cashbackBonusRp,
      afiliasiRp, komisiAfiliasiTokoRp, liveVoucherExtraRp, biayaPreOrderRp, biayaLayananMallRp, biayaOperasionalRp, totalBiayaMarketplace,
      totalPenyelesaianPembayaran, targetKeuntunganRp, potensiKeuntungan, targetRoiIdeal, budgetIklanIdeal,
      roiBep, budgetIklanMaksimal, biayaIklanAktual, potensiProfitPerOrder, persentaseKeuntunganAktual,
      biayaIklanDenganPpn, finalProfit
    };
  }, [inputs]);

  const resetCalculator = useCallback(() => {
    const newState = getInitialState();
    // Keep the id unique even on reset
    newState.id = `prod_${Date.now()}`;
    setInputs(newState);
  }, []);
  
  const loadProductData = useCallback((product: ProductCalculation) => {
    // Ensure all fields from CalculationInput are present
    const loadedInputs: CalculationInput = {
      ...getInitialState(), // Start with defaults to handle older data structures
      ...product
    };
    setInputs(loadedInputs);
  }, []);

  const fullProductData = useMemo<ProductCalculation>(() => ({
    ...inputs,
    ...calculations
  }), [inputs, calculations]);

  return {
    inputs,
    calculations,
    setInputValue,
    resetCalculator,
    loadProductData,
    fullProductData,
  };
};