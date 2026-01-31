export enum MarginMode {
  PERCENT = '%',
  RUPIAH = 'Rp',
}

export interface CalculationInput {
  id: string;
  namaProduk: string;
  hpp: number;
  marginProfitValue: number;
  marginProfitMode: MarginMode;
  diskonToko: number;
  potonganCampaignPersen: number;
  subsidiCampaignTokoPersen: number;
  komisiPlatformPersen: number;
  komisiDinamisPersen: number;
  maxKomisiDinamis: number;
  cashbackBonusPersen: number;
  maxCashbackBonus: number;
  biayaPemrosesan: number;
  afiliasiPersen: number;
  komisiAfiliasiTokoPersen: number;
  liveVoucherExtraPersen: number;
  biayaPreOrderPersen: number;
  maxBiayaPreOrder: number;
  biayaLayananMallPersen: number;
  maxBiayaLayananMall: number;
  biayaOperasionalValue: number;
  biayaOperasionalMode: MarginMode;
  targetPersentaseKeuntungan: number;
  inputRoiAktual: number;
  biayaIklanPerPesanan: number;
}

export interface CalculationOutput {
  hargaJual: number;
  potonganCampaignRp: number;
  subsidiCampaignTokoRp: number;
  subsidiCampaignTikTokPersen: number;
  subsidiCampaignTikTokRp: number;
  hargaFinalEtalase: number;
  totalPenghasilanSeller: number;
  basisKomisi: number;
  komisiPlatformRp: number;
  komisiDinamisRp: number;
  cashbackBonusRp: number;
  afiliasiRp: number;
  komisiAfiliasiTokoRp: number;
  liveVoucherExtraRp: number;
  biayaPreOrderRp: number;
  biayaLayananMallRp: number;
  biayaOperasionalRp: number;
  totalBiayaMarketplace: number;
  totalPenyelesaianPembayaran: number;
  targetKeuntunganRp: number;
  potensiKeuntungan: number;
  targetRoiIdeal: number;
  budgetIklanIdeal: number;
  roiBep: number;
  budgetIklanMaksimal: number;
  biayaIklanAktual: number;
  potensiProfitPerOrder: number;
  persentaseKeuntunganAktual: number;
  biayaIklanDenganPpn: number;
  finalProfit: number;
}

export type ProductCalculation = CalculationInput & CalculationOutput & { firestoreId?: string };