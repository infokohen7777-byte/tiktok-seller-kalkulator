import React, { useState } from 'react';
import { Eye, EyeOff, KeyRound } from 'lucide-react';
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  FirebaseError
} from 'firebase/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthError = (err: FirebaseError) => {
    switch (err.code) {
      case 'auth/invalid-email':
        setError('Format email tidak valid.');
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        setError('Email atau password salah.');
        break;
      case 'auth/email-already-in-use':
        setError('Email ini sudah terdaftar. Silakan login.');
        break;
      case 'auth/weak-password':
        setError('Password harus terdiri dari minimal 6 karakter.');
        break;
      default:
        setError('Terjadi kesalahan. Coba lagi nanti.');
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // onAuthStateChanged di App.tsx akan menangani navigasi
    } catch (err) {
      handleAuthError(err as FirebaseError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
            <KeyRound className="mx-auto h-12 w-auto text-cyan-600" />
            <h1 className="text-3xl font-bold text-slate-800 mt-4">Kalkulator Seller TikTok</h1>
            <p className="text-slate-600 mt-2">{isLogin ? 'Silakan login untuk melanjutkan' : 'Buat akun baru'}</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="anda@email.com"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password"className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-500" />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div>
              <Button type="submit" className="w-full justify-center" disabled={loading}>
                {loading ? 'Memproses...' : (isLogin ? 'Login' : 'Daftar')}
              </Button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-cyan-600 hover:text-cyan-500">
              {isLogin ? 'Daftar di sini' : 'Login di sini'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;