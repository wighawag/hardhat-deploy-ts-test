import {
  BuidlerRuntimeEnvironment,
  DeployFunction,
} from "@nomiclabs/buidler/types";

const func: DeployFunction = async function (bre: BuidlerRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = bre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("Greeter2", {
    contract: "Greeter",
    from: deployer,
    args: [deployer, "hello world 2"],
    log: true,
    deterministicDeployment: true,
  });
};
export default func;
