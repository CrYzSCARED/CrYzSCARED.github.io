import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const WorkSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const highlights = [
    {
      title: 'Klare Kommunikation',
      description: 'Meine Arbeit konzentriert sich darauf, Unternehmen dabei zu unterstützen, ihre digitale Kommunikation klarer, strukturierter und effizienter zu gestalten.',
    },
    {
      title: 'Intelligente Unterstützung',
      description: 'KI-Chatbots helfen Besuchern, schneller die richtigen Informationen zu finden, entlasten Support-Teams und verbessern die Nutzererfahrung auf Websiten.',
    },
    {
      title: 'Gezielte Führung',
      description: 'Statt komplizierter Navigationen schaffen Chatbots Orientierung, beantworten Fragen in Echtzeit und führen potenzielle Kunden gezielt zu den richtigen Inhalten.',
    },
  ];

  return (
    <section 
      ref={ref}
      className="relative pt-20 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-24 section-alt"
    >
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      {/* Soft gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
        background: `linear-gradient(180deg, transparent 0%, hsl(var(--background)) 100%)`
      }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
        <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-px bg-primary" />
            <span className="text-primary text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">Meine Arbeit</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-10 sm:mb-16">
            Digitale Kommunikation <br className="hidden sm:block" />
            <span className="text-muted-foreground">neu gedacht</span>
          </h2>
          
          {/* Content Grid - single column on mobile */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-8 md:gap-12">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Decorative number */}
                <span className="absolute -top-2 -left-2 text-5xl sm:text-7xl font-serif text-primary/10 select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                
                <div className="relative pt-6 sm:pt-8">
                  <h3 className="font-serif text-lg sm:text-xl text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
