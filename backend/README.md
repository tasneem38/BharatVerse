# BharatVerse Backend API

AI-powered cultural companion for exploring Indian heritage, powered by Google Gemini.

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- PostgreSQL 13+
- Google Gemini API Key

### Installation

1. **Create virtual environment**
python -m venv venv
source venv/bin/activate # On macOS/Linux

venv\Scripts\activate # On Windows
2. **Install dependencies**
pip install -r requirements.txt

text

3. **Configure environment**
cp .env.example .env

Edit .env with your credentials
text

4. **Initialize database**
Create PostgreSQL database
createdb bharatverse

Run migrations
python init_db.py

Seed sample data (optional)
python seed_data.py

text

5. **Run the server**
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

text

## 📚 API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Chat
- `POST /api/chat/` - Chat with AI guide
- `GET /api/chat/history/{session_id}` - Get chat history

### Itinerary
- `POST /api/itinerary/generate` - Generate travel plan
- `GET /api/itinerary/` - Get user itineraries
- `GET /api/itinerary/{id}` - Get specific itinerary
- `DELETE /api/itinerary/{id}` - Delete itinerary

### Heritage
- `GET /api/heritage/states` - Get all states
- `GET /api/heritage/festivals` - Get festivals
- `GET /api/heritage/monuments` - Get monuments
- `GET /api/heritage/art-forms` - Get art forms
- `GET /api/heritage/search?q=query` - Search heritage

### Art
- `POST /api/art/generate` - Generate art description
- `GET /api/art/styles` - Get available art styles

### Translation
- `POST /api/translate/` - Translate text
- `GET /api/translate/languages` - Get supported languages

## 🗄️ Database Schema

### Tables
- **users** - User accounts
- **states** - Indian states
- **festivals** - Festival information
- **monuments** - Historical monuments
- **art_forms** - Traditional art forms
- **itineraries** - Travel plans
- **chat_history** - AI conversation logs

## 🔧 Configuration

Edit `.env` file:

DATABASE_URL=postgresql://user:pass@localhost:5432/bharatverse
SECRET_KEY=your-secret-key
GEMINI_API_KEY=your-gemini-api-key


## 🧪 Testing

Test Gemini connection
python -c "import google.generativeai as genai; genai.configure(api_key='YOUR_KEY'); print('✅ Gemini connected')"

Test database connection
python -c "from app.database import engine; engine.connect(); print('✅ Database connected')"

## 🚀 Deployment

### Using Render

1. Create new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables in Render dashboard
4. Deploy!

### Using Docker

Build image
docker build -t bharatverse-backend .

Run container
docker run -p 8000:8000 --env-file .env bharatverse-backend

## 🐛 Troubleshooting

**Database connection error**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env

**Gemini API error**
- Verify GEMINI_API_KEY is correct
- Check API quota limits

**Import errors**
- Ensure all `__init__.py` files exist
- Reinstall dependencies
