# Vercel Deployment Guide

## 🚀 Deploy Frontend to Vercel

### **Step 1: Prepare Repository**
1. Make sure your code is pushed to GitHub: `https://github.com/Nitish-11k/Simple-Notes-App.git`

### **Step 2: Deploy to Vercel**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. **Import Git Repository:**
   - Select `https://github.com/Nitish-11k/Simple-Notes-App.git`
   - Click **"Import"**

### **Step 3: Configure Project**
1. **Framework Preset:** `Create React App`
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `build`
5. **Install Command:** `npm install`

### **Step 4: Environment Variables**
Add this environment variable:
- **Name:** `REACT_APP_API_URL`
- **Value:** `https://your-render-backend-url.onrender.com`

### **Step 5: Deploy**
1. Click **"Deploy"**
2. Wait for deployment to complete
3. Copy the generated Vercel URL

### **Step 6: Update Backend CORS**
1. Go back to your Render backend service
2. Update the `FRONTEND_URL` environment variable with your Vercel URL
3. Redeploy the backend

## 🔧 **Environment Variables Summary:**

### **Render (Backend):**
- `SPRING_PROFILES_ACTIVE=prod`
- `DATABASE_PASSWORD=[generated password]`
- `FRONTEND_URL=https://your-vercel-app.vercel.app`

### **Vercel (Frontend):**
- `REACT_APP_API_URL=https://your-render-backend.onrender.com`

## ✅ **Benefits of This Setup:**
- **Vercel:** Excellent for React apps, fast CDN, automatic deployments
- **Render:** Great for Spring Boot APIs, persistent database
- **Better Performance:** Each service optimized for its purpose
- **Easier Management:** Separate deployment pipelines

## 🔗 **Final URLs:**
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-backend.onrender.com`
