import {
  BuidlerRuntimeEnvironment,
  DeployFunction,
} from "@nomiclabs/buidler/types";

const func: DeployFunction = async function (bre: BuidlerRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = bre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const instantiator = await deployments.get("MMInstantiator");
  console.log({
    address: instantiator.address,
    transactionHash: instantiator.transactionHash,
  });

  await deploy("MMInstantiator", {
    from: deployer,
    log: true,
  });
};
export default func;
func.tags = ["MMInstantiator"];
