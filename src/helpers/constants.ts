import { AgentNPlatform } from "../interfaces";

export const TIMEZONES = [
  "Europe/Paris",
  "Europe/Andorra",
  "Europe/Tirane",
  "Europe/Vienna",
  "Europe/Sarajevo",
  "Europe/Brussels",
  "Europe/Zurich",
  "Europe/Prague",
  "Europe/Berlin",
  "Europe/Copenhagen",
  "Europe/Madrid",
  "Europe/Gibraltar",
  "Europe/Zagreb",
  "Europe/Budapest",
  "Europe/Rome",
  "Europe/Vaduz",
  "Europe/Luxembourg",
  "Europe/Monaco",
  "Europe/Podgorica",
  "Europe/Skopje",
  "Europe/Malta",
  "Europe/Amsterdam",
  "Europe/Oslo",
  "Europe/Warsaw",
  "Europe/Belgrade",
  "Europe/Stockholm",
  "Europe/Ljubljana",
  "Europe/Bratislava",
  "Europe/San_Marino",
  "Africa/Tunis",
  "Europe/Vatican",
  "Europe/Belgrade",
];

export const FAKE_USER_AGENT_MOBILE: AgentNPlatform[] = [
  // {
  //   agent:
  //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41",
  //   platform: "Windows",
  // },
  // {
  //   agent:
  //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
  //   platform: "Win32",
  // },
  // {
  //   agent:
  //     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9",
  //   platform: "Macintosh",
  // },
  // {
  //   agent:
  //     "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1",
  //   platform: "Linux x86_64",
  // },
  // {
  //   agent:
  //     "Mozilla/5.0 (Linux; Android 12; SM-S906N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.119 Mobile Safari/537.36",
  //   platform: "Linux",
  // },
  {
    agent:
      "Mozilla/5.0 (Linux; Android 12; Pixel 6 Build/SD1A.210817.023; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.71 Mobile Safari/537.36",
    platform: "Linux",
  },
  // {
  //   agent:
  //     "Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1",
  //   platform: "iPhone",
  // },
  // {
  //   agent:
  //     "Mozilla/5.0 (iPhone12,1; U; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1",
  //   platform: "iPhone",
  // },
];
