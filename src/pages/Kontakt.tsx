import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useInView } from '@/hooks/useInView';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const Kontakt = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration
      // You need to replace these with your actual EmailJS credentials
      const serviceId = 'YOUR_SERVICE_ID'; // e.g., 'service_abc123'
      const templateId = 'YOUR_TEMPLATE_ID'; // e.g., 'template_xyz789'
      const publicKey = 'YOUR_PUBLIC_KEY'; // e.g., 'your_public_key'

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'info.innovaone@gmail.com',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast({
        title: "Nachricht gesendet",
        description: "Vielen Dank für Ihre Nachricht. Ich melde mich bald bei Ihnen.",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        title: "Fehler beim Senden",
        description: "Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per E-Mail.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Section Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-8 sm:w-12 h-px bg-primary" />
              <span className="text-primary text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">Kontakt</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 sm:mb-8">
              Lassen Sie uns sprechen
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 sm:mb-16 max-w-3xl">
              Sie möchten erfahren, wie ein KI-Chatbot Ihre Website optimieren kann? Gerne können wir Ihr Anliegen gemeinsam besprechen.
            </p>

            {/* Contact Grid - stacked on mobile */}
            <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
              {/* Contact Form */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 sm:py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Ihr Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 sm:py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="ihre@email.ch"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Nachricht
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 sm:py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                      placeholder="Wie kann ich Ihnen helfen?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Wird gesendet...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Nachricht senden</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="card-elevated rounded-lg p-6 sm:p-8">
                  <h3 className="font-serif text-lg sm:text-xl text-foreground mb-4 sm:mb-6">Direkt kontaktieren</h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">E-Mail</p>
                        <a
                          href="mailto:info.innovaone@gmail.com"
                          className="text-foreground hover:text-primary transition-colors duration-300 text-sm sm:text-base break-all"
                        >
                          info.innovaone@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Ich melde mich in der Regel innerhalb von 24 Stunden bei Ihnen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Kontakt;
