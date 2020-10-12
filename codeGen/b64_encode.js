module.exports = {
  b64_to_utf8: function(string){
    return Buffer.from(`${string}`, 'base64').toString('utf8')
  },
  utf8_to_b64: function(string){
    return Buffer.from(`${string}`).toString('base64');
  }
}
