import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, CheckCircle, Quote } from 'lucide-react';
import './App.css';
import heroImg from './assets/hero.png';
import weightsImg from './assets/weights.png';
import cardioImg from './assets/cardio.png';

const fadeIn = {
  initial: { opacity: 0, y: -100 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: "easeOut" }
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="nav-logo"
          >
            UNIVERSUM
          </motion.div>
          <ul className="nav-links">
            <li><a href="#home">Početna</a></li>
            <li><a href="#about">O nama</a></li>
            <li><a href="#gallery">Galerija</a></li>
            <li><a href="#pricing">Cjenovnik</a></li>
            <li><a href="#contact">Kontakt</a></li>
          </ul>
        </div>
      </nav>

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
              <div className="feature"><span>✓</span> 1000m² prostora</div>
              <div className="feature"><span>✓</span> Cardio zona</div>
              <div className="feature"><span>✓</span> Slobodni tegovi</div>
              <div className="feature"><span>✓</span> Stručni treneri</div>
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
            <a href="#contact" className="btn-outline">Odaberi</a>
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
            <a href="#contact" className="btn">Odaberi</a>
          </motion.div>
          <motion.div variants={fadeIn} className="pricing-card">
            <h3>Studenti</h3>
            <div className="price">50 KM</div>
            <ul>
              <li>Uz važeći index</li>
              <li>Puni pristup</li>
              <li>Neograničeno</li>
            </ul>
            <a href="#contact" className="btn-outline">Odaberi</a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        {...fadeIn}
        id="contact" 
        className="contact"
      >
        <div className="section-header">
          <h2>Kontakt</h2>
          <div className="underline"></div>
        </div>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Gdje se nalazimo?</h3>
            <p><strong>Adresa:</strong> Marka Marulića 2, Sarajevo (Unipromet)</p>
            <p><strong>Telefon:</strong> 033 867 591 / 062 123 079</p>
            <p><strong>Radno vrijeme:</strong></p>
            <p>Pon - Pet: 08:00 - 23:00</p>
            <p>Sub - Ned: 11:00 - 22:00</p>
          </div>
          <div className="contact-form">
            <form>
              <input type="text" placeholder="Vaše ime" required />
              <input type="email" placeholder="Vaš email" required />
              <textarea placeholder="Vaša poruka" rows="5" required></textarea>
              <button type="submit" className="btn">Pošalji poruku</button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <div className="nav-logo">UNIVERSUM</div>
            <p>Vodeći fitnes klub u Sarajevu sa tradicijom od preko 45 godina. Postanite dio naše zajednice.</p>
            <div className="footer-socials">
              <a href="#" style={{ fontWeight: 'bold' }}>FB</a>
              <a href="#" style={{ fontWeight: 'bold' }}>IG</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Linkovi</h4>
            <ul>
              <li><a href="#home">Početna</a></li>
              <li><a href="#about">O nama</a></li>
              <li><a href="#gallery">Galerija</a></li>
              <li><a href="#pricing">Cjenovnik</a></li>
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
