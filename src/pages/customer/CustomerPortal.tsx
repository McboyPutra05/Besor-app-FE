import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CustomerDashboard from './tabs/CustomerDashboard';
import CustomerVehicles from './tabs/CustomerVehicles';
import CustomerHistory from './tabs/CustomerHistory';
import BookingServiceModal from '../../components/modals/customer/BookingServiceModal';
import AddVehicleModal from '../../components/modals/customer/AddVehicleModal';

export default function CustomerPortal() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'garasi' | 'riwayat'>('dashboard');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);

  return (
    <div className="bg-slate-50/70 font-sans text-slate-900 antialiased min-h-screen flex flex-col">
      {/* Modern High-End Glass Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-xs">
        <div className="h-18 max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('dashboard')}
            title="Ke Dashboard Utama"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">car_repair</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 leading-tight">
                Bengkel Ansor
              </span>
              <span className="text-[10px] uppercase tracking-widest text-blue-600 font-mono font-bold">
                Customer Portal
              </span>
            </div>
          </div>

          {/* Navigation Pill Menu with Dynamic Icons */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              <span>Dashboard</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('garasi')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'garasi'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">directions_car</span>
              <span>Garasi Saya</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('riwayat')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'riwayat'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>Riwayat Servis</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Booking Action Button */}
            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="flex items-center gap-1.5 px-4 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span className="hidden sm:inline">Booking Servis</span>
            </button>

            <div className="h-7 w-px bg-slate-200 hidden sm:block"></div>

            {/* Profile & Logout Pill */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex flex-col items-end text-right">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {user?.name || 'Dimas Ansori'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px] text-amber-600">star</span>
                    Gold
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">0812-9988-7711</span>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={() => {
                  if (confirm('Keluar dari portal pelanggan?')) {
                    logout();
                  }
                }}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 transition-all cursor-pointer shadow-2xs"
                title="Keluar dari akun Anda"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body with Clean Spacing */}
      <main className="w-full flex-1">
        {activeTab === 'dashboard' && (
          <CustomerDashboard
            onOpenBooking={() => setIsBookingOpen(true)}
            onGoToGarasi={() => setActiveTab('garasi')}
          />
        )}
        {activeTab === 'garasi' && (
          <CustomerVehicles
            onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}
        {activeTab === 'riwayat' && <CustomerHistory />}
      </main>

      {/* Modern High-End Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Bengkel Ansor</span>
            <span>•</span>
            <span>Sistem Pemantauan Servis Digital Keluarga &amp; Armada Fleet</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-blue-600 transition">Bantuan &amp; Panduan</a>
            <a href="#" className="hover:text-blue-600 transition">Syarat &amp; Garansi</a>
            <a href="https://wa.me/628123456789" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
              Customer Care WhatsApp
            </a>
          </div>
          <div>© 2026 Bengkel Ansor. Seluruh hak cipta dilindungi.</div>
        </div>
      </footer>

      {/* Modals */}
      <BookingServiceModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSuccess={() => {}}
      />
      <AddVehicleModal
        isOpen={isAddVehicleOpen}
        onClose={() => setIsAddVehicleOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  );
}
