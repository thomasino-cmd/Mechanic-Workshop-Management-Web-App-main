'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { clients, jobs, vehicles } from '@/lib/mock-db';
import { Job } from '@/lib/types';

export default function UfficioPage() {
  const [rows, setRows] = useState<Job[]>([]);

  useEffect(() => {
    // Load rows on mount so it always gets the latest from the global mock DB
    // preventing stale data during Next.js client-side navigation caching
    setRows(jobs.filter((j) => !j.isBilled));
  }, []);

  return (
    <section className="rounded-3xl border p-4">
      <div className="mb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Torna al Garage
        </Link>
      </div>
      <h2 className="mb-4 text-3xl font-black">Ufficio · Da Fatturare</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="border-b text-sm uppercase text-slate-500">
              <th className="p-2">Data</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Targa</th>
              <th className="p-2">Tag</th>
              <th className="p-2">Prezzo</th>
              <th className="p-2">Azione</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const v = vehicles.find((vehicle) => vehicle.id === row.vehicleId)!;
              const c = clients.find((client) => client.id === v.clientId)!;
              return (
                <tr key={row.id} className="border-b">
                  <td className="p-2">{row.date}</td>
                  <td className="p-2 font-semibold">{c.fullName}</td>
                  <td className="p-2">{v.licensePlate}</td>
                  <td className="p-2">{row.tags.join(', ')}</td>
                  <td className="p-2">€ {row.price.toFixed(2)}</td>
                  <td className="p-2">
                    <button
                      onClick={() => {
                        const jobInDb = jobs.find(j => j.id === row.id);
                        if (jobInDb) jobInDb.isBilled = true;
                        setRows((prev) => prev.filter((p) => p.id !== row.id));
                      }}
                      className="rounded-xl bg-green-600 px-4 py-2 text-lg font-black text-white"
                    >
                      Fatturato ✔
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
