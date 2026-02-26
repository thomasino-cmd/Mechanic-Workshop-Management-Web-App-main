import { BlueprintShape } from '@/lib/types';
import { cn } from '@/lib/utils';

type Props = { shape: BlueprintShape; color?: string; className?: string };

const getPath = (shape: string) => {
  // Returns highly detailed technical paths
  switch (shape) {
    case 'compact':
      return 'M 10 60 L 15 50 Q 25 35 40 35 L 60 35 Q 85 35 95 45 L 110 45 L 115 65 Z M 40 35 L 35 50 M 65 35 L 70 50 M 90 42 L 85 50';
    case 'wagon':
      return 'M 5 60 L 10 40 Q 30 30 60 30 L 95 30 L 115 45 L 120 65 Z M 35 30 L 30 46 M 65 30 L 65 46 M 90 30 L 85 46';
    case 'suv':
      return 'M 10 60 L 15 35 Q 30 25 60 25 L 90 25 L 110 40 L 115 60 Z M 40 25 L 35 45 M 70 25 L 65 45 M 90 25 L 85 40';
    case 'van':
      return 'M 10 65 L 10 30 L 90 30 L 115 45 L 120 65 Z M 45 30 L 45 50 M 85 30 L 85 50';
    case 'sport':
      return 'M 15 65 L 25 50 Q 50 35 75 40 L 105 50 L 115 65 Z M 55 38 L 50 50 M 80 43 L 75 52';
    case 'sedan':
    default:
      return 'M 10 60 L 25 45 Q 40 30 65 30 L 85 30 Q 105 35 115 45 L 120 60 Z M 45 30 L 40 45 M 75 30 L 70 45';
  }
};

export function BlueprintCar({ shape, color = '#60a5fa', className }: Props) {
  // Use a technical, grid-like styling
  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-slate-900", className)}>
      {/* Engineering Grid Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '12px 12px'
      }}></div>

      <svg viewBox="0 0 128 88" className="h-28 w-full relative z-10 p-2">
        {/* Shadow/Base Line */}
        <line x1="5" y1="75" x2="123" y2="75" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Car Outline */}
        <path d={getPath(shape)} fill="rgba(255,255,255,0.03)" stroke={color} strokeWidth="2" strokeLinejoin="round" />

        {/* Wheels */}
        <circle cx="34" cy="65" r="10" fill="#0f172a" stroke={color} strokeWidth="1.5" />
        <circle cx="34" cy="65" r="3" fill={color} />

        <circle cx="94" cy="65" r="10" fill="#0f172a" stroke={color} strokeWidth="1.5" />
        <circle cx="94" cy="65" r="3" fill={color} />

        {/* Technical dimensions lines example */}
        <line x1="34" y1="82" x2="94" y2="82" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        <text x="64" y="80" fill="rgba(255,255,255,0.4)" fontSize="6" textAnchor="middle" fontFamily="monospace">WHEELBASE</text>
      </svg>
    </div>
  );
}
