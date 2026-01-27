import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import {Home,About,Project,Contact} from "./components/pages/page";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import AIAssistant from "./components/AIAssistant";


function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <main>
          <Router>
            <Nav/>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/project" element={<Project/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
            </Routes>
            <AIAssistant />
          </Router>
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
