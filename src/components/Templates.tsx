/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CertificateData } from '../types';
import { Award, ShieldAlert, Badge, ShieldCheck, Star } from 'lucide-react';

interface TemplateProps {
  data: CertificateData;
}

export const CertificateTemplate: React.FC<TemplateProps> = ({ data }) => {
  const isLandscape = data.orientation === 'landscape';
  
  // A4 dimensions at 96 DPI: 
  // Landscape: 1123 x 794
  // Portrait: 794 x 1123
  const width = isLandscape ? 1123 : 794;
  const height = isLandscape ? 794 : 1123;

  // If a custom uploaded template background exists, override pre-designed themes
  if (data.customBackground) {
    return <CustomBackgroundTemplate data={data} width={width} height={height} />;
  }

  // Custom styling for specific template IDs
  switch (data.templateId) {
    case 'classic-gold':
      return <ClassicGoldTemplate data={data} width={width} height={height} />;
    case 'modern-blue':
      return <ModernBlueTemplate data={data} width={width} height={height} />;
    case 'emerald-luxury':
      return <EmeraldLuxuryTemplate data={data} width={width} height={height} />;
    case 'crimson-minimal':
      return <CrimsonMinimalTemplate data={data} width={width} height={height} />;
    default:
      return <ClassicGoldTemplate data={data} width={width} height={height} />;
  }
};

interface BaseTemplateProps {
  data: CertificateData;
  width: number;
  height: number;
}

// -----------------------------------------------------------------
// 1. CLASSIC GOLD TEMPLATE (Official, Academic, Royal Navy & Gold)
// -----------------------------------------------------------------
const ClassicGoldTemplate: React.FC<BaseTemplateProps> = ({ data, width, height }) => {
  return (
    <div
      id="certificate-print-area"
      className="relative flex flex-col justify-between bg-amber-50/10 text-slate-800 overflow-hidden select-none border"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#fbf9f4',
        fontFamily: '"Times New Roman", Times, serif',
      }}
    >
      {/* Elegantly Patterned Background Frame */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
        <div 
          className="absolute inset-8 border-[12px] border-double" 
          style={{ borderColor: '#d4af37' }} 
        />
        <div 
          className="absolute inset-[44px] border border-slate-300" 
        />
        
        {/* Corner Ornaments */}
        <div className="absolute top-10 left-10 w-16 h-16 border-t-4 border-l-4" style={{ borderColor: '#d4af37' }} />
        <div className="absolute top-10 right-10 w-16 h-16 border-t-4 border-r-4" style={{ borderColor: '#d4af37' }} />
        <div className="absolute bottom-10 left-10 w-16 h-16 border-b-4 border-l-4" style={{ borderColor: '#d4af37' }} />
        <div className="absolute bottom-10 right-10 w-16 h-16 border-b-4 border-r-4" style={{ borderColor: '#d4af37' }} />

        {/* Decorative SVG Guilloche Background Watermark */}
        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
          <svg width="600" height="600" viewBox="0 0 100 100" fill="none" stroke="#d4af37" strokeWidth="0.2">
            <circle cx="50" cy="50" r="45" strokeDasharray="1,1" />
            <circle cx="50" cy="50" r="40" />
            <path d="M 50,5 A 45,45 0 0,0 5,50 A 45,45 0 0,0 50,95 A 45,45 0 0,0 95,50 A 45,45 0 0,0 50,5 Z" />
            <polygon points="50,15 58,35 80,35 62,48 68,70 50,58 32,70 38,48 20,35 42,35" />
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full p-20 flex flex-col justify-between items-center text-center">
        {/* Top Header Section */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-semibold tracking-[0.2em] text-amber-800 uppercase mb-2">
            {data.organization || 'ХАЛЫҚАРАЛЫҚ БІЛІМ БЕРУ ОРТАЛЫҒЫ'}
          </div>
          
          {/* Decorative Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="w-16 h-[1px] bg-amber-600" />
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <div className="w-16 h-[1px] bg-amber-600" />
          </div>
        </div>

        {/* Document Title Selection */}
        <div className="flex flex-col items-center my-4">
          <h1 
            className="text-5xl font-bold uppercase tracking-wider mb-2"
            style={{ 
              color: '#1a2e40',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.08em'
            }}
          >
            {data.title || (
              data.type === 'certificate' ? 'СЕРТИФИКАТ' :
              data.type === 'diploma' ? 'ДИПЛОМ' : 'МАДАҚТАМА'
            )}
          </h1>
          <p className="text-amber-700 italic text-lg font-medium">
            {data.subtitle || (
              data.type === 'certificate' ? 'ТАБЫСТЫ АЯҚТАҒАНЫ ТУРАЛЫ СЕРТИФИКАТ' :
              data.type === 'diploma' ? 'Ерекше жетістіктері мен білімі үшін' : 'Ыстық ықылас пен алғыс белгісі'
            )}
          </p>
        </div>

        {/* Recipient Section */}
        <div className="w-full flex flex-col items-center my-4">
          <span className="text-slate-500 text-sm tracking-widest uppercase mb-3">Осы құжат мақтанышпен беріледі:</span>
          <div className="relative inline-block px-12 pb-2">
            <h2 
              className="text-4xl font-extrabold italic text-slate-900 border-b-2 border-amber-600 pb-2 px-6"
              style={{ fontFamily: 'Georgia, serif', minWidth: '400px' }}
            >
              {data.recipient || 'Аты-жөні осында жазылады'}
            </h2>
          </div>
        </div>

        {/* Description Section */}
        <div className="max-w-2xl px-6 text-center my-2">
          <p className="text-slate-600 text-base leading-relaxed leading-7">
            {data.description || 'Осы курсты сәтті аяқтап, өзінің жоғары кәсіби біліктілігін және белсенділігін көрсеткені үшін марапатталады. Болашақта үлкен жетістіктер мен шығармашылық табыстар тілейміз.'}
          </p>
        </div>

        {/* Footer Section */}
        <div className="w-full grid grid-cols-3 items-end mt-6 px-10">
          {/* Left: Serial & Date */}
          <div className="flex flex-col items-start text-left text-xs text-slate-500 gap-1 font-sans">
            <div><span className="font-semibold text-slate-700">Күні:</span> {data.date || '2026 жылғы 29 маусым'}</div>
            <div><span className="font-semibold text-slate-700">Тіркеу №:</span> {data.serialNumber || '№ CRT-94021'}</div>
          </div>

          {/* Center: Gold Seal Icon */}
          <div className="flex justify-center relative">
            {data.showSeal && (
              <div className="relative flex items-center justify-center">
                {/* Ribbon decoration behind seal */}
                {data.showRibbon && (
                  <div className="absolute -bottom-16 flex gap-4 pointer-events-none">
                    <div className="w-6 h-20 bg-amber-600 transform rotate-12 origin-top shadow-md border-b-4 border-r border-amber-800" />
                    <div className="w-6 h-20 bg-amber-600 transform -rotate-12 origin-top shadow-md border-b-4 border-l border-amber-800" />
                  </div>
                )}
                
                {/* Golden Badge Frame */}
                <div 
                  className="w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 border-amber-500 shadow-xl bg-amber-400 text-amber-950 p-1"
                  style={{
                    background: 'radial-gradient(circle, #fce078 0%, #d4af37 60%, #b28d15 100%)',
                    borderColor: '#f0d264'
                  }}
                >
                  <div className="w-full h-full rounded-full border border-amber-300 border-dashed flex flex-col items-center justify-center p-1">
                    <Award className="w-7 h-7 mb-0.5 text-amber-950" />
                    <span className="text-[7px] font-bold font-sans tracking-wide uppercase text-center text-amber-950 px-1 leading-tight">
                      {data.sealText || 'РЕСМИ МӨР'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Signature */}
          <div className="flex flex-col items-end text-right">
            {/* Handwriting Placeholder or Line */}
            <div className="relative w-44 flex flex-col items-center">
              <div className="absolute -top-8 font-serif italic text-2xl text-amber-800 tracking-wider">
                {data.signatureName ? data.signatureName.split(' ')[0] : 'Alash'}
              </div>
              <div className="w-full h-[1px] bg-slate-400 my-1" />
              <div className="text-xs font-bold text-slate-800">{data.signatureName || 'А. Байтұрсынов'}</div>
              <div className="text-[10px] text-slate-500 italic mt-0.5">{data.signatureTitle || 'Орталық Директоры'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------
// 2. MODERN BLUE TEMPLATE (Professional Corporate, Minimalist Gradient)
// -----------------------------------------------------------------
const ModernBlueTemplate: React.FC<BaseTemplateProps> = ({ data, width, height }) => {
  return (
    <div
      id="certificate-print-area"
      className="relative flex flex-col justify-between bg-slate-50 text-slate-800 overflow-hidden select-none border"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#f8fafc',
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* Dynamic Geometric Left Colored Bar */}
      <div className="absolute top-0 left-0 bottom-0 w-8 bg-blue-700" />
      <div className="absolute top-0 left-8 bottom-0 w-2 bg-blue-400" />

      {/* Modern Abstract Corner Shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <path d="M 100,0 L 40,0 L 100,60 Z" fill="#3b82f6" />
          <path d="M 100,0 L 60,0 L 100,40 Z" fill="#1d4ed8" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-10 w-48 h-48 opacity-15 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="100" cy="100" r="80" fill="#60a5fa" />
          <circle cx="100" cy="100" r="50" fill="#1d4ed8" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full pl-24 pr-16 py-16 flex flex-col justify-between items-start text-left">
        
        {/* Header Org */}
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-700 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold tracking-wider text-slate-800 uppercase font-sans">
              {data.organization || 'TECH-ACADEMY CORPORATION'}
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            ID: {data.serialNumber || '№ TAC-48201'}
          </div>
        </div>

        {/* Title area */}
        <div className="my-2">
          <div className="text-xs font-extrabold tracking-[0.2em] text-blue-600 uppercase mb-2">
            ҚҰРМЕТТІ МАРАПАТТАУ
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight leading-none mb-3">
            {data.title || (
              data.type === 'certificate' ? 'СЕРТИФИКАТ' :
              data.type === 'diploma' ? 'ДИПЛОМ' : 'ҚҰРМЕТ ГРАМОТАСЫ'
            )}
          </h1>
          <p className="text-slate-500 text-lg">
            {data.subtitle || (
              data.type === 'certificate' ? 'ТАЛАПТАРДЫ СӘТТІ ОРЫНДАП, БІЛІКТІЛІГІН ДӘЛЕЛДЕГЕНІ ҮШІН' :
              data.type === 'diploma' ? 'Оқу бағдарламасындағы үздік көрсеткіштері үшін' : 'Белсенді шығармашылық еңбегі үшін'
            )}
          </p>
        </div>

        {/* Recipient area */}
        <div className="w-full my-3">
          <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">Қатысушы:</div>
          <h2 className="text-4xl font-extrabold text-blue-900">
            {data.recipient || 'Ерболат Бауыржанұлы'}
          </h2>
          <div className="w-48 h-1 bg-blue-600 mt-2" />
        </div>

        {/* Description */}
        <div className="max-w-2xl text-slate-600 text-sm leading-relaxed my-1">
          <p>
            {data.description || 'Осы заманауи бағдарламалау курсын толық көлемде меңгеріп, практикалық жобаларды жоғары деңгейде қорғап шыққаны үшін берілді. Бұл құжат кәсіби дағдыларды толық растайды.'}
          </p>
        </div>

        {/* Footer info */}
        <div className="w-full flex justify-between items-end mt-4">
          <div className="flex gap-12 text-xs text-slate-500">
            <div>
              <span className="block font-bold text-slate-700">Берілген күні</span>
              <span>{data.date || '2026 жылғы 29 маусым'}</span>
            </div>
            <div>
              <span className="block font-bold text-slate-700">Тіркеу №</span>
              <span>{data.serialNumber || '№ TAC-48201'}</span>
            </div>
          </div>

          {/* Custom modern seal */}
          {data.showSeal && (
            <div className="relative mr-8">
              {data.showRibbon && (
                <div className="absolute -bottom-10 left-6 flex gap-2 pointer-events-none">
                  <div className="w-4 h-12 bg-blue-600 transform rotate-12" />
                  <div className="w-4 h-12 bg-blue-400 transform -rotate-12" />
                </div>
              )}
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex flex-col items-center justify-center shadow-lg border-2 border-slate-100">
                <Badge className="w-6 h-6" />
                <span className="text-[6px] font-bold text-center uppercase tracking-tighter leading-none mt-1">
                  {data.sealText || 'VERIFIED'}
                </span>
              </div>
            </div>
          )}

          {/* Signature spot */}
          <div className="text-right">
            <div className="font-serif italic text-xl text-blue-800 mb-1">
              {data.signatureName ? data.signatureName.split(' ')[0] : 'Modern'}
            </div>
            <div className="w-40 h-[1px] bg-slate-300 ml-auto mb-1" />
            <div className="text-xs font-bold text-slate-800">{data.signatureName || 'Нұрлан Смағұлов'}</div>
            <div className="text-[10px] text-slate-500 italic">{data.signatureTitle || 'Департамент басшысы'}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

// -----------------------------------------------------------------
// 3. EMERALD LUXURY TEMPLATE (Traditional Kazakh Elements / Academic Green)
// -----------------------------------------------------------------
const EmeraldLuxuryTemplate: React.FC<BaseTemplateProps> = ({ data, width, height }) => {
  return (
    <div
      id="certificate-print-area"
      className="relative flex flex-col justify-between overflow-hidden select-none border"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#f1f7f4',
        fontFamily: '"Georgia", serif',
      }}
    >
      {/* Intricate Royal Green Border */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
        <div className="absolute inset-6 border-[16px] border-emerald-950" />
        <div className="absolute inset-[38px] border-2 border-amber-500" />
        <div className="absolute inset-[44px] border border-emerald-850" />
        
        {/* Kazakh Traditional Pattern SVG Corners */}
        <div className="absolute top-10 left-10 w-12 h-12 text-amber-500">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
            <path d="M50 0 C60 20, 80 40, 100 50 C80 60, 60 80, 50 100 C40 80, 20 60, 0 50 C20 40, 40 20, 50 0 Z" />
          </svg>
        </div>
        <div className="absolute top-10 right-10 w-12 h-12 text-amber-500 transform rotate-90">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
            <path d="M50 0 C60 20, 80 40, 100 50 C80 60, 60 80, 50 100 C40 80, 20 60, 0 50 C20 40, 40 20, 50 0 Z" />
          </svg>
        </div>
        <div className="absolute bottom-10 left-10 w-12 h-12 text-amber-500 transform -rotate-90">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
            <path d="M50 0 C60 20, 80 40, 100 50 C80 60, 60 80, 50 100 C40 80, 20 60, 0 50 C20 40, 40 20, 50 0 Z" />
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 w-12 h-12 text-amber-500 transform rotate-180">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
            <path d="M50 0 C60 20, 80 40, 100 50 C80 60, 60 80, 50 100 C40 80, 20 60, 0 50 C20 40, 40 20, 50 0 Z" />
          </svg>
        </div>

        {/* Soft Guilloche Watermark */}
        <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center">
          <svg width="500" height="500" viewBox="0 0 120 120" stroke="currentColor" fill="none" strokeWidth="0.3" className="text-emerald-950">
            <circle cx="60" cy="60" r="50" />
            <circle cx="60" cy="60" r="45" strokeDasharray="2, 2" />
            <path d="M60 10 L60 110 M10 60 L110 60" />
            <polygon points="60,20 75,50 105,60 75,70 60,100 45,70 15,60 45,50" />
          </svg>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full h-full p-24 flex flex-col justify-between items-center text-center">
        
        {/* Header Org */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold tracking-[0.25em] text-emerald-800 uppercase mb-2 font-sans">
            {data.organization || 'РЕСПУБЛИКАЛЫҚ ДАРЫНДАР ОДАҒЫ'}
          </span>
          <div className="w-24 h-[2px] bg-amber-500" />
        </div>

        {/* Title / Badge */}
        <div className="my-4">
          <h1 className="text-5xl font-extrabold text-emerald-950 uppercase tracking-widest mb-1">
            {data.title || (
              data.type === 'certificate' ? 'СЕРТИФИКАТ' :
              data.type === 'diploma' ? 'ДИПЛОМ' : 'ҚҰРМЕТ ГРАМОТАСЫ'
            )}
          </h1>
          <p className="text-amber-600 font-serif italic text-lg mt-2 font-medium">
            {data.subtitle || (
              data.type === 'certificate' ? 'ӨЗ ЕЛІНІҢ ДАМУЫНА ҮЛЕС ҚОСҚАНЫ ҮШІН СЕНІМ БЕЛГІСІ' :
              data.type === 'diploma' ? 'I-ДӘРЕЖЕЛІ ХАЛЫҚАРАЛЫҚ МАРАПАТТАУ' : 'Шығармашылық табыстары үшін алғыс хат'
            )}
          </p>
        </div>

        {/* Recipient Block */}
        <div className="w-full flex flex-col items-center my-4">
          <span className="text-xs text-slate-500 tracking-widest uppercase mb-2 font-sans">ЖҮЛДЕГЕР:</span>
          <h2 className="text-4xl font-extrabold text-emerald-900 border-b border-amber-500 pb-2 px-10">
            {data.recipient || 'Әл-Фараби Ақылбек'}
          </h2>
        </div>

        {/* Description */}
        <div className="max-w-xl text-slate-700 text-sm leading-relaxed my-2">
          <p>
            {data.description || 'Республикалық білім мен өнер байқауында ерекше дарындылық танытып, өзінің үздік қабілеттері мен жасампаздық өнерін дәлелдегені үшін мақтанышпен марапатталады.'}
          </p>
        </div>

        {/* Footer info */}
        <div className="w-full grid grid-cols-3 items-end mt-4 px-6 font-sans">
          {/* Left: Metadata */}
          <div className="flex flex-col items-start text-left text-xs text-slate-500 gap-1">
            <div><span className="font-bold text-slate-700">Тіркелді:</span> {data.date || '2026 жылғы 29 маусым'}</div>
            <div><span className="font-bold text-slate-700">Тіркеу №:</span> {data.serialNumber || '№ DPL-20412'}</div>
          </div>

          {/* Center: Emerald / Gold Seal */}
          <div className="flex justify-center relative">
            {data.showSeal && (
              <div className="relative flex items-center justify-center">
                {data.showRibbon && (
                  <div className="absolute -bottom-14 flex gap-3 pointer-events-none">
                    <div className="w-5 h-16 bg-emerald-800 transform rotate-12 origin-top shadow-md border-b-4 border-r border-amber-500" />
                    <div className="w-5 h-16 bg-emerald-800 transform -rotate-12 origin-top shadow-md border-b-4 border-l border-amber-500" />
                  </div>
                )}
                
                <div 
                  className="w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 border-amber-500 shadow-xl text-amber-950"
                  style={{
                    background: 'radial-gradient(circle, #064e3b 0%, #022c22 100%)',
                    borderColor: '#f59e0b'
                  }}
                >
                  <div className="w-full h-full rounded-full border border-amber-400 border-dashed flex flex-col items-center justify-center p-1">
                    <Star className="w-6 h-6 mb-0.5 text-amber-400 fill-amber-400" />
                    <span className="text-[6px] font-extrabold tracking-widest uppercase text-center text-amber-400">
                      {data.sealText || 'ALASH'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Signature */}
          <div className="flex flex-col items-end text-right">
            <div className="relative w-40">
              <div className="absolute -top-7 right-6 font-serif italic text-xl text-emerald-800">
                {data.signatureName ? data.signatureName.split(' ')[0] : 'Kazakh'}
              </div>
              <div className="w-full h-[1px] bg-slate-300 mb-1" />
              <div className="text-xs font-bold text-slate-800">{data.signatureName || 'Айдос Сарсенбаев'}</div>
              <div className="text-[9px] text-slate-500 italic leading-tight">{data.signatureTitle || 'Бас Қазылар Төрағасы'}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// -----------------------------------------------------------------
// 4. CRIMSON MINIMAL TEMPLATE (Ultra Modern, Bold Dark Crimson & Slate)
// -----------------------------------------------------------------
const CrimsonMinimalTemplate: React.FC<BaseTemplateProps> = ({ data, width, height }) => {
  return (
    <div
      id="certificate-print-area"
      className="relative flex flex-col justify-between overflow-hidden select-none border"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#111827', // Noble dark theme
        color: '#f9fafb',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {/* Sleek Crimson and Gold Lines in Background */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-35 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="100" cy="0" r="90" stroke="#ef4444" strokeWidth="1" />
          <circle cx="100" cy="0" r="70" stroke="#f59e0b" strokeWidth="0.5" />
          <circle cx="100" cy="0" r="50" stroke="#ef4444" strokeWidth="0.2" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-80 h-80 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="0" cy="100" r="70" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx="0" cy="100" r="40" stroke="#111827" strokeWidth="2" />
        </svg>
      </div>

      {/* Decorative vertical bar with gold highlights */}
      <div className="absolute top-10 bottom-10 left-10 w-1 bg-red-600" />
      <div className="absolute top-20 bottom-20 left-12 w-[1px] bg-amber-500" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full pl-24 pr-16 py-16 flex flex-col justify-between items-start text-left">
        
        {/* Header Org */}
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-[0.3em] text-red-500 uppercase">
              {data.organization || 'GLOBAL KAZAKHSTAN FOUNDATION'}
            </span>
          </div>
          <div className="text-xs font-mono text-slate-500">
            SERIES: {data.serialNumber || '№ GKF-7049'}
          </div>
        </div>

        {/* Title Block */}
        <div className="my-3">
          <span className="text-xs font-extrabold tracking-widest text-amber-500 uppercase block mb-1">
            КӘСИБИ РАСТАУ
          </span>
          <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none mb-2">
            {data.title || (
              data.type === 'certificate' ? 'СЕРТИФИКАТ' :
              data.type === 'diploma' ? 'ДИПЛОМ' : 'МАДАҚТАМА'
            )}
          </h1>
          <p className="text-slate-400 text-lg max-w-xl font-light">
            {data.subtitle || (
              data.type === 'certificate' ? 'Жоғары құзыреттілік пен шеберлікті растайтын ресми құжат' :
              data.type === 'diploma' ? 'Жобалау және дамыту ісіндегі зор жетістіктері үшін' : 'Қоғамдық белсенділік пен жасампаздық үшін'
            )}
          </p>
        </div>

        {/* Recipient Block */}
        <div className="w-full my-4">
          <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Марапатталушы:</span>
          <h2 className="text-4xl font-black text-red-500 tracking-tight">
            {data.recipient || 'Жандос Сұлтанов'}
          </h2>
          <div className="w-24 h-1 bg-amber-500 mt-2" />
        </div>

        {/* Description Block */}
        <div className="max-w-2xl text-slate-400 text-sm leading-relaxed font-light">
          <p>
            {data.description || 'Бұл хат иесінің ерекше кәсіби дағдылары мен жетістіктерін, жоба барысында көрсеткен төзімділігі мен шығармашылық көзқарасын ресми түрде куәландырады және мақұлдайды.'}
          </p>
        </div>

        {/* Footer Area */}
        <div className="w-full flex justify-between items-end mt-4">
          <div className="flex gap-10 text-xs text-slate-500">
            <div>
              <span className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Берілді:</span>
              <span className="text-slate-300">{data.date || '2026 жылғы 29 маусым'}</span>
            </div>
            <div>
              <span className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Тіркеу нөмірі:</span>
              <span className="text-slate-300 font-mono">{data.serialNumber || '№ GKF-7049'}</span>
            </div>
          </div>

          {/* Minimal Crimson/Gold Seal badge if enabled */}
          {data.showSeal && (
            <div className="relative mr-8">
              {data.showRibbon && (
                <div className="absolute -bottom-10 left-5 flex gap-1.5 pointer-events-none">
                  <div className="w-3.5 h-12 bg-red-600 transform rotate-12" />
                  <div className="w-3.5 h-12 bg-amber-500 transform -rotate-12" />
                </div>
              )}
              <div 
                className="w-14 h-14 rounded-full flex flex-col items-center justify-center border-2 border-amber-500 text-amber-500 shadow-xl"
                style={{ backgroundColor: '#1e293b' }}
              >
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-[5px] font-bold text-center uppercase tracking-tighter mt-0.5 leading-none">
                  {data.sealText || 'OFFICIAL'}
                </span>
              </div>
            </div>
          )}

          {/* Signature spot */}
          <div className="text-right">
            <div className="font-serif italic text-xl text-red-400 mb-1">
              {data.signatureName ? data.signatureName.split(' ')[0] : 'Admin'}
            </div>
            <div className="w-36 h-[1px] bg-slate-700 ml-auto mb-1" />
            <div className="text-xs font-bold text-white">{data.signatureName || 'Руслан Қалиев'}</div>
            <div className="text-[10px] text-slate-500 italic">{data.signatureTitle || 'Басқарушы Директор'}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

// -----------------------------------------------------------------
// 5. CUSTOM UPLOAD BACKGROUND TEMPLATE (User-uploaded templates)
// -----------------------------------------------------------------
const CustomBackgroundTemplate: React.FC<BaseTemplateProps> = ({ data, width, height }) => {
  return (
    <div
      id="certificate-print-area"
      className="relative flex flex-col justify-between text-slate-800 overflow-hidden select-none"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${data.customBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Absolute Overlay of Content */}
      <div className="relative z-10 w-full h-full p-24 flex flex-col justify-between items-center text-center bg-transparent">
        {/* Top Header Section */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-semibold tracking-[0.2em] text-slate-800 uppercase mb-2">
            {data.organization || 'ХАЛЫҚАРАЛЫҚ БІЛІМ БЕРУ ОРТАЛЫҒЫ'}
          </div>
          
          {/* Decorative Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="w-16 h-[1px] bg-slate-400" />
            <Star className="w-4 h-4 text-slate-400 fill-slate-400 animate-pulse" />
            <div className="w-16 h-[1px] bg-slate-400" />
          </div>
        </div>

        {/* Document Title Selection */}
        <div className="flex flex-col items-center my-4">
          <h1 
            className="text-5xl font-bold uppercase tracking-wider mb-2"
            style={{ 
              color: '#1e293b',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.08em'
            }}
          >
            {data.title || (
              data.type === 'certificate' ? 'СЕРТИФИКАТ' :
              data.type === 'diploma' ? 'ДИПЛОМ' : 'МАДАҚТАМА'
            )}
          </h1>
          <p className="text-slate-600 italic text-lg font-medium">
            {data.subtitle || (
              data.type === 'certificate' ? 'ТАБЫСТЫ АЯҚТАҒАНЫ ТУРАЛЫ СЕРТИФИКАТ' :
              data.type === 'diploma' ? 'Ерекше жетістіктері мен білімі үшін' : 'Ыстық ықылас пен алғыс белгісі'
            )}
          </p>
        </div>

        {/* Recipient Section */}
        <div className="w-full flex flex-col items-center my-4">
          <span className="text-slate-500 text-xs tracking-widest uppercase mb-3">Осы құжат мақтанышпен беріледі:</span>
          <div className="relative inline-block px-12 pb-2">
            <h2 
              className="text-4xl font-extrabold italic text-indigo-900 border-b-2 border-indigo-600 pb-2 px-6"
              style={{ fontFamily: 'Georgia, serif', minWidth: '400px' }}
            >
              {data.recipient || 'Аты-жөні осында жазылады'}
            </h2>
          </div>
        </div>

        {/* Description Section */}
        <div className="max-w-2xl px-6 text-center my-2">
          <p className="text-slate-700 text-base leading-relaxed font-sans">
            {data.description || 'Осы курсты сәтті аяқтап, өзінің жоғары кәсіби біліктілігін және белсенділігін көрсеткені үшін марапатталады. Болашақта үлкен жетістіктер мен шығармашылық табыстар тілейміз.'}
          </p>
        </div>

        {/* Footer Section */}
        <div className="w-full grid grid-cols-3 items-end mt-6 px-10">
          {/* Left: Serial & Date */}
          <div className="flex flex-col items-start text-left text-xs text-slate-500 gap-1 font-sans">
            <div><span className="font-semibold text-slate-700">Күні:</span> {data.date || '2026 жылғы 29 маусым'}</div>
            <div><span className="font-semibold text-slate-700">Тіркеу №:</span> {data.serialNumber || '№ CRT-94021'}</div>
          </div>

          {/* Center: Gold Seal Icon */}
          <div className="flex justify-center relative">
            {data.showSeal && (
              <div className="relative flex items-center justify-center">
                {/* Ribbon decoration behind seal */}
                {data.showRibbon && (
                  <div className="absolute -bottom-16 flex gap-4 pointer-events-none">
                    <div className="w-6 h-20 bg-indigo-600 transform rotate-12 origin-top shadow-md border-b-4 border-r border-indigo-800" />
                    <div className="w-6 h-20 bg-indigo-600 transform -rotate-12 origin-top shadow-md border-b-4 border-l border-indigo-800" />
                  </div>
                )}
                
                {/* Golden Badge Frame */}
                <div 
                  className="w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 border-indigo-500 shadow-xl bg-indigo-400 text-indigo-950 p-1"
                  style={{
                    background: 'radial-gradient(circle, #818cf8 0%, #4f46e5 60%, #312e81 100%)',
                    borderColor: '#a5b4fc'
                  }}
                >
                  <div className="w-full h-full rounded-full border border-indigo-300 border-dashed flex flex-col items-center justify-center p-1">
                    <Award className="w-6 h-6 mb-0.5 text-white" />
                    <span className="text-[6px] font-bold font-sans tracking-wide uppercase text-center text-white px-1 leading-tight">
                      {data.sealText || 'РЕСМИ МӨР'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Signature */}
          <div className="flex flex-col items-end text-right">
            {/* Handwriting Placeholder or Line */}
            <div className="relative w-44 flex flex-col items-center">
              <div className="absolute -top-8 font-serif italic text-2xl text-indigo-800 tracking-wider">
                {data.signatureName ? data.signatureName.split(' ')[0] : 'Alash'}
              </div>
              <div className="w-full h-[1px] bg-slate-400 my-1" />
              <div className="text-xs font-bold text-slate-800">{data.signatureName || 'А. Байтұрсынов'}</div>
              <div className="text-[10px] text-slate-500 italic mt-0.5">{data.signatureTitle || 'Орталық Директоры'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
