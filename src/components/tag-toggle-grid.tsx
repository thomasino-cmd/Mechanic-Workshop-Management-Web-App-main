'use client';

import React, { useState } from 'react';
import { topCategories, otherCategories, favoriteJobs, recentJobs, JobCategory } from '@/lib/job-categories';

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function TagToggleGrid({ value, onChange }: Props) {
  const [activeCategory, setActiveCategory] = useState<JobCategory | null>(null);
  const [showOtherCategories, setShowOtherCategories] = useState(false);

  const toggleJob = (job: string) => {
    if (value.includes(job)) {
      onChange(value.filter((t) => t !== job));
    } else {
      onChange([...value, job]);
    }
  };

  // Render selected jobs at the top
  const renderSelectedJobs = () => {
    if (value.length === 0) return null;
    return (
      <div className="mb-4 rounded-xl bg-blue-50 p-3">
        <h4 className="mb-2 text-sm font-bold text-blue-900">Lavori Selezionati:</h4>
        <div className="flex flex-wrap gap-2">
          {value.map((job) => (
            <button
              key={job}
              onClick={() => toggleJob(job)}
              className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-sm font-bold text-white transition-colors hover:bg-red-500"
              title="Rimuovi"
              type="button"
            >
              {job} <span className="text-blue-200">×</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (activeCategory) {
    return (
      <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-3">
        {renderSelectedJobs()}
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-xl font-black">{activeCategory.name}</h4>
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-bold text-slate-700 shadow-sm"
          >
            🔙 Indietro
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {activeCategory.jobs.map((job) => {
            const active = value.includes(job);
            return (
              <button
                key={job}
                type="button"
                onClick={() => toggleJob(job)}
                className={`min-h-14 rounded-xl border-2 px-2 text-center text-sm font-bold leading-tight transition-colors sm:text-base ${active ? 'border-blue-700 bg-blue-600 text-white shadow-md' : 'border-slate-300 bg-white text-slate-900 shadow-sm hover:border-blue-400'
                  }`}
              >
                {job}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (showOtherCategories) {
    return (
      <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-3">
        {renderSelectedJobs()}
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-xl font-black">Altre Categorie</h4>
          <button
            type="button"
            onClick={() => setShowOtherCategories(false)}
            className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-bold text-slate-700 shadow-sm"
          >
            🔙 Indietro
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {otherCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className="flex min-h-24 items-center justify-center rounded-2xl border-4 border-slate-300 bg-white p-2 text-center text-base font-black leading-tight text-slate-800 shadow-md transition-all hover:scale-[1.03] hover:border-blue-500 hover:bg-blue-50 sm:text-lg"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-3">
      {renderSelectedJobs()}

      <div className="space-y-6">
        {/* Ultimi Lavori */}
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">Ultimi Lavori</h4>
          <div className="flex flex-wrap gap-2">
            {recentJobs.map((job) => {
              const active = value.includes(job);
              return (
                <button
                  key={job}
                  type="button"
                  onClick={() => toggleJob(job)}
                  className={`rounded-lg border-2 px-3 py-2 text-sm font-bold transition-colors ${active ? 'border-blue-700 bg-blue-600 text-white shadow-md' : 'border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-400'
                    }`}
                >
                  {job}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferiti */}
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">Preferiti Officina</h4>
          <div className="flex flex-wrap gap-2">
            {favoriteJobs.map((job) => {
              const active = value.includes(job);
              return (
                <button
                  key={job}
                  type="button"
                  onClick={() => toggleJob(job)}
                  className={`rounded-lg border-2 px-3 py-2 text-sm font-bold transition-colors ${active ? 'border-amber-600 bg-amber-500 text-white shadow-md' : 'border-amber-200 bg-amber-50 text-amber-900 shadow-sm hover:border-amber-400'
                    }`}
                >
                  {job}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categorie */}
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">Categorie</h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {topCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="flex min-h-24 items-center justify-center rounded-2xl border-4 border-slate-300 bg-white p-2 text-center text-base font-black leading-tight text-slate-800 shadow-md transition-all hover:scale-[1.03] hover:border-blue-500 hover:bg-blue-50 sm:text-lg"
              >
                {cat.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowOtherCategories(true)}
              className="flex min-h-24 items-center justify-center rounded-2xl border-4 border-slate-300 bg-slate-200 p-2 text-center text-base font-black leading-tight text-slate-800 shadow-md transition-all hover:scale-[1.03] hover:border-slate-400 hover:bg-slate-300 sm:text-lg"
            >
              Altri lavori...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
