import { Link } from 'react-router-dom';
import innovaoneLogo from '@/assets/innovaone-logo.png';

const Footer = () => {
  return (
    <footer className="relative py-8 section-alt">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <img src={innovaoneLogo} alt="InnovaOne Intelligence" className="w-[140px] sm:w-[170px] md:w-[260px] h-auto" />
          </Link>
          
          {/* Navigation - stacked on small mobile, inline on larger */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            <Link 
              to="/leistungen" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-1"
            >
              Leistungen
            </Link>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <Link 
              to="/ueber-mich" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-1"
            >
              Über mich
            </Link>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <Link 
              to="/kontakt" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-1"
            >
              Kontakt
            </Link>
          </div>
          
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-muted-foreground/60 text-center">
            © {new Date().getFullYear()} Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
