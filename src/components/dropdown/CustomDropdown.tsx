import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';

export interface DropdownOption {
  value: string | number;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export type DropdownItem = string | DropdownOption;

export interface CustomDropdownProps {
  options: DropdownItem[];
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  searchable?: boolean;
  accentColor?: 'blue' | 'rose' | 'amber' | 'emerald';
  icon?: React.ReactNode;
  id?: string;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = '-- Pilih Opsi --',
  label,
  required = false,
  disabled = false,
  className = '',
  triggerClassName = '',
  menuClassName = '',
  searchable = false,
  accentColor = 'blue',
  icon,
  id,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Normalize options to object form
  const normalizedOptions: DropdownOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  // Find currently selected option
  const selectedOption = normalizedOptions.find((opt) => String(opt.value) === String(value));

  // Color schemes for accent
  const colorMap = {
    blue: {
      ringFocus: 'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
      activeBorder: 'border-blue-500 ring-2 ring-blue-500/20',
      selectedItem: 'bg-blue-50 text-blue-700 font-bold',
      checkIcon: 'text-blue-600',
    },
    rose: {
      ringFocus: 'focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20',
      activeBorder: 'border-rose-500 ring-2 ring-rose-500/20',
      selectedItem: 'bg-rose-50 text-rose-700 font-bold',
      checkIcon: 'text-rose-600',
    },
    amber: {
      ringFocus: 'focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/20',
      selectedItem: 'bg-amber-50 text-amber-800 font-bold',
      checkIcon: 'text-amber-600',
    },
    emerald: {
      ringFocus: 'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20',
      selectedItem: 'bg-emerald-50 text-emerald-700 font-bold',
      checkIcon: 'text-emerald-600',
    },
  };

  const colors = colorMap[accentColor] || colorMap.blue;

  // Handle outside click to close
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, searchable]);

  // Filter options if search query is provided
  const filteredOptions = searchable && searchQuery.trim()
    ? normalizedOptions.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (opt.subLabel && opt.subLabel.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : normalizedOptions;

  const handleSelect = (opt: DropdownOption) => {
    if (opt.disabled) return;
    onChange(String(opt.value));
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5"
        >
          {icon}
          <span>{label}</span>
          {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      {/* Trigger Button (Frame Kepala Dropdown) */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={`w-full text-left text-xs font-semibold px-3.5 py-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer shadow-2xs select-none ${
          disabled
            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            : isOpen
            ? `bg-white ${colors.activeBorder}`
            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
        } ${triggerClassName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption?.icon && (
            <span className="shrink-0">{selectedOption.icon}</span>
          )}
          <span className={`truncate ${!selectedOption ? 'text-slate-400 font-normal' : 'text-slate-800'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-700' : ''
          }`}
        />
      </button>

      {/* Popup Menu (Menyatu Sesuai Frame Kepala Dropdown) */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 mt-1.5 z-50 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-900/10 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150 ${menuClassName}`}
          role="listbox"
        >
          {searchable && (
            <div className="p-2 border-b border-slate-100 bg-slate-50/70">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari opsi..."
                  className="w-full text-xs pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-slate-400">
                Tidak ada opsi ditemukan
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = String(opt.value) === String(value);
                return (
                  <button
                    key={String(opt.value)}
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => handleSelect(opt)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                      opt.disabled
                        ? 'opacity-50 cursor-not-allowed text-slate-400'
                        : isSelected
                        ? colors.selectedItem
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                      <div className="truncate">
                        <span className="block truncate">{opt.label}</span>
                        {opt.subLabel && (
                          <span className="block text-[11px] text-slate-400 font-normal truncate">
                            {opt.subLabel}
                          </span>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <Check className={`w-4 h-4 shrink-0 ${colors.checkIcon}`} />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

