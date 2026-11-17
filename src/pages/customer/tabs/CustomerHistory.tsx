import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import HistoryStatsCards from '../components/history/HistoryStatsCards';
import HistoryFilterBar from '../components/history/HistoryFilterBar';
import HistoryTable from '../components/history/HistoryTable';
import InvoiceDetailModal, { ServiceRecord } from '../components/history/InvoiceDetailModal';
import ServiceReviewModal from '../components/history/ServiceReviewModal';
import api from '@/api/client';

interface CustomerHistoryProps {
  refreshKey?: number;
}

export default function CustomerHistory({ refreshKey }: CustomerHistoryProps = {}) {
  const { user, showNotification } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<ServiceRecord | null>(null);
  const [selectedReview, setSelectedReview] = useState<ServiceRecord | null>(null);

  const initialRecords: ServiceRecord[] = [
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

  const [allRecords, setAllRecords] = useState<ServiceRecord[]>(initialRecords);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await api.get(`/customer/reservations${user?.id ? `?user_id=${user.id}` : ''}`);
        if (res.data?.reservations && res.data.reservations.length > 0) {
          const mapped: ServiceRecord[] = res.data.reservations.map((r: any) => {
            const isCompleted = r.status === 'completed';
            const vName = r.vehicle ? `${r.vehicle.brand} ${r.vehicle.model}` : (r.vehicle_type || 'Kendaraan');
            const partsList = r.work_order?.items?.map((it: any) => it.inventory?.name || 'Komponen Suku Cadang') || ['Paket Jasa Servis Terpadu'];

            return {
              id: r.id,
              date: r.service_date ? new Date(r.service_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Hari Ini',
              time: `${(r.service_time || '09:00').slice(0, 5)} WIB`,
              code: r.payment ? `INV-BKL-${String(r.id).padStart(4, '0')}` : `WO-2024-${String(r.id).padStart(4, '0')}`,
              mechanic: r.mechanic ? `Bay 02 - ${r.mechanic.name}` : 'Front Desk Dispatcher',
              vehicle: vName,
              plate: r.license_plate || r.vehicle?.plate_number || 'B 1945 ANS',
              vehicleKey: vName.toLowerCase().includes('cr-v') ? 'crv' : (vName.toLowerCase().includes('yaris') ? 'yaris' : 'nmax'),
              serviceTitle: r.service_type || 'Servis Berkala & Tune Up',
              parts: partsList,
              cost: `Rp ${Number(r.total_price || 350000).toLocaleString('id-ID')}`,
              costNote: isCompleted ? 'Lunas Terverifikasi' : 'Estimasi Tagihan',
              status: isCompleted ? 'Selesai & Lunas' : 'Proses Pengerjaan',
              statusType: isCompleted ? 'done' : 'process',
              isFinalInvoice: isCompleted,
            };
          });
          setAllRecords(mapped);
        }
      } catch (err) {
        console.warn('Could not fetch reservations history, keeping fallback cache:', err);
      }
    };

    loadHistory();
  }, [user, refreshKey]);

  const handleExportPdf = () => {
    showNotification('Menyiapkan berkas rangkuman riwayat servis berkala dalam format PDF...', 'info');
  };

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
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex flex-col gap-1.5 mb-8">
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-50 text-blue-700 border-blue-200/80 text-xs font-bold uppercase tracking-wider px-3 py-1 shadow-2xs">
              Histori &amp; Garansi
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Riwayat Servis &amp; Faktur
          </h1>
          <p className="text-sm sm:text-base text-slate-500">
            Arsip lengkap pengerjaan mekanik, suku cadang terpasang, faktur resmi, dan ulasan kepuasan.
          </p>
        </div>

        {/* Top Summary Cards */}
        <HistoryStatsCards />

        {/* Filter Bar */}
        <HistoryFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          vehicleFilter={vehicleFilter}
          onVehicleFilterChange={setVehicleFilter}
          onExportPdf={handleExportPdf}
        />

        {/* Table of Records */}
        <HistoryTable
          records={filteredRecords}
          onViewInvoice={(record) => setSelectedInvoice(record)}
          onReviewService={(record) => setSelectedReview(record)}
        />
      </div>

      {/* Modals */}
      <InvoiceDetailModal
        record={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
      <ServiceReviewModal
        record={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </div>
  );
}
