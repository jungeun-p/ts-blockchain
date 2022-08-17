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