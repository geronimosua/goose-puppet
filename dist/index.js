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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("./src"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const page = yield src_1.default.launch({
        changeTimeZone: true,
        headless: false,
        proxy: "--proxy-server=socks5://127.0.0.1:9050",
        useDevice: true,
        useStuckUserAgent: true,
        useTor: "C:\\ProgramData\\chocolatey\\lib\\tor\\tools\\Tor\\tor.exe",
    });
    yield src_1.default.evaluateTor(page);
    yield src_1.default.evaluateIpLeak(page);
    yield src_1.default.evaluateDeviceInfo(page);
});
main();
