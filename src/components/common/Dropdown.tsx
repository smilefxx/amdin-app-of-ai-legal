import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface DropdownProps {
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  leftIcon?: ReactNode;
}

export default function Dropdown({ value, options, onChange, placeholder = "请选择", className = "", buttonClassName = "h-11 px-4 bg-slate-50/50 hover:bg-slate-100 border border-slate-100", leftIcon }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div 
        className={`w-full rounded-xl transition-colors focus-within:bg-white focus-within:border-brand-primary flex items-center justify-between cursor-pointer font-medium text-sm ${buttonClassName} ${leftIcon ? 'pl-11' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}
        <span className={selectedOption ? "text-slate-900 truncate flex-1" : "text-slate-400 truncate flex-1"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            className={`text-slate-400 transition-transform duration-300 shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`}
        >
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 py-2 overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${value === option.value ? 'bg-blue-50/50 text-brand-primary font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  <span className="text-sm truncate pr-4">{option.label}</span>
                  {value === option.value && <CheckCircle2 size={16} className="text-brand-primary shrink-0" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
