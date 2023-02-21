import { Page } from "puppeteer";
interface LaunchOptions {
    useDevice: boolean | undefined;
    proxy: string | undefined;
    useTor: string | undefined;
    headless: boolean | undefined;
    useStuckUserAgent: boolean | undefined;
    changeTimeZone: boolean | undefined;
}
export declare const defaultLaunchOptions: LaunchOptions;
export declare const launch: (options?: LaunchOptions) => Promise<Page>;
export {};
