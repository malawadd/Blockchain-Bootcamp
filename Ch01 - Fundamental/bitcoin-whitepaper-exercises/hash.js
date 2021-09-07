"use strict";
var crypto = require("crypto");

// poem 
var poem = [
    "The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",

];

var Blockchain = {
    blocks: []
}

// first block

Blockchain.blocks.push({
    index: 0,
    hash: "000000",
    data: "",
    timestamp: Date.now(),
});



// create block
// figure out a way to make a block first, hash it , then added it back into block
function createBlock(data) {
    Blockchain.blocks.push({
        index: Blockchain.blocks.length ,
        prevHash: Blockchain.blocks[Blockchain.blocks.length-1]["hash"],
        data: data,
        timestamp: Date.now(),
        hash: blockHash(data),
    })

};



// for (let line of poem){
//     Blockchain.blocks.push({
//         index: poem.indexOf(line)+1,
//         hash: "0000",
//         data: line,
//         timestamp: Date.now(),
//     })
// }

for (let line of poem){
    createBlock(line)
}

// need a re-write
function blockHash(data) {
	return crypto.createHash("sha256").update(
		String(Blockchain.blocks.length ) + 
        String(Blockchain.blocks[Blockchain.blocks.length-1]["hash"])+
        String(data)+
        String(Date.now())
	).digest("hex");
}



var poemLine = 15 ; 
var poemLine2 = "inside until it tears I apart"
const  hash2 = crypto.createHash("sha256").update(String(poemLine) + poemLine2 ).digest("hex");

//console.log(Blockchain.blocks[1]);
//console.log(Blockchain.blocks.length + 10);
//console.log(Blockchain.blocks[Blockchain.blocks.length-1]["data"] );
// console.log(blockHash("but the power of a smile"));
// console.log(blockHash(poemLine));
// console.log(hash2)
console.log(Blockchain.blocks[1]["prevHash"] == Blockchain.blocks[0]["hash"] );
console.log(Blockchain.blocks[0]["data"].length === 0 );
console.log(Blockchain.blocks[0]["hash"] === "000000" );
console.log(Blockchain.blocks[0]["index"] >= 0 );
console.log(Blockchain.blocks[1]["hash"] === blockHash(Blockchain.blocks[1]["data"]));