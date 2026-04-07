export default function Impressum() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 text-neutral-900">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="mb-8 text-4xl font-semibold">Impressum</h1>

        <p>InnovaOne Intelligence</p>
        <p>Alessio Adriani</p>
        <p>Ramlinsburgerstrasse 1</p>
        <p>4415 Lausen</p>
        <p>Schweiz</p>

        <div className="pt-4 space-y-1">
          <p>E-Mail: info.innovaone@gmail.com</p>
          <p>Verantwortlich für den Inhalt: Alessio Adriani</p>
        </div>

        {/* Optional ergänzen, falls vorhanden */}
        {/*
        <div className="pt-4 space-y-1">
          <p>Telefon: +41 XX XXX XX XX</p>
          <p>UID: CHE-XXX.XXX.XXX</p>
        </div>
        */}
      </div>
    </main>
  );
}
