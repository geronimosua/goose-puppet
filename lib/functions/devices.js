"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignDeviceInfo = exports.createFakeDevice = exports.randomTimezone = void 0;
const common_1 = require("../helpers/common");
const constants_1 = require("../helpers/constants");
const randomTimezone = (page, continent = "Europe_Central") => __awaiter(void 0, void 0, void 0, function* () {
    if (continent === "Europe_Central") {
        const randomElement = constants_1.TIMEZONES[Math.floor(Math.random() * constants_1.TIMEZONES.length)];
        yield page.emulateTimezone(randomElement);
    }
});
exports.randomTimezone = randomTimezone;
const createFakeDevice = () => {
    const fakeRandomValues = (0, common_1.getRandomElement)(constants_1.FAKE_USER_AGENT_MOBILE);
    return {
        userAgent: fakeRandomValues.agent,
        platform: fakeRandomValues.platform,
        locale: ["en-US", "en", "bn"],
    };
};
exports.createFakeDevice = createFakeDevice;
const assignDeviceInfo = (page, device) => __awaiter(void 0, void 0, void 0, function* () {
    if (device.platform === "Windows") {
        yield page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, "platform", { get: () => "Windows" });
            Object.defineProperty(navigator, "languages", {
                get: () => ["en-US", "en", "bn"],
            });
        });
    }
    if (device.platform === "Win32") {
        yield page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, "platform", { get: () => "Win32" });
            Object.defineProperty(navigator, "languages", {
                get: () => ["en-US", "en", "bn"],
            });
        });
    }
    if (device.platform === "Macintosh") {
        yield page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, "platform", { get: () => "Macintosh" });
            Object.defineProperty(navigator, "languages", {
                get: () => ["en-US", "en", "bn"],
            });
        });
    }
    if (device.platform === "Linux x86_64") {
        yield page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, "platform", {
                get: () => "Linux x86_64",
            });
            Object.defineProperty(navigator, "languages", {
                get: () => ["en-US", "en", "bn"],
            });
        });
    }
    if (device.platform === "Linux") {
        yield page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, "platform", { get: () => "Linux" });
            Object.defineProperty(navigator, "languages", {
                get: () => ["en-US", "en", "bn"],
            });
        });
    }
    if (device.platform === "iPhone") {
        yield page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, "platform", { get: () => "iPhone" });
            Object.defineProperty(navigator, "languages", {
                get: () => ["en-US", "en", "bn"],
            });
        });
    }
    yield page.setUserAgent(device.userAgent);
});
exports.assignDeviceInfo = assignDeviceInfo;
