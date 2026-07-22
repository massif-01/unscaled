import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("server fallback exposes the complete primary navigation before hydration", async () => {
  const [legacyApp, layout] = await Promise.all([
    source("app/LegacyApp.tsx"),
    source("app/layout.tsx"),
  ]);

  assert.match(legacyApp, /function StaticHomeShell/);
  assert.match(legacyApp, /loading:\s*StaticHomeShell/);
  assert.match(legacyApp, /aria-label="Primary navigation"/);
  assert.match(legacyApp, /https:\/\/github\.com\/massif-01/);
  assert.match(legacyApp, /https:\/\/huggingface\.co\/massif/);
  assert.match(legacyApp, /\["AI", "\/ai"\]/);
  assert.match(legacyApp, /\["Info", "\/info"\]/);
  assert.match(legacyApp, /https:\/\/github\.com\/massif-01\/AuraCap/);
  assert.match(layout, /Hugging Face, AI, GitHub projects/);
  assert.doesNotMatch(layout, /Podcast/);
});

test("canvas navigation has an equivalent semantic link surface", async () => {
  const signalField = await source("client/src/components/SignalField.tsx");

  assert.match(signalField, /<canvas[\s\S]*aria-hidden="true"/);
  assert.match(signalField, /<nav\s+className="signal-field-semantic-nav"/);
  assert.match(signalField, /aria-label="Primary navigation"/);
  assert.match(signalField, /nodes\.map\(\(?node\)? =>/);
  assert.match(signalField, /<a href=\{node\.url\} key=\{node\.id\}>/);
});

test("Info remains a Chinese, equal-weight editorial list", async () => {
  const [infoPage, styles] = await Promise.all([
    source("client/src/pages/InfoPage.tsx"),
    source("client/src/secondary-pages.css"),
  ]);

  assert.match(infoPage, /className="secondary-page" lang="zh-CN"/);
  assert.match(infoPage, /className="news-list"/);
  assert.match(infoPage, /items\.map\(\(item\) =>/);
  assert.match(infoPage, /className="news-item"/);
  assert.doesNotMatch(infoPage, /Latest AI News & Insights/);
  assert.doesNotMatch(infoPage, /gridTemplateColumns:\s*"repeat\(auto-fill/);
  assert.doesNotMatch(infoPage, /imageUrl &&/);
  assert.match(styles, /\.news-item\s*\{[\s\S]*grid-template-columns:/);
  assert.doesNotMatch(styles, /border-radius:\s*0\.5rem/);
});
