export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 text-neutral-900">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-4xl font-semibold">Datenschutzerklärung</h1>

        <p>
          Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. 
          In dieser Datenschutzerklärung informieren wir Sie darüber, welche Daten 
          beim Besuch dieser Website erhoben werden, zu welchen Zwecken dies erfolgt 
          und welche Rechte Ihnen zustehen.
        </p>

        {/* Verantwortliche Stelle */}
        <section>
          <h2 className="text-xl font-semibold">1. Verantwortliche Stelle</h2>
          <p>InnovaOne Intelligence</p>
          <p>Alessio Adriani</p>
          <p>Ramlinsburgerstrasse 1</p>
          <p>4415 Lausen</p>
          <p>Schweiz</p>
          <p>E-Mail: info.innovaone@gmail.com</p>
        </section>

        {/* Allgemeine Daten */}
        <section>
          <h2 className="text-xl font-semibold">
            2. Erhebung und Bearbeitung personenbezogener Daten
          </h2>
          <p>
            Personenbezogene Daten sind alle Angaben, die sich auf eine bestimmte 
            oder bestimmbare natürliche Person beziehen. Wir bearbeiten solche Daten 
            nur, soweit dies für die Bereitstellung einer funktionsfähigen Website 
            sowie unserer Inhalte und Dienstleistungen erforderlich ist.
          </p>
        </section>

        {/* Zugriff */}
        <section>
          <h2 className="text-xl font-semibold">3. Zugriff auf die Website</h2>
          <p>
            Beim Besuch dieser Website werden automatisch technische Daten erfasst. 
            Dazu gehören insbesondere:
          </p>
          <ul className="list-disc pl-6">
            <li>IP-Adresse</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Browsertyp und Version</li>
            <li>Betriebssystem</li>
          </ul>
          <p>
            Diese Daten dienen der technischen Bereitstellung, Stabilität und Sicherheit 
            der Website und werden nicht zur Identifikation einzelner Personen verwendet.
          </p>
        </section>

        {/* Hosting */}
        <section>
          <h2 className="text-xl font-semibold">4. Hosting</h2>
          <p>
            Diese Website wird über GitHub Pages betrieben. Anbieter ist GitHub, Inc., 
            88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.
          </p>
          <p>
            Beim Zugriff auf die Website können durch GitHub technische Daten verarbeitet werden.
          </p>
        </section>

        {/* Formular */}
        <section>
          <h2 className="text-xl font-semibold">5. Kontaktformular</h2>
          <p>
            Wenn Sie uns über das Kontaktformular kontaktieren, werden die von Ihnen 
            eingegebenen Daten (Name, E-Mail-Adresse und Nachricht) zur Bearbeitung 
            Ihrer Anfrage verwendet.
          </p>
          <p>
            Die Angabe dieser Daten erfolgt freiwillig. Ohne diese Angaben können wir 
            Ihre Anfrage jedoch nicht bearbeiten.
          </p>
        </section>

        {/* Drittanbieter */}
        <section>
          <h2 className="text-xl font-semibold">6. Nutzung von Drittanbietern</h2>
          <p>
            Zur Verarbeitung von Kontaktanfragen kann ein externer Dienst (z. B. Formspree) 
            eingesetzt werden. Die eingegebenen Daten werden dabei an diesen Dienst 
            übermittelt und zur Bearbeitung Ihrer Anfrage verwendet.
          </p>
        </section>

        {/* Ausland */}
        <section>
          <h2 className="text-xl font-semibold">7. Datenübermittlung ins Ausland</h2>
          <p>
            Im Rahmen der Nutzung von GitHub Pages und externen Diensten kann es zu 
            einer Übermittlung von personenbezogenen Daten in Länder außerhalb der 
            Schweiz oder der Europäischen Union (z. B. USA) kommen.
          </p>
        </section>

        {/* Rechtsgrundlage */}
        <section>
          <h2 className="text-xl font-semibold">8. Rechtsgrundlage</h2>
          <p>
            Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage von Art. 6 Abs. 1 DSGVO, 
            soweit dies für die Bearbeitung von Anfragen oder die Bereitstellung der Website erforderlich ist.
          </p>
        </section>

        {/* Speicherung */}
        <section>
          <h2 className="text-xl font-semibold">9. Speicherdauer</h2>
          <p>
            Personenbezogene Daten werden nur so lange gespeichert, wie dies zur 
            Erfüllung der jeweiligen Zwecke erforderlich ist oder gesetzliche 
            Aufbewahrungspflichten bestehen.
          </p>
        </section>

        {/* Rechte */}
        <section>
          <h2 className="text-xl font-semibold">10. Ihre Rechte</h2>
          <p>
            Sie haben das Recht:
          </p>
          <ul className="list-disc pl-6">
            <li>Auskunft über Ihre gespeicherten Daten zu erhalten</li>
            <li>unrichtige Daten berichtigen zu lassen</li>
            <li>die Löschung Ihrer Daten zu verlangen</li>
          </ul>
          <p>
            Bei Fragen können Sie uns jederzeit unter der oben angegebenen E-Mail-Adresse kontaktieren.
          </p>
        </section>

        {/* Sicherheit */}
        <section>
          <h2 className="text-xl font-semibold">11. Datensicherheit</h2>
          <p>
            Wir treffen angemessene technische und organisatorische Maßnahmen, um Ihre Daten 
            vor Verlust, Missbrauch oder unbefugtem Zugriff zu schützen.
          </p>
        </section>

        {/* Änderungen */}
        <section>
          <h2 className="text-xl font-semibold">12. Änderungen</h2>
          <p>
            Diese Datenschutzerklärung kann jederzeit angepasst werden, um rechtlichen 
            Anforderungen oder Änderungen unserer Website zu entsprechen.
          </p>
        </section>

        <p className="text-sm text-neutral-500">
          Stand: April 2026
        </p>
      </div>
    </main>
  );
}
