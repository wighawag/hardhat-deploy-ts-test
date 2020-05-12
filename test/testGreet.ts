import { ethereum,ethers, deployments, getNamedAccounts } from "@nomiclabs/buidler";
import "./fix";

let deployer;
before(async function() {
  const namedAccounts = await getNamedAccounts();
  deployer = namedAccounts.deployer;
})

describe("Token", function() {

  beforeEach(async function() {
    await deployments.fixture();
  });

  it("should do something right", async function() {
    const Greeter = await ethers.getContract('Greeter');
    await Greeter.setGreeting('hi2');
  });
});