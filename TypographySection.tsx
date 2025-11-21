import React from 'react';
import { FontStyle, TypographyContent, LayoutType, PaletteData, GradientDirection } from '../types';
import { isLight } from '../utils/colorUtils';

interface TypographySectionProps {
  content: TypographyContent;
  onContentChange: (field: keyof TypographyContent, value: string) => void;
  currentStyle: FontStyle;
  onStyleChange: (style: FontStyle) => void;
  layout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  styles: FontStyle[];
  palette: PaletteData;
  direction: GradientDirection;
}

const TypographySection: React.FC<TypographySectionProps> = ({
  content,
  onContentChange,
  currentStyle,
  onStyleChange,
  layout,
  onLayoutChange,
  styles,
  palette,
  direction
}) => {
  
  // Helper to format text for script fonts if needed
  const formatText = (text: string, isScript: boolean) => {
    if (isScript) {
      return text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
    return text;
  };

  // Dynamic Logic for Preview
  const primary = palette.spot[0];
  const accent = palette.spot[3];
  const midColor = palette.generic[2];
  const lightBg = isLight(midColor);

  let containerClass = "relative z-10 w-full max-w-2xl transition-all duration-500 flex flex-col h-full justify-center";
  let pHeadClass = `mb-4 transition-all duration-300 drop-shadow-sm ${currentStyle.fontHead}`;
  let pSubClass = `mb-4 transition-all duration-300 text-sm font-bold ${currentStyle.fontSub} ${currentStyle.subCase}`;
  let pBodyClass = `text-base md:text-lg leading-relaxed max-w-lg mx-auto transition-all duration-300 ${currentStyle.fontBody}`;
  
  // Layout Specifics
  if (layout === 'center') {
    containerClass += " text-center items-center";
  } else if (layout === 'left') {
    containerClass += " text-left items-start";
  } else if (layout === 'poster') {
    containerClass += " text-center items-center";
  }

  // Style Specifics
  if (currentStyle.id === 'poster') {
    // Fixed: reduced size slightly and added tight leading to prevent layout breaking
    pHeadClass += " text-7xl md:text-8xl font-black uppercase tracking-tighter text-shadow-lg leading-[0.85]";
  } else if (currentStyle.id === 'thanhxuan') {
    pHeadClass += " text-6xl md:text-8xl font-normal text-shadow-sm leading-tight";
  } else {
    pHeadClass += " text-5xl md:text-7xl font-bold text-shadow-sm leading-tight";
    if (currentStyle.headCase === 'uppercase') pHeadClass += " uppercase";
  }

  // Colors & Backgrounds
  let previewBgStyle: React.CSSProperties = {};
  let headColor, subColor, bodyColor, blobOpacity;

  if (layout === 'poster') {
    const overlayColor = lightBg ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)';
    previewBgStyle = {
      background: `linear-gradient(${direction}, ${overlayColor}, ${overlayColor}), linear-gradient(${direction}, ${palette.generic.join(', ')})`
    };
    headColor = lightBg ? '#0f172a' : '#ffffff';
    subColor = lightBg ? primary : '#fbbf24';
    bodyColor = lightBg ? '#334155' : 'rgba(255,255,255,0.9)';
    blobOpacity = 0.1;
  } else {
    previewBgStyle = { background: '#ffffff' };
    headColor = primary;
    subColor = accent;
    bodyColor = "#334155";
    blobOpacity = 0.4;
  }

  return (
    <section className="border-t-2 border-slate-200/60 pt-24 mt-24">
      <div className="mb-16 text-center">
        <span className="text-xs font-black tracking-[0.3em] text-indigo-500 uppercase mb-4 block opacity-80">Text Studio</span>
        <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight tracking-tight">Socolor Designer</h3>
        <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">Thẩm mỹ không nên là rào cản của sáng tạo nội dung.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* CONTROLS */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-sm border border-white">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">1. Content</label>
            <div className="space-y-3">
              <textarea 
                value={content.heading} onChange={(e) => onContentChange('heading', e.target.value)}
                rows={2} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all focus:bg-white"
              />
              <input 
                value={content.sub} onChange={(e) => onContentChange('sub', e.target.value)}
                type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all focus:bg-white"
              />
              <textarea 
                value={content.body} onChange={(e) => onContentChange('body', e.target.value)}
                rows={3} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all focus:bg-white"
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-sm border border-white">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">2. Font Style</label>
            <div className="grid grid-cols-2 gap-3">
              {styles.map(s => (
                <button 
                  key={s.id}
                  onClick={() => onStyleChange(s)}
                  className={`p-3 rounded-xl bg-slate-50 text-left w-full transition-all border-2 ${currentStyle.id === s.id ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-transparent hover:bg-white hover:shadow'}`}
                >
                  <span className={`block text-sm text-slate-800 ${s.fontHead}`}>{s.name}</span>
                  <span className="block text-[10px] text-slate-400 mt-1 leading-tight">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-sm border border-white">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">3. Layout</label>
            <div className="flex gap-2">
              {(['center', 'left', 'poster'] as LayoutType[]).map(l => (
                <button 
                  key={l}
                  onClick={() => onLayoutChange(l)}
                  className={`flex-1 py-3 rounded-xl border transition-all text-xs font-bold capitalize ${layout === l ? 'bg-white border-transparent shadow-sm text-indigo-600' : 'border-slate-200 text-slate-500 hover:bg-white'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="lg:col-span-8 sticky top-10">
          <div className="w-full aspect-[4/5] md:aspect-video rounded-[2.5rem] shadow-2xl border-4 border-white ring-1 ring-slate-200 relative overflow-hidden transition-all duration-500 flex flex-col justify-center items-center p-10 md:p-16 bg-white group">
            
            <div className="absolute inset-0 z-0 transition-colors duration-500" style={previewBgStyle} />
            
            {/* Deco Blobs inside Preview */}
            <div 
              className="absolute -top-20 -right-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-700 z-0"
              style={{ backgroundColor: palette.generic[2], opacity: blobOpacity }}
            />
             <div 
              className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-700 z-0"
              style={{ backgroundColor: palette.matching[2], opacity: blobOpacity }}
            />

            <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="glass px-4 py-2 rounded-lg text-[10px] text-slate-500 shadow-sm backdrop-blur-md bg-white/80">
                    <p>Head: <span className="font-bold text-slate-800">{currentStyle.nameHead}</span></p>
                    <p>Sub: <span className="font-bold text-slate-800">{currentStyle.nameSub}</span></p>
                </div>
            </div>

            <div className={containerClass}>
              {layout === 'center' && (
                <>
                   <h3 className={pSubClass} style={{ color: subColor }}>{content.sub}</h3>
                   <h1 className={pHeadClass} style={{ color: headColor }}>{formatText(content.heading, currentStyle.isScript)}</h1>
                   <div className="w-16 h-1 rounded-full mx-auto mb-6 transition-all" style={{ backgroundColor: subColor }} />
                   <p className={pBodyClass} style={{ color: bodyColor }}>{content.body}</p>
                </>
              )}
               {layout === 'left' && (
                <>
                   <div className="w-10 h-1 rounded-full mb-6 transition-all" style={{ backgroundColor: subColor }} />
                   <h1 className={pHeadClass} style={{ color: headColor }}>{formatText(content.heading, currentStyle.isScript)}</h1>
                   <h3 className={pSubClass} style={{ color: subColor }}>{content.sub}</h3>
                   <p className={pBodyClass} style={{ color: bodyColor }}>{content.body}</p>
                </>
              )}
               {layout === 'poster' && (
                <>
                   <h3 className={pSubClass} style={{ color: subColor }}>{content.sub}</h3>
                   <h1 className={pHeadClass} style={{ color: headColor }}>{formatText(content.heading, currentStyle.isScript)}</h1>
                   <p className={pBodyClass} style={{ color: bodyColor }}>{content.body}</p>
                </>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default TypographySection;