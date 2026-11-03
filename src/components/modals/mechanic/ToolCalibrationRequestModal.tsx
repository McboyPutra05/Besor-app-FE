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
import { Sliders, Wrench, ShieldAlert, CheckCircle2 } from 'lucide-react';
import CustomDropdown from '../../dropdown/CustomDropdown';

interface ToolCalibrationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (toolName: string, reason: string) => void;
}

const TOOL_OPTIONS = [
  'Kunci Momen Digital 40-200 Nm (KTC Japan)',
  'Tire Pressure Gauge Digital (Michelin Pro)',
  'Dial Indicator & Magnetic Base 0.01mm (Mitutoyo)',
  'Gas Analyzer 5-Gas Uji Emisi (BrainBee Italy)',
  'Scissor Lift 4-Ton Load Sensor (Rotary)',
];

export default function ToolCalibrationRequestModal({
  isOpen,
  onClose,
  onSubmitSuccess,
}: ToolCalibrationRequestModalProps) {
  const [selectedTool, setSelectedTool] = useState('Kunci Momen Digital 40-200 Nm (KTC Japan)');
  const [reason, setReason] = useState('Jatuh tempo kalibrasi 6-bulanan rutin.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSuccess(selectedTool, reason);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 border border-slate-200 bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-extrabold text-white tracking-tight">
                Permohonan Kalibrasi Alat
              </DialogTitle>
              <p className="text-xs text-slate-400">
                Penerusan ke Bagian Quality Assurance &amp; Balai Metrologi
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <CustomDropdown
            label="Pilih Alat Ukur Presisi"
            value={selectedTool}
            onChange={(val) => setSelectedTool(val)}
            options={TOOL_OPTIONS}
            accentColor="blue"
          />

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Alasan Pengajuan Tera Ulang
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Contoh: Pembacaan torsi meleset > 3% saat uji komparasi master atau sertifikat jatuh tempo."
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
              Kirim Permohonan ke QA
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
