import type QRCodeStyling from 'qr-code-styling';

// Since we load the library from a CDN, we declare it globally.
declare global {
  const QRCodeStyling: any;
}

export type DotType = 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
export type CornerSquareType = 'dot' | 'square' | 'extra-rounded';
export type CornerDotType = 'dot' | 'square';

export interface QROptions {
  width: number;
  height: number;
  data: string;
  dotsOptions: {
    color: string;
    type: DotType;
  };
  backgroundOptions: {
    color: string;
  };
  cornersSquareOptions: {
    type: CornerSquareType;
    color: string;
  };
  cornersDotOptions: {
    type: CornerDotType;
    color: string;
  };
  imageOptions?: {
    margin?: number;
  };
  qrOptions?: {
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  };
}