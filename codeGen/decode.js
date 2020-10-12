module.exports = function (sqrt, strEnc) {
    return (strEnc.match(/.{1,2}/g).map((curr)=>{return sqrt[curr[0]-1][curr[1]-1];}).join(''));
};
