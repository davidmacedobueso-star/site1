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
import AdminPanel from './components/AdminPanel';

function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [siteContent, setSiteContent] = useState<any>(null);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setSiteContent(data);
    } catch (err) {
      console.error('Error fetching content:', err);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);


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
        <Header content={siteContent?.header} />
        <Products content={siteContent?.products} />
        <Services onContactClick={() => setContactModalOpen(true)} content={siteContent?.services} />
        <CTA content={siteContent?.cta} />
        <Environment content={siteContent?.environment} />
        <AboutUs content={siteContent?.about} />
        <FAQ content={siteContent?.faq} />
      </main>
    );
  };

  return (
    <>
    <div className={`font-sans min-h-screen selection:bg-yellow-400 selection:text-black transition-colors duration-300 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'}`}>
      <Navbar 
        onContactClick={() => setContactModalOpen(true)} 
        onAdminClick={() => setAdminModalOpen(true)} 
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      {renderPage()}
      <Footer onContactClick={() => setContactModalOpen(true)} onAdminClick={() => setAdminModalOpen(true)} />
    </div>
    <Modal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)}>
        <ContactForm onClose={() => setContactModalOpen(false)} />
    </Modal>
    <Modal isOpen={isAdminModalOpen} onClose={() => setAdminModalOpen(false)}>
        <AdminPanel onClose={() => setAdminModalOpen(false)} onProductAdded={() => {
          // If we are on catalog page, we might want to refresh, but Catalog fetches on mount
          // and we can force a refresh if needed by changing a key or just letting the user navigate
          if (window.location.hash === '#catalogo') {
            window.location.reload();
          }
        }} onContentUpdated={fetchContent} />
    </Modal>
    </>
  );
}

export default App;