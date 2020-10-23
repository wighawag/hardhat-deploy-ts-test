import {HardhatRuntimeEnvironment, DeployFunction} from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, log} = deployments;

  const {deployer} = await getNamedAccounts();

  const merkleLib = await deployments.getOrNull('Merkle');
  if (!merkleLib) {
    await deploy('Merkle', {
      from: deployer,
      log: true,
    });
  } else {
    log(`reusing Merkle at ${merkleLib.address}`);
  }
};
export default func;
func.tags = ['Merkle'];
