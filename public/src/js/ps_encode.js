const prompt = require('prompt-sync')();

function createSquare(text) {
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
    return polybianSquare;
}

var encode = function (sqrt, strUnc) {
    return strUnc.toLowerCase().split('').map((curr) => {
       for(let i=0; i<=8; i++){
           if(sqrt[i].indexOf(curr) !== -1){
              console.log(`${i+1}${sqrt[i].indexOf(curr)+1} - ${curr}`)
               return `${i+1}${sqrt[i].indexOf(curr)+1}`;
           }
       }
    }).join('');
};

var decode = function (sqrt, strEnc) {
    return strEnc.match(/.{1,2}/g).map((curr)=>{return sqrt[curr[0]-1][curr[1]-1];}).join('');
};

var log_n_exit = function(data_to_log){
  console.log(data_to_log);
  process.exit(-1);
}

// const ps = [
//     ['a','b','c','d','e','f','g','h','i'],
//     ['j','k','l','m','n','o','p','q','r'],
//     ['s','t','u','v','w','x','y','z','а'],
//     ['б','в','г','д','е','ё','ж','з','и'],
//     ['к','л','м','н','о','п','р','с','т'],
//     ['у','ф','х','ц','ч','ш','щ','ъ','ы'],
//     ['ь','э','ю','я','0','1','2','3','4'],
//     ['5','6','7','8','9','.',',','?',' '],
//     ['!',':',';','"','+','-','*','/','=']];

var inputText='',
    polybianType;

const default_err = '\n Usage of encoder node ps_encode.js [-d/-e] -m (message)]:\n \n node ps_encode.js -e to encode your text message \n node ps_encode.js -d to decode your encrypted message'

var text_check = function(text='', enc_dec = '1'){
  if(text==null || text == ''){return 'Error 1; Text is empty or bad.'};
  if(typeof text != 'string' & typeof text  != 'number'){return 'Error 2; Not a text.'};
  if(text.match(/[^a-zA-Z0-9а-яА-Я\.\,\?\ \!\:\;\"\+\-\*\/\=]+/g)){return 'Error 3; Unsupported symbols in the text.'};
  if(text.length > 50){return 'Error 4; String is too long.'};
  if(enc_dec == '2'){
    if(text.match(/[^0-9]+/g)){return 'Error 5; Unsupported symbols in the encrypted text.'};
    if(text.length % 2 == 1){return 'Error 6; Incorrect length of the encrypted message. '};
  };
  return 0;
}

if(process.argv.length > 5){log_n_exit('Error 7; Too many arguments.');}
else if(process.argv.length < 3){log_n_exit(default_err);}
else{
  if(process.argv[2]=='-e') polybianType = 0;
  else if(process.argv[2]=='-d') polybianType = 1;
  else log_n_exit(default_err);
  if(process.argv[3]=='-m'){inputText = process.argv[4];}
  else if(process.argv.length == 3){
    inputText = prompt('Input data:');
  }
};

var text_check_result = text_check(inputText, polybianType+1);

if(text_check_result == 0){
  if (polybianType) log_n_exit(decode(createSquare(key), inputText));
  else log_n_exit(encode(createSquare(key), inputText));
}
else{
  log_n_exit(text_check_result);
}
