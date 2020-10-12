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

module.exports = function(type, message, key=1){
  if(messageDefaultCheck(message, key)) return 'Error 4; Bad text.';
  if(type){
    if(keyLengthCheck(key)) return 'Error 1; Unsupported length of the key';
    if(encodedSignCheck(message)) return 'Error 2; Unsupported symbols in the encrypted text.'
    if(encodedLengthCheck(message)) return 'Error 3; Unsupported length of the encrypted text.'
  }
  return 0;
}
