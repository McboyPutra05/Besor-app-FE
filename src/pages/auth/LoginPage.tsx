import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { user, loginUser, showNotification } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'register' | 'otp'>('login');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState<string[]>(['8', '4', '2', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(59);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // If already logged in, redirect to matching portal
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate({ to: '/admin' });
      else if (user.role === 'mechanic') navigate({ to: '/mechanic' });
      else navigate({ to: '/customer' });
    }
  }, [user, navigate]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (mode === 'otp' && timerSeconds > 0) {
      const timer = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [mode, timerSeconds]);

  // Fill quick seeder account
  const fillSeeder = (role: 'admin' | 'mechanic' | 'customer') => {
    if (role === 'admin') {
      setEmail('admin@bengkel.com');
      setPassword('password123');
    } else if (role === 'mechanic') {
      setEmail('mekanik@bengkel.com');
      setPassword('password123');
    } else {
      setEmail('customer@bengkel.com');
      setPassword('password123');
    }
    setErrorMsg('');
  };

  // Handle Login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.post('/login', { email, password });
      loginUser(res.data.user);
      showNotification(`Selamat datang kembali, ${res.data.user.name}!`, 'success');

      if (res.data.user.role === 'admin') navigate({ to: '/admin' });
      else if (res.data.user.role === 'mechanic') navigate({ to: '/mechanic' });
      else navigate({ to: '/customer' });
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Email atau kata sandi tidak valid. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Register submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await api.post('/register', { name, email, password, phone });
      setMode('otp');
      setTimerSeconds(59);
      showNotification('Pendaftaran berhasil! Silakan masukkan 6 digit kode OTP verifikasi.', 'info');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Gagal melakukan pendaftaran. Periksa kembali format data Anda.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpCode.join('');
    if (code.length < 6) {
      setErrorMsg('Harap lengkapi 6 digit kode verifikasi OTP.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.post('/verify-otp', { email: email || 'ans***@gmail.com', otp: code });
      loginUser(res.data.user);
      showNotification('Verifikasi berhasil! Selamat datang di Bengkel Ansor.', 'success');
      navigate({ to: '/customer' });
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Kode OTP tidak valid atau kedaluwarsa. Gunakan kode simulasi 123456');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP individual input change
  const handleOtpKeyChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, '').slice(-1);
    const updated = [...otpCode];
    updated[index] = cleanVal;
    setOtpCode(updated);

    if (cleanVal && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
      otpInputsRef.current[index + 1]?.select();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const pasteClipboardDemo = () => {
    const demo = ['8', '4', '2', '9', '1', '5'];
    setOtpCode(demo);
    otpInputsRef.current[5]?.focus();
  };

  return (
    <main className="min-h-screen w-full bg-surface">
      <div className="flex flex-col w-full">
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-surface">
          {/* Left Panel: Branding & Trust Layer (Corporate Navy) */}
          <div className="w-full lg:w-1/2 bg-inverse-surface text-inverse-on-surface flex flex-col justify-between p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Ambient Graphic Backdrops */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-tertiary-container/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Top Branding Section */}
            <div className="relative z-10">
              <div 
                onClick={() => navigate({ to: '/' })}
                className="flex items-center gap-3 cursor-pointer group w-fit"
                title="Kembali ke Beranda"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[26px]">car_repair</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-inverse-on-surface font-bold">
                    Bengkel Ansor
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary-fixed-dim uppercase tracking-widest font-mono">
                    Auto Service &amp; Tech
                  </span>
                </div>
              </div>

              <div className="mt-12 lg:mt-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-highest/10 text-primary-fixed text-label-sm font-medium backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>
                Workshop Telemetry &amp; Auth Portal
              </div>
            </div>

            {/* Middle Testimonial / Value Block */}
            <div className="relative z-10 my-12 lg:my-0 max-w-xl">
              <span
                className="material-symbols-outlined text-4xl text-primary-fixed-dim opacity-70 mb-4 block"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                format_quote
              </span>
              <blockquote className="font-headline-lg text-headline-lg font-semibold leading-snug tracking-tight text-white mb-6">
                “Transparansi dan ketelitian servis Bengkel Ansor mengubah cara kami merawat kendaraan keluarga kami dengan tenang.”
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-800 ring-2 ring-primary-container">
                  <img
                    className="w-full h-full object-cover"
                    alt="Ir. Hendra Prasetya"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZwu2LA_J6Dv0-7rVE7vSF6TuJAXtM4OFtlZDHDdGMHL1ET1QS8tUhwM9XIZ1Un3W5EoQHNIrKwiLW102kaAjUI33U4arg1wBIZJTVCWuJ_Db3TIekhZyRtmkYRZgghpl4KtKx9UeUnKBmSiabvLVTpUOZnV2DqpGbV0qslvBF313BQbeKhJ8e_v7alF27Zyx-f-XVFNDrpyV62B4Z1GQiO_WfxFHSq9aCISfHLq6h5xdGdfKON-xk"
                  />
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm font-semibold text-white">
                    Ir. Hendra Prasetya
                  </h4>
                  <p className="font-body-sm text-body-sm text-secondary-fixed-dim">
                    Pelanggan Setia sejak 2021 • Armada Fleet &amp; Keluarga
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Trust Badges */}
            <div className="relative z-10 pt-8 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-tertiary-fixed text-2xl">verified_user</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-white font-medium">Keamanan Data 256-Bit</p>
                    <p className="font-body-sm text-body-sm text-secondary-fixed-dim">SSL Terenkripsi Penuh</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-primary-fixed text-2xl">bolt</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-white font-medium">Verifikasi Instan</p>
                    <p className="font-body-sm text-body-sm text-secondary-fixed-dim">WhatsApp &amp; Email Gateway</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Form & OTP Verification View */}
          <div className="w-full lg:w-1/2 bg-surface-container-lowest flex items-center justify-center p-6 sm:p-12 lg:p-16">
            <div className="w-full max-w-md mx-auto flex flex-col justify-center">
              {/* Status & Return Link */}
              <div className="flex items-center justify-between mb-8">
                {mode === 'otp' ? (
                  <button
                    onClick={() => {
                      setMode('login');
                      setErrorMsg('');
                    }}
                    className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition font-body-sm text-body-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span>Kembali ke Login</span>
                  </button>
                ) : mode === 'register' ? (
                  <button
                    onClick={() => {
                      setMode('login');
                      setErrorMsg('');
                    }}
                    className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition font-body-sm text-body-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span>Kembali ke Login</span>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate({ to: '/' })}
                    className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition font-body-sm text-body-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span>Kembali ke Beranda</span>
                  </button>
                )}

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  {mode === 'otp' ? 'Tahap 2 dari 2' : 'Tahap 1 dari 2'}
                </div>
              </div>

              {/* Dynamic Header */}
              <div className="mb-8">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center mb-5 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">
                    {mode === 'otp' ? 'mark_email_read' : mode === 'register' ? 'person_add' : 'lock_open'}
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight mb-2">
                  {mode === 'otp'
                    ? 'Cek Email & WhatsApp Anda'
                    : mode === 'register'
                    ? 'Pendaftaran Akun Baru'
                    : 'Masuk ke Portal Bengkel'}
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {mode === 'otp' ? (
                    <>
                      Kami telah mengirimkan 6 digit kode keamanan ke{' '}
                      <span className="font-medium text-on-surface font-mono">{email || 'ans***@gmail.com'}</span> dan{' '}
                      <span className="font-medium text-on-surface font-mono">{phone || '+62 812-****-7890'}</span>
                    </>
                  ) : mode === 'register' ? (
                    'Daftarkan akun pelanggan Anda untuk memantau status servis real-time dan buku garansi digital.'
                  ) : (
                    'Akses portal monitoring servis, work order mekanik, atau konsol manajemen admin.'
                  )}
                </p>
              </div>

              {/* Error Message Alert */}
              {errorMsg && (
                <div className="mb-6 p-3.5 rounded-xl bg-error-container/40 border border-error/20 text-on-error-container text-body-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-lg shrink-0">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* MODE 1: OTP VIEW */}
              {mode === 'otp' ? (
                <div>
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                          Kode Verifikasi (OTP)
                        </label>
                        <span
                          className="font-label-code text-label-code text-primary cursor-pointer hover:underline"
                          onClick={pasteClipboardDemo}
                        >
                          Tempel Kode
                        </span>
                      </div>
                      {/* 6 Discrete Inputs */}
                      <div className="grid grid-cols-6 gap-2 sm:gap-3" id="otp-container">
                        {otpCode.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => { otpInputsRef.current[idx] = el; }}
                            className="otp-input w-full h-14 sm:h-16 text-center font-label-plate text-2xl font-bold bg-surface-container-low text-on-surface rounded-lg border border-outline-variant/60 focus:border-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            maxLength={1}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpKeyChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            placeholder="•"
                          />
                        ))}
                      </div>
                      <p className="mt-2.5 flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                        <span className="material-symbols-outlined text-sm text-secondary">info</span>
                        Jangan bagikan kode verifikasi ini kepada siapapun termasuk staf teknisi.
                      </p>
                    </div>

                    <button
                      className="w-full py-3.5 px-4 bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold rounded-lg shadow-md shadow-primary-container/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      type="submit"
                      disabled={loading}
                    >
                      <span>{loading ? 'Memverifikasi...' : 'Verifikasi & Masuk'}</span>
                      <span className="material-symbols-outlined text-xl">login</span>
                    </button>
                  </form>

                  {/* Resend Countdown and Alternative Actions */}
                  <div className="mt-8 space-y-4 text-center">
                    <div className="py-2.5 px-3 rounded-lg bg-surface-container-low flex items-center justify-center gap-2">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Tidak menerima kode?</span>
                      <button
                        className="font-body-sm text-body-sm font-semibold text-primary hover:underline transition inline-flex items-center gap-1 disabled:opacity-50"
                        id="resend-btn"
                        type="button"
                        disabled={timerSeconds > 0}
                        onClick={() => {
                          setTimerSeconds(59);
                          showNotification('Kode OTP baru telah dikirimkan ke nomor Anda.', 'info');
                        }}
                      >
                        <span>Kirim ulang kode</span>
                        <span className="font-label-code text-label-code font-bold text-secondary" id="timer">
                          {timerSeconds > 0 ? `(00:${timerSeconds < 10 ? '0' + timerSeconds : timerSeconds})` : '(Kirim Sekarang)'}
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-4 pt-2 font-body-sm text-body-sm text-on-surface-variant">
                      <button
                        onClick={() => setMode('register')}
                        className="hover:text-primary transition flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-base">phone_iphone</span>
                        Gunakan nomor telepon lain
                      </button>
                      <span className="text-outline-variant">•</span>
                      <a className="hover:text-primary transition flex items-center gap-1" href="https://wa.me/628123456789" target="_blank" rel="noreferrer">
                        <span className="material-symbols-outlined text-base">support_agent</span>
                        Bantuan Pelanggan
                      </a>
                    </div>
                  </div>
                </div>
              ) : mode === 'register' ? (
                /* MODE 2: REGISTER VIEW */
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-lg">
                        person
                      </span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Dimas Ansori"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant/60 bg-surface-container-low text-on-surface text-body-md focus:bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                      Nomor WhatsApp
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-lg">
                        call
                      </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="081234567890"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant/60 bg-surface-container-low text-on-surface text-body-md focus:bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-lg">
                        mail
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant/60 bg-surface-container-low text-on-surface text-body-md focus:bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                      Kata Sandi (Password)
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-lg">
                        lock
                      </span>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimal 6 karakter"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant/60 bg-surface-container-low text-on-surface text-body-md focus:bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    className="w-full py-3.5 px-4 bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold rounded-lg shadow-md shadow-primary-container/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-6"
                    type="submit"
                    disabled={loading}
                  >
                    <span>{loading ? 'Memproses Data...' : 'Daftar & Minta OTP'}</span>
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>

                  <div className="pt-4 text-center">
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Sudah punya akun?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setErrorMsg('');
                        }}
                        className="font-semibold text-primary hover:underline"
                      >
                        Masuk di sini
                      </button>
                    </p>
                  </div>
                </form>
              ) : (
                /* MODE 3: LOGIN VIEW */
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-lg">
                        mail
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@bengkel.com"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant/60 bg-surface-container-low text-on-surface text-body-md focus:bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                        Kata Sandi
                      </label>
                      <a href="#reset" className="font-label-sm text-label-sm text-primary hover:underline">
                        Lupa Sandi?
                      </a>
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-lg">
                        lock
                      </span>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant/60 bg-surface-container-low text-on-surface text-body-md focus:bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    className="w-full py-3.5 px-4 bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold rounded-lg shadow-md shadow-primary-container/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                    type="submit"
                    disabled={loading}
                  >
                    <span>{loading ? 'Memverifikasi...' : 'Masuk ke Portal'}</span>
                    <span className="material-symbols-outlined text-xl">login</span>
                  </button>

                  {/* Quick Seeder Switcher */}
                  <div className="pt-4 border-t border-outline-variant/30 mt-4">
                    <p className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold text-center mb-2.5">
                      ⚡ Akun Uji Coba Cepat (Klik untuk isi instan):
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => fillSeeder('admin')}
                        className="py-2 px-2 rounded-lg bg-surface-container text-on-primary-fixed-variant font-label-sm text-xs font-bold hover:bg-primary-fixed/40 transition-colors flex items-center justify-center gap-1 border border-primary-fixed"
                      >
                        <span className="material-symbols-outlined text-sm text-primary">shield_person</span>
                        Admin
                      </button>
                      <button
                        type="button"
                        onClick={() => fillSeeder('mechanic')}
                        className="py-2 px-2 rounded-lg bg-surface-container text-on-secondary-fixed-variant font-label-sm text-xs font-bold hover:bg-secondary-container transition-colors flex items-center justify-center gap-1 border border-secondary-container"
                      >
                        <span className="material-symbols-outlined text-sm text-secondary">build</span>
                        Mekanik
                      </button>
                      <button
                        type="button"
                        onClick={() => fillSeeder('customer')}
                        className="py-2 px-2 rounded-lg bg-surface-container text-on-tertiary-fixed-variant font-label-sm text-xs font-bold hover:bg-tertiary-container/20 transition-colors flex items-center justify-center gap-1 border border-tertiary-fixed"
                      >
                        <span className="material-symbols-outlined text-sm text-tertiary">directions_car</span>
                        Customer
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Belum memiliki akun pelanggan?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('register');
                          setErrorMsg('');
                        }}
                        className="font-semibold text-primary hover:underline"
                      >
                        Daftar Akun Baru
                      </button>
                    </p>
                  </div>
                </form>
              )}

              {/* Quick Trust/Workshop Footer Note */}
              <div className="mt-12 pt-6 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant/80 border-t border-outline-variant/30">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-tertiary">lock</span>
                  Sesi Aman Workshop TLS 1.3
                </div>
                <div className="font-mono">ID: BKL-AUTH-8821</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
