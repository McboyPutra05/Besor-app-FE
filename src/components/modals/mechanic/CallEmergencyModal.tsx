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
  AlertTriangle,
  Radio,
  UserCheck,
  Wrench,
  ShieldAlert,
  Send,
} from 'lucide-react';
import CustomDropdown from '../../dropdown/CustomDropdown';

interface CallEmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: string;
  defaultTarget?: string;
  onConfirmCall: (type: string, target: string, notes: string) => void;
}

const CALL_TYPE_OPTIONS = [
  'Panggilan Darurat Foreman (Kendala Berat)',
  'Inspeksi QC & Uji Jalan Mandatori',
  'Helper Tambahan (Tandem 2 Mekanik)',
  'Kendala K3 / Alat Lift Macet',
];

export default function CallEmergencyModal({
  isOpen,
  onClose,
  defaultType = 'Panggilan Darurat Foreman (Kendala Berat)',
  defaultTarget = 'Foreman Aris Munandar',
  onConfirmCall,
}: CallEmergencyModalProps) {
  const [callType, setCallType] = useState(defaultType);
  const [targetPerson, setTargetPerson] = useState(defaultTarget);
  const [notes, setNotes] = useState('');

  const handleCallTypeChange = (newType: string) => {
    setCallType(newType);
    if (newType.includes('Foreman')) setTargetPerson('Foreman Aris Munandar');
    if (newType.includes('QC')) setTargetPerson('Pak Joko (QC Lead)');
    if (newType.includes('Helper')) setTargetPerson('Tandem Helper (Dani / Rahmat)');
    if (newType.includes('K3')) setTargetPerson('Tim HSE & K3 Bengkel');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmCall(callType, targetPerson, notes);
    onClose();
    setNotes('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 border border-slate-200 bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-rose-950 px-6 py-5 text-white flex items-center justify-between border-b border-rose-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600/30 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-base font-extrabold text-white tracking-tight">
                  Panggilan Intercom Workshop
                </DialogTitle>
                <Badge className="bg-rose-500/30 text-rose-200 border-rose-500/40 text-[10px] uppercase font-mono">
                  LIVE PAGING
                </Badge>
              </div>
              <p className="text-xs text-rose-300">
                Peringatan HT / Speaker darurat stall bengkel
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <CustomDropdown
            label="Jenis Panggilan Bantuan"
            value={callType}
            onChange={handleCallTypeChange}
            options={CALL_TYPE_OPTIONS}
            accentColor="rose"
          />

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Target Petugas yang Dituju
            </label>
            <input
              type="text"
              value={targetPerson}
              onChange={(e) => setTargetPerson(e.target.value)}
              className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Catatan Kendala di Stall
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Baut nepel rem patah di dalam kaliper, butuh bantuan alat extractor khusus dari foreman."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
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
              className="rounded-xl text-xs font-bold px-5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white shadow-md shadow-rose-500/20 cursor-pointer"
            >
              Bunyikan Panggilan Sekarang
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
