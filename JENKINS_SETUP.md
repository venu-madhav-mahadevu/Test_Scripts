# Jenkins Configuration Guide for Playwright Tests

## Prerequisites
- Jenkins server installed and running
- NodeJS plugin installed in Jenkins
- Git plugin installed in Jenkins (usually pre-installed)

## Jenkins Setup Steps

### 1. Configure Node.js in Jenkins
1. Go to **Manage Jenkins** → **Tools**
2. Find **NodeJS installations**
3. Click **Add NodeJS**
   - Name: `NodeJS`
   - Version: Select LTS version (e.g., 18.x or 20.x)
4. Save

### 2. Create a New Pipeline Job
1. Click **New Item**
2. Enter job name: `Playwright Tests`
3. Select **Pipeline**
4. Click **OK**

### 3. Configure Pipeline
1. In **Pipeline** section, choose **Pipeline script from SCM**
2. Select **Git** as SCM
3. Enter your repository URL:
   ```
   https://github.com/your-username/your-repo.git
   ```
4. Enter branch: `*/main` (or your default branch)
5. Set **Script Path**: `Jenkinsfile` (default)
6. Click **Save**

### 4. Build the Pipeline
1. Click **Build Now**
2. Monitor build progress in **Build History**
3. Click build number to view console output
4. After completion, view **Playwright Test Report** link

## GitHub Integration (Optional)

### Trigger builds on push:
1. Go to your GitHub repo **Settings** → **Webhooks**
2. Add webhook:
   - Payload URL: `http://your-jenkins-url:8080/github-webhook/`
   - Content type: `application/json`
   - Events: Select "Push events"
3. Save

### Jenkins Configuration:
1. Open your Pipeline job
2. Check **GitHub hook trigger for GITScm polling**
3. Save

Now tests will run automatically on every GitHub push!

## Troubleshooting

- **Plugin not found**: Install via **Manage Jenkins** → **Manage Plugins**
- **npm not found**: Ensure NodeJS tool is configured correctly
- **Playwright tests timeout**: Increase timeout in `playwright.config.ts`
- **Report not generated**: Check if `playwright-report` folder exists after test run
