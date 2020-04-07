import { ethers, deployments, namedAccounts } from "@nomiclabs/buidler";
const {deployer} = namedAccounts;

describe("Token", function() {

  beforeEach(async function() {
    await deployments.run();
  });

  it("should do something right", async function() {
    const Greeter = await ethers.getContract('Greeter');
    await Greeter.setGreeting('hi2');
  });
});