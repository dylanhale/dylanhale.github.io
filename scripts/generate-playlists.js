const fs = require("fs");
const path = require("path");

const dates = [
  { label: "11/27/25", folder: "11-27-25" },
  { label: "11/28/25", folder: "11-28-25" },
  { label: "11/29/25", folder: "11-29-25" },
  { label: "11/30/25", folder: "11-30-25" },
  { label: "12/01/25", folder: "12-1-25" },
  { label: "12/02/25", folder: "12-2-25" },
  { label: "12/03/25", folder: "12-3-25" },
  { label: "12/04/25", folder: "12-4-25" },
  { label: "12/05/25", folder: "12-5-25" },
  { label: "12/06/25", folder: "12-6-25" },
  { label: "12/07/25", folder: "12-7-25" },
  { label: "12/08/25", folder: "12-8-25" },
  { label: "12/09/25", folder: "12-9-25" },
  { label: "12/10/25", folder: "12-10-25" },
  { label: "12/11/25", folder: "12-11-25" },
  { label: "12/12/25", folder: "12-12-25" },
  { label: "12/13/25", folder: "12-13-25" },
  { label: "12/14/25", folder: "12-14-25" },
  { label: "12/15/25", folder: "12-15-25" },
  { label: "12/16/25", folder: "12-16-25" },
  { label: "12/17/25", folder: "12-17-25" },
  { label: "12/18/25", folder: "12-18-25" },
  { label: "12/19/25", folder: "12-19-25" },
  { label: "12/20/25", folder: "12-20-25" },
  { label: "12/21/25", folder: "12-21-25" },
  { label: "12/22/25", folder: "12-22-25" },
  { label: "12/23/25", folder: "12-23-25" },
  { label: "12/24/25", folder: "12-24-25" },
  { label: "12/25/25", folder: "12-25-25" },
  { label: "12/26/25", folder: "12-26-25" },
  { label: "12/27/25", folder: "12-27-25" },
  { label: "12/28/25", folder: "12-28-25" },
  { label: "12/29/25", folder: "12-29-25" },
  { label: "12/30/25", folder: "12-30-25" },
  { label: "12/31/25", folder: "12-31-25" },
  { label: "1/1/26", folder: "1-1-26" },
];

const root = path.join(__dirname, "..");
const audioRoot = path.join(root, "Audio Files");
const manifestPath = path.join(root, "playlists.json");
const manifestJsPath = path.join(root, "playlists.js");

const manifest = {};

for (const { folder } of dates) {
  const dir = path.join(audioRoot, folder);
  if (!fs.existsSync(dir)) {
    manifest[folder] = [];
    continue;
  }

  const entries = fs
    .readdirSync(dir)
    .filter((file) => file.toLowerCase().endsWith(".m4a"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  manifest[folder] = entries.map((file) => ({
    file,
    title: file.replace(/\.m4a$/i, ""),
  }));
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
const jsContent = `window.PLAYLISTS = ${JSON.stringify(manifest, null, 2)};`;
fs.writeFileSync(manifestJsPath, jsContent);
console.log(`Wrote ${manifestPath} and ${manifestJsPath}`);
