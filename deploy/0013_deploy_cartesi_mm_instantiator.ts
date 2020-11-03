import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, log} = deployments;

  const {deployer} = await getNamedAccounts();

  const instantiator = await deployments.getOrNull('MMInstantiator');
  if (instantiator) {
    log('current instantiator', {
      address: instantiator.address,
      transactionHash: instantiator.transactionHash,
    });
  }

  const merkeLib = await deployments.get('Merkle');

  await deploy('MMInstantiator', {
    from: deployer,
    libraries: {
      Merkle: merkeLib.address,
    },
    log: true,
  });
};
export default func;
func.tags = ['MMInstantiator', 'Merkle'];
