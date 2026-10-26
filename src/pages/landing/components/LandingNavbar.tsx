import React from 'react';

interface LandingNavbarProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onScrollToSection: (id: string) => void;
}

export default function LandingNavbar({
  onOpenLogin,
  onOpenRegister,
  onScrollToSection,
}: LandingNavbarProps) {
  return (
    <>
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
              onClick={() => onScrollToSection('tracking')}
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
            onClick={() => onScrollToSection('home')}
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
              onClick={() => onScrollToSection('home')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Beranda
            </button>
            <button
              onClick={() => onScrollToSection('cara-kerja')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Cara Kerja
            </button>
            <button
              onClick={() => onScrollToSection('layanan')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Layanan Unggulan
            </button>
            <button
              onClick={() => onScrollToSection('tracking')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Lacak Servis
            </button>
            <button
              onClick={() => onScrollToSection('testimoni')}
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
    </>
  );
}
