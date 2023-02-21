import { Page } from "puppeteer";

export const evaluateTor = async (page: Page) => {
  await page.goto("https://check.torproject.org"); // Check if we're using Tor
};

export const evaluateIpLeak = async (page: Page) => {
  await page.goto("https://ipleak.net"); // Check IP address, user agent, etc.
};

export const evaluateDeviceInfo = async (page: Page) => {
  await page.goto("https://www.deviceinfo.me/"); // Check device info
};
