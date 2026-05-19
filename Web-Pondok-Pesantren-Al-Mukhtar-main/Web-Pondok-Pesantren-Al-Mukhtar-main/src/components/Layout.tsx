import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Info, BookOpen, Layers, GraduationCap, Image as ImageIcon, FormInput, Newspaper, Phone, Instagram, Facebook, Youtube, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimatePresence, motion } from 'motion/react';

export default function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when location changes or on resize to desktop
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Beranda', path: '/', icon: Home },
    { name: 'Tentang', path: '/tentang', icon: Info },
    { name: 'Kajian', path: '/unit-kajian', icon: BookOpen },
    { name: 'Program', path: '/unit-program', icon: Layers },
    { name: 'Pendidikan', path: '/unit-pendidikan', icon: GraduationCap },
    { name: 'Galeri', path: '/galeri', icon: ImageIcon },
    { name: 'Daftar', path: '/pendaftaran', icon: FormInput },
    { name: 'Berita', path: '/berita', icon: Newspaper },
    { name: 'Kontak', path: '/kontak', icon: Phone },
  ];

  return (
    <div className="min-h-screen min-w-[1024px] bg-neutral-50 flex flex-col font-sans">
      {/* Top Header & Navigation */}
      <div className="sticky top-0 z-50 bg-[#164e3b] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between min-w-[1024px]">
            <Link to="/" className="text-xl font-bold whitespace-nowrap">
              Al Mukhtar
            </Link>
            
            {/* Desktop Navigation */}
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all",
                      isActive ? "bg-[#0d3426] text-[#d4af37] font-medium" : "text-green-50 hover:bg-[#0d3426] hover:text-white"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", isActive ? "stroke-[2.5px]" : "stroke-2")} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                )
              })}
              <Link to="/admin/login" className="ml-2 text-xs font-semibold bg-[#0d3426] hover:bg-[#0a271c] px-3 py-2 rounded-full text-white border border-green-800 transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (removed per desktop basis) */}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#164e3b] text-white py-12 mt-auto border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Branding & Vision */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#d4af37]">Pondok Pesantren Al Mukhtar</h3>
              <p className="text-sm text-green-100/80 leading-relaxed">
                Menjaga Tradisi Lama Yang Baik & Mengambil Tradisi Baru Yang Lebih Baik. Mencetak Generasi Kreatif, Inovatif, Mandiri, dan Berakhlak Mulia.
              </p>
            </div>

            {/* Sitemap */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#d4af37]">Media PonPes</h4>
              <ul className="space-y-2 text-sm text-green-100/80">
                <li><Link to="/" className="hover:text-white transition-colors">Beranda</Link></li>
                <li><Link to="/tentang" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                <li><Link to="/unit-kajian" className="hover:text-white transition-colors">Unit Kajian</Link></li>
                <li><Link to="/unit-program" className="hover:text-white transition-colors">Unit Program</Link></li>
                <li><Link to="/unit-pendidikan" className="hover:text-white transition-colors">Unit Pendidikan</Link></li>
                <li><Link to="/galeri" className="hover:text-white transition-colors">Galeri</Link></li>
                <li><Link to="/berita" className="hover:text-white transition-colors">Berita</Link></li>
              </ul>
            </div>

            {/* Link Penting */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#d4af37]">Pendaftaran</h4>
              <ul className="space-y-2 text-sm text-green-100/80">
                <li><Link to="/pendaftaran" className="hover:text-white transition-colors">Pendaftaran Santri Baru</Link></li>
              </ul>
            </div>

            {/* Kontak & Lokasi */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#d4af37]">Kontak & Lokasi</h4>
              <ul className="space-y-2 text-sm text-green-100/80">
                <li>Jl. Mangga No. 35 RT 03 RW 11</li>
                <li>Desa Penggalang, Adipala, Cilacap</li>
                <li>Jawa Tengah, 53271</li>
                <li className="pt-2">Telp: (0282) 123456</li>
                <li>Email: info@almukhtar.id</li>
              </ul>
              
              <div className="mt-4">
                <h4 className="text-base font-bold mb-2 text-[#d4af37]">Media Sosial</h4>
                <div className="flex space-x-4 text-green-100/80">
                  <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-green-800/50 text-center space-y-2">
            <p className="text-sm text-green-100/80">
              © 2026. Dilindungi Hak Cipta.
            </p>
            <div className="text-sm sm:text-base text-[#d4af37] font-semibold">
              Created By Thoif Khasan
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
