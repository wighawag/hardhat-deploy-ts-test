import {
  BuidlerRuntimeEnvironment,
  DeployFunction,
} from "@nomiclabs/buidler/types";

const func: DeployFunction = async function (bre: BuidlerRuntimeEnvironment) {
  const { deployments } = bre;
  const { read, log } = deployments;

  const example = await deployments.get("Example");
  log({ example: example.address });
  log(`example at ${example.address} : ${await read("Example", "greet")}`);
};

export default func;
func.runAtTheEnd = true;
