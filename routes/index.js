var express = require('express');
var router = express.Router();
const op         = require('../codeGen/operator.js'),
      b2u        = require('../codeGen/b64_encode.js'),
      errHandl   = require('../errHandler.js'),
      bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: true});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Polybian Square' });
});
router.post('/encode', urlencodedParser, (req, res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  console.log(req.body);
  let stringFromClient = b2u.b64_to_utf8(req.body.str);
  console.log(stringFromClient);
  console.log(errHandl(0,stringFromClient));
  errHandl(0, stringFromClient)?res.status(400).send(errHandl(0, stringFromClient)):res.status(200).send([b2u.utf8_to_b64(op.enc(op.sqr(stringFromClient)[0], stringFromClient)), b2u.utf8_to_b64(op.sqr(stringFromClient)[1])]);
});
router.post('/decode', urlencodedParser, (req, res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  console.log(req.body);
  let stringFromClient = b2u.b64_to_utf8(req.body.str);
  let keyFromClient = b2u.b64_to_utf8(req.body.key);
  console.log(stringFromClient, keyFromClient);
  console.log(errHandl(1,stringFromClient, keyFromClient));
  errHandl(1,stringFromClient, keyFromClient)?res.status(400).send(errHandl(1,stringFromClient, keyFromClient)):res.status(200).send(b2u.utf8_to_b64(op.dec(op.sqr(keyFromClient)[0], stringFromClient)));
});
module.exports = router;
