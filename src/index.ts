import * as CryptoJS from "crypto-js"

class Block {
    public index: number;
    public hash: string;
    public previousHash: String;
    public data: string;
    public timestamp: number;

    sayHello = () => { return "hello" } // test method

    // static
    static calculateBlockHash = (index: number, previousHash: String, timestamp: number, data: string): string => {
        return CryptoJS.SHA256('' + index + previousHash + timestamp + data).toString();
    }
    static validateStructure = (aBlock: Block): boolean => 
        typeof aBlock.index === "number" 
        && typeof aBlock.hash === "string" 
        && typeof aBlock.previousHash === "string"
        && typeof aBlock.timestamp === "number"
        && typeof aBlock.data === "string";
    
    // constructor
    constructor(index: number, hash: string, previousHash: String, data: string, timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, "2839472384234", "", "hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const nextHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);

    const newBlock: Block = new Block(newIndex, nextHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};

const getHasforBlock = (aBlock: Block): string =>
    Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index +1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHasforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
}

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

/* flow chart
Block 타입(index, hash, 이전hash, 생성시간, 블록의 데이터)의 blockchain 배열 생성
0번째는 genesisBlock 임의로 넣은 "block"
"second block" 데이터를 가진 "block" 생성 --> createNewBlock()
    이전 블록은 blockchain배열의 마지막 값 --> getLatestBlock()
    index, 생성시간(getNewTimeStamp(), 이전 블록의 hash값, 데이터를 가지고 hash생성 -->  calculateBlockHash()
    생성된 hash로 새로운 블록 객체를 생성 --> new Block()
    생성된 블록을 blockchain배열에 추가 --> addBlock()
        생성된 블록과 이전 블록의 유효성 검증 --> isBlockValid()
            생성된 블록의 Block 타입 검증 --> validStructure()
            이전 블록과 생성블록이 sequential 한지 검증
            이전 블록의 자기자신의hash(hash)가 / 생성된 블록의 이전hash(previousHash)와 일치하는지 검증
            생성된 블록에서 추출한 hash가 생성된 블록의 hash값과 일치하는지 검증 --> getHashforBlock()
    이상없으면 배열에 추가(push)
*/

export {};    
