
import { BuidlerRuntimeEnvironment, DeployFunction } from "@nomiclabs/buidler/types";

const func: DeployFunction = async function(bre : BuidlerRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = bre;
    const {execute, log} = deployments;
    const {deployer, admin} = await getNamedAccounts();

    await execute("Greeter", {from: deployer}, "setAdmin", admin);
    log(`admin set to ${admin}`);
}
export default func;
func.runAtTheEnd = true;
