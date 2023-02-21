import { Page } from "puppeteer";

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
