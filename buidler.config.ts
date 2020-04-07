import { task, usePlugin, BuidlerConfig } from "@nomiclabs/buidler/config";
usePlugin("buidler-ethers-v5");
usePlugin("buidler-deploy");

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

const config: BuidlerConfig = {
  namedAccounts: {
    deployer: 0
  }
};

export default config;
