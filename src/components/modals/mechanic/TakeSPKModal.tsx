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
  Wrench,
  Clock,
  Car,
  AlertTriangle,
  PlayCircle,
  FileCheck2,
  CheckCircle2,
  MapPin,
  Flame,
} from 'lucide-react';
import CustomDropdown from '../../dropdown/CustomDropdown';

export interface TaskItem {
  id: string;
  plate: string;
  vehicle: string;
  serviceType: string;
  complaint?: string;
  priority?: 'Urgent' | 'Normal' | 'Tinggi';
  estMinutes?: number;
  assignedStall?: string;
}

interface TakeSPKModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: TaskItem | null;
  onConfirmStart: (taskId: string, stall: string) => void;
}

const STALL_OPTIONS = [
  'Stall 01 (Quick Service Bay)',
  'Stall 02 (Tune-Up & Brake Bay)',
  'Stall 03 (Engine Pit & Lift A)',
  'Stall 04 (Electrical & Hybrid Bay)',
  'Stall 05 (Spooring & Understeel)',
];

export default function TakeSPKModal({
  isOpen,
  onClose,
  task,
  onConfirmStart,
}: TakeSPKModalProps) {
  const [selectedStall, setSelectedStall] = useState(task?.assignedStall || 'Stall 03 (Engine Pit & Lift A)');

  if (!task) return null;

  const handleStart = () => {
    onConfirmStart(task.id, selectedStall);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg p-0 border border-slate-200 bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <PlayCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-base font-extrabold text-white tracking-tight">
                  Mulai Pengerjaan SPK
                </DialogTitle>
                <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 text-[10px] uppercase font-mono">
                  {task.priority || 'URGENT'}
                </Badge>
              </div>
              <p className="text-xs text-slate-400">
                Alokasi stall dan aktivasi timer stopwatch pengerjaan teknisi
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Vehicle & Plate Hero Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-sm font-extrabold text-slate-900 block tracking-wider">
                  {task.plate}
                </span>
                <span className="text-xs font-bold text-slate-800">{task.vehicle}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">ID Instruksi</span>
              <span className="font-mono text-xs font-extrabold text-blue-700">{task.id}</span>
            </div>
          </div>

          {/* Service & Complaint */}
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Paket Pekerjaan / Instruksi Servis
              </span>
              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-blue-900 font-semibold text-xs leading-relaxed">
                {task.serviceType}
              </div>
            </div>

            {task.complaint && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-800 block">
                    Keluhan Driver / Catatan Khusus
                  </span>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    {task.complaint}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Stall Bay Selection */}
          <CustomDropdown
            label="Pilih Stall Kerja (Bay)"
            icon={<MapPin className="w-3.5 h-3.5 text-blue-600" />}
            value={selectedStall}
            onChange={(val) => setSelectedStall(val)}
            options={STALL_OPTIONS}
            accentColor="blue"
          />
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Estimasi Waktu: <strong>{task.estMinutes || 75} Menit</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl text-xs font-semibold px-4 cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={handleStart}
              className="rounded-xl text-xs font-bold px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Mulai Kerjakan Sekarang
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
