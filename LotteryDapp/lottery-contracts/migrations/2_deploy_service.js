// 2_deploy_lottery.js

const LotteryService = artifacts.require('LotteryService');

module.exports = async (deployer) => {
  await deployer.deploy(LotteryService);
};
