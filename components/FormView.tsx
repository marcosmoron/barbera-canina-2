import React from 'react';
import { Upload, Scissors, Calendar, Info, PawPrint } from 'lucide-react';
import { DogProfile } from '../types';
import { SERVICES, DAYS_LIST, TIMES_LIST } from '../constants';

interface FormViewProps {
  data: DogProfile;
  onChange: (data: DogProfile) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const FormView: React.FC<FormViewProps> = ({ data, onChange, onSubmit, onCancel }) => {

  const handleChange = (field: keyof DogProfile, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          handleChange('photo', ev.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const toggleArrayItem = (field: 'days' | 'times', item: string) => {
    const current = data[field];
    const updated = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    handleChange(field, updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.days.length === 0 || data.times.length === 0) {
      alert("Por favor selecciona al menos un día y un horario.");
      return;
    }
    onSubmit();
  };

  return (
    <div className="w-full max-w-3xl fade-in mb-10 mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white flex justify-center items-center gap-2">
            <PawPrint className="w-8 h-8" />
            <span>Registro de Mascota</span>
          </h2>
          <p className="text-indigo-100 mt-2">Completa los datos para generar tu Credencial Canina</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Top Section: Photo & Basic Info */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo Upload */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative w-40 h-40 rounded-full border-4 border-indigo-100 overflow-hidden bg-slate-100 group shadow-md hover:shadow-lg transition">
                {data.photo ? (
                  <img src={data.photo} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Upload className="w-10 h-10 mb-2" />
                    <span className="text-sm font-medium">Subir Foto</span>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  required={!data.photo}
                />
              </div>
              <p className="text-center text-xs text-gray-500 mt-2">* Obligatorio</p>
            </div>

            {/* Basic Inputs */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Nombre del Perro</label>
                <input 
                  type="text" 
                  required 
                  value={data.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Nombre del Dueño</label>
                <input 
                  type="text" 
                  required 
                  value={data.ownerName}
                  onChange={(e) => handleChange('ownerName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Teléfono</label>
                <input 
                  type="tel" 
                  inputMode="tel"
                  required 
                  value={data.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Raza</label>
                <input 
                  type="text" 
                  value={data.breed}
                  onChange={(e) => handleChange('breed', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full"></div>

          {/* Physical Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Peso (kg) Aprox</label>
              <input 
                type="text" 
                inputMode="decimal"
                value={data.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-indigo-500" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Edad</label>
              <input 
                type="text"
                inputMode="numeric" 
                value={data.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-indigo-500" 
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
              <Scissors className="w-4 h-4 text-indigo-600" /> Tipo de Servicio
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SERVICES.map(s => {
                const IconComponent = s.icon === 'droplets' ? PawPrint : 
                                      s.icon === 'scissors' ? Scissors :
                                      s.icon === 'award' ? PawPrint :
                                      s.icon === 'heart' ? Info : PawPrint;

                const isSelected = data.service === s.id;
                return (
                  <button 
                    key={s.id}
                    type="button" 
                    onClick={() => handleChange('service', s.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${isSelected ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    <IconComponent className="w-5 h-5 mb-2" />
                    <span className="text-xs font-semibold text-center">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" /> Disponibilidad Horaria
            </label>
            
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <button type="button" onClick={() => handleChange('days', ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'])} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition">Días de semana</button>
                <button type="button" onClick={() => handleChange('days', ['Sábado', 'Domingo'])} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition">Fines de semana</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {DAYS_LIST.map(d => (
                  <button 
                    key={d}
                    type="button" 
                    onClick={() => toggleArrayItem('days', d)}
                    className={`px-3 py-2 text-sm rounded-lg border transition ${data.days.includes(d) ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-gray-500 mb-2 font-medium">Preferencia Horaria (Selecciona varias):</p>
              <div className="flex flex-wrap gap-3">
                {TIMES_LIST.map(t => (
                  <button 
                    key={t}
                    type="button" 
                    onClick={() => toggleArrayItem('times', t)}
                    className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 p-2 rounded-lg border transition text-sm ${data.times.includes(t) ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current opacity-50"></span>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
              <Info className="w-4 h-4 text-red-500" /> Observaciones / Alergias o Patologías
            </label>
            <textarea 
              rows={3} 
              value={data.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" 
              placeholder="Ej. Es tímido, alergia al pollo, displasia de cadera..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">Cancelar</button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md">Crear Credencial</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormView;