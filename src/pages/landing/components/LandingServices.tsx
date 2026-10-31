import React from 'react';

export default function LandingServices() {
  return (
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
  );
}
