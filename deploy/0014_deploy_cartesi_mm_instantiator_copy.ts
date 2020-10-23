import {HardhatRuntimeEnvironment, DeployFunction} from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  const merkeLib = await deployments.get('Merkle');

  await deploy('MMInstantiatorCopy', {
    contract: 'MMInstantiator',
    from: deployer,
    libraries: {
      Merkle: merkeLib.address,
    },
    log: true,
  });
};
export default func;
func.tags = ['MMInstantiatorCopy', 'Merkle'];
