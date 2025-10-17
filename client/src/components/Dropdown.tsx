import React, { useEffect, useId, useMemo, useRef, useState } from "react";

export type SortKey = "popular" | "new" | "alpha";

interface Option {
  key: SortKey;
  label: string;
}

export interface SortDropdownProps {
  value: SortKey;
  onChange: (next: SortKey) => void;
  label?: string;
}

const OPTIONS: Option[] = [
  {
    key: "popular",
    label: "Популярные (по голосам)",
  },
  {
    key: "new",
    label: "Новые",
  },
  {
    key: "alpha",
    label: "По алфавиту",
  },
];

const SortDropdown = ({
  value,
  onChange,
  label = "Сортировка",
}: SortDropdownProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const comboboxId = useId();
  const listboxId = useId();

  const selected = useMemo(
    () => OPTIONS.find((o) => o.key === value)!,
    [value]
  );

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!open) return;

      const target = e.target as Node;

      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);

    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  function toggle() {
    setOpen((prev) => !prev);
  }

  function commit(next: SortKey) {
    if (next != value) onChange(next);
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div ref={wrapperRef}>
      <span id={`${comboboxId}-label`}>{label}</span>

      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={`${comboboxId}-label ${comboboxId}-button`}
        id={`${comboboxId}-button`}
        onClick={toggle}
      >
        {selected.label}
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={`${comboboxId}-label`}
        >
          {OPTIONS.map((opt) => {
            const isSelected = opt.key === value;

            return (
              <li
                key={opt.key}
                role="option"
                aria-selected={isSelected}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(opt.key)}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
