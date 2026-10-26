import React, { useState, useEffect, useRef } from 'react';

// Hook for scroll-triggered animation (pure smooth fade in / out)
function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '40px 0px 40px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return { ref, isVisible };
}

export default function LandingHowItWorks() {
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

  // Scroll reveal hooks for each zigzag step
  const step1 = useScrollReveal();
  const step2 = useScrollReveal();
  const step3 = useScrollReveal();
  const step4 = useScrollReveal();

  return (
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
            className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-opacity duration-700 ease-in-out ${
              step1.isVisible ? 'opacity-100' : 'opacity-0'
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

                <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600">event_available</span>
                    <span className="text-on-surface">Estimasi Waktu Tunggu: <strong>0 Menit</strong></span>
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
            className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-opacity duration-700 ease-in-out ${
              step2.isVisible ? 'opacity-100' : 'opacity-0'
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
            className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-opacity duration-700 ease-in-out ${
              step3.isVisible ? 'opacity-100' : 'opacity-0'
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

                <div className="p-3.5 bg-surface-container-low rounded-xl space-y-2 border border-outline-variant/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-error font-bold uppercase tracking-wider block">
                        Temuan Inspeksi Mekanik
                      </span>
                      <h4 className="text-xs font-bold text-on-surface">Kampas Rem Depan (Brake Pad) Tipis</h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-on-surface">Rp 340.000</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    Ketebalan tersisa 1.8mm (batas aman 3.0mm). Rekomendasi ganti demi keselamatan pengereman.
                  </p>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setPartApproved(true)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
                        partApproved === true
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">check</span>
                      <span>Setujui Ganti</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPartApproved(false)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
                        partApproved === false
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">close</span>
                      <span>Tunda Dulu</span>
                    </button>
                  </div>
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
            className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-opacity duration-700 ease-in-out ${
              step4.isVisible ? 'opacity-100' : 'opacity-0'
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
  );
}
