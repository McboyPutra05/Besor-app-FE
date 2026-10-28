import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, ShieldCheck } from 'lucide-react';
import GarageSummaryBanner from '../components/vehicles/GarageSummaryBanner';
import VehicleCard, { VehicleData } from '../components/vehicles/VehicleCard';
import DigitalServiceBookModal from '../components/vehicles/DigitalServiceBookModal';

interface CustomerVehiclesProps {
  onOpenAddVehicle: () => void;
  onOpenBooking: () => void;
}

export default function CustomerVehicles({ onOpenAddVehicle, onOpenBooking }: CustomerVehiclesProps) {
  const [selectedBookVehicle, setSelectedBookVehicle] = useState<string | null>(null);

  const vehicleList: VehicleData[] = [
    {
      id: 'crv-1',
      name: 'Honda CR-V 1.5 Turbo',
      subTitle: '2021 • Hitam Metalik',
      category: 'Mobil Pribadi',
      plate: 'B 1945 ANS',
      image: 'https://images.unsplash.com/photo-1590362891988-30159491b920?auto=format&fit=crop&w=800&q=80',
      statusBadge: {
        label: 'Pit 02 Aktif',
        variant: 'active',
      },
      odometer: '42.150 KM',
      lastService: 'Hari ini (Sedang Servis)',
      taxExpiry: 'Berakhir Okt 2026',
      statusNote: 'Oli Mesin 0W-20',
    },
    {
      id: 'yaris-1',
      name: 'Toyota Yaris Cross HEV',
      subTitle: '2023 • Putih Pearl',
      category: 'Mobil Keluarga',
      plate: 'B 2024 ANS',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      statusBadge: {
        label: 'Siap Jalan',
        variant: 'ready',
      },
      odometer: '18.900 KM',
      lastService: '15 Jul 2024 (Ganti Oli 0W-16)',
      taxExpiry: 'Berakhir Jan 2027',
      statusNote: 'Baterai Hybrid Normal',
    },
    {
      id: 'nmax-1',
      name: 'Yamaha NMAX 155 ABS',
      subTitle: '2022 • Matte Grey',
      category: 'Motor Harian',
      plate: 'B 4821 KLO',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
      statusBadge: {
        label: 'Siap Jalan',
        variant: 'ready',
      },
      odometer: '28.400 KM',
      lastService: '12 Feb 2024 (Ganti Vanbelt)',
      taxExpiry: 'Berakhir Nov 2025',
      statusNote: 'Oli CVT Normal',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      <div className="flex flex-col w-full">
        {/* Top Bar / Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge className="text-xs uppercase tracking-wider text-blue-700 font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs">
                Garasi &amp; Inventaris
              </Badge>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="font-mono text-xs text-slate-500 font-semibold">
                {vehicleList.length} Unit Terdaftar
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Garasi Saya</h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Kelola riwayat servis, buku digital, dan dokumen kendaraan pribadi Anda dalam satu tempat.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-slate-600 text-xs font-semibold shadow-2xs gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Buku Digital Terverifikasi</span>
            </div>
            <Button
              type="button"
              onClick={onOpenAddVehicle}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Kendaraan</span>
            </Button>
          </div>
        </div>

        {/* Telemetry Strip Banner */}
        <GarageSummaryBanner
          totalUnits={vehicleList.length}
          readyCount={2}
          inServiceCount={1}
        />

        {/* Grid Daftar Kendaraan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {vehicleList.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onOpenBook={(name) => setSelectedBookVehicle(name)}
              onOpenBooking={onOpenBooking}
            />
          ))}
        </div>
      </div>

      {/* Detail Buku Servis Digital Modal */}
      <DigitalServiceBookModal
        vehicleName={selectedBookVehicle}
        onClose={() => setSelectedBookVehicle(null)}
      />
    </div>
  );
}
