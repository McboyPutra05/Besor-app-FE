import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import LiveTelemetryCard from '../components/dashboard/LiveTelemetryCard';
import PromoAndReminders from '../components/dashboard/PromoAndReminders';
import CostSummaryLedger from '../components/dashboard/CostSummaryLedger';
import PhotoDocumentationModal from '../components/dashboard/PhotoDocumentationModal';
import PartApprovalModal from '../components/dashboard/PartApprovalModal';

interface CustomerDashboardProps {
  onOpenBooking: () => void;
  onGoToGarasi: () => void;
}

export default function CustomerDashboard({ onOpenBooking, onGoToGarasi }: CustomerDashboardProps) {
  const { user } = useAuth();
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasApprovedExtraPart, setHasApprovedExtraPart] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      <div className="flex flex-col w-full">
        {/* Salutation & Overview Header */}
        <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200/80 text-xs font-bold tracking-wide uppercase px-3 py-1 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
                Live Workshop Telemetry
              </Badge>
              <Badge variant="outline" className="font-mono text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 border-slate-200">
                BAY-04 / WO-88219
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Selamat Datang Kembali, {user?.name || 'Dimas Ansori'}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Pemantauan langsung status pengerjaan unit aktif:{' '}
              <span className="font-semibold text-slate-800">Honda CR-V 1.5 Turbo</span>
            </p>
          </div>

          {/* Quick Vehicle Selector Pill */}
          <div
            onClick={onGoToGarasi}
            className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all self-start lg:self-center cursor-pointer group"
            title="Klik untuk ke Garasi Saya"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white shadow-xs">
              <span className="material-symbols-outlined text-blue-400 text-[18px]">directions_car</span>
              <span className="font-mono text-xs font-bold tracking-wider">B 1945 ANS</span>
            </div>
            <span className="text-xs uppercase font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sedang Dikerjakan
            </span>
          </div>
        </section>

        {/* Live Workshop Telemetry & Progress Visualizer */}
        <LiveTelemetryCard onGoToGarasi={onGoToGarasi} />

        {/* Split Grid: Promos & Reminders (Left) + Cost Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <PromoAndReminders onOpenBooking={onOpenBooking} />
          </div>
          <div className="lg:col-span-5">
            <CostSummaryLedger
              onOpenPhotoModal={() => setShowPhotoModal(true)}
              onOpenConfirmModal={() => setShowConfirmModal(true)}
              hasApprovedExtraPart={hasApprovedExtraPart}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <PhotoDocumentationModal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
      />
      <PartApprovalModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onApproved={() => setHasApprovedExtraPart(true)}
      />
    </div>
  );
}
