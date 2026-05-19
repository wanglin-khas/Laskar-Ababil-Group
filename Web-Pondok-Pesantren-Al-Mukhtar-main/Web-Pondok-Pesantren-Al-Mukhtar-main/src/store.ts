import { create } from 'zustand';

export interface RegistrationData {
  id: string;
  nama: string;
  jalurPendidikan: 'MI' | 'MTs' | 'MA' | 'S1' | 'Tidak Sekolah';
  jenisKelamin: 'L' | 'P';
  tempatLahir: string;
  tanggalLahir: string;
  nik: string;
  nisn?: string;
  noTelfon: string;
  namaAyah: string;
  namaIbu: string;
  alamat: string;
  rt: string;
  rw: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  photoKK: string;
  photoAkta: string;
  photoKTP: string;
  photoIjazah: string;
  photoTidakMampu?: string;
  photoKematian?: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
}

export interface UserData {
  id: string;
  namaLengkap: string;
  username: string;
  level: string;
  foto: string;
}

export interface JadwalPendaftaran {
  tanggalMulai: string;
  tanggalAkhir: string;
}

export interface WebContent {
  home: { 
    title: string; 
    subtitle: string;
    features: { title: string; desc: string; icon: string }[];
    alur: { title: string; desc: string }[];
    banners: { url: string; desc: string }[];
    descriptions: { title: string; content: string }[];
    heroImage: string;
  };
  tentang: { sejarah: string; visi: string; misi: string[]; photo: string };
  kajian: string[];
  program: {
    unggulan: string[];
    tahunan: { bulan: string; acara: string }[];
    bulanan: { jadwal: string; acara: string }[];
  };
  pendidikan: { title: string; type: string }[];
  galeri: { url: string; desc: string; date: string }[];
  berita: { title: string; desc: string; date: string; photo: string }[];
}

const defaultJadwal: JadwalPendaftaran = {
  tanggalMulai: '2026-05-01',
  tanggalAkhir: '2026-07-31'
};

const defaultUsers: UserData[] = [
  { id: '1', namaLengkap: 'Administrator', username: 'admin', level: 'Super Admin', foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' }
];

const defaultContent: WebContent = {
  home: {
    title: 'Pondok Pesantren Al Mukhtar',
    subtitle: 'Menjaga Tradisi Lama Yang Baik & Mengambil Tradisi Baru Yang Lebih Baik. Mencetak Generasi Kreatif, Inovatif, Mandiri, dan Berakhlak Mulia.',
    features: [
      { title: 'Pendidikan Islami', desc: 'Madrasah Diniyah, Tahfidzul Qur\'an, dan kajian kitab kuning yang komprehensif.', icon: 'BookOpen' },
      { title: 'Pendidikan Formal', desc: 'Tersedia pendidikan formal dari tingkat MI, MTs hingga MA di bawah naungan yayasan.', icon: 'GraduationCap' },
      { title: 'Program Unggulan', desc: 'Multimedia, Pertanian, Perkebunan, dan Konstruksi Bangunan untuk bekal kemandirian santri.', icon: 'Users' }
    ],
    alur: [
      { title: 'Mengisi Formulir', desc: 'Mengisi Formulir Pendaftaran Baik Online Maupun Offline' },
      { title: 'Masuk Pesantren', desc: 'Masuk Pesantren Pada Tanggal 10 Juli 2025' },
      { title: 'Penyeleksian', desc: 'Mengikuti Penyeleksian Pada Tanggal 11 Juli 2025' },
      { title: 'Matsaba', desc: 'Mengikuti Matsaba (Masa Ta\'aruf Santri Baru)' },
      { title: 'Mulai Kajian', desc: 'Mengikuti Kajian Baik Diniyah Maupun Bandongan dan Seluruh Kajian di Pesantren' }
    ],
    banners: [
      { url: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=800&auto=format&fit=crop", desc: "Suasana Kajian" },
      { url: "https://images.unsplash.com/photo-1574888209804-92e10db79f32?q=80&w=800&auto=format&fit=crop", desc: "Gedung Pesantren" }
    ],
    descriptions: [
      { title: "Visi Kami", content: "Mencetak generasi yang berakhlaqul karimah dan menguasai teknologi." },
      { title: "Misi Kami", content: "Menyelenggarakan pendidikan pesantren yang terpadu antara ilmu agama dan umum." }
    ],
    heroImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2000&auto=format&fit=crop'
  },
  tentang: {
    sejarah: 'Pondok Pesantren Al Mukhtar adalah suatu lembaga pendidikan islam yang didirikan pada tahun 2000 M. oleh Al Maghfurlah KH. Achmad Tamam dan Ny. Hj. Ami Sri Asih...',
    visi: 'Serta Mencetak Generasi Yang Berpengetahuan Kreatif, Inovatif, Mandiri, Amanah, Dan Mampu Menjadi Pelopor (Pemimpin) Dalam Kehidupan Bermasyarakat, Kokoh Dalam Imam Dan Taqwa, Serta Memiliki Daya Saing Dalam Lingkungannya.',
    misi: [
      'Menjadikan Santri Yang Unggul Dalam Ilmu Pengetahuan Tawadhu Dalam Bermasyarakat, & Selalu Berbudi Luhur.',
      'Terbentuknya Generasi Ulama Yang Berbudi Luhur, Berkhidmah Kepada Masyarakat, Serta Terwujudnya Warga Negara Berkepribadian Nasionalis Yang Berlandasan Ahlusunnah Wal Jamaah Dan Beriman Serta Bertaqwa Kepada Allah SWT.'
    ],
    photo: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=800&auto=format&fit=crop"
  },
  kajian: [
    "Kajian Diniyah",
    "Kajian Bandongan",
    "Sorogan Kitab",
    "Setoran Hafalan Kitab & Suratan Wajib (Surat Yasin, Waqiah, Ar Rohman, Al Mulk & Juz Amma)",
    "Tadarus Al Qur'an"
  ],
  program: {
    unggulan: ["Kitab Kuning", "Tahfidzul Qur'an", "Bhs. Arab Dasar", "Multi Media", "Pertanian", "Perkebunan", "Kontruksi Bangunan", "Hafalan Hadist", "Praktek Ibadah"],
    tahunan: [
      { bulan: "Bulan Sya'ban", acara: "Akhirussanah PP Al-Mukhtar" },
      { bulan: "Bulan Muharrom & Rajab", acara: "Peringatan Hari Besar Islam" }
    ],
    bulanan: [
      { jadwal: "Malem Tanggal 07", acara: "Mujahadah Bersama" },
      { jadwal: "Minggu ke 3", acara: "Qiroah" }
    ]
  },
  pendidikan: [
    { title: "Madrasah Diniyah Al Mukhtar", type: "Non Formal" },
    { title: "TPQ Al Mukhtar", type: "Non Formal" },
    { title: "MI Al Mukhtar", type: "Formal" },
    { title: "MTs Al Mukhtar", type: "Formal" },
    { title: "MA Al Mukhtar", type: "Formal" }
  ],
  galeri: [
    { url: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=800&auto=format&fit=crop", desc: "Kajian Rutin Santri", date: "10 Mei 2025" },
    { url: "https://images.unsplash.com/photo-1574888209804-92e10db79f32?q=80&w=800&auto=format&fit=crop", desc: "Gedung Utama Pesantren", date: "12 Mei 2025" }
  ],
  berita: [
    { 
      title: "Pendaftaran Santri Baru Telah Dibuka", 
      desc: "Mari bergabung bersama Pondok Pesantren Al Mukhtar untuk tahun ajaran 2025/2026 yang lebih berkah.", 
      date: "15 Mei 2025",
      photo: "https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=800&auto=format&fit=crop"
    }
  ]
};

interface AppState {
  registrations: RegistrationData[];
  webContent: WebContent;
  isAdminAuthenticated: boolean;
  jadwalPendaftaran: JadwalPendaftaran;
  users: UserData[];
  addRegistration: (data: Omit<RegistrationData, 'id' | 'status' | 'createdAt'>) => void;
  updateRegistration: (id: string, data: Partial<RegistrationData>) => void;
  updateStatus: (id: string, status: 'verified' | 'rejected' | 'pending') => void;
  deleteRegistration: (id: string) => void;
  updateWebContent: (section: keyof WebContent, data: any) => void;
  updateJadwal: (data: JadwalPendaftaran) => void;
  addUser: (user: Omit<UserData, 'id'>) => void;
  updateUser: (id: string, user: Partial<UserData>) => void;
  deleteUser: (id: string) => void;
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
}

export const useStore = create<AppState>((set) => ({
  registrations: JSON.parse(localStorage.getItem('registrations') || '[]'),
  webContent: JSON.parse(localStorage.getItem('webContent') || JSON.stringify(defaultContent)),
  isAdminAuthenticated: localStorage.getItem('isAdminAuthenticated') === 'true',
  jadwalPendaftaran: JSON.parse(localStorage.getItem('jadwalPendaftaran') || JSON.stringify(defaultJadwal)),
  users: JSON.parse(localStorage.getItem('users') || JSON.stringify(defaultUsers)),
  addRegistration: (data) => set((state) => {
    const currentYear = new Date().getFullYear();
    const prefix = `PD${currentYear}-`;
    
    const yearRegistrations = state.registrations.filter(r => r.id.startsWith(prefix));
    let maxSeq = 0;
    yearRegistrations.forEach(r => {
      const parts = r.id.split('-');
      if (parts.length === 2) {
        const seq = parseInt(parts[1], 10);
        if (!isNaN(seq) && seq > maxSeq) {
          maxSeq = seq;
        }
      }
    });
    
    const nextSeq = maxSeq + 1;
    const formattedId = `${prefix}${nextSeq.toString().padStart(4, '0')}`;

    const newReg = {
      ...data,
      id: formattedId,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };
    const newState = [...state.registrations, newReg];
    localStorage.setItem('registrations', JSON.stringify(newState));
    return { registrations: newState };
  }),
  updateRegistration: (id, data) => set((state) => {
    const newState = state.registrations.map(r => r.id === id ? { ...r, ...data } : r);
    localStorage.setItem('registrations', JSON.stringify(newState));
    return { registrations: newState };
  }),
  updateStatus: (id, status) => set((state) => {
    const newState = state.registrations.map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem('registrations', JSON.stringify(newState));
    return { registrations: newState };
  }),
  deleteRegistration: (id) => set((state) => {
    const newState = state.registrations.filter(r => r.id !== id);
    localStorage.setItem('registrations', JSON.stringify(newState));
    return { registrations: newState };
  }),
  updateWebContent: (section, data) => set((state) => {
    const newContent = { ...state.webContent, [section]: data };
    localStorage.setItem('webContent', JSON.stringify(newContent));
    return { webContent: newContent };
  }),
  updateJadwal: (data) => set(() => {
    localStorage.setItem('jadwalPendaftaran', JSON.stringify(data));
    return { jadwalPendaftaran: data };
  }),
  addUser: (data) => set((state) => {
    const newUser = { ...data, id: Date.now().toString() };
    const newState = [...state.users, newUser];
    localStorage.setItem('users', JSON.stringify(newState));
    return { users: newState };
  }),
  updateUser: (id, data) => set((state) => {
    const newState = state.users.map(u => u.id === id ? { ...u, ...data } : u);
    localStorage.setItem('users', JSON.stringify(newState));
    return { users: newState };
  }),
  deleteUser: (id) => set((state) => {
    const newState = state.users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(newState));
    return { users: newState };
  }),
  loginAdmin: (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      set({ isAdminAuthenticated: true });
      return true;
    }
    return false;
  },
  logoutAdmin: () => {
    localStorage.removeItem('isAdminAuthenticated');
    set({ isAdminAuthenticated: false });
  }
}));
