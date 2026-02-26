import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.job.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.client.deleteMany();

  const [c1, c2, c3, c4, c5] = await Promise.all([
    prisma.client.create({ data: { fullName: 'Marco Rossi', phoneNumber: '+39 333 111 2233' } }),
    prisma.client.create({ data: { fullName: 'Giulia Conti', phoneNumber: '+39 333 988 1122' } }),
    prisma.client.create({ data: { fullName: 'Luca Bianchi', phoneNumber: '+39 320 765 1234' } }),
    prisma.client.create({ data: { fullName: 'Serena Neri', phoneNumber: '+39 340 555 7788' } }),
    prisma.client.create({ data: { fullName: 'Paolo Verdi', phoneNumber: '+39 339 102 9384' } })
  ]);

  const vehicles = await Promise.all([
    prisma.vehicle.create({ data: { clientId: c1.id, licensePlate: 'AB123CD', make: 'Fiat', model: 'Panda', year: 2020, blueprintShape: 'compact', color: '#2563eb' } }),
    prisma.vehicle.create({ data: { clientId: c2.id, licensePlate: 'EF456GH', make: 'Alfa Romeo', model: 'Giulia', year: 2019, blueprintShape: 'sedan', color: '#dc2626' } }),
    prisma.vehicle.create({ data: { clientId: c3.id, licensePlate: 'IJ789KL', make: 'Volkswagen', model: 'Passat', year: 2018, blueprintShape: 'wagon', color: '#0f766e' } }),
    prisma.vehicle.create({ data: { clientId: c4.id, licensePlate: 'MN321OP', make: 'Jeep', model: 'Renegade', year: 2021, blueprintShape: 'suv', color: '#374151' } }),
    prisma.vehicle.create({ data: { clientId: c5.id, licensePlate: 'QR654ST', make: 'Mercedes', model: 'Vito', year: 2017, blueprintShape: 'van', color: '#7c3aed' } })
  ]);

  const tags = [['Tagliando'], ['Freni Ant.'], ['Tagliando', 'Gomme'], ['Distribuzione'], ['Frizione'], ['Tagliando'], ['Freni Ant.', 'Freni Post.'], ['Tagliando'], ['Distribuzione'], ['Tagliando', 'Gomme']];
  for (let i = 0; i < 10; i++) {
    await prisma.job.create({
      data: {
        vehicleId: vehicles[i % vehicles.length].id,
        date: new Date(2025, i % 12, 10 + i),
        kilometers: 25000 + i * 9000,
        tags: tags[i],
        notes: `Intervento seed #${i + 1}`,
        price: 150 + i * 70,
        isBilled: i % 2 === 0
      }
    });
  }
}

main().finally(async () => prisma.$disconnect());
