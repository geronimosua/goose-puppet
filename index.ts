import goosePuppet from "./src";

const main = async () => {
  const page = await goosePuppet.launch();

  await goosePuppet.evaluateTor(page);
  await goosePuppet.evaluateIpLeak(page);
  await goosePuppet.evaluateDeviceInfo(page);
};

main();
