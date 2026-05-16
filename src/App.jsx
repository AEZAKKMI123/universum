import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1>Fitness Club Universum</h1>
          <p>Tradicija snage i zdravlja od 1977. godine u srcu Sarajeva.</p>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#about" 
            className="btn"
          >
            Saznaj više
          </motion.a>
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
            <p>Naša misija je pružiti profesionalnu podršku svim članovima, bez obzira na nivo fizičke spremnosti. Uz stručno osoblje i najsavremenije sprave, vaš napredak je zagarantovan.</p>
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
            <div className="price">60 KM</div>
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
            <p><strong>Telefon:</strong> 033 867 591</p>
            <p><strong>Radno vrijeme:</strong></p>
            <p>Pon - Pet: 08:00 - 23:00</p>
            <p>Sub - Ned: 11:00 - 22:00</p>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
            </div>
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

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Fitness Club Universum Sarajevo. Sva prava zadržana.</p>
      </footer>
    </div>
  );
}

export default App;
