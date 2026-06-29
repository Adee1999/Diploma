/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CertificateData, DocumentType, DocumentOrientation, TemplateId } from '../types';
import { 
  FileText, Award, FileSpreadsheet, Layers, 
  User, Calendar, PenTool, Globe, Check,
  Gift, GraduationCap, BookOpen, Upload,
  Image, Trash2
} from 'lucide-react';

interface SidebarProps {
  data: CertificateData;
  onChange: (newData: CertificateData) => void;
  onApplyPreset: (presetType: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ data, onChange, onApplyPreset }) => {
  const updateField = (field: keyof CertificateData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  // Pre-configured designs available
  const templates: { id: TemplateId; name: string; desc: string; colors: string }[] = [
    { id: 'classic-gold', name: 'Классикалық Алтын', desc: 'Ресми және академиялық марапаттарға арналған', colors: 'bg-amber-100 border-amber-400 text-amber-900' },
    { id: 'modern-blue', name: 'Заманауи Көк', desc: 'IT және корпоративтік жобаларға мінсіз', colors: 'bg-blue-100 border-blue-400 text-blue-950' },
    { id: 'emerald-luxury', name: 'Зүбәржат Сән', desc: 'Хаттар мен дәстүрлі салтанатты байқауларға', colors: 'bg-emerald-100 border-emerald-400 text-emerald-950' },
  ];

  // Presets array for quick templates
  const presets = [
    { id: 'it-course', name: 'IT Курсы', icon: Award, color: 'text-blue-600 hover:bg-blue-50/50' },
    { id: 'olympiad', name: 'Олимпиада', icon: FileText, color: 'text-amber-600 hover:bg-amber-50/50' },
    { id: 'employee', name: 'Үздік Қызметкер', icon: FileSpreadsheet, color: 'text-emerald-600 hover:bg-emerald-50/50' },
    { id: 'retirement', name: 'Зейнетке шығу', icon: Gift, color: 'text-rose-600 hover:bg-rose-50/50' },
    { id: 'teacher', name: 'Ұстаздарға', icon: GraduationCap, color: 'text-indigo-600 hover:bg-indigo-50/50' },
    { id: 'student', name: 'Оқушыларға', icon: BookOpen, color: 'text-cyan-600 hover:bg-cyan-50/50' },
  ];

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs text-slate-800">
      
      {/* Preset Launcher Header */}
      <div className="px-6 py-5 bg-slate-50 border-b border-slate-100">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span>Құжат редакторы мен баптаулары</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Дайын шаблондарды немесе өз деректеріңізді енгізіп жасаңыз
        </p>

        {/* Quick Presets Buttons */}
        <div className="mt-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-2">
            Жылдам Толтыру (Үлгілер):
          </span>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => {
              const IconComp = preset.icon;
              return (
                <button
                  key={preset.id}
                  onClick={() => onApplyPreset(preset.id)}
                  className={`px-3 py-2 bg-white ${preset.color} active:bg-slate-100 rounded-lg text-xs font-semibold border border-slate-200 transition-all flex items-center gap-2 cursor-pointer shadow-3xs`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span className="truncate text-slate-700">{preset.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Editor Main Forms */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* SECTION 1: DOCUMENT TYPE & ORIENTATION */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            1. Басты параметрлер
          </label>
          
          {/* Document Type Cards */}
          <div className="grid grid-cols-3 gap-2">
            {(['certificate', 'diploma', 'honor'] as DocumentType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  updateField('type', type);
                  // Update title to default match
                  if (type === 'certificate') updateField('title', 'СЕРТИФИКАТ');
                  if (type === 'diploma') updateField('title', 'ДИПЛОМ');
                  if (type === 'honor') updateField('title', 'МАДАҚТАМА');
                }}
                className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  data.type === type
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Award className="w-5 h-5 mb-1 text-indigo-600" />
                <span className="text-xs font-bold leading-tight">
                  {type === 'certificate' ? 'Сертификат' :
                   type === 'diploma' ? 'Диплом' : 'Мадақтама'}
                </span>
              </button>
            ))}
          </div>

          {/* Orientation Toggle */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {(['landscape', 'portrait'] as DocumentOrientation[]).map((orientation) => (
              <button
                key={orientation}
                onClick={() => updateField('orientation', orientation)}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  data.orientation === orientation
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <span className={`block w-4 h-3 rounded-[2px] border ${
                  orientation === 'landscape' ? 'w-4 h-3' : 'w-3 h-4'
                } ${data.orientation === orientation ? 'border-indigo-600 bg-indigo-200' : 'border-slate-300'}`} />
                <span>
                  {orientation === 'landscape' ? 'Альбомдық (А4)' : 'Кітаптық (А4)'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 2: TEMPLATE CHOOSE */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            2. Шаблон дизайны
          </label>
          <div className="grid grid-cols-1 gap-2">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => updateField('templateId', tpl.id)}
                disabled={!!data.customBackground}
                className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  data.templateId === tpl.id && !data.customBackground
                    ? 'bg-slate-50 border-indigo-600 ring-1 ring-indigo-500/30 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${tpl.colors}`}>
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span>{tpl.name}</span>
                    {data.templateId === tpl.id && !data.customBackground && (
                      <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3]" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{tpl.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 2.5: CUSTOM TEMPLATE UPLOAD */}
        <div className="space-y-3 p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100/80">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-indigo-950 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-indigo-600 animate-bounce" />
              <span>Өз шаблоныңызды жүктеу</span>
            </label>
            {data.customBackground && (
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 animate-pulse">
                <Check className="w-3 h-3 stroke-[3]" />
                Қосылды
              </span>
            )}
          </div>
          
          <p className="text-[11px] text-slate-500 leading-normal">
            Планшеттік немесе баспаға дайын бос А4 сертификат суретін (PNG/JPG) жүктеңіз.
          </p>

          {!data.customBackground ? (
            <div className="relative border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-white rounded-xl p-4 transition-all text-center group cursor-pointer shadow-3xs hover:shadow-2xs">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        updateField('customBackground', event.target.result as string);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              <div className="flex flex-col items-center justify-center gap-1.5">
                <Image className="w-8 h-8 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                <span className="text-xs font-bold text-indigo-600 group-hover:text-indigo-800 transition-colors">Сурет таңдау немесе апару</span>
                <span className="text-[10px] text-slate-400">Максималды сапа үшін А4 форматы ұсынылады</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-white border border-indigo-100 rounded-xl shadow-3xs">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-50 relative flex items-center justify-center">
                  <img src={data.customBackground} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate">Сырттан жүктелген шаблон</div>
                  <div className="text-[10px] text-slate-500">Фондық сурет ретінде орнатылды</div>
                </div>
                <button
                  onClick={() => updateField('customBackground', undefined)}
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                  title="Шаблонды тазалау"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => updateField('customBackground', undefined)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Жеке шаблонды өшіру (Стандартты қайтару)</span>
              </button>
            </div>
          )}
        </div>

        {/* SECTION 3: TEXT FIELDS */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block border-b border-slate-100 pb-2">
            3. Мәтіндік мазмұны
          </label>

          {/* Org & Document Title */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase">Мекеме/Ұйым аты</label>
              <input
                type="text"
                value={data.organization}
                onChange={(e) => updateField('organization', e.target.value)}
                placeholder="Мекеме аты"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase">Құжат тақырыбы</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="СЕРТИФИКАТ"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
          </div>

          {/* Subtitle */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase">Қосымша тақырыбы</label>
            <input
              type="text"
              value={data.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Курсты толық аяқтағаны туралы"
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>

          {/* Recipient Name */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase flex items-center gap-1 text-indigo-600">
              <User className="w-3 h-3" />
              <span>Марапатталушының аты-жөні</span>
            </label>
            <input
              type="text"
              value={data.recipient}
              onChange={(e) => updateField('recipient', e.target.value)}
              placeholder="Мыс: Ерболат Бауыржанұлы"
              className="w-full bg-white border border-indigo-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all shadow-xs"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase">Марапаттау себебі / Мәтіні</label>
            <textarea
              value={data.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Осы біліктілік курсын сәтті аяқтағаны үшін..."
              rows={3}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Issue Date & Serial Number */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase flex items-center gap-1">
                <Calendar className="w-3 h-3 text-indigo-600" />
                <span>Берілген күні</span>
              </label>
              <input
                type="text"
                value={data.date}
                onChange={(e) => updateField('date', e.target.value)}
                placeholder="2026 жылғы 29 маусым"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase">Регистрациялық №</label>
              <input
                type="text"
                value={data.serialNumber}
                onChange={(e) => updateField('serialNumber', e.target.value)}
                placeholder="№ CRT-94021"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: SIGNATURES AND DECORATIVE DETAILS */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block border-b border-slate-100 pb-2">
            4. Қол қою және мөр баптауы
          </label>

          {/* Signature Name & Title */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase flex items-center gap-1">
                <PenTool className="w-3 h-3 text-indigo-600" />
                <span>Қол қоюшы Аты-жөні</span>
              </label>
              <input
                type="text"
                value={data.signatureName}
                onChange={(e) => updateField('signatureName', e.target.value)}
                placeholder="Мыс: А. Байтұрсынов"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase">Оның лауазымы</label>
              <input
                type="text"
                value={data.signatureTitle}
                onChange={(e) => updateField('signatureTitle', e.target.value)}
                placeholder="Мыс: Директор"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
          </div>

          {/* Seal and Ribbon Controls */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Ресми мөрді көрсету</span>
              <input
                type="checkbox"
                checked={data.showSeal}
                onChange={(e) => updateField('showSeal', e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 bg-white accent-indigo-600 cursor-pointer"
              />
            </div>

            {data.showSeal && (
              <>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase">Мөрдегі негізгі мәтін</label>
                  <input
                    type="text"
                    value={data.sealText}
                    onChange={(e) => updateField('sealText', e.target.value)}
                    placeholder="Мыс: РЕСМИ МӨР"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-[11px] text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-xs font-bold text-slate-700">Мөр астындағы таспа (лента)</span>
                  <input
                    type="checkbox"
                    checked={data.showRibbon}
                    onChange={(e) => updateField('showRibbon', e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 bg-white accent-indigo-600 cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="p-4 bg-slate-50 text-center text-[10px] text-slate-400 border-t border-slate-100 flex items-center justify-center gap-1.5 font-sans">
        <Globe className="w-3.5 h-3.5 text-slate-400" />
        <span>Vite-пен құрастырылған баспаға дайын А4 жүйесі</span>
      </div>
    </div>
  );
};
