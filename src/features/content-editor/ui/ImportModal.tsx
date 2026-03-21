import { useState, useRef, useCallback, type DragEvent } from 'react';
import EditorModal from './EditorModal';
import Button from '@shared/ui/Button';
import { importPortfolioData, type ImportResult } from '../lib/import';
import type { SectionKey } from '../lib/storage';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalState = 'input' | 'error' | 'success';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

const SECTION_LABELS: Record<SectionKey, string> = {
  hero: 'Hero',
  about: 'Acerca de',
  experience: 'Experiencia',
  projects: 'Proyectos',
  contact: 'Contacto',
};

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose }) => {
  const [jsonText, setJsonText] = useState('');
  const [state, setState] = useState<ModalState>('input');
  const [result, setResult] = useState<ImportResult | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setJsonText('');
    setState('input');
    setResult(null);
    setFileError(null);
    setIsDragOver(false);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const handleImport = useCallback(() => {
    const importResult = importPortfolioData(jsonText);
    setResult(importResult);
    setState(importResult.errors ? 'error' : 'success');
  }, [jsonText]);

  const handleFileRead = useCallback((file: File) => {
    setFileError(null);
    if (file.size > MAX_FILE_SIZE) {
      setFileError('El archivo excede 1MB');
      return;
    }
    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      setFileError('Solo se aceptan archivos .json');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setJsonText(text);
      }
    };
    reader.onerror = () => {
      setFileError('Error al leer el archivo');
    };
    reader.readAsText(file, 'UTF-8');
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileRead(file);
    },
    [handleFileRead]
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileRead(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [handleFileRead]
  );

  const handleDropZoneClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDropZoneKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }, []);

  const footer = (
    <div className="flex items-center justify-between">
      {state === 'success' ? (
        <>
          <span />
          <Button variant="primary" size="sm" onClick={handleClose}>
            Cerrar
          </Button>
        </>
      ) : (
        <>
          <button
            onClick={handleClose}
            className="font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Cancelar
          </button>
          <Button variant="primary" size="sm" onClick={handleImport} disabled={!jsonText.trim()}>
            Importar
          </Button>
        </>
      )}
    </div>
  );

  return (
    <EditorModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Importar datos"
      ariaLabel="Importar datos del portafolio"
      footer={footer}
    >
      {state === 'success' && result ? (
        <div className="space-y-4">
          {result.imported.length > 0 && (
            <div>
              <p className="font-label uppercase tracking-widest text-[10px] text-on-surface-variant mb-2">
                Secciones importadas
              </p>
              <ul className="space-y-1">
                {result.imported.map((key) => (
                  <li key={key} className="text-primary text-sm">
                    {SECTION_LABELS[key]}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.ignored.length > 0 && (
            <div>
              <p className="font-label uppercase tracking-widest text-[10px] text-on-surface-variant mb-2">
                Secciones ignoradas
              </p>
              <ul className="space-y-1">
                {result.ignored.map((key) => (
                  <li key={key} className="text-on-surface-variant text-sm">
                    {key}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              if (state === 'error') setState('input');
            }}
            placeholder="Pega tu JSON aqui..."
            aria-label="JSON de datos del portafolio"
            className="w-full h-64 overflow-y-auto resize-none bg-surface-lowest text-on-surface font-mono text-sm p-4 border border-on-surface/10 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-on-surface-variant/50"
          />

          <div
            role="button"
            tabIndex={0}
            onClick={handleDropZoneClick}
            onKeyDown={handleDropZoneKeyDown}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`p-6 border-2 border-dashed text-center cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
              isDragOver
                ? 'border-primary text-primary'
                : 'border-outline/30 text-on-surface-variant'
            }`}
            aria-label="Subir archivo JSON"
          >
            <p className="font-label uppercase tracking-widest text-[10px]">
              o arrastra un archivo .json
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileInputChange}
              className="hidden"
              tabIndex={-1}
            />
          </div>

          {fileError && (
            <p role="alert" className="text-red-400 text-sm">
              {fileError}
            </p>
          )}

          {state === 'error' && result?.errors && (
            <div role="alert" className="space-y-1">
              <p className="font-label uppercase tracking-widest text-[10px] text-red-400 mb-2">
                Errores de validacion
              </p>
              {result.errors.map((err, i) => (
                <p key={i} className="text-red-400 text-sm font-mono">
                  {err.path ? `${err.path}: ` : ''}
                  {err.message}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </EditorModal>
  );
};

export default ImportModal;
