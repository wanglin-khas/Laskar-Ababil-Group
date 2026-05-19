import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, GraduationCap } from 'lucide-react';
import { useStore } from '../store';

export default function Home() {
  const content = useStore(state => state.webContent.home);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-[#164e3b] text-white">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center" 
          style={{ backgroundImage: `url(${content.heroImage})` }} 
        />
        <div className="relative px-6 py-16 sm:py-24 sm:px-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium border border-[#d4af37]/50 text-[#d4af37] bg-white/10 backdrop-blur-sm mb-6">
            Penerimaan Santri Baru 2026/2027
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            {content.title}
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl text-green-50 mb-8 leading-relaxed whitespace-pre-wrap">
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/pendaftaran" className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-[#164e3b] bg-[#d4af37] hover:bg-[#c4a132] transition-colors">
              Daftar Sekarang
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
            <Link to="/tentang" className="inline-flex justify-center items-center px-8 py-3.5 border-2 border-white/20 text-base font-semibold rounded-xl text-white hover:bg-white/10 backdrop-blur-sm transition-colors">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links / Features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {(content.features || []).map((feature, i) => {
          const Icon = feature.icon === 'BookOpen' ? BookOpen : feature.icon === 'GraduationCap' ? GraduationCap : Users;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="p-3 bg-green-50 text-[#164e3b] rounded-2xl mb-4">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </div>
          );
        })}
      </section>

      {/* Descriptions Section */}
      {(content.descriptions || []).length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.descriptions.map((desc, i) => (
            <div key={i} className="bg-[#fdfbf7] p-8 rounded-2xl border border-orange-100 shadow-sm">
              <h3 className="text-[#164e3b] text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-xs">{(i+1).toString().padStart(2, '0')}</span>
                {desc.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{desc.content}</p>
            </div>
          ))}
        </section>
      )}

      {/* Highlights / Banners Section */}
      {(content.banners || []).length > 0 && (
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Program & Suasana</h2>
            <p className="mt-4 text-gray-500">Momen dan program unggulan Pondok Pesantren Al Mukhtar.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.banners.map((banner, i) => (
              <div key={i} className="group relative h-64 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <img src={banner.url} alt={banner.desc} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                  <p className="text-white font-medium">{banner.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Alur Pendaftaran */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Alur Pendaftaran</h2>
          <p className="mt-4 text-gray-500">Langkah-langkah pendaftaran santri baru Pondok Pesantren Al Mukhtar.</p>
        </div>
        
        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-green-100 transform sm:-translate-x-1/2"></div>
          <div className="space-y-8">
            {(content.alur || []).map((step, idx) => (
              <div key={idx} className={`relative flex items-center ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
                <div className="absolute left-4 sm:left-1/2 w-8 h-8 rounded-full bg-[#164e3b] text-white flex items-center justify-center font-bold text-sm transform -translate-x-1/2 z-10 border-4 border-white shadow-sm">
                  {idx + 1}
                </div>
                <div className={`ml-12 sm:ml-0 sm:w-1/2 ${idx % 2 === 0 ? 'sm:pl-12' : 'sm:pr-12 text-left sm:text-right'}`}>
                  <h4 className="text-lg font-bold text-gray-900">{step.title}</h4>
                  <p className="text-gray-600 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
