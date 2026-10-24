import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

interface LandingPageProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onGoToDashboard: () => void;
}

// Hook for scroll-triggered animation
function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true); // Default visible to avoid blank pop-in, animation triggers smoothly

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: '150px 0px -40px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return { ref, isVisible };
}

export default function LandingPage({
  onOpenLogin,
  onOpenRegister,
  onGoToDashboard,
}: LandingPageProps) {
  // Quick Plate Tracker State
  const [trackPlate, setTrackPlate] = useState('B 1945 ANS');
  const [trackResult, setTrackResult] = useState<{
    plate: string;
    vehicle: string;
    bay: string;
    service: string;
    progress: number;
    stage: string;
    mechanic: string;
    eta: string;
  } | null>({
    plate: 'B 1945 ANS',
    vehicle: 'Honda CR-V 1.5 Turbo Prestige',
    bay: 'PIT-BAY-03 (Lift A)',
    service: 'Servis Berkala 40.000 KM & Tune Up',
    progress: 75,
    stage: 'Penggantian Kampas Rem & Flushing Minyak Rem',
    mechanic: 'Mas Budi Santoso (Foreman Tech)',
    eta: 'Hari ini, 14:30 WIB',
  });

  // Interactive Cara Kerja Step Simulator States
  // Step 1: Booking simulator
  const [selectedService, setSelectedService] = useState<'tuneup' | 'oli' | 'rem'>('tuneup');
  const [selectedDay, setSelectedDay] = useState<'today' | 'tomorrow' | 'weekend'>('today');

  // Step 2: Diagnostic Scan simulator
  const [scanRunning, setScanRunning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

  // Step 3: Approval simulator
  const [partApproved, setPartApproved] = useState<boolean | null>(true);

  // Step 4: Digital warranty tab
  const [activeWarrantyTab, setActiveWarrantyTab] = useState<'garansi' | 'invoice'>('garansi');

  const handleRunScan = () => {
    setScanRunning(true);
    setScanProgress(0);
    let curr = 0;
    const interval = setInterval(() => {
      curr += 20;
      setScanProgress(curr);
      if (curr >= 100) {
        clearInterval(interval);
        setScanRunning(false);
      }
    }, 250);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackPlate.trim()) return;
    setTrackResult({
      plate: trackPlate.toUpperCase(),
      vehicle: 'Unit Servis Terdaftar (Bengkel Ansor)',
      bay: 'PIT-BAY-02 (Lift B)',
      service: 'Servis Berkala & General Checkup',
      progress: 68,
      stage: 'Pembersihan Throttle Body & Kalibrasi ECU',
      mechanic: 'Sugeng H. (Senior Specialist)',
      eta: 'Hari ini, 15:15 WIB',
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll reveal hooks for each zigzag step
  const step1 = useScrollReveal();
  const step2 = useScrollReveal();
  const step3 = useScrollReveal();
  const step4 = useScrollReveal();

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-white">
      {/* Top Notification / Operational Status Banner */}
      <section className="w-full bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white py-2 px-6 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white">Live Bengkel:</span>
            <span className="text-slate-200">8 Bengkel Mitra Aktif • Kapasitas Stall Tersedia: 14 Bay Servis</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('tracking')}
              className="inline-flex items-center gap-1.5 font-semibold text-blue-300 hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">pin_drop</span>
              <span>Cek Lokasi Bay &amp; Lacak Antrean</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline font-mono">CS: 0812-3456-7890</span>
          </div>
        </div>
      </section>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-xs border-b border-outline-variant/30 transition-all">
        <div className="h-18 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-container to-blue-700 flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">car_repair</span>
            </div>
            <div>
              <span className="font-headline-sm text-base text-primary font-bold tracking-tight uppercase block leading-tight">
                Bengkel Ansor
              </span>
              <span className="text-[10px] text-secondary font-mono uppercase tracking-widest block font-semibold">
                Auto Service &amp; Tech
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-on-surface-variant">
            <button
              onClick={() => scrollToSection('home')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection('cara-kerja')}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Cara Kerja</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary-fixed text-on-primary-fixed-variant">
                Interaktif
              </span>
            </button>
            <button
              onClick={() => scrollToSection('layanan')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Layanan Unggulan
            </button>
            <button
              onClick={() => scrollToSection('tracking')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Lacak Servis
            </button>
            <button
              onClick={() => scrollToSection('testimoni')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Testimoni
            </button>
          </nav>

          {/* Auth Action Buttons: Register & Login (Always Neutral Marketing) */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenRegister}
              className="px-4 py-2.5 rounded-xl border border-outline-variant/60 bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[17px] text-secondary">person_add</span>
              <span>Daftar Akun</span>
            </button>

            <button
              type="button"
              onClick={onOpenLogin}
              className="px-4.5 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-bold text-xs shadow-md shadow-primary/25 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">login</span>
              <span>Masuk</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full bg-surface flex-1" id="home">
        {/* HERO SECTION */}
        <section className="relative w-full py-16 md:py-24 px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-surface via-surface-container-low/40 to-surface">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2.5 bg-surface-container-low px-3.5 py-1.5 rounded-full shadow-2xs border border-outline-variant/40">
                <div className="flex items-center text-amber-500">
                  <span className="material-symbols-outlined text-[18px]">star</span>
                  <span className="material-symbols-outlined text-[18px]">star</span>
                  <span className="material-symbols-outlined text-[18px]">star</span>
                  <span className="material-symbols-outlined text-[18px]">star</span>
                  <span className="material-symbols-outlined text-[18px]">star_half</span>
                </div>
                <span className="text-xs text-on-surface font-bold">4.9/5</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                <span className="text-xs text-on-surface-variant font-medium">
                  3.800+ Pemilik Kendaraan di Jabodetabek
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-[1.15]">
                Servis Kendaraan Tanpa Antri, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">
                  Pantau Real-Time dari HP Anda.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Standar baru perawatan kendaraan keluarga dan armada fleet. Transparansi biaya di awal, live foto pengerjaan di stall, persetujuan suku cadang via HP, dan garansi resmi 6 bulan.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
                {/* Button Buat Reservasi: Arahkan ke Login */}
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-xl bg-primary-container text-on-primary font-bold text-sm shadow-lg shadow-primary-container/30 hover:bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  <span>Buat Reservasi Sekarang</span>
                </button>

                {/* Button Cara Kerja: Smooth Scroll ke #cara-kerja */}
                <button
                  type="button"
                  onClick={() => scrollToSection('cara-kerja')}
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-sm shadow-xs hover:bg-surface-container transition-all border border-outline-variant/60 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">play_circle</span>
                  <span>Lihat Cara Kerja</span>
                </button>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-6 w-full max-w-lg border-t border-outline-variant/30">
                <div>
                  <div className="text-2xl font-extrabold text-on-surface">30 Mnt</div>
                  <div className="text-xs text-on-surface-variant">Rata-rata Quick Check</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-on-surface">100%</div>
                  <div className="text-xs text-on-surface-variant">Suku Cadang Asli</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-on-surface">6 Bulan</div>
                  <div className="text-xs text-on-surface-variant">Garansi Servis Resmi</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Workshop Telemetry Card */}
            <div className="lg:col-span-5 relative w-full">
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Master Dashboard Card */}
              <div className="relative bg-surface-container-lowest rounded-2xl shadow-xl p-6 flex flex-col gap-5 border border-outline-variant/40">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 bg-surface-container-low -mx-6 -mt-6 p-4 rounded-t-2xl border-b border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-error"></span>
                    <span className="inline-block w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="inline-block w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="ml-2 font-mono text-xs font-bold text-on-surface-variant">
                      BAY-04 / LIFT HYDRAULIC
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                    Live Di Bengkel
                  </span>
                </div>

                {/* Vehicle Information */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-on-surface">Honda CR-V 1.5 Turbo</h3>
                    <p className="text-xs text-on-surface-variant">Servis Berkala 40.000 KM</p>
                  </div>
                  <div className="bg-surface-container-high px-3 py-1.5 rounded-lg font-mono text-xs text-on-surface tracking-wider font-bold border border-outline-variant/30">
                    B 1945 ANS
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant">
                      Tahap: <strong className="text-on-surface font-semibold">Pengerjaan Mesin &amp; Tune-up</strong>
                    </span>
                    <span className="font-bold text-primary font-mono">75% Selesai</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                    <div className="bg-primary-container h-full rounded-full w-[75%] transition-all duration-500"></div>
                  </div>
                </div>

                {/* Step Progression */}
                <div className="grid grid-cols-4 gap-2 pt-1 text-center text-xs">
                  <div className="flex flex-col items-center gap-1">
                    <span className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-[10px]">
                      ✓
                    </span>
                    <span className="text-on-surface font-medium text-[10px]">Check-in</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-[10px]">
                      ✓
                    </span>
                    <span className="text-on-surface font-medium text-[10px]">Diagnosa</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-[10px]">
                      3
                    </span>
                    <span className="text-primary font-bold text-[10px]">Pengerjaan</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold text-[10px]">
                      4
                    </span>
                    <span className="text-on-surface-variant text-[10px]">QC &amp; Cuci</span>
                  </div>
                </div>

                {/* Assigned Mechanic */}
                <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                      BS
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface">Mas Budi Santoso</div>
                      <div className="text-[11px] text-on-surface-variant">Master Tech • Pit Bay 04</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-bold text-tertiary">EST. 14:30 WIB</div>
                    <div className="text-[10px] text-on-surface-variant">Target Tepat Waktu</div>
                  </div>
                </div>

                {/* Verified Part Component */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                    <div>
                      <div className="text-xs font-bold text-on-surface">Oli Honda E-Pro Gold 0W-20</div>
                      <div className="font-mono text-[10px] text-on-surface-variant">Barcode: 08232-P99-K4LNJ (Original)</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Terpasang
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CARA KERJA (INTERACTIVE ZIGZAG WITH SCROLL ANIMATIONS) */}
        <section
          className="w-full py-20 px-6 lg:px-12 bg-surface-container-low border-y border-outline-variant/30 scroll-mt-16"
          id="cara-kerja"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-mono text-xs font-bold uppercase tracking-wider">
                Alur Transparan 4 Langkah
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Bagaimana Bengkel Ansor Bekerja untuk Anda
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant max-w-xl">
                Alur cerdas yang menghilangkan rasa khawatir. Pantau setiap tahapan servis secara interaktif langsung dari genggaman Anda.
              </p>

              {/* Quick Interactive Step Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => step1.ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-surface-container-lowest border border-outline-variant/40 hover:border-primary text-on-surface shadow-2xs hover:bg-surface-container cursor-pointer transition flex items-center gap-1.5"
                >
                  <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Booking Online</span>
                </button>
                <button
                  type="button"
                  onClick={() => step2.ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-surface-container-lowest border border-outline-variant/40 hover:border-primary text-on-surface shadow-2xs hover:bg-surface-container cursor-pointer transition flex items-center gap-1.5"
                >
                  <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Diagnosa Scanner</span>
                </button>
                <button
                  type="button"
                  onClick={() => step3.ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-surface-container-lowest border border-outline-variant/40 hover:border-primary text-on-surface shadow-2xs hover:bg-surface-container cursor-pointer transition flex items-center gap-1.5"
                >
                  <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Persetujuan Part</span>
                </button>
                <button
                  type="button"
                  onClick={() => step4.ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-surface-container-lowest border border-outline-variant/40 hover:border-primary text-on-surface shadow-2xs hover:bg-surface-container cursor-pointer transition flex items-center gap-1.5"
                >
                  <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">4</span>
                  <span>QC &amp; Garansi</span>
                </button>
              </div>
            </div>

            {/* Zigzag Timeline Container */}
            <div className="relative flex flex-col gap-16 sm:gap-24">
              {/* Vertical Guide Line */}
              <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary via-blue-400 to-tertiary -translate-x-1/2 opacity-30"></div>

              {/* STEP 1 (ZIG: Text Left, Interactive Visual Right) */}
              <div
                id="step-1"
                ref={step1.ref}
                className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-700 transform ${
                  step1.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Center Node Marker on lg screens */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-primary text-white font-bold text-xs items-center justify-center shadow-md shadow-primary/30 ring-4 ring-surface-container-low z-10">
                  1
                </div>
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[11px]">
                      1
                    </span>
                    Langkah Pertama
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                    Pilih Jadwal &amp; Paket Servis Secara Online
                  </h3>
                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    Tanpa perlu antri pagi atau menunggu telepon yang tak kunjung dijawab. Pilih hari, jam kedatangan, dan tipe kebutuhan kendaraan Anda dalam hitungan detik.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-on-surface">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                      <span>Konfirmasi kuota pit bay instan tanpa tumpang tindih antrean</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                      <span>Estimasi biaya awal transparan sebelum datang ke bengkel</span>
                    </li>
                  </ul>
                </div>

                {/* Interactive Simulator Card 1 */}
                <div className="lg:col-span-6">
                  <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-md border border-outline-variant/40 space-y-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                        Simulasi Booking Cepat
                      </span>
                      <span className="text-xs font-mono text-primary font-semibold">Coba Klik di Bawah:</span>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-on-surface-variant block mb-1.5">
                        Pilih Hari Kedatangan:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedDay('today')}
                          className={`py-2 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                            selectedDay === 'today'
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          Hari Ini (14:00)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedDay('tomorrow')}
                          className={`py-2 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                            selectedDay === 'tomorrow'
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          Besok Pagi (09:00)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedDay('weekend')}
                          className={`py-2 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                            selectedDay === 'weekend'
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          Sabtu Ceria (10:30)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-on-surface-variant block mb-1.5">
                        Pilih Kebutuhan Servis:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedService('tuneup')}
                          className={`p-2.5 rounded-lg text-left text-xs cursor-pointer border transition-all ${
                            selectedService === 'tuneup'
                              ? 'border-primary bg-primary-fixed/20 font-bold'
                              : 'border-outline-variant/40 bg-surface-container-low'
                          }`}
                        >
                          <div className="font-bold">Tune-Up Injeksi</div>
                          <div className="text-[10px] text-secondary">Rp 350.000</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedService('oli')}
                          className={`p-2.5 rounded-lg text-left text-xs cursor-pointer border transition-all ${
                            selectedService === 'oli'
                              ? 'border-primary bg-primary-fixed/20 font-bold'
                              : 'border-outline-variant/40 bg-surface-container-low'
                          }`}
                        >
                          <div className="font-bold">Ganti Oli Sintetik</div>
                          <div className="text-[10px] text-secondary">Rp 420.000</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedService('rem')}
                          className={`p-2.5 rounded-lg text-left text-xs cursor-pointer border transition-all ${
                            selectedService === 'rem'
                              ? 'border-primary bg-primary-fixed/20 font-bold'
                              : 'border-outline-variant/40 bg-surface-container-low'
                          }`}
                        >
                          <div className="font-bold">Servis Rem 4 Roda</div>
                          <div className="text-[10px] text-secondary">Rp 280.000</div>
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-lg">event_available</span>
                        <span>Stall Tersedia: <strong>Pit 03 (Bay Utama)</strong></span>
                      </div>
                      <span className="font-bold font-mono">Slot Terkunci</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2 (ZAG: Interactive Visual Left, Text Right) */}
              <div
                id="step-2"
                ref={step2.ref}
                className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-700 transform ${
                  step2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Center Node Marker on lg screens */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs items-center justify-center shadow-md shadow-blue-600/30 ring-4 ring-surface-container-low z-10">
                  2
                </div>
                {/* Visual Left */}
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-md border border-outline-variant/40 space-y-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xl">sensors</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-on-surface">
                          OBD-II ECU Digital Telemetry
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRunScan}
                        disabled={scanRunning}
                        className="px-2.5 py-1 rounded bg-primary-container text-white text-[11px] font-bold hover:bg-primary transition cursor-pointer disabled:opacity-50"
                      >
                        {scanRunning ? 'Scanning...' : '↻ Ulangi Scan'}
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-on-surface-variant">Status Diagnosa Scanner:</span>
                        <span className="font-mono font-bold text-primary">{scanProgress}% Lengkap</span>
                      </div>
                      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full transition-all duration-300"
                          style={{ width: `${scanProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30">
                        <span className="text-[10px] text-secondary uppercase block">Sensor Oksigen &amp; Mesin</span>
                        <span className="font-bold text-emerald-600 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 100% Normal
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30">
                        <span className="text-[10px] text-secondary uppercase block">Tegangan Aki &amp; Alternator</span>
                        <span className="font-bold text-emerald-600 font-mono">12.6V (Optimal)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30">
                        <span className="text-[10px] text-secondary uppercase block">Kondisi Kampas Rem Depan</span>
                        <span className="font-bold text-amber-600">Ketebalan: 3.5mm (Perlu Cek)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30">
                        <span className="text-[10px] text-secondary uppercase block">Suhu Pendingin Radiator</span>
                        <span className="font-bold text-emerald-600 font-mono">88°C (Normal)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Right */}
                <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[11px]">
                      2
                    </span>
                    Langkah Kedua
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                    Check-in Cepat &amp; Diagnosa Scanner Pabrikan
                  </h3>
                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    Kendaraan Anda disambut langsung oleh Foreman untuk inspeksi awal. Kami menggunakan komputer scanner OBD-II generasi terbaru untuk mendeteksi kelainan parameter hingga tingkat sensor terkecil.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-on-surface">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                      <span>Pemeriksaan 50 titik kritis (rem, kaki-kaki, aki, fluida, kelistrikan)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                      <span>Laporan kondisi kendaraan digital langsung terhubung ke dashboard Anda</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* STEP 3 (ZIG: Text Left, Interactive Visual Right) */}
              <div
                id="step-3"
                ref={step3.ref}
                className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-700 transform ${
                  step3.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Center Node Marker on lg screens */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-xs items-center justify-center shadow-md shadow-indigo-600/30 ring-4 ring-surface-container-low z-10">
                  3
                </div>
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[11px]">
                      3
                    </span>
                    Langkah Ketiga
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                    Pantau Progres Live &amp; Persetujuan Part via HP
                  </h3>
                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    Tidak ada lagi cerita part diganti diam-diam tanpa izin. Jika mekanik menemukan komponen aus, Anda menerima foto bukti fisik dan rincian harga asli untuk disetujui dengan 1 ketukan.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-on-surface">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                      <span>Foto perbandingan part lama aus vs part baru tersegel</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                      <span>Persetujuan transparan via WhatsApp Gateway dan portal pelanggan</span>
                    </li>
                  </ul>
                </div>

                {/* Interactive Simulator Card 3 */}
                <div className="lg:col-span-6">
                  <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-md border border-outline-variant/40 space-y-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                        Simulasi Persetujuan Suku Cadang
                      </span>
                      <span className="text-[11px] font-mono text-emerald-600 font-bold">
                        WhatsApp Verified
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs font-bold text-amber-900">Rekomendasi Tambahan Mekanik:</div>
                          <div className="text-xs text-amber-800 font-medium">Brake Pad Depan Honda Genuine (06455-TG1-T01)</div>
                        </div>
                        <span className="text-xs font-bold font-mono text-amber-900">Rp 480.000</span>
                      </div>
                      <p className="text-[11px] text-amber-800/90 leading-relaxed">
                        “Kampas rem depan tersisa 2.5mm dan sudah ada alur gesekan pada disc rotor. Direkomendasikan ganti demi keselamatan pengereman.”
                      </p>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setPartApproved(false)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition cursor-pointer ${
                          partApproved === false
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : 'bg-surface-container-low text-on-surface hover:bg-surface-container border-outline-variant/40'
                        }`}
                      >
                        ✕ Tolak / Tunda
                      </button>
                      <button
                        type="button"
                        onClick={() => setPartApproved(true)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition cursor-pointer ${
                          partApproved === true
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-surface-container-low text-on-surface hover:bg-surface-container border-outline-variant/40'
                        }`}
                      >
                        ✓ Setujui Penggantian
                      </button>
                    </div>

                    <div className="p-2.5 rounded-lg bg-surface-container-low text-center text-xs">
                      Status Anda:{' '}
                      <strong className={partApproved ? 'text-emerald-700' : 'text-rose-700'}>
                        {partApproved ? 'Disetujui Pelanggan • Teknisi Memulai Pemasangan' : 'Ditunda Pelanggan • Tidak Ada Biaya Tambahan'}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 4 (ZAG: Interactive Visual Left, Text Right) */}
              <div
                id="step-4"
                ref={step4.ref}
                className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-700 transform ${
                  step4.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Center Node Marker on lg screens */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-emerald-600 text-white font-bold text-xs items-center justify-center shadow-md shadow-emerald-600/30 ring-4 ring-surface-container-low z-10">
                  4
                </div>
                {/* Visual Left */}
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-md border border-outline-variant/40 space-y-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveWarrantyTab('garansi')}
                          className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${
                            activeWarrantyTab === 'garansi'
                              ? 'bg-primary text-white'
                              : 'bg-surface-container-low text-on-surface'
                          }`}
                        >
                          Sertifikat Garansi
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveWarrantyTab('invoice')}
                          className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${
                            activeWarrantyTab === 'invoice'
                              ? 'bg-primary text-white'
                              : 'bg-surface-container-low text-on-surface'
                          }`}
                        >
                          E-Invoice PDF
                        </button>
                      </div>
                      <span className="font-mono text-xs text-emerald-600 font-bold">Terverifikasi</span>
                    </div>

                    {activeWarrantyTab === 'garansi' ? (
                      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] text-blue-300 font-mono uppercase block">Sertifikat Resmi</span>
                            <span className="text-sm font-bold block">Garansi Servis &amp; Part 6 Bulan</span>
                          </div>
                          <span className="material-symbols-outlined text-amber-400 text-2xl">verified_user</span>
                        </div>
                        <div className="border-t border-white/10 pt-2 flex justify-between text-xs text-slate-300">
                          <div>
                            <span className="block text-[10px]">Nomor Garansi:</span>
                            <span className="font-mono text-white font-bold">WRN-ANS-88219</span>
                          </div>
                          <div className="text-right">
                            <span className="block text-[10px]">Masa Berlaku:</span>
                            <span className="font-mono text-emerald-400 font-bold">Hingga 24 April 2027</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2 text-xs">
                        <div className="flex justify-between font-bold">
                          <span>Total Tagihan POS:</span>
                          <span className="text-primary font-mono text-sm">Rp 1.070.000</span>
                        </div>
                        <div className="text-secondary text-[11px]">Metode: QRIS / Transfer Bank Terverifikasi</div>
                        <div className="pt-2 border-t border-outline-variant/30 flex justify-between items-center">
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span> LUNAS
                          </span>
                          <span className="font-mono text-secondary text-[10px]">INV-2026-00892</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
                      <span>Buku servis digital tersimpan aman selamanya di garasi Anda</span>
                      <span className="material-symbols-outlined text-primary text-base">cloud_done</span>
                    </div>
                  </div>
                </div>

                {/* Text Right */}
                <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[11px]">
                      4
                    </span>
                    Langkah Keempat
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                    QC Akhir, Cuci Kendaraan, &amp; Buku Garansi Digital
                  </h3>
                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    Sebelum handover, kendaraan diuji oleh Kepala Bengkel (Foreman) dan dicuci bersih. Buku servis digital, e-invoice resmi, serta sertifikat garansi otomatis tersimpan di akun Anda untuk melindungi nilai jual kembali mobil.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-on-surface">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                      <span>Quality Control berlapis dengan checklist standar manufaktur</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                      <span>Riwayat servis rapi yang mendongkrak harga purna jual kendaraan</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CORE SERVICES */}
        <section className="w-full py-20 px-6 lg:px-12 bg-surface scroll-mt-16" id="layanan">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-3">
              <span className="px-3 py-1 rounded-full bg-surface-container font-mono text-xs font-bold text-primary tracking-wider uppercase">
                Layanan &amp; Fasilitas
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Solusi Lengkap untuk Segala Masalah Mobil Anda
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant">
                Ditangani mekanik berpengalaman bersertifikasi dengan alat canggih dan garansi penuh.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col gap-4 border border-outline-variant/40 shadow-xs hover:shadow-md hover:border-primary/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[26px]">car_repair</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface">Servis Berkala &amp; Tune-Up</h3>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Pembersihan injector, kalibrasi throttle body, penggantian oli mesin sintetik, dan pengecekan kelistrikan 50 titik.
                  </p>
                </div>
                <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center text-xs">
                  <span className="font-mono font-bold text-primary">Mulai Rp 350.000</span>
                  <span className="text-secondary font-medium">Est. 60-90 Mnt</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col gap-4 border border-outline-variant/40 shadow-xs hover:shadow-md hover:border-primary/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[26px]">adjust</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface">Pengereman &amp; Kaki-kaki</h3>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Penggantian brake pad, bubut piringan rotor disc, perbaikan tierod/balljoint, dan penggantian shockbreaker.
                  </p>
                </div>
                <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center text-xs">
                  <span className="font-mono font-bold text-primary">Mulai Rp 280.000</span>
                  <span className="text-secondary font-medium">Garansi 6 Bulan</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col gap-4 border border-outline-variant/40 shadow-xs hover:shadow-md hover:border-primary/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[26px]">ac_unit</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface">AC &amp; Kelistrikan Mobil</h3>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Flushing freon, ganti filter kabin karbon aktif, kuras oli kompresor, dan scan sensor blower digital.
                  </p>
                </div>
                <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center text-xs">
                  <span className="font-mono font-bold text-primary">Mulai Rp 250.000</span>
                  <span className="text-secondary font-medium">Dingin Maksimal</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: TRACK VEHICLE (PELAT NOMOR) */}
        <section
          className="w-full py-16 px-6 lg:px-12 bg-surface-container-low border-t border-outline-variant/30 scroll-mt-16"
          id="tracking"
        >
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <div className="text-center space-y-2">
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-wider bg-surface-container px-3 py-1 rounded-full">
                Live Workshop Telemetry
              </span>
              <h2 className="text-3xl font-extrabold text-on-surface">Lacak Progres Kendaraan Anda di Bengkel</h2>
              <p className="text-sm text-on-surface-variant max-w-xl mx-auto">
                Ketik nomor pelat polisi kendaraan Anda untuk memeriksa status pengerjaan stall, mekanik PIC, dan estimasi waktu selesai.
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto w-full">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[20px]">
                  directions_car
                </span>
                <input
                  type="text"
                  placeholder="Contoh: B 1945 ANS..."
                  value={trackPlate}
                  onChange={(e) => setTrackPlate(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-surface-container-lowest border border-outline-variant/40 rounded-xl font-mono text-base font-bold text-on-surface uppercase focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
                />
              </div>
              <button
                type="submit"
                className="h-12 px-6 bg-primary-container hover:bg-primary text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-primary/20"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span>Lacak Unit</span>
              </button>
            </form>

            {trackResult && (
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-md border border-outline-variant/30 space-y-4 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-3 py-1 bg-surface-container-high rounded-md font-bold">
                      {trackResult.plate}
                    </span>
                    <div>
                      <h4 className="font-bold text-on-surface text-sm sm:text-base">{trackResult.vehicle}</h4>
                      <span className="text-xs text-on-surface-variant">{trackResult.service}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-primary font-bold bg-primary-fixed/40 px-2.5 py-1 rounded w-fit">
                    {trackResult.bay}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-on-surface-variant">Tahap: {trackResult.stage}</span>
                    <span className="text-primary font-mono">{trackResult.progress}% Selesai</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                    <div
                      className="h-full bg-primary-container rounded-full"
                      style={{ width: `${trackResult.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-surface-container-low p-3.5 rounded-xl">
                  <div>
                    <span className="text-on-surface-variant block">Mekanik PIC:</span>
                    <span className="font-bold text-on-surface">{trackResult.mechanic}</span>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-on-surface-variant block">Target Selesai:</span>
                    <span className="font-bold text-tertiary font-mono">{trackResult.eta}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION: TESTIMONIALS */}
        <section className="w-full py-20 px-6 lg:px-12 bg-surface scroll-mt-16" id="testimoni">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
                Ulasan Pelanggan
              </span>
              <h2 className="text-3xl font-extrabold text-on-surface">Dipercaya Ribuan Pemilik Kendaraan</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-2xs space-y-4">
                <div className="flex text-amber-500">
                  <span className="material-symbols-outlined text-lg">star</span>
                  <span className="material-symbols-outlined text-lg">star</span>
                  <span className="material-symbols-outlined text-lg">star</span>
                  <span className="material-symbols-outlined text-lg">star</span>
                  <span className="material-symbols-outlined text-lg">star</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  “Transparansi servisnya luar biasa. Setiap part yang perlu diganti dikirim foto fisiknya via WhatsApp lengkap dengan harga sebelum dipasang. Gak ada getok harga!”
                </p>
                <div className="pt-2 border-t border-outline-variant/20 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    HP
                  </div>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Ir. Hendra Prasetya</div>
                    <div className="text-[10px] text-secondary">Honda CR-V • Pelanggan sejak 2021</div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-2xs space-y-4">
                <div className="flex text-amber-500">
                  <span className="material-symbols-outlined text-lg">star</span>
                  <span className="material-symbols-outlined text-lg">star</span>
                  <span className="material-symbols-outlined text-lg">star</span>
                  <span className="material-symbols-outlined text-lg">star</span>
                  <span className="material-symbols-outlined text-lg">star</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  “Sangat terbantu bisa booking online malam hari, besok pagi datang mobil langsung naik lift bay tanpa antri. Waktu selesai sesuai estimasi di dashboard.”
                </p>
                <div className="pt-2 border-t border-outline-variant/20 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                    DA
                  </div>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Dimas Ansori</div>
                    <div className="text-[10px] text-secondary">Toyota Yaris Cross • Member Gold</div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-2xs space-y-4">
                <div className="flex text-amber-500">
                  <span className="material-symbols-outlined text-lg">star</span>
                  <span className="material-symbols-outlined text-lg">star</span>
                  <span className="material-symbols-outlined text-lg">star</span>
                  <span className="material-symbols-outlined text-lg">star</span>
                  <span className="material-symbols-outlined text-lg">star</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  “Manajemen fleet armada kantor jadi rapi. Semua invoice dan riwayat kilometer tersimpan rapi dalam format PDF terverifikasi. Sangat recommended!”
                </p>
                <div className="pt-2 border-t border-outline-variant/20 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    RN
                  </div>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Rian Nugroho</div>
                    <div className="text-[10px] text-secondary">Fleet Manager • Armada Logistik</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-950 text-white border-t border-slate-800 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-lg">car_repair</span>
            </div>
            <div>
              <span className="font-bold text-white text-sm block">Bengkel Ansor</span>
              <span>Solusi Digital Perawatan Kendaraan Keluarga</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => scrollToSection('home')} className="hover:text-white transition">Beranda</button>
            <button onClick={() => scrollToSection('cara-kerja')} className="hover:text-white transition">Cara Kerja</button>
            <button onClick={() => scrollToSection('layanan')} className="hover:text-white transition">Layanan</button>
            <button onClick={() => scrollToSection('tracking')} className="hover:text-white transition">Lacak Unit</button>
          </div>
          <div>© 2026 Bengkel Ansor. Seluruh hak cipta dilindungi.</div>
        </div>
      </footer>
    </div>
  );
}
