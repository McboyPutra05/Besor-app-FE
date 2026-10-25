import React, { useState } from 'react';

export default function CustomerHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    showToast('Mengunduh Faktur Resmi', `Dokumen ${invoiceId}.pdf berhasil diproses untuk dicetak.`);
  };

  const handleExportPdf = () => {
    showToast('Mengekspor Ringkasan Servis', 'Menyiapkan berkas rangkuman riwayat servis berkala dalam format PDF.');
  };

  const allRecords = [
    {
      id: 1,
      date: '24 Okt 2024',
      time: '09:15 WIB',
      code: 'WO-2024-8942',
      mechanic: 'Bay 02 - Aris P.',
      vehicle: 'Honda CR-V',
      plate: 'B 1945 ANS',
      vehicleKey: 'crv',
      serviceTitle: 'Servis Berkala 40.000 KM + Tune Up & Flush Minyak Rem',
      parts: ['Oli Honda E-Pro 0W-20', 'Brake Fluid DOT 4', 'Busi Iridium x4'],
      cost: 'Rp 1.070.000',
      costNote: 'Estimasi Tagihan',
      status: 'Proses Pengerjaan',
      statusType: 'process',
      isFinalInvoice: false,
    },
    {
      id: 2,
      date: '15 Jul 2024',
      time: '14:02 WIB',
      code: 'INV-BKL-2024-0582',
      mechanic: 'Bay 04 - Dani K.',
      vehicle: 'Toyota Yaris Cross',
      plate: 'B 2024 ANS',
      vehicleKey: 'yaris',
      serviceTitle: 'Ganti Oli Mesin Sintetik + Filter Oli & Cek Baterai Hybrid',
      parts: ['TMO 0W-16 Hybrid', 'Filter Oli OEM Toyota', 'Scanner Diagnostic OBD-II'],
      cost: 'Rp 780.000',
      costNote: 'Lunas via QRIS',
      status: 'Selesai & Lunas',
      statusType: 'done',
      isFinalInvoice: true,
    },
    {
      id: 3,
      date: '04 Mei 2024',
      time: '11:30 WIB',
      code: 'INV-BKL-2024-0391',
      mechanic: 'Bay 01 - Rahmat S.',
      vehicle: 'Honda CR-V',
      plate: 'B 1945 ANS',
      vehicleKey: 'crv',
      serviceTitle: 'Spooring 3D & Balancing 4 Roda + Rotasi Ban',
      parts: ['Kalibrasi Sensor Kemudi', 'Timbal Balancing 40gr'],
      cost: 'Rp 350.000',
      costNote: 'Lunas Debit BCA',
      status: 'Selesai & Lunas',
      statusType: 'done',
      isFinalInvoice: true,
    },
    {
      id: 4,
      date: '12 Feb 2024',
      time: '16:15 WIB',
      code: 'INV-BKL-2024-0120',
      mechanic: 'Bay Roda 2 - Hendra',
      vehicle: 'Yamaha NMAX',
      plate: 'B 4821 KLO',
      vehicleKey: 'nmax',
      serviceTitle: 'Servis Injeksi, Ganti Vanbelt & Roller CVT',
      parts: ['V-Belt Kit Yamaha OEM', 'Roller Weight 11gr', 'Pembersih Throttle Body'],
      cost: 'Rp 425.000',
      costNote: 'Lunas Tunai',
      status: 'Selesai & Lunas',
      statusType: 'done',
      isFinalInvoice: true,
    },
    {
      id: 5,
      date: '18 Nov 2023',
      time: '10:45 WIB',
      code: 'INV-BKL-2023-0943',
      mechanic: 'Bay 02 - Aris P.',
      vehicle: 'Honda CR-V',
      plate: 'B 1945 ANS',
      vehicleKey: 'crv',
      serviceTitle: 'Ganti Kampas Rem Depan OEM & Bubut Rotor Cakram',
      parts: ['Kampas Nissin Honda Genuine', 'Resurface 2x Rotor Depan'],
      cost: 'Rp 1.450.000',
      costNote: 'Lunas Transfer Bank',
      status: 'Selesai & Lunas',
      statusType: 'done',
      isFinalInvoice: true,
    },
  ];

  const filteredRecords = allRecords.filter((rec) => {
    const matchesSearch =
      rec.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.plate.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVehicle = vehicleFilter === 'all' || rec.vehicleKey === vehicleFilter;
    return matchesSearch && matchesVehicle;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      <div className="flex flex-col w-full relative">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs uppercase tracking-wider text-blue-700 font-bold bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full shadow-2xs">
                Buku Servis Digital
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Auto-Sync POS Bay
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Riwayat Servis</h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl">
              Catatan riwayat perbaikan komprehensif, faktur resmi, dan histori suku cadang kendaraan Anda.
            </p>
          </div>

          {/* Quick Action Pill / Contact CS Hotline */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-xs border border-slate-200/90 self-start lg:self-auto">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-2xs">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div className="pr-2">
              <p className="text-[11px] uppercase font-bold text-slate-400">Garansi Resmi Toko</p>
              <p className="text-xs font-bold text-slate-800">100% Suku Cadang Orisinal</p>
            </div>
          </div>
        </div>

        {/* Metric Overview Cards (Visual Rhythm) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 relative overflow-hidden flex items-center justify-between hover:shadow-md transition-all">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Total Biaya Thn 2024
              </span>
              <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
                Rp 2.625.000
              </div>
              <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                <span className="material-symbols-outlined text-[14px] mr-1">trending_down</span>
                8.4% lebih hemat vs rata-rata
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center shadow-2xs">
              <span className="material-symbols-outlined text-[26px]">receipt_long</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 relative overflow-hidden flex items-center justify-between hover:shadow-md transition-all">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Skor Kepuasan Servis
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-slate-900 font-mono">5.0</span>
                <span className="text-xs text-slate-400 font-medium">/ 5.0</span>
              </div>
              <div className="flex items-center text-amber-500 gap-0.5">
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="text-xs text-slate-500 font-medium ml-1.5">(14 ulasan)</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shadow-2xs">
              <span className="material-symbols-outlined text-[26px]">stars</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 relative overflow-hidden flex items-center justify-between sm:col-span-2 lg:col-span-1 hover:shadow-md transition-all">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Jaminan Garansi Aktif
              </span>
              <div className="text-2xl font-extrabold text-emerald-700 font-mono tracking-tight">
                Hingga 6 Bulan
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Meliputi Transmisi, Rem &amp; Kelistrikan
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shadow-2xs">
              <span className="material-symbols-outlined text-[26px]">security</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar Container */}
        <div className="bg-white rounded-3xl shadow-xs border border-slate-200/90 p-4 mb-6">
          <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
            {/* Search Field */}
            <div className="relative flex-1 min-w-[280px]">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400 pointer-events-none">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </span>
              <input
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-xs sm:text-sm font-medium"
                placeholder="Cari Nomor WO, Faktur (INV-...), atau jenis perawatan..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Selectors & Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Dropdown Kendaraan */}
              <div className="relative min-w-[190px]">
                <select
                  className="w-full h-11 pl-3.5 pr-9 rounded-xl bg-slate-50 text-slate-800 text-xs sm:text-sm font-medium border border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none appearance-none cursor-pointer"
                  value={vehicleFilter}
                  onChange={(e) => setVehicleFilter(e.target.value)}
                >
                  <option value="all">Semua Kendaraan</option>
                  <option value="crv">Honda CR-V (B 1945 ANS)</option>
                  <option value="yaris">Toyota Yaris Cross (B 2024 ANS)</option>
                  <option value="nmax">Yamaha NMAX (B 4821 KLO)</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[18px]">
                  expand_more
                </span>
              </div>

              {/* Ekspor PDF Ringkasan Button */}
              <button
                type="button"
                onClick={handleExportPdf}
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-500/20 ml-auto xl:ml-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                <span>Ekspor PDF Ringkasan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Data Table Card Container */}
        <div className="bg-white rounded-3xl shadow-xs border border-slate-200/90 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-4 whitespace-nowrap">Tanggal Servis</th>
                  <th className="px-6 py-4 whitespace-nowrap">Nomor WO / Invoice</th>
                  <th className="px-6 py-4 whitespace-nowrap">Kendaraan &amp; Plat</th>
                  <th className="px-6 py-4">Jenis Servis &amp; Rincian Pengerjaan</th>
                  <th className="px-6 py-4 text-right whitespace-nowrap">Total Biaya</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-center whitespace-nowrap">Aksi Faktur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-800">
                {filteredRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      <div className="font-bold text-slate-900">{item.date}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      <div className="inline-flex items-center gap-1 font-mono text-xs text-blue-700 font-bold bg-blue-50 border border-blue-200/70 px-2.5 py-1 rounded-lg">
                        <span className="material-symbols-outlined text-[14px]">engineering</span>
                        <span>{item.code}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 font-medium">
                        Mekanik: {item.mechanic}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      <div className="font-bold text-slate-900">{item.vehicle}</div>
                      <div className="inline-block mt-1 font-mono text-[11px] font-bold px-2 py-0.5 bg-slate-900 text-white rounded-md shadow-2xs">
                        {item.plate}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top max-w-sm">
                      <div className="font-semibold text-slate-900 leading-snug">
                        {item.serviceTitle}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.parts.map((p, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[10px] text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md font-medium"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-top text-right">
                      <span className="font-mono text-sm font-extrabold text-slate-900">{item.cost}</span>
                      <div
                        className={`text-[11px] font-semibold mt-0.5 ${
                          item.statusType === 'process' ? 'text-amber-700' : 'text-emerald-700'
                        }`}
                      >
                        {item.costNote}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      {item.statusType === 'process' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                          {item.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          {item.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-top text-center">
                      {item.isFinalInvoice ? (
                        <button
                          type="button"
                          onClick={() => handleDownloadInvoice(item.code)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-400 text-blue-700 hover:bg-blue-50 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[17px] text-rose-600">picture_as_pdf</span>
                          <span>Unduh Invoice</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-medium cursor-not-allowed"
                          title="Faktur final terbit setelah servis selesai diinspeksi"
                        >
                          <span className="material-symbols-outlined text-[16px]">hourglass_empty</span>
                          <span>Invoice Sementara</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination Bar */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Menampilkan <span className="font-bold text-slate-800">1-{filteredRecords.length}</span> dari{' '}
              <span className="font-bold text-slate-800">{allRecords.length}</span> riwayat servis
            </div>
            <nav aria-label="Pagination" className="flex items-center gap-1.5">
              <button
                type="button"
                disabled
                className="h-8 px-3 rounded-lg border border-slate-200 bg-white text-slate-400 text-xs inline-flex items-center gap-1 opacity-50 cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                <span className="hidden sm:inline">Prev</span>
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs"
              >
                1
              </button>
              <button
                type="button"
                className="h-8 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Interactive Toast Notification Container */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
            <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-400 text-[22px]">cloud_download</span>
              <div>
                <p className="text-xs font-bold text-white">{toastMessage.title}</p>
                <p className="text-[11px] text-slate-400">{toastMessage.desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
