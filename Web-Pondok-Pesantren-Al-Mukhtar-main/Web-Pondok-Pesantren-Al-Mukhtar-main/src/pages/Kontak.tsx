import { MapPin, Phone, Instagram, Youtube } from 'lucide-react';

export default function Kontak() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Hubungi Kami</h1>
        <p className="text-lg text-gray-500">
          Informasi kontak dan sekretariat Pondok Pesantren Al Mukhtar.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 text-[#164e3b] mr-2" /> Sekretariat
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Jl. Mangga No.35 Rt 03 Rw 11 Mandarasa Penggalang,<br />
              Kecamatan Adipala, Kabupaten Cilacap,<br />
              Provinsi Jawa Tengah
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Phone className="h-5 w-5 text-[#164e3b] mr-2" /> Informasi Pendaftaran
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="font-medium text-gray-700">Admin Putra</span>
                <a href="tel:0882006467867" className="text-[#164e3b] font-bold">0882 0064 67867</a>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="font-medium text-gray-700">Admin Putri</span>
                <a href="tel:0882006315921" className="text-[#164e3b] font-bold">0882 0063 15921</a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sosial Media</h3>
            <div className="flex space-x-4">
              <a href="#" className="flex items-center px-4 py-2 bg-pink-50 text-pink-600 rounded-lg font-medium hover:bg-pink-100 transition-colors">
                <Instagram className="h-5 w-5 mr-2" />
                @pp_almukhtar
              </a>
              <a href="#" className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors">
                <Youtube className="h-5 w-5 mr-2" />
                Mukhtar Media
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-2xl overflow-hidden min-h-[300px] border border-gray-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15277.587823522261!2d109.1170258!3d-7.6534969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6545199147e8bd%3A0xc6cb51bd2906b3a9!2sAdipala%2C%20Cilacap%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Pondok Pesantren"
          />
        </div>
      </div>
    </div>
  );
}
