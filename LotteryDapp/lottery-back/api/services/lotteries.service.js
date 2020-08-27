// lotteries.service.js

const config = require('../../config/config');
const Web3 = require('web3');

// Ethereum config
const ethereumUrl = `http://${config.eth.nodeUrl}:${config.eth.nodePort}`;
const gasLimit = config.eth.transactionOptions.gas;
const gasPrice = config.eth.transactionOptions.gasPrice;

// Service contract specs
const ContractName = config.contracts.LotteryService.contractName;
const ContractAddress = config.contracts.LotteryService.contractAddress;
const ContractAbi = config.contracts.LotteryService.contractAbi;


// TODO
const web3 = new Web3(ethereumUrl);
const contract = new web3.eth.Contract(JSON.parse(ContractAbi), ContractAddress);


/**
 * Return a list of registered lotteries.
 */
async function getLotteries() {
  let res = await contract.methods.getLotteries().call();
  return { message: res };
}

/**
 * Return all the information of the lottery corresponding to the given address.
 * @param {string} lotteryAddress address of the lottery
 */
async function getLottery(lotteryAddress) {
  let res = await contract.methods.getLottery(lotteryAddress).call();
  return { message: res };
}

/**
 * Create a new lottery in the system. It returns the transactionHash,
 * address of the created lottery and address of the creator.
 * @param {string} privateKey private key of the operator (tx sender)
 * @param {object} lotteryData object with lottery parameters
 */
async function createLottery(privateKey, lotteryData) {
  const user = web3.eth.accounts.privateKeyToAccount(privateKey);
  // Lottery data
  const {
    maxNumberParticipants,
    participationPrice,
    participationPot,
    prize,
  } = lotteryData;
  let res = await contract.methods.createLottery(
      maxNumberParticipants, 
      participationPrice, 
      prize, 
      participationPot)
    .send(
    {
      from: user.address,
      gasLimit: gasLimit,
      gasPrice: gasPrice
    });
  return { message: res };
}

/**
 * Return a list of lottery's participants.
 * @param {string} lotteryAddress address of the lottery
 */
async function getParticipants(lotteryAddress) {
  let res = await contract.methods.getLotteryParticipants(lotteryAddress).call();
  return { message: res };
}

/**
 * Allow to participate in a lottery. It returns the transactionHash,
 * address of the lottery and address of the participant.
 * @param {string} privateKey private key of the operator (tx sender)
 * @param {string} lotteryAddress address of the lottery
 */
async function addParticipant(privateKey, lotteryAddress) {
  const user = web3.eth.accounts.privateKeyToAccount(privateKey);
  // Lottery data
  let cost = await contract.methods.getTicketCost(lotteryAddress).call();
  let res = await contract.methods.addParticipant(
    lotteryAddress)
  .send(
  {
    from: user.address,
    gasLimit: gasLimit,
    gasPrice: gasPrice,
    value: cost
  });
return { message: res };
}

/**
 * Allow a participant to withdraw its participation, ang get a refund.
 * It returns the transactionHash, address of the lottery and address
 * of the participant.
 * @param {string} privateKey private key of the operator (tx sender)
 * @param {string} lotteryAddress address of the lottery
 */
async function withdrawParticipation(privateKey, lotteryAddress) {
  const user = web3.eth.accounts.privateKeyToAccount(privateKey);
  // Lottery data
  let res = await contract.methods.withdrawParticipation(
    lotteryAddress)
  .send(
  {
    from: user.address,
    gasLimit: gasLimit,
    gasPrice: gasPrice
  });
return { message: res };
}

/**
 * Allow the creator of a lottery to raffle the prize between its
 * participants. It returns the transactionHash, address of the
 * lottery and the address of the winner.
 * @param {string} privateKey private key of the operator (tx sender)
 * @param {string} lotteryAddress address of the lottery
 */
async function raffle(privateKey, lotteryAddress) {
  const user = web3.eth.accounts.privateKeyToAccount(privateKey);
  // Lottery data
  let res = await contract.methods.rafflePrize(
    lotteryAddress)
  .send(
  {
    from: user.address,
    gasLimit: gasLimit,
    gasPrice: gasPrice
  });
return { message: res };
}

/**
 * Allows the owner of the contract to setup the internal conection
 * for the storage of the Dapp.
 * Also gives ownership of Storage contract to Service contract.
 * @param {string} lotteryStorageAddr 
 */
async function setLotteryStorage(privateKey, lotteryStorageAddr) {
  const user = web3.eth.accounts.privateKeyToAccount(privateKey);
  // data
  let res = await contract.methods.setLotteryStorage(lotteryStorageAddr)
    .send(
      {
        from: user.address,
        gasLimit: gasLimit,
        gasPrice: gasPrice
      });
  return { message: res };
}

/**
 * Allows the owner of the contract to setup the address with the logic
 * of the Dapp
 * @param {string} lotteryInterfaceAddr 
 */
async function setLotteryInterface(privateKey, lotteryInterfaceAddr) {
  const user = web3.eth.accounts.privateKeyToAccount(privateKey);
  // data
  let res = await contract.methods.setLotteryLogic(lotteryInterfaceAddr)
    .send(
      {
        from: user.address,
        gasLimit: gasLimit,
        gasPrice: gasPrice
      });
  return { message: res };
}


module.exports = {
  getLotteries,
  getLottery,
  createLottery,
  getParticipants,
  addParticipant,
  withdrawParticipation,
  raffle,
  setLotteryStorage,
  setLotteryInterface,
};
