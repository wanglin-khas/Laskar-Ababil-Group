import React, { useState, useRef, useEffect } from 'react';
import { useStore, RegistrationData, WebContent, UserData } from '../store';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, XCircle, Clock, Eye, Download, LogOut, LayoutDashboard, 
  Users, Home as HomeIcon, Info, BookOpen, Layers, GraduationCap, 
  Image as ImageIcon, Newspaper, Menu, X, Edit, Share2, FileText, Save,
  ClipboardList, UserPlus, Trash2, Calendar, User as UserIcon, Shield, 
  ChevronLeft, ChevronRight, Terminal, Plus
} from 'lucide-react';
import jsPDF from 'jspdf';
import { motion, AnimatePresence } from 'motion/react';
import { compressImage } from '../lib/imageUtils';

import Pendaftaran from './Pendaftaran';

export default function AdminDashboard() {
  const registrations = useStore((state) => state.registrations);
  const updateStatus = useStore((state) => state.updateStatus);
  const updateRegistration = useStore((state) => state.updateRegistration);
  const webContent = useStore((state) => state.webContent);
  const updateWebContent = useStore((state) => state.updateWebContent);
  const jadwalPendaftaran = useStore((state) => state.jadwalPendaftaran);
  const updateJadwal = useStore((state) => state.updateJadwal);
  const users = useStore((state) => state.users);
  const addUser = useStore((state) => state.addUser);
  const updateUser = useStore((state) => state.updateUser);
  const deleteUser = useStore((state) => state.deleteUser);
  const logoutAdmin = useStore((state) => state.logoutAdmin);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedReg, setSelectedReg] = useState<RegistrationData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isEditingReg, setIsEditingReg] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<RegistrationData>>({});

  const [isEditingJadwal, setIsEditingJadwal] = useState(false);
  const [jadwalForm, setJadwalForm] = useState(jadwalPendaftaran);

  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userForm, setUserForm] = useState<Partial<UserData>>({});

  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedReg && detailRef.current && window.innerWidth < 1024) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedReg, activeTab]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const exportPDF = () => {
    if (!selectedReg) return;
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(16);
    doc.text("PONDOK PESANTREN AL MUKHTAR", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("FORMULIR PENDAFTARAN SANTRI BARU", 105, 30, { align: "center" });
    doc.setFontSize(10);
    doc.text(`ID: ${selectedReg.id}`, 20, 45);
    doc.text(`Nama: ${selectedReg.nama}`, 20, 55);
    doc.text(`NIK: ${selectedReg.nik}`, 20, 65);
    doc.text(`Jalur: ${selectedReg.jalurPendidikan}`, 20, 75);
    doc.text(`Alamat: ${selectedReg.alamat}`, 20, 85);
    doc.save(`Pendaftaran_${selectedReg.nama}.pdf`);
  };

  const shareWhatsApp = (reg?: RegistrationData) => {
    const dataReg = reg || selectedReg;
    if (!dataReg) return;
    const text = `Halo, saya admin PP Al Mukhtar. Data pendaftaran atas nama ${dataReg.nama} telah kami terima. Status saat ini: ${dataReg.status.toUpperCase()}.`;
    window.open(`https://wa.me/${dataReg.noTelfon}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const exportAllPDF = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(16);
    doc.text("DAFTAR SELURUH PENDAFTAR SANTRI BARU", 148, 20, { align: "center" });
    doc.setFontSize(10);
    
    let y = 40;
    doc.text("NR", 10, y);
    doc.text("NAMA", 20, y);
    doc.text("NIK", 80, y);
    doc.text("JALUR", 120, y);
    doc.text("TELFON", 160, y);
    doc.text("STATUS", 200, y);
    
    y += 10;
    registrations.forEach((reg, i) => {
      if (y > 180) {
        doc.addPage();
        y = 20;
      }
      doc.text(`${i + 1}`, 10, y);
      doc.text(reg.nama, 20, y);
      doc.text(reg.nik, 80, y);
      doc.text(reg.jalurPendidikan, 120, y);
      doc.text(reg.noTelfon, 160, y);
      doc.text(reg.status, 200, y);
      y += 8;
    });
    
    doc.save(`Semua_Pendaftar_${new Date().getTime()}.pdf`);
  };

  const shareAllWhatsApp = () => {
    const text = `Rekap Pendaftaran PP Al Mukhtar:\nTotal: ${registrations.length}\nVerified: ${registrations.filter(r => r.status === 'verified').length}\n\nList:\n` + 
      registrations.map((r, i) => `${i+1}. ${r.nama} (${r.status})`).join('\n');
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const exportDashboardPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(16);
    doc.text("REKAP PENDAFTARAN SANTRI BARU", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Total Pendaftar: ${registrations.length}`, 20, 40);
    doc.text(`Terverifikasi: ${registrations.filter(r => r.status === 'verified').length}`, 20, 50);
    doc.save(`Rekap_Dashboard_${new Date().getTime()}.pdf`);
  };

  const fileToBase64 = async (file: File): Promise<string> => {
    if (file.type.startsWith('image/')) {
      return await compressImage(file, 1200, 0.7); // Slightly higher for admin dashboard content
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const saveEditRegistration = () => {
    if (selectedReg && editFormData) {
      updateRegistration(selectedReg.id, editFormData);
      setSelectedReg({ ...selectedReg, ...editFormData } as RegistrationData);
      setIsEditingReg(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="inline-flex items-center border border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_8px_rgba(16,185,129,0.4)] px-2 py-1 rounded text-[10px] font-bold text-emerald-400 uppercase tracking-widest"><CheckCircle className="w-3 h-3 mr-1" /> VERIFIED</span>;
      case 'rejected':
        return <span className="inline-flex items-center border border-red-500/50 bg-red-500/10 shadow-[0_0_8px_rgba(239,68,68,0.4)] px-2 py-1 rounded text-[10px] font-bold text-red-400 uppercase tracking-widest"><XCircle className="w-3 h-3 mr-1" /> REJECTED</span>;
      default:
        return <span className="inline-flex items-center border border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_8px_rgba(6,182,212,0.4)] px-2 py-1 rounded text-[10px] font-bold text-cyan-400 uppercase tracking-widest"><Clock className="w-3 h-3 mr-1" /> PENDING</span>;
    }
  };

  const menuGroups = [
    {
      title: 'PSB',
      items: [
        { id: 'dashboard', label: 'Dashboard Statistik', icon: LayoutDashboard },
        { id: 'jadwal-pendaftaran', label: 'Jadwal Pendaftaran', icon: Calendar },
        { id: 'pendaftar-terbaru', label: 'Pendaftar Terbaru', icon: Users },
        { id: 'hasil-pendaftaran', label: 'Hasil Pendaftaran', icon: ClipboardList },
        { id: 'tambah-pendaftar', label: 'Tambah Pendaftar', icon: UserPlus },
      ]
    },
    {
      title: 'Konten Web',
      items: [
        { id: 'edit-home', label: 'Beranda', icon: HomeIcon },
        { id: 'edit-tentang', label: 'Tentang', icon: Info },
        { id: 'edit-kajian', label: 'Kajian', icon: BookOpen },
        { id: 'edit-program', label: 'Program', icon: Layers },
        { id: 'edit-pendidikan', label: 'Pendidikan', icon: GraduationCap },
        { id: 'edit-galeri', label: 'Galeri', icon: ImageIcon },
        { id: 'edit-berita', label: 'Berita', icon: Newspaper },
      ]
    },
    {
      title: 'Sistem',
      items: [
        { id: 'user-management', label: 'User Management', icon: Shield },
      ]
    }
  ];

  const totalRegistered = registrations.length;
  const totalVerified = registrations.filter(r => r.status === 'verified').length;
  const recentRegistrations = [...registrations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.3 }}
           className="w-full"
        >
          {(() => {
            if (activeTab === 'dashboard') {
              return (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-emerald-100 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">System Overview</h2>
                    <button onClick={exportDashboardPDF} className="px-4 py-2 border border-emerald-500/50 bg-emerald-950/50 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded transition-all hover:bg-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center">
                      <FileText className="w-4 h-4 mr-2" /> REKAP_PDF
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-cyan-500/30 relative overflow-hidden group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">TOTAL_REGS</p>
                        <p className="text-4xl font-black text-cyan-50">{totalRegistered}</p>
                      </div>
                    </div>
                    <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-emerald-500/30 relative overflow-hidden group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">VERIFIED</p>
                        <p className="text-4xl font-black text-emerald-50">{totalVerified}</p>
                      </div>
                    </div>
                    <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-purple-500/30 relative overflow-hidden group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">PENDING</p>
                        <p className="text-4xl font-black text-purple-50">{registrations.length - totalVerified}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black/30 backdrop-blur-md rounded-xl border border-emerald-500/20 overflow-hidden">
                    <div className="px-6 py-4 bg-emerald-950/30 border-b border-emerald-500/20">
                      <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-widest">PENDAFTAR_TERBARU_LOG</h3>
                    </div>
                    <ul className="divide-y divide-emerald-500/10">
                      {recentRegistrations.map(reg => (
                        <li key={reg.id} className="p-4 flex justify-between items-center hover:bg-emerald-500/5 transition-colors">
                          <div>
                            <p className="font-bold text-emerald-50 uppercase tracking-widest">{reg.nama}</p>
                            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{reg.jalurPendidikan} • {new Date(reg.createdAt).toLocaleDateString()}</p>
                          </div>
                          {getStatusBadge(reg.status)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }

            if (activeTab === 'jadwal-pendaftaran') {
              return (
                <div className="space-y-6">
                   <h2 className="text-2xl font-bold text-emerald-100 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">Jadwal Pendaftaran</h2>
                   <div className="bg-black/30 backdrop-blur-md p-8 rounded-xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                         <div className="space-y-6">
                            <div>
                               <label className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1 block">TANGGAL_MULAI</label>
                               {isEditingJadwal ? (
                                 <input type="date" value={jadwalForm.tanggalMulai} onChange={e => setJadwalForm({...jadwalForm, tanggalMulai: e.target.value})} className="w-full bg-black/50 border border-emerald-500/30 text-emerald-100 p-2 rounded focus:outline-none focus:border-emerald-400" />
                               ) : (
                                 <p className="text-2xl font-black text-emerald-50 uppercase tracking-widest">{new Date(jadwalPendaftaran.tanggalMulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                               )}
                            </div>
                            <div>
                               <label className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1 block">TANGGAL_AKHIR</label>
                               {isEditingJadwal ? (
                                 <input type="date" value={jadwalForm.tanggalAkhir} onChange={e => setJadwalForm({...jadwalForm, tanggalAkhir: e.target.value})} className="w-full bg-black/50 border border-emerald-500/30 text-emerald-100 p-2 rounded focus:outline-none focus:border-emerald-400" />
                               ) : (
                                 <p className="text-2xl font-black text-emerald-50 uppercase tracking-widest">{new Date(jadwalPendaftaran.tanggalAkhir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                               )}
                            </div>
                         </div>
                         <div className="flex flex-col items-center justify-center p-6 border-l border-emerald-500/10 space-y-4">
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full animate-pulse">
                               <Calendar className="w-12 h-12 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                            </div>
                            {isEditingJadwal ? (
                              <div className="flex gap-2 w-full max-w-xs">
                                <button onClick={() => { updateJadwal(jadwalForm); setIsEditingJadwal(false); }} className="flex-1 px-4 py-2 bg-emerald-500/20 border border-emerald-500 text-emerald-100 text-[10px] font-bold uppercase tracking-widest rounded hover:bg-emerald-500/40 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]">SIMPAN_JADWAL</button>
                                <button onClick={() => { setJadwalForm(jadwalPendaftaran); setIsEditingJadwal(false); }} className="flex-1 px-4 py-2 border border-red-500/50 text-red-400 text-[10px] font-bold uppercase tracking-widest rounded hover:bg-red-500/20">BATAL</button>
                              </div>
                            ) : (
                              <button onClick={() => setIsEditingJadwal(true)} className="px-8 py-3 bg-emerald-950/50 border border-emerald-500/50 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded hover:bg-emerald-500/20 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center">
                                <Edit className="w-4 h-4 mr-2" /> EDIT_JADWAL
                              </button>
                            )}
                         </div>
                      </div>
                   </div>
                </div>
              );
            }

            if (activeTab === 'pendaftar-terbaru') {
               const displayRegs = [...registrations].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
               return (
                 <div className="flex flex-col lg:flex-row gap-6 h-full lg:h-[calc(100vh-10rem)]">
                    <div className="lg:w-1/3 bg-black/30 backdrop-blur-md rounded-xl border border-cyan-500/30 overflow-hidden flex flex-col shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                       <div className="px-4 py-4 bg-cyan-950/30 border-b border-cyan-500/20 flex justify-between items-center">
                          <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-2"><Terminal className="w-4 h-4" /> REGS_STREAMS</h3>
                          <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30 font-bold">{displayRegs.length} UNITS</span>
                       </div>
                       <div className="flex-1 overflow-y-auto custom-scrollbar">
                          <ul className="divide-y divide-cyan-500/10">
                             {displayRegs.map(reg => (
                               <li 
                                 key={reg.id} 
                                 onClick={() => setSelectedReg(reg)}
                                 className={`p-4 cursor-pointer transition-all ${selectedReg?.id === reg.id ? 'bg-cyan-500/20 border-l-4 border-cyan-400' : 'hover:bg-cyan-500/5'}`}
                               >
                                  <div className="flex justify-between items-start mb-1">
                                     <p className="font-bold text-cyan-50 uppercase tracking-widest text-sm">{reg.nama}</p>
                                     <span className="text-[9px] font-bold text-cyan-500/50 uppercase tracking-widest">ID::{reg.id.slice(0,8)}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                     <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{reg.jalurPendidikan}</p>
                                     <div className="scale-75 origin-right">{getStatusBadge(reg.status)}</div>
                                  </div>
                               </li>
                             ))}
                          </ul>
                       </div>
                    </div>
                    <div className="lg:w-2/3 bg-black/30 backdrop-blur-md rounded-xl border border-emerald-500/30 overflow-hidden flex flex-col shadow-[0_0_20px_rgba(16,185,129,0.1)]" ref={detailRef}>
                       {selectedReg ? (
                         <div className="flex flex-col h-full">
                            <div className="px-6 py-4 bg-emerald-950/30 border-b border-emerald-500/20 flex justify-between items-center shrink-0">
                               <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-widest">ENTITY_VIEWER::{selectedReg.id.slice(0,12)}</h3>
                               <div className="flex gap-2">
                                  <button onClick={exportPDF} className="p-1 px-2 border border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded uppercase tracking-widest flex items-center transition-all"><Download className="w-3 h-3 mr-1" /> PDF</button>
                                  <button onClick={() => shareWhatsApp()} className="p-1 px-2 border border-green-500/50 bg-green-500/10 hover:bg-green-500/20 text-green-400 text-[10px] font-bold rounded uppercase tracking-widest flex items-center transition-all"><Share2 className="w-3 h-3 mr-1" /> WA</button>
                                  <button onClick={() => updateStatus(selectedReg.id, 'verified')} className="p-1 px-2 border border-emerald-400 bg-emerald-400/20 hover:bg-emerald-400/40 text-emerald-100 text-[10px] font-bold rounded uppercase tracking-widest transition-all">VERIFY</button>
                               </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-emerald-950/20 p-6 rounded-xl border border-emerald-500/10">
                                  {[
                                    {label: "NAMA_LENGKAP", val: selectedReg.nama},
                                    {label: "NIK_IDENTITIY", val: selectedReg.nik},
                                    {label: "NISN_IDENTITY", val: selectedReg.nisn || 'NULL'},
                                    {label: "JALUR_PENDIK", val: selectedReg.jalurPendidikan},
                                    {label: "TEMPAT_LAHIR", val: selectedReg.tempatLahir},
                                    {label: "TANGGAL_LAHIR", val: selectedReg.tanggalLahir},
                                    {label: "PHONE_WA", val: selectedReg.noTelfon},
                                  ].map((f,idx) => (
                                    <div key={idx}>
                                       <span className="text-[10px] font-bold text-emerald-600/70 uppercase tracking-widest block mb-1">{f.label}</span>
                                       <p className="text-emerald-50 font-black uppercase tracking-widest text-sm">{f.val}</p>
                                    </div>
                                  ))}
                                  <div className="sm:col-span-2">
                                     <span className="text-[10px] font-bold text-emerald-600/70 uppercase tracking-widest block mb-1">GEOGRAPHICAL_DATA</span>
                                     <p className="text-emerald-50 font-black uppercase tracking-widest text-sm">{selectedReg.alamat}, RT{selectedReg.rt}/RW{selectedReg.rw}, {selectedReg.desa}, {selectedReg.kecamatan}, {selectedReg.kabupaten}, {selectedReg.provinsi}</p>
                                  </div>
                               </div>

                               <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] border-b border-emerald-500/20 pb-1">DOCUMENT_PAYLOADS</h4>
                               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                  {[
                                    {label: 'KK', src: selectedReg.photoKK},
                                    {label: 'AKTE', src: selectedReg.photoAkta},
                                    {label: 'KTP', src: selectedReg.photoKTP},
                                    {label: 'IJAZAH', src: selectedReg.photoIjazah}
                                  ].map((d,i) => (
                                    <div key={i} className="group relative aspect-square bg-emerald-950/40 border border-emerald-500/20 rounded-lg overflow-hidden transition-all hover:border-emerald-400">
                                       <img src={d.src} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={d.label} />
                                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                          <a href={d.src} download className="p-2 bg-emerald-500 text-black rounded-full"><Download className="w-4 h-4" /></a>
                                       </div>
                                       <span className="absolute bottom-1 right-1 bg-black/80 text-[8px] font-bold text-emerald-500 px-1 border border-emerald-500/30 uppercase tracking-widest">{d.label}</span>
                                    </div>
                                  ))}
                               </div>
                            </div>
                         </div>
                       ) : (
                         <div className="flex flex-col items-center justify-center h-full text-emerald-500/20">
                            <Eye className="w-16 h-16 animate-pulse mb-2" />
                            <p className="text-xs font-bold uppercase tracking-[0.2em]">AWAITING_ENTITY_SELECTION</p>
                         </div>
                       )}
                    </div>
                 </div>
               );
            }

            if (activeTab === 'hasil-pendaftaran') {
               return (
                 <div className="bg-black/30 backdrop-blur-md rounded-xl border border-cyan-500/20 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                    <div className="px-6 py-4 bg-cyan-950/30 border-b border-cyan-500/20 flex flex-wrap gap-4 justify-between items-center">
                       <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-2"><ClipboardList className="w-4 h-4" /> SYSTEM_OUTPUTS</h3>
                       <div className="flex gap-2">
                          <button onClick={exportAllPDF} className="px-3 py-1.5 border border-cyan-500/50 bg-cyan-950/50 text-cyan-400 text-[10px] font-bold uppercase tracking-widest rounded transition-all hover:bg-cyan-500/20 flex items-center shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                             <FileText className="w-3.5 h-3.5 mr-1.5" /> EXPORT_ALL_PDF
                          </button>
                          <button onClick={shareAllWhatsApp} className="px-3 py-1.5 border border-green-500/50 bg-green-950/50 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded transition-all hover:bg-green-500/20 flex items-center shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                             <Share2 className="w-3.5 h-3.5 mr-1.5" /> SHARE_WHATSAPP
                          </button>
                       </div>
                    </div>
                    <div className="overflow-x-auto custom-scrollbar">
                       <table className="w-full text-left text-[11px] whitespace-nowrap border-collapse">
                          <thead className="bg-cyan-950/60 text-cyan-500/80 uppercase tracking-widest font-black">
                             <tr>
                                <th className="p-4 border border-cyan-500/10 text-center">NR</th>
                                <th className="p-4 border border-cyan-500/10">ID_ENTITY</th>
                                <th className="p-4 border border-cyan-500/10">NAMA_PENDAFTAR</th>
                                <th className="p-4 border border-cyan-500/10">JALUR</th>
                                <th className="p-4 border border-cyan-500/10 text-center">STATUS</th>
                                <th className="p-4 border border-cyan-500/10 text-center">ACTIONS</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-cyan-500/10 bg-black/10">
                             {registrations.map((reg, i) => (
                               <tr key={reg.id} className="hover:bg-cyan-500/5 transition-colors group">
                                  <td className="p-4 text-center border border-cyan-500/10 font-mono text-cyan-500/50">{i+1}</td>
                                  <td className="p-4 border border-cyan-500/10 font-mono text-cyan-500/70">{reg.id.slice(0,8)}</td>
                                  <td className="p-4 border border-cyan-500/10 font-black text-cyan-50 uppercase tracking-widest">{reg.nama}</td>
                                  <td className="p-4 border border-cyan-500/10 text-cyan-400 font-bold uppercase tracking-widest">{reg.jalurPendidikan}</td>
                                  <td className="p-4 border border-cyan-500/10 text-center scale-90">{getStatusBadge(reg.status)}</td>
                                  <td className="p-4 border border-cyan-500/10 text-center">
                                     <div className="flex gap-2 justify-center">
                                        <button onClick={() => { setSelectedReg(reg); setActiveTab('pendaftar-terbaru'); }} className="p-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/30 rounded transition-all"><Eye className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => updateStatus(reg.id, 'verified')} className="p-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 rounded transition-all"><CheckCircle className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => updateStatus(reg.id, 'rejected')} className="p-1.5 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/30 rounded transition-all"><XCircle className="w-3.5 h-3.5" /></button>
                                     </div>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
               );
            }

            if (activeTab === 'user-management') {
              return (
                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-emerald-100 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">Operator Management</h2>
                      <button onClick={() => { setIsAddingUser(true); setUserForm({ level: 'Admin', foto: '' }); }} className="px-4 py-2 border border-emerald-500/50 bg-emerald-950/50 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded flex items-center transition-all hover:bg-emerald-500/20"><UserPlus className="w-4 h-4 mr-2" /> ADD_OPERATOR</button>
                   </div>

                   {(isAddingUser || isEditingUser) && (
                     <div className="bg-black/50 backdrop-blur-xl p-6 rounded-xl border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Edit className="w-4 h-4" /> {isAddingUser ? 'NEW_OPERATOR_CONFIG' : 'UPDATE_OPERATOR_CONFIG'}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           <div>
                              <label className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1 block">FULL_NAME</label>
                              <input type="text" value={userForm.namaLengkap || ''} onChange={e => setUserForm({...userForm, namaLengkap: e.target.value})} className="w-full bg-black/50 border border-emerald-500/20 text-emerald-100 p-2 text-xs rounded focus:border-emerald-400 outline-none" />
                           </div>
                           <div>
                              <label className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1 block">USERNAME_AUTH</label>
                              <input type="text" value={userForm.username || ''} onChange={e => setUserForm({...userForm, username: e.target.value})} className="w-full bg-black/50 border border-emerald-500/20 text-emerald-100 p-2 text-xs rounded focus:border-emerald-400 outline-none" />
                           </div>
                           <div>
                              <label className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1 block">ACCESS_LEVEL</label>
                              <select value={userForm.level || 'Admin'} onChange={e => setUserForm({...userForm, level: e.target.value})} className="w-full bg-black/50 border border-emerald-500/20 text-emerald-100 p-2 text-xs rounded focus:border-emerald-400 outline-none">
                                <option value="Super Admin" className="bg-slate-900">Super Admin</option>
                                <option value="Admin" className="bg-slate-900">Admin</option>
                                <option value="Petugas" className="bg-slate-900">Petugas</option>
                              </select>
                           </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                           <button onClick={() => { setIsAddingUser(false); setIsEditingUser(false); }} className="px-4 py-2 border border-red-500/50 text-red-400 text-[10px] font-bold uppercase tracking-widest rounded hover:bg-red-500/10">CANCEL</button>
                           <button onClick={() => { 
                             if(isAddingUser) addUser(userForm as any);
                             else updateUser(userForm.id!, userForm);
                             setIsAddingUser(false); setIsEditingUser(false);
                           }} className="px-4 py-2 bg-emerald-500/20 border border-emerald-500 text-emerald-100 text-[10px] font-bold uppercase tracking-widest rounded shadow-[0_0_10px_rgba(16,185,129,0.3)]">DEPLOY_CONFIG</button>
                        </div>
                     </div>
                   )}

                   <div className="bg-black/30 backdrop-blur-md rounded-xl border border-emerald-500/20 overflow-hidden">
                      <table className="w-full text-left text-xs whitespace-nowrap border-collapse">
                         <thead className="bg-emerald-950/60 text-emerald-500/80 uppercase tracking-widest font-black">
                            <tr>
                               <th className="p-4 border border-emerald-500/10 text-center">NR</th>
                               <th className="p-4 border border-emerald-500/10">AVATAR</th>
                               <th className="p-4 border border-emerald-500/10">DISPLAY_NAME</th>
                               <th className="p-4 border border-emerald-500/10">USERNAME_LOG</th>
                               <th className="p-4 border border-emerald-500/10">PERMISSION</th>
                               <th className="p-4 border border-emerald-500/10 text-center">ACTION</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-emerald-500/10 bg-black/10">
                            {users.map((user, i) => (
                              <tr key={user.id} className="hover:bg-emerald-500/5 transition-colors">
                                 <td className="p-4 text-center border border-emerald-500/10 font-mono text-emerald-500/50">{i+1}</td>
                                 <td className="p-4 border border-emerald-500/10">
                                    <img src={user.foto} className="w-8 h-8 rounded-full object-cover border border-emerald-500/30" alt="" />
                                 </td>
                                 <td className="p-4 border border-emerald-500/10 font-black text-emerald-50 uppercase tracking-widest">{user.namaLengkap}</td>
                                 <td className="p-4 border border-emerald-500/10 font-mono text-emerald-400">{user.username}</td>
                                 <td className="p-4 border border-emerald-500/10 uppercase font-black text-[10px]">
                                    <span className={`px-2 py-0.5 rounded border ${user.level === 'Super Admin' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-emerald-500/20 border-emerald-500 text-emerald-400'}`}>{user.level}</span>
                                 </td>
                                 <td className="p-4 border border-emerald-500/10 text-center">
                                    <div className="flex gap-2 justify-center">
                                       <button onClick={() => { setUserForm(user); setIsEditingUser(true); }} className="p-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30 rounded transition-all"><Edit className="w-3.5 h-3.5" /></button>
                                       <button onClick={() => { if(confirm('TERMINATE_OPERATOR?')) deleteUser(user.id); }} className="p-1.5 bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/30 rounded transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
              );
            }

            if (activeTab === 'tambah-pendaftar') {
              return <Pendaftaran isAdmin={true} />;
            }

            if (activeTab.startsWith('edit-')) {
               const section = activeTab.replace('edit-', '') as keyof WebContent;
               const data = webContent[section];
               
               const handleChange = (field: string, val: any) => {
                 updateWebContent(section, { ...data, [field]: val });
               };

               const handleArrayChange = (idx: number, val: any) => {
                  const newData = [...(data as any[])];
                  newData[idx] = val;
                  updateWebContent(section, newData);
               };

               const addArrayItem = (item: any) => {
                  updateWebContent(section, [...(data as any[]), item]);
               };

               const removeArrayItem = (idx: number) => {
                  const newData = [...(data as any[])];
                  newData.splice(idx, 1);
                  updateWebContent(section, newData);
               };

               const handleNestedArrayChange = (field: string, idx: number, subfield: string, val: any) => {
                  const currentArr = (data as any)[field] || [];
                  const newDataArr = [...currentArr];
                  newDataArr[idx] = { ...newDataArr[idx], [subfield]: val };
                  handleChange(field, newDataArr);
               };

               const addNestedArrayItem = (field: string, item: any) => {
                  const currentArr = (data as any)[field] || [];
                  handleChange(field, [...currentArr, item]);
               };

               const removeNestedArrayItem = (field: string, idx: number) => {
                  const currentArr = (data as any)[field] || [];
                  const newDataArr = [...currentArr];
                  newDataArr.splice(idx, 1);
                  handleChange(field, newDataArr);
               };

               const labelClass = "text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] block";
               const inputClass = "w-full bg-black/40 border border-emerald-500/20 text-emerald-50 p-2 text-xs rounded focus:border-emerald-400 outline-none transition-all";

               return (
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <h2 className="text-2xl font-bold text-emerald-100 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">Edit Content {section.toUpperCase()}</h2>
                    </div>

                    <div className="bg-black/30 backdrop-blur-md p-8 rounded-xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)] space-y-8">
                        {section === 'home' && (
                          <div className="space-y-10">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                   <div className="space-y-2">
                                      <label className={labelClass}>HERO_TITLE</label>
                                      <input type="text" value={(data as any).title} onChange={e => handleChange('title', e.target.value)} className={inputClass} />
                                   </div>
                                   <div className="space-y-2">
                                      <label className={labelClass}>HERO_SUBTITLE</label>
                                      <input type="text" value={(data as any).subtitle} onChange={e => handleChange('subtitle', e.target.value)} className={inputClass} />
                                   </div>
                                </div>
                                <div className="space-y-2">
                                   <label className={labelClass}>HERO_BACKGROUND_IMAGE</label>
                                   <div className="aspect-video bg-black rounded border border-emerald-500/20 relative group">
                                      <img src={(data as any).heroImage} className="w-full h-full object-cover" />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <input 
                                           type="file" 
                                           id="hero-bg-upload"
                                           className="hidden" 
                                           accept="image/*"
                                           onChange={async (e) => {
                                             const file = e.target.files?.[0];
                                             if (file) {
                                                const base64 = await fileToBase64(file);
                                                handleChange('heroImage', base64);
                                             }
                                           }}
                                         />
                                         <label htmlFor="hero-bg-upload" className="p-2 bg-emerald-500 text-black rounded-full cursor-pointer hover:scale-110 transition-transform">
                                            <Plus className="w-4 h-4" />
                                         </label>
                                      </div>
                                   </div>
                                   <input type="text" value={(data as any).heroImage} onChange={e => handleChange('heroImage', e.target.value)} className={inputClass + " text-[8px]"} placeholder="Or paste Image URL" />
                                </div>
                             </div>
 
                             <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                                   <label className={labelClass}>FITUR_SISTEM</label>
                                   <button onClick={() => addNestedArrayItem('features', { title: 'Label', desc: 'Isi deskripsi', icon: 'Shield' })} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-1">
                                      <Plus className="w-3 h-3" /> ADD_ROW
                                   </button>
                                </div>
                                <div className="overflow-x-auto bg-black/20 rounded-lg border border-emerald-500/10">
                                   <table className="w-full text-left text-xs border-collapse">
                                      <thead className="bg-emerald-950/40 text-emerald-500/70 text-[9px] uppercase tracking-widest">
                                         <tr>
                                            <th className="p-3 border-b border-emerald-500/10">ICON</th>
                                            <th className="p-3 border-b border-emerald-500/10">TITLE</th>
                                            <th className="p-3 border-b border-emerald-500/10">DESCRIPTION</th>
                                            <th className="p-3 border-b border-emerald-500/10 text-center">ACTION</th>
                                         </tr>
                                      </thead>
                                      <tbody className="divide-y divide-emerald-500/5">
                                         {((data as any).features || []).map((feat: any, i: number) => (
                                           <tr key={i} className="hover:bg-emerald-500/5 transition-colors">
                                              <td className="p-2 w-20">
                                                 <input type="text" value={feat.icon} onChange={e => handleNestedArrayChange('features', i, 'icon', e.target.value)} className={inputClass + " text-center"} placeholder="Lucide" />
                                              </td>
                                              <td className="p-2 w-1/4">
                                                 <input type="text" value={feat.title} onChange={e => handleNestedArrayChange('features', i, 'title', e.target.value)} className={inputClass + " font-bold"} placeholder="Title" />
                                              </td>
                                              <td className="p-2">
                                                 <textarea value={feat.desc} onChange={e => handleNestedArrayChange('features', i, 'desc', e.target.value)} className={inputClass} rows={1} placeholder="Description" />
                                              </td>
                                              <td className="p-2 text-center">
                                                 <button onClick={() => removeNestedArrayItem('features', i)} className="p-1.5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded transition-all">
                                                    <Trash2 className="w-4 h-4" />
                                                 </button>
                                              </td>
                                           </tr>
                                         ))}
                                      </tbody>
                                   </table>
                                </div>
                             </div>
 
                             <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                                   <label className={labelClass}>ALUR_PENDAFTARAN</label>
                                   <button onClick={() => addNestedArrayItem('alur', { title: 'Step Label', desc: 'Step instructions' })} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-[10px] font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center gap-1">
                                      <Plus className="w-3 h-3" /> ADD_STEP
                                   </button>
                                </div>
                                <div className="overflow-x-auto bg-black/20 rounded-lg border border-emerald-500/10">
                                   <table className="w-full text-left text-xs border-collapse">
                                      <thead className="bg-cyan-950/40 text-cyan-500/70 text-[9px] uppercase tracking-widest">
                                         <tr>
                                            <th className="p-3 border-b border-emerald-500/10 w-12 text-center">ID</th>
                                            <th className="p-3 border-b border-emerald-500/10">STEP_TITLE</th>
                                            <th className="p-3 border-b border-emerald-500/10">INSTRUCTIONS</th>
                                            <th className="p-3 border-b border-emerald-500/10 text-center">ACTION</th>
                                         </tr>
                                      </thead>
                                      <tbody className="divide-y divide-cyan-500/5">
                                         {((data as any).alur || []).map((step: any, i: number) => (
                                           <tr key={i} className="hover:bg-cyan-500/5 transition-colors">
                                              <td className="p-2 text-center font-black text-cyan-500/50">{i+1}</td>
                                              <td className="p-2 w-1/4">
                                                 <input type="text" value={step.title} onChange={e => handleNestedArrayChange('alur', i, 'title', e.target.value)} className={inputClass} placeholder="Title" />
                                              </td>
                                              <td className="p-2">
                                                 <input type="text" value={step.desc} onChange={e => handleNestedArrayChange('alur', i, 'desc', e.target.value)} className={inputClass} placeholder="Instructions" />
                                              </td>
                                              <td className="p-2 text-center">
                                                 <button onClick={() => removeNestedArrayItem('alur', i)} className="p-1.5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded transition-all">
                                                    <XCircle className="w-4 h-4" />
                                                 </button>
                                              </td>
                                           </tr>
                                         ))}
                                      </tbody>
                                   </table>
                                </div>
                             </div>

                             <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                                   <label className={labelClass}>PENGATURAN_BANNER</label>
                                   <button onClick={() => addNestedArrayItem('banners', { url: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3', desc: 'Banner Description' })} className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded text-[10px] font-bold text-yellow-400 hover:bg-yellow-500/20 transition-all flex items-center gap-1">
                                      <Plus className="w-3 h-3" /> ADD_BANNER
                                   </button>
                                </div>
                                <div className="overflow-x-auto bg-black/20 rounded-lg border border-emerald-500/10">
                                   <table className="w-full text-left text-xs border-collapse">
                                      <thead className="bg-yellow-950/40 text-yellow-500/70 text-[9px] uppercase tracking-widest">
                                         <tr>
                                            <th className="p-3 border-b border-emerald-500/10 w-48">PREVIEW / URL</th>
                                            <th className="p-3 border-b border-emerald-500/10">DESCRIPTION</th>
                                            <th className="p-3 border-b border-emerald-500/10 text-center w-20">ACTION</th>
                                         </tr>
                                      </thead>
                                      <tbody className="divide-y divide-emerald-500/5">
                                         {((data as any).banners || []).map((ban: any, i: number) => (
                                           <tr key={i} className="hover:bg-emerald-500/5 transition-colors group/banner">
                                              <td className="p-2">
                                                 <div className="space-y-2">
                                                    <div className="aspect-video bg-black rounded overflow-hidden border border-emerald-500/20 relative group">
                                                       <img src={ban.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                          <input 
                                                            type="file" 
                                                            id={`banner-upload-${i}`}
                                                            className="hidden" 
                                                            accept="image/*"
                                                            onChange={async (e) => {
                                                              const file = e.target.files?.[0];
                                                              if (file) {
                                                                const base64 = await fileToBase64(file);
                                                                handleNestedArrayChange('banners', i, 'url', base64);
                                                              }
                                                            }}
                                                          />
                                                          <label htmlFor={`banner-upload-${i}`} className="p-2 bg-emerald-500 text-black rounded-full cursor-pointer hover:scale-110 transition-transform">
                                                             <Plus className="w-4 h-4" />
                                                          </label>
                                                       </div>
                                                    </div>
                                                    <input type="text" value={ban.url} onChange={e => handleNestedArrayChange('banners', i, 'url', e.target.value)} className={inputClass + " text-[8px] py-1"} placeholder="Or paste URL" />
                                                 </div>
                                              </td>
                                              <td className="p-2 text-center">
                                                 <textarea value={ban.desc} onChange={e => handleNestedArrayChange('banners', i, 'desc', e.target.value)} className={inputClass} rows={3} placeholder="Banner Description" />
                                              </td>
                                              <td className="p-2 text-center">
                                                 <button onClick={() => removeNestedArrayItem('banners', i)} className="p-1.5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded transition-all">
                                                    <Trash2 className="w-4 h-4" />
                                                 </button>
                                              </td>
                                           </tr>
                                         ))}
                                      </tbody>
                                   </table>
                                </div>
                             </div>

                             <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                                   <label className={labelClass}>TABEL_DESKRIPSI</label>
                                   <button onClick={() => addNestedArrayItem('descriptions', { title: 'Label', content: 'Konten deskripsi' })} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-[10px] font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center gap-1">
                                      <Plus className="w-3 h-3" /> ADD_DESCRIPTION
                                   </button>
                                </div>
                                <div className="overflow-x-auto bg-black/20 rounded-lg border border-emerald-500/10">
                                   <table className="w-full text-left text-xs border-collapse">
                                      <thead className="bg-cyan-950/40 text-cyan-500/70 text-[9px] uppercase tracking-widest">
                                         <tr>
                                            <th className="p-3 border-b border-emerald-500/10 w-48">TITLE / LABEL</th>
                                            <th className="p-3 border-b border-emerald-500/10">CONTENT</th>
                                            <th className="p-3 border-b border-emerald-500/10 text-center w-20">ACTION</th>
                                         </tr>
                                      </thead>
                                      <tbody className="divide-y divide-emerald-500/5">
                                         {((data as any).descriptions || []).map((desc: any, i: number) => (
                                           <tr key={i} className="hover:bg-emerald-500/5 transition-colors">
                                              <td className="p-2">
                                                 <input type="text" value={desc.title} onChange={e => handleNestedArrayChange('descriptions', i, 'title', e.target.value)} className={inputClass + " font-bold"} placeholder="Title" />
                                              </td>
                                              <td className="p-2">
                                                 <textarea value={desc.content} onChange={e => handleNestedArrayChange('descriptions', i, 'content', e.target.value)} className={inputClass} rows={2} placeholder="Content" />
                                              </td>
                                              <td className="p-2 text-center">
                                                 <button onClick={() => removeNestedArrayItem('descriptions', i)} className="p-1.5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded transition-all">
                                                    <Trash2 className="w-4 h-4" />
                                                 </button>
                                              </td>
                                           </tr>
                                         ))}
                                      </tbody>
                                   </table>
                                </div>
                             </div>
                          </div>
                        )}

                        {section === 'tentang' && (
                          <div className="space-y-6">
                             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="md:col-span-1 space-y-2">
                                   <label className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block mb-2">FEATURE_IMAGE</label>
                                   <div className="aspect-square bg-black rounded-xl overflow-hidden border border-emerald-500/20 relative group">
                                      <img src={(data as any).photo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <input 
                                           type="file" 
                                           id="tentang-photo-upload"
                                           className="hidden" 
                                           accept="image/*"
                                           onChange={async (e) => {
                                             const file = e.target.files?.[0];
                                             if (file) {
                                               const base64 = await fileToBase64(file);
                                               handleChange('photo', base64);
                                             }
                                           }}
                                         />
                                         <label htmlFor="tentang-photo-upload" className="p-3 bg-emerald-500 text-black rounded-full cursor-pointer hover:scale-110 transition-transform">
                                            <Plus className="w-6 h-6" />
                                         </label>
                                      </div>
                                   </div>
                                   <input type="text" value={(data as any).photo} onChange={e => handleChange('photo', e.target.value)} className={inputClass + " text-[8px]"} placeholder="Or paste URL" />
                                </div>
                                <div className="md:col-span-3 space-y-4">
                                   <div className="space-y-2">
                                      <label className={labelClass}>SEJARAH_TEXT</label>
                                      <textarea value={(data as any).sejarah} onChange={e => handleChange('sejarah', e.target.value)} className={inputClass} rows={12} />
                                   </div>
                                </div>
                             </div>
                             <div className="space-y-2">
                                <label className={labelClass}>VISI_TEXT</label>
                                <textarea value={(data as any).visi} onChange={e => handleChange('visi', e.target.value)} className={inputClass} rows={2} />
                             </div>
                             <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                                   <label className={labelClass}>MISI_LIST_TABLE</label>
                                   <button onClick={() => handleChange('misi', [...(data as any).misi, 'Misi baru'])} className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-[10px] font-bold text-amber-400 hover:bg-amber-500/20 transition-all flex items-center gap-1">
                                      <Plus className="w-3 h-3" /> ADD_MISSION
                                   </button>
                                </div>
                                <div className="space-y-2">
                                   {(data as any).misi.map((m: string, i: number) => (
                                     <div key={i} className="flex gap-2 group">
                                        <div className="w-8 h-8 flex items-center justify-center bg-amber-500/10 text-amber-500 font-bold rounded border border-amber-500/20 text-[10px]">{i+1}</div>
                                        <input type="text" value={m} onChange={e => {
                                           const nm = [...(data as any).misi]; nm[i] = e.target.value; handleChange('misi', nm);
                                        }} className={inputClass} />
                                        <button onClick={() => {
                                           const nm = [...(data as any).misi]; nm.splice(i,1); handleChange('misi', nm);
                                        }} className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"><X className="w-4 h-4" /></button>
                                     </div>
                                   ))}
                                </div>
                             </div>
                          </div>
                       )}

                       {section === 'kajian' && (
                         <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                               <label className={labelClass}>DAFTAR_KAJIAN_TABLE</label>
                               <button onClick={() => addArrayItem('Kajian Baru')} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-1">
                                  <Plus className="w-3 h-3" /> ADD_KAJIAN
                               </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               {(data as any[]).map((k, i) => (
                                 <div key={i} className="flex gap-2 items-center bg-black/20 p-2 rounded border border-emerald-500/10">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-2" />
                                    <input type="text" value={k} onChange={e => handleArrayChange(i, e.target.value)} className={inputClass} />
                                    <button onClick={() => removeArrayItem(i)} className="p-2 text-red-500/50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                 </div>
                               ))}
                            </div>
                         </div>
                       )}

                       {section === 'program' && (
                         <div className="space-y-10">
                            {/* Unggulan */}
                            <div className="space-y-4">
                               <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                                  <label className={labelClass}>PROGRAM_UNGGULAN</label>
                                  <button className="px-2 py-0.5 border border-emerald-500/30 text-emerald-400 text-[9px] hover:bg-emerald-500/10 rounded" onClick={() => handleChange('unggulan', [...(data as any).unggulan, 'Program Baru'])}>+ ADD</button>
                               </div>
                               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                  {(data as any).unggulan.map((u: string, i: number) => (
                                    <div key={i} className="flex gap-1">
                                       <input type="text" value={u} onChange={e => {
                                          const nu = [...(data as any).unggulan]; nu[i] = e.target.value; handleChange('unggulan', nu);
                                       }} className={inputClass} />
                                       <button onClick={() => {
                                          const nu = [...(data as any).unggulan]; nu.splice(i,1); handleChange('unggulan', nu);
                                       }} className="text-red-500/30 hover:text-red-500"><X className="w-4 h-4" /></button>
                                    </div>
                                  ))}
                               </div>
                            </div>

                            {/* Tahunan Table */}
                            <div className="space-y-4">
                               <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                                  <label className={labelClass}>PROGRAM_TAHUNAN_TABLE</label>
                                  <button onClick={() => addNestedArrayItem('tahunan', { bulan: 'Nama Bulan', acara: 'Nama Acara' })} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-[10px] font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all">+ ADD_ROW</button>
                               </div>
                               <div className="bg-black/20 rounded-lg border border-emerald-500/10">
                                  <table className="w-full text-left text-xs">
                                     <thead className="bg-cyan-950/40 text-cyan-500/70 text-[9px] uppercase tracking-widest">
                                        <tr>
                                           <th className="p-3">WAKTU_BULAN</th>
                                           <th className="p-3">KEGIATAN_ACARA</th>
                                           <th className="p-3 text-center">ACTION</th>
                                        </tr>
                                     </thead>
                                     <tbody className="divide-y divide-emerald-500/5">
                                        {(data as any).tahunan.map((item: any, i: number) => (
                                          <tr key={i}>
                                             <td className="p-2 w-1/3"><input type="text" value={item.bulan} onChange={e => handleNestedArrayChange('tahunan', i, 'bulan', e.target.value)} className={inputClass} /></td>
                                             <td className="p-2"><input type="text" value={item.acara} onChange={e => handleNestedArrayChange('tahunan', i, 'acara', e.target.value)} className={inputClass} /></td>
                                             <td className="p-2 text-center"><button onClick={() => removeNestedArrayItem('tahunan', i)} className="text-red-500/50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></td>
                                          </tr>
                                        ))}
                                     </tbody>
                                  </table>
                               </div>
                            </div>

                            {/* Bulanan Table */}
                            <div className="space-y-4">
                               <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                                  <label className={labelClass}>PROGRAM_BULANAN_TABLE</label>
                                  <button onClick={() => addNestedArrayItem('bulanan', { jadwal: 'Jadwal', acara: 'Acara' })} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all">+ ADD_ROW</button>
                               </div>
                               <div className="bg-black/20 rounded-lg border border-emerald-500/10">
                                  <table className="w-full text-left text-xs">
                                     <thead className="bg-emerald-950/40 text-emerald-500/70 text-[9px] uppercase tracking-widest">
                                        <tr>
                                           <th className="p-3">JADWAL</th>
                                           <th className="p-3">KEGIATAN_ACARA</th>
                                           <th className="p-3 text-center">ACTION</th>
                                        </tr>
                                     </thead>
                                     <tbody className="divide-y divide-emerald-500/5">
                                        {(data as any).bulanan.map((item: any, i: number) => (
                                          <tr key={i}>
                                             <td className="p-2 w-1/3"><input type="text" value={item.jadwal} onChange={e => handleNestedArrayChange('bulanan', i, 'jadwal', e.target.value)} className={inputClass} /></td>
                                             <td className="p-2"><input type="text" value={item.acara} onChange={e => handleNestedArrayChange('bulanan', i, 'acara', e.target.value)} className={inputClass} /></td>
                                             <td className="p-2 text-center"><button onClick={() => removeNestedArrayItem('bulanan', i)} className="text-red-500/50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></td>
                                          </tr>
                                        ))}
                                     </tbody>
                                  </table>
                               </div>
                            </div>
                         </div>
                       )}

                       {section === 'pendidikan' && (
                         <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                               <label className={labelClass}>DATA_PENDIDIKAN_TABLE</label>
                               <button onClick={() => addArrayItem({ title: 'Unit Baru', type: 'Formal' })} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-1">
                                  <Plus className="w-3 h-3" /> ADD_UNIT
                               </button>
                            </div>
                            <div className="bg-black/20 rounded-lg border border-emerald-500/10">
                               <table className="w-full text-left text-xs">
                                  <thead className="bg-emerald-950/40 text-emerald-500/70 text-[9px] uppercase tracking-widest">
                                     <tr>
                                        <th className="p-3">NAMA_UNIT</th>
                                        <th className="p-3">TIPE_PENDIDIKAN</th>
                                        <th className="p-3 text-center">ACTION</th>
                                     </tr>
                                  </thead>
                                  <tbody className="divide-y divide-emerald-500/5">
                                     {(data as any[]).map((edu, i) => (
                                       <tr key={i}>
                                          <td className="p-2"><input type="text" value={edu.title} onChange={e => handleArrayChange(i, { ...edu, title: e.target.value })} className={inputClass} /></td>
                                          <td className="p-2">
                                             <select value={edu.type} onChange={e => handleArrayChange(i, { ...edu, type: e.target.value })} className={inputClass}>
                                                <option value="Formal">Formal</option>
                                                <option value="Non Formal">Non Formal</option>
                                             </select>
                                          </td>
                                          <td className="p-2 text-center"><button onClick={() => removeArrayItem(i)} className="text-red-500/50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></td>
                                       </tr>
                                     ))}
                                  </tbody>
                               </table>
                            </div>
                         </div>
                       )}

                       {section === 'galeri' && (
                         <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                               <label className={labelClass}>GALERI_DATA_TABLE</label>
                               <button onClick={() => addArrayItem({ url: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3', desc: 'Deskripsi Foto', date: new Date().toLocaleDateString('id-ID') })} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-1">
                                  <Plus className="w-3 h-3" /> ADD_GALLERY_ITEM
                               </button>
                            </div>
                            <div className="bg-black/20 rounded-lg border border-emerald-500/10 overflow-hidden">
                               <table className="w-full text-left text-xs">
                                  <thead className="bg-emerald-950/40 text-emerald-500/70 text-[9px] uppercase tracking-widest font-black">
                                     <tr>
                                        <th className="p-3 w-40">PREVIEW / URL</th>
                                        <th className="p-3">DESKRIPSI</th>
                                        <th className="p-3 w-40">TANGGAL</th>
                                        <th className="p-3 text-center">ACTION</th>
                                     </tr>
                                  </thead>
                                  <tbody className="divide-y divide-emerald-500/5">
                                     {(data as any[]).map((item, i) => (
                                       <tr key={i} className="hover:bg-emerald-500/5 transition-colors group/gal">
                                          <td className="p-2">
                                             <div className="space-y-2">
                                                <div className="w-full aspect-video bg-black rounded overflow-hidden border border-emerald-500/20 relative group">
                                                   <img src={item.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                      <input 
                                                        type="file" 
                                                        id={`gallery-upload-${i}`}
                                                        className="hidden" 
                                                        accept="image/*"
                                                        onChange={async (e) => {
                                                          const file = e.target.files?.[0];
                                                          if (file) {
                                                            const base64 = await fileToBase64(file);
                                                            handleArrayChange(i, { ...item, url: base64 });
                                                          }
                                                        }}
                                                      />
                                                      <label htmlFor={`gallery-upload-${i}`} className="p-2 bg-emerald-500 text-black rounded-full cursor-pointer hover:scale-110 transition-transform">
                                                         <Plus className="w-4 h-4" />
                                                      </label>
                                                   </div>
                                                </div>
                                                <input type="text" value={item.url} onChange={e => handleArrayChange(i, { ...item, url: e.target.value })} className={inputClass + " text-[8px] py-1"} placeholder="Or paste Image URL" />
                                             </div>
                                          </td>
                                          <td className="p-2">
                                             <textarea value={item.desc} onChange={e => handleArrayChange(i, { ...item, desc: e.target.value })} className={inputClass} rows={3} placeholder="Deskripsi foto..." />
                                          </td>
                                          <td className="p-2">
                                             <input type="text" value={item.date} onChange={e => handleArrayChange(i, { ...item, date: e.target.value })} className={inputClass} placeholder="Tanggal" />
                                          </td>
                                          <td className="p-2 text-center">
                                             <button onClick={() => removeArrayItem(i)} className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded transition-all">
                                                <Trash2 className="w-4 h-4" />
                                             </button>
                                          </td>
                                       </tr>
                                     ))}
                                  </tbody>
                               </table>
                            </div>
                         </div>
                       )}

                       {section === 'berita' && (
                         <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                               <label className={labelClass}>DAFTAR_BERITA_TABLE</label>
                               <button onClick={() => addArrayItem({ title: 'Berita Baru', desc: 'Isi berita...', date: new Date().toLocaleDateString('id-ID'), photo: 'https://images.unsplash.com/photo-1523050335392-93851179ae22' })} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-1">
                                  <Plus className="w-3 h-3" /> ADD_NEWS
                               </button>
                            </div>
                            <div className="bg-black/20 rounded-lg border border-emerald-500/10 overflow-hidden">
                               <table className="w-full text-left text-xs">
                                  <thead className="bg-emerald-950/40 text-emerald-500/70 text-[9px] uppercase tracking-widest font-black">
                                     <tr>
                                        <th className="p-3 w-40">PHOTO_PREVIEW</th>
                                        <th className="p-3">KONTEN_BERITA</th>
                                        <th className="p-3 w-40">DATE_STAMP</th>
                                        <th className="p-3 text-center">ACTION</th>
                                     </tr>
                                  </thead>
                                  <tbody className="divide-y divide-emerald-500/5">
                                     {(data as any[]).map((b, i) => (
                                       <tr key={i} className="hover:bg-emerald-500/5 transition-colors group/news">
                                          <td className="p-2">
                                             <div className="space-y-2">
                                                <div className="w-full aspect-video bg-black rounded overflow-hidden border border-emerald-500/20 relative group">
                                                   <img src={b.photo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                      <input 
                                                        type="file" 
                                                        id={`news-upload-${i}`}
                                                        className="hidden" 
                                                        accept="image/*"
                                                        onChange={async (e) => {
                                                          const file = e.target.files?.[0];
                                                          if (file) {
                                                            const base64 = await fileToBase64(file);
                                                            handleArrayChange(i, { ...b, photo: base64 });
                                                          }
                                                        }}
                                                      />
                                                      <label htmlFor={`news-upload-${i}`} className="p-2 bg-emerald-500 text-black rounded-full cursor-pointer hover:scale-110 transition-transform">
                                                         <Plus className="w-4 h-4" />
                                                      </label>
                                                   </div>
                                                </div>
                                                <input type="text" value={b.photo} onChange={e => handleArrayChange(i, { ...b, photo: e.target.value })} className={inputClass + " text-[8px] py-1"} placeholder="Or paste Photo URL" />
                                             </div>
                                          </td>
                                          <td className="p-2 space-y-2">
                                             <input type="text" value={b.title} onChange={e => handleArrayChange(i, { ...b, title: e.target.value })} className={inputClass + " font-black text-sm"} placeholder="Judul Berita" />
                                             <textarea value={b.desc} onChange={e => handleArrayChange(i, { ...b, desc: e.target.value })} className={inputClass} rows={4} placeholder="Isi berita..." />
                                          </td>
                                          <td className="p-2">
                                             <input type="text" value={b.date} onChange={e => handleArrayChange(i, { ...b, date: e.target.value })} className={inputClass} />
                                          </td>
                                          <td className="p-2 text-center">
                                             <button onClick={() => removeArrayItem(i)} className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded transition-all">
                                                <Trash2 className="w-4 h-4" />
                                             </button>
                                          </td>
                                       </tr>
                                     ))}
                                  </tbody>
                               </table>
                            </div>
                         </div>
                       )}

                       <div className="pt-6 border-t border-emerald-500/10 flex justify-between items-center">
                          <div className="flex items-center gap-2 text-emerald-500/50 text-[10px] font-black uppercase tracking-widest">
                             <Shield className="w-3 h-3" /> SYSTEM_CONNECTION_LIVE :: REAL_TIME_SYNC_ENABLED
                          </div>
                          <div className="text-[10px] font-mono text-emerald-500/30">
                             LAST_UPDATE: {new Date().toISOString()}
                          </div>
                       </div>
                    </div>
                 </div>
               );
            }

            return null;
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen relative bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-950 to-black text-emerald-50 flex h-screen overflow-hidden font-mono">
      {/* Background scanline effect */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden opacity-5">
        <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      </div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarCollapsed ? '80px' : '260px',
          x: (typeof window !== 'undefined' && window.innerWidth < 1024) ? (isSidebarOpen ? 0 : -260) : 0
        }}
        className={`fixed lg:static inset-y-0 left-0 z-[70] bg-black/40 backdrop-blur-2xl border-r border-emerald-500/20 flex flex-col shadow-[0_0_50px_rgba(16,185,129,0.1)] transition-transform lg:transition-none`}
      >
        <div className="h-16 flex items-center justify-between px-6 bg-emerald-950/50 text-emerald-400 border-b border-emerald-500/20 shrink-0 relative z-10">
          {!isSidebarCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-black text-lg tracking-[0.2em] drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] flex items-center gap-2"
            >
              <Terminal className="w-5 h-5" />
              SYSTEM.ADMIN
            </motion.span>
          )}
          {isSidebarCollapsed && <Terminal className="w-6 h-6 mx-auto animate-pulse" />}
          
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all ml-auto"
          >
            {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
          
          <button className="lg:hidden text-emerald-400" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar relative z-10">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="mb-6">
              {!isSidebarCollapsed && (
                <motion.h3 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-6 text-[10px] font-bold text-cyan-600 uppercase tracking-[0.3em] mb-2 drop-shadow-[0_0_2px_rgba(6,182,212,0.8)]"
                >
                  {group.title}
                </motion.h3>
              )}
              {isSidebarCollapsed && <div className="h-px bg-cyan-900/30 mx-4 mb-2" />}
              
              <ul className="space-y-1 px-3">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <li key={item.id}>
                      <motion.button
                        whileHover={{ x: 4, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setActiveTab(item.id);
                          if (window.innerWidth < 1024) setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center py-3' : 'px-3 py-2.5'} text-[11px] uppercase tracking-widest font-black rounded transition-all duration-300 relative group ${
                          isActive 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                            : 'text-slate-400 hover:text-emerald-300 border border-transparent'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSidebarCollapsed ? '' : 'mr-3'} ${isActive ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]' : 'text-slate-500 group-hover:text-emerald-400'} transition-colors`} />
                        {!isSidebarCollapsed && <span>{item.label}</span>}
                        
                        {isActive && (
                          <motion.div 
                            layoutId="active-indicator"
                            className="absolute left-[-3px] top-1 bottom-1 w-[3px] bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,1)]"
                          />
                        )}

                        {isSidebarCollapsed && (
                          <div className="absolute left-16 bg-emerald-950 border border-emerald-500/50 text-emerald-100 px-3 py-2 rounded text-[10px] font-black uppercase tracking-widest opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                            {item.label}
                          </div>
                        )}
                      </motion.button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-emerald-500/20 shrink-0 relative z-10">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center p-3' : 'px-4 py-2'} bg-red-950/30 border border-red-500/30 text-red-500 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 text-xs uppercase tracking-widest font-black rounded transition-all shadow-[0_0_10px_rgba(239,68,68,0.1)] group relative`}
          >
            <LogOut className={`w-4 h-4 ${isSidebarCollapsed ? '' : 'mr-2'}`} />
            {!isSidebarCollapsed && <span>TERMINATE_SESSION</span>}
            {isSidebarCollapsed && (
               <div className="absolute left-16 bg-red-950 border border-red-500/50 text-red-100 px-3 py-2 rounded text-[10px] font-black uppercase tracking-widest opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                 TERMINATE_SESSION
               </div>
             )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-16 bg-black/40 backdrop-blur-md border-b border-emerald-500/20 flex items-center px-4 sm:px-6 lg:px-8 shrink-0 relative z-20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
           <button 
            className="lg:hidden mr-4 text-emerald-400 p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
             <h1 className="text-xs sm:text-sm font-black text-emerald-100 uppercase tracking-[0.3em] drop-shadow-[0_0_5px_rgba(52,211,153,0.5)] font-mono">
               ROOT::SYS_LOG::ID::{activeTab.toUpperCase()}
             </h1>
          </div>
          
          <div className="ml-auto flex items-center gap-4 text-[10px] font-black opacity-60">
             <div className="hidden sm:flex items-center gap-2 text-cyan-500 uppercase tracking-widest">
                <Shield className="w-3 h-3" />
                SECURE_ENCRYPTION_ACTIVE
             </div>
             <div className="w-px h-4 bg-emerald-500/20"></div>
             <div className="flex items-center gap-2 text-emerald-400 uppercase tracking-widest">
                <Users className="w-3 h-3" />
                {users.length} OPS_ONLINE
             </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto flex flex-col custom-scrollbar bg-[rgba(16,185,129,0.02)]">
          <div className="p-4 sm:p-6 lg:p-8 flex-1 w-full max-w-7xl mx-auto">
            {renderContent()}
          </div>
          
          {/* Footer */}
          <footer className="bg-black/40 backdrop-blur-md border-t border-emerald-500/20 py-4 mt-auto">
            <div className="px-4 sm:px-6 lg:px-8 text-center flex flex-col md:flex-row justify-center md:space-x-4 items-center space-y-1 md:space-y-0">
              <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em] font-black">
                OS_CORE_V2.0.46_BETA_PRIVE
              </p>
              <div className="hidden md:block text-slate-700 font-bold">•</div>
              <div className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.4em] drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]">
                Created By Thoif
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
