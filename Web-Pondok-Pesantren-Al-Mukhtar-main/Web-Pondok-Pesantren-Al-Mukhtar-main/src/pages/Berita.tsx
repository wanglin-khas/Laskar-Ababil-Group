import { useState } from 'react';
import { Newspaper, Calendar, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../store';

function BeritaItem({ item }: { item: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = item.desc && item.desc.length > 120;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col group h-fit">
      <div className="h-48 sm:h-56 bg-gray-100 relative overflow-hidden">
        <img 
          src={item.photo || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          alt={item.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-center text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-3 bg-emerald-50 w-fit px-2 py-1 rounded">
          <Calendar className="w-3 h-3 mr-1.5" />
          {item.date}
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-emerald-700 transition-colors">{item.title}</h3>
        <p className={`text-gray-600 text-sm leading-relaxed mb-6 transition-all duration-300 ${!isExpanded && isLong ? 'line-clamp-3' : ''}`}>
          {item.desc}
        </p>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#164e3b] font-bold text-xs hover:gap-2 flex items-center gap-1 transition-all mt-auto w-fit"
        >
          {isExpanded ? (
            <>TUTUP <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>BACA SELENGKAPNYA <ChevronRight className="w-3.5 h-3.5" /></>
          )}
        </button>
      </div>
    </div>
  );
}

export default function Berita() {
  const berita = useStore(state => state.webContent.berita);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Berita Pesantren</h1>
        <p className="text-lg text-gray-500">
          Update informasi terbaru dari Pondok Pesantren Al Mukhtar.
        </p>
      </div>

      {berita && berita.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {berita.map((item, idx) => (
            <div key={idx}>
              <BeritaItem item={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4 space-y-6">
          <div className="p-6 bg-green-50 text-[#164e3b] rounded-full">
            <Newspaper className="h-16 w-16" />
          </div>
          <p className="text-gray-500 max-w-md">Belum ada berita terbaru saat ini.</p>
        </div>
      )}
    </div>
  );
}
