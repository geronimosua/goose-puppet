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
exports.launch = exports.defaultLaunchOptions = void 0;
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_1 = require("puppeteer");
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const exec = __importStar(require("child_process"));
const devices_1 = require("./devices");
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
    const device = options.useDevice ? (0, devices_1.createFakeDevice)() : null;
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
        yield (0, devices_1.assignDeviceInfo)(page, device);
    }
    if (options.changeTimeZone) {
        yield (0, devices_1.randomTimezone)(page);
    }
    return page;
});
exports.launch = launch;
