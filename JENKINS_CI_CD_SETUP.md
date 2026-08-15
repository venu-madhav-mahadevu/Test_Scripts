# Jenkins CI/CD Setup Guide - Complete Instructions

## Step 1: Install Jenkins Locally

### Option A: Windows Installer (Recommended)
1. Download from [jenkins.io/download](https://www.jenkins.io/download/)
2. Choose **Windows** → Download `jenkins.msi`
3. Run the installer and follow the wizard:
   - Install as Windows Service
   - Default port: 8080
   - Run as Local System or your user account
4. Jenkins will start automatically after installation

### Option B: Docker (Alternative)
```powershell
docker pull jenkins/jenkins:lts
docker run -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```

### Option C: Manual Download (Any OS)
1. Download `jenkins.war` from [jenkins.io](https://www.jenkins.io/download/)
2. Run in PowerShell:
```powershell
java -jar jenkins.war --httpPort=8080
```

---

## Step 2: Initial Jenkins Setup

1. **Access Jenkins**: Open browser → `http://localhost:8080`
2. **Get Admin Password**:
   - Windows: `C:\Program Files\Jenkins\secrets\initialAdminPassword`
   - Linux/Mac: `~/.jenkins/secrets/initialAdminPassword`
3. **Create Admin Account**: Follow the setup wizard
4. **Install Suggested Plugins**: Click "Install suggested plugins"

---

## Step 3: Install Required Plugins

1. Go to **Manage Jenkins** → **Manage Plugins**
2. Search for and install:
   - **NodeJS Plugin**
   - **GitHub Plugin** (or **GitHub Integration Plugin**)
   - **Pipeline** (usually pre-installed)
   - **Blue Ocean** (optional, for better UI)

3. Click **Install without restart** or restart Jenkins

---

## Step 4: Configure Node.js Tool

1. Go to **Manage Jenkins** → **Tools**
2. Scroll to **NodeJS installations**
3. Click **Add NodeJS**:
   - **Name**: `NodeJS`
   - **Version**: Select LTS (e.g., v20.10.0)
   - Check "Install automatically"
4. Click **Save**

---

## Step 5: Create Jenkins Pipeline Job

1. Click **New Item**
2. **Job name**: `Playwright-CI-CD`
3. Select **Pipeline**
4. Click **OK**

### Configure Pipeline:
In the **Pipeline** section:
- **Definition**: Pipeline script from SCM
- **SCM**: Git
- **Repository URL**: 
  ```
  https://github.com/YOUR_USERNAME/your-repo.git
  ```
- **Branches to build**: `*/main` (or your default branch)
- **Script path**: `Jenkinsfile` (default)

Click **Save**

---

## Step 6: Test Manual Build

1. Click **Build Now** to verify everything works
2. Monitor the build in **Build History** (left panel)
3. Click on the build number to view console output
4. After completion, check **Playwright Test Report** link

---

## Step 7: GitHub Integration (Auto-trigger on Push)

### Add Webhook to GitHub:

1. Go to your GitHub repository
2. **Settings** → **Webhooks** → **Add webhook**
3. Configure:
   - **Payload URL**: `http://YOUR_JENKINS_URL:8080/github-webhook/`
     - Replace `YOUR_JENKINS_URL` with your machine IP (for remote) or `localhost` (local testing)
     - For local testing: Use ngrok to expose Jenkins: 
       ```powershell
       ngrok http 8080
       ```
       Then use the ngrok URL provided
   
   - **Content type**: `application/json`
   - **Events**: Select "Push events"
   - **Active**: ✓ Checked

4. Click **Add webhook**

### Enable GitHub Hook Trigger in Jenkins:

1. Open your Pipeline job
2. Go to **Configure**
3. Under **Build Triggers**, check:
   - ✓ **GitHub hook trigger for GITScm polling**
4. Click **Save**

---

## Step 8: Test the Integration

1. Make a change to a test file in your repository
2. **Commit and push** to GitHub:
   ```powershell
   git add .
   git commit -m "Test CI/CD trigger"
   git push origin main
   ```
3. Jenkins should automatically start a build
4. Monitor the build in Jenkins UI

---

## Local Jenkins Testing (Without Remote Access)

If GitHub can't reach your local Jenkins, use **ngrok**:

```powershell
# Install ngrok (if not already installed)
choco install ngrok

# Expose Jenkins on port 8080
ngrok http 8080
```

Use the generated ngrok URL in GitHub webhook (e.g., `https://abc123.ngrok.io/github-webhook/`)

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **Plugin not found** | Restart Jenkins after installation |
| **npm not found in build** | Ensure NodeJS tool is configured and Jenkins is restarted |
| **Webhook delivery fails** | Check Jenkins URL is accessible; use ngrok for local setup |
| **Tests timeout** | Increase timeout in `playwright.config.ts` |
| **No test report** | Verify `playwright-report` folder is created |
| **Build permission denied** | Run Jenkins with elevated privileges or appropriate user account |

---

## Monitor Your CI/CD

- **Dashboard**: `http://localhost:8080`
- **Job Details**: Click on your job name
- **Build History**: View all past builds
- **Console Output**: Click build number → **Console Output** for logs
- **Test Report**: Click build → **Playwright Test Report** for detailed results

---

## Next Steps

- Configure **email notifications** for build failures
- Set up **scheduled builds** (nightly tests)
- Add **multiple test jobs** for different environments
- Integrate with **code coverage** tools
