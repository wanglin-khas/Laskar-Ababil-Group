import { GraduationCap, Building2, BookHeart } from 'lucide-react';
import { useStore } from '../store';

export default function UnitPendidikan() {
  const units = useStore(state => state.webContent.pendidikan);

  const getIcon = (type: string) => {
    return type === 'Formal' ? GraduationCap : BookHeart;
  };

  const getColors = (index: number) => {
    const colors = [
      { color: "text-amber-600", bg: "bg-amber-50" },
      { color: "text-green-600", bg: "bg-green-50" },
      { color: "text-blue-600", bg: "bg-blue-50" },
      { color: "text-indigo-600", bg: "bg-indigo-50" },
      { color: "text-purple-600", bg: "bg-purple-50" },
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Unit Pendidikan</h1>
        <p className="text-lg text-gray-500">
          Lembaga pendidikan formal dan non-formal di Pondok Pesantren Al Mukhtar.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {units.map((unit, idx) => {
          const Icon = getIcon(unit.type);
          const style = getColors(idx);
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
              <div className={`p-4 rounded-xl ${style.bg} ${style.color} shrink-0`}>
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{unit.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Pendidikan {unit.type}</p>
              </div>
            </div>
          );
        })}
        
        {/* Fasilitas Section inside Unit Pendidikan for context */}
        <div className="sm:col-span-2 mt-8 bg-[#164e3b] rounded-2xl overflow-hidden shadow-lg border border-green-800 text-white">
          <div className="px-6 py-4 bg-black/20 flex flex-items-center">
            <Building2 className="h-6 w-6 text-[#d4af37] mr-3" />
            <h2 className="text-xl font-bold">Fasilitas Pesantren</h2>
          </div>
          <div className="p-6 md:p-8">
            <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6 text-green-50">
              <li className="flex items-center"><span className="mr-2 text-[#d4af37]">✔</span> Asrama Tahfidzul Qur'an</li>
              <li className="flex items-center"><span className="mr-2 text-[#d4af37]">✔</span> Dua Asrama Putra 2 Lantai</li>
              <li className="flex items-center"><span className="mr-2 text-[#d4af37]">✔</span> Asrama Putri 2 Lantai</li>
              <li className="flex items-center"><span className="mr-2 text-[#d4af37]">✔</span> Asrama Putri 1 Lantai</li>
              <li className="flex items-center"><span className="mr-2 text-[#d4af37]">✔</span> Masjid 2 Lantai</li>
              <li className="flex items-center"><span className="mr-2 text-[#d4af37]">✔</span> Ruang Kelas Ngaji</li>
              <li className="flex items-center"><span className="mr-2 text-[#d4af37]">✔</span> Dapur & Toilet</li>
              <li className="flex items-center"><span className="mr-2 text-[#d4af37]">✔</span> Kantin</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
