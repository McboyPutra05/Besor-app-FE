import React, { useState } from 'react';

export default function LandingTracking() {
  const [trackPlate, setTrackPlate] = useState('B 1945 ANS');
  const [trackResult, setTrackResult] = useState<{
    plate: string;
    vehicle: string;
    bay: string;
    service: string;
    progress: number;
    stage: string;
    mechanic: string;
    eta: string;
  } | null>({
    plate: 'B 1945 ANS',
    vehicle: 'Honda CR-V 1.5 Turbo Prestige',
    bay: 'PIT-BAY-03 (Lift A)',
    service: 'Servis Berkala 40.000 KM & Tune Up',
    progress: 75,
    stage: 'Penggantian Kampas Rem & Flushing Minyak Rem',
    mechanic: 'Mas Budi Santoso (Foreman Tech)',
    eta: 'Hari ini, 14:30 WIB',
  });

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackPlate.trim()) return;
    setTrackResult({
      plate: trackPlate.toUpperCase(),
      vehicle: 'Unit Servis Terdaftar (Bengkel Ansor)',
      bay: 'PIT-BAY-02 (Lift B)',
      service: 'Servis Berkala & General Checkup',
      progress: 68,
      stage: 'Pembersihan Throttle Body & Kalibrasi ECU',
      mechanic: 'Sugeng H. (Senior Specialist)',
      eta: 'Hari ini, 15:15 WIB',
    });
  };

  return (
    <section
      className="w-full py-16 px-6 lg:px-12 bg-surface-container-low border-t border-outline-variant/30 scroll-mt-16"
      id="tracking"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs font-bold text-primary uppercase tracking-wider bg-surface-container px-3 py-1 rounded-full">
            Live Workshop Telemetry
          </span>
          <h2 className="text-3xl font-extrabold text-on-surface">Lacak Progres Kendaraan Anda di Bengkel</h2>
          <p className="text-sm text-on-surface-variant max-w-xl mx-auto">
            Ketik nomor pelat polisi kendaraan Anda untuk memeriksa status pengerjaan stall, mekanik PIC, dan estimasi waktu selesai.
          </p>
        </div>

        <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto w-full">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[20px]">
              directions_car
            </span>
            <input
              type="text"
              placeholder="Contoh: B 1945 ANS..."
              value={trackPlate}
              onChange={(e) => setTrackPlate(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-surface-container-lowest border border-outline-variant/40 rounded-xl font-mono text-base font-bold text-on-surface uppercase focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
            />
          </div>
          <button
            type="submit"
            className="h-12 px-6 bg-primary-container hover:bg-primary text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
            <span>Lacak Unit</span>
          </button>
        </form>

        {trackResult && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-md border border-outline-variant/30 space-y-4 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-3 py-1 bg-surface-container-high rounded-md font-bold">
                  {trackResult.plate}
                </span>
                <div>
                  <h4 className="font-bold text-on-surface text-sm sm:text-base">{trackResult.vehicle}</h4>
                  <span className="text-xs text-on-surface-variant">{trackResult.service}</span>
                </div>
              </div>
              <span className="font-mono text-xs text-primary font-bold bg-primary-fixed/40 px-2.5 py-1 rounded w-fit">
                {trackResult.bay}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-on-surface-variant">Tahap: {trackResult.stage}</span>
                <span className="text-primary font-mono">{trackResult.progress}% Selesai</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-500"
                  style={{ width: `${trackResult.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-surface-container-low p-3.5 rounded-xl">
              <div>
                <span className="text-on-surface-variant block">Mekanik PIC:</span>
                <span className="font-bold text-on-surface">{trackResult.mechanic}</span>
              </div>
              <div className="sm:text-right">
                <span className="text-on-surface-variant block">Target Selesai:</span>
                <span className="font-bold text-tertiary font-mono">{trackResult.eta}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
