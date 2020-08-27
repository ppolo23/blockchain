from chain import Chain
from block import Block

bChain = Chain()
bChain.addBlock(Block(1,'Block data 1'))
bChain.addBlock(Block(2,'Block data 2'))
bChain.addBlock(Block(3,'Block data 3'))

chain = bChain.getChain()

for i in chain:
    i.printBlock()
    print(" ----------- ")