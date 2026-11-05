"use client";

import { SORTS, type SortId } from "@/lib/filters";
import { Select } from "@/components/ui/Field";

export function SortSelect({ value, onChange, id }: { value: SortId; onChange: (v: SortId) => void; id: string }) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="shrink-0 text-[13px] text-ink-muted">
        Sort by
      </label>
      <Select id={id} value={value} onChange={(e) => onChange(e.target.value as SortId)} className="min-h-10 py-0 text-[14px]" wrapperClassName="w-52">
        {SORTS.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
