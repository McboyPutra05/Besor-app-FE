import React from 'react';

interface LandingHeroProps {
  onOpenLogin: () => void;
  onScrollToSection: (id: string) => void;
}

export default function LandingHero({
  onOpenLogin,
  onScrollToSection,
}: LandingHeroProps) {
  return (
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
            <button
              type="button"
              onClick={onOpenLogin}
              className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-xl bg-primary-container text-on-primary font-bold text-sm shadow-lg shadow-primary-container/30 hover:bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              <span>Buat Reservasi Sekarang</span>
            </button>

            <button
              type="button"
              onClick={() => onScrollToSection('cara-kerja')}
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
  );
}
