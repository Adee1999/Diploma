/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, EyeOff } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
        id="legal-modal-container"
      >
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              {activeTab === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {activeTab === 'privacy' ? 'Құпиялылық саясаты' : 'Пайдалану шарттары'}
              </h2>
              <p className="text-[11px] text-slate-500 font-mono">Соңғы жаңартылуы: 29 маусым, 2026 жыл</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200/80 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            id="close-legal-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-100 bg-slate-50/50 px-4">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-indigo-600 text-indigo-600 bg-white/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Құпиялылық саясаты</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'terms'
                ? 'border-indigo-600 text-indigo-600 bg-white/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Пайдалану шарттары</span>
          </button>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-sm text-slate-600 leading-relaxed font-sans scrollbar-thin">
          {activeTab === 'privacy' ? (
            <div className="space-y-6" id="privacy-policy-content">
              {/* Highlight Safety Card */}
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3.5">
                <div className="p-2 bg-emerald-500 text-white rounded-lg shrink-0">
                  <EyeOff className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                    100% Клиенттік Қауіпсіздік (Браузерлік өңдеу)
                  </h4>
                  <p className="text-xs text-emerald-800 leading-normal">
                    Біз сіздің жеке басыңыздың қауіпсіздігін толықтай қамтамасыз етеміз. Жүктелген суреттер, дербес деректер (есімдер, лауазымдар) немесе құжат мазмұндары біздің ешқандай серверімізге сақталмайды және жіберілмейді. Барлық құрастыру процесі мен PDF файлды экспорттау тек сіздің браузеріңізде (client-side) қауіпсіз түрде жүзеге асырылады.
                  </p>
                </div>
              </div>

              {/* General Policy */}
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-800">1. Жалпы ережелер</h3>
                <p>
                  Осы Құпиялылық саясаты біздің «Онлайн Сертификат және Диплом Генераторы» веб-қосымшасын пайдаланған кезде дербес деректерді өңдеу және қорғау тәртібін анықтайды. Біз пайдаланушылардың жеке өміріне құрметпен қараймыз және олардың ақпараттық қауіпсіздігіне барынша кепілдік береміз.
                </p>
              </section>

              {/* Data Collection */}
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-800">2. Деректерді жинау және өңдеу</h3>
                <p>
                  Біздің қызметіміз ешқандай пайдаланушы тіркелуін талап етпейді. Сайтта сертификат дайындау барысында енгізілген мәліметтер (алушының аты-жөні, ұйым атауы, мөр мәтіні, күні мен сериялық нөмірі) тек қана құжат үлгісін кескіндеу (rendering) және PDF файлды құрастыру үшін уақытша пайдаланылады.
                </p>
                <p>
                  <strong>Жеке Шаблондар:</strong> «Сырттан шаблон жүктеу» мүмкіндігі арқылы жүктелген суреттер <code>FileReader API</code> арқылы браузер жадында Base64 форматында локальді өңделеді. Олар біздің серверге немесе үшінші тараптарға ешқашан берілмейді.
                </p>
              </section>

              {/* Google AdSense Requirements */}
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-800">3. Google AdSense және үшінші тарап жарнамалары</h3>
                <p>
                  Сайтымыздың тегін жұмыс істеуін қолдау мақсатында болашақта Google AdSense және басқа да жарнамалық жүйелердің жарнамаларын көрсетуіміз мүмкін.
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>Google, үшінші тарап провайдері ретінде, сайтымызда жарнама көрсету үшін Cookie файлдарын (мысалы, DART cookie) пайдаланады.</li>
                  <li>Google-дың Cookie файлдарын пайдалануы оның біздің сайтқа және интернеттегі басқа веб-сайттарға кіруі негізінде пайдаланушыларға мақсатты жарнамаларды көрсетуге мүмкіндік береді.</li>
                  <li>Пайдаланушылар Google жарнамалары мен контент желісінің құпиялылық саясаты бетіне өту арқылы DART cookie файлдарын пайдаланудан бас тарта алады.</li>
                </ul>
              </section>

              {/* Cookies usage */}
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-800">4. Cookie файлдарын қолдану</h3>
                <p>
                  Біз сайттың жұмыс істеу сапасын жақсарту үшін Cookie файлдарын қолданамыз. Олар біздің жүйеге сіздің браузеріңізді тануға және белгілі бір реттеулерді (мысалы, соңғы жасалған баптауларды) келесі жолы сайтқа кіргенде ыңғайлы болу үшін есінде сақтауға көмектеседі. Сіз өз браузеріңіздің баптаулары арқылы Cookie-ді өшіре аласыз, бірақ бұл кейбір функциялардың дұрыс жұмыс істемеуіне әкелуі мүмкін.
                </p>
              </section>

              {/* Security measures */}
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-800">5. Қауіпсіздік</h3>
                <p>
                  Бүкіл ақпарат алмасу HTTPS шифрланған қауіпсіз арнасы арқылы өтеді. Серверлік деректер қоры мен бэкэнд жүйесі жоқ болғандықтан, сырттан жасалуы мүмкін хакерлік шабуылдар немесе деректердің тарап кету (data leaks) қаупі нөлге тең. Сіздің барлық шығармашылық жұмысыңыз тек сіздің жеке компьютеріңіз бен құрылғыңызда қалады.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-6" id="terms-of-service-content">
              {/* Highlight Terms Card */}
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-start gap-3.5">
                <div className="p-2 bg-indigo-600 text-white rounded-lg shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-1">
                    Тегін Жүктеу және Коммерциялық Пайдалану
                  </h4>
                  <p className="text-xs text-indigo-800 leading-normal">
                    Дайындалған құжаттарды коммерциялық, кәсіби және білім беру мақсаттарында толықтай тегін жүктеп, пайдалануға рұқсат етіледі. Біз сізден ешқандай ақылы жазылым немесе жасырын комиссиялар талап етпейміз.
                  </p>
                </div>
              </div>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-800">1. Шарттарды қабылдау</h3>
                <p>
                  Осы веб-сайтқа кіру және сертификаттар мен дипломдар құрастыру қызметін пайдалану арқылы сіз осы Пайдалану шарттарын толық және шексіз қабылдайтыныңызды білдіресіз. Егер сіз осы шарттармен келіспесеңіз, қызметті пайдаланбауыңызды сұраймыз.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-800">2. Пайдалану рұқсаттары</h3>
                <p>
                  Пайдаланушыларға келесі мүмкіндіктер мен рұқсаттар тегін беріледі:
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>Дайын құралдарды пайдалана отырып, білім беру мекемелеріне, курстарға, спорттық секцияларға немесе іс-шараларға арналған сертификаттар мен дипломдарды еркін дайындау;</li>
                  <li>Экспортталған PDF және сурет файлдарын басып шығару (А4 форматында) және желі арқылы тарату;</li>
                  <li>Жеке шаблондар ретінде өз суреттерін жүктеп, оның үстіне мәтін қосып өңдеу.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-800">3. Шектеулер мен Жауапкершілік</h3>
                <p>
                  Пайдаланушы келесі әрекеттерді жасамауға міндеттенеді:
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1 text-rose-700">
                  <li>Қызметті мемлекеттік ресми құжаттарды бұрмалау, заңсыз лицензиялар мен жалған дипломдарды жасау мақсатында пайдалануға;</li>
                  <li>Басқа тұлғалардың авторлық құқықтарын немесе сауда белгілерін бұзатын суреттер мен шаблондарды заңсыз жүктеуге.</li>
                </ul>
                <p className="mt-2 text-slate-500 text-xs">
                  Сайт әкімшілігі пайдаланушылар жасаған құжаттардың заңдылығы мен мазмұнына жауапты емес. Барлық жауапкершілік құжатты жасап, оны таратқан пайдаланушыға жүктеледі.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-800">4. Қызметтің кепілдіктері</h3>
                <p>
                  Бұл қызмет «бар қалпында» (as is) негізінде ұсынылады. Біз қызметтің үзіліссіз жұмыс істеуіне немесе құжаттарды жасау барысында браузер үйлесімділігіне байланысты туындайтын уақытша техникалық ақауларға жауапты емеспіз, бірақ платформаны барынша жетілдіруге тырысамыз.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">© 2026 Sertif-Vite. Қауіпсіз құжат жасау қызметі.</p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            id="accept-legal-modal"
          >
            Түсінікті, Рақмет
          </button>
        </div>
      </div>
    </div>
  );
};
