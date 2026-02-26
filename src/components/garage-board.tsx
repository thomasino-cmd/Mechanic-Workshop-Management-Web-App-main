'use client';

import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, useDraggable, useDroppable, DragOverlay } from '@dnd-kit/core';
import Link from 'next/link';
import { appointments, clients, vehicles } from '@/lib/mock-db';
import { BlueprintCar } from './blueprint-car';
import { LicensePlate } from './license-plate';
import { BrandLogo } from './brand-logo';
import { cn } from '@/lib/utils';

type Column = 'In Attesa' | 'Sui Ponti' | 'Pronti';

const mapStatus: Record<string, Column> = {
  Pending: 'In Attesa',
  In_Workshop: 'Sui Ponti'
};

function Card({ id, vehicleId, isLarge = false, isClone = false }: { id: string; vehicleId: string, isLarge?: boolean, isClone?: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });
  const vehicle = vehicles.find((v) => v.id === vehicleId)!;
  const client = clients.find((c) => c.id === vehicle.clientId)!;

  // When being dragged and NOT the floating clone, just render a faded placeholder
  // This prevents layout shifts and jumping widths
  const opacityClass = (isDragging && !isClone) ? "opacity-30" : "opacity-100";
  const draggingClass = (isDragging && !isClone) ? "bg-slate-50 border-dashed" : "bg-white hover:border-blue-300 hover:shadow-md";

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "group relative flex-shrink-0 cursor-grab rounded-2xl border shadow-sm transition-all",
        isLarge ? "w-80 p-4" : "w-full p-3",
        opacityClass,
        draggingClass,
        isClone ? "shadow-2xl ring-4 ring-blue-500/20 cursor-grabbing rotate-2" : undefined
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        {vehicle.licensePlate ? (
          <LicensePlate plate={vehicle.licensePlate} className={isLarge ? "text-lg" : "min-h-8 text-sm"} />
        ) : (
          <div className="rounded-md border-2 border-dashed border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">
            TARGA ASSENTE
          </div>
        )}
        <BrandLogo brand={vehicle.make} className={cn("text-slate-700", isLarge ? "h-10 w-10" : "h-8 w-8")} />
      </div>

      <BlueprintCar shape={vehicle.blueprintShape || 'sedan'} color={vehicle.color || '#60a5fa'} className={isLarge ? "mb-3 h-32" : "mb-2 h-24"} />

      <div className="flex items-end justify-between">
        <div>
          <p className={cn("font-bold text-slate-900", isLarge ? "text-base" : "text-sm")}>{client.fullName}</p>
          <p className={cn("text-slate-500", isLarge ? "text-sm" : "text-xs")}>{vehicle.make} {vehicle.model}</p>
        </div>

        {/* We stop pointer events to prevent clicking while dragging */}
        <div onPointerDown={e => e.stopPropagation()}>
          <Link href={`/vehicle/${vehicle.id}`} className="block rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-blue-100 hover:text-blue-700 cursor-pointer">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function HorizontalLane({ title, ids }: { title: Column; ids: string[] }) {
  const { setNodeRef } = useDroppable({ id: title });
  return (
    <div className="mb-6 rounded-3xl border-2 border-blue-100 bg-blue-50/30 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-black text-blue-950 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm text-white">{ids.length}</span>
          {title} <span className="text-blue-600/60">(In Lavorazione)</span>
        </h3>
      </div>
      <div
        ref={setNodeRef}
        className="flex min-h-[220px] items-stretch gap-4 overflow-x-auto pb-4 pt-2"
        style={{ scrollbarWidth: 'thin' }}
      >
        {ids.length === 0 ? (
          <div className="flex w-full items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 text-blue-400">
            Nessun veicolo sui ponti. Trascina qui un veicolo per iniziare il lavoro.
          </div>
        ) : (
          ids.map((id) => {
            const appt = appointments.find((a) => a.id === id)!;
            return <Card key={id} id={id} vehicleId={appt.vehicleId} isLarge />;
          })
        )}
      </div>
    </div>
  );
}

function VerticalLane({ title, ids, accentColor = "slate" }: { title: Column; ids: string[], accentColor?: "slate" | "green" }) {
  const { setNodeRef } = useDroppable({ id: title });

  const accentClasses = {
    slate: "border-slate-200 bg-slate-100",
    green: "border-emerald-200 bg-emerald-50/50"
  };

  const textClasses = {
    slate: "text-slate-800",
    green: "text-emerald-900"
  };

  return (
    <div className={cn("flex flex-col rounded-3xl border p-4", accentClasses[accentColor])}>
      <h3 className={cn("mb-4 text-xl font-black flex items-center justify-between", textClasses[accentColor])}>
        {title}
        <span className="rounded-full bg-white px-3 py-1 text-sm shadow-sm">{ids.length}</span>
      </h3>
      <div ref={setNodeRef} className="flex min-h-[400px] flex-col gap-3">
        {ids.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 text-slate-400">
            Vuoto
          </div>
        )}
        {ids.map((id) => {
          const appt = appointments.find((a) => a.id === id)!;
          return <Card key={id} id={id} vehicleId={appt.vehicleId} />;
        })}
      </div>
    </div>
  );
}

export function GarageBoard() {
  const initial = {
    'In Attesa': appointments.filter((a) => mapStatus[a.status] === 'In Attesa').map((a) => a.id),
    'Sui Ponti': appointments.filter((a) => mapStatus[a.status] === 'Sui Ponti').map((a) => a.id),
    Pronti: [] as string[]
  };

  const [columns, setColumns] = useState<Record<Column, string[]>>(initial);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setColumns((prev) => {
        const freshInAttesa = appointments.filter((a) => mapStatus[a.status] === 'In Attesa').map((a) => a.id);
        const newInAttesa = freshInAttesa.filter(id => !prev['Sui Ponti'].includes(id) && !prev['Pronti'].includes(id));
        return {
          ...prev,
          'In Attesa': newInAttesa
        };
      });
    };
    window.addEventListener('dashboardUpdated', handleUpdate);
    return () => window.removeEventListener('dashboardUpdated', handleUpdate);
  }, []);

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const to = event.over?.id as Column | undefined;
    const active = event.active.id as string;
    if (!to) return;

    setColumns((state) => {
      const from = (Object.keys(state) as Column[]).find((k) => state[k].includes(active));
      if (!from || from === to) return state; // Don't update if dropped in same column
      return {
        ...state,
        [from]: state[from].filter((id) => id !== active),
        [to]: [...state[to], active]
      };
    });
  };

  // Find active appointment for the overlay
  const activeAppt = activeId ? appointments.find(a => a.id === activeId) : null;
  // Determine if it was dragged from the large 'Sui Ponti' horizontal lane
  const wasLarge = activeId ? columns['Sui Ponti'].includes(activeId) : false;

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex flex-col gap-4">
        {/* Top High Priority Area */}
        <HorizontalLane title="Sui Ponti" ids={columns['Sui Ponti']} />

        {/* Bottom Split Area */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <VerticalLane title="In Attesa" ids={columns['In Attesa']} accentColor="slate" />
          <VerticalLane title="Pronti" ids={columns.Pronti} accentColor="green" />
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 250, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
        {activeId && activeAppt ? (
          <Card id={activeId} vehicleId={activeAppt.vehicleId} isLarge={wasLarge} isClone={true} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
