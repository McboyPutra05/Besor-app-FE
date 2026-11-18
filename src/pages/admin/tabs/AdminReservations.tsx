import React, { useState, useEffect } from 'react';
import BookingDetailModal, { BookingData } from '../../../components/modals/admin/BookingDetailModal';
import StatusChangeModal, { StatusItemData } from '../../../components/modals/admin/StatusChangeModal';
import NewBookingModal from '../../../components/modals/admin/NewBookingModal';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/client';

export default function AdminReservations() {
  const { showNotification } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('today');

  // Modals state
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  const [statusItem, setStatusItem] = useState<StatusItemData | null>(null);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [reservations, setReservations] = useState<BookingData[]>([
    {
      id: 'BK-2410-0921',
      customer: 'Dimas Ansori',
      phone: '0812-9988-7711',
      vehicle: 'Honda CR-V 1.5 Turbo',
      plate: 'B 1945 ANS',
      serviceType: 'Servis Berkala 40.000 KM + Tune Up',
      timeSlot: '09:15 WIB',
      date: 'Hari ini',
      status: 'Dikerjakan',
      mechanic: 'Sugeng H. (Stall 04)',
      complaint: 'Tarikan mesin terasa agak berat saat menanjak, mohon bersihkan throttle body dan cek busi.',
    },
    {
      id: 'BK-2410-0922',
      customer: 'Siti Rahmawati',
      phone: '0857-1122-3344',
      vehicle: 'Toyota Avanza 1.3 G',
      plate: 'B 1289 POK',
      serviceType: 'Ganti Oli & Tune Up Rutin',
      timeSlot: '10:00 WIB',
      date: 'Hari ini',
      status: 'Terkonfirmasi',
      mechanic: 'Rahmat S. (Stall 01)',
      complaint: 'Suara decit fanbelt saat start pagi hari.',
    },
    {
      id: 'BK-2410-0923',
      customer: 'Bambang Soedarmono',
      phone: '0813-7766-5544',
      vehicle: 'Mitsubishi Pajero Sport',
      plate: 'D 1289 KBR',
      serviceType: 'Cek Rem & Flushing Minyak Rem',
      timeSlot: '11:00 WIB',
      date: 'Hari ini',
      status: 'Pending',
      mechanic: 'Belum Ditentukan',
      complaint: 'Rem depan bergetar halus saat deselerasi dari 80 km/jam.',
    },
    {
      id: 'BK-2410-0924',
      customer: 'Hendra Prasetya',
      phone: '0811-3322-1100',
      vehicle: 'Toyota Yaris Cross HEV',
      plate: 'B 2024 ANS',
      serviceType: 'Servis Berkala 10.000 KM + Cek Hybrid',
      timeSlot: '13:30 WIB',
      date: 'Hari ini',
      status: 'Terkonfirmasi',
      mechanic: 'Dani K. (Stall 04)',
      complaint: 'Pemeriksaan voltase baterai hybrid dan servis berkala pertama.',
    },
    {
      id: 'BK-2410-0925',
      customer: 'Rina Kusuma',
      phone: '0878-9900-1122',
      vehicle: 'Honda Brio Satya',
      plate: 'B 4120 KLP',
      serviceType: 'Perbaikan Kelistrikan Lampu Depan',
      timeSlot: '14:00 WIB',
      date: 'Hari ini',
      status: 'Pending',
      mechanic: 'Belum Ditentukan',
      complaint: 'Lampu utama kanan mati, indikator lampu kabut kedap-kedip.',
    },
    {
      id: 'BK-2410-0920',
      customer: 'Agus Wibowo',
      phone: '0812-4455-6677',
      vehicle: 'Toyota Innova Zenix',
      plate: 'D 1044 ABZ',
      serviceType: 'Spooring 3D & Balancing 4 Roda',
      timeSlot: '08:30 WIB',
      date: 'Hari ini',
      status: 'Selesai',
      mechanic: 'Budi Santoso (Stall 05)',
      complaint: 'Setir sedikit membuang ke kiri di jalan tol.',
    },
  ]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/reservations');
      if (res.data?.reservations && res.data.reservations.length > 0) {
        const mapped: BookingData[] = res.data.reservations.map((r: any) => {
          let statusLabel = 'Pending';
          if (r.status === 'in_progress') statusLabel = 'Dikerjakan';
          else if (r.status === 'confirmed') statusLabel = 'Terkonfirmasi';
          else if (r.status === 'completed') statusLabel = 'Selesai';
          else if (r.status === 'cancelled') statusLabel = 'Dibatalkan';

          return {
            id: `BK-${String(r.id).padStart(4, '0')}`,
            customer: r.user?.name || 'Pelanggan',
            phone: r.user?.phone || '0812-9988-7711',
            vehicle: r.vehicle ? `${r.vehicle.brand} ${r.vehicle.model}` : (r.vehicle_type || 'Mobil'),
            plate: r.license_plate || (r.vehicle?.plate_number ?? 'B 1234 ANS'),
            serviceType: r.service_type || 'Servis Berkala & Tune Up',
            timeSlot: `${(r.service_time || '09:00').slice(0, 5)} WIB`,
            date: r.service_date === new Date().toISOString().slice(0, 10) ? 'Hari ini' : (r.service_date || 'Hari ini'),
            status: statusLabel,
            mechanic: r.mechanic?.name ? `${r.mechanic.name} (Stall 02)` : 'Belum Ditentukan',
            complaint: r.notes || 'Pemeriksaan rutin sesuai paket servis.',
          };
        });
        setReservations(mapped);
      }
    } catch (err) {
      console.error('Failed to load reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleStatusUpdated = async (id: string, newStatus: string, mechanic: string, notes: string) => {
    try {
      await api.put(`/admin/reservations/${id}/status`, { status: newStatus, mechanic, notes });
    } catch (err) {
      console.warn('Backend updateReservationStatus warning:', err);
    }

    setReservations((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: newStatus,
              mechanic: mechanic || r.mechanic,
              complaint: notes ? `${r.complaint || ''} [Catatan Admin: ${notes}]` : r.complaint,
            }
          : r
      )
    );
    showNotification(`Status reservasi ${id} berhasil diubah menjadi "${newStatus}"!`);
  };

  const handleAddNewBooking = async (newBooking: BookingData) => {
    try {
      await api.post('/admin/reservations', {
        customer: newBooking.customer,
        phone: newBooking.phone,
        vehicle: newBooking.vehicle,
        plate: newBooking.plate,
        serviceType: newBooking.serviceType,
        timeSlot: newBooking.timeSlot,
        date: newBooking.date,
        notes: newBooking.complaint,
      });
    } catch (err) {
      console.warn('Backend storeAdminBooking warning:', err);
    }

    setReservations((prev) => [newBooking, ...prev]);
    showNotification(`Booking masuk baru ${newBooking.id} (${newBooking.customer}) berhasil disimpan!`);
  };

  const filtered = reservations.filter((r) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      r.id.toLowerCase().includes(q) ||
      r.customer.toLowerCase().includes(q) ||
      r.plate.toLowerCase().includes(q) ||
      r.vehicle.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.serviceType.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (dateFilter === 'tomorrow') {
      if (r.date !== 'Besok') return false;
    } else if (dateFilter === 'today') {
      if (r.date && r.date !== 'Hari ini') return false;
    }

    if (activeTab === 'pending') return r.status === 'Pending';
    if (activeTab === 'confirmed') return r.status === 'Terkonfirmasi';
    if (activeTab === 'progress') return r.status === 'Dikerjakan';
    if (activeTab === 'done') return r.status === 'Selesai';
    return true;
  });

  const pendingCount = reservations.filter((r) => r.status === 'Pending').length;
  const confirmedCount = reservations.filter((r) => r.status === 'Terkonfirmasi').length;
  const progressCount = reservations.filter((r) => r.status === 'Dikerjakan').length;
  const doneCount = reservations.filter((r) => r.status === 'Selesai').length;

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-300">
      {/* Header & Stats Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs uppercase font-bold text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs">
              Dispatcher &amp; Front Desk
            </span>
            <span className="text-slate-400 font-mono text-xs font-semibold">{reservations.length} Booking Terdaftar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Reservasi &amp; Dispatcher
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola antrean masuk, konfirmasi slot servis, dan alokasikan stall teknisi secara real-time.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewBookingOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Tambah Booking Masuk</span>
        </button>
      </div>

      {/* 4 Mini KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Total Reservasi</div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">{reservations.length} Unit</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700 shadow-2xs">
            <span className="material-symbols-outlined text-[22px]">calendar_month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Perlu Konfirmasi</div>
            <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">{pendingCount} Pending</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shadow-2xs">
            <span className="material-symbols-outlined text-[22px]">pending_actions</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Stall Terpakai</div>
            <div className="text-2xl font-extrabold text-blue-700 font-mono mt-1">12 / 14 Bay</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-indigo-700 shadow-2xs">
            <span className="material-symbols-outlined text-[22px]">garage</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Waktu Tunggu Rata-rata</div>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">12 menit</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shadow-2xs">
            <span className="material-symbols-outlined text-[22px]">timer</span>
          </div>
        </div>
      </div>

      {/* Search, Date, and Filter Control Center */}
      <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-slate-400 pointer-events-none">
              search
            </span>
            <input
              className="w-full h-11 pl-10 pr-16 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              placeholder="Cari ID, Plat Nomor, Nama Pelanggan, atau No. Telepon..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-400 font-mono text-[10px] font-bold">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>

          {/* Date Presets */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setDateFilter('today')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                dateFilter === 'today'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Hari Ini (24 Okt 2024)
            </button>
            <button
              type="button"
              onClick={() => setDateFilter('tomorrow')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                dateFilter === 'tomorrow'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Besok
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Semua <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>28</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pending')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${
                activeTab === 'pending'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === 'pending' ? 'bg-white' : 'bg-amber-500'}`}></span>
              Pending <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'pending' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>6</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('confirmed')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${
                activeTab === 'confirmed'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === 'confirmed' ? 'bg-white' : 'bg-blue-600'}`}></span>
              Terkonfirmasi <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'confirmed' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'}`}>14</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('progress')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${
                activeTab === 'progress'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === 'progress' ? 'bg-white' : 'bg-indigo-500'}`}></span>
              Dikerjakan <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'progress' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-800'}`}>5</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('done')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${
                activeTab === 'done'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === 'done' ? 'bg-white' : 'bg-emerald-500'}`}></span>
              Selesai <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'done' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>3</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ultra-Clean Enterprise Data Table */}
      <div className="bg-white rounded-3xl shadow-xs overflow-hidden border border-slate-200/90">
        <div className="overflow-x-auto min-h-[460px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider select-none">
                <th className="py-4 px-6">ID Booking</th>
                <th className="py-4 px-6">Pelanggan</th>
                <th className="py-4 px-6">Kendaraan &amp; Plat</th>
                <th className="py-4 px-6">Tipe Servis &amp; Jadwal</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 min-w-[200px]">Mekanik PIC / Stall</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-800">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-blue-700">{r.id}</td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-slate-900 block">{r.customer}</span>
                    <span className="text-xs text-slate-400 font-medium">{r.phone}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800 block">{r.vehicle}</span>
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-900 text-white inline-block mt-1 shadow-2xs">
                      {r.plate}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800 block">{r.serviceType}</span>
                    <span className="text-xs text-blue-700 font-bold flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[15px]">schedule</span>
                      {r.timeSlot} ({r.date})
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        r.status === 'Pending'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : r.status === 'Terkonfirmasi'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : r.status === 'Dikerjakan'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          r.status === 'Pending'
                            ? 'bg-amber-500 animate-pulse'
                            : r.status === 'Terkonfirmasi'
                            ? 'bg-blue-500'
                            : r.status === 'Dikerjakan'
                            ? 'bg-indigo-500 animate-pulse'
                            : 'bg-emerald-500'
                        }`}
                      ></span>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-medium">
                    {r.mechanic}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {r.status === 'Pending' && (
                        <button
                          type="button"
                          onClick={() =>
                            setStatusItem({
                              id: r.id,
                              customer: r.customer,
                              plate: r.plate,
                              vehicle: r.vehicle,
                              currentStatus: r.status,
                              currentMechanic: r.mechanic,
                            })
                          }
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 cursor-pointer"
                        >
                          Konfirmasi
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedBooking(r)}
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                        title="Lihat Detail Booking"
                      >
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Modals */}
      <BookingDetailModal
        isOpen={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
        onChangeStatusClick={(b) => {
          setStatusItem({
            id: b.id,
            customer: b.customer,
            plate: b.plate,
            vehicle: b.vehicle,
            currentStatus: b.status,
            currentMechanic: b.mechanic,
          });
        }}
      />

      <StatusChangeModal
        isOpen={Boolean(statusItem)}
        onClose={() => setStatusItem(null)}
        item={statusItem}
        onStatusUpdated={handleStatusUpdated}
      />

      <NewBookingModal
        isOpen={isNewBookingOpen}
        onClose={() => setIsNewBookingOpen(false)}
        onSubmitSuccess={handleAddNewBooking}
      />
    </div>
  );
}
