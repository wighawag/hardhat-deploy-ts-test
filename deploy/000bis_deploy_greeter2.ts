import {HardhatRuntimeEnvironment, DeployFunction} from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  await deploy('Greeter2', {
    contract: 'Greeter',
    from: deployer,
    args: [deployer, 'hello world 2'],
    log: true,
    deterministicDeployment: true,
  });
};
export default func;
