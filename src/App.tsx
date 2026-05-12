import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Truck, 
  Lightbulb, 
  Cpu, 
  ChevronRight, 
  Menu, 
  X, 
  CheckCircle2, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ArrowRight
} from 'lucide-react';

const navLinks = [
  { name: 'Beranda', href: '#home' },
  { name: 'Tentang Kami', href: '#about' },
  { name: 'Lini Bisnis', href: '#business' },
  { name: 'Pencapaian', href: '#achievements' },
  { name: 'Hubungi Kami', href: '#contact' },
];

const businesses = [
  {
    title: 'Konstruksi & Infrastruktur',
    description: 'Membangun konektivitas darat dan laut untuk pertumbuhan ekonomi berkelanjutan dan infrastruktur berkualitas terdepan.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1541888081498-8837e28942b0?auto=format&fit=crop&q=80',
  },
  {
    title: 'Logistik & Distribusi',
    description: 'Optimasi distribusi nasional dengan sistem manajemen pergudangan cerdas memastikan pengiriman aman dan efisien.',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663e0?auto=format&fit=crop&q=80',
  },
  {
    title: 'Energi Terbarukan',
    description: 'Memanfaatkan potensi alam Indonesia untuk kemandirian energi masa depan dan pengelolaan lestari berwawasan lingkungan.',
    icon: Lightbulb,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80',
  },
  {
    title: 'Teknologi & Pertahanan',
    description: 'Penyedia solusi keamanan strategis dan teknologi pertahanan berstandar tinggi untuk meningkatkan daya saing negeri.',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
  },
];

const stats = [
  { value: '15+', label: 'Tahun Pengalaman' },
  { value: '150+', label: 'Proyek Selesai' },
  { value: '50+', label: 'Mitra Bisnis' },
  { value: '1000+', label: 'Karyawan Profesional' },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white font-sans flex flex-col font-medium overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 border-b border-white/5 ${
          isScrolled ? 'bg-corporate-950/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-corporate-500 rounded-sm flex items-center justify-center font-bold text-corporate-950 text-xl">A</div>
              <span className="text-xl font-bold tracking-tighter uppercase whitespace-nowrap">
                Laskar Ababil <span className="text-corporate-500">Group</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex space-x-8 text-xs uppercase tracking-widest font-bold opacity-80">
              {navLinks.map((link, idx) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`transition-colors hover:text-corporate-500 hover:opacity-100 ${idx === 0 ? 'text-corporate-500 opacity-100' : 'text-white/80' }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-white hover:text-corporate-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-corporate-950 pt-28 px-8 lg:hidden border-b border-white/10 overflow-y-auto"
          >
            <div className="flex flex-col space-y-8 pb-12">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-black uppercase tracking-tighter text-white hover:text-corporate-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
            alt="Corporate Building" 
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-corporate-950 via-corporate-950/90 to-corporate-950/60" />
        </div>
        
        {/* Giant Background Text */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none hidden md:block">
          <h1 className="text-[200px] lg:text-[300px] font-black leading-none uppercase tracking-tighter">ABABIL</h1>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="max-w-3xl"
           >
             <div className="flex items-center gap-4 mb-8">
               <div className="h-[1px] w-12 bg-corporate-500"></div>
               <span className="text-corporate-500 uppercase tracking-[0.3em] text-sm font-semibold">Profil Perusahaan Nasional</span>
             </div>
             
             <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8">
               Membangun <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Masa Depan</span> <br className="hidden md:block"/> Negeri.
             </h1>
             
             <p className="max-w-xl text-lg text-slate-400 font-light leading-relaxed mb-12">
               Laskar Ababil Group adalah konglomerat multi-industri terkemuka yang berdedikasi pada keunggulan operasional dan standar integritas tertinggi di Indonesia.
             </p>
             
             <div className="flex flex-wrap gap-4">
               <a href="#about" className="px-8 py-5 bg-corporate-500 text-corporate-950 font-bold uppercase tracking-wider text-sm hover:bg-corporate-400 transition-colors text-center">
                 Unduh Company Profile
               </a>
               <a href="#business" className="px-8 py-5 border border-white/20 font-bold uppercase tracking-wider text-sm hover:bg-white/5 transition-colors text-center">
                 Eksplorasi Sektor Bisnis
               </a>
             </div>
           </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-8 bg-corporate-500"></div>
                <span className="text-corporate-500 uppercase tracking-[0.2em] text-xs font-bold">Tentang Kami</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                Dedikasi untuk <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Keunggulan</span>
              </h3>
              
              <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg mb-10">
                <p>
                  Berdiri sejak lebih dari satu dekade lalu, Laskar Ababil Group telah berkembang menjadi salah satu grup holding terkemuka di Indonesia. Kami beroperasi melalui anak perusahaan yang solid dalam berbagai sektor inti.
                </p>
                <p>
                  Kami percaya pada standar operasional tertinggi, kepatuhan terhadap regulasi nasional, serta komitmen penuh terhadap keselamatan, kualitas, dan inovasi berwawasan lingkungan.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  'Manajemen Mutu ISO 9001:2015',
                  'Sertifikasi Standar Nasional Indonesia',
                  'Komitmen Keberlanjutan Lingkungan'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border border-white/10 bg-white/5">
                    <div className="w-2 h-2 rounded-full bg-corporate-500 shrink-0"></div>
                    <span className="font-bold text-sm tracking-wider uppercase text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative"
            >
              <div className="aspect-[4/5] object-cover rounded-none relative overflow-hidden bg-corporate-900 border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
                  alt="Tim Profesional" 
                  className="w-full h-full object-cover grayscale opacity-80 mix-blend-lighten"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-corporate-950 via-transparent to-transparent"></div>
              </div>
              
              {/* Badge Overlay */}
              <div className="absolute -bottom-12 -left-12 bg-corporate-500 p-10 border-[8px] border-corporate-950 hidden md:block">
                <div className="font-black text-6xl tracking-tighter mb-2 text-corporate-950 leading-none">15<span className="text-4xl text-corporate-900">+</span></div>
                <div className="text-corporate-950 uppercase tracking-[0.2em] font-bold text-xs ">Tahun Dedikasi <br/> Membangun Negeri</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Lines Section with Grid from Design */}
      <section id="business" className="border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {businesses.map((business, index) => (
            <div key={index} className={`p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/10 group relative overflow-hidden transition-colors hover:bg-white/5 ${index % 2 === 0 ? 'bg-white/5 lg:bg-transparent lg:hover:bg-white/5' : 'bg-transparent'}`}>
              
              <span className="text-xs text-corporate-500 font-bold block mb-6 uppercase tracking-tighter">
                0{index + 1}. {business.title.split(' ')[0]}
              </span>
              
              <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-corporate-500 group-hover:to-corporate-300 transition-all">
                {business.title}
              </h3>
              
              <p className="text-sm text-slate-400 font-light leading-relaxed mb-8">
                {business.description}
              </p>
              
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-corporate-500 group-hover:text-corporate-950 group-hover:border-corporate-500 transition-all duration-300">
                <ArrowRight size={20} />
              </div>
              
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section id="achievements" className="py-24 bg-corporate-500 text-corporate-950 border-t border-white/10">
         <div className="max-w-7xl mx-auto px-6 sm:px-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-corporate-950/20">
             {stats.map((stat, index) => (
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.4, delay: index * 0.1 }}
                 className="text-center px-4 pt-8 md:pt-0"
               >
                 <div className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">{stat.value}</div>
                 <div className="text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative border-t border-white/10 overflow-hidden">
        {/* Background Accent */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-white/[0.02] -skew-x-12 transform origin-top hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-8 bg-corporate-500"></div>
                <span className="text-corporate-500 uppercase tracking-[0.2em] text-xs font-bold">Kemitraan</span>
              </div>
              
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                Mari Bangun <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Masa Depan</span>
              </h3>
              
              <p className="text-slate-400 font-light leading-relaxed text-lg mb-12 max-w-md">
                Tim profesional kami siap membantu Anda. Hubungi kami untuk informasi lebih lanjut mengenai layanan dan peluang kolaborasi strategis di Laskar Ababil Group.
              </p>

              <div className="space-y-10">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-corporate-500 uppercase tracking-widest font-bold">Kantor Pusat</span>
                  <span className="text-sm font-medium text-white max-w-xs leading-relaxed">
                    Gedung Laskar Ababil Tower, Lt. 15<br/>Jl. Jend. Sudirman Kav. 45<br/>Jakarta Selatan, 12920
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-corporate-500 uppercase tracking-widest font-bold">Kontak Langsung</span>
                  <span className="text-sm font-medium text-white flex flex-col gap-1">
                    <span>+62 21 5550 1234</span>
                    <span>info@laskarababil.co.id</span>
                  </span>
                </div>
              </div>
            </div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-white/5 p-10 lg:p-14 border border-white/10"
            >
              <h4 className="text-2xl font-black uppercase tracking-tighter mb-8">Kirim Pesan</h4>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[10px] text-white/50 uppercase tracking-widest font-bold mb-3">Nama Lengkap</label>
                    <input type="text" id="name" className="w-full px-5 py-4 bg-transparent border border-white/20 focus:border-corporate-500 outline-none transition-colors text-white text-sm" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] text-white/50 uppercase tracking-widest font-bold mb-3">Alamat Email</label>
                    <input type="email" id="email" className="w-full px-5 py-4 bg-transparent border border-white/20 focus:border-corporate-500 outline-none transition-colors text-white text-sm" placeholder="email@perusahaan.com" />
                  </div>
                </div>
                <div>
                    <label htmlFor="subject" className="block text-[10px] text-white/50 uppercase tracking-widest font-bold mb-3">Keperluan</label>
                    <input type="text" id="subject" className="w-full px-5 py-4 bg-transparent border border-white/20 focus:border-corporate-500 outline-none transition-colors text-white text-sm" placeholder="Penawaran Kolaborasi Bisnis" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[10px] text-white/50 uppercase tracking-widest font-bold mb-3">Pesan</label>
                  <textarea id="message" rows={4} className="w-full px-5 py-4 bg-transparent border border-white/20 focus:border-corporate-500 outline-none transition-colors text-white text-sm resize-none" placeholder="Tuliskan detail pesan Anda..."></textarea>
                </div>
                <button type="submit" className="w-full bg-corporate-500 hover:bg-corporate-400 text-corporate-950 font-bold uppercase tracking-wider text-sm py-5 transition-colors flex items-center justify-center gap-3">
                  Kirim Pesan Sekarang <ArrowRight size={18} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer / Status Bar - Matching Design */}
      <footer className="px-6 sm:px-12 py-8 bg-black/40 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10">
        <div className="flex flex-wrap justify-center gap-12">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Sertifikasi</span>
            <span className="text-xs font-bold tracking-wider">ISO 9001:2015 Quality Management</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Operasional</span>
            <span className="text-xs font-bold tracking-wider">34 Provinsi Indonesia</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Status Keamanan</span>
            <span className="text-xs font-bold tracking-wider text-corporate-500">Terjamin Optimal</span>
          </div>
        </div>
        <div className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold text-center md:text-right">
          &copy; {new Date().getFullYear()} Laskar Ababil Group.<br className="md:hidden"/> Seluruh Hak Cipta Dilindungi.
        </div>
      </footer>
    </div>
  );
}
