import {
  BuidlerRuntimeEnvironment,
  DeployFunction,
} from "@nomiclabs/buidler/types";

const func: DeployFunction = async function (bre: BuidlerRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = bre;
  const { deploy, log } = deployments;

  const { deployer } = await getNamedAccounts();

  const instantiator = await deployments.getOrNull("MMInstantiator");
  if (instantiator) {
    log("current instantiator", {
      address: instantiator.address,
      transactionHash: instantiator.transactionHash,
    });
  }

  await deploy("MMInstantiator", {
    from: deployer,
    log: true,
  });
};
export default func;
func.tags = ["MMInstantiator"];
