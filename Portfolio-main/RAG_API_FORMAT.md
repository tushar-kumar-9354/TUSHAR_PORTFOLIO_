# RAG Bot API Format

Your RAG bot server should run on `localhost:8000` and accept POST requests to `/message` endpoint.

## Expected Request Format

```json
POST http://localhost:8000/message
Content-Type: application/json

{
  "message": "What are tushar's skills?",
  "language": "en"  // or "hi" for Hindi
}
```

## Expected Response Format

```json
{
  "response": "tushar is a full-stack developer with expertise in React, Node.js, Three.js, and modern web technologies..."
}
```

OR

```json
{
  "message": "tushar is a full-stack developer with expertise in React, Node.js, Three.js, and modern web technologies..."
}
```

## Enhanced Error Handling

The frontend now provides user-friendly error messages for different scenarios:

### Connection Errors (Server Down)
- **Triggers:** ECONNREFUSED, ERR_NETWORK
- **User Message:** "🔧 Server is down - We'll be right back! Our RAG bot endpoint is currently unavailable..."

### Token Expiration (Gemini LLM)
- **HTTP Status:** 401, 403
- **User Message:** "🔑 Sorry, LLM tokens expired! Our Gemini LLM tokens have reached their limit. We'll be back online when the tokens are recharged!"

### Rate Limiting
- **HTTP Status:** 429
- **User Message:** "🚦 Rate limit exceeded. Too many requests at the moment. Our Gemini LLM needs a short break..."

### Server Errors
- **HTTP Status:** 500
- **User Message:** "⚠️ Internal server error. Our RAG bot encountered an internal issue. Don't worry, tushar will fix this soon!"

### Service Unavailable
- **HTTP Status:** 503
- **User Message:** "🔧 Service temporarily unavailable. Our custom RAG system is undergoing maintenance..."

### Timeout Errors
- **Trigger:** 30+ second timeout
- **User Message:** "⏱️ Processing timeout. The request took too long to process. Our Gemini LLM might be handling a complex query..."

## Features Integrated

- ✅ Axios HTTP client for API calls
- ✅ Language context (EN/HI) sent to server
- ✅ Enhanced error handling with user-friendly messages
- ✅ Loading states ("Consulting Gemini via RAG bot...")
- ✅ Voice synthesis for responses
- ✅ Bilingual support
- ✅ Custom RAG bot branding and info display
- ✅ Specific Gemini LLM token expiration handling
- ✅ Detailed system information in chat header

## UI Enhancements

### Chat Header
- Displays "AI Assistant" with online status
- Shows "🚀 Custom RAG Bot • Gemini LLM • Built by tushar"
- Real-time status indicators (online/listening/speaking)

### Chat Footer
- Info banner: "💡 Powered by custom RAG bot • Built in-house by tushar"

### Greeting Message
- "Hello! I'm your AI assistant powered by a custom RAG bot built from scratch by tushar using Gemini LLM"

### Loading States
- "Consulting Gemini via RAG bot..." with animated dots

## Test Your Server

1. Start your RAG bot server on port 8000
2. Test with curl:
```bash
curl -X POST http://localhost:8000/message \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "language": "en"}'
```

3. Expected response:
```json
{"response": "Hello! How can I help you?"}
```

## Testing Error Responses

### Test Token Expiration
Return HTTP 401/403 from your server:
```json
{"error": "Token expired", "message": "Gemini API quota exceeded"}
```

### Test Rate Limiting
Return HTTP 429 from your server:
```json
{"error": "Rate limited", "message": "Too many requests"}
```

## Usage

Once your server is running, the AI assistant will:
1. Send user messages to your RAG bot with language context
2. Display the RAG bot's responses with proper formatting
3. Handle errors gracefully with specific messages for different scenarios
4. Show detailed branding about your custom RAG system
5. Provide real-time feedback during API calls