
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Success message
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll respond shortly.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };
  
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero 
          title={t('contact.title')} 
          subtitle={t('contact.subtitle')} 
          fullHeight={false}
          backgroundImage="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2670"
        />
        
        {/* Contact Information and Form */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-serif mb-6">Get in Touch</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex gap-4">
                    <div className="bg-hotel-beige p-3 rounded-sm">
                      <MapPin className="text-hotel-charcoal" />
                    </div>
                    <div>
                      <h3 className="font-medium">{t('contact.address')}</h3>
                      <p className="text-muted-foreground">{t('contact.addressValue')}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-hotel-beige p-3 rounded-sm">
                      <Mail className="text-hotel-charcoal" />
                    </div>
                    <div>
                      <h3 className="font-medium">{t('contact.email')}</h3>
                      <a 
                        href="mailto:koen@mm.com" 
                        className="text-muted-foreground hover:text-hotel-brown"
                      >
                        koen@mm.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-hotel-beige p-3 rounded-sm">
                      <Phone className="text-hotel-charcoal" />
                    </div>
                    <div>
                      <h3 className="font-medium">{t('contact.phone')}</h3>
                      <a 
                        href="tel:+31123456789" 
                        className="text-muted-foreground hover:text-hotel-brown"
                      >
                        {t('contact.phoneValue')}
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Map */}
                <div className="h-72 bg-hotel-beige rounded-sm overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2480.2348840326!2d3.6087922156986814!3d51.49912557963363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c490550073c6f3%3A0x6df59e6e5e2061c6!2sLange%20Noordstraat%2060%2C%204331%20CE%20Middelburg!5e0!3m2!1sen!2snl!4v1649849842429!5m2!1sen!2snl" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    title="Milde Maerten Hotel Map"
                  ></iframe>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-serif mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.form.name')}</Label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.form.email')}</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.form.message')}</Label>
                    <Textarea 
                      id="message" 
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      t('contact.form.submit')
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Contact;
