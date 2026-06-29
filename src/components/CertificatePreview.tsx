/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { CertificateData } from '../types';
import { CertificateTemplate } from './Templates';
import { Download, ZoomIn, ZoomOut, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface PreviewProps {
  data: CertificateData;
}

export const CertificatePreview: React.FC<PreviewProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const templateWrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.6);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const isLandscape = data.orientation === 'landscape';
  const certWidth = isLandscape ? 1123 : 794;
  const certHeight = isLandscape ? 794 : 1123;

  // Auto-fit scale calculations based on parent container width
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 48; // padding
        const containerHeight = containerRef.current.clientHeight - 48;
        
        const widthScale = containerWidth / certWidth;
        const heightScale = containerHeight / certHeight;
        
        // Pick the safe minimum scale to fit both width and height inside preview panel
        const optimalScale = Math.min(widthScale, heightScale, 0.95);
        setScale(Math.max(0.3, optimalScale));
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [certWidth, certHeight, data.orientation]);

  // Handle PDF Export
  const handleDownloadPDF = async () => {
    const printArea = document.getElementById('certificate-print-area');
    if (!printArea) return;

    try {
      setIsGenerating(true);
      setDownloadSuccess(false);

      // Wait a short delay to ensure DOM updates and images are ready
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Capture canvas at high scale for pristine vector-like print results
      const canvas = await html2canvas(printArea, {
        scale: 3.0, // High-DPI upscale (approx 300 DPI equivalent)
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Initialize jsPDF matching exactly standard A4 dimensions in pixels
      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'px',
        format: isLandscape ? [1123, 794] : [794, 1123],
        compress: true,
      });

      pdf.addImage(imgData, 'PNG', 0, 0, certWidth, certHeight, undefined, 'FAST');
      
      // Filename clean up
      const sanitizedName = (data.recipient || 'Sertifikat').trim().replace(/\s+/g, '_');
      const filename = `${sanitizedName}_${data.type}.pdf`;
      
      pdf.save(filename);

      setIsGenerating(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('PDF export error:', err);
      setIsGenerating(false);
      alert('Экспорт кезінде қате кетті. Тағы да байқап көріңіз.');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      {/* Workspace Controls Header */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
          <h3 className="text-sm font-semibold tracking-wide text-slate-800">
            Дайын құжатты алдын ала қарау (А4 форматы)
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Zoom Buttons */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 text-xs text-slate-500 shadow-2xs">
            <button
              onClick={() => setScale(Math.max(0.3, scale - 0.05))}
              className="p-1.5 hover:bg-slate-50 hover:text-slate-800 rounded transition-colors cursor-pointer"
              title="Кішірейту"
              id="zoom-out-btn"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono min-w-12 text-center select-none font-semibold">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale(Math.min(1.2, scale + 0.05))}
              className="p-1.5 hover:bg-slate-50 hover:text-slate-800 rounded transition-colors cursor-pointer"
              title="Үлкейту"
              id="zoom-in-btn"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            id="download-pdf-btn"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 shadow-sm cursor-pointer ${
              downloadSuccess
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>PDF файл дайындалуда...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 animate-bounce text-white" />
                <span>Жүктелді! Рақмет!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-white stroke-[2.5]" />
                <span>А4 PDF жүктеу</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Infinite Canvas Workspace with dotted grid */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-8 flex items-center justify-center relative bg-slate-100 select-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(79, 70, 229, 0.06) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Shadow-boxed Scale Wrapper */}
        <div 
          ref={templateWrapperRef}
          className="transition-transform duration-200 ease-out origin-center flex items-center justify-center shadow-[0_20px_50px_rgba(15,23,42,0.12)] rounded-lg"
          style={{
            transform: `scale(${scale})`,
            width: `${certWidth}px`,
            height: `${certHeight}px`,
          }}
        >
          <CertificateTemplate data={data} />
        </div>

        {/* Helper Watermark overlay in workspace */}
        <div className="absolute bottom-4 left-4 text-[10px] text-slate-400 font-mono pointer-events-none uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
          <span>Сыртқы өлшемі: {certWidth}x{certHeight}px (А4) • Масштабы: {Math.round(scale * 100)}%</span>
        </div>
      </div>
    </div>
  );
};
