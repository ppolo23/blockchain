import time
import hashlib

class Block:

    prevHash = ''

    __index = 0
    __nonce = 0
    __content = ''
    __ownHash = ''
    __timestamp = ''

    def __init__(self, ind, data):
        self.__index = ind
        self.__content = data
        self.__nonce = -1
        self.__timestamp = time.time()

    def getHash(self):
        return self.__ownHash

    def mineBlock(self, difficulty):
        base = '0'*difficulty

        self.__nonce = self.__nonce + 1
        self.__ownHash = self.__calculetHash()

        while(self.__ownHash[0:difficulty] != base):
            self.__nonce = self.__nonce + 1
            self.__ownHash = self.__calculetHash()

        print(self.__ownHash)

    def __calculetHash(self):

        s = str(self.__index) + str(self.__timestamp) + str(self.__content) + str(self.__nonce) + str(self.prevHash)
        m = hashlib.sha256(s.encode()).hexdigest()
        return m

    def printBlock(self):
        print("Block ****", self.__index)
        print("Content **", self.__content)
        print("Nonce ****", self.__nonce)
        print("Timestamp ", self.__timestamp)
        print("Hash *****", self.__ownHash)