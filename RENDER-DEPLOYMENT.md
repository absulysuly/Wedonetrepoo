# 🎯 Render Deployment Guide

This guide will walk you through deploying your Wedonetrepoo application to Render, a modern cloud platform that's perfect for Node.js applications.

## 🚀 Quick Deploy (Recommended)

### Option 1: One-Click Deploy from GitHub

1. **Go to Render**: Visit [render.com](https://render.com)
2. **Sign in**: Create an account or sign in with GitHub
3. **Connect Repository**: 
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select the `absulysuly/wedonet` repository
4. **Auto-Configuration**: Render will detect your `render.yaml` and configure everything automatically
5. **Deploy**: Click "Create Web Service"

### Option 2: Manual Setup

1. **Create New Web Service**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `https://github.com/absulysuly/wedonet`

2. **Configure Service**:
   ```
   Name: wedonetrepoo
   Region: Oregon (or your preferred region)
   Branch: main
   Runtime: Node
   Build Command: npm ci
   Start Command: npm start
   ```

3. **Set Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render's default)

4. **Deploy**: Click "Create Web Service"

## 📋 Configuration Details

Your `render.yaml` is already configured with optimal settings:

```yaml
services:
  - type: web
    name: wedonetrepoo
    env: node
    region: oregon
    plan: free # 512 MB RAM, 0.1 CPU
    buildCommand: npm ci
    startCommand: npm start
    repo: https://github.com/absulysuly/wedonet
    branch: main
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
    healthCheckPath: /health
    autoDeploy: true
```

## 🔧 Environment Variables

### Required Variables (Already Set)
- `NODE_ENV=production`
- `PORT=10000`

### Optional Variables (Add if needed)
```bash
# In Render Dashboard → Environment
LOG_LEVEL=info
JWT_SECRET=your-secret-here
API_KEY=your-api-key
```

## 🎛️ Render Features You Get

### ✅ **Automatic Deployments**
- Auto-deploy on every git push to main branch
- Zero-downtime deployments
- Automatic rollback on failure

### ✅ **Free Tier Includes**
- 512 MB RAM
- 0.1 CPU units
- 750 hours/month (enough for personal projects)
- Global CDN
- Free SSL certificates
- DDoS protection

### ✅ **Built-in Monitoring**
- Application logs
- Metrics and analytics
- Health checks via `/health`
- Automatic service restart on crashes

### ✅ **Custom Domains (Optional)**
- Add your own domain
- Automatic SSL certificates
- DNS management

## 🔍 Monitoring Your Deployment

### 1. Check Deployment Status
- Go to Render Dashboard
- View build and deployment logs
- Monitor service health

### 2. Test Endpoints
Once deployed, test these endpoints:

```bash
# Replace YOUR_APP_NAME with your actual Render app name
curl https://YOUR_APP_NAME.onrender.com/
curl https://YOUR_APP_NAME.onrender.com/health
curl https://YOUR_APP_NAME.onrender.com/api/info
curl https://YOUR_APP_NAME.onrender.com/metrics
```

### 3. View Logs
```bash
# In Render Dashboard → Logs tab
# Or via CLI (if you install render CLI)
render logs -s YOUR_SERVICE_ID
```

## 🚦 Expected Deployment Flow

1. **Build Phase** (~2-3 minutes)
   ```
   Installing dependencies with npm ci...
   Build completed successfully
   ```

2. **Deploy Phase** (~30 seconds)
   ```
   Starting service...
   Health check passed at /health
   Service is live at https://your-app.onrender.com
   ```

3. **Health Check**
   - Render automatically monitors `/health`
   - Service marked as healthy when endpoint returns 200
   - Automatic restart if health checks fail

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Fails
**Problem**: NPM install errors
**Solution**:
- Check `package.json` has all required dependencies
- Verify Node.js version compatibility
- Check build logs in Render Dashboard

#### 2. Service Won't Start
**Problem**: Application crashes on startup
**Solution**:
- Check start command: `npm start`
- Verify port binding: `app.listen(PORT, '0.0.0.0')`
- Review application logs

#### 3. Health Check Failing
**Problem**: `/health` endpoint not responding
**Solution**:
- Verify health endpoint works locally
- Check if server is binding to correct port (10000)
- Review error logs

#### 4. Environment Variables Not Loading
**Problem**: App can't access env vars
**Solution**:
- Set variables in Render Dashboard → Environment
- Redeploy after adding variables
- Check variable names are correct

### Debug Steps

1. **Check Logs**: Render Dashboard → Logs tab
2. **Test Health Endpoint**: `curl https://your-app.onrender.com/health`
3. **Verify Environment**: Check environment variables in dashboard
4. **Local Testing**: Run `npm start` locally to verify it works

## 📊 Performance Tips

### 1. Free Tier Limitations
- Service sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds (cold start)
- 750 hours/month limit

### 2. Optimization
- Use `npm ci` for faster, consistent builds
- Implement proper error handling
- Use health checks for automatic recovery
- Monitor resource usage via `/metrics`

### 3. Scaling Options
```yaml
# In render.yaml - upgrade to paid plan
plan: starter # $7/month - no sleep, faster CPU
plan: standard # $25/month - more resources
```

## 🔗 Useful Links

- [Render Dashboard](https://dashboard.render.com/)
- [Render Documentation](https://render.com/docs)
- [Render Status](https://status.render.com/)
- [Node.js on Render](https://render.com/docs/node-js)

## 🆘 Support

### If Deployment Fails:
1. Check build logs in Render Dashboard
2. Verify all files are committed and pushed to GitHub
3. Test the application locally first
4. Check this troubleshooting guide
5. Contact Render support if needed

### Quick Health Check
```bash
# After deployment, verify these work:
curl https://your-app.onrender.com/health
# Should return: {"status":"healthy",...}

curl https://your-app.onrender.com/
# Should return: {"message":"Welcome to Wedonetrepoo!",...}
```

---

**🎉 Happy Deploying!** Your app should be live at `https://your-app-name.onrender.com` within 3-5 minutes.