export type JobCategory = {
    id: string;
    name: string;
    jobs: string[];
};

export const topCategories: JobCategory[] = [
    {
        id: 'tagliando',
        name: 'Tagliando / Manutenzione',
        jobs: [
            'Tagliando completo', 'Cambio olio motore', 'Filtro olio', 'Filtro aria',
            'Filtro abitacolo', 'Filtro carburante', 'Controllo livelli', 'Rabbocco liquidi',
            'Liquido refrigerante', 'Liquido freni', 'Olio cambio', 'Olio differenziale',
            'Olio servosterzo', 'Candele', 'Candelette', 'Cinghia servizi', 'Tendicinghia servizi',
            'Sostituzione batteria', 'Controllo batteria', 'Carica alternatore', 'Reset service',
            'Azzeramento spia', 'Controllo generale', 'Controllo perdite', 'Lubrificazione parti',
            'Preparazione revisione'
        ],
    },
    {
        id: 'freni',
        name: 'Freni',
        jobs: [
            'Pastiglie ant.', 'Pastiglie post.', 'Dischi ant.', 'Dischi post.',
            'Dischi + pastiglie ant.', 'Dischi + pastiglie post.', 'Rettifica dischi',
            'Ganasce freno', 'Tamburi freno', 'Revisione pinze', 'Sostituzione pinza',
            'Tubi freno', 'Spurgo freni', 'Pompa freni', 'Servofreno', 'Sensore ABS',
            'Diagnosi ABS/ESP', 'Centralina ABS', 'Regolazione freno a mano', 'Cavi freno a mano',
            'Rip. freno staz. elettr.', 'Attuatore freno elettr.'
        ],
    },
    {
        id: 'gomme',
        name: 'Gomme / Ruote',
        jobs: [
            'Sostituzione pneumatici', 'Montaggio', 'Smontaggio', 'Inversione',
            'Equilibratura', 'Convergenza', 'Assetto ruote', 'Campanatura', 'Controllo usura',
            'Riparazione foratura', 'Valvola pneumatico', 'Sostituzione cerchio',
            'Montaggio ruota scorta', 'Kit riparazione', 'Pressione pneumatici', 'Reset TPMS',
            'Sensore TPMS', 'Programmazione TPMS', 'Deposito gomme', 'Cambio estive/invernali'
        ],
    },
    {
        id: 'diagnosi',
        name: 'Diagnosi / Controlli',
        jobs: [
            'Diagnosi generica', 'Diagnosi motore', 'Diagnosi freni', 'Diagnosi elettronica',
            'Diagnosi batteria', 'Diagnosi climatizz.', 'Diagnosi rumorosità', 'Diagnosi vibrazioni',
            'Diagnosi perdita olio', 'Diagnosi perdita refr.', 'Diagnosi perdita carb.',
            'Diagnosi avviamento', 'Diagnosi fumosità', 'Diagnosi DPF', 'Diagnosi ABS/ESP',
            'Diagnosi airbag', 'Controllo pre-revisione', 'Controllo sicurezza', 'Controllo sottoscocca',
            'Controllo pneumatici', 'Prova su strada', 'Controllo finale', 'Preventivo intervento'
        ],
    },
    {
        id: 'batteria',
        name: 'Batteria / Avviamento',
        jobs: [
            'Test batteria', 'Sostituzione batteria', 'Ricarica batteria', 'Avviamento booster',
            'Morsetti batteria', 'Pulizia morsetti', 'Sostituzione alternatore', 'Test alternatore',
            'Revisione alternatore', 'Sostituzione motorino', 'Test motorino', 'Revisione motorino',
            'Assorbimento anomalo'
        ],
    },
    {
        id: 'trasmissione',
        name: 'Frizione / Cambio',
        jobs: [
            'Sostituzione frizione', 'Kit frizione', 'Volano', 'Volano bimassa', 'Cuscinetto reggispinta',
            'Pompa frizione', 'Spurgo frizione', 'Comando frizione', 'Cavo frizione', 'Revisione cambio man.',
            'Revisione cambio auto.', 'Sostituzione cambio', 'Riparazione cambio', 'Olio cambio',
            'Supporti cambio', 'Semiasse', 'Giunto omocinetico', 'Cuffia semiasse', 'Albero trasmissione',
            'Supporto trasmissione', 'Riparazione differenziale', 'Sostituzione differenziale', 'Olio differenziale'
        ],
    },
    {
        id: 'motore',
        name: 'Motore',
        jobs: [
            'Diagnosi motore', 'Riparazione motore', 'Revisione motore', 'Sostituzione motore',
            'Smontaggio motore', 'Rimontaggio motore', 'Test compressione', 'Controllo compressione',
            'Guarnizione testata', 'Rettifica testata', 'Sostituzione testata', 'Guarnizione punterie',
            'Supporti motore', 'Coppa olio', 'Guarnizione coppa olio', 'Paraoli', 'Riparazione perdite',
            'Pompa olio', 'Pompa acqua', 'Termostato', 'Radiatore motore', 'Ventola radiatore',
            'Manicotti raffreddamento', 'Riparazione circuito', 'Lavaggio circuito', 'Cinghia distribuzione',
            'Kit distribuzione', 'Catena distribuzione', 'Tendicatena', 'Messa in fase', 'Punterie',
            'Alberi a camme', 'Pistoni', 'Fasce elastiche', 'Bronzine', 'Valvole', 'Registrazione valvole',
            'Decarbonizzazione', 'Lavaggio motore', 'Perdite refrigerante'
        ],
    },
    {
        id: 'elettrico',
        name: 'Elettrico',
        jobs: [
            'Diagnosi elettronica', 'Diagnosi centraline', 'Lettura errori', 'Cancellazione errori',
            'Ricerca guasto', 'Impianto elettrico', 'Sostituzione batteria', 'Test batteria',
            'Alternatore', 'Revisione alternatore', 'Motorino avviamento', 'Rev. motorino avv.',
            'Fusibili', 'Relè', 'Cablaggio', 'Massa elettrica', 'Sensori', 'Attuatori', 'Codifica chiave',
            'Programmazione chiave', 'Telecomando', 'Centralina comfort', 'Body computer',
            'Aggiornamento software', 'Codifica componenti', 'Ripristino errori', 'Installazione accessori',
            'Sensori parcheggio', 'Dashcam', 'Antifurto', 'Localizzatore GPS'
        ],
    }
];

export const otherCategories: JobCategory[] = [
    {
        id: 'clima',
        name: 'Climatizz. / Riscald.',
        jobs: [
            'Ricarica A/C', 'Controllo A/C', 'Ricerca perdite A/C', 'Compressore A/C',
            'Condensatore A/C', 'Evaporatore A/C', 'Valvola espansione', 'Essiccatore A/C',
            'Sanificazione', 'Pulizia climatizzazione', 'Ventola abitacolo', 'Resistenza ventola',
            'Riscaldamento abitacolo', 'Radiatore riscaldamento', 'Comandi clima', 'Diagnosi climatizz.'
        ],
    },
    {
        id: 'sospensioni',
        name: 'Sospensioni / Sterzo',
        jobs: [
            'Ammortizzatori ant.', 'Ammortizzatori post.', 'Molle sospensioni', 'Supporti ammortizzatori',
            'Tamponi ammortizzatori', 'Bracci sospensione', 'Silent block', 'Testine sterzo', 'Tiranti sterzo',
            'Scatola sterzo', 'Revisione scatola', 'Pompa servosterzo', 'Olio servosterzo',
            'Riparazione servosterzo', 'Diagnosi sterzo', 'Cuscinetti ruota', 'Mozzo ruota',
            'Barra stabilizzatrice', 'Biellette barra', 'Controllo giochi', 'Controllo avantreno',
            'Controllo retrotreno'
        ],
    },
    {
        id: 'scarico',
        name: 'Scarico / Emissioni',
        jobs: [
            'Sostituzione marmitta', 'Terminale scarico', 'Centrale scarico', 'Flessibile scarico',
            'Riparazione scarico', 'Saldatura scarico', 'Catalizzatore', 'Filtro DPF/FAP', 'Rigenerazione DPF',
            'Pulizia DPF', 'Diagnosi DPF', 'Sonda lambda', 'Sensore NOx', 'Valvola EGR', 'Pulizia EGR',
            'Esclusione emissioni', 'Controllo emissioni', 'Prep. revisione emissioni'
        ],
    },
    {
        id: 'turbo',
        name: 'Turbo / Sovraliment.',
        jobs: [
            'Diagnosi turbina', 'Sostituzione turbina', 'Revisione turbina', 'Pulizia geometria var.',
            'Attuatore turbina', 'Elettrovalvola turbo', 'Intercooler', 'Manicotti turbo', 'Tubazioni turbo',
            'Perdita pressione turbo', 'Diagnosi sovralimentazione'
        ],
    },
    {
        id: 'carrozzeria',
        name: 'Carrozzeria leggera',
        jobs: [
            'Parabrezza', 'Riparazione parabrezza', 'Lunotto', 'Vetro laterale', 'Alzacristallo',
            'Riparazione alzacristallo', 'Specchietto', 'Calotta specchietto', 'Maniglia porta',
            'Serratura porta', 'Chiusura centralizzata', 'Cofano', 'Paraurti', 'Fissaggio paraurti',
            'Piccoli danni carr.', 'Clips/fissaggi', 'Regolazione porte', 'Regolazione cofano',
            'Regolazione portellone', 'Infiltrazioni acqua'
        ],
    },
    {
        id: 'luci',
        name: 'Luci / Visibilità',
        jobs: [
            'Lampadina anabbagliante', 'Lampadina abbagliante', 'Lampadina posizione', 'Lampadina freccia',
            'Lampadina stop', 'Lampadina targa', 'Faro anteriore', 'Fanale posteriore', 'Lucidatura fari',
            'Regolazione fari', 'Diagnosi luci', 'Spazzole tergi', 'Bracci tergi', 'Motorino tergi',
            'Pompa lavavetri', 'Riparazione lavavetri', 'Ugelli lavavetri'
        ],
    },
    {
        id: 'revisione',
        name: 'Pratiche Revisione',
        jobs: [
            'Pre-revisione', 'Controllo per revisione', 'Preparazione revisione', 'Controllo emissioni',
            'Controllo luci', 'Controllo freni', 'Controllo sospensioni', 'Controllo pneumatici',
            'Ripristino per revisione', 'Invio a revisione', 'Esito revisione'
        ],
    },
    {
        id: 'alimentazione',
        name: 'Iniezione / Accensione',
        jobs: [
            'Diagnosi iniezione', 'Pulizia iniettori', 'Sostituzione iniettori', 'Revisione iniettori',
            'Pompa carburante', 'Galleggiante carburante', 'Filtro carburante', 'Pulizia farfallato',
            'Sostituzione farfallato', 'Sensore farfalla', 'Debimetro', 'Pulizia debimetro', 'Sensore MAP',
            'Sensore press. carb.', 'Reg. press. carb.', 'Rail carburante', 'Perdita carburante',
            'Candele', 'Bobine accensione', 'Cavi candela', 'Mancata accensione', 'Centralina motore',
            'Program. centralina', 'Codifica iniettori'
        ],
    },
    {
        id: 'servizi-rapidi',
        name: 'Servizi Rapidi',
        jobs: [
            'Cambio lampadina', 'Cambio tergicristalli', 'Rabbocco liquidi', 'Controllo pressione',
            'Riparazione foratura', 'Reset spie', 'Azzeramento service', 'Test batteria',
            'Sostituzione batteria', 'Controllo livelli', 'Controllo visivo', 'Piccolo fissaggio',
            'Gonfiaggio pneumatici', 'Accessorio rapido'
        ],
    },
    {
        id: 'emergenze',
        name: 'Emergenze / Guasti',
        jobs: [
            'Veicolo non parte', 'Batteria scarica', 'Foratura', 'Surriscaldamento motore',
            'Perdita olio', 'Perdita acqua', 'Rumore anomalo', 'Vibrazione anomala', 'Freni rumorosi',
            'Spia motore', 'Spia batteria', 'Spia ABS', 'Spia airbag', 'Auto in recovery',
            'Traino in officina', 'Messa in sicurezza'
        ],
    }
];

export const favoriteJobs = [
    'Cambio olio motore',
    'Pastiglie ant.',
    'Tagliando completo',
    'Sostituzione pneumatici',
    'Diagnosi generica',
    'Test batteria',
    'Dischi + pastiglie ant.',
    'Convergenza',
    'Equilibratura',
    'Filtro aria'
];

export const recentJobs = [
    'Tagliando completo',
    'Cambio lampadina',
    'Pastiglie ant.',
    'Ricarica A/C',
    'Equilibratura',
    'Spazzole tergi'
];
