import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, UploadCloud, AlertCircle } from 'lucide-react';
import { useStore } from '../store';
import { compressImage } from '../lib/imageUtils';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];

const fileSchema = z
  .any()
  .refine((file) => file && file.length > 0, "File harus diunggah.")
  .refine((file) => !file || file.length === 0 || file[0]?.size <= MAX_FILE_SIZE, "Ukuran file maksimal 5MB.")
  .refine(
    (file) => !file || file.length === 0 || ACCEPTED_FILE_TYPES.includes(file[0]?.type),
    "Hanya format .jpg, .jpeg, .png, .webp, dan .pdf yang didukung."
  );

const optionalFileSchema = z
  .any()
  .optional()
  .refine((file) => !file || file.length === 0 || file[0]?.size <= MAX_FILE_SIZE, "Ukuran file maksimal 5MB.")
  .refine(
    (file) => !file || file.length === 0 || ACCEPTED_FILE_TYPES.includes(file[0]?.type),
    "Hanya format .jpg, .jpeg, .png, .webp, dan .pdf yang didukung."
  );

const formSchema = z.object({
  nama: z.string().min(3, 'Nama lengkap Minimal 3 karakter'),
  jenisKelamin: z.enum(['L', 'P'], {
    message: "Jenis kelamin harus dipilih",
  }),
  jalurPendidikan: z.enum(['MI', 'MTs', 'MA', 'S1', 'Tidak Sekolah'], {
    message: "Jalur Pendidikan harus dipilih",
  }),
  tempatLahir: z.string().min(1, 'Tempat lahir harus diisi'),
  tanggalLahir: z.string().min(1, 'Tanggal lahir harus diisi'),
  nik: z.string().min(16, 'NIK minimal 16 digit').max(16, 'NIK maksimal 16 digit'),
  nisn: z.string().optional(),
  noTelfon: z.string().min(10, 'Nomor telepon minimal 10 digit').max(15, 'Nomor telepon maksimal 15 digit'),
  namaAyah: z.string().min(3, 'Nama Ayah minimal 3 karakter'),
  namaIbu: z.string().min(3, 'Nama Ibu minimal 3 karakter'),
  alamat: z.string().min(10, 'Alamat minimal 10 karakter'),
  rt: z.string().min(1, 'RT harus diisi'),
  rw: z.string().min(1, 'RW harus diisi'),
  desa: z.string().min(3, 'Desa harus diisi'),
  kecamatan: z.string().min(3, 'Kecamatan harus diisi'),
  kabupaten: z.string().min(3, 'Kabupaten harus diisi'),
  provinsi: z.string().min(3, 'Provinsi harus diisi'),
  photoKK: fileSchema,
  photoAkta: fileSchema,
  photoKTP: fileSchema,
  photoIjazah: fileSchema,
  photoTidakMampu: optionalFileSchema,
  photoKematian: optionalFileSchema,
}).superRefine((data, ctx) => {
  if (data.jalurPendidikan !== 'Tidak Sekolah' && (!data.nisn || data.nisn.length < 1)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "NISN harus diisi",
      path: ["nisn"],
    });
  }
});

type FormValues = z.infer<typeof formSchema>;

export default function Pendaftaran({ isAdmin = false }: { isAdmin?: boolean }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addRegistration = useStore(state => state.addRegistration);
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const watchAllFields = watch();

  const isHologram = true; // Set to true to apply hologram design

  const containerClass = isHologram
    ? "max-w-3xl mx-auto bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] border border-cyan-500/30 overflow-hidden relative"
    : isAdmin 
      ? "max-w-3xl mx-auto bg-black/30 backdrop-blur-md rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.1)] border border-cyan-500/20 overflow-hidden" 
      : "max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden";

  const headerClass = isHologram
    ? "relative bg-gradient-to-r from-cyan-900/60 via-blue-900/60 to-cyan-900/60 px-6 py-10 text-center border-b border-cyan-400/30 overflow-hidden"
    : isAdmin 
      ? "bg-cyan-950/40 px-6 py-8 text-center text-cyan-100 border-b border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
      : "bg-[#164e3b] px-6 py-8 text-center text-white border-b-4 border-[#d4af37]";

  const inputClass = isHologram
    ? "w-full rounded-xl border border-cyan-500/20 px-4 py-2.5 bg-black/40 text-cyan-50 placeholder-cyan-700 outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] backdrop-blur-sm"
    : isAdmin
      ? "w-full rounded-xl border border-cyan-500/30 px-4 py-2.5 outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_8px_rgba(6,182,212,0.3)] bg-black/50 text-cyan-100"
      : "w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white";

  const labelClass = isHologram
    ? "block text-[11px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-1.5 opacity-80"
    : isAdmin
      ? "block text-[10px] font-bold text-cyan-600 uppercase tracking-widest mb-1"
      : "block text-sm font-medium text-gray-700";

  const sectionHeaderClass = isHologram
    ? "text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 border-b border-cyan-500/20 pb-2 uppercase tracking-widest flex items-center gap-3"
    : isAdmin
      ? "text-lg font-bold text-cyan-100 border-b border-cyan-500/20 pb-2 uppercase tracking-widest shadow-[0_0_5px_rgba(6,182,212,0.1)]"
      : "text-lg font-bold text-gray-900 border-b pb-2";

  const buttonClass = isHologram
    ? "w-full py-4 px-6 rounded-xl font-black uppercase tracking-[0.3em] text-cyan-50 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-400/50 hover:from-cyan-500/40 hover:to-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] disabled:opacity-50"
    : isAdmin
      ? "w-full font-bold flex justify-center py-3.5 px-4 border border-cyan-500/50 rounded-xl text-cyan-100 bg-cyan-950/50 hover:bg-cyan-500/20 focus:outline-none transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] uppercase tracking-widest"
      : "w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-[#164e3b] bg-[#d4af37] hover:bg-[#c4a132] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4af37] transition-all";

  const fileInputClass = isHologram
    ? "block w-full text-xs text-transparent file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border file:border-cyan-400/30 file:text-[10px] file:font-black file:uppercase file:bg-cyan-900/40 file:text-cyan-400 hover:file:bg-cyan-400 hover:file:text-black cursor-pointer border border-cyan-500/20 rounded-xl px-3 py-2 bg-black/40 transition-all font-mono"
    : isAdmin
      ? "block w-full text-sm text-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-cyan-950/50 file:text-cyan-300 hover:file:bg-cyan-500/20 cursor-pointer border border-cyan-500/30 rounded-xl px-3 py-2 bg-black/50"
      : "block w-full text-sm text-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-[#164e3b] hover:file:bg-green-100 cursor-pointer border border-gray-300 rounded-xl px-3 py-2";

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Helper to process files safely with compression for images
      const getFileBase64 = async (fileList: any) => {
        if (fileList && fileList.length > 0 && fileList[0] instanceof File) {
          const file = fileList[0];
          // Only compress if it's an image
          if (file.type.startsWith('image/')) {
            return await compressImage(file, 800, 0.5); // Max 800px, 50% quality
          }
          // For PDFs or other files, just convert to base64
          return await fileToBase64(file);
        }
        return '';
      };

      const payload = {
        nama: data.nama,
        jenisKelamin: data.jenisKelamin,
        jalurPendidikan: data.jalurPendidikan,
        tempatLahir: data.tempatLahir,
        tanggalLahir: data.tanggalLahir,
        nik: data.nik,
        nisn: data.nisn || '',
        noTelfon: data.noTelfon,
        namaAyah: data.namaAyah,
        namaIbu: data.namaIbu,
        alamat: data.alamat,
        rt: data.rt,
        rw: data.rw,
        desa: data.desa,
        kecamatan: data.kecamatan,
        kabupaten: data.kabupaten,
        provinsi: data.provinsi,
        photoKK: await getFileBase64(data.photoKK),
        photoAkta: await getFileBase64(data.photoAkta),
        photoKTP: await getFileBase64(data.photoKTP),
        photoIjazah: await getFileBase64(data.photoIjazah),
        photoTidakMampu: data.photoTidakMampu?.[0] ? await getFileBase64(data.photoTidakMampu) : undefined,
        photoKematian: data.photoKematian?.[0] ? await getFileBase64(data.photoKematian) : undefined,
      };

      // Validation check for required photos (redundant but safe)
      if (!payload.photoKK || !payload.photoAkta || !payload.photoKTP || !payload.photoIjazah) {
        throw new Error('Beberapa dokumen wajib gagal diproses. Silakan pilih ulang file.');
      }

      addRegistration(payload);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    } catch (error: any) {
      console.error('Submission Error:', error);
      if (error.name === 'QuotaExceededError' || error.message?.includes('quota')) {
        alert('Memori penyimpanan penuh (Browser Storage Limit). Coba gunakan ukuran file yang lebih kecil (di bawah 1MB) atau hapus pendaftaran lama di Admin.');
      } else {
        alert(error.message || 'Terjadi kesalahan saat memproses data. Silakan coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileInput = ({ id, label, required = true, error }: { id: keyof FormValues, label: string, required?: boolean, error?: string }) => {
    const fileList = watchAllFields[id] as unknown as FileList;
    const hasFile = fileList && fileList.length > 0;
    const fileName = hasFile ? fileList[0].name : '';

    return (
      <div className="space-y-1">
        <label className={labelClass}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className={`relative group rounded-xl border transition-all ${
          error ? 'border-red-500/50 bg-red-500/5' : 
          hasFile ? 'border-cyan-400/50 bg-cyan-400/5' : 
          'border-cyan-500/20 bg-black/40'
        }`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UploadCloud className={`w-4 h-4 ${hasFile ? 'text-cyan-400' : 'text-cyan-600'}`} />
          </div>
          <input 
            type="file" 
            id={id}
            accept="image/*,application/pdf"
            className={`${fileInputClass} !border-none !bg-transparent pl-10`}
            {...register(id)}
          />
          {hasFile && (
            <div className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none flex items-center gap-2">
              <span className="text-[10px] text-cyan-400 font-mono truncate max-w-[120px]">
                {fileName}
              </span>
              <CheckCircle2 className="w-3 h-3 text-cyan-400" />
            </div>
          )}
          {isHologram && <div className="absolute inset-0 pointer-events-none rounded-xl border border-cyan-500/0 group-hover:border-cyan-500/30 transition-all shadow-[0_0_15px_rgba(34,211,238,0)] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"></div>}
        </div>
        {error && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{error}</p>}
      </div>
    );
  };

  if (isSuccess) {
    return (
      <div className={`${isHologram ? 'bg-[#020617] min-h-screen py-12 px-4 relative flex items-center justify-center' : 'max-w-2xl mx-auto py-12 px-4 text-center space-y-6'}`}>
        {isHologram && (
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
          </div>
        )}
        <div className={containerClass + " p-12 text-center"}>
          <div className="flex justify-center mb-6 relative">
            <div className={`p-6 ${isHologram ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.4)]' : 'bg-green-100 text-green-600'} rounded-full`}>
              <CheckCircle2 className="h-16 w-16" />
            </div>
            {isHologram && <div className="absolute -inset-4 bg-cyan-400/20 rounded-full blur-2xl animate-pulse"></div>}
          </div>
          <h1 className={isHologram ? "text-3xl font-black text-white uppercase tracking-[0.3em] mb-4 drop-shadow-[0_0_10px_cyan]" : "text-3xl font-bold text-gray-900"}>PENDAFTARAN SUKSES</h1>
          <p className={isHologram ? "text-cyan-400/80 text-sm font-bold uppercase tracking-widest leading-relaxed mb-8" : "text-gray-600 text-lg"}>
            Unit Transmisi Mengonfirmasi: Sinyal Pendaftaran Diterima.<br/>Silahkan Tunggu Notif Dari Panitia PSB Al Mukhtar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 relative z-10">
            <button 
              onClick={() => navigate('/')}
              className={isHologram ? "w-full sm:w-auto px-8 py-3.5 border border-cyan-500/30 text-cyan-400 font-black uppercase tracking-widest rounded-xl hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2" : "px-6 py-3 border-2 border-[#164e3b] text-[#164e3b] font-medium rounded-xl hover:bg-[#164e3b] hover:text-white transition-colors"}
            >
              Beranda
            </button>
            <button 
              onClick={() => window.location.reload()}
              className={isHologram ? buttonClass : "px-6 py-3 bg-[#164e3b] text-white font-medium rounded-xl hover:bg-[#0f382a] transition-colors"}
            >
              SANTRI_BARU++
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isHologram ? 'bg-[#020617] min-h-screen py-10 px-4 relative overflow-hidden' : ''}`}>
      {isHologram && (
        <>
          {/* Hologram Background Extras */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_10px_cyan] animate-scanline"></div>
          </div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
        </>
      )}

      <div className={containerClass}>
        {isHologram && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/50"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/50"></div>
          </div>
        )}

        <div className={headerClass}>
          {isHologram && (
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
          )}
          <h2 className={isHologram ? "text-3xl md:text-4xl font-black uppercase tracking-[0.4em] text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] relative z-10" : isAdmin ? "text-xl md:text-2xl font-bold uppercase tracking-widest drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" : "text-2xl md:text-3xl font-bold"}>
            Pendaftaran
          </h2>
          <p className={isHologram ? "mt-4 text-cyan-400 text-xs font-black uppercase tracking-[0.5em] opacity-80 relative z-10" : isAdmin ? "mt-2 text-cyan-500 text-[10px] font-bold uppercase tracking-widest" : "mt-2 text-green-100"}>
            Unit Transmisi Santri Baru 2026
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10 space-y-10 relative z-10">
          <div className="space-y-6">
            <h3 className={sectionHeaderClass}>
              {isHologram && <span className="w-2 h-6 bg-cyan-400 shadow-[0_0_10px_cyan]"></span>}
              Biodata Utama
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className={labelClass}>Nama Lengkap <span className="text-red-500">*</span></label>
                <input 
                  {...register('nama')} 
                  className={inputClass} 
                  placeholder="IDENTITAS_LENGKAP" 
                />
                {errors.nama && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.nama.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>Jenis Kelamin <span className="text-red-500">*</span></label>
                <select 
                  {...register('jenisKelamin')} 
                  className={inputClass} 
                >
                  <option value="" className={isHologram || isAdmin ? "bg-[#0f172a]" : ""}>PILIH_GENDER</option>
                  <option value="L" className={isHologram || isAdmin ? "bg-[#0f172a]" : ""}>LAKI_LAKI</option>
                  <option value="P" className={isHologram || isAdmin ? "bg-[#0f172a]" : ""}>PEREMPUAN</option>
                </select>
                {errors.jenisKelamin && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.jenisKelamin.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>Level Pendidikan <span className="text-red-500">*</span></label>
                <select 
                  {...register('jalurPendidikan')} 
                  className={inputClass} 
                >
                  <option value="" className={isHologram || isAdmin ? "bg-[#0f172a]" : ""}>PILIH_TINGKAT</option>
                  <option value="MI" className={isHologram || isAdmin ? "bg-[#0f172a]" : ""}>MI Al Mukhtar</option>
                  <option value="MTs" className={isHologram || isAdmin ? "bg-[#0f172a]" : ""}>MTs Al Mukhtar</option>
                  <option value="MA" className={isHologram || isAdmin ? "bg-[#0f172a]" : ""}>MA Al Mukhtar</option>
                  <option value="S1" className={isHologram || isAdmin ? "bg-[#0f172a]" : ""}>S1</option>
                  <option value="Tidak Sekolah" className={isHologram || isAdmin ? "bg-[#0f172a]" : ""}>Bebas Formal</option>
                </select>
                {errors.jalurPendidikan && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.jalurPendidikan.message}</p>}
              </div>
              
              <div className="space-y-1.5">
                <label className={labelClass}>Tempat Lahir <span className="text-red-500">*</span></label>
                <input 
                  {...register('tempatLahir')} 
                  className={inputClass} 
                  placeholder="LOKASI_LAHIR" 
                />
                {errors.tempatLahir && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.tempatLahir.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>Tanggal Lahir <span className="text-red-500">*</span></label>
                <input 
                  type="date" 
                  {...register('tanggalLahir')} 
                  className={inputClass} 
                  style={isHologram || isAdmin ? { colorScheme: 'dark' } : {}}
                />
                {errors.tanggalLahir && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.tanggalLahir.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>NIK (IDENTITAS_NASIONAL) <span className="text-red-500">*</span></label>
                <input 
                  {...register('nik')} 
                  className={inputClass} 
                  placeholder="16_DIGIT_SERIAL"
                  maxLength={16}
                />
                {errors.nik && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.nik.message}</p>}
              </div>

              {watch('jalurPendidikan') !== 'Tidak Sekolah' && (
                <div className="space-y-1.5">
                  <label className={labelClass}>NISN (ID_SISWA) <span className="text-red-500">*</span></label>
                  <input 
                    {...register('nisn')} 
                    className={inputClass} 
                    placeholder="NISN_SERIAL"
                  />
                  {errors.nisn && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.nisn.message}</p>}
                </div>
              )}

              <div className="space-y-1.5 md:col-span-2">
                <label className={labelClass}>Alamat Geospasial <span className="text-red-500">*</span></label>
                <textarea 
                  {...register('alamat')} 
                  rows={2} 
                  className={`${inputClass} resize-none`} 
                  placeholder="ENTRY_ALAMAT_DETAIL" 
                />
                {errors.alamat && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.alamat.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <div className="space-y-1.5">
                  <label className={labelClass}>RT <span className="text-red-500">*</span></label>
                  <input 
                    {...register('rt')} 
                    className={inputClass} 
                    placeholder="00" 
                  />
                  {errors.rt && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.rt.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className={labelClass}>RW <span className="text-red-500">*</span></label>
                  <input 
                    {...register('rw')} 
                    className={inputClass} 
                    placeholder="00" 
                  />
                  {errors.rw && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.rw.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-1">
                <label className={labelClass}>Desa / Kelurahan <span className="text-red-500">*</span></label>
                <input 
                  {...register('desa')} 
                  className={inputClass} 
                  placeholder="DESA_UNIT" 
                />
                {errors.desa && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.desa.message}</p>}
              </div>

              <div className="space-y-1.5 md:col-span-1">
                <label className={labelClass}>Kecamatan <span className="text-red-500">*</span></label>
                <input 
                  {...register('kecamatan')} 
                  className={inputClass} 
                  placeholder="KECAMATAN_ZONE" 
                />
                {errors.kecamatan && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.kecamatan.message}</p>}
              </div>

              <div className="space-y-1.5 md:col-span-1">
                <label className={labelClass}>Kabupaten / Kota <span className="text-red-500">*</span></label>
                <input 
                  {...register('kabupaten')} 
                  className={inputClass} 
                  placeholder="KABUPATEN_CITY" 
                />
                {errors.kabupaten && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.kabupaten.message}</p>}
              </div>

              <div className="space-y-1.5 md:col-span-1">
                <label className={labelClass}>Provinsi <span className="text-red-500">*</span></label>
                <input 
                  {...register('provinsi')} 
                  className={inputClass} 
                  placeholder="PROVINCE_STATE" 
                />
                {errors.provinsi && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.provinsi.message}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <h3 className={sectionHeaderClass}>
              {isHologram && <span className="w-2 h-6 bg-cyan-400 shadow-[0_0_10px_cyan]"></span>}
              Wali / Penanggung Jawab
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className={labelClass}>Nama Ayah <span className="text-red-500">*</span></label>
                <input 
                  {...register('namaAyah')} 
                  className={inputClass} 
                  placeholder="NAMA_PATER" 
                />
                {errors.namaAyah && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.namaAyah.message}</p>}
              </div>
              
              <div className="space-y-1.5">
                <label className={labelClass}>Nama Ibu <span className="text-red-500">*</span></label>
                <input 
                  {...register('namaIbu')} 
                  className={inputClass} 
                  placeholder="NAMA_MATER" 
                />
                {errors.namaIbu && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.namaIbu.message}</p>}
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className={labelClass}>Koneksi / WhatsApp <span className="text-red-500">*</span></label>
                <input 
                  type="tel"
                  {...register('noTelfon')} 
                  className={inputClass} 
                  placeholder="+62_WA_KONEKSI" 
                />
                {errors.noTelfon && <p className="text-sm text-red-400 mt-1 flex items-center opacity-80"><AlertCircle className="w-4 h-4 mr-1"/>{errors.noTelfon.message}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <h3 className={sectionHeaderClass}>
              {isHologram && <span className="w-2 h-6 bg-cyan-400 shadow-[0_0_10px_cyan]"></span>}
              Digitalisasi Dokumen
            </h3>
            <p className={isHologram ? "text-[10px] uppercase font-black tracking-widest text-cyan-600/80" : isAdmin ? "text-[10px] uppercase font-bold tracking-widest text-cyan-600" : "text-xs text-gray-500"}>
              PROTOKOL_UNGGAH: JPG, PNG, PDF. MAX_SIZE: 5MB
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <FileInput id="photoKK" label="KARTU_KELUARGA" error={errors.photoKK?.message as string} />
              <FileInput id="photoAkta" label="AKTE_KELAHIRAN" error={errors.photoAkta?.message as string} />
              <FileInput id="photoKTP" label="KTP_ORANG_TUA" error={errors.photoKTP?.message as string} />
              <FileInput id="photoIjazah" label="IJAZAH_SKL" error={errors.photoIjazah?.message as string} />
              <FileInput id="photoTidakMampu" label="SKTM_LEVEL_0" required={false} error={errors.photoTidakMampu?.message as string} />
              <FileInput id="photoKematian" label="SURAT_YATIM_PIATU" required={false} error={errors.photoKematian?.message as string} />
            </div>
          </div>

          <div className="pt-10">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={buttonClass + (isSubmitting ? ' opacity-50 cursor-wait' : '')}
            >
              {isSubmitting ? 'SUBMITTING_DATA...' : 'SUBMIT_PENDAFTARAN'}
            </button>
          </div>
      </form>
    </div>
  </div>
);
}
