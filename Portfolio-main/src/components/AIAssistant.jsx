import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { LanguageContext } from '../contexts/LanguageContext';
import { ThemeContext } from '../contexts/ThemeContext';
// Remove unused translations import
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaVolumeMute, FaTimes, FaExpand, FaCompress, FaLightbulb } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  
  const { language } = useContext(LanguageContext);
  const { isDarkMode: darkMode } = useContext(ThemeContext);
  // Remove unused 't' variable
  
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Quick questions for buttons
  const quickQuestions = [
    {
      question: "What are your technical skills?",
      prompt: "What are Tushar Kumar's technical skills and expertise?"
    },
    {
      question: "Tell me about your projects",
      prompt: "Tell me about Tushar Kumar's projects and portfolio"
    },
    {
      question: "What's your education?",
      prompt: "What is Tushar Kumar's educational background?"
    },
    {
      question: "What are you looking for?",
      prompt: "What kind of opportunities is Tushar Kumar looking for?"
    }
  ];

  // Initialize greeting message
  useEffect(() => {
    setMessages([{ 
      type: 'assistant', 
      content: `👋 **Hello! I'm Tushar's AI Assistant**\n\nI can tell you about Tushar's skills, projects, education, and experience as a Software Developer. Ask me anything or try these quick questions:` 
    }]);
  }, []);

  // Rest of your component code remains the same...
  // Make sure to remove any references to 't' or 'getLocalResponse' that are unused
  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCurrentMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, [language]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format message content
  const formatMessage = (content) => {
    if (!content) return '';
    
    let formatted = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
      .replace(/^#{1,6}\s*(.*?)$/gm, '<h3 class="font-bold text-base mt-2 mb-1">$1</h3>')
      .replace(/^[-•]\s*(.*?)$/gm, '<div class="flex items-start gap-2 my-1"><span class="text-blue-500 mt-1">•</span><span>$1</span></div>')
      .replace(/^(\d+)\.\s*(.*?)$/gm, '<div class="flex items-start gap-2 my-1"><span class="text-blue-500 font-medium">$1.</span><span>$2</span></div>');
    
    return formatted;
  };

// Get AI response using Gemini API via backend
const getAIResponse = async (message) => {
  try {
    setIsTyping(true);
    console.log('🔍 Starting getAIResponse for:', message);
    
    const requestLanguage = language === 'hi' ? 'hindi' : 'english';
    
    // Try multiple ports
    const portsToTry = [3001, 3002, 5000, 4000];
    let lastError = null;
    
    for (const port of portsToTry) {
      try {
        const API_URL = `http://localhost:${port}/api/ask`;
        console.log(`🔄 Trying port ${port}...`);
        
        const response = await axios.post(API_URL, {
          question: message,
          language: requestLanguage
        }, {
          timeout: 8000,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log(`✅ Connected to port ${port}!`);
        setIsTyping(false);
        
        if (response.data && response.data.answer) {
          return response.data.answer;
        }
      } catch (err) {
        lastError = err;
        console.log(`❌ Port ${port} failed:`, err.message);
        // Try next port
      }
    }
    
    // If all ports fail, use fallback
    throw new Error(`All ports failed. Last error: ${lastError?.message}`);
    
  } catch (error) {
    console.error('❌ All API connections failed:', error.message);
    setIsTyping(false);
    
    // Smart fallback based on question
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 I'm Tushar's AI Assistant.\n\n**Connection Issue:** I'm having trouble connecting to the backend server.\n\n**Quick Fix:**\n1. Change server.js port from 3001 to 3002\n2. Or kill process using: `taskkill /PID [PID] /F`\n\nMeanwhile, I can still answer basic questions!";
    }
    
    if (lowerMessage.includes('skill')) {
      return `**Tushar's Technical Skills:**\n\n• **Programming:** Python\n• **Frameworks:** Django, FastAPI\n• **AI/ML:** Generative AI, Gemini API, LangChain\n• **Databases:** PostgreSQL, SQL\n• **Tools:** Git, Docker, Linux, VS Code\n• **Concepts:** Data Structures & Algorithms, OOP, DBMS`;
    }
    
    if (lowerMessage.includes('project')) {
      return `**Tushar's Projects:**\n\n1. **Civic Complaint Portal** – Django, PostgreSQL web app\n2. **Resume AI** – AI-powered resume optimizer\n3. **Python Mastery** – AI-enhanced learning platform\n4. **Auto News Summarizer** – Real-time news analyzer\n5. **Chat-Zone** – Real-time AI chat application\n6. **GenAI Hub** – Multi-modal Generative AI platform\n7. **SmartOps** – Automated reporting system (60% efficiency gain)`;
    }
    
    if (lowerMessage.includes('education')) {
      return `**Education:**\n• **Degree:** B.Tech in Computer Science\n• **University:** Dr. Akhilesh Das Gupta Institute of Technology & Management (ADGITM), Delhi\n• **Duration:** 2021 - 2025\n• **CGPA:** 8.89/10\n• **Coursework:** Data Structures & Algorithms, OOP, OS, DBMS, Networks, Web Development, ML`;
    }
    
    if (lowerMessage.includes('contact')) {
      return `**Contact Information:**\n• **Email:** jangratushar348@gmail.com\n• **Phone:** +91 9354741487\n• **GitHub:** https://github.com/tushar-kumar-9354\n• **LinkedIn:** https://www.linkedin.com/in/tushar-kumar-a9354o/\n• **Portfolio:** https://tushar-portfolio-1.onrender.com`;
    }
    
    return `**Connection Error:** Backend server not reachable.\n\n**To Fix:**\n1. Open new terminal\n2. Kill port 3001: \`taskkill /PID [PID] /F\`\n3. Or change server.js to port 3002\n\n**Try asking:**\n• "What are your skills?"\n• "Tell me about your projects"\n• "What's your education?"`;
  }
};
  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = { type: 'user', content: currentMessage };
    setMessages(prev => [...prev, userMessage]);
    
    const messageToSend = currentMessage;
    setCurrentMessage('');
    setShowQuickQuestions(false);
    
    try {
      const response = await getAIResponse(messageToSend);
      const assistantMessage = { type: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak the response if voice is enabled
      if (voiceEnabled && synthRef.current && response) {
        const textResponse = response.replace(/<[^>]*>/g, '').replace(/\*\*/g, '');
        const utterance = new SpeechSynthesisUtterance(textResponse);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        synthRef.current.speak(utterance);
      }
    } catch (error) {
      const errorMessage = { 
        type: 'assistant', 
        content: 'I apologize, but I encountered an issue. Please try again or ask a different question.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleQuickQuestion = (questionObj) => {
    setCurrentMessage(questionObj.question);
    setShowQuickQuestions(false);
    
    // Add user message immediately
    const userMessage = { type: 'user', content: questionObj.question };
    setMessages(prev => [...prev, userMessage]);
    
    // Get AI response
    getAIResponse(questionObj.prompt || questionObj.question)
      .then(response => {
        const assistantMessage = { type: 'assistant', content: response };
        setMessages(prev => [...prev, assistantMessage]);
        
        // Speak the response if voice is enabled
        if (voiceEnabled && synthRef.current && response) {
          const textResponse = response.replace(/<[^>]*>/g, '').replace(/\*\*/g, '');
          const utterance = new SpeechSynthesisUtterance(textResponse);
          utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
          utterance.onstart = () => setIsSpeaking(true);
          utterance.onend = () => setIsSpeaking(false);
          synthRef.current.speak(utterance);
        }
      })
      .catch(error => {
        const errorMessage = { 
          type: 'assistant', 
          content: 'I apologize, but I encountered an issue. Please try again.' 
        };
        setMessages(prev => [...prev, errorMessage]);
      });
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (voiceEnabled && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const clearChat = () => {
    setMessages([{ 
      type: 'assistant', 
      content: `👋 **Hello! I'm Tushar's AI Assistant**\n\nI can tell you about Tushar's skills, projects, education, and experience as a Software Developer. Ask me anything or try these quick questions:` 
    }]);
    setShowQuickQuestions(true);
  };

  return (
    <>
      {/* Floating Assistant Button - ADDED BACK */}
      <div className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 ${isOpen ? 'hidden' : 'block'}`}>
        <div className="relative group animate-float">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-lg opacity-90 animate-pulse"></div>
          <div className="absolute inset-0 bg-white rounded-full blur-md opacity-30"></div>
          
          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-to-r from-blue-600 via-purple-700 to-pink-700 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-110 hover:rotate-12 border-2 border-white/30 animate-glow"
          >
            <div className="w-8 h-8 flex items-center justify-center text-3xl group-hover:animate-bounce drop-shadow-lg">
              <BsStars className="w-7 h-7" />
            </div>
            
            <div className="absolute inset-0 rounded-full bg-white opacity-30 scale-0 group-hover:scale-110 group-hover:opacity-0 transition-all duration-500"></div>
            <div className="absolute inset-0 rounded-full border-2 border-white/50 scale-110 animate-ping opacity-75"></div>
          </button>
          
          <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-2xl border border-gray-600">
            <div className="flex items-center space-x-2">
              <span>Ask about Tushar's skills & experience</span>
              <span className="text-lg">💬</span>
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className={`fixed ${isExpanded ? 'inset-4' : 'bottom-20 sm:bottom-4 right-4 w-80 sm:w-96 h-[420px] sm:h-[500px] max-h-[80vh]'} z-50 transition-all duration-500 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-white/10 to-black/10 rounded-2xl"></div>
          
          <div className={`relative h-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden flex flex-col`}>
            {/* Header */}
            <div className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gradient-to-r from-gray-900 to-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'} border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'} flex-shrink-0`}>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg">
                    <BsStars className="w-6 h-6" />
                  </div>
                  
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${darkMode ? 'border-gray-700' : 'border-white'} ${isListening ? 'bg-red-500 animate-pulse' : isSpeaking ? 'bg-blue-500 animate-bounce' : 'bg-green-500'}`}></div>
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Tushar's AI Assistant</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : isSpeaking ? 'bg-blue-500 animate-bounce' : 'bg-green-500'}`}></div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Online'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearChat}
                  className={`p-2 rounded-lg transition-all duration-300 ${darkMode 
                    ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                  title="Clear Chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                
                <button
                  onClick={toggleVoice}
                  className={`p-2 rounded-lg transition-all duration-300 ${voiceEnabled 
                    ? 'bg-green-500 text-white' 
                    : darkMode 
                      ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                  title={voiceEnabled ? 'Disable Voice' : 'Enable Voice'}
                >
                  {voiceEnabled ? <FaVolumeUp className="w-4 h-4" /> : <FaVolumeMute className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`p-2 rounded-lg transition-all duration-300 ${darkMode 
                    ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                  title={isExpanded ? 'Minimize' : 'Expand'}
                >
                  {isExpanded ? <FaCompress className="w-4 h-4" /> : <FaExpand className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto px-4 py-4 space-y-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.type === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm mr-3 flex-shrink-0">
                      <BsStars className="w-4 h-4" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-sm lg:max-w-md px-4 py-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : darkMode
                        ? 'bg-gray-700 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    {msg.type === 'assistant' ? (
                      <div 
                        className="text-sm leading-relaxed"
                        style={{ 
                          wordBreak: 'break-word',
                          lineHeight: '1.5'
                        }}
                        dangerouslySetInnerHTML={{ 
                          __html: formatMessage(msg.content)
                        }}
                      />
                    ) : (
                      <div className="text-sm leading-relaxed">
                        {msg.content}
                      </div>
                    )}
                  </div>
                  
                  {msg.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-sm ml-3 flex-shrink-0">
                      👤
                    </div>
                  )}
                </div>
              ))}
              
              {/* Quick Questions Suggestions */}
              {showQuickQuestions && messages.length <= 1 && (
                <div className="space-y-3">
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>
                    💡 Try asking about:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {quickQuestions.map((qa, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickQuestion(qa)}
                        className={`px-3 py-2 text-xs rounded-full transition-all duration-300 ${
                          darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 hover:from-blue-200 hover:to-purple-200'
                        } border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
                      >
                        {qa.question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm mr-3 flex-shrink-0">
                    <BsStars className="w-4 h-4" />
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {language === 'hi' ? 'तुषार के बारे में जानकारी दे रहा हूँ...' : 'Getting information about Tushar...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-white'} border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'} flex-shrink-0`}>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center mb-3 px-2 py-1 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
                <div className="flex items-center justify-center space-x-2">
                  <FaLightbulb className="text-yellow-500" />
                  <span>Ask about Tushar's skills, projects, education, or experience</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about Tushar's skills, projects, or experience..."
                    className={`w-full p-3 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500'
                    }`}
                  />
                  
                  {recognitionRef.current && (
                    <button
                      onClick={isListening ? stopListening : startListening}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded transition-all duration-300 ${
                        isListening 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : darkMode
                            ? 'bg-gray-500 text-gray-300 hover:bg-gray-400'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                      title={isListening ? 'Stop Listening' : 'Start Voice Input'}
                    >
                      {isListening ? <FaMicrophoneSlash className="w-3 h-3" /> : <FaMicrophone className="w-3 h-3" />}
                    </button>
                  )}
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;