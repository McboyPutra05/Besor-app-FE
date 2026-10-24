import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

interface CustomerDashboardProps {
  onOpenBooking: () => void;
  onGoToGarasi: () => void;
}

export default function CustomerDashboard({ onOpenBooking, onGoToGarasi }: CustomerDashboardProps) {
  const { user } = useAuth();
  const [copiedCode, setCopiedCode] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('ANSORCARE');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      <div className="flex flex-col w-full">
        {/* Salutation & Unit Overview Header */}
        <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold tracking-wide uppercase shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Workshop Telemetry
              </span>
              <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                BAY-04 / WO-88219
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Selamat Datang Kembali, {user?.name || 'Dimas Ansori'}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Pemantauan langsung status pengerjaan unit aktif:{' '}
              <span className="font-semibold text-slate-800">Honda CR-V 1.5 Turbo</span>
            </p>
          </div>

          {/* Quick Vehicle Selector Pill */}
          <div
            onClick={onGoToGarasi}
            className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all self-start lg:self-center cursor-pointer group"
            title="Klik untuk ke Garasi Saya"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white shadow-xs">
              <span className="material-symbols-outlined text-blue-400 text-[18px]">directions_car</span>
              <span className="font-mono text-xs font-bold tracking-wider">B 1945 ANS</span>
            </div>
            <span className="text-xs uppercase font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Sedang Dikerjakan
            </span>
          </div>
        </section>

        {/* Main Active Service Stage Banner */}
        <section className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 mb-10 relative overflow-hidden">
          {/* Subtle Ambient Backdrop Accent */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-8">
            {/* Banner Meta Row: Vehicle, Plate, SA Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {/* Realistic License Plate Tag */}
                <div className="inline-flex items-center px-4 py-2 bg-slate-950 rounded-xl shadow-md border border-slate-800">
                  <span className="font-mono text-sm text-white font-bold tracking-widest uppercase">
                    B 1945 ANS
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-lg sm:text-xl font-bold text-slate-900">
                      Honda CR-V 1.5 Prestige Turbo
                    </span>
                    <span className="font-medium text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                      2021 • Hitam Metalik
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 font-medium">
                    <span className="material-symbols-outlined text-[16px] text-blue-600">schedule</span>
                    Masuk Bengkel: Hari ini, 09:15 WIB • Stall 04 (Hydraulic Lift A)
                  </span>
                </div>
              </div>

              {/* PIC Service Advisor Cardlet */}
              <div className="flex items-center gap-3.5 bg-slate-50/80 border border-slate-200/80 px-4 py-2.5 rounded-2xl self-start md:self-auto shadow-2xs">
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[24px]">support_agent</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                    Service Advisor PIC
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    Bayu Pratama
                  </span>
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <a
                    className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-2xs"
                    href="https://wa.me/6281299887711"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Chat WhatsApp Service Advisor"
                  >
                    <span className="material-symbols-outlined text-[17px]">chat</span>
                  </a>
                  <a
                    className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-2xs"
                    href="tel:081299887711"
                    title="Telepon Service Advisor"
                  >
                    <span className="material-symbols-outlined text-[17px]">call</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Live Interactive Progress Tracking */}
            <div className="flex flex-col gap-6 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    Tahap Pengerjaan Berjalan
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-blue-700 px-3.5 py-1 bg-blue-50 border border-blue-200/80 rounded-full shadow-2xs">
                  65% Selesai
                </span>
              </div>

              {/* 4-Stage Step Visualizer */}
              <div className="relative w-full">
                {/* Background Progress Rail */}
                <div className="absolute top-5 left-6 right-6 h-2 bg-slate-100 rounded-full -translate-y-1/2 z-0"></div>
                {/* Filled Gradient Progress Rail (65%) */}
                <div className="absolute top-5 left-6 w-[58%] h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-600 rounded-full -translate-y-1/2 z-0 transition-all duration-700 shadow-xs"></div>

                {/* Step Indicators Grid */}
                <div className="relative z-10 grid grid-cols-4 gap-2 text-center">
                  {/* Stage 1: Pengecekan (Selesai) */}
                  <div className="flex flex-col items-center group cursor-default">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                      <span className="material-symbols-outlined text-[20px] font-bold">check</span>
                    </div>
                    <span className="text-xs text-slate-900 font-bold mt-3">
                      1. Pengecekan
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold hidden sm:block">
                      General Check Selesai
                    </span>
                  </div>

                  {/* Stage 2: Pengerjaan (Aktif) */}
                  <div className="flex flex-col items-center group cursor-default">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 ring-4 ring-blue-100">
                        <span className="material-symbols-outlined text-[20px] animate-spin" style={{ animationDuration: '4s' }}>
                          settings
                        </span>
                      </div>
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-2 ring-white animate-pulse"></span>
                    </div>
                    <span className="text-xs text-blue-600 font-extrabold mt-3">
                      2. Pengerjaan
                    </span>
                    <span className="text-[11px] text-blue-600 font-semibold hidden sm:block">
                      Proses Utama (Aktif)
                    </span>
                  </div>

                  {/* Stage 3: QC (Menunggu) */}
                  <div className="flex flex-col items-center group cursor-default opacity-75">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">fact_check</span>
                    </div>
                    <span className="text-xs text-slate-600 font-medium mt-3">
                      3. Uji QC
                    </span>
                    <span className="text-[11px] text-slate-400 hidden sm:block">
                      Antre Scan OBD &amp; Emisi
                    </span>
                  </div>

                  {/* Stage 4: Siap Diambil */}
                  <div className="flex flex-col items-center group cursor-default opacity-50">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">key</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium mt-3">
                      4. Siap Diambil
                    </span>
                    <span className="text-[11px] text-slate-400 hidden sm:block">
                      Cuci Bersih &amp; Serah Terima
                    </span>
                  </div>
                </div>
              </div>

              {/* Real-Time Sub-detail Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-2xs shrink-0">
                    <span className="material-symbols-outlined text-[20px]">handyman</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Pekerjaan Sedang Berlangsung
                    </span>
                    <span className="text-xs sm:text-sm text-slate-800 font-bold">
                      Tune Up Throttle Body, Kalibrasi Idle &amp; Kuras Minyak Rem DOT 4
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs text-slate-500 font-medium">Mekanik:</span>
                  <span className="text-xs text-slate-800 font-bold">
                    Sugeng H. (Senior Specialist)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Split Content Grid: Left (Promos/Reminders) & Right (Live Cost Summary & Estimates) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Promo & Service Reminders (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-[22px]">notifications_active</span>
                <h2 className="text-lg font-bold text-slate-900">Promo &amp; Pengingat Servis</h2>
              </div>
              <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                Garasi &amp; Promo Aktif
              </span>
            </div>

            {/* Card 1: Reminder Servis Unit Kedua (Toyota Yaris Cross) */}
            <div className="w-full bg-white rounded-3xl p-6 shadow-xs hover:shadow-md border border-slate-200/90 transition-all relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                    <span className="material-symbols-outlined text-[26px]">car_repair</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded-lg bg-slate-900 text-white font-bold">
                        B 2024 ANS
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        Jatuh Tempo Servis
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-2">
                      Toyota Yaris Cross HEV (Unit Kedua)
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      Kilometer saat ini telah melampaui <span className="font-bold text-slate-800">10.000 KM</span> atau telah 6 bulan sejak servis awal. Segera ganti oli &amp; periksa sistem hybrid demi menjaga garansi baterai.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="material-symbols-outlined text-[18px] text-blue-600">event_available</span>
                  <span>Rekomendasi slot: Minggu ini (Kapasitas Bengkel Pagi)</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 text-xs font-bold transition-all shadow-md shadow-blue-500/20 shrink-0 cursor-pointer"
                >
                  <span>Jadwalkan Servis</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card 2: Voucher Promo Bulanan (VIP Cardlet) */}
            <div className="w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 shadow-md border border-slate-800 relative overflow-hidden">
              {/* Metallic Accent */}
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none"></div>

              <div className="relative z-10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 flex items-center justify-center shrink-0 shadow-inner">
                  <span className="material-symbols-outlined text-[26px]">confirmation_number</span>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-[10px] uppercase font-bold text-yellow-300 tracking-wider">
                      Member Loyalty Exclusive
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Berlaku s/d 30 Nov 2025
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-2.5">
                    Diskon 20% Paket Detailing &amp; Spooring 3D Hunter
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Dapatkan penyetelan sudut roda presisi komputer dan perlindungan nano-ceramic interior setelah menyelesaikan servis berkala Anda.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 uppercase font-medium">
                        Kode Kupon:
                      </span>
                      <span className="font-mono text-sm font-bold text-yellow-300 bg-black/40 border border-white/10 px-3 py-1 rounded-lg tracking-widest select-all">
                        ANSORCARE
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/15 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {copiedCode ? 'done' : 'content_copy'}
                      </span>
                      <span>{copiedCode ? 'Disalin!' : 'Salin Kode'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Tips Otomotif Mingguan */}
            <div className="w-full bg-white rounded-3xl p-6 shadow-xs hover:shadow-md border border-slate-200/90 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px]">lightbulb</span>
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-[11px] uppercase font-bold text-blue-600 tracking-wider">
                    Tips Otomotif Mingguan
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    Menjaga Kondisi Oli Transmisi CVT di Musim Hujan &amp; Banjir
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                    Genangan air tinggi berisiko masuk melalui lubang pernapasan (breather valve) girboks CVT Honda CR-V. Segera periksa warna dipstick oli matic jika sempat menerjang genangan di atas 30 cm untuk mencegah selip belt baja.
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <span className="inline-flex items-center gap-1 text-blue-600 font-bold text-xs cursor-pointer hover:underline">
                      <span>Baca Selengkapnya</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </span>
                    <span className="text-xs text-slate-400">• 3 menit membaca</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Ringkasan Pengerjaan & Estimasi (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-[22px]">receipt_long</span>
                <h2 className="text-lg font-bold text-slate-900">Ringkasan &amp; Biaya</h2>
              </div>
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                EST-40K
              </span>
            </div>

            {/* Estimated Time Finish Hero Card */}
            <div className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-3xl p-6 shadow-lg shadow-blue-500/20 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80 uppercase tracking-wider font-semibold">
                    Target Estimasi Siap
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">timer</span>
                    Tersisa ~45 Menit
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">14:30</span>
                  <span className="text-lg font-bold text-white/90">WIB</span>
                  <span className="text-xs text-white/80 ml-2">(Hari Ini)</span>
                </div>
                <p className="text-xs text-white/85 mt-2 leading-relaxed">
                  Pengerjaan tepat waktu tanpa kendala teknis tambahan. Notifikasi WhatsApp otomatis dikirim saat mobil masuk area cuci akhir.
                </p>
              </div>
            </div>

            {/* Live Cost Breakdown Ledger Card */}
            <div className="w-full bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex flex-col">
                  <span className="text-base font-bold text-slate-900">
                    Tagihan Berjalan (Live)
                  </span>
                  <span className="text-xs text-slate-400">
                    Update real-time suku cadang &amp; jasa bengkel
                  </span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>

              {/* Itemized Table / List */}
              <div className="flex flex-col gap-3 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">
                      Paket Servis Berkala 40.000 KM
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Jasa tune-up, kalibrasi sistem rem, scan engine
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-800 shrink-0">
                    Rp 450.000
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">
                      Oli Mesin Total Quartz 5W-30 (4L)
                    </span>
                    <span className="text-[11px] text-slate-400">
                      SKU: TOT-9000-5W30 • Full Synthetic OEM
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-800 shrink-0">
                    Rp 520.000
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">
                      Filter Udara OEM Honda Genuine
                    </span>
                    <span className="text-[11px] text-slate-400">
                      SKU: 17220-5AA-A00 (Penggantian Baru)
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-800 shrink-0">
                    Rp 145.000
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-emerald-800">
                        Diskon Member Gold (-10% Jasa)
                      </span>
                      <span className="text-[11px] text-emerald-700">
                        Hak istimewa akun loyalitas pelanggan
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-emerald-700 font-extrabold shrink-0">
                    -Rp 45.000
                  </span>
                </div>
              </div>

              {/* Total Calculation Box */}
              <div className="pt-4 mt-2 border-t border-slate-100 bg-slate-50/80 -mx-6 -mb-6 p-6 rounded-b-3xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-800">
                    Estimasi Total Saat Ini
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-blue-600 font-mono">
                    Rp 1.070.000
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Biaya transparan. Sudah termasuk garansi 1.000 KM atau 1 bulan.
                </p>

                {/* Action Buttons: Photo Proofs & Additional Parts Confirmation */}
                <div className="flex flex-col gap-2.5 mt-5">
                  <button
                    type="button"
                    onClick={() => setShowPhotoModal(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/80 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">photo_library</span>
                    <span>Lihat Bukti Foto Pengerjaan (3 Foto Baru)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirmModal(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-800 hover:bg-slate-100 border border-slate-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_task</span>
                    <span>Konfirmasi Tambahan Suku Cadang</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Workshop Assurance Micro-Card */}
            <div className="w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-600 text-[28px] shrink-0">verified_user</span>
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">
                  Garansi Pengerjaan Bengkel Ansor
                </span>
                <span className="text-xs text-slate-500">
                  Garansi servis 1.000 KM atau 1 bulan untuk kenyamanan berkendara keluarga Anda.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Bukti Foto Pengerjaan */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-[24px]">photo_library</span>
                <h3 className="text-lg font-bold text-slate-900">
                  Dokumentasi Foto Lapangan Pit 04
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="h-40 rounded-2xl bg-slate-800 overflow-hidden relative shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80"
                    alt="Pengecekan Throttle Body"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono">
                    09:42 WIB
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-800 mt-1">1. Pembersihan Throttle</span>
                <span className="text-[11px] text-slate-500">Kerak karbon dibersihkan</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="h-40 rounded-2xl bg-slate-800 overflow-hidden relative shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80"
                    alt="Kuras Minyak Rem"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono">
                    10:15 WIB
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-800 mt-1">2. Kuras Minyak Rem DOT4</span>
                <span className="text-[11px] text-slate-500">Bleeding 4 kaliper selesai</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="h-40 rounded-2xl bg-slate-800 overflow-hidden relative shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80"
                    alt="Filter Udara Baru"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono">
                    11:05 WIB
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-800 mt-1">3. Filter Udara Baru</span>
                <span className="text-[11px] text-slate-500">Original Genuine dipasang</span>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Tutup Dokumentasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Tambahan Suku Cadang */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-[24px]">verified</span>
                <h3 className="text-lg font-bold text-slate-900">
                  Persetujuan Komponen Tambahan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Saat inspeksi, mekanik Sugeng merekomendasikan penggantian Wiper Blade Depan Bosch Aerotwin (Karet sudah mengeras dan menggores kaca).
            </p>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs sm:text-sm text-slate-800 block">Wiper Blade Bosch Aerotwin (Set 2x)</span>
                <span className="text-[11px] text-slate-400">Garansi 6 Bulan • Rp 180.000</span>
              </div>
              <span className="font-mono font-bold text-sm text-blue-600">Rp 180.000</span>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Tolak / Nanti Saja
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Tambahan suku cadang berhasil disetujui! Mekanik akan memasangkannya.');
                  setShowConfirmModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Setujui Penggantian
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
