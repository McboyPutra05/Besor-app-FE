import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import CustomerDashboard from './tabs/CustomerDashboard';
import CustomerVehicles from './tabs/CustomerVehicles';
import CustomerHistory from './tabs/CustomerHistory';
import CustomerProfile from './tabs/CustomerProfile';
import BookingServiceModal from '@/components/modals/customer/BookingServiceModal';
import AddVehicleModal from '@/components/modals/customer/AddVehicleModal';
import LogoutConfirmDialog from './components/common/LogoutConfirmDialog';
import EmergencyAssistanceModal from './components/common/EmergencyAssistanceModal';
import {
  LayoutDashboard,
  Car,
  Receipt,
  PlusCircle,
  ShieldAlert,
  Star,
} from 'lucide-react';

export default function CustomerPortal() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'garasi' | 'riwayat' | 'profil'>('dashboard');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  return (
    <div className="bg-slate-50/70 font-sans text-slate-900 antialiased min-h-screen flex flex-col">
      {/* Modern High-End Glass Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-xs">
        <div className="h-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
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

          {/* Clean 3-Tab Operational Navigation Pill */}
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
              <LayoutDashboard className="w-4 h-4" />
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
              <Car className="w-4 h-4" />
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
              <Receipt className="w-4 h-4" />
              <span>Riwayat Servis</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Derek / Home Service SOS Button */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEmergencyOpen(true)}
              className="h-10 px-3 sm:px-3.5 rounded-xl border-amber-200 bg-amber-50/70 hover:bg-amber-100/80 text-amber-800 text-xs font-bold shadow-2xs gap-1.5"
              title="Layanan Derek 24 Jam & Mekanik Home Service"
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span className="hidden xl:inline">Bantuan Darurat</span>
              <span className="xl:hidden inline">SOS</span>
            </Button>

            {/* Booking Action Button */}
            <Button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Booking Servis</span>
            </Button>

            <div className="h-7 w-px bg-slate-200 hidden sm:block" />

            {/* Single Unified User Profile Trigger Pill (Direct Entry to User UI) */}
            <button
              type="button"
              onClick={() => setActiveTab('profil')}
              className={`flex items-center gap-2.5 p-1.5 sm:pr-3 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'profil'
                  ? 'bg-blue-50/90 border-blue-400 text-slate-900 shadow-xs ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
              }`}
              title="Buka Profil & Pengaturan Akun"
            >
              <Avatar className="w-8 h-8 sm:w-9 sm:h-9 border border-blue-500/20 shadow-2xs">
                <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs">
                  {(user?.name || 'Dimas Ansori').slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="hidden sm:flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    {user?.name || 'Dimas Ansori'}
                  </span>
                  <Badge variant="outline" className="px-1.5 py-0 text-[9px] uppercase font-bold tracking-wider bg-amber-50 text-amber-800 border-amber-300 gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                    Gold
                  </Badge>
                </div>
                <span className="text-[10px] font-mono text-slate-500">0812-9988-7711</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
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
        {activeTab === 'profil' && (
          <CustomerProfile onLogout={() => setIsLogoutConfirmOpen(true)} />
        )}
      </main>

      {/* Modern High-End Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
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

      {/* Modals & Dialogs */}
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
      <LogoutConfirmDialog
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={logout}
      />
      <EmergencyAssistanceModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </div>
  );
}
