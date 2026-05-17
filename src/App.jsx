import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, CheckCircle, Quote, Menu, X, Mail } from 'lucide-react';
import './App.css';
import heroImg from './assets/hero.png';
import weightsImg from './assets/weights.png';
import cardioImg from './assets/cardio.png';

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
          {/* Contact Hero Section with Dark Google Map */}
          <section className="contact-hero">
            <div className="map-container dark-map">
              <iframe 
                title="Google Maps"
                src="https://maps.google.com/maps?q=Fitness%20Club%20Universum,%20Marka%20Maruli%C4%87a%202,%20Sarajevo&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="contact-hero-overlay">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="contact-hero-content"
              >
                <span className="subtitle">Kontakt & Lokacija</span>
                <h1>Pronađite Svoju Snagu</h1>
                <p>Nalazimo se na lako dostupnoj lokaciji u zgradi Unipromet. Posjetite nas i započnite svoje fitnes putovanje.</p>
              </motion.div>
            </div>
          </section>

          {/* Contact Details & Premium Form */}
          <section className="contact-details-section">
            <div className="details-container">
              {/* Left Side: Info Cards */}
              <div className="info-grid">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="info-card"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="info-icon-wrapper">
                    <MapPin className="info-icon" size={28} />
                  </div>
                  <div className="info-text">
                    <h4>Adresa</h4>
                    <p>Marka Marulića 2</p>
                    <p>71000 Sarajevo, BiH</p>
                    <p className="highlight">Zgrada Unipromet</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="info-card"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="info-icon-wrapper">
                    <Phone className="info-icon" size={28} />
                  </div>
                  <div className="info-text">
                    <h4>Telefon</h4>
                    <p><a href="tel:033867591">033 867 591</a></p>
                    <p><a href="tel:062123079">062 123 079</a></p>
                    <p className="highlight">Nazovite nas za informacije</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="info-card"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="info-icon-wrapper">
                    <Clock className="info-icon" size={28} />
                  </div>
                  <div className="info-text">
                    <h4>Radno Vrijeme</h4>
                    <p><strong>Pon - Pet:</strong> 08:00 - 23:00</p>
                    <p><strong>Sub - Ned:</strong> 11:00 - 22:00</p>
                    <p className="highlight">Radimo i vikendom</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="info-card"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="info-icon-wrapper">
                    <Mail className="info-icon" size={28} />
                  </div>
                  <div className="info-text">
                    <h4>E-mail & Mreže</h4>
                    <p><a href="mailto:info@universum.ba">info@universum.ba</a></p>
                    <p>
                      <a href="#" className="social-link" style={{ color: 'var(--accent-blue-light)', fontWeight: 'bold' }}>Facebook</a>
                      <span style={{ margin: '0 8px', color: '#444' }}>|</span>
                      <a href="#" className="social-link" style={{ color: 'var(--accent-blue-light)', fontWeight: 'bold' }}>Instagram</a>
                    </p>
                    <p className="highlight">Pratite nas na mrežama</p>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Message Form */}
              <motion.div 
                className="contact-form-wrapper"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3>Pošaljite nam poruku</h3>
                <p className="form-desc">Imate pitanja ili želite zakazati trening? Ispunite formu ispod i javićemo Vam se u najkraćem roku.</p>
                <form onSubmit={handleContactSubmit} className="premium-form">
                  <div className="form-row">
                    <div className="input-group">
                      <input type="text" id="name" placeholder="Vaše ime" required />
                      <label htmlFor="name">Vaše ime</label>
                    </div>
                    <div className="input-group">
                      <input type="email" id="email" placeholder="Vaš email" required />
                      <label htmlFor="email">Vaš email</label>
                    </div>
                  </div>
                  <div className="input-group">
                    <input type="text" id="subject" placeholder="Predmet poruke" required />
                    <label htmlFor="subject">Predmet poruke</label>
                  </div>
                  <div className="input-group">
                    <textarea id="message" placeholder="Vaša poruka" rows="5" required></textarea>
                    <label htmlFor="message">Vaša poruka</label>
                  </div>
                  <button type="submit" className="btn btn-submit">
                    Pošalji Poruku
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
