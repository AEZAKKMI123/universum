import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, CheckCircle, Quote, Menu, X, Mail, Send } from 'lucide-react';
import './App.css';

// Using real high-quality gym photos instead of AI generated ones
const heroImg = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop';
const weightsImg = 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop';
const cardioImg = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const slideDown = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.2 } },
  viewport: { once: true }
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'contact'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (e, page, sectionId) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (page === 'home') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        // Let the state update and then scroll to the section
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } else if (page === 'contact') {
      setCurrentPage('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Hvala vam! Vaša poruka je uspješno poslana. Javićemo vam se uskoro.');
    e.target.reset();
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="nav-logo"
            onClick={(e) => handleNavClick(e, 'home', 'home')}
            style={{ cursor: 'pointer' }}
          >
            UNIVERSUM
          </motion.div>
          
          {/* Mobile Menu Button */}
          <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>

          <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={(e) => handleNavClick(e, 'home', 'home')} className={currentPage === 'home' ? 'active' : ''}>Početna</a></li>
            <li><a href="#about" onClick={(e) => handleNavClick(e, 'home', 'about')}>O nama</a></li>
            <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'home', 'gallery')}>Galerija</a></li>
            <li><a href="#pricing" onClick={(e) => handleNavClick(e, 'home', 'pricing')}>Cjenovnik</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={currentPage === 'contact' ? 'active' : ''}>Kontakt</a></li>
          </ul>

          {/* Mobile Overlay */}
          {isMobileMenuOpen && (
            <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
          )}
        </div>
      </nav>

      {/* Main Pages Conditional Rendering */}
      {currentPage === 'home' ? (
        <>
          {/* Hero Section */}
          <section id="home" className="hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${heroImg})` }}>
            <motion.div 
              {...slideDown}
              className="hero-content"
            >
              <h1>Fitness Club Universum</h1>
              <p>Tradicija snage i zdravlja od 1977. godine u srcu Sarajeva.</p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="hero-btns"
              >
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#about" 
                  onClick={(e) => handleNavClick(e, 'home', 'about')}
                  className="btn"
                >
                  Saznaj više
                </motion.a>
              </motion.div>
            </motion.div>
          </section>

          {/* About Section */}
          <motion.section 
            {...fadeIn}
            id="about" 
            className="about"
          >
            <div className="section-header">
              <h2>O nama</h2>
              <div className="underline"></div>
            </div>
            <div className="about-content">
              <div className="about-text">
                <p>Fitness Club Universum je jedan od najstarijih i najprepoznatljivijih fitnes centara u Sarajevu. Smješteni u modernom objektu Unipromet, nudimo vrhunsku opremu i atmosferu koja motiviše.</p>
                <p>Naša misija je pružiti profesionalnu podršku svim članovima. Uz stručno osoblje i najsavremenije sprave, vaš napredak je zagarantovan.</p>
                <div className="features">
                  <div className="feature"><CheckCircle size={18} /> 1000m² prostora</div>
                  <div className="feature"><CheckCircle size={18} /> Cardio zona</div>
                  <div className="feature"><CheckCircle size={18} /> Slobodni tegovi</div>
                  <div className="feature"><CheckCircle size={18} /> Stručni treneri</div>
                </div>
              </div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="about-image"
              >
                <img src={weightsImg} alt="Gym weights" />
              </motion.div>
            </div>
          </motion.section>

          {/* Gallery Section */}
          <motion.section 
            {...fadeIn}
            id="gallery" 
            className="gallery"
          >
            <div className="section-header">
              <h2>Galerija</h2>
              <div className="underline"></div>
            </div>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="gallery-grid"
            >
              {[heroImg, cardioImg, weightsImg, heroImg].map((img, i) => (
                <motion.div 
                  key={i}
                  variants={fadeIn}
                  className="gallery-item"
                >
                  <img src={img} alt={`Gallery ${i + 1}`} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Testimonials Section */}
          <section className="testimonials">
            <div className="section-header">
              <h2>Šta kažu naši članovi</h2>
              <div className="underline"></div>
            </div>
            <div className="testimonials-grid">
              <motion.div {...fadeIn} className="testimonial-card">
                <Quote className="quote-icon" />
                <p>"Jedna od najboljih teretana u gradu. Atmosfera je vrhunska, a sprave su uvijek u odličnom stanju."</p>
                <h4>Marko M.</h4>
              </motion.div>
              <motion.div {...fadeIn} className="testimonial-card">
                <Quote className="quote-icon" />
                <p>"Osoblje je jako ljubazno i stručno. Pomogli su mi da postignem svoje ciljeve brže nego što sam očekivao."</p>
                <h4>Selma H.</h4>
              </motion.div>
              <motion.div {...fadeIn} className="testimonial-card">
                <Quote className="quote-icon" />
                <p>"Sve preporuke za Universum. Prostor je čist, prostran i ima sve što je potrebno za pravi trening."</p>
                <h4>Amir K.</h4>
              </motion.div>
            </div>
          </section>

          {/* Pricing Section */}
          <motion.section 
            {...fadeIn}
            id="pricing" 
            className="pricing"
          >
            <div className="section-header">
              <h2>Cjenovnik</h2>
              <div className="underline"></div>
            </div>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="pricing-cards"
            >
              <motion.div variants={fadeIn} className="pricing-card">
                <h3>Dnevna karta</h3>
                <div className="price">10 KM</div>
                <ul>
                  <li>Jednokratni ulaz</li>
                  <li>Sva oprema dostupna</li>
                  <li>Korištenje tuševa</li>
                </ul>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="btn-outline">Odaberi</a>
              </motion.div>
              <motion.div variants={fadeIn} className="pricing-card active">
                <div className="popular">Najpopularnije</div>
                <h3>Mjesečna</h3>
                <div className="price">70 KM</div>
                <ul>
                  <li>Neograničen broj dolazaka</li>
                  <li>Cardio i Snaga</li>
                  <li>Ormarić i Tuš</li>
                </ul>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="btn">Odaberi</a>
              </motion.div>
              <motion.div variants={fadeIn} className="pricing-card">
                <h3>Studenti</h3>
                <div className="price">50 KM</div>
                <ul>
                  <li>Uz važeći index</li>
                  <li>Puni pristup</li>
                  <li>Neograničeno</li>
                </ul>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="btn-outline">Odaberi</a>
              </motion.div>
            </motion.div>
          </motion.section>
        </>
      ) : (
        /* Contact & Location Subpage */
        <div className="contact-page-wrapper">
          {/* Contact Hero Section with Dark Google Map Screenshot effect and Pinpoint */}
          <section className="contact-hero-map">
            <div className="map-container dark-map">
              <iframe 
                title="Google Maps Background"
                src="https://maps.google.com/maps?q=Fitness%20Club%20Universum,%20Marka%20Maruli%C4%87a%202,%20Sarajevo&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            {/* Dark overlay to make text readable, but lighter in center to emphasize pinpoint */}
            <div className="map-overlay-clean">
              
              {/* Pin exactly centered on the map coordinates (50% 50%) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="pulse-pin"
              >
                <MapPin size={40} color="#fff" strokeWidth={2.5} />
              </motion.div>

              {/* Text positioned lower so the pin stands out */}
              <motion.div 
                initial={{ opacity: 0, y: 40, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="map-center-info"
              >
                <h1>
                  Fitness Club Universum
                </h1>
                <p>
                  MARKA MARULIĆA 2, 71000 SARAJEVO
                </p>
              </motion.div>
            </div>
          </section>

          {/* Contact Details & Clean Form */}
          <section className="contact-details-section">
            <div className="clean-details-container">
              
              {/* Left Side: Contact Text & Info Boxes */}
              <div className="contact-text-content">
                <span className="subtitle">UVIJEK SMO TU ZA VAS</span>
                <h2>
                  Stupimo u <span>Kontakt.</span>
                </h2>
                <p>
                  Imate pitanja o treninzima, cijenama ili želite posjetiti naš klub? Pošaljite nam poruku i naš tim će Vam se javiti u najkraćem roku.
                </p>
                
                <div className="contact-info-boxes">
                  <div className="clean-info-box">
                    <Phone size={26} color="var(--accent-blue-light)" style={{ marginBottom: '10px' }} />
                    <span>NAZOVITE NAS</span>
                    <strong>033 867 591</strong>
                    <small>Pon-Pet: 08:00 - 23:00</small>
                  </div>
                  
                  <div className="clean-info-box">
                    <Mail size={26} color="var(--accent-blue-light)" style={{ marginBottom: '10px' }} />
                    <span>E-MAIL ADRESA</span>
                    <strong>info@universum.ba</strong>
                    <small>Odgovaramo brzo</small>
                  </div>
                </div>
              </div>

              {/* Right Side: Clean Message Form */}
              <motion.div 
                className="clean-form-wrapper"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <form onSubmit={handleContactSubmit} className="clean-form">
                  <div className="form-row">
                    <div className="input-field">
                      <label>IME I PREZIME</label>
                      <input type="text" placeholder="Jane Doe" required />
                    </div>
                    <div className="input-field">
                      <label>E-MAIL ADRESA</label>
                      <input type="email" placeholder="jane@example.com" required />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>PREDMET</label>
                    <input type="text" placeholder="Opći upit" required />
                  </div>
                  <div className="input-field">
                    <label>VAŠA PORUKA</label>
                    <textarea placeholder="Kako vam možemo pomoći?" rows="5" required></textarea>
                  </div>
                  <button type="submit" className="btn-submit-clean">
                    POŠALJI PORUKU <Send size={18} />
                  </button>
                </form>
              </motion.div>
            </div>
          </section>
        </div>
      )}

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <div className="nav-logo" onClick={(e) => handleNavClick(e, 'home', 'home')} style={{ cursor: 'pointer' }}>UNIVERSUM</div>
            <p>Vodeći fitnes klub u Sarajevu sa tradicijom od preko 45 godina. Postanite dio naše zajednice.</p>
            <div className="footer-socials">
              <a href="#" style={{ fontWeight: 'bold' }}>FB</a>
              <a href="#" style={{ fontWeight: 'bold' }}>IG</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Linkovi</h4>
            <ul>
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'home', 'home')}>Početna</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'home', 'about')}>O nama</a></li>
              <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'home', 'gallery')}>Galerija</a></li>
              <li><a href="#pricing" onClick={(e) => handleNavClick(e, 'home', 'pricing')}>Cjenovnik</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Kontakt</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Radno Vrijeme</h4>
            <p>Ponedjeljak - Petak: 08h - 23h</p>
            <p>Subota - Nedjelja: 11h - 22h</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Fitness Club Universum Sarajevo. Sva prava zadržana.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
