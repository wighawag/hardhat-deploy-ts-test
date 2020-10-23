import {HardhatRuntimeEnvironment, DeployFunction} from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {execute, log, read} = deployments;
  const {deployer, admin} = await getNamedAccounts();

  const currentAdmin = await read('Greeter', 'getAdmin');
  if (currentAdmin !== admin) {
    log(`setting admin from ${currentAdmin} to ${admin}...`);
    await execute('Greeter', {from: currentAdmin, log: true}, 'setAdmin', admin);
    log(`admin set to ${admin}`);
  }
};
export default func;
func.runAtTheEnd = true;
