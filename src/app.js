import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/theme-context';
import Header from './components/header';
import Hero from './components/hero';
import About from './components/about';
import Services from './components/services';
import Roadmap from './components/roadmap';
import AITools from './components/ai-tools';
import FAQ from './components/faq';
import Contact from './components/contact';
import Footer from './components/footer';
import { AI_TOOLS_ENABLED } from './utils/ai-tools-config';
import './styles/global.css';
import { db } from './utils/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

console.log('App.js is being executed');

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "your-collection"));
      const docs = querySnapshot.docs.map(doc => doc.data());
      setData(docs);
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        <Header showAITools={AI_TOOLS_ENABLED} />
        <Hero />
        <About id="about" />
        <Services id="services" />
        <Roadmap id="roadmap" />
        {AI_TOOLS_ENABLED && <AITools id="ai-tools" />}
        <FAQ id="faq" />
        <Contact id="contact" />
        <Footer showAITools={AI_TOOLS_ENABLED} />
        <div>
          <h1>Firebase Data</h1>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
