require('dotenv').config()
import fs from "fs";

import { task, usePlugin, BuidlerConfig } from "@nomiclabs/buidler/config";
usePlugin("buidler-ethers-v5");
usePlugin("buidler-deploy");
usePlugin("solidity-coverage");

let mnemonic = process.env.MNEMONIC;
try {
  mnemonic = fs.readFileSync(process.env.MNEMONIC_PATH || ".mnemonic").toString()
} catch(e) {}

const accounts = mnemonic
  ? {
      mnemonic,
    }
  : undefined;

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
    deployer: 0,
    admin: 1,
  },
  networks: {
    coverage: {
      url: "http://localhost:5458"
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/' + process.env.INFURA_TOKEN,
      accounts
    },
    42: {
      url: 'https://kovan.infura.io/v3/' + process.env.INFURA_TOKEN,
      accounts
    },
    staging: {
      url: 'https://goerli.infura.io/v3/' + process.env.INFURA_TOKEN,
      accounts
    }
  }

};

export default config;
