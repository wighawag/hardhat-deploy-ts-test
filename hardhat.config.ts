import 'dotenv/config';
import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

let mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  // FOR DEV ONLY, SET IT IN .env files if you want to keep it private
  // (IT IS IMPORTANT TO HAVE A NON RANDOM MNEMONIC SO THAT SCRIPTS CAN ACT ON THE SAME ACCOUNTS)
  mnemonic = 'test test test test test test test test test test test junk';
}
const accounts = {
  mnemonic,
};

const config: HardhatUserConfig = {
  solidity: {
    version: '0.6.5',
  },
  namedAccounts: {
    deployer: 0,
    proxyOwner: 1,
    admin: '0x5B9d721f482E60efA99e555Cb59c7DBF4Df15Dc7',
  },
  networks: {
    coverage: {
      url: 'http://localhost:5458',
      accounts,
    },
    hardhat: {
      accounts,
    },
    localhost: {
      url: 'http://localhost:8545',
      accounts,
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/' + process.env.INFURA_TOKEN,
      accounts,
    },
    42: {
      url: 'https://kovan.infura.io/v3/' + process.env.INFURA_TOKEN,
      accounts,
    },
    staging: {
      url: 'https://goerli.infura.io/v3/' + process.env.INFURA_TOKEN,
      accounts,
    },
  },
  paths: {
    sources: 'src',
  },
  external: {
    artifacts: ['node_modules/@cartesi/arbitration/artifacts', 'node_modules/@cartesi/util/artifacts'],
    deployments: {
      rinkeby: ['node_modules/@cartesi/arbitration/deployments/rinkeby'],
    },
  },
};

export default config;
