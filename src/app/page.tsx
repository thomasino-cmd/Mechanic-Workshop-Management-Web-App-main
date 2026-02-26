import { GarageBoard } from '@/components/garage-board';
import { VehicleIntakeFlow } from '@/components/vehicle-intake-flow';
import { AgendaPanel } from '@/components/agenda-panel';

export default function HomePage() {
  return (
    <div className="grid gap-4 lg:grid-cols-[7fr_3fr]">
      <section className="space-y-4 rounded-3xl border bg-panel p-4">
        <h2 className="text-3xl font-black">In Officina Oggi</h2>
        <VehicleIntakeFlow />
        <GarageBoard />
      </section>
      <AgendaPanel />
    </div>
  );
}
