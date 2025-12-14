import React, { forwardRef } from 'react';
import { Scissors, Phone, Clock } from 'lucide-react';
import { DogProfile } from '../types';

interface IdCardProps {
  data: DogProfile;
}

// forwardRef is needed to allow the parent to grab the DOM element for html2canvas
const IdCard = forwardRef<HTMLDivElement, IdCardProps>(({ data }, ref) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const availabilityStr = (() => {
    const isWeekdays = data.days.length === 5 && !data.days.includes('Sábado') && !data.days.includes('Domingo');
    const days = isWeekdays ? 'Lun-Vie' : data.days.map(d => d.slice(0, 3)).join(', ');
    const times = data.times.join(', ');
    return `${days} • ${times}`;
  })();

  return (
    <div 
      ref={ref}
      className="w-[350px] aspect-[3/5.2] rounded-3xl overflow-hidden shadow-2xl relative bg-white border border-gray-100 mx-auto"
      style={{ fontFamily: 'sans-serif' }}
    >
      {/* Background Header */}
      <div className="absolute top-0 w-full h-36 bg-gradient-to-br from-indigo-800 via-indigo-600 to-purple-700"></div>

      <div className="relative z-10 flex flex-col items-center pt-6 px-6 h-full">
        {/* Header Title */}
        <div className="text-center text-white mb-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Scissors className="w-4 h-4 text-white opacity-80" />
            <div className="font-black text-lg tracking-wide uppercase leading-none">La Barberie</div>
          </div>
          <div className="font-light text-base tracking-widest uppercase leading-none opacity-90 mb-1">
            de los Perritos
          </div>
          <p className="text-[6px] uppercase tracking-widest opacity-70">
            Peluquería Canina Profesional • Adiestramiento • Ludoteca
          </p>
        </div>

        {/* Photo */}
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 mb-3 relative z-20 shrink-0">
          {data.photo ? (
            <img 
              src={data.photo} 
              alt={data.name} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
              <span className="text-xs">Sin Foto</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h1 className="text-3xl font-black text-gray-800 mb-1 uppercase tracking-tight text-center truncate w-full">
          {data.name || 'NOMBRE'}
        </h1>

        <div className="mb-4 flex flex-col items-center gap-1 w-full">
          <span className="px-3 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
            {data.breed || 'Mestizo'}
          </span>
          <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold shadow-sm">
            {data.service}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-3 gap-2 mb-4 shrink-0">
          <StatBox label="Edad" value={data.age} />
          <StatBox label="Peso" value={data.weight ? `${data.weight} kg` : ''} />
          <StatBox label="Dueño" value={data.ownerName.split(' ')[0]} />
        </div>

        {/* Tags */}
        <div className="w-full flex flex-wrap justify-center gap-1 mb-3 shrink-0 min-h-[20px]">
          {data.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-orange-50 text-orange-600 border border-orange-100 rounded-md text-[9px] font-medium uppercase">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer Info */}
        <div className="w-full space-y-2 flex-grow">
          {/* Phone */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
              <Phone className="w-3 h-3" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[9px] text-gray-400 uppercase font-bold">Contacto</p>
              <p className="text-xs font-semibold text-gray-800">{data.phone || '---'}</p>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 flex-shrink-0">
              <Clock className="w-3 h-3" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[9px] text-gray-400 uppercase font-bold">Disponibilidad</p>
              <p className="text-[10px] font-semibold text-gray-800 leading-tight">
                {availabilityStr}
              </p>
            </div>
          </div>

          {/* Notes (Conditional) */}
          {data.notes && (
            <div className="bg-red-50 p-2 rounded-lg border border-red-100 mt-1">
              <p className="text-[8px] text-red-400 uppercase font-bold mb-0.5">Alergias / Patologías / Obs.</p>
              <p className="text-[10px] text-gray-700 leading-snug line-clamp-2">{data.notes}</p>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className="w-full pt-3 pb-2 text-center border-t border-dashed border-gray-200 mt-auto">
          <p className="text-[7px] text-gray-400 tracking-widest uppercase">ID Creado: {currentDate}</p>
        </div>
      </div>
    </div>
  );
});

const StatBox = ({ label, value }: { label: string, value: string }) => (
  <div className="bg-slate-50 p-2 rounded-lg text-center border border-slate-100">
    <p className="text-[9px] text-gray-400 uppercase font-bold">{label}</p>
    <p className="font-semibold text-gray-700 text-xs truncate">{value || '-'}</p>
  </div>
);

IdCard.displayName = 'IdCard';

export default IdCard;