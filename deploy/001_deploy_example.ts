import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer, proxyOwner} = await getNamedAccounts();

  const Greeter = await deployments.get('Greeter');

  await deploy('Example', {
    from: deployer,
    proxy: {
      methodName: 'postUpgrade',
      owner: proxyOwner,
    },
    args: [Greeter.address],
    log: true,
  });
};
export default func;
