import React from "react";
import "./App.css";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import CaseStudies from "./components/CaseStudies";
import Testimonials from "./components/Testimonials";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function AppContent() {
  const { isMobileMenuOpen } = useTheme();

  return (
    <div className="App min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header />
      <main className={`transition-all duration-300 ${isMobileMenuOpen ? 'pt-64 md:pt-0' : ''}`}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CaseStudies />
        <Testimonials />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;