import { Target, Flag, History } from 'lucide-react';
import { useStore } from '../store';

export default function Tentang() {
  const content = useStore(state => state.webContent.tentang);

  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Sekilas Tentang Al Mukhtar</h1>
        <p className="text-lg text-gray-500">
          Mengenal lebih dekat Pondok Pesantren Al Mukhtar Adipala, Cilacap.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-full md:w-1/3 shrink-0">
            <img 
              src={content.photo} 
              alt="Pondok Pesantren Al Mukhtar" 
              className="w-full rounded-2xl shadow-sm object-cover aspect-square"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <History className="h-6 w-6 text-[#164e3b] mr-3" />
              Sejarah & Profil
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
              {content.sejarah}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 bg-green-50 text-[#164e3b] rounded-lg">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Visi</h2>
          </div>
          <blockquote className="border-l-4 border-[#d4af37] pl-4 italic text-gray-700 mb-4 font-medium">
            "Al-Muhfadlotu Ala Qodimis Sholih Wal Akhdu Bil Jadidil Ashla"
            <br />
            (Menjaga Tradisi Lama Yang Baik & Mengambil Tradisi Baru Yang Lebih Baik)
          </blockquote>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {content.visi}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 bg-amber-50 text-[#d4af37] rounded-lg">
              <Flag className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Misi</h2>
          </div>
          <ul className="space-y-4">
            {content.misi.map((m, i) => (
               <li key={i} className="flex items-start">
                 <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#164e3b] text-white flex items-center justify-center text-xs font-bold mt-0.5 mr-3">{i + 1}</span>
                 <span className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-wrap">{m}</span>
               </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
