require('dotenv').config()
import fs from "fs";

import { task, usePlugin, BuidlerConfig } from "@nomiclabs/buidler/config";
usePlugin("buidler-ethers-v5");
usePlugin("buidler-deploy");

let mnemonic = process.env.MNEMONIC;
try {
  mnemonic = fs.readFileSync(process.env.MNEMONIC_PATH || ".mnemonic").toString()
} catch(e) {}

task("accounts", "Prints the list of accounts", async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

const config: BuidlerConfig = {
  solc: {
    version: '0.5.1',
  },
  namedAccounts: {
    deployer: 0
  },
  networks: {
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/' + process.env.INFURA_TOKEN,
      accounts: mnemonic ? {
        mnemonic
      } : undefined
    }
  }

};

export default config;
