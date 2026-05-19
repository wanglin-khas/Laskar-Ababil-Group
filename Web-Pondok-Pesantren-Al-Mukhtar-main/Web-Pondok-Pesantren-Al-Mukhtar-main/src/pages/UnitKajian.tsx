import { Book, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store';

export default function UnitKajian() {
  const kajianList = useStore(state => state.webContent.kajian);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Kajian Pesantren</h1>
        <p className="text-lg text-gray-500">
          Program kajian rutinan yang wajib diikuti oleh seluruh santri Pondok Pesantren Al Mukhtar.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#164e3b] px-6 py-4 flex items-center space-x-3">
          <Book className="text-[#d4af37] h-6 w-6" />
          <h2 className="text-xl font-semibold text-white">Daftar Kajian</h2>
        </div>
        <div className="p-6 md:p-8">
          <div className="grid gap-4">
            {kajianList.map((kajian, idx) => (
              <div key={idx} className="flex items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-3 shrink-0" />
                <span className="text-gray-700 font-medium">{kajian}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
