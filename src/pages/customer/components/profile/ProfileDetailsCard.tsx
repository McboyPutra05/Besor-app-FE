import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Save, CheckCircle2 } from 'lucide-react';
import api from '@/api/client';

export default function ProfileDetailsCard() {
  const { user, loginUser, showNotification } = useAuth();
  const [name, setName] = useState(user?.name || 'Dimas Ansori');
  const [email, setEmail] = useState(user?.email || 'customer@bengkel.com');
  const [phone, setPhone] = useState(user?.phone || '0812-9988-7711');
  const [birthDate, setBirthDate] = useState(user?.birth_date || '1990-05-14');
  const [address, setAddress] = useState(user?.address || 'Jl. Margonda Raya No. 45, Beji, Kota Depok');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.name) setName(user.name);
      if (user.email) setEmail(user.email);
      if (user.phone) setPhone(user.phone);
      if (user.birth_date) setBirthDate(user.birth_date);
      if (user.address) setAddress(user.address);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/customer/profile', {
        user_id: user?.id,
        name,
        phone,
        address,
        birth_date: birthDate,
      });
      if (res.data?.user) {
        loginUser(res.data.user);
      }
      showNotification('Profil pelanggan berhasil diperbarui!', 'success');
    } catch (err: any) {
      showNotification(err.response?.data?.message || 'Gagal memperbarui profil.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="rounded-3xl border border-slate-200/90 shadow-xs bg-white overflow-hidden">
      <CardHeader className="p-6 pb-4 border-b border-slate-100 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-blue-500/30">
            <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              Informasi Pribadi &amp; Kontak
            </CardTitle>
            <p className="text-xs text-slate-500">Kelola data pemilik armada kendaraan</p>
          </div>
        </div>
        <Badge className="bg-blue-50 text-blue-700 border-blue-200/80 text-xs font-bold">
          Terverifikasi
        </Badge>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold text-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5">Nama Lengkap</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9 h-10 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5">Alamat Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-10 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5">Nomor WhatsApp Aktif</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-9 h-10 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5">Tanggal Lahir</label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="pl-9 h-10 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">Alamat Domisili (Untuk Home Service)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 resize-none font-normal"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 px-5 gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
