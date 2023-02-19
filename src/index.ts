import * as launch from "./packages/launch";
import * as devices from "./packages/devices";
import * as workflows from "./packages/workflows";
import * as evaluate from "./packages/evaluate";

const goosePuppet = { ...launch, ...devices, ...workflows, ...evaluate };

export default goosePuppet;
