import React, { useCallback, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import SmoothScroll from "./components/motion/SmoothScroll";
import ScrollAnimations from "./components/motion/ScrollAnimations";
import Preloader from "./components/motion/Preloader";
import Cursor from "./components/motion/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import CaseStudies from "./components/CaseStudies";
import Skills from "./components/Skills";
import Credentials from "./components/Credentials";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  // Page animations wait until the intro has lifted (or was skipped).
  const [ready, setReady] = useState(false);
  const onIntroDone = useCallback(() => setReady(true), []);

  return (
    <ThemeProvider>
      <SmoothScroll />
      <ScrollAnimations ready={ready} />
      <Preloader onDone={onIntroDone} />
      <Cursor />
      <div className="App grain min-h-screen overflow-x-clip bg-paper font-sans text-ink-2 transition-colors duration-500">
        <Header />
        <main>
          <Hero ready={ready} />
          <Marquee />
          <About />
          <Experience />
          <Projects />
          <CaseStudies />
          <Skills />
          <Credentials />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
