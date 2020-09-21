import {
  BuidlerRuntimeEnvironment,
  DeployFunction,
} from "@nomiclabs/buidler/types";

const func: DeployFunction = async function (bre: BuidlerRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = bre;
  const { deploy } = deployments;

  const { proxyOwner } = await getNamedAccounts();

  const Greeter2 = await deployments.get("Greeter2");

  await deploy("Example", {
    from: proxyOwner,
    proxy: {
      methodName: "postUpgrade",
      owner: proxyOwner,
    },
    args: [Greeter2.address],
    log: true,
  });
};
export default func;
