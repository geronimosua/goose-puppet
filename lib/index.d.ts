import { Page, Browser } from "puppeteer";
import { Device, TimezoneContinent } from "./interfaces";
export declare const randomTimezone: (page: Page, continent?: TimezoneContinent) => Promise<void>;
export declare const createFakeDevice: () => Device;
export declare const assignDeviceInfo: (page: Page, device: Device) => Promise<void>;
interface LaunchOptions {
    useDevice: boolean | undefined;
    proxy: string | undefined;
    useTor: string | undefined;
    headless: boolean | undefined;
    useStuckUserAgent: boolean | undefined;
    changeTimeZone: boolean | undefined;
}
export declare const defaultLaunchOptions: LaunchOptions;
export declare const launch: (options?: LaunchOptions) => Promise<[Browser, Page]>;
export declare const pressButton: (page: Page, selector: string) => Promise<void>;
export declare const typeInInput: (page: Page, selector: string, message: string) => Promise<void>;
export declare const evaluateTor: (page: Page) => Promise<void>;
export declare const evaluateIpLeak: (page: Page) => Promise<void>;
export declare const evaluateDeviceInfo: (page: Page) => Promise<void>;
export {};
