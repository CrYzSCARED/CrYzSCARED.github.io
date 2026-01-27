import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  const navItems = [{
    path: '/',
    label: 'Startseite'
  }, {
    path: '/leistungen',
    label: 'Leistungen'
  }, {
    path: '/ueber-mich',
    label: 'Über mich'
  }, {
    path: '/kontakt',
    label: 'Kontakt'
  }];
  return <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]' : 'bg-neutral-800/30'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className={`font-serif text-xl tracking-wide transition-colors duration-300 ${scrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'}`} style={!scrolled ? {
            textShadow: '0 1px 10px rgba(0,0,0,0.3)'
          } : undefined}>InnovaOne Intelligence</Link>

            <div className="hidden md:flex items-center gap-12">
              {navItems.map(item => <Link key={item.path} to={item.path} className={`relative text-sm tracking-[0.15em] uppercase transition-colors duration-300 py-2 ${scrolled ? location.pathname === item.path ? 'text-primary' : 'text-muted-foreground hover:text-foreground' : location.pathname === item.path ? 'text-white' : 'text-white/80 hover:text-white'}`} style={!scrolled ? {
              textShadow: '0 1px 8px rgba(0,0,0,0.3)'
            } : undefined}>
                  {item.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${scrolled ? 'bg-primary' : 'bg-white'} ${location.pathname === item.path ? 'w-full' : 'w-0'}`} />
                </Link>)}
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden p-2 transition-colors duration-300 ${scrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'}`} style={!scrolled ? {
            textShadow: '0 1px 8px rgba(0,0,0,0.3)'
          } : undefined} aria-label="Menü öffnen">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-background/95 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navItems.map((item, index) => <Link key={item.path} to={item.path} className={`text-2xl font-serif tracking-wide transition-all duration-500 ${location.pathname === item.path ? 'text-primary' : 'text-foreground hover:text-primary'}`} style={{
          transitionDelay: mobileMenuOpen ? `${index * 75}ms` : '0ms',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
          opacity: mobileMenuOpen ? 1 : 0
        }}>
              {item.label}
            </Link>)}
        </div>
      </div>
    </>;
};
export default Navigation;