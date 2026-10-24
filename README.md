# Besor App - Frontend

Frontend aplikasi manajemen bengkel modern (Bengkel Ansor / Besor) berbasis React, TypeScript, TanStack Router, dan Tailwind CSS.

## 🚀 Fitur Utama

- **Landing Page Interaktif**: Desain modern, hero showcase, alur cara kerja zigzag interaktif dengan animasi scroll, testimoni pelanggan, dan portal terintegrasi.
- **Role Portal Customer**:
  - Telemetri & live status pengerjaan kendaraan (4-tahap visualizer).
  - Manajemen armada & buku servis digital.
  - Riwayat servis lengkap dengan rincian biaya & unduh faktur.
- **Role Portal Mekanik**:
  - Papan tugas Kanban (Tugas Baru, Dalam Pengerjaan, Menunggu QC).
  - Kokpit eksekusi pekerjaan dengan digital stopwatch / timer.
  - Checklist inspeksi interaktif dan verifikasi suku cadang.
- **Role Portal Admin**:
  - Executive Overview: Bento KPI card, grafik omset, kapasitas 8 bay servis.
  - Manajemen Reservasi & persetujuan booking masuk.
  - Perintah Kerja (SPK) digital & cetak SPK.
  - CRM Data Pelanggan, inventaris suku cadang, dan ringkasan keuangan.

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Routing**: TanStack Router (Modular Clean Code Architecture)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📦 Menjalankan Proyek

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Jalankan local development server**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

3. **Build untuk production**:
   ```bash
   npm run build
   ```
