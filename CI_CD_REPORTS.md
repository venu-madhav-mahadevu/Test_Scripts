# GitHub Actions CI/CD Report Guide

## View Test Reports

### Option 1: GitHub Actions Workflow
1. Go to your GitHub repository
2. Click **Actions** tab
3. Select the latest workflow run (e.g., "Playwright Tests CI/CD")
4. View the job results and download artifacts

### Option 2: Download Artifacts
1. In the workflow run, scroll to **Artifacts** section
2. Download:
   - `playwright-report-*` - HTML test report (Open `index.html` in browser)
   - `test-results-*` - XML test results

### Option 3: View in Job Summary
The workflow automatically posts a summary in the **Summary** tab with artifact links.

---

## What Gets Tested

✅ Multiple Operating Systems:
- Ubuntu (Linux)
- Windows

✅ Multiple Node.js Versions:
- Node 18.x
- Node 20.x

✅ All Tests from:
- `tests/example.spec.ts` (7 Playwright test cases)

---

## Viewing the HTML Report

1. Download `playwright-report-*.zip` from artifacts
2. Extract the zip file
3. Open `index.html` in your browser
4. Browse:
   - ✅ Passed tests
   - ❌ Failed tests
   - ⏱️ Execution time per test
   - 📸 Screenshots (if captured)
   - 🎥 Videos (if enabled)
   - 📝 Test traces

---

## Configure Report Options

Edit `playwright.config.ts` to customize:

```typescript
// Enable video recording
video: 'on-failure',

// Enable screenshots
screenshot: 'only-on-failure',

// Full page screenshots
fullPage: true,

// Custom output folder
webServer: {
  outputFolder: './test-results'
}
```

---

## CI/CD Pipeline Triggers

Tests automatically run on:
- 🔄 Every **push** to `main`, `master`, or `develop`
- 📝 Every **pull request** to `main`, `master`, or `develop`

No manual steps needed - fully automated!

---

## How to Fix Failed Tests

1. View the failed test details in the HTML report
2. Check the screenshot or video
3. Update the test in `tests/example.spec.ts`
4. Commit and push - CI/CD will run tests again automatically

---

## Performance Insights

The report shows:
- 📊 Total duration
- ⚡ Slowest tests
- 🎯 Pass/fail rate
- 🔄 Retry attempts
