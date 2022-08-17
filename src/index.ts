import crypto from "crypto";

interface BlockShape {
    hash: string; // prevHash, height, data를 이용한 계산값 
    prevHash: string;
    height: number;
    data: string;
}

class Block implements BlockShape {
    public hash: string;
    constructor(
        public prevHash: string,
        public height: number,
        public data: string,
    ){
        // hash 초기화
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    // static 함수 
    static calculateHash(prevHash: string, height: number, data: string){
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class BlockChain {
    private blocks: Block[]
    constructor(){
        // blocks 초기화
        this.blocks = [];
    }
    // 2. 이전 hash 가져오기
    private getPrevHash(){
        if(this.blocks.length === 0) return ""
        return this.blocks[this.blocks.length - 1].hash;

    }
    // 1. blcok에 저장할 데이터를 전달 
    public addBlock(data: string){
        const newBlock = new Block(this.getPrevHash(), this.blocks.length+1, data);
        this.blocks.push(newBlock);
    }
    public getBlocks(){
        // return this.blocks;
        return [...this.blocks]; // 해당 데이터를 가진 새로운 배열 return
    }
}

const blockchain = new BlockChain();
blockchain.addBlock("first one");
blockchain.addBlock("second one");
blockchain.addBlock("third one");
blockchain.addBlock("Fourth one");

blockchain.getBlocks().push(new Block("...", 11111, "HACK"));

console.log(blockchain.getBlocks());