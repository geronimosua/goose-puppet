import { Page } from "puppeteer";
import { getRandomElement } from "../helpers/common";
import { FAKE_USER_AGENT_MOBILE, TIMEZONES } from "../helpers/constants";
import { Device, TimezoneContinent } from "../interfaces";

export const randomTimezone = async (
  page: Page,
  continent: TimezoneContinent = "Europe_Central"
) => {
  if (continent === "Europe_Central") {
    const randomElement =
      TIMEZONES[Math.floor(Math.random() * TIMEZONES.length)];
    await page.emulateTimezone(randomElement);
  }
};

export const createFakeDevice = (): Device => {
  const fakeRandomValues = getRandomElement(FAKE_USER_AGENT_MOBILE);

  return {
    userAgent: fakeRandomValues.agent,
    platform: fakeRandomValues.platform,
    locale: ["en-US", "en", "bn"],
  };
};

export const assignDeviceInfo = async (page: Page, device: Device) => {
  if (device.platform === "Windows") {
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "platform", { get: () => "Windows" });
      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en", "bn"],
      });
    });
  }

  if (device.platform === "Win32") {
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "platform", { get: () => "Win32" });
      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en", "bn"],
      });
    });
  }

  if (device.platform === "Macintosh") {
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "platform", { get: () => "Macintosh" });
      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en", "bn"],
      });
    });
  }

  if (device.platform === "Linux x86_64") {
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "platform", {
        get: () => "Linux x86_64",
      });
      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en", "bn"],
      });
    });
  }

  if (device.platform === "Linux") {
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "platform", { get: () => "Linux" });
      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en", "bn"],
      });
    });
  }

  if (device.platform === "iPhone") {
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "platform", { get: () => "iPhone" });
      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en", "bn"],
      });
    });
  }

  await page.setUserAgent(device.userAgent);
};
