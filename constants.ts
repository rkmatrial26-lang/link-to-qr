import type { QROptions, DotType, CornerSquareType, CornerDotType } from './types';

export const DEFAULT_URL = '';

export const DEFAULT_QR_CODE_OPTIONS: QROptions = {
  width: 300,
  height: 300,
  data: ' ', // Use a space to initialize QR code library without a visible code
  dotsOptions: {
    color: '#000000',
    type: 'square',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    type: 'square',
    color: '#000000',
  },
  cornersDotOptions: {
    type: 'square',
    color: '#000000',
  },
  imageOptions: {
    margin: 20,
  },
  qrOptions: {
    errorCorrectionLevel: 'M',
  },
};

export const DOT_STYLES: { value: DotType; label: string }[] = [
  { value: 'rounded', label: 'Round' },
  { value: 'dots', label: 'Dots' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Round' },
  { value: 'square', label: 'Square' },
  { value: 'extra-rounded', label: 'Extra Round' },
];

export const CORNER_SQUARE_STYLES: { value: CornerSquareType; label: string }[] = [
  { value: 'extra-rounded', label: 'Extra Round' },
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
];

export const CORNER_DOT_STYLES: { value: CornerDotType; label: string }[] = [
  { value: 'dot', label: 'Dot' },
  { value: 'square', label: 'Square' },
];

export const DOWNLOAD_SIZES = [
  { value: 512, label: '512x512' },
  { value: 1024, label: '1024x1024' },
  { value: 2048, label: '2048x2048' },
];