import { cn } from '@/lib/utils';

type Props = {
  plate: string;
  className?: string;
};

export function LicensePlate({ plate, className }: Props) {
  return (
    <div className={cn('flex items-center overflow-hidden rounded-md border-2 border-slate-300 bg-white shadow-sm ring-1 ring-slate-900/5', className)}>
      {/* Left Blue Band */}
      <div className="flex w-6 flex-col items-center justify-between self-stretch bg-[#003399] py-1 text-white">
        <svg viewBox="0 0 120 120" className="w-4 opacity-90"><circle cx="60" cy="60" r="50" fill="none" stroke="#FFCC00" strokeWidth="8" strokeDasharray="10 16" /></svg>
        <span className="text-[10px] font-bold leading-none">I</span>
      </div>

      {/* Main Plate Text */}
      <span className="flex-1 px-3 text-center text-xl font-black tracking-[0.2em] text-slate-800 uppercase">
        {plate}
      </span>

      {/* Right Blue Band */}
      <div className="flex w-6 flex-col items-center justify-between self-stretch bg-[#003399] py-1 text-white">
        <div className="mt-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#FFCC00]/90 text-[5px] font-bold text-[#003399]">24</div>
        <span className="text-[7px] font-bold leading-none">MI</span>
      </div>
    </div>
  );
}
