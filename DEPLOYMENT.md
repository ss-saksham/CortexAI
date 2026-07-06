# CortexAI Production Deployment Guide

This guide details the steps to build, configure, and deploy the CortexAI microservice backend and React frontend.

---

## 1. Backend Deployment (Docker Compose)

The backend is built as a set of Node.js microservices (Auth, Chat, Billing, Agent) routed through an API Gateway, backed by Redis and MongoDB.

### Prerequisites
* [Docker](https://www.docker.com/) and Docker Compose installed on your host system or VPS.
* A live MongoDB cluster URI (e.g. from MongoDB Atlas).
* Firebase Service Account keys.

### Environment Setup
Create a `.env` file in the root `backend` directory containing the following environment keys:

```ini
# Database & Security
MONGODB_URL="your-mongodb-production-uri"
JWT_SECRET="generate-a-long-random-string-for-jwt"

# AI Agent Service Keys
GOOGLE_API_KEY="your-gemini-google-api-key"
TAVILY_API_KEY="your-tavily-search-api-key"

# Razorpay Billing Keys
VITE_RAZORPAY_KEY="your-razorpay-key-id"
RAZORPAY_SECRET="your-razorpay-key-secret"
```

### Steps to Run
Navigate to the `backend` folder and run the production Docker Compose command to build and launch all services in detached mode:

```bash
cd backend
docker compose -f docker-compose.prod.yml up --build -d
```

This will automatically:
1. Spin up an isolated Redis container.
2. Build local Docker images for the Gateway, Auth, Chat, Billing, and Agent services.
3. Establish communication links using container-level hostnames (e.g., `http://auth:8001`, `redis://redis:6379`).
4. Expose the **API Gateway** to port `8000` (so you only need to expose port `8000` to the internet).

---

## 2. Frontend Deployment (Vercel)

The React client is a Single Page Application (SPA) built using Vite and Tailwind CSS.

### Configuration
We have created [vercel.json](file:///c:/Users/Saksham%20Singla/OneDrive/Desktop/cortex-ai/frontend/vercel.json) in the `frontend` folder to handle routing fallbacks.

### Setup Environment Variables
When deploying the frontend, register the following environment variables in your Vercel/Netlify project settings:

```ini
# Points to your production API Gateway (e.g., https://api.yourdomain.com)
VITE_API_URL="https://your-production-gateway-address:8000"

# Razorpay checkout key
VITE_RAZORPAY_KEY="your-razorpay-key-id"

# Firebase Client Configuration (matching firebase.js)
VITE_FIREBASE_API_KEY="your-firebase-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-app-id"
VITE_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-firebase-app-id"
```

### Deploy Commands
Vercel will auto-detect the Vite build. If configuring manually:
* **Build Command**: `npm run build`
* **Output Directory**: `dist`
