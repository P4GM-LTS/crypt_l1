const keyLengthCheck = function(key){
  if(key.length > 81){return 'Error 1; Unsupported length of the key'};
}
const encodedSignCheck = function(message){
  if(message.match(/[^0-9]+/g)){return 'Error 2; Unsupported symbols in the encrypted text.'};
}
const encodedLengthCheck = function(message){
  if((message.length % 2) != 0){return 'Error 3; Unsupported length of the encrypted text.'};
}
const messageDefaultCheck = function(message, key){
  if(!message || !key){return 'Error 4; Bad text.'}
}
const encodedCompareCheck = function(message, key) {
  if(Math.max.apply(null, message.split(''))>Math.ceil(Math.sqrt(key.length))){
    return 1;
  }
  else{
    return 0;
  }
}

module.exports = function(type, message, key=1){
  if(messageDefaultCheck(message, key)) return 'Error 4; Bad text.';
  if(type){
    if(encodedCompareCheck(message, key)) return('Error 5; Unsupported key/text.');
    if(keyLengthCheck(key)) return 'Error 1; Unsupported length of the key.';
    if(encodedSignCheck(message)) return 'Error 2; Unsupported symbols in the encrypted text.'
    if(encodedLengthCheck(message)) return 'Error 3; Unsupported length of the encrypted text.'

  }
  return 0;
}
