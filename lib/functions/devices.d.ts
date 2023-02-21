import { Page } from "puppeteer";
import { Device, TimezoneContinent } from "../interfaces";
export declare const randomTimezone: (page: Page, continent?: TimezoneContinent) => Promise<void>;
export declare const createFakeDevice: () => Device;
export declare const assignDeviceInfo: (page: Page, device: Device) => Promise<void>;
