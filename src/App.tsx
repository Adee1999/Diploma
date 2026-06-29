/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CertificateData, PresetTemplate } from './types';
import { Sidebar } from './components/Sidebar';
import { CertificatePreview } from './components/CertificatePreview';
import { LegalModal } from './components/LegalModal';
import { 
  Award, Sparkles, Printer, FileDown, ShieldCheck, 
  HelpCircle, ChevronRight, Info, BookOpen
} from 'lucide-react';

export default function App() {
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');

  const [data, setData] = useState<CertificateData>({
    type: 'certificate',
    title: 'СЕРТИФИКАТ',
    subtitle: 'БІЛІКТІЛІКТІ СӘТТІ АЯҚТАҒАНЫ ТУРАЛЫ СЕРТИФИКАТ',
    recipient: 'Әбілхайыр Жанұзақов',
    description: 'Осы білім беру бағдарламасы бойынша «Full-Stack Веб Әзірлеуші және Системдік Архитектура» бағытындағы қарқынды кәсіби оқу курсын толық меңгеріп, қорытынды практикалық аттестациялық жобаны сәтті қорғап шыққаны үшін мақтанышпен табысталады.',
    organization: 'DIGITAL INNOVATION ACADEMY',
    date: '2026 жылғы 29 маусым',
    signatureName: 'Проф. Е. Нұрсұлтан',
    signatureTitle: 'Академия Басшысы',
    serialNumber: '№ DIA-10842-2026',
    orientation: 'landscape',
    templateId: 'classic-gold',
    showSeal: true,
    sealText: 'ҚАБЫЛДАНДЫ',
    showRibbon: true,
    primaryColor: '#d4af37',
    secondaryColor: '#1a2e40',
  });

  // Handle Preset Conversions
  const handleApplyPreset = (presetType: string) => {
    switch (presetType) {
      case 'it-course':
        setData({
          type: 'certificate',
          title: 'СЕРТИФИКАТ',
          subtitle: 'ТАБЫСТЫ КӘСИБИ АЯҚТАУ ТУРАЛЫ',
          recipient: 'Темірлан Төлеуов',
          description: 'Осы оқу бағдарламасы бойынша «Vite, React және Node.js негезіндегі Full-stack өнімді қосымшаларды жасау» атты халықаралық практикалық курсты толықтай бітіріп, қорытынды емтихандардан ең жоғары көрсеткіш көрсеткені үшін берілді.',
          organization: 'TECH LAB KAZAKHSTAN',
          date: '2026 жылғы 25 мамыр',
          signatureName: 'Әлихан Аманжол',
          signatureTitle: 'Бас техникалық директор (CTO)',
          serialNumber: '№ TLK-2026-948',
          orientation: 'landscape',
          templateId: 'modern-blue',
          showSeal: true,
          sealText: 'VERIFIED',
          showRibbon: false,
          primaryColor: '#3b82f6',
          secondaryColor: '#1e293b',
        });
        break;
      case 'olympiad':
        setData({
          type: 'diploma',
          title: 'I - ДӘРЕЖЕЛІ ДИПЛОМ',
          subtitle: 'РЕСПУБЛИКАЛЫҚ ПӘНДІК ОЛИМПИАДА ЖҮЛДЕГЕРІ',
          recipient: 'Аружан Сәдуақасова',
          description: 'Мектеп оқушылары мен студенттер арасында өткен Бағдарламалау және Алгоритмдік есептерді шешу бағыты бойынша Республикалық турнирде айрықша зеректілік танытып, жүлделі І Орынды иеленгені үшін марапатталады.',
          organization: 'ДАРЫН МЕМЛЕКЕТТІК ОРТАЛЫҒЫ',
          date: '2026 жылғы 12 сәуір',
          signatureName: 'Д-р С. Қалиев',
          signatureTitle: 'Олимпиада Ұйымдастыру Төрағасы',
          serialNumber: '№ DRN-OLY-0519',
          orientation: 'portrait',
          templateId: 'emerald-luxury',
          showSeal: true,
          sealText: 'РЕСМИ ҚАУЫМ',
          showRibbon: true,
          primaryColor: '#10b981',
          secondaryColor: '#064e3b',
        });
        break;
      case 'employee':
        setData({
          type: 'honor',
          title: 'МАДАҚТАМА ГРАМОТАСЫ',
          subtitle: 'ЖЫЛДЫҢ ҮЗДІК ҚЫЗМЕТКЕРІ',
          recipient: 'Мадияр Қасымов',
          description: 'Ағымдағы жылы компаниямыздың IT-инфрақұрылымын жаңғырту мен жаңа өнімдерді нарыққа шығарудағы зор еңбегі, жоғары жауапкершілігі, адалдығы және ұжымды алға жетелеген кәсіби шеберлігі үшін шын жүректен марапатталады.',
          organization: 'ALASH DIGITAL GROUP',
          date: '2026 жылғы 29 маусым',
          signatureName: 'Бауыржан Темірбек',
          signatureTitle: 'Бас Директор (CEO)',
          serialNumber: '№ ADG-HON-2026',
          orientation: 'landscape',
          templateId: 'crimson-minimal',
          showSeal: true,
          sealText: 'OFFICIAL SEAL',
          showRibbon: true,
          primaryColor: '#ef4444',
          secondaryColor: '#111827',
        });
        break;
      case 'retirement':
        setData({
          type: 'honor',
          title: 'ҚҰРМЕТ ГРАМОТАСЫ',
          subtitle: 'КӨП ЖЫЛҒЫ ЕЛЕУЛІ ЕҢБЕГІ ҮШІН',
          recipient: 'Сәуле Қалиқызы Әлімбаева',
          description: 'Көп жылғы елеулі еңбегі, мінсіз қызметі мен ұйымның дамуына қосқан үлесі үшін зейнет демалысына шығуына байланысты құрметпен марапатталады. Сізге зор денсаулық пен ұзақ ғұмыр тілейміз!',
          organization: 'КӨЛІК ЖӘНЕ КОММУНИКАЦИЯ МИНИСТРЛІГІ',
          date: '2026 жылғы 29 маусым',
          signatureName: 'М. Сұлтанов',
          signatureTitle: 'Басқарма Төрағасы',
          serialNumber: '№ ЗНТ-2026-08',
          orientation: 'landscape',
          templateId: 'classic-gold',
          showSeal: true,
          sealText: 'РЕСМИ РАСТАУ',
          showRibbon: true,
          primaryColor: '#d4af37',
          secondaryColor: '#1e293b',
        });
        break;
      case 'teacher':
        setData({
          type: 'diploma',
          title: 'БІЛІКТІЛІК ДИПЛОМЫ',
          subtitle: 'ПЕДАГОГИКАЛЫҚ ШЕБЕРЛІК ПЕН ЗОР ҮЛЕС',
          recipient: 'Дариға Асқарқызы Нұрпейісова',
          description: 'Өскелең ұрпаққа сапалы білім мен саналы тәрбие берудегі педагогикалық шеберлігі, ұстаздық адал еңбегі мен білім саласын дамытуға қосқан зор үлесі үшін марапатталады.',
          organization: 'БІЛІМ ЖӘНЕ ҒЫЛЫМ МИНИСТРЛІГІ',
          date: '2026 жылғы 29 маусым',
          signatureName: 'А. Құсайынов',
          signatureTitle: 'Комитет Төрағасы',
          serialNumber: '№ ҰСТ-2026-45',
          orientation: 'landscape',
          templateId: 'emerald-luxury',
          showSeal: true,
          sealText: 'КӘСИБИ СЕНІМ',
          showRibbon: true,
          primaryColor: '#10b981',
          secondaryColor: '#064e3b',
        });
        break;
      case 'student':
        setData({
          type: 'honor',
          title: 'БЕЛСЕНДІЛІК МАДАҚТАМАСЫ',
          subtitle: 'ҮЗДІК ОҚУШЫ ЖӘНЕ БЕЛСЕНДІ ЖАС',
          recipient: 'Әлихан Темірболатұлы',
          description: 'Үлгілі тәртібі, оқу озаты ретінде көрсеткен жоғары нәтижелері және мектептің қоғамдық іс-шараларына белсене қатысқаны үшін марапатталады.',
          organization: '№155 МЕМЛЕКЕТТІК ЛИЦЕЙ-МЕКТЕБІ',
          date: '2026 жылғы 29 маусым',
          signatureName: 'Г. Сәдуақасова',
          signatureTitle: 'Мектеп Директоры',
          serialNumber: '№ ОҚУ-2026-119',
          orientation: 'portrait',
          templateId: 'modern-blue',
          showSeal: true,
          sealText: 'МЕКТЕП МӨРІ',
          showRibbon: false,
          primaryColor: '#3b82f6',
          secondaryColor: '#1e293b',
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. TOP HEADER BRAND BAR */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-50 px-6 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-md shadow-indigo-500/10">
              <Award className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-slate-800 uppercase">
                  Diploma Builder
                </h1>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">
                  Онлайн генератор v2.4
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Онлайн сертификаттарды, дипломдарды және алғыс хаттарды жасау платформасы
              </p>
            </div>
          </div>

          {/* Top Info badges */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-slate-200">
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Баспаға дайын (A4 Print Perfect)</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>100% клиенттік экспорт</span>
            </span>
          </div>
        </div>
      </header>

      {/* 2. MAIN CORE LAYOUT WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Control panel (Col 12 to Col 5) */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-4 h-full">
          <Sidebar 
            data={data} 
            onChange={setData} 
            onApplyPreset={handleApplyPreset}
          />
        </div>

        {/* Right Preview Canvas panel (Col 12 to Col 7) */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col h-full gap-6">
          <CertificatePreview data={data} />
          
          {/* Detailed Print Guideline Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-1.5">
                Баспаға жіберу және PDF-ке экспорттау жөніндегі нұсқаулық:
              </h4>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-indigo-600">Патенттелген High-DPI жүйесі:</strong> Біздің генератор құжатты 
                  <strong className="text-slate-800 font-semibold"> 300 DPI </strong> кәсіби баспа өлшемінде экспорттайды, бұл мөр мен кіші мәтіндердің айқындығын кепілдейді.
                </li>
                <li>
                  <strong className="text-indigo-600">Түпнұсқа Шрифттер:</strong> Барлық рамкалар мен суреттер толық сақталып, PDF файлына кірістіріледі.
                </li>
                <li>
                  <strong className="text-indigo-600">Принтерге жіберу:</strong> Құжатты басып шығару кезінде принтер параметрлеріндегі <span className="text-slate-800 font-semibold">«Шеттерді (Margins)»</span> міндетті түрде <span className="text-slate-800 font-semibold">«Жоқ (None)»</span> деп орнатыңыз, сонда рамка А4 қағазына толық сыяды.
                </li>
              </ul>
            </div>
          </div>
        </div>

      </main>

      {/* 3. PLATFORM FOOTER */}
      <footer className="border-t border-slate-200 py-6 mt-12 bg-white text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
          <span>© 2026 Онлайн Сертификат Генераторы. Барлық құқықтар қорғалған.</span>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => { setLegalTab('privacy'); setIsLegalOpen(true); }}
              className="hover:text-indigo-600 transition-colors cursor-pointer font-semibold underline decoration-dotted"
            >
              Құпиялылық саясаты
            </button>
            <span>•</span>
            <button 
              onClick={() => { setLegalTab('terms'); setIsLegalOpen(true); }}
              className="hover:text-indigo-600 transition-colors cursor-pointer font-semibold underline decoration-dotted"
            >
              Пайдалану шарттары
            </button>
            <span>•</span>
            <span className="text-slate-300">Vite + React + TS (html2canvas & jspdf)</span>
          </div>
        </div>
      </footer>

      {/* 4. LEGAL REGULATION MODALS */}
      <LegalModal 
        isOpen={isLegalOpen} 
        onClose={() => setIsLegalOpen(false)} 
        initialTab={legalTab} 
      />

    </div>
  );
}
