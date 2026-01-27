import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { Bot, MessageSquare, Puzzle, HeadphonesIcon, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  shortDescription: string;
  details: string[];
  isExpanded: boolean;
  onToggle: () => void;
  delay: number;
}

const ServiceCard = ({ icon, title, shortDescription, details, isExpanded, onToggle, delay }: ServiceCardProps) => {
  return (
    <div
      className="card-elevated rounded-lg overflow-hidden cursor-pointer group"
      onClick={onToggle}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-5 sm:p-6 md:p-8">
        {/* Icon */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
          <div className="text-primary">{icon}</div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Short Description */}
        <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{shortDescription}</p>

        {/* Expand/Collapse indicator */}
        <button className="inline-flex items-center gap-2 text-primary text-sm font-medium min-h-[44px] -ml-2 px-2">
          <span>{isExpanded ? "Weniger anzeigen" : "Mehr erfahren"}</span>
          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
        </button>

        {/* Expanded Details */}
        <div
          className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-96 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border/50" : "max-h-0"}`}
        >
          <ul className="space-y-3">
            {details.map((detail, index) => (
              <li key={index} className="flex items-start gap-3 text-muted-foreground text-sm sm:text-base">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Leistungen = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const services = [
    {
      icon: <Bot className="w-7 h-7" />,
      title: "KI-Chatbots für Websiten",
      shortDescription: "Intelligente Assistenten, die Ihre Website aufwerten und Besuchern sofort weiterhelfen.",
      details: [
        "Rund-um-die-Uhr Verfügbarkeit für Ihre Kunden",
        "Natürliche Konversationen in deutscher Sprache",
        "Personalisierte Antworten basierend auf Ihrem Unternehmen",
        "Entlastung Ihres Support-Teams durch automatisierte Erstberatung",
      ],
    },
    {
      icon: <MessageSquare className="w-7 h-7" />,
      title: "Automatisierte FAQ-Beantwortung",
      shortDescription: "Gemeinsam definieren wir häufig gestellte Fragen und automatisieren die Antworten.",
      details: [
        "Individuelle Analyse Ihrer häufigsten Kundenanfragen",
        "Gemeinsame Definition der Fragen und passenden Antworten",
        "Kontinuierliche Optimierung basierend auf Nutzerverhalten",
        "Reduzierung wiederkehrender Support-Anfragen",
      ],
    },
    {
      icon: <Puzzle className="w-7 h-7" />,
      title: "Einfache Integration",
      shortDescription: "Saubere, unkomplizierte Einbindung in Ihre bestehende Website ohne technischen Aufwand.",
      details: [
        "Keine komplexen technischen Anforderungen für Sie",
        "Kompatibel mit allen gängigen Website-Systemen",
        "Schnelle Implementierung innerhalb weniger Tage",
        "Nahtlose Anpassung an Ihr bestehendes Design",
      ],
    },
    {
      icon: <HeadphonesIcon className="w-7 h-7" />,
      title: "Support & Weiterentwicklung",
      shortDescription: "Kontinuierliche Betreuung, Updates und Hilfe bei Anpassungen oder Problemen.",
      details: [
        "Laufender technischer Support bei Fragen oder Problemen",
        "Regelmässige Updates und Verbesserungen",
        "Anpassungen an neue Anforderungen Ihres Unternehmens",
        "Persönlicher Ansprechpartner für alle Anliegen",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
          <div
            className={`transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Section Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-8 sm:w-12 h-px bg-primary" />
              <span className="text-primary text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">Leistungen</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 sm:mb-8">Was ich anbiete</h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 sm:mb-16 max-w-3xl">
              Individuelle KI-Chatbot-Lösungen für Unternehmen, die ihre Website optimieren und ihre Kundenkommunikation
              automatisieren möchten.
            </p>

            {/* Services Grid - single column on mobile */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  {...service}
                  isExpanded={expandedIndex === index}
                  onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leistungen;
