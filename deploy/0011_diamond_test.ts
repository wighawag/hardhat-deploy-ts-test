import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {diamond} = deployments;

  const {deployer} = await getNamedAccounts();

  const Greeter = await deployments.get('Greeter');

  await diamond.deploy('DiamondExample', {
    from: deployer,
    facets: ['ActionFacet', 'NewFacet', 'TestFacet'],
    log: true,
  });
};
export default func;
func.skip = async () => true;
