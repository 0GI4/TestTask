import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "./DropDown.module.css";

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
  { key: "popular", label: "Популярные (по голосам)" },
  { key: "new", label: "Новые" },
  { key: "alpha", label: "По алфавиту" },
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

  const selected = useMemo(() => {
    const cur = OPTIONS.find((o) => o.key === value);
    return cur ? cur : OPTIONS[0];
  }, [value]);

  // Закрытие по клику вне
  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  function toggle() {
    setOpen((prev) => !prev);
  }

  function commit(next: SortKey) {
    if (next !== value) onChange(next);
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <label id={`${comboboxId}-label`} className={styles.label}>
        {label}
      </label>

      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={`${comboboxId}-label ${comboboxId}-button`}
        id={`${comboboxId}-button`}
        onClick={toggle}
      >
        <span className={styles.buttonText}>{selected.label}</span>
        <svg className={styles.icon} viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M5 7l5 6 5-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={`${comboboxId}-label`}
          className={styles.listbox}
        >
          {OPTIONS.map((opt) => {
            const isSelected = opt.key === value;
            return (
              <li
                key={opt.key}
                role="option"
                aria-selected={isSelected}
                className={isSelected ? styles.optionSelected : styles.option}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(opt.key)}
              >
                <span className={styles.optionLabel}>{opt.label}</span>
                {isSelected && (
                  <svg
                    className={styles.check}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      d="M7.5 13.2l-3-3 1.4-1.4 1.6 1.6 4.8-4.8 1.4 1.4-6.2 6.2z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
