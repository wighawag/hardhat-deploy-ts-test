import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments} = hre;
  const {read, log} = deployments;

  const example = await deployments.get('Example');
  log({example: example.address});
  log(`example at ${example.address} : ${await read('Example', 'greet')}`);
};

export default func;
func.runAtTheEnd = true;
