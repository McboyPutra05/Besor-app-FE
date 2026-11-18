import React, { useState, useEffect } from 'react';
import AdminVehicleDetailModal, { VehicleData } from '../../../components/modals/admin/AdminVehicleDetailModal';
import NewVehicleModal from '../../../components/modals/admin/NewVehicleModal';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/client';

export default function AdminVehicles() {
  const { showNotification } = useAuth();
  const [search, setSearch] = useState('');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');

  // Modals state
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(null);
  const [isNewVehicleOpen, setIsNewVehicleOpen] = useState(false);

  const [vehicles, setVehicles] = useState([
    {
      id: 'VH-001',
      brand: 'Honda',
      model: 'CR-V 1.5 Turbo Prestige',
      year: 2022,
      plate: 'B 1945 ANS',
      owner: 'Dimas Ansori',
      phone: '0812-9988-7711',
      vin: 'MHRCRV2022J098234',
      engine: 'L15B7-8891024',
      odometer: '42.150 KM',
      lastService: 'Hari Ini (Active)',
      status: 'Sedang Servis',
      type: 'mobil',
    },
    {
      id: 'VH-002',
      brand: 'Toyota',
      model: 'Yaris Cross HEV Platinum',
      year: 2023,
      plate: 'B 2024 ANS',
      owner: 'Ir. Hendra Prasetya',
      phone: '0811-3322-1100',
      vin: 'MHKYARIS2023H10293',
      engine: '2NR-VEX-449102',
      odometer: '12.800 KM',
      lastService: '15 Jul 2024',
      status: 'Siap Jalan',
      type: 'mobil',
    },
    {
      id: 'VH-003',
      brand: 'Mitsubishi',
      model: 'Pajero Sport Dakar 4x4',
      year: 2021,
      plate: 'D 1289 KBR',
      owner: 'Bambang Soedarmono',
      phone: '0813-7766-5544',
      vin: 'MMBPJR2021K882910',
      engine: '4N15-9921043',
      odometer: '68.400 KM',
      lastService: 'Hari Ini (Active)',
      status: 'Sedang Servis',
      type: 'mobil',
    },
    {
      id: 'VH-004',
      brand: 'Toyota',
      model: 'Avanza 1.3 G M/T',
      year: 2020,
      plate: 'B 1289 POK',
      owner: 'Siti Rahmawati',
      phone: '0857-1122-3344',
      vin: 'MHKAVZ2020D332194',
      engine: '1NR-VE-112948',
      odometer: '54.200 KM',
      lastService: '04 Mei 2024',
      status: 'Siap Jalan',
      type: 'mobil',
    },
    {
      id: 'VH-005',
      brand: 'Yamaha',
      model: 'NMAX 155 Connected ABS',
      year: 2021,
      plate: 'B 4821 KLO',
      owner: 'Dimas Ansori',
      phone: '0812-9988-7711',
      vin: 'MH3NMAX2021G90214',
      engine: 'G3J4E-099214',
      odometer: '28.400 KM',
      lastService: '12 Feb 2024',
      status: 'Siap Jalan',
      type: 'motor',
    },
  ]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await api.get('/admin/vehicles');
        if (res.data?.vehicles && res.data.vehicles.length > 0) {
          const mapped = res.data.vehicles.map((v: any) => {
            const isMotor = (v.vehicle_type || '').toLowerCase().includes('motor');
            const hasActiveRes = (v.reservations && v.reservations.some((r: any) => r.status === 'in_progress')) || false;
            return {
              id: `VH-${String(v.id).padStart(3, '0')}`,
              brand: v.brand || 'Kendaraan',
              model: `${v.brand || ''} ${v.model || ''}`.trim(),
              year: v.release_year || 2022,
              plate: v.plate_number,
              owner: v.user?.name || 'Pelanggan Bengkel',
              phone: v.user?.phone || '0812-0000-0000',
              vin: v.chassis_number || `MHR${String(v.id).padStart(8, '0')}`,
              engine: v.engine_number || `ENG-${String(v.id).padStart(6, '0')}`,
              odometer: '35.000 KM',
              lastService: hasActiveRes ? 'Hari Ini (Active)' : 'Terdaftar di Garasi',
              status: hasActiveRes ? 'Sedang Servis' : 'Siap Jalan',
              type: isMotor ? 'motor' : 'mobil',
            };
          });
          setVehicles(mapped);
        }
      } catch (err) {
        console.warn('Could not load vehicles from API, using cached data:', err);
      }
    };

    fetchVehicles();
  }, []);

  const handleAddNewVehicle = async (newVeh: VehicleData) => {
    try {
      await api.post('/admin/vehicles', {
        plate: newVeh.plate,
        model: newVeh.model,
        owner: newVeh.owner,
        phone: newVeh.phone,
        vin: newVeh.vin,
        engine: newVeh.engine,
        type: newVeh.type,
      });
    } catch (err) {
      console.warn('Backend storeAdminVehicle warning:', err);
    }

    setVehicles((prev) => [
      {
        id: `VH-${Math.floor(100 + Math.random() * 900)}`,
        brand: newVeh.model.split(' ')[0] || 'Kendaraan',
        model: newVeh.model,
        year: 2023,
        plate: newVeh.plate,
        owner: newVeh.owner,
        phone: newVeh.phone,
        vin: newVeh.vin,
        engine: newVeh.engine,
        odometer: newVeh.odo,
        lastService: 'Hari Ini',
        status: newVeh.status,
        type: newVeh.type.toLowerCase().includes('motor') ? 'motor' : 'mobil',
      },
      ...prev,
    ]);
    showNotification(`Kendaraan baru ${newVeh.plate} (${newVeh.model}) berhasil didaftarkan!`);
  };

  const filtered = vehicles.filter((v) => {
    const matchesSearch =
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.owner.toLowerCase().includes(search.toLowerCase()) ||
      v.vin.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (vehicleTypeFilter === 'all') return true;
    return v.type === vehicleTypeFilter;
  });

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs uppercase font-bold text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs">
              Fleet &amp; Garage Master Database
            </span>
            <span className="text-slate-400 font-mono text-xs font-semibold">Total 840 Unit Terdaftar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Database Master Kendaraan
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pencatatan nomor identifikasi kendaraan (VIN), spesifikasi teknis mesin, dan rekam jejak odometer.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewVehicleOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[18px]">directions_car</span>
          <span>Tambah Kendaraan</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Total Kendaraan</div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">840 Unit</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700 shadow-2xs">
            <span className="material-symbols-outlined text-[22px]">garage</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Mobil Pribadi</div>
            <div className="text-2xl font-extrabold text-blue-700 font-mono mt-1">620 Unit</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700 shadow-2xs">
            <span className="material-symbols-outlined text-[22px]">directions_car</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Armada Fleet / Niaga</div>
            <div className="text-2xl font-extrabold text-indigo-700 font-mono mt-1">140 Unit</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-indigo-700 shadow-2xs">
            <span className="material-symbols-outlined text-[22px]">local_shipping</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Roda Dua / Motor</div>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">80 Unit</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shadow-2xs">
            <span className="material-symbols-outlined text-[22px]">two_wheeler</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
          <input
            className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium transition-all"
            placeholder="Cari Plat Nomor, Merk/Model, Pemilik, atau Nomor VIN Rangka..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'mobil', 'motor'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setVehicleTypeFilter(t)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize cursor-pointer transition-all ${
                vehicleTypeFilter === t
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t === 'all' ? 'Semua Unit' : t === 'mobil' ? 'Mobil' : 'Sepeda Motor'}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-3xl shadow-xs overflow-hidden border border-slate-200/90">
        <div className="overflow-x-auto min-h-[420px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Plat &amp; Kendaraan</th>
                <th className="py-4 px-6">Pemilik Terdaftar</th>
                <th className="py-4 px-6">Nomor Rangka &amp; Mesin</th>
                <th className="py-4 px-6">Odometer &amp; Servis</th>
                <th className="py-4 px-6">Status Bengkel</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-800">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-mono text-xs px-2.5 py-0.5 bg-slate-900 text-white rounded-lg font-bold w-fit mb-1 shadow-2xs">
                      {v.plate}
                    </div>
                    <span className="font-bold text-slate-900 block text-sm">{v.model}</span>
                    <span className="text-xs text-slate-400">Tahun {v.year}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-slate-900 block text-sm">{v.owner}</span>
                    <span className="text-xs text-slate-400">{v.phone}</span>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs">
                    <div className="text-slate-800 font-semibold">VIN: {v.vin}</div>
                    <div className="text-slate-400 font-medium">ENG: {v.engine}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold font-mono text-sm text-slate-900 block">{v.odometer}</span>
                    <span className="text-xs text-slate-400">Terakhir: {v.lastService}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        v.status === 'Sedang Servis'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          v.status === 'Sedang Servis' ? 'bg-blue-600 animate-pulse' : 'bg-emerald-500'
                        }`}
                      ></span>
                      {v.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedVehicle({
                            plate: v.plate,
                            model: v.model,
                            type: v.type,
                            owner: v.owner,
                            phone: v.phone,
                            vin: v.vin,
                            engine: v.engine,
                            odo: v.odometer,
                            status: v.status,
                          })
                        }
                        className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200/80 transition-all shadow-2xs cursor-pointer"
                        title="Buku Servis Digital"
                      >
                        <span className="material-symbols-outlined text-[18px]">menu_book</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedVehicle({
                            plate: v.plate,
                            model: v.model,
                            type: v.type,
                            owner: v.owner,
                            phone: v.phone,
                            vin: v.vin,
                            engine: v.engine,
                            odo: v.odometer,
                            status: v.status,
                          })
                        }
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                        title="Edit Data Kendaraan"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vehicle Modals */}
      <AdminVehicleDetailModal
        isOpen={Boolean(selectedVehicle)}
        onClose={() => setSelectedVehicle(null)}
        vehicle={selectedVehicle}
      />

      <NewVehicleModal
        isOpen={isNewVehicleOpen}
        onClose={() => setIsNewVehicleOpen(false)}
        onSubmitSuccess={handleAddNewVehicle}
      />
    </div>
  );
}
