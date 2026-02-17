import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Products from './components/Products';
import Services from './components/Services';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import AboutUs from './components/AboutUs';
import Environment from './components/Environment';
import Footer from './components/Footer';
import Catalog from './pages/Catalog';
import Modal from './components/Modal';
import ContactForm from './components/ContactForm';

function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [isContactModalOpen, setContactModalOpen] = useState(false);


  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash;
      setRoute(newHash);

      // Scroll logic for sections
      if (newHash && newHash !== '#catalogo') {
        // Small delay to allow the DOM to render the home sections if we just came from Catalog
        setTimeout(() => {
          const id = newHash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else if (newHash === '#home') {
             window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 150);
      } else if (newHash !== '#catalogo') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check on load
    if (window.location.hash) {
      handleHashChange();
    } else {
        window.location.hash = '#home';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    if (route === '#catalogo') {
      return <Catalog />;
    }
    
    return (
      <main id="home">
        <Header />
        <Products />
        <Services onContactClick={() => setContactModalOpen(true)} />
        <CTA />
        <Environment />
        <AboutUs />
        <FAQ />
      </main>
    );
  };

  return (
    <>
    <div className="bg-[#0f0f0f] text-gray-200 font-sans min-h-screen selection:bg-sky-400 selection:text-black">
      <Navbar onContactClick={() => setContactModalOpen(true)} />
      {renderPage()}
      <Footer onContactClick={() => setContactModalOpen(true)} />
    </div>
    <Modal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)}>
        <ContactForm onClose={() => setContactModalOpen(false)} />
    </Modal>
    </>
  );
}

export default App;