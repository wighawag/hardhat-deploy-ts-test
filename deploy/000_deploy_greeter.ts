import { BuidlerRuntimeEnvironment, DeployFunction } from "@nomiclabs/buidler/types";

const func: DeployFunction = async function(bre : BuidlerRuntimeEnvironment) {
    const {deployments, namedAccounts} = bre;
    const {deployer} = namedAccounts;
    const {deploy} = deployments;

    await deploy("Greeter", {from: deployer}, "Greeter", "hi");
}
export default func;
