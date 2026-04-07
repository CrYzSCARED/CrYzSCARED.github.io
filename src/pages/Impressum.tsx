export default function Impressum() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 text-neutral-900">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-4xl font-semibold">Impressum</h1>

        <section>
          <h2 className="text-xl font-semibold">Angaben zum Anbieter</h2>
          <p>InnovaOne Intelligence</p>
          <p>Alessio Adriani</p>
          <p>Ramlinsburgerstrasse 1</p>
          <p>4415 Lausen</p>
          <p>Schweiz</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Kontakt</h2>
          <p>E-Mail: info.innovaone@gmail.com</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Verantwortlich für den Inhalt</h2>
          <p>Alessio Adriani</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Haftungsausschluss</h2>
          <p>
            Die Inhalte unserer Website wurden mit größter Sorgfalt erstellt. 
            Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte 
            können wir jedoch keine Gewähr übernehmen.
          </p>
          <p>
            Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten 
            nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht 
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu 
            überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
            Tätigkeit hinweisen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Urheberrechte</h2>
          <p>
            Die auf dieser Website erstellten Inhalte und Werke unterliegen dem 
            Urheberrecht. Inhalte Dritter werden als solche gekennzeichnet.
          </p>
          <p>
            Bilder und Medien können von Plattformen wie Unsplash oder Pexels stammen 
            und werden im Rahmen der jeweiligen Lizenzbestimmungen verwendet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Externe Links</h2>
          <p>
            Diese Website kann Links zu externen Websites Dritter enthalten, auf deren 
            Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte übernehmen wir 
            keine Gewähr.
          </p>
        </section>

        <p className="text-sm text-neutral-500">
          Stand: April 2026
        </p>
      </div>
    </main>
  );
}
