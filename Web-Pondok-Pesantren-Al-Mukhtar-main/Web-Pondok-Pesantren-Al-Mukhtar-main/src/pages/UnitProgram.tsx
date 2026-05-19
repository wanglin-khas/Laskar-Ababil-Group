import { Calendar, Star, Clock } from 'lucide-react';
import { useStore } from '../store';

export default function UnitProgram() {
  const program = useStore(state => state.webContent.program);

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Unit Program</h1>
        <p className="text-lg text-gray-500">
          Berbagai program unggulan, tahunan, dan bulanan di Pondok Pesantren Al Mukhtar.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Program Unggulan */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
          <div className="bg-[#164e3b] p-4 flex items-center justify-center space-x-2 text-white">
            <Star className="h-5 w-5 text-[#d4af37]" />
            <h2 className="text-lg font-bold">Program Unggulan</h2>
          </div>
          <div className="p-6 flex-1 bg-gradient-to-b from-white to-gray-50/50">
            <ul className="space-y-3">
              {program.unggulan.map((item, i) => (
                <li key={i} className="flex items-center text-gray-700 text-sm">
                  <span className="w-6 h-6 rounded bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold mr-3 shrink-0">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Program Tahunan */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
          <div className="bg-[#164e3b] p-4 flex items-center justify-center space-x-2 text-white">
            <Calendar className="h-5 w-5 text-[#d4af37]" />
            <h2 className="text-lg font-bold">Program Tahunan</h2>
          </div>
          <div className="p-6 flex-1 bg-gradient-to-b from-white to-gray-50/50">
            <ul className="space-y-4">
              {program.tahunan.map((item, i) => (
                <li key={i} className="flex flex-col border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                  <span className="text-xs font-semibold text-green-600 mb-1">{item.bulan}</span>
                  <span className="text-gray-700 text-sm">{item.acara}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Program Bulanan */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
          <div className="bg-[#164e3b] p-4 flex items-center justify-center space-x-2 text-white">
            <Clock className="h-5 w-5 text-[#d4af37]" />
            <h2 className="text-lg font-bold">Program Bulanan</h2>
          </div>
          <div className="p-6 flex-1 bg-gradient-to-b from-white to-gray-50/50">
            <ul className="space-y-4">
              {program.bulanan.map((item, i) => (
                <li key={i} className="flex flex-col border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                  <span className="text-xs font-semibold text-blue-600 mb-1">{item.jadwal}</span>
                  <span className="text-gray-700 text-sm">{item.acara}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
