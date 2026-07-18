import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const canonicalPath = new URL("../index.html", import.meta.url);
const artifactPath = new URL("../dist/index.html", import.meta.url);
const canonical = await readFile(canonicalPath, "utf8");
const artifact = await readFile(artifactPath, "utf8");

const requiredLabels = [
  '"title": "The Laborers in the Vineyard"',
  "Prophecy &amp; Fulfillment",
  'line:"The Savior for All"',
];

const retiredLabels = [
  '"title": "The Labourers in the Vineyard"',
  "Prophecy &amp; Fulfilment",
  'line:"The Saviour for All"',
];

for (const label of requiredLabels) {
  assert.ok(canonical.includes(label), `Missing American-English label: ${label}`);
}

for (const label of retiredLabels) {
  assert.ok(!canonical.includes(label), `Retired British-English label remains: ${label}`);
}

// These exact KJV strings intentionally retain their historical spelling.
const protectedKjvReadings = [
  "For unto you is born this day in the city of David a Saviour, which is Christ the Lord.",
  "Labour not for the meat which perisheth, but for that meat which endureth unto everlasting life",
  "Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy strength, and with all thy mind; and thy neighbour as thyself.",
];

for (const reading of protectedKjvReadings) {
  assert.ok(canonical.includes(reading), `Protected KJV wording changed: ${reading}`);
}

assert.equal(
  artifact,
  canonical,
  "dist/index.html must be regenerated from the canonical index.html",
);

console.log(
  `American-English label validation passed (${requiredLabels.length} labels; ${protectedKjvReadings.length} protected KJV readings).`,
);
