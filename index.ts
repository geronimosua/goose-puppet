import {
  launch,
  evaluateDeviceInfo,
  evaluateIpLeak,
  evaluateTor,
} from "./src/index";

const main = async () => {
  const [browser, page] = await launch();

  await evaluateTor(page);
  await evaluateIpLeak(page);
  await evaluateDeviceInfo(page);
};

main();
