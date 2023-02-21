import puppeteer from "puppeteer-extra";
import {
  Page,
  executablePath,
  PuppeteerLaunchOptions,
  Browser,
} from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { getRandomElement } from "./helpers/common";
import { FAKE_USER_AGENT_MOBILE, TIMEZONES } from "./helpers/constants";
import { Device, TimezoneContinent } from "./interfaces";
import * as exec from "child_process";

// DEVICES
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

// LAUNCH

interface LaunchOptions {
  useDevice: boolean | undefined;
  proxy: string | undefined;
  useTor: string | undefined;
  headless: boolean | undefined;
  useStuckUserAgent: boolean | undefined;
  changeTimeZone: boolean | undefined;
}

export const defaultLaunchOptions: LaunchOptions = {
  useDevice: true,
  changeTimeZone: true,
  proxy: undefined,
  headless: false,
  useStuckUserAgent: true,
  useTor: undefined,
};

export const launch = async (
  options: LaunchOptions = defaultLaunchOptions
): Promise<[Browser, Page]> => {
  if (options.useTor) {
    exec.exec(options.useTor, (err, stdout, stderr) => {
      if (stderr) {
        console.error("stderr:", stderr);
      }
      if (err) {
        console.error("err:", err);
      }
      return stdout;
    });
  }

  const device = options.useDevice ? createFakeDevice() : null;

  const pluginStealth = StealthPlugin();
  pluginStealth.enabledEvasions.delete("user-agent-override");
  puppeteer.use(pluginStealth);

  const initiliazeBrowserOpts: PuppeteerLaunchOptions = {
    args: ["--disable-features=site-per-process", `--window-size=1000,800`],
    headless: options.headless,
    executablePath: executablePath(),
  };

  if (options.useStuckUserAgent && device) {
    initiliazeBrowserOpts.args?.push(`--user-agent=${device.userAgent}`);
  }

  if (options.proxy) {
    initiliazeBrowserOpts.args?.push(options.proxy);
  }

  const browser = await puppeteer.launch(initiliazeBrowserOpts);

  const page = await browser.newPage();

  if (device) {
    await assignDeviceInfo(page, device);
  }

  if (options.changeTimeZone) {
    await randomTimezone(page);
  }

  return [browser, page];
};

// WORKFLOWS

export const pressButton = async (page: Page, selector: string) => {
  await page.waitForSelector(selector);

  await page.hover(selector);

  await page.click(selector, { button: "left" });
};

export const typeInInput = async (
  page: Page,
  selector: string,
  message: string
) => {
  await page.waitForSelector(selector);

  await page.type(selector, message, { delay: 70 });
};

// EVALUATE

export const evaluateTor = async (page: Page) => {
  await page.goto("https://check.torproject.org"); // Check if we're using Tor
};

export const evaluateIpLeak = async (page: Page) => {
  await page.goto("https://ipleak.net"); // Check IP address, user agent, etc.
};

export const evaluateDeviceInfo = async (page: Page) => {
  await page.goto("https://www.deviceinfo.me/"); // Check device info
};
