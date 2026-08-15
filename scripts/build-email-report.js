const fs = require('fs');
const path = require('path');

const [, , inputDir, outputFile] = process.argv;

if (!inputDir || !outputFile) {
  console.error('Usage: node build-email-report.js <json-reports-dir> <output-html-file>');
  process.exit(1);
}

function collectRows(suite, rows) {
  for (const spec of suite.specs || []) {
    for (const test of spec.tests) {
      const result = test.results[test.results.length - 1] || {};
      rows.push({
        title: spec.title,
        project: test.projectName || '-',
        status: result.status || 'unknown',
        duration: result.duration ? `${(result.duration / 1000).toFixed(2)}s` : '-',
      });
    }
  }
  for (const child of suite.suites || []) {
    collectRows(child, rows);
  }
}

const rows = [];
const totals = { expected: 0, unexpected: 0, flaky: 0, skipped: 0 };

const files = fs.readdirSync(inputDir).filter((f) => f.endsWith('.json'));
for (const file of files) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(path.join(inputDir, file), 'utf8'));
  } catch (err) {
    console.warn(`Skipping unreadable report ${file}: ${err.message}`);
    continue;
  }
  for (const suite of data.suites || []) collectRows(suite, rows);
  if (data.stats) {
    totals.expected += data.stats.expected || 0;
    totals.unexpected += data.stats.unexpected || 0;
    totals.flaky += data.stats.flaky || 0;
    totals.skipped += data.stats.skipped || 0;
  }
}

const statusColors = {
  passed: '#1a7f37',
  failed: '#cf222e',
  timedOut: '#cf222e',
  skipped: '#9a6700',
  flaky: '#9a6700',
};

const tableRows = rows
  .map(
    (r) => `
    <tr>
      <td style="padding:6px 10px;border:1px solid #d0d7de;">${r.title}</td>
      <td style="padding:6px 10px;border:1px solid #d0d7de;">${r.project}</td>
      <td style="padding:6px 10px;border:1px solid #d0d7de;color:${statusColors[r.status] || '#57606a'};font-weight:600;">${r.status}</td>
      <td style="padding:6px 10px;border:1px solid #d0d7de;">${r.duration}</td>
    </tr>`
  )
  .join('');

const html = `
<div style="font-family:Arial,Helvetica,sans-serif;">
  <h2>Playwright Test Report</h2>
  <p>
    <strong style="color:${statusColors.passed}">Passed: ${totals.expected}</strong> &nbsp;
    <strong style="color:${statusColors.failed}">Failed: ${totals.unexpected}</strong> &nbsp;
    <strong style="color:${statusColors.flaky}">Flaky: ${totals.flaky}</strong> &nbsp;
    <strong>Skipped: ${totals.skipped}</strong>
  </p>
  <table style="border-collapse:collapse;width:100%;">
    <thead>
      <tr style="background:#f6f8fa;">
        <th style="padding:6px 10px;border:1px solid #d0d7de;text-align:left;">Test</th>
        <th style="padding:6px 10px;border:1px solid #d0d7de;text-align:left;">Project</th>
        <th style="padding:6px 10px;border:1px solid #d0d7de;text-align:left;">Status</th>
        <th style="padding:6px 10px;border:1px solid #d0d7de;text-align:left;">Duration</th>
      </tr>
    </thead>
    <tbody>${tableRows}</tbody>
  </table>
</div>`;

fs.writeFileSync(outputFile, html);
console.log(`Wrote ${rows.length} test rows to ${outputFile}`);
