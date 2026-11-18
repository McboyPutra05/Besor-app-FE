import React, { useState, useEffect } from 'react';
import RestockModal, { InventoryItemData } from '../../../components/modals/admin/RestockModal';
import NewSKUModal from '../../../components/modals/admin/NewSKUModal';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/client';

export default function AdminInventory() {
  const { showNotification } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  // Modals state
  const [selectedRestockItem, setSelectedRestockItem] = useState<InventoryItemData | null>(null);
  const [isNewSKUOpen, setIsNewSKUOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState<InventoryItemData[]>([
    {
      sku: 'TOT-9000-5W30',
      barcode: '899120938102',
      name: 'Oli Mesin Total Quartz 9000 5W-30 (4L)',
      brand: 'Total Energies (OEM Synthetic)',
      category: 'oli',
      location: 'Rak A-01 (Gudang Fluida)',
      stock: 38,
      minStock: 15,
      costPrice: 'Rp 380.000',
      sellPrice: 'Rp 520.000',
      status: 'Stok Aman',
    },
    {
      sku: 'HND-17220-5AA-A00',
      barcode: '899382910245',
      name: 'Filter Udara OEM Honda Genuine',
      brand: 'Honda Genuine Parts',
      category: 'filter',
      location: 'Rak B-03 (Filter)',
      stock: 4,
      minStock: 8,
      costPrice: 'Rp 95.000',
      sellPrice: 'Rp 145.000',
      status: 'Kritis / Menipis',
    },
    {
      sku: 'BRM-PAD-CRV-F',
      barcode: '899491029341',
      name: 'Brake Pad Kampas Rem Depan Ceramic',
      brand: 'Brembo Racing Edition',
      category: 'rem',
      location: 'Rak C-02 (Sistem Rem)',
      stock: 12,
      minStock: 5,
      costPrice: 'Rp 420.000',
      sellPrice: 'Rp 650.000',
      status: 'Stok Aman',
    },
    {
      sku: 'TMO-0W16-HYB-4L',
      barcode: '899201928301',
      name: 'Oli Toyota Motor Oil 0W-16 Hybrid (4L)',
      brand: 'Toyota Genuine OEM',
      category: 'oli',
      location: 'Rak A-02 (Hybrid Fluid)',
      stock: 22,
      minStock: 10,
      costPrice: 'Rp 410.000',
      sellPrice: 'Rp 580.000',
      status: 'Stok Aman',
    },
    {
      sku: 'NGK-LFR6AIX-11',
      barcode: '899810293847',
      name: 'Busi Iridium IX Laser High Performance (Set 4x)',
      brand: 'NGK Japan',
      category: 'kelistrikan',
      location: 'Rak D-01 (Ignition)',
      stock: 2,
      minStock: 6,
      costPrice: 'Rp 280.000',
      sellPrice: 'Rp 440.000',
      status: 'Kritis / Menipis',
    },
  ]);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/inventory');
      if (res.data?.inventory && res.data.inventory.length > 0) {
        const mapped: InventoryItemData[] = res.data.inventory.map((it: any) => {
          let category = 'umum';
          const nameLower = (it.name || '').toLowerCase();
          if (nameLower.includes('oli') || nameLower.includes('fluid')) category = 'oli';
          else if (nameLower.includes('filter')) category = 'filter';
          else if (nameLower.includes('rem') || nameLower.includes('brake')) category = 'rem';
          else if (nameLower.includes('busi') || nameLower.includes('aki') || nameLower.includes('lampu')) category = 'kelistrikan';

          const buyPriceFormatted = `Rp ${Number(it.buy_price || 0).toLocaleString('id-ID')}`;
          const sellPriceFormatted = `Rp ${Number(it.sell_price || 0).toLocaleString('id-ID')}`;

          return {
            sku: it.sku || `SKU-${it.id}`,
            barcode: `899${String(it.id).padStart(9, '0')}`,
            name: it.name,
            brand: 'Original Equipment Part',
            category,
            location: `Rak ${it.unit || 'A'}-01`,
            stock: Number(it.stock) || 0,
            minStock: Number(it.min_stock) || 5,
            costPrice: buyPriceFormatted,
            sellPrice: sellPriceFormatted,
            status: Number(it.stock) <= Number(it.min_stock) ? 'Kritis / Menipis' : 'Stok Aman',
          };
        });
        setItems(mapped);
      }
    } catch (err) {
      console.error('Failed to load inventory from API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleRestockSuccess = async (sku: string, addedQty: number, supplier: string) => {
    try {
      await api.post(`/admin/inventory/${sku}/restock`, { added_qty: addedQty, supplier });
    } catch (err) {
      console.warn('Backend restock error, updating local state:', err);
    }

    setItems((prev) =>
      prev.map((it) => {
        if (it.sku === sku) {
          const newStock = it.stock + addedQty;
          return {
            ...it,
            stock: newStock,
            status: newStock <= it.minStock ? 'Kritis / Menipis' : 'Stok Aman',
          };
        }
        return it;
      })
    );
    showNotification(`Restock +${addedQty} unit SKU ${sku} dari ${supplier} berhasil dicatat!`);
  };

  const handleAddNewSKU = async (newItem: InventoryItemData) => {
    try {
      await api.post('/admin/inventory', newItem);
    } catch (err) {
      console.warn('Backend SKU store error, adding to local list:', err);
    }

    setItems((prev) => [newItem, ...prev]);
    showNotification(`SKU Baru ${newItem.sku} (${newItem.name}) berhasil ditambahkan ke katalog!`);
  };

  const filtered = items.filter((it) => {
    const matchesSearch =
      it.name.toLowerCase().includes(search.toLowerCase()) ||
      it.sku.toLowerCase().includes(search.toLowerCase()) ||
      it.brand.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedCat === 'all') return true;
    return it.category === selectedCat;
  });

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1440px] mx-auto w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs uppercase font-bold text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs">
              Warehouse &amp; Supply Chain ERP
            </span>
            <span className="text-slate-400 font-mono text-xs font-semibold">348 SKU Aktif di Gudang</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Gudang &amp; Suku Cadang
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kontrol stok fisik otomatis, nomor seri komponen, dan peringatan batas buffer pengadaan (Reorder Point).
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewSKUOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[18px]">add_box</span>
          <span>Tambah SKU Baru</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Total SKU Terdaftar</div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">348 Item</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700 shadow-2xs">
            <span className="material-symbols-outlined text-[22px]">inventory_2</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Nilai Aset Gudang</div>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">Rp 284.5jt</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shadow-2xs">
            <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Stok Menipis (Warning)</div>
            <div className="text-2xl font-extrabold text-rose-600 font-mono mt-1">12 SKU</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200/60 flex items-center justify-center text-rose-600 shadow-2xs">
            <span className="material-symbols-outlined text-[22px]">warning</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Purchase Order (PO)</div>
            <div className="text-2xl font-extrabold text-blue-700 font-mono mt-1">3 Pending</div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700 shadow-2xs">
            <span className="material-symbols-outlined text-[22px]">local_shipping</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
          <input
            className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium transition-all"
            placeholder="Cari Kode SKU, Nama Suku Cadang, Merk/OEM, atau Barcode..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {['all', 'oli', 'filter', 'rem', 'kelistrikan'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize whitespace-nowrap cursor-pointer transition-all ${
                selectedCat === cat
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all'
                ? 'Semua Kategori'
                : cat === 'oli'
                ? 'Oli & Fluida'
                : cat === 'rem'
                ? 'Sistem Rem'
                : cat === 'filter'
                ? 'Filter OEM'
                : 'Kelistrikan'}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl shadow-xs overflow-hidden border border-slate-200/90">
        <div className="overflow-x-auto min-h-[420px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">SKU &amp; Barcode</th>
                <th className="py-4 px-6">Nama Suku Cadang &amp; Brand</th>
                <th className="py-4 px-6">Lokasi Rak</th>
                <th className="py-4 px-6">Stok Fisik vs Buffer</th>
                <th className="py-4 px-6">Harga Modal / Jual</th>
                <th className="py-4 px-6">Status Gudang</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-800">
              {filtered.map((item) => (
                <tr key={item.sku} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono text-xs">
                    <span className="font-bold text-blue-700 block">{item.sku}</span>
                    <span className="text-slate-400">{item.barcode}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-slate-900 block text-sm">{item.name}</span>
                    <span className="text-xs text-slate-400 font-medium">{item.brand}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 font-semibold">
                      <span className="material-symbols-outlined text-[15px] text-slate-400">shelves</span>
                      {item.location}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold font-mono text-sm text-slate-900">{item.stock} Unit</span>
                      <span className="text-xs text-slate-400 font-medium">(Min: {item.minStock})</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs">
                    <span className="font-extrabold text-slate-900 block text-sm">{item.sellPrice}</span>
                    <span className="text-slate-400 font-medium">Modal: {item.costPrice}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        item.status.includes('Kritis')
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status.includes('Kritis') ? 'bg-rose-600 animate-pulse' : 'bg-emerald-500'
                        }`}
                      ></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRestockItem(item)}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer"
                      >
                        Restock
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Modals */}
      <RestockModal
        isOpen={Boolean(selectedRestockItem)}
        onClose={() => setSelectedRestockItem(null)}
        item={selectedRestockItem}
        onRestockSuccess={handleRestockSuccess}
      />

      <NewSKUModal
        isOpen={isNewSKUOpen}
        onClose={() => setIsNewSKUOpen(false)}
        onSubmitSuccess={handleAddNewSKU}
      />
    </div>
  );
}
