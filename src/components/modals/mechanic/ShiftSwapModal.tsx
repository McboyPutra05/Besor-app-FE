import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  Calendar,
  Clock,
  ArrowRightLeft,
  User,
  Users,
  AlertCircle,
  FileText,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import CustomDropdown, { DropdownOption } from '../../dropdown/CustomDropdown';

export interface ShiftSwapData {
  id: string;
  requesterName: string;
  targetMechanic: string;
  currentShiftDate: string;
  currentShiftType: string;
  targetShiftDate: string;
  targetShiftType: string;
  reason: string;
  status: 'Menunggu Persetujuan Admin' | 'Disetujui' | 'Ditolak';
  submittedAt: string;
}

interface ShiftSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMechanicName?: string;
  onSubmitSuccess: (data: ShiftSwapData) => void;
}

const MECHANIC_RAW_LIST = [
  'Aris Pratama (Senior Specialist)',
  'Dani Kurniawan (Hybrid & Electrical)',
  'Rahmat Santoso (Quick Service)',
  'Budi Santoso (Spooring & QC)',
  'Hendra Mulyana (Two-Wheeler)',
  'Sugeng Haryanto (Master Specialist)',
];

const SHIFT_TYPE_OPTIONS = [
  'Shift Pagi (08:00 - 17:00)',
  'Shift Siang (13:00 - 21:00)',
  'Shift Sabtu Lembur (08:00 - 14:00)',
];

export default function ShiftSwapModal({
  isOpen,
  onClose,
  currentMechanicName = 'Sugeng Haryanto',
  onSubmitSuccess,
}: ShiftSwapModalProps) {
  const [requester, setRequester] = useState(currentMechanicName);
  const [targetMechanic, setTargetMechanic] = useState('');
  const [currentShiftDate, setCurrentShiftDate] = useState('2024-10-24');
  const [currentShiftType, setCurrentShiftType] = useState('Shift Pagi (08:00 - 17:00)');
  const [targetShiftDate, setTargetShiftDate] = useState('2024-10-25');
  const [targetShiftType, setTargetShiftType] = useState('Shift Siang (13:00 - 21:00)');
  const [reason, setReason] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const mechanicDropdownOptions: DropdownOption[] = MECHANIC_RAW_LIST.map((name) => ({
    value: name.split(' (')[0],
    label: name,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetMechanic) {
      setErrorMsg('Silakan pilih rekan mekanik pengganti yang dituju.');
      return;
    }
    if (!reason.trim()) {
      setErrorMsg('Mohon isi alasan pengajuan tukar shift.');
      return;
    }

    const newSwap: ShiftSwapData = {
      id: `SWAP-${Date.now().toString().slice(-4)}`,
      requesterName: requester,
      targetMechanic,
      currentShiftDate,
      currentShiftType,
      targetShiftDate,
      targetShiftType,
      reason,
      status: 'Menunggu Persetujuan Admin',
      submittedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
    };

    onSubmitSuccess(newSwap);
    onClose();
    // Reset form
    setTargetMechanic('');
    setReason('');
    setErrorMsg('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-0 border border-slate-200 bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-base font-extrabold text-white tracking-tight">
                  Form Pengajuan Tukar Shift
                </DialogTitle>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[10px] uppercase font-mono">
                  Butuh ACC Admin
                </Badge>
              </div>
              <p className="text-xs text-slate-400">
                Pemberitahuan resmi pergantian jam dinas kerja mekanik bengkel
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Info Card: Workflow Explainer */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 leading-relaxed">
              <span className="font-bold block mb-0.5">Alur Persetujuan Resmi Bengkel Ansor:</span>
              Setelah formulir dikirim, permohonan akan masuk ke sistem <strong>Admin / Service Advisor</strong> untuk disetujui (ACC) guna memastikan ketersediaan stall kerja dan sinkronisasi jadwal booking pelanggan.
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Pemohon & Rekan Pengganti */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <CustomDropdown
                label="Mekanik Pemohon"
                icon={<User className="w-3.5 h-3.5 text-slate-400" />}
                value={requester}
                onChange={(val) => setRequester(val)}
                options={mechanicDropdownOptions}
                accentColor="blue"
              />
            </div>

            <div>
              <CustomDropdown
                label="Rekan Mekanik Pengganti"
                required
                icon={<Users className="w-3.5 h-3.5 text-blue-600" />}
                placeholder="-- Pilih Rekan Mekanik --"
                value={targetMechanic}
                onChange={(val) => {
                  setTargetMechanic(val);
                  setErrorMsg('');
                }}
                options={mechanicDropdownOptions}
                accentColor="blue"
              />
            </div>
          </div>

          {/* Section 2: Jadwal Asal vs Jadwal Pengganti */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
              Rincian Shift Yang Ingin Ditukar
            </span>

            {/* Asal Pemohon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-200">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Tanggal Shift Pemohon
                </label>
                <input
                  type="date"
                  value={currentShiftDate}
                  onChange={(e) => setCurrentShiftDate(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Jam Shift Asal
                </label>
                <CustomDropdown
                  value={currentShiftType}
                  onChange={(val) => setCurrentShiftType(val)}
                  options={SHIFT_TYPE_OPTIONS}
                  triggerClassName="py-2 rounded-lg"
                  accentColor="blue"
                />
              </div>
            </div>

            {/* Pengganti Rekan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Tanggal Shift Dituju (Pengganti)
                </label>
                <input
                  type="date"
                  value={targetShiftDate}
                  onChange={(e) => setTargetShiftDate(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Jam Shift Rekan Dituju
                </label>
                <CustomDropdown
                  value={targetShiftType}
                  onChange={(val) => setTargetShiftType(val)}
                  options={SHIFT_TYPE_OPTIONS}
                  triggerClassName="py-2 rounded-lg"
                  accentColor="blue"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Alasan */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Alasan Pengajuan Tukar Shift *</span>
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setErrorMsg('');
              }}
              placeholder="Contoh: Menghadiri keperluan keluarga mendesak / kontrol kesehatan, sudah konfirmasi secara lisan dengan rekan terkait."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <DialogFooter className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl text-xs font-semibold px-4 cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="rounded-xl text-xs font-bold px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Kirim Pengajuan ke Admin
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
