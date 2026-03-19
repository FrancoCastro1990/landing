import { useState, useCallback, useEffect, useRef } from 'react';
import { useTransition, animated } from '@react-spring/web';

const STORAGE_KEY = 'portfolio-theme';

const CSS_VARS = [
  '--color-surface',
  '--color-surface-lowest',
  '--color-surface-low',
  '--color-surface-container',
  '--color-surface-high',
  '--color-surface-highest',
  '--color-surface-variant',
  '--color-surface-dim',
  '--color-surface-bright',
  '--color-primary',
  '--color-primary-dim',
  '--color-primary-container',
  '--color-on-surface',
  '--color-on-surface-variant',
  '--color-on-primary',
  '--color-outline',
  '--color-outline-variant',
] as const;

type ThemeVars = Record<string, string>;

interface Preset {
  id: string;
  name: string;
  colors: ThemeVars;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
}

function rgbTriplet(r: number, g: number, b: number): string {
  return `${r} ${g} ${b}`;
}

function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function clamp(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}

function deriveSurfacePalette(hex: string): Partial<ThemeVars> {
  const [r, g, b] = hexToRgb(hex);
  return {
    '--color-surface-lowest': rgbTriplet(r, g, b),
    '--color-surface': rgbTriplet(clamp(r + 14), clamp(g + 14), clamp(b + 14)),
    '--color-surface-dim': rgbTriplet(clamp(r + 14), clamp(g + 14), clamp(b + 14)),
    '--color-surface-low': rgbTriplet(clamp(r + 19), clamp(g + 19), clamp(b + 19)),
    '--color-surface-container': rgbTriplet(clamp(r + 26), clamp(g + 26), clamp(b + 26)),
    '--color-surface-high': rgbTriplet(clamp(r + 32), clamp(g + 32), clamp(b + 32)),
    '--color-surface-highest': rgbTriplet(clamp(r + 38), clamp(g + 38), clamp(b + 38)),
    '--color-surface-variant': rgbTriplet(clamp(r + 38), clamp(g + 38), clamp(b + 38)),
    '--color-surface-bright': rgbTriplet(clamp(r + 44), clamp(g + 44), clamp(b + 44)),
  };
}

function derivePrimaryPalette(hex: string): Partial<ThemeVars> {
  const [r, g, b] = hexToRgb(hex);
  const lum = luminance(r, g, b);
  const onPrimary = lum > 0.179 ? rgbTriplet(clamp(r * 0.35), clamp(g * 0.35), clamp(b * 0.35)) : '255 255 255';
  return {
    '--color-primary': rgbTriplet(r, g, b),
    '--color-primary-dim': rgbTriplet(clamp(r * 0.9), clamp(g * 0.9), clamp(b * 0.9)),
    '--color-primary-container': rgbTriplet(r, g, b),
    '--color-on-primary': onPrimary,
  };
}

function deriveTextPalette(hex: string): Partial<ThemeVars> {
  const [r, g, b] = hexToRgb(hex);
  return {
    '--color-on-surface': rgbTriplet(r, g, b),
    '--color-on-surface-variant': rgbTriplet(clamp(r * 0.65), clamp(g * 0.65), clamp(b * 0.65)),
    '--color-outline': rgbTriplet(clamp(r * 0.46), clamp(g * 0.46), clamp(b * 0.46)),
    '--color-outline-variant': rgbTriplet(clamp(r * 0.28), clamp(g * 0.28), clamp(b * 0.28)),
  };
}

const PRESETS: Preset[] = [
  {
    id: 'yellow-night',
    name: 'Noche Dorada',
    colors: {
      '--color-surface': '14 14 14',
      '--color-surface-lowest': '0 0 0',
      '--color-surface-low': '19 19 19',
      '--color-surface-container': '26 26 26',
      '--color-surface-high': '32 32 31',
      '--color-surface-highest': '38 38 38',
      '--color-surface-variant': '38 38 38',
      '--color-surface-dim': '14 14 14',
      '--color-surface-bright': '44 44 44',
      '--color-primary': '250 204 21',
      '--color-primary-dim': '238 194 0',
      '--color-primary-container': '251 205 22',
      '--color-on-surface': '255 255 255',
      '--color-on-surface-variant': '173 170 170',
      '--color-on-primary': '98 78 0',
      '--color-outline': '118 117 117',
      '--color-outline-variant': '72 72 71',
    },
  },
  {
    id: 'ocean-blue',
    name: 'Oceano Azul',
    colors: {
      '--color-surface': '24 24 32',
      '--color-surface-lowest': '10 10 18',
      '--color-surface-low': '29 29 37',
      '--color-surface-container': '36 36 44',
      '--color-surface-high': '42 42 50',
      '--color-surface-highest': '48 48 56',
      '--color-surface-variant': '48 48 56',
      '--color-surface-dim': '24 24 32',
      '--color-surface-bright': '54 54 62',
      '--color-primary': '96 165 250',
      '--color-primary-dim': '70 140 230',
      '--color-primary-container': '96 165 250',
      '--color-on-surface': '230 240 255',
      '--color-on-surface-variant': '150 160 180',
      '--color-on-primary': '20 40 80',
      '--color-outline': '100 110 130',
      '--color-outline-variant': '60 65 75',
    },
  },
  {
    id: 'emerald',
    name: 'Esmeralda',
    colors: {
      '--color-surface': '24 30 28',
      '--color-surface-lowest': '10 16 14',
      '--color-surface-low': '29 35 33',
      '--color-surface-container': '36 42 40',
      '--color-surface-high': '42 48 46',
      '--color-surface-highest': '48 54 52',
      '--color-surface-variant': '48 54 52',
      '--color-surface-dim': '24 30 28',
      '--color-surface-bright': '54 60 58',
      '--color-primary': '52 211 153',
      '--color-primary-dim': '40 190 135',
      '--color-primary-container': '52 211 153',
      '--color-on-surface': '230 255 245',
      '--color-on-surface-variant': '150 180 170',
      '--color-on-primary': '15 65 48',
      '--color-outline': '100 120 115',
      '--color-outline-variant': '60 72 68',
    },
  },
  {
    id: 'rose',
    name: 'Rosa',
    colors: {
      '--color-surface': '30 24 26',
      '--color-surface-lowest': '16 10 12',
      '--color-surface-low': '35 29 31',
      '--color-surface-container': '42 36 38',
      '--color-surface-high': '48 42 44',
      '--color-surface-highest': '54 48 50',
      '--color-surface-variant': '54 48 50',
      '--color-surface-dim': '30 24 26',
      '--color-surface-bright': '60 54 56',
      '--color-primary': '251 113 133',
      '--color-primary-dim': '230 90 110',
      '--color-primary-container': '251 113 133',
      '--color-on-surface': '255 235 240',
      '--color-on-surface-variant': '180 155 160',
      '--color-on-primary': '80 20 30',
      '--color-outline': '130 110 115',
      '--color-outline-variant': '75 65 68',
    },
  },
  {
    id: 'mono',
    name: 'Monocromo',
    colors: {
      '--color-surface': '24 24 24',
      '--color-surface-lowest': '10 10 10',
      '--color-surface-low': '29 29 29',
      '--color-surface-container': '36 36 36',
      '--color-surface-high': '42 42 42',
      '--color-surface-highest': '48 48 48',
      '--color-surface-variant': '48 48 48',
      '--color-surface-dim': '24 24 24',
      '--color-surface-bright': '54 54 54',
      '--color-primary': '212 212 212',
      '--color-primary-dim': '180 180 180',
      '--color-primary-container': '212 212 212',
      '--color-on-surface': '240 240 240',
      '--color-on-surface-variant': '160 160 160',
      '--color-on-primary': '30 30 30',
      '--color-outline': '110 110 110',
      '--color-outline-variant': '65 65 65',
    },
  },
];

function tripletToHex(triplet: string): string {
  const [r, g, b] = triplet.split(' ').map(Number);
  return rgbToHex(r, g, b);
}

function applyTheme(colors: ThemeVars) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(colors)) {
    root.style.setProperty(key, value);
  }
}

function getCurrentColors(): ThemeVars {
  const root = document.documentElement;
  const colors: ThemeVars = {};
  for (const v of CSS_VARS) {
    const val = root.style.getPropertyValue(v).trim();
    if (val) colors[v] = val;
  }
  return colors;
}

function resetTheme() {
  const root = document.documentElement;
  for (const v of CSS_VARS) {
    root.style.removeProperty(v);
  }
  localStorage.removeItem(STORAGE_KEY);
}

const ThemeCustomizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>('yellow-night');
  const panelRef = useRef<HTMLDivElement>(null);

  const [accentHex, setAccentHex] = useState('#FACC15');
  const [surfaceHex, setSurfaceHex] = useState('#000000');
  const [textHex, setTextHex] = useState('#ffffff');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const vars = JSON.parse(saved) as ThemeVars;
        const match = PRESETS.find(
          (p) => p.colors['--color-primary'] === vars['--color-primary'] && p.colors['--color-surface-lowest'] === vars['--color-surface-lowest']
        );
        setActivePreset(match ? match.id : null);
        if (vars['--color-primary']) setAccentHex(tripletToHex(vars['--color-primary']));
        if (vars['--color-surface-lowest']) setSurfaceHex(tripletToHex(vars['--color-surface-lowest']));
        if (vars['--color-on-surface']) setTextHex(tripletToHex(vars['--color-on-surface']));
      }
    } catch {}
  }, []);

  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: 'scale(0.95) translateY(10px)' },
    enter: { opacity: 1, transform: 'scale(1) translateY(0px)' },
    leave: { opacity: 0, transform: 'scale(0.95) translateY(10px)' },
    config: { tension: 300, friction: 26 },
  });

  const backdropTransitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 300, friction: 26 },
  });

  const applyAndSave = useCallback((colors: ThemeVars) => {
    applyTheme(colors);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
  }, []);

  const handlePreset = useCallback(
    (preset: Preset) => {
      setActivePreset(preset.id);
      applyAndSave(preset.colors);
      setAccentHex(tripletToHex(preset.colors['--color-primary']));
      setSurfaceHex(tripletToHex(preset.colors['--color-surface-lowest']));
      setTextHex(tripletToHex(preset.colors['--color-on-surface']));
    },
    [applyAndSave]
  );

  const handleCustomColor = useCallback(
    (type: 'accent' | 'surface' | 'text', hex: string) => {
      setActivePreset(null);
      let derived: Partial<ThemeVars> = {};
      if (type === 'accent') {
        setAccentHex(hex);
        derived = derivePrimaryPalette(hex);
      } else if (type === 'surface') {
        setSurfaceHex(hex);
        derived = deriveSurfacePalette(hex);
      } else {
        setTextHex(hex);
        derived = deriveTextPalette(hex);
      }
      const current = getCurrentColors();
      const merged = { ...PRESETS[0].colors, ...current, ...derived };
      applyAndSave(merged);
    },
    [applyAndSave]
  );

  const handleReset = useCallback(() => {
    resetTheme();
    setActivePreset('yellow-night');
    setAccentHex('#FACC15');
    setSurfaceHex('#000000');
    setTextHex('#ffffff');
  }, []);

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 border border-primary/30 hover:border-primary bg-surface-container/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-105 group"
        aria-label="Personalizar tema"
      >
        <span
          className="w-5 h-5 rounded-full transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `rgb(${accentHex ? hexToRgb(accentHex).join(', ') : '250, 204, 21'})` }}
        />
      </button>

      {/* Modal */}
      {backdropTransitions((styles, show) =>
        show ? (
          <animated.div
            style={styles}
            className="fixed inset-0 z-50 bg-surface-lowest/80 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          />
        ) : null
      )}

      {transitions((styles, show) =>
        show ? (
          <animated.div
            style={styles}
            className="fixed z-50 inset-0 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              ref={panelRef}
              className="bg-surface-container/90 backdrop-blur-2xl border border-on-surface/5 w-full max-w-md pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-on-surface/5">
                <span className="font-label uppercase tracking-[0.3rem] text-xs text-on-surface-variant">
                  Personalizar
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-on-surface-variant hover:text-on-surface transition-colors duration-300"
                  aria-label="Cerrar"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Presets */}
              <div className="px-6 py-5">
                <p className="font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant mb-4">
                  Temas
                </p>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handlePreset(preset)}
                      className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 border transition-all duration-300 ${
                        activePreset === preset.id
                          ? 'border-primary'
                          : 'border-on-surface/5 hover:border-on-surface/20'
                      }`}
                    >
                      <div className="flex gap-1.5">
                        <span
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: `rgb(${preset.colors['--color-surface-lowest'].replace(/ /g, ', ')})`, border: '1px solid rgba(255,255,255,0.1)' }}
                        />
                        <span
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: `rgb(${preset.colors['--color-primary'].replace(/ /g, ', ')})` }}
                        />
                        <span
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: `rgb(${preset.colors['--color-on-surface'].replace(/ /g, ', ')})` }}
                        />
                      </div>
                      <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant whitespace-nowrap">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-on-surface/5" />

              {/* Custom Pickers */}
              <div className="px-6 py-5">
                <p className="font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant mb-4">
                  Personalizado
                </p>
                <div className="flex gap-6">
                  <ColorPicker label="Acento" value={accentHex} onChange={(hex) => handleCustomColor('accent', hex)} />
                  <ColorPicker label="Fondo" value={surfaceHex} onChange={(hex) => handleCustomColor('surface', hex)} />
                  <ColorPicker label="Texto" value={textHex} onChange={(hex) => handleCustomColor('text', hex)} />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-on-surface/5">
                <button
                  onClick={handleReset}
                  className="font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant hover:text-primary transition-colors duration-300"
                >
                  Restablecer
                </button>
              </div>
            </div>
          </animated.div>
        ) : null
      )}
    </>
  );
};

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (hex: string) => void }) {
  return (
    <label className="flex flex-col items-center gap-2 cursor-pointer">
      <div className="relative w-10 h-10 overflow-hidden border border-on-surface/10 hover:border-on-surface/30 transition-colors duration-300">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-[200%] h-[200%] -top-1/2 -left-1/2 cursor-pointer border-none"
        />
      </div>
      <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">{label}</span>
    </label>
  );
}

export default ThemeCustomizer;
