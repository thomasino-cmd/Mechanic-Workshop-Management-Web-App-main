import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-screen">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
          <h1 className="text-2xl font-black">AutoFlow Officina</h1>
          <nav className="flex gap-2">
            <Link href="/" className="rounded-xl border px-4 py-2 text-lg font-bold">Garage</Link>
            <Link href="/ufficio" className="rounded-xl border px-4 py-2 text-lg font-bold">Ufficio</Link>
          </nav>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </body>
    </html>
  );
}
