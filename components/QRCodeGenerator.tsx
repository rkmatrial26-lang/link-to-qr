import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  DEFAULT_URL,
  DEFAULT_QR_CODE_OPTIONS,
  DOT_STYLES,
  CORNER_SQUARE_STYLES,
  CORNER_DOT_STYLES,
  DOWNLOAD_SIZES,
} from '../constants';
import type { QROptions, DotType, CornerSquareType, CornerDotType } from '../types';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { DownloadIcon } from './icons/DownloadIcon';

// Helper component for a styled input field
const OptionInput: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex items-center justify-between">
    <label className="text-sm font-medium text-slate-400">{label}</label>
    {children}
  </div>
);

// Helper component for a dropdown selector
interface OptionSelectorProps<T> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

const OptionSelector = <T extends string,>({ options, value, onChange }: OptionSelectorProps<T>) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="appearance-none w-full bg-slate-700 border border-slate-600 text-slate-300 text-sm rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
      <ChevronDownIcon className="w-4 h-4" />
    </div>
  </div>
);

const QR_PREVIEW_SIZE = 268;

const validateUrl = (value: string): boolean => {
    if (!value) {
        return true; // Empty string is not considered an invalid state for the UI
    }
    try {
        new URL(value);
        return true;
    } catch {
        // For user-friendliness, try prepending a protocol if missing
        if (!value.startsWith('http://') && !value.startsWith('https://')) {
            try {
                new URL(`https://${value}`);
                return true;
            } catch {
                return false;
            }
        }
        return false;
    }
};


export const QRCodeGenerator: React.FC = () => {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [options, setOptions] = useState<QROptions>({
    ...DEFAULT_QR_CODE_OPTIONS,
    width: QR_PREVIEW_SIZE,
    height: QR_PREVIEW_SIZE,
  });
  const [downloadSize, setDownloadSize] = useState(DOWNLOAD_SIZES[0].value);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<any>(null);

  // Initialize the QR code instance on component mount
  useEffect(() => {
    if (qrCodeRef.current) {
      qrCodeInstance.current = new QRCodeStyling({
        ...options,
      });
      qrCodeInstance.current.append(qrCodeRef.current);
    }
  }, []);
  
  // Update the QR code whenever the options state changes
  useEffect(() => {
    if (qrCodeInstance.current) {
      // The library requires a non-empty data string. Use a space for empty URLs.
      const data = (options.data && options.data.trim() !== '') ? options.data : ' ';
      qrCodeInstance.current.update({ ...options, data });
    }
  }, [options]);

  const updateOption = <K extends keyof QROptions>(key: K, value: QROptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    const isValid = validateUrl(newUrl);
    setIsUrlValid(isValid);
    // Only update the QR code data if the URL is valid and not empty
    updateOption('data', isValid && newUrl ? newUrl : ' ');
  };
  
  const handleColorChange = (part: 'dots' | 'background' | 'cornersSquare' | 'cornersDot', color: string) => {
    const keyMap = {
      dots: 'dotsOptions',
      background: 'backgroundOptions',
      cornersSquare: 'cornersSquareOptions',
      cornersDot: 'cornersDotOptions',
    };
    const optionKey = keyMap[part];
    setOptions(prev => ({
      ...prev,
      [optionKey]: { ...prev[optionKey], color: color }
    }));
  };

  const handleStyleChange = (part: 'dots' | 'cornersSquare' | 'cornersDot', type: string) => {
     const keyMap = {
      dots: 'dotsOptions',
      cornersSquare: 'cornersSquareOptions',
      cornersDot: 'cornersDotOptions',
    };
    const optionKey = keyMap[part];
    setOptions(prev => ({
        ...prev,
        [optionKey]: { ...prev[optionKey], type: type }
    }));
  };
  
  const onDownloadClick = useCallback(() => {
    if (!qrCodeInstance.current || !url || !isUrlValid) return;
    qrCodeInstance.current.update({ width: downloadSize, height: downloadSize });
    qrCodeInstance.current.download({ name: 'qr-code', extension: 'jpeg' });
    // Reset to preview size
    qrCodeInstance.current.update({ width: options.width, height: options.height });
  }, [downloadSize, options.width, options.height, url, isUrlValid]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      {/* Left Panel: Customization */}
      <div className="lg:col-span-1 bg-slate-800 p-6 rounded-2xl shadow-lg space-y-6 self-start">
        <h2 className="text-xl font-bold text-slate-200">Customize Your Code</h2>
        
        {/* URL Input */}
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-slate-400 mb-1">Your URL</label>
          <div className="relative">
            <input
              type="url"
              id="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://example.com"
              aria-invalid={!isUrlValid}
              aria-describedby="url-error"
              className={`w-full bg-slate-700 text-slate-200 placeholder-slate-500 pl-3 pr-10 py-2.5 text-base border rounded-lg focus:ring-2 ${
                !isUrlValid
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-slate-600 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
            <button className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-full text-indigo-400 hover:text-indigo-300">
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
          {!isUrlValid && (
            <p id="url-error" className="mt-2 text-sm text-red-500">
              Please enter a valid URL.
            </p>
          )}
        </div>

        {/* Customization Sections */}
        <div className="space-y-4">
          <h3 className="text-md font-semibold text-slate-300 border-b border-slate-700 pb-2">Styling</h3>
          <OptionInput label="Dots Color">
            <input type="color" value={options.dotsOptions.color} onChange={(e) => handleColorChange('dots', e.target.value)} className="w-8 h-8 rounded-md border-none cursor-pointer bg-transparent" />
          </OptionInput>
          <OptionInput label="Background Color">
            <input type="color" value={options.backgroundOptions.color} onChange={(e) => handleColorChange('background', e.target.value)} className="w-8 h-8 rounded-md border-none cursor-pointer bg-transparent" />
          </OptionInput>
          <OptionInput label="Dot Style">
             <OptionSelector options={DOT_STYLES} value={options.dotsOptions.type} onChange={(v) => handleStyleChange('dots', v as DotType)} />
          </OptionInput>
          <OptionInput label="Corner Square Style">
             <OptionSelector options={CORNER_SQUARE_STYLES} value={options.cornersSquareOptions.type} onChange={(v) => handleStyleChange('cornersSquare', v as CornerSquareType)} />
          </OptionInput>
           <OptionInput label="Corner Dot Style">
             <OptionSelector options={CORNER_DOT_STYLES} value={options.cornersDotOptions.type} onChange={(v) => handleStyleChange('cornersDot', v as CornerDotType)} />
          </OptionInput>
        </div>
      </div>

      {/* Right Panel: Preview and Download */}
      <div className="lg:col-span-2 flex flex-col items-center justify-center bg-slate-800 p-8 rounded-2xl shadow-lg">
          <div
            className="relative w-[300px] h-[300px] rounded-2xl overflow-hidden p-4 border border-slate-700 flex items-center justify-center transition-colors"
            style={{ background: options.backgroundOptions.color }}
          >
            <div ref={qrCodeRef} />

            {(!url || !isUrlValid) && (
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-400 p-4 transition-colors"
                style={{ background: options.backgroundOptions.color }}
              >
                  <p className="font-semibold">{!isUrlValid ? "Invalid URL" : "Enter a URL"}</p>
                  <p className="text-sm">{!isUrlValid ? "Please check the format and try again." : "Your QR code will appear here."}</p>
              </div>
            )}
          </div>

          <div className="mt-8 w-full max-w-sm flex items-stretch gap-3">
              <div className="flex-1 relative">
                <select 
                    value={downloadSize} 
                    onChange={e => setDownloadSize(Number(e.target.value))}
                    className="w-full h-full appearance-none bg-slate-700 border border-slate-600 text-slate-300 text-sm rounded-lg py-3 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {DOWNLOAD_SIZES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <ChevronDownIcon className="w-5 h-5" />
                </div>
              </div>
              <button
                onClick={onDownloadClick}
                disabled={!url || !isUrlValid}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 disabled:bg-slate-600 disabled:scale-100 disabled:cursor-not-allowed"
              >
                  <DownloadIcon className="w-5 h-5"/>
                  Download
              </button>
          </div>
      </div>
    </div>
  );
};