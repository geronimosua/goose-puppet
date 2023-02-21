import { Page } from "puppeteer";
export declare const pressButton: (page: Page, selector: string) => Promise<void>;
export declare const typeInInput: (page: Page, selector: string, message: string) => Promise<void>;
