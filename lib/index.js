"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateDeviceInfo = exports.evaluateIpLeak = exports.evaluateTor = exports.typeInInput = exports.pressButton = exports.launch = exports.defaultLaunchOptions = exports.assignDeviceInfo = exports.createFakeDevice = exports.randomTimezone = void 0;
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_1 = require("puppeteer");
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const common_1 = require("./helpers/common");
const constants_1 = require("./helpers/constants");
const exec = __importStar(require("child_process"));
// DEVICES
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
exports.defaultLaunchOptions = {
    useDevice: true,
    changeTimeZone: true,
    proxy: undefined,
    headless: false,
    useStuckUserAgent: true,
    useTor: undefined,
};
const launch = (options = exports.defaultLaunchOptions) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
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
    const device = options.useDevice ? (0, exports.createFakeDevice)() : null;
    const pluginStealth = (0, puppeteer_extra_plugin_stealth_1.default)();
    pluginStealth.enabledEvasions.delete("user-agent-override");
    puppeteer_extra_1.default.use(pluginStealth);
    const initiliazeBrowserOpts = {
        args: ["--disable-features=site-per-process", `--window-size=1000,800`],
        headless: options.headless,
        executablePath: (0, puppeteer_1.executablePath)(),
    };
    if (options.useStuckUserAgent && device) {
        (_a = initiliazeBrowserOpts.args) === null || _a === void 0 ? void 0 : _a.push(`--user-agent=${device.userAgent}`);
    }
    if (options.proxy) {
        (_b = initiliazeBrowserOpts.args) === null || _b === void 0 ? void 0 : _b.push(options.proxy);
    }
    const browser = yield puppeteer_extra_1.default.launch(initiliazeBrowserOpts);
    const page = yield browser.newPage();
    if (device) {
        yield (0, exports.assignDeviceInfo)(page, device);
    }
    if (options.changeTimeZone) {
        yield (0, exports.randomTimezone)(page);
    }
    return [browser, page];
});
exports.launch = launch;
// WORKFLOWS
const pressButton = (page, selector) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.waitForSelector(selector);
    yield page.hover(selector);
    yield page.click(selector, { button: "left" });
});
exports.pressButton = pressButton;
const typeInInput = (page, selector, message) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.waitForSelector(selector);
    yield page.type(selector, message, { delay: 70 });
});
exports.typeInInput = typeInInput;
// EVALUATE
const evaluateTor = (page) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto("https://check.torproject.org"); // Check if we're using Tor
});
exports.evaluateTor = evaluateTor;
const evaluateIpLeak = (page) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto("https://ipleak.net"); // Check IP address, user agent, etc.
});
exports.evaluateIpLeak = evaluateIpLeak;
const evaluateDeviceInfo = (page) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto("https://www.deviceinfo.me/"); // Check device info
});
exports.evaluateDeviceInfo = evaluateDeviceInfo;
