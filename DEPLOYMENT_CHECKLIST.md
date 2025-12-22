# Deployment Checklist

## Prerequisites

- [ ] GitHub account
- [ ] Render account
- [ ] Vercel account
- [ ] Domain names (optional)

## Backend Deployment (Render)

### 1. Repository Preparation
- [ ] Fork the repository to your GitHub account
- [ ] Update CORS settings in `backend/app.py` with your Vercel domain
- [ ] Commit and push changes

### 2. Render Setup
- [ ] Log in to Render Dashboard
- [ ] Click "New +" and select "Web Service"
- [ ] Connect your GitHub repository
- [ ] Configure service settings:
  - **Name**: visualai-backend (or your preferred name)
  - **Region**: Choose the closest region
  - **Branch**: main (or your deployment branch)
  - **Root Directory**: backend
  - **Environment**: Python
  - **Build Command**: `pip install -r requirements.txt`
  - **Start Command**: `uvicorn app:app --host 0.0.0.0 --port $PORT`
- [ ] Add environment variables (if needed)
- [ ] Click "Create Web Service"

### 3. Post-Deployment
- [ ] Note the deployed URL (e.g., https://visualai-backend.onrender.com)
- [ ] Test the health endpoint: `GET /health`

## Frontend Deployment (Vercel)

### 1. Repository Preparation
- [ ] Ensure backend URL is updated in CORS settings
- [ ] Commit and push changes

### 2. Vercel Setup
- [ ] Log in to Vercel Dashboard
- [ ] Click "New Project"
- [ ] Import your GitHub repository
- [ ] Configure project settings:
  - **Project Name**: visualai-frontend (or your preferred name)
  - **Framework Preset**: Vite
  - **Root Directory**: frontend
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`
- [ ] Add environment variables:
  - **Key**: `VITE_API_URL`
  - **Value**: Your Render backend URL (e.g., https://visualai-backend.onrender.com)
- [ ] Click "Deploy"

### 3. Post-Deployment
- [ ] Note the deployed URL (e.g., https://visualai-frontend.vercel.app)
- [ ] Test the application functionality

## Final Testing

### Cross-Origin Testing
- [ ] Test image upload from frontend to backend
- [ ] Verify all API endpoints work correctly
- [ ] Check that CORS is properly configured

### Performance Testing
- [ ] Test with various image sizes
- [ ] Verify response times are acceptable
- [ ] Check error handling

## Optional Enhancements

### Custom Domains
- [ ] Purchase or configure custom domains
- [ ] Update DNS records
- [ ] Configure SSL certificates

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error tracking
- [ ] Set up performance monitoring

### Security
- [ ] Review and tighten CORS policies
- [ ] Implement rate limiting
- [ ] Add authentication if needed

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Verify backend CORS settings include your frontend domain
   - Check that environment variables are correctly set

2. **API Connection Failures**
   - Ensure backend is running
   - Verify VITE_API_URL is correctly set in Vercel
   - Check network connectivity

3. **Build Failures**
   - Check logs in Render/Vercel dashboards
   - Verify all dependencies are correctly specified
   - Ensure build commands are correct

### Support Resources
- Render Documentation: https://render.com/docs
- Vercel Documentation: https://vercel.com/docs
- FastAPI Documentation: https://fastapi.tiangolo.com/
- Vite Documentation: https://vitejs.dev/guide/