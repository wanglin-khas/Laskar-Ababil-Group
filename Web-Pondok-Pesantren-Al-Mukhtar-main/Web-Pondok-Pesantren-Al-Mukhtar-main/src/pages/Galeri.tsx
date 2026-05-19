import { useState } from 'react';
import { useStore } from '../store';
import { ChevronDown, ChevronUp } from 'lucide-react';

function DescriptionWithToggle({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = text.length > 80;

  return (
    <div className="space-y-1">
      <p className={`text-sm text-gray-700 font-medium transition-all duration-300 ${!isExpanded && isLong ? 'line-clamp-2' : ''}`}>
        {text}
      </p>
      {isLong && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-0.5 hover:text-emerald-700"
        >
          {isExpanded ? (
            <>TUTUP <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>BACA SELENGKAPNYA <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      )}
    </div>
  );
}

export default function Galeri() {
  const images = useStore(state => state.webContent.galeri);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Galeri</h1>
        <p className="text-lg text-gray-500">
          Dokumentasi kegiatan santri dan fasilitas di Pondok Pesantren Al Mukhtar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 h-fit">
            <div className="aspect-square sm:aspect-[4/3] overflow-hidden relative">
              <img 
                src={img.url} 
                alt={img.desc} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                <span className="text-white/80 text-[10px] font-medium uppercase tracking-wider mb-1">{img.date}</span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <DescriptionWithToggle text={img.desc} />
              <div className="pt-2 border-t border-gray-50">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{img.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
