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
  CheckCircle2,
  FileCheck2,
  AlertTriangle,
  Clock,
  Car,
  UserCheck,
  Send,
} from 'lucide-react';
import CustomDropdown from '../../dropdown/CustomDropdown';

interface CompleteSPKModalProps {
  isOpen: boolean;
  onClose: () => void;
  spkId?: string;
  plate?: string;
  vehicle?: string;
  durationText?: string;
  onConfirmComplete: (notes: string, qcOfficer: string) => void;
}

const QC_OFFICER_OPTIONS = [
  'Pak Joko (QC Lead Specialist)',
  'Aris Munandar (Foreman Pit)',
  'Bayu Pratama (Service Advisor)',
];

export default function CompleteSPKModal({
  isOpen,
  onClose,
  spkId = 'SPK-2024-0878',
  plate = 'D 1289 KBR',
  vehicle = 'Mitsubishi Pajero Sport',
  durationText = '42 Menit',
  onConfirmComplete,
}: CompleteSPKModalProps) {
  const [qcOfficer, setQcOfficer] = useState('Pak Joko (QC Lead Specialist)');
  const [finalNotes, setFinalNotes] = useState('Semua item checklist telah selesai dikerjakan sesuai SOP pabrikan. Minyak rem sudah dibuang angin tanpa gelembung.');
  const [isAllClean, setIsAllClean] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmComplete(finalNotes, qcOfficer);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg p-0 border border-slate-200 bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-base font-extrabold text-white tracking-tight">
                  Penyelesaian SPK Mekanik
                </DialogTitle>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-mono">
                  SIAP QC
                </Badge>
              </div>
              <p className="text-xs text-slate-400">
                Verifikasi akhir sebelum uji jalan &amp; serah terima kendaraan (BAST)
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-extrabold text-slate-900">{plate}</span>
                <span className="font-mono text-[11px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {spkId}
                </span>
              </div>
              <span className="text-xs text-slate-600 font-medium block mt-1">{vehicle}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Durasi Pengerjaan</span>
              <span className="font-mono text-xs font-bold text-emerald-700">{durationText}</span>
            </div>
          </div>

          {/* Verification Checklist Confirm */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Pemeriksaan Mandatori Pra-QC:</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-700 pl-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAllClean}
                  onChange={(e) => setIsAllClean(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Area kerja mesin &amp; kolong bersih dari tumpahan oli / lap kotor</span>
              </label>
              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Torsi baut roda terkalibrasi 108 Nm (Pola Silang)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Level cairan (oli enjin, minyak rem, coolant) pada batas MAX</span>
              </div>
            </div>
          </div>

          {/* QC Officer Selection */}
          <CustomDropdown
            label="Tujukan ke Petugas QC / Foreman"
            icon={<UserCheck className="w-3.5 h-3.5 text-blue-600" />}
            value={qcOfficer}
            onChange={(val) => setQcOfficer(val)}
            options={QC_OFFICER_OPTIONS}
            accentColor="emerald"
          />

          {/* Final Notes */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Catatan Akhir Lembar BAST Pelanggan
            </label>
            <textarea
              rows={3}
              value={finalNotes}
              onChange={(e) => setFinalNotes(e.target.value)}
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
              className="rounded-xl text-xs font-bold px-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              Selesaikan SPK &amp; Panggil QC
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
