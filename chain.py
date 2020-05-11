from block import Block

class Chain:

    __difficulty = 0
    __vChain = []

    def __init__(self):
        self.__vChain.append(Block(0,'Genesis block'))
        self.__difficulty = 2

    def addBlock(self, bNew):
        bNew.prevHash = self.__getLastBlock().getHash()
        bNew.mineBlock(self.__difficulty)
        self.__vChain.append(bNew)

    def __getLastBlock(self):
        return self.__vChain[-1]

    def getChain(self):
        return self.__vChain

