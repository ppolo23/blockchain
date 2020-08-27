// lotteries.controller.js

const lotteriesService = require('../services/lotteries.service');


function getLotteries(req, res) {
  lotteriesService.getLotteries().then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    return res.status(400).json(err.toString());
  });
}

function getLottery(req, res) {
  const lotteryAddress = req.swagger.params.lottery_address.value;
  lotteriesService.getLottery(lotteryAddress).then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    return res.status(400).json(err.toString());
  });
}

function createLottery(req, res) {
  const lotteryData = {
    maxNumberParticipants: req.body.maxNumberParticipants,
    participationPrice: req.body.participationPrice,
    participationPot: req.body.participationPot,
    prize: req.body.prize,
  };
  const privateKey = req.headers.private_key;
  lotteriesService.createLottery(privateKey, lotteryData).then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    return res.status(400).json(err.toString());
  });
}

function getParticipants(req, res) {
  const lotteryAddress = req.swagger.params.lottery_address.value;
  lotteriesService.getParticipants(lotteryAddress).then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    return res.status(400).json(err.toString());
  });
}

function addParticipant(req, res) {
  const lotteryAddress = req.swagger.params.lottery_address.value;
  const privateKey = req.headers.private_key;
  lotteriesService.addParticipant(privateKey, lotteryAddress).then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    return res.status(400).json(err.toString());
  });
}

function withdrawParticipation(req, res) {
  const lotteryAddress = req.swagger.params.lottery_address.value;
  const privateKey = req.headers.private_key;
  lotteriesService.withdrawParticipation(privateKey, lotteryAddress).then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    return res.status(400).json(err.toString());
  });
}

function raffle(req, res) {
  const lotteryAddress = req.swagger.params.lottery_address.value;
  const privateKey = req.headers.private_key;
  lotteriesService.raffle(privateKey, lotteryAddress).then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    return res.status(400).json(err.toString());
  });
}

function setLotteryStorage(req, res) {
  const lotteryStorageAddr = req.swagger.params.lottery_storage_addr.value;
  const privateKey = req.headers.private_key;
  lotteriesService.setLotteryStorage(privateKey, lotteryStorageAddr).then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log("Error");
    console.log(err);
    return res.status(400).json(err.toString());
  });
}

function setLotteryInterface(req, res) {
  const lotteryInterfaceAddr = req.swagger.params.lottery_interface_addr.value;
  const privateKey = req.headers.private_key;
  lotteriesService.setLotteryInterface(privateKey, lotteryInterfaceAddr).then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    return res.status(400).json(err.toString());
  });
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
