var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

var CIECalculator = require('./lib/strategies/cie_calculator.js').CIECalculator;
var Alg36 = require('./lib/strategies/alg36.js').Alg36;
var calculator = new CIECalculator();
calculator.setStrategy(eval('new Alg36()'));

router.get('/', function(req, res) {

   var id = req.query.id;
   data = calculator.execute({alg: '36', reference: id})
   res.send(data);
});

app.use(router);

app.listen(3000, function() {
  
});
