import {
  BuidlerRuntimeEnvironment,
  DeployFunction,
} from "@nomiclabs/buidler/types";

const func: DeployFunction = async function (bre: BuidlerRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = bre;
  const { diamond, log } = deployments;

  const { deployer } = await getNamedAccounts();

  const Greeter = await deployments.get("Greeter");

  const deterministicDiamond = await diamond.deploy(
    "DeterministicDiamondExample",
    {
      from: deployer,
      facets: ["ActionFacet", "NewFacet", "TestFacet"],
      log: true,
      deterministicSalt:
        "0x0000000000000000000000000000000000000000000000000000000000000001",
    }
  );
  log({ deterministicDiamond: deterministicDiamond.address });
};
export default func;
