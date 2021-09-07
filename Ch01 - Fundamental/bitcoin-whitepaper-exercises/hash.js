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



// /////////////create block///////////////////////
// figure out a way to make a block first, hash it , then added it back into block [Done]
function createBlock(data) {
    var block = {
        index: Blockchain.blocks.length ,
        prevHash: Blockchain.blocks[Blockchain.blocks.length-1]["hash"],
        data: data,
        timestamp: Date.now(),
    };

    block.hash = blockHash(block);
    Blockchain.blocks.push(block);
    return block;

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

// create a hash for the block
function blockHash(block) {
	return crypto.createHash("sha256").update(
		String(block.prevHash ) + 
        String(block.index)+
        String(block.data)+
        String(block.timestamp)
	).digest("hex");
}

// check the chain integrtry 
// not sure how to do this 
function verifyChain(BC){
    for (var i = 1 ; i <BC.blocks.length; i++) {
        if (BC.blocks[i]["prevHash"] === BC.blocks[i-1]["hash"]) {
            return console.log("True"); 
        }
    }
}


// need a re-write
// function blockHash(block) {
// 	return crypto.createHash("sha256").update(
// 		String(Blockchain.blocks.length ) + 
//         String(Blockchain.blocks[Blockchain.blocks.length-1]["hash"])+
//         String(data)+
//         String(Date.now())
// 	).digest("hex");
// }

///////////////////block verifying function ///////////
function verifyBlock(block){
    if (block.data.length > 0  &&
        block.index > 0 &&
        block.prevHash != null && 
        block.hash === blockHash(block) ){
        return true ; 
    }
    else{
        return false
    }
}

var poemLine = 15 ; 
var poemLine2 = "inside until it tears I apart"
const  hash2 = crypto.createHash("sha256").update(String(poemLine) + poemLine2 ).digest("hex");

console.log(Blockchain.blocks.length);
//console.log(verifyChain(Blockchain));
//console.log(Blockchain.blocks.length + 10);
//console.log(Blockchain.blocks[Blockchain.blocks.length-1]["data"] );
// console.log(blockHash("but the power of a smile"));
// console.log(blockHash(poemLine));
// console.log(hash2)
// console.log(Blockchain.blocks[1]["prevHash"] == Blockchain.blocks[0]["hash"] );
// console.log(Blockchain.blocks[0]["data"].length === 0 );
// console.log(Blockchain.blocks[0]["hash"] === "000000" );
// console.log(Blockchain.blocks[0]["index"] >= 0 );
 //console.log(Blockchain.blocks[1]["hash"]);
 console.log(Blockchain.blocks[1]["hash"] === blockHash(Blockchain.blocks[1]));

// for ( var v = 1 ; v < Blockchain.blocks.length ; v++) {
//     if (Blockchain.blocks[v]["prevHash"] == Blockchain.blocks[v-1]["hash"]) {
//          console.log(v); 
//     }
// }

// for ( var v = 1 ; v <= Blockchain.blocks.length ; v++) {
//          console.log(Blockchain.blocks[v]["prevHash"] == Blockchain.blocks[v-1]["hash"]); 

// }

console.log(verifyBlock(Blockchain.blocks[0]));


