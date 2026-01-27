import { ChevronDown } from 'lucide-react';
const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  return <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background with blur */}
      <div className="absolute inset-0 z-0 bg-neutral-800">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          // @ts-ignore - fetchPriority is valid but not in React types yet
          fetchPriority="high"
          className="w-full h-full object-cover blur-[6px] scale-105"
        >
          <source src="/videos/hero-new.mp4" type="video/mp4" />
        </video>
        
        {/* Soft neutral overlay - not white, not dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-500/25 via-neutral-600/20 to-neutral-700/30" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 lg:px-12 text-center max-w-5xl">
        <div className="animate-fade-up text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white" style={{
          textShadow: '0 2px 30px rgba(0,0,0,0.5), 0 4px 60px rgba(0,0,0,0.3)'
        }}>
            InnovaOne
          </h1>
          <p className="font-sans text-base sm:text-lg md:text-2xl lg:text-3xl font-medium tracking-[0.2em] sm:tracking-[0.35em] text-neutral-200 mt-2" style={{
          textShadow: '0 2px 20px rgba(0,0,0,0.5)'
        }}>
            INTELLIGENCE
          </p>
        </div>
        
        <div className="w-16 sm:w-24 h-px bg-white/80 mx-auto my-6 sm:my-8 animate-line-grow origin-left" />
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white leading-relaxed animate-fade-up-delay-1 max-w-3xl mx-auto px-2" style={{
        textShadow: '0 2px 20px rgba(0,0,0,0.4), 0 4px 40px rgba(0,0,0,0.2)'
      }}>KI-Chatbots, die eine Website strukturieren, Kunden entlasten und Prozesse vereinfachen.</p>
        
        <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-white/95 leading-relaxed animate-fade-up-delay-2 max-w-2xl mx-auto px-2" style={{
        textShadow: '0 1px 15px rgba(0,0,0,0.35)'
      }}>
          Ich entwickle KI-gestützte Chatbots, die Unternehmen dabei helfen, ihre Website übersichtlicher zu gestalten, Besucher gezielt zu führen und wiederkehrende Anfragen effizient zu automatisieren.
        </p>
      </div>

      {/* Scroll Indicator */}
      
    </section>;
};
export default HeroSection;