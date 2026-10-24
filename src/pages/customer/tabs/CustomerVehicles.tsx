import React, { useState } from 'react';

interface CustomerVehiclesProps {
  onOpenAddVehicle: () => void;
  onOpenBooking: () => void;
}

export default function CustomerVehicles({ onOpenAddVehicle, onOpenBooking }: CustomerVehiclesProps) {
  const [selectedBookVehicle, setSelectedBookVehicle] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      <div className="flex flex-col w-full">
        {/* Top Bar / Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs uppercase tracking-wider text-blue-700 font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs">
                Garasi &amp; Inventaris
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="font-mono text-xs text-slate-500 font-semibold">
                3 Unit Terdaftar
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Garasi Saya</h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Kelola riwayat servis, buku digital, dan dokumen kendaraan pribadi Anda dalam satu tempat.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-slate-600 text-xs font-semibold shadow-2xs">
              <span className="material-symbols-outlined text-[18px] text-emerald-600 mr-2">verified</span>
              Buku Digital Terverifikasi
            </div>
            <button
              type="button"
              onClick={onOpenAddVehicle}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Tambah Kendaraan</span>
            </button>
          </div>
        </div>

        {/* Telemetry Strip Banner */}
        <div className="bg-white rounded-3xl p-5 shadow-xs mb-8 flex flex-wrap items-center justify-between gap-4 border border-slate-200/90">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700 shadow-2xs">
              <span className="material-symbols-outlined text-[24px]">garage</span>
            </div>
            <div>
              <p className="text-sm sm:text-base font-bold text-slate-900">
                Garasi Digital Bengkel Ansor
              </p>
              <p className="text-xs text-slate-500">
                Sinkronisasi langsung dengan sistem diagnostic bay dan sistem sparepart pusat
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>2 Siap Jalan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="font-bold text-blue-700">1 Sedang Servis</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span>0 Rekomendasi Tertunda</span>
            </div>
          </div>
        </div>

        {/* Grid Daftar Kendaraan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Kartu Kendaraan 1: Honda CR-V (Active Workshop Service) */}
          <div className="bg-white rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden border border-slate-200/90 group">
            <div className="p-6 pb-0">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] bg-slate-100 text-slate-700 font-bold">
                  Mobil Pribadi
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] bg-blue-50 text-blue-700 border border-blue-200/80 font-bold">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                  Pit 02 Aktif
                </span>
              </div>

              {/* Vehicle Visual */}
              <div className="relative w-full h-44 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center mb-4 shadow-inner">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  src="https://images.unsplash.com/photo-1590362891988-30159491b920?auto=format&fit=crop&w=800&q=80"
                  alt="Honda CR-V 1.5 Turbo"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg font-mono text-[10px] text-white font-bold border border-white/20">
                  BAY #02 ACTIVE
                </div>
              </div>

              {/* Identity & License Plate */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">
                    Honda CR-V 1.5 Turbo Prestige
                  </h2>
                  <p className="text-xs text-slate-500">Tahun 2022 • Hitam Metalik Crystal</p>
                </div>
              </div>

              {/* License Plate Badge */}
              <div className="my-3.5 flex items-center justify-between bg-slate-50 border border-slate-200/80 p-2.5 rounded-2xl">
                <div className="font-mono text-xs bg-slate-900 text-white px-3 py-1 rounded-lg font-bold tracking-widest shadow-xs">
                  B 1945 ANS
                </div>
                <span className="font-mono text-xs text-blue-700 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  Live Progress
                </span>
              </div>

              {/* Metrics & Telemetry List */}
              <div className="space-y-2 py-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">speed</span>
                    Odometer
                  </span>
                  <span className="font-mono font-bold text-slate-900">42.150 KM</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-blue-600">calendar_clock</span>
                    Servis Terakhir
                  </span>
                  <span className="text-blue-700 font-bold">Hari ini (Sedang Berjalan)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">shield</span>
                    Asuransi
                  </span>
                  <span className="text-slate-800 font-semibold flex items-center gap-1">
                    Garda Oto
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-bold">
                      Aktif
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 pt-3 mt-3 bg-slate-50 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedBookVehicle('Honda CR-V')}
                className="w-full h-10 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-blue-700 text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                <span>Lihat Buku Servis Digital</span>
              </button>
              <div className="w-full bg-blue-50/70 border border-blue-100 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-blue-700 font-bold">
                  <span className="material-symbols-outlined text-[16px]">engineering</span>
                  Pit 2: Bpk. Sugeng
                </span>
                <span className="font-mono text-[11px] text-slate-500">Est. 16:30</span>
              </div>
            </div>
          </div>

          {/* Kartu Kendaraan 2: Toyota Yaris Cross HEV */}
          <div className="bg-white rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden border border-slate-200/90 group">
            <div className="p-6 pb-0">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] bg-slate-100 text-slate-700 font-bold">
                  Mobil Keluarga
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Kondisi Prima
                </span>
              </div>

              {/* Vehicle Visual */}
              <div className="relative w-full h-44 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center mb-4 shadow-inner">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
                  alt="Toyota Yaris Cross HEV"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-emerald-900/80 backdrop-blur-md rounded-lg font-mono text-[10px] text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">bolt</span> HYBRID
                </div>
              </div>

              {/* Identity & License Plate */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">
                    Toyota Yaris Cross HEV
                  </h2>
                  <p className="text-xs text-slate-500">Tahun 2023 • Putih Mutiara Platinum</p>
                </div>
              </div>

              {/* License Plate Badge */}
              <div className="my-3.5 flex items-center justify-between bg-slate-50 border border-slate-200/80 p-2.5 rounded-2xl">
                <div className="font-mono text-xs bg-slate-900 text-white px-3 py-1 rounded-lg font-bold tracking-widest shadow-xs">
                  B 2024 ANS
                </div>
                <span className="text-xs text-emerald-700 font-semibold">Garansi Mesin OK</span>
              </div>

              {/* Metrics & Telemetry List */}
              <div className="space-y-2 py-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">speed</span>
                    Odometer
                  </span>
                  <span className="font-mono font-bold text-slate-900">12.800 KM</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">calendar_clock</span>
                    Servis Terakhir
                  </span>
                  <span className="text-slate-800 font-semibold">15 Jul 2024 (Lunas)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">shield</span>
                    Asuransi
                  </span>
                  <span className="text-slate-800 font-semibold flex items-center gap-1">
                    Astra Buana
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-bold">
                      Aktif
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 pt-3 mt-3 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                <span>Booking Servis Berkala</span>
              </button>
            </div>
          </div>

          {/* Kartu Kendaraan 3: Yamaha NMAX 155 */}
          <div className="bg-white rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden border border-slate-200/90 group">
            <div className="p-6 pb-0">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] bg-slate-100 text-slate-700 font-bold">
                  Kendaraan Harian
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Siap Pakai
                </span>
              </div>

              {/* Vehicle Visual */}
              <div className="relative w-full h-44 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center mb-4 shadow-inner">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
                  alt="Yamaha NMAX 155"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg font-mono text-[10px] text-white font-bold border border-white/20">
                  RODA 2
                </div>
              </div>

              {/* Identity & License Plate */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">
                    Yamaha NMAX 155 Connected
                  </h2>
                  <p className="text-xs text-slate-500">Tahun 2021 • Matte Blue Dark</p>
                </div>
              </div>

              {/* License Plate Badge */}
              <div className="my-3.5 flex items-center justify-between bg-slate-50 border border-slate-200/80 p-2.5 rounded-2xl">
                <div className="font-mono text-xs bg-slate-900 text-white px-3 py-1 rounded-lg font-bold tracking-widest shadow-xs">
                  B 4821 KLO
                </div>
                <span className="text-xs text-slate-500 font-medium">Oli CVT Normal</span>
              </div>

              {/* Metrics & Telemetry List */}
              <div className="space-y-2 py-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">speed</span>
                    Odometer
                  </span>
                  <span className="font-mono font-bold text-slate-900">28.400 KM</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">calendar_clock</span>
                    Servis Terakhir
                  </span>
                  <span className="text-slate-800 font-semibold">12 Feb 2024 (Ganti Vanbelt)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
                    Pajak STNK
                  </span>
                  <span className="text-slate-800 font-semibold">Berakhir Nov 2025</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 pt-3 mt-3 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setSelectedBookVehicle('Yamaha NMAX')}
                className="w-full h-10 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-blue-700 text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                <span>Buku Servis Motor Digital</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Buku Servis Digital Modal */}
      {selectedBookVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-[24px]">verified</span>
                <h3 className="text-lg font-bold text-slate-900">
                  Buku Servis Digital: {selectedBookVehicle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBookVehicle(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Nomor Rangka (VIN):</span>
                <span className="font-mono font-bold text-slate-900">MHRCRV2022J098234</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Nomor Mesin:</span>
                <span className="font-mono font-bold text-slate-900">L15B7-8891024</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-xs">
                <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0">verified</span>
                <span>Buku digital ini telah ditandatangani secara kriptografi oleh POS Bengkel Ansor.</span>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedBookVehicle(null)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Tutup Dokumen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
