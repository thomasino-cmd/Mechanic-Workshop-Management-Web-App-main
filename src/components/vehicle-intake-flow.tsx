'use client';

import React, { useState, useMemo } from 'react';
import { clients as clientsDb, vehicles as vehiclesDb, appointments as appointmentsDb } from '@/lib/mock-db';
import { Client, Vehicle, Appointment } from '@/lib/types';
import { LicensePlate } from './license-plate';
import { favoriteJobs, recentJobs } from '@/lib/job-categories';

const BRANDS = [
    'Fiat', 'Volkswagen', 'Toyota', 'Ford', 'Peugeot',
    'Citroen', 'Jeep', 'Suzuki', 'Honda', 'Audi',
    'Nissan', 'Mercedes', 'BMW', 'Renault', 'Opel', 'Alfa Romeo'
];

const MODELS_BY_BRAND: Record<string, string[]> = {
    'Fiat': ['Panda', 'Idea', 'Tipo', 'Doblo', '500', '600', 'Freemont', 'Multipla', 'Qubo', 'Punto', 'Bravo'],
    'Volkswagen': ['Golf', 'Polo', 'Passat', 'Tiguan', 'T-Roc', 'Up!', 'Touareg'],
    'Toyota': ['Yaris', 'Corolla', 'Aygo', 'RAV4', 'C-HR'],
    'Ford': ['Fiesta', 'Focus', 'Puma', 'Kuga', 'Ecosport'],
    'Peugeot': ['208', '2008', '308', '3008', '5008'],
    'Citroen': ['C3', 'C3 Aircross', 'C4', 'C5 Aircross', 'Berlingo'],
    'Jeep': ['Renegade', 'Compass', 'Avenger', 'Wrangler', 'Grand Cherokee'],
    'Suzuki': ['Swift', 'Ignis', 'Vitara', 'S-Cross', 'Jimny'],
    'Honda': ['Civic', 'Jazz', 'HR-V', 'CR-V'],
    'Audi': ['A1', 'A3', 'A4', 'Q2', 'Q3', 'Q5'],
    'Nissan': ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Leaf'],
    'Mercedes': ['Classe A', 'Classe C', 'GLA', 'GLC', 'Vito'],
    'BMW': ['Serie 1', 'Serie 3', 'X1', 'X3', 'X5'],
    'Renault': ['Clio', 'Captur', 'Megane', 'Kadjar', 'Kangoo'],
    'Opel': ['Corsa', 'Astra', 'Mokka', 'Crossland', 'Grandland'],
    'Alfa Romeo': ['Giulietta', 'Giulia', 'Stelvio', 'Tonale']
};

export function VehicleIntakeFlow() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [step, setStep] = useState<'search' | 'register' | 'client_profile' | 'brand' | 'model' | 'timing' | 'success'>('search');

    // State for flow
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    // Registration state
    const [regFirstName, setRegFirstName] = useState('');
    const [regLastName, setRegLastName] = useState('');
    const [regPhone, setRegPhone] = useState('');

    // Vehicle state
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    // Intake timing
    const [intakeTiming, setIntakeTiming] = useState<'now' | 'future'>('now');
    const [apptDate, setApptDate] = useState('');
    const [apptNotes, setApptNotes] = useState('');
    const [calendarOffsetWeeks, setCalendarOffsetWeeks] = useState(0);

    // Derived
    const filteredClients = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.toLowerCase();
        return clientsDb.filter(c =>
            c.fullName.toLowerCase().includes(query) ||
            c.phoneNumber.includes(query)
        );
    }, [searchQuery]);

    const clientVehicles = useMemo(() => {
        if (!selectedClient) return [];
        return vehiclesDb.filter(v => v.clientId === selectedClient.id);
    }, [selectedClient]);

    const calendarDays = useMemo(() => {
        const days = [];
        const start = new Date();
        start.setDate(start.getDate() + (calendarOffsetWeeks * 14));
        for (let i = 0; i < 14; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            // Optional: Skip Sundays? Let's just include all for now.
            days.push(d);
        }
        return days;
    }, [calendarOffsetWeeks]);

    const resetFlow = () => {
        setSearchQuery('');
        setSelectedClient(null);
        setRegFirstName('');
        setRegLastName('');
        setRegPhone('');
        setSelectedVehicle(null);
        setSelectedBrand('');
        setSelectedModel('');
        setIntakeTiming('now');
        setApptDate('');
        setApptNotes('');
        setCalendarOffsetWeeks(0);
        setStep('search');
        setIsExpanded(false);
    };

    const handleSelectClient = (client: Client) => {
        setSelectedClient(client);
        setStep('client_profile');
    };

    const handleRegisterClient = (e: React.FormEvent) => {
        e.preventDefault();
        if (!regFirstName.trim() || !regLastName.trim() || !regPhone.trim()) return;

        const newClient: Client = {
            id: `c${Date.now()}`,
            fullName: `${regFirstName.trim()} ${regLastName.trim()}`,
            phoneNumber: regPhone.trim()
        };

        clientsDb.push(newClient);
        setSelectedClient(newClient);
        setStep('client_profile');
    };

    const handleSelectExistingVehicle = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setStep('timing');
    };

    const handleInitialSaveVehicle = (model: string) => {
        setSelectedModel(model);
        setSelectedVehicle(null);
        setStep('timing');
    };

    const handleFinalizeIntake = () => {
        if (!selectedClient) return;

        let targetVehicleId = '';

        if (selectedVehicle) {
            targetVehicleId = selectedVehicle.id;
        } else {
            if (!selectedBrand || !selectedModel) return;
            const newVehicle: Vehicle = {
                id: `v${Date.now()}`,
                clientId: selectedClient.id,
                make: selectedBrand,
                model: selectedModel,
            };
            vehiclesDb.push(newVehicle);
            targetVehicleId = newVehicle.id;
        }

        const newAppointment: Appointment = {
            id: `a${Date.now()}`,
            vehicleId: targetVehicleId,
            date: intakeTiming === 'now' ? new Date().toISOString().split('T')[0] : apptDate,
            time: '09:00', // Default mock time since we removed time selection
            status: 'Pending',
            jobDescription: apptNotes || 'Da verificare'
        };
        appointmentsDb.push(newAppointment);
        window.dispatchEvent(new Event('dashboardUpdated'));

        setStep('success');
    };

    if (!isExpanded) {
        return (
            <button
                onClick={() => setIsExpanded(true)}
                className="w-full rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-center text-lg font-bold text-slate-500 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all flex items-center justify-center gap-2"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Nuova Accettazione Veicolo
            </button>
        );
    }

    return (
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 lg:p-6 shadow-sm">
            {/* Header with back button when needed */}
            <div className="flex items-center justify-between mb-6 border-b pb-4">
                <h3 className="text-xl font-black text-slate-800">
                    {step === 'search' && 'Seleziona o Cerca Cliente'}
                    {step === 'register' && 'Nuovo Cliente'}
                    {step === 'client_profile' && 'Profilo Cliente'}
                    {step === 'brand' && 'Nuovo Veicolo - Marca'}
                    {step === 'model' && 'Nuovo Veicolo - Modello'}
                    {step === 'timing' && 'Modalità Accettazione'}
                    {step === 'success' && 'Accettazione Completata'}
                </h3>

                <div className="flex items-center gap-4">
                    {step !== 'search' && step !== 'success' && (
                        <button
                            onClick={() => {
                                if (step === 'register') setStep('search');
                                else if (step === 'client_profile') setStep('search');
                                else if (step === 'brand') setStep('client_profile');
                                else if (step === 'model') setStep('brand');
                                else if (step === 'timing') {
                                    if (selectedVehicle) setStep('client_profile');
                                    else setStep('model');
                                }
                            }}
                            className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                        >
                            ← Indietro
                        </button>
                    )}

                    <button
                        onClick={() => { setIsExpanded(false); resetFlow(); }}
                        className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 transition"
                        title="Chiudi"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {step === 'search' && (
                <div className="space-y-4">
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cerca per nome o numero di telefono..."
                        className="w-full min-h-14 rounded-xl border-2 px-4 text-xl font-medium focus:border-blue-600 focus:outline-none transition-colors"
                    />

                    {searchQuery.trim().length > 0 && (
                        <div className="mt-4 border rounded-xl overflow-hidden divide-y">
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                    <button
                                        key={client.id}
                                        onClick={() => handleSelectClient(client)}
                                        className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors text-left"
                                    >
                                        <div>
                                            <p className="font-bold text-lg text-slate-800">{client.fullName}</p>
                                            <p className="text-sm text-slate-500">{client.phoneNumber}</p>
                                        </div>
                                        <span className="text-blue-600 font-bold">Seleziona</span>
                                    </button>
                                ))
                            ) : (
                                <div className="p-6 text-center text-slate-500">
                                    <p className="mb-4">Nessun cliente trovato con questo nome.</p>
                                    <button
                                        onClick={() => setStep('register')}
                                        className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 transition"
                                    >
                                        Registra Nuovo Cliente
                                    </button>
                                </div>
                            )}

                            {filteredClients.length > 0 && (
                                <button
                                    onClick={() => setStep('register')}
                                    className="w-full p-4 bg-slate-50 text-blue-600 font-bold hover:bg-slate-100 transition-colors text-center"
                                >
                                    + Non è in lista? Registra Nuovo Cliente
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}

            {step === 'register' && (
                <form onSubmit={handleRegisterClient} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Nome *</label>
                            <input
                                required
                                value={regFirstName}
                                onChange={e => setRegFirstName(e.target.value)}
                                className="w-full min-h-12 rounded-lg border-2 px-3 text-lg focus:border-blue-600 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Cognome *</label>
                            <input
                                required
                                value={regLastName}
                                onChange={e => setRegLastName(e.target.value)}
                                className="w-full min-h-12 rounded-lg border-2 px-3 text-lg focus:border-blue-600 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Telefono *</label>
                        <input
                            required
                            type="tel"
                            value={regPhone}
                            onChange={e => setRegPhone(e.target.value)}
                            className="w-full min-h-12 rounded-lg border-2 px-3 text-lg focus:border-blue-600 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 min-h-14 rounded-xl bg-blue-600 px-6 text-xl font-black text-white hover:bg-blue-700 transition"
                    >
                        Salva Cliente
                    </button>
                </form>
            )}

            {step === 'client_profile' && selectedClient && (
                <div className="space-y-6">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <h4 className="text-xl font-bold text-slate-800">{selectedClient.fullName}</h4>
                        <p className="text-slate-500 font-medium">{selectedClient.phoneNumber}</p>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h5 className="font-bold text-slate-700">Veicoli nel Garage ({clientVehicles.length})</h5>
                            <button
                                onClick={() => setStep('brand')}
                                className="text-sm font-bold text-white bg-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-700 transition"
                            >
                                + Aggiungi Veicolo
                            </button>
                        </div>

                        {clientVehicles.length === 0 ? (
                            <div className="text-center p-8 border-2 border-dashed rounded-xl border-slate-200">
                                <p className="text-slate-500 mb-4">Nessun veicolo registrato per questo cliente.</p>
                                <button
                                    onClick={() => setStep('brand')}
                                    className="px-6 py-2.5 bg-blue-100 text-blue-700 font-bold rounded-lg hover:bg-blue-200 transition"
                                >
                                    Nuova Accettazione
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-3 sm:grid-cols-2">
                                {clientVehicles.map(v => (
                                    <div key={v.id} onClick={() => handleSelectExistingVehicle(v)} className="border rounded-xl p-3 flex flex-col justify-between hover:border-blue-300 transition-colors cursor-pointer">
                                        <div>
                                            <p className="font-bold text-lg">{v.make} {v.model}</p>
                                            {v.year && <p className="text-sm text-slate-500">Anno: {v.year}</p>}
                                        </div>
                                        {v.licensePlate ? (
                                            <div className="mt-3">
                                                <LicensePlate plate={v.licensePlate} className="text-xs min-h-6 min-w-20" />
                                            </div>
                                        ) : (
                                            <span className="mt-3 inline-block bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded max-w-max">
                                                Targa assente
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {step === 'brand' && (
                <div>
                    <p className="mb-4 text-slate-500 font-medium pb-2 border-b">Seleziona il marchio per continuare</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {BRANDS.map(brand => (
                            <button
                                key={brand}
                                onClick={() => {
                                    setSelectedBrand(brand);
                                    setStep('model');
                                }}
                                className="py-4 px-2 border-2 rounded-xl text-center font-bold bg-white hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all"
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 'model' && (
                <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b">
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold text-sm">{selectedBrand}</span>
                        <span className="text-slate-400">›</span>
                        <span className="text-slate-500 font-medium">Seleziona Modello</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {(MODELS_BY_BRAND[selectedBrand] || ['Modello 1', 'Modello 2', 'Altro']).map(model => (
                            <button
                                key={model}
                                onClick={() => handleInitialSaveVehicle(model)}
                                className="py-3 px-2 border-2 rounded-xl text-center font-bold bg-white hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all"
                            >
                                {model}
                            </button>
                        ))}

                        {/* Fallback extra models option if we miss some in our static list */}
                        <button
                            onClick={() => handleInitialSaveVehicle('Altro / Sconosciuto')}
                            className="py-3 px-2 border-2 border-dashed rounded-xl text-center font-bold text-slate-500 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all"
                        >
                            Altro Modello...
                        </button>
                    </div>
                </div>
            )}

            {step === 'timing' && (
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIntakeTiming('now')}
                            className={`flex-1 p-6 rounded-2xl border-2 text-left transition-all ${intakeTiming === 'now' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600/20' : 'border-slate-200 hover:border-blue-300'}`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${intakeTiming === 'now' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                                    {intakeTiming === 'now' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">Accettazione Ora</h4>
                            </div>
                            <p className="text-slate-600 pl-9">Il cliente lascia il veicolo in officina in questo momento. Verrà messo &quot;In Attesa&quot;.</p>
                        </button>

                        <button
                            onClick={() => setIntakeTiming('future')}
                            className={`flex-1 p-6 rounded-2xl border-2 text-left transition-all ${intakeTiming === 'future' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600/20' : 'border-slate-200 hover:border-blue-300'}`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${intakeTiming === 'future' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                                    {intakeTiming === 'future' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">Programma Appuntamento</h4>
                            </div>
                            <p className="text-slate-600 pl-9">Il cliente porterà il veicolo in futuro. Verrà inserito in Agenda.</p>
                        </button>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Lavoro da svolgere / Note</label>
                        <div className="mb-4 space-y-3">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Aggiunta Rapida</p>
                                <div className="flex flex-wrap gap-2">
                                    {[...recentJobs.slice(0, 3), ...favoriteJobs.slice(0, 5)].map((job) => (
                                        <button
                                            key={job}
                                            onClick={() => {
                                                setApptNotes(prev => prev ? `${prev}, ${job}` : job)
                                            }}
                                            className="rounded-lg border-2 border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-700 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                                        >
                                            + {job}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <textarea
                                value={apptNotes}
                                onChange={(e) => setApptNotes(e.target.value)}
                                placeholder="Es. Tagliando, Freni che fischiano..."
                                className="w-full min-h-24 rounded-lg border-2 p-3 text-lg focus:border-blue-600 focus:outline-none resize-none"
                            />
                        </div>

                        {intakeTiming === 'future' && (
                            <div className="mt-6 border-t pt-4">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-bold text-slate-700">Seleziona Giorno (Prossime 2 Settimane)</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setCalendarOffsetWeeks(Math.max(0, calendarOffsetWeeks - 1))}
                                            disabled={calendarOffsetWeeks === 0}
                                            className="px-3 py-1 rounded-lg bg-slate-200 text-slate-700 font-bold text-sm disabled:opacity-50"
                                        >
                                            &larr; Precedenti
                                        </button>
                                        <button
                                            onClick={() => setCalendarOffsetWeeks(calendarOffsetWeeks + 1)}
                                            className="px-3 py-1 rounded-lg bg-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-300"
                                        >
                                            Successivi &rarr;
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                                    {calendarDays.map((date, idx) => {
                                        const isoDate = date.toISOString().split('T')[0];
                                        const isSelected = apptDate === isoDate;
                                        const dayName = date.toLocaleDateString('it-IT', { weekday: 'short' }).toUpperCase();
                                        const dayNum = date.getDate();
                                        const monthName = date.toLocaleDateString('it-IT', { month: 'short' });
                                        const isSunday = date.getDay() === 0;

                                        return (
                                            <button
                                                key={idx}
                                                disabled={isSunday}
                                                onClick={() => setApptDate(isoDate)}
                                                className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all ${isSelected ? 'border-blue-600 bg-blue-600 text-white shadow-md' :
                                                    isSunday ? 'border-red-100 bg-red-50 opacity-50 cursor-not-allowed' :
                                                        'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                                                    }`}
                                            >
                                                <span className={`text-xs font-bold ${isSelected ? 'text-blue-100' : isSunday ? 'text-red-400' : 'text-slate-500'}`}>{dayName}</span>
                                                <span className={`text-2xl font-black ${isSelected ? 'text-white' : isSunday ? 'text-red-500' : 'text-slate-800'}`}>{dayNum}</span>
                                                <span className={`text-xs ${isSelected ? 'text-blue-100' : isSunday ? 'text-red-400' : 'text-slate-500'}`}>{monthName}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleFinalizeIntake}
                        disabled={intakeTiming === 'future' && !apptDate}
                        className="w-full min-h-14 rounded-xl bg-blue-600 px-6 text-xl font-black text-white hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
                    >
                        Conferma {intakeTiming === 'now' ? 'Accettazione' : 'Appuntamento'}
                    </button>
                </div>
            )}

            {step === 'success' && selectedClient && (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h4 className="text-2xl font-black text-slate-800 mb-2">Fatto!</h4>
                    <p className="text-slate-600 mb-8 max-w-md mx-auto">
                        <b>{selectedVehicle ? `${selectedVehicle.make} ${selectedVehicle.model}` : `${selectedBrand} ${selectedModel}`}</b> di <b>{selectedClient.fullName}</b> è stato registrato.{' '}
                        {intakeTiming === 'now'
                            ? 'Troverai il veicolo nella colonna &quot;In Attesa&quot; sulla Dashboard.'
                            : `L'appuntamento è fissato per il ${new Date(apptDate).toLocaleDateString('it-IT')} in Agenda.`}
                    </p>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={resetFlow}
                            className="py-3 px-6 rounded-xl border-2 font-bold text-slate-700 hover:bg-slate-50 transition"
                        >
                            Nuova Accettazione
                        </button>
                        <button
                            onClick={() => {
                                resetFlow();
                            }}
                            className="py-3 px-6 rounded-xl bg-blue-600 font-bold text-white hover:bg-blue-700 transition"
                        >
                            Torna alla Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
