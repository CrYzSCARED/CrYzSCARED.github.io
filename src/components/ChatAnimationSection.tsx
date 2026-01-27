import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import chatImage from '@/assets/chat-demo-background.jpg';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

// Exactly 4 messages - alternating bot/user
const chatMessages: ChatMessage[] = [
  { sender: 'bot', text: 'Hallo! Wie kann ich dir helfen?' },
  { sender: 'user', text: 'Seid ihr am Wochenende offen?' },
  { sender: 'bot', text: 'Ja, aber nur am Samstag.' },
  { sender: 'user', text: 'Top Danke ⭐⭐⭐⭐⭐' },
];

const ChatAnimationSection = () => {
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for 50% visibility
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Animation logic - only runs when in view
  useEffect(() => {
    if (!isInView) return;

    if (isResetting) {
      const resetTimer = setTimeout(() => {
        setVisibleCount(0);
        setIsResetting(false);
      }, 800);
      return () => clearTimeout(resetTimer);
    }

    if (visibleCount < chatMessages.length) {
      const delay = visibleCount === chatMessages.length - 1 ? 1800 : 1400;
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const pauseTimer = setTimeout(() => {
        setIsResetting(true);
      }, 3000);
      return () => clearTimeout(pauseTimer);
    }
  }, [visibleCount, isResetting, isInView]);

  // Reset animation when leaving view
  useEffect(() => {
    if (!isInView) {
      setVisibleCount(0);
      setIsResetting(false);
    }
  }, [isInView]);

  const isMessageVisible = (index: number) => {
    if (isResetting) return false;
    return visibleCount > index;
  };

  // Split messages into left (bot) and right (user) for desktop
  const leftMessages = chatMessages.filter(m => m.sender === 'bot');
  const rightMessages = chatMessages.filter(m => m.sender === 'user');

  return (
    <section ref={sectionRef} className="relative pt-8 md:pt-12 pb-16 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            180deg, 
            hsl(var(--background)) 0%, 
            hsl(var(--muted) / 0.15) 30%,
            hsl(var(--muted) / 0.25) 60%,
            hsl(var(--muted) / 0.15) 85%,
            hsl(var(--background)) 100%
          )`,
        }}
      />

      <div className="container relative mx-auto px-4 md:px-6 lg:px-12 max-w-6xl">
        
        {/* MOBILE LAYOUT - Chat bubbles overlaid on image */}
        <div className="md:hidden flex flex-col items-center">
          <div className="relative w-full max-w-[320px]">
            {/* Image */}
            <img
              src={chatImage}
              alt="Professional workspace"
              className="w-full h-auto rounded-2xl object-cover shadow-xl"
            />
            
            {/* Soft overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 via-transparent to-black/5" />

            {/* Chat bubbles overlaid on image */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-3 py-4 gap-3">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`w-full max-w-[90%] px-3 py-2 rounded-xl
                    ${message.sender === 'bot' 
                      ? 'bg-white/90 text-foreground rounded-bl-sm self-start' 
                      : 'bg-primary/90 text-primary-foreground rounded-br-sm self-end'
                    }
                    text-xs font-medium leading-snug
                    shadow-md backdrop-blur-sm
                    transition-all duration-500 ease-out 
                    ${isMessageVisible(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-2'
                    }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT - Original side-by-side layout */}
        <div className="hidden md:flex justify-center items-center">
          {/* Scalable container */}
          <div
            className="relative origin-center"
            style={{ transform: 'scale(var(--chat-scale, 1))' }}
          >
            {/* Responsive scaling for desktop */}
            <style>{`
              :root {
                --chat-scale: 0.88;
              }
              @media (min-width: 1024px) {
                :root {
                  --chat-scale: 1;
                }
              }
            `}</style>

            {/* Central Image */}
            <div className="relative">
              <img
                src={chatImage}
                alt="Professional workspace"
                className="w-[420px] h-auto rounded-2xl object-cover shadow-xl"
              />

              {/* Soft overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 via-transparent to-black/5" />

              {/* Bot messages - LEFT side */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[90%] flex flex-col gap-12 items-end pr-3">
                {leftMessages.map((message, index) => {
                  const originalIndex = chatMessages.findIndex(
                    (m, i) => m.sender === 'bot' && chatMessages.slice(0, i + 1).filter(x => x.sender === 'bot').length === index + 1
                  );
                  return (
                    <div
                      key={index}
                      className={`max-w-[320px] px-6 py-5 rounded-2xl rounded-br-md 
                        bg-white/75 backdrop-blur-sm text-foreground
                        text-lg font-medium leading-relaxed
                        shadow-[0_6px_24px_-6px_rgba(0,0,0,0.1)]
                        border border-white/40
                        transition-all duration-700 ease-out 
                        ${isMessageVisible(originalIndex) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                    >
                      {message.text}
                    </div>
                  );
                })}
              </div>

              {/* User messages - RIGHT side */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[90%] flex flex-col gap-12 items-start pl-3">
                {rightMessages.map((message, index) => {
                  const originalIndex = chatMessages.findIndex(
                    (m, i) => m.sender === 'user' && chatMessages.slice(0, i + 1).filter(x => x.sender === 'user').length === index + 1
                  );
                  return (
                    <div
                      key={index}
                      className={`max-w-[320px] px-6 py-5 rounded-2xl rounded-bl-md 
                        bg-primary/80 backdrop-blur-sm text-primary-foreground
                        text-lg font-medium leading-relaxed
                        shadow-[0_6px_24px_-6px_rgba(0,0,0,0.12)]
                        border border-primary/30
                        transition-all duration-700 ease-out 
                        ${isMessageVisible(originalIndex) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                    >
                      {message.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Link */}
        <div className="mt-12 md:mt-20 lg:mt-28 text-center">
          <Link
            to="/ueber-mich"
            className="inline-flex items-center gap-3 text-primary hover:text-foreground transition-colors duration-300 group text-base md:text-lg"
          >
            <span className="tracking-wide">Mehr über mich erfahren</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChatAnimationSection;