import React, { useState, useRef } from 'react';
import { Scissors, PlusCircle, PawPrint, ArrowLeft, Download, Check } from 'lucide-react';
import html2canvas from 'html2canvas';

import FormView from './components/FormView';
import IdCard from './components/IdCard';
import { DogProfile, ViewState } from './types';
import { INITIAL_DOG_STATE } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('welcome');
  const [dogData, setDogData] = useState<DogProfile>(INITIAL_DOG_STATE);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);

  const resetApp = () => {
    setDogData(INITIAL_DOG_STATE);
    setView('form');
    setIsDownloaded(false);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // High resolution
        backgroundColor: null,
        useCORS: true, // Handle cross-origin images if necessary
        logging: false
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `Credencial_${dogData.name.replace(/\s+/g, '_')}.png`;
      link.click();
      
      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), 3000);
    } catch (error) {
      console.error("Error generating ID card:", error);
      alert("Hubo un error al generar la imagen. Inténtalo de nuevo.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Header */}
      <header className="w-full bg-white shadow-sm p-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-3 text-indigo-700">
            <div className="bg-indigo-100 p-2 rounded-xl">
              <Scissors className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tight leading-none">La Barberie de los Perritos</h1>
              <p className="text-[10px] text-gray-500 font-medium tracking-wide mt-1 hidden sm:block">
                Peluquería Canina Profesional - Adiestramiento - Ludoteca
              </p>
            </div>
          </div>
          
          {view === 'card' && (
            <button 
              onClick={resetApp} 
              className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition bg-indigo-50 px-3 py-1.5 rounded-full"
            >
              <PlusCircle className="w-4 h-4" /> Nuevo
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center relative">
        
        {/* VIEW: WELCOME */}
        {view === 'welcome' && (
          <div className="w-full max-w-lg animate-[fadeIn_0.5s_ease-out] text-center">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-indigo-50">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
                <PawPrint className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">La Barberie de los Perritos</h2>
              <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-8">Gestor de Credenciales</p>
              
              <div className="mb-10 bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <p className="text-indigo-800 text-xl font-bold leading-relaxed">¡Bienvenidos a la Barberie de los Perritos! 🐾</p>
              </div>
              
              <button 
                onClick={() => setView('form')} 
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <PlusCircle className="w-6 h-6" /> Crear Nueva ID
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-400">
                <p>Herramienta 100% Offline</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: FORM */}
        {view === 'form' && (
          <FormView 
            data={dogData} 
            onChange={setDogData}
            onSubmit={() => setView('card')}
            onCancel={() => setView('welcome')}
          />
        )}

        {/* VIEW: CARD */}
        {view === 'card' && (
          <div className="flex flex-col items-center justify-center space-y-8 animate-[fadeIn_0.5s_ease-out] pb-10 w-full">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-800">¡Credencial Lista!</h2>
              <p className="text-gray-600 max-w-md">Descarga esta imagen y envíala a la barbería para agilizar tu turno.</p>
            </div>

            {/* The Component to render */}
            <IdCard ref={cardRef} data={dogData} />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
              <button 
                onClick={() => setView('form')} 
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" /> Volver
              </button>
              
              <button 
                onClick={handleDownload} 
                disabled={isDownloading}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl shadow-lg font-bold text-white transition transform active:scale-95 ${
                  isDownloaded 
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700'
                }`}
              >
                {isDownloading ? (
                   <span>Generando...</span>
                ) : isDownloaded ? (
                   <><Check className="w-4 h-4" /> Guardado</>
                ) : (
                   <><Download className="w-4 h-4" /> Descargar ID</>
                )}
              </button>
            </div>
          </div>
        )}

      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} La Barberie de los Perritos. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;