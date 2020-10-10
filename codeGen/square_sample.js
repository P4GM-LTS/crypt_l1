module.exports = function createSquare(text) {
    let strOfSymbols = text.toLowerCase().replace(/(.)(?=.*\1)/g, "");
    let amountOfSymbols = strOfSymbols.length;
    let nearestSquareNum = Math.pow(Math.ceil(Math.sqrt(amountOfSymbols)), 2);
    let sizeOfDimension = Math.sqrt(nearestSquareNum);
    let polybianSquare = Array.from(Array(sizeOfDimension), () => new Array(sizeOfDimension));
    let n = 0;
    for (let i = 0; i < sizeOfDimension; i++) {
        for (let j = 0; j < sizeOfDimension; j++) {
            polybianSquare[i][j] = strOfSymbols.substr(n, 1);
            n++;
        }
    }
    return [polybianSquare, strOfSymbols];
};

