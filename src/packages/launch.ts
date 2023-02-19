import puppeteer from "puppeteer-extra";
import { executablePath, Page, PuppeteerLaunchOptions } from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import * as exec from "child_process";
import { assignDeviceInfo, createFakeDevice, randomTimezone } from "./devices";

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
): Promise<Page> => {
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

  return page;
};
