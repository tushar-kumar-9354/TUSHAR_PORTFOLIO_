const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Try different ports
const PORT = findAvailablePort([3001, 3002, 5000, 4000, 3003]);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBYi-MJURUhIRFL4wp9qGjUskuZrHNSDgI';

// Function to find available port
function findAvailablePort(ports) {
  const net = require('net');
  
  for (let port of ports) {
    const server = net.createServer();
    
    try {
      server.listen(port);
      server.close();
      console.log(`✅ Port ${port} is available`);
      return port;
    } catch (err) {
      console.log(`⚠️ Port ${port} is in use, trying next...`);
      continue;
    }
  }
  
  // If all ports are taken, use a random high port
  const randomPort = 3000 + Math.floor(Math.random() * 1000);
  console.log(`🎲 Using random port: ${randomPort}`);
  return randomPort;
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
console.log(model)
console.log('✅ model initialized');
// Load Knowledge Base
let knowledgeBase = "";
async function loadKnowledgeBase() {
  try {
    const knowledgeBasePath = path.join(__dirname, 'tushar_knowledge_base.txt');
    knowledgeBase = await fs.readFile(knowledgeBasePath, 'utf-8');
    console.log('✅ Knowledge base loaded successfully');
  } catch (error) {
    console.error('❌ Error loading knowledge base:', error.message);
    knowledgeBase = "Tushar Kumar is a Software Developer skilled in Python, Django, FastAPI, and AI technologies.";
  }
}

// Find relevant context function
function findRelevantContext(question, knowledgeBase) {
  const lowerQuestion = question.toLowerCase();
  const sections = knowledgeBase.split('\n');
  const relevantLines = [];
  
  // Keywords to match
  const keywords = [
    'skill', 'tech', 'python', 'django', 'fastapi', 'ai',
    'project', 'portfolio', 'built',
    'education', 'college', 'university', 'degree', 'cgpa',
    'experience', 'work', 'job',
    'contact', 'email', 'phone', 'github', 'linkedin'
  ];
  
  sections.forEach(line => {
    const lowerLine = line.toLowerCase();
    
    // Direct match
    if (lowerLine.includes(lowerQuestion)) {
      relevantLines.push(line);
    }
    
    // Keyword match
    keywords.forEach(keyword => {
      if (lowerQuestion.includes(keyword) && lowerLine.includes(keyword)) {
        relevantLines.push(line);
      }
    });
  });
  
  // Fallback to important sections
  if (relevantLines.length < 5) {
    relevantLines.push(...sections.slice(0, 50));
  }
  
  return relevantLines.join('\n').substring(0, 3000);
}

app.post('/api/ask', async (req, res) => {
  try {
    const { question, language = 'english' } = req.body;
    
    if (!question || question.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Question is required',
        answer: 'Please ask a question about Tushar Kumar.'
      });
    }
    
    console.log(`📝 Question: ${question.substring(0, 100)}...`);
    
    // Find relevant context
    const context = findRelevantContext(question, knowledgeBase);
    
    // Create prompt
    const prompt = `You are an AI assistant for Tushar Kumar, a Software Developer.
Answer based ONLY on Tushar's information below:

TUSHAR'S INFORMATION:
${context}

QUESTION: ${question}

INSTRUCTIONS:
1. Answer based ONLY on the information above
2. If information is not available, politely say so
3. Format with bullet points if helpful
4. Keep response concise but informative
5. Language: ${language === 'hindi' ? 'Hindi' : 'English'}

ANSWER:`;
    
    // Generate response
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    console.log(`✅ Response generated`);
    
    res.json({
      answer: response,
      contextUsed: context.length > 0,
      serverPort: PORT
    });
    
  } catch (error) {
    console.error('❌ API Error:', error.message);
    console.error('Error details:', error);
    
    // Fallback response
    res.status(500).json({
      error: error.message,
      answer: "I apologize, but I'm having trouble accessing my knowledge base. You can ask about Tushar's skills, projects, or education."
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Tushar AI Assistant API is running',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Start server
loadKnowledgeBase().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀🚀🚀 SERVER RUNNING ON PORT: ${PORT} 🚀🚀🚀`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔗 API endpoint: http://localhost:${PORT}/api/ask`);
    console.log(`📢 IMPORTANT: Update AIAssistant.jsx to use port ${PORT}`);
    console.log(`👉 Change this line: const API_URL = 'http://localhost:${PORT}/api/ask';`);
  });
});