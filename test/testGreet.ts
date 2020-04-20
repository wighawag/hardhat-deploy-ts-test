import { ethers, deployments, getNamedAccounts } from "@nomiclabs/buidler";

let deployer;
before(async function() {
  const namedAccounts = await getNamedAccounts();
  deployer = namedAccounts.deployer;
})

describe("Token", function() {

  beforeEach(async function() {
    await deployments.run();
  });

  it("should do something right", async function() {
    const Greeter = await ethers.getContract('Greeter');
    await Greeter.setGreeting('hi2');
  });
});