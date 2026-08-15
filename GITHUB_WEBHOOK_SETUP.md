# GitHub Webhook & CI/CD Setup Guide

## For Local Jenkins Testing

Since ngrok is blocked by Windows Defender, here are alternatives:

### Option 1: Use ngrok.com (Recommended)
1. Sign up at [ngrok.com](https://ngrok.com)
2. Verify your email
3. Get your auth token from dashboard
4. Run:
   ```powershell
   ngrok config add-authtoken YOUR_AUTH_TOKEN
   ngrok http 8080
   ```
5. Copy the forwarding URL (e.g., `https://abc123xyz.ngrok.io`)

### Option 2: Use Exposy or LocalTunnel
```powershell
# Install LocalTunnel
npm install -g localtunnel

# Expose Jenkins
lt --port 8080
```

### Option 3: Deploy Jenkins to Cloud
- **Heroku** (free tier)
- **AWS EC2**
- **Azure VM**
- **DigitalOcean**

---

## GitHub Webhook Setup

Once you have your Payload URL:

1. Go to GitHub → **Your Repository**
2. **Settings** → **Webhooks** → **Add webhook**
3. Fill in:
   - **Payload URL**: `https://YOUR_NGROK_URL/github-webhook/`
   - **Content type**: `application/json`
   - **Which events**: Push events
   - **Active**: ✓ Checked
4. Click **Add webhook**

---

## Jenkins Configuration

1. Open your Jenkins job → **Configure**
2. Under **Build Triggers**, check:
   - ✓ **GitHub hook trigger for GITScm polling**
3. Save

---

## Test Connection

In GitHub Webhooks page:
- ✓ **Green checkmark** = Success
- ✗ **Red X** = Failed (check URL and Jenkins status)

---

## Current Repository
- **GitHub**: https://github.com/venu-madhav-mahadevu/Test_Scripts.git
- **Branch**: main
- **Jenkinsfile**: Configured for Playwright tests
