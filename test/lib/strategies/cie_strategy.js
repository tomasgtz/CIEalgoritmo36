'use strict';

var client = require('../../../main.js');
var CIECalculator = require('../../../lib/strategies/cie_calculator.js').CIECalculator;
var Alg00 = require('../../../lib/strategies/alg00.js').Alg00;
var Alg02 = require('../../../lib/strategies/alg02.js').Alg02;
var Alg03 = require('../../../lib/strategies/alg03.js').Alg03;
var Alg04 = require('../../../lib/strategies/alg04.js').Alg04;
var Alg06 = require('../../../lib/strategies/alg06.js').Alg06;
var Alg10 = require('../../../lib/strategies/alg10.js').Alg10;
var Alg21 = require('../../../lib/strategies/alg21.js').Alg21;
var Alg35 = require('../../../lib/strategies/alg35.js').Alg35;
var Alg36 = require('../../../lib/strategies/alg36.js').Alg36;
var Alg37 = require('../../../lib/strategies/alg37.js').Alg37;
var Alg62 = require('../../../lib/strategies/alg62.js').Alg62;
var Alg77 = require('../../../lib/strategies/alg77.js').Alg77;
var Alg82 = require('../../../lib/strategies/alg82.js').Alg82;
var calculator;


describe('main', function() {

  it('should calculate the check digit', function(done) {
    client({alg: '00', reference: '18000359700002387'}).should.eql('180003597000023871');
    done();
  });
});


describe('alg 00', function() {

  beforeEach(function() {
    calculator = new CIECalculator();
    calculator.setStrategy(new Alg00());
  });

  it('should calculate the check digit', function(done) {
    calculator.execute({reference: '18000359700002387'}).should.eql('180003597000023871');
    calculator.execute({reference: '123456789'}).should.eql('1234567897');
    calculator.execute({reference: '0000001'}).should.eql('00000018');
    calculator.execute({reference: '999999999999999999'}).should.eql('9999999999999999998');
    calculator.execute({reference: '537639480322267'}).should.eql('5376394803222670');
    calculator.execute({reference: '14009120311114'}).should.eql('140091203111141');
    done();
  });

  it('should throw an error if length is longer than 19',function(done) {
    (function() {
      calculator.execute({reference: '12345678901234567890'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference is zero length',function(done) {
    (function() {
      calculator.execute({reference: ''});
    }).should.throw('Longitud invalida');
    done();
  });
});

describe('alg 02', function() {

  beforeEach(function() {
    calculator = new CIECalculator();
    calculator.setStrategy(new Alg02());
  });

  it('should calculate the check digit', function(done) {
    calculator.execute({reference: '96060576JMG02158'}).should.eql('96060576JMG021582');
    calculator.execute({reference: '14082076JM'}).should.eql('14082076JM3');
    calculator.execute({reference: '00011772XXYA21'}).should.eql('00011772XXYA219');
    done();
  });

  it('should accept lower case', function(done) {
    calculator.execute({reference: '00011772xxya21'}).should.eql('00011772XXYA219');
    done();
  });

  it('should throw an error if length is longer than 19',function(done) {
    (function() {
      calculator.execute({reference: '12345678901234567890'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference length is less than 6',function(done) {
    (function() {
      calculator.execute({reference: '96060'});
    }).should.throw('Longitud invalida');
    done();
  });
});

describe('alg 03', function() {

  beforeEach(function() {
    calculator = new CIECalculator();
    calculator.setStrategy(new Alg03());
  });

  it('should calculate the check digit', function(done) {
    calculator.execute({reference: '926314223'}).should.eql('9263142233');
    calculator.execute({reference: '18000359700002387'}).should.eql('180003597000023873');
    calculator.execute({reference: '123456789'}).should.eql('1234567893');
    calculator.execute({reference: '001'}).should.eql('0015');
    calculator.execute({reference: '999999999999999999'}).should.eql('9999999999999999992');
    done();
  });

  it('should throw an error if length is longer than 19',function(done) {
    (function() {
      calculator.execute({reference: '12345678901234567890'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference is zero length',function(done) {
    (function() {
      calculator.execute({reference: ''});
    }).should.throw('Longitud invalida');
    done();
  });
});

describe('alg 04', function() {

  beforeEach(function() {
    calculator = new CIECalculator();
    calculator.setStrategy(new Alg04());
  });

  it('should calculate the check digit', function(done) {
    calculator.execute({reference: '07680500000300070'}).should.eql('0768050000030007014');
    calculator.execute({reference: '07680500000300071'}).should.eql('0768050000030007114');
    calculator.execute({reference: '1'}).should.eql('140');
    calculator.execute({reference: '198231223488'}).should.eql('19823122348856');
    calculator.execute({reference: '50000327'}).should.eql('5000032708');
    done();
  });

  it('should throw an error if length is longer than 18',function(done) {
    (function() {
      calculator.execute({reference: '1234567890123456789'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference is zero length',function(done) {
    (function() {
      calculator.execute({reference: ''});
    }).should.throw('Longitud invalida');
    done();
  });
});

describe('alg 06', function() {

  beforeEach(function() {
    calculator = new CIECalculator();
    calculator.setStrategy(new Alg06());
  });

  it('should calculate the check digit', function(done) {
    calculator.execute({branch: '870', account: '7654321',reference: '87654321'}).should.eql('8765432179');
    done();
  });

  it('should throw an error if reference length is longer than 18',function(done) {
    (function() {
      calculator.execute({branch: '870', account: '7654321', reference: '1234567890123456789'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference is zero length',function(done) {
    (function() {
      calculator.execute({branch: '870', account: '7654321', reference: ''});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if branch is zero length',function(done) {
    (function() {
      calculator.execute({branch: '', account: '7654321', reference: '87654321'});
    }).should.throw('Longitud invalida');
    done();
  });
  it('should throw an error if account is zero length',function(done) {
    (function() {
      calculator.execute({branch: '870', account: '', reference: '87654321'});
    }).should.throw('Longitud invalida');
    done();
  });
});

describe('alg 10', function() {

  beforeEach(function() {
    calculator = new CIECalculator();
    calculator.setStrategy(new Alg10());
  });

  it('should calculate the check digit', function(done) {
    calculator.execute({date: '19112014', amount: '92832.32',reference: '121341234123'}).should.eql('12134123412303285214');
    calculator.execute({date: '23052015', amount: '4256.50',reference: '067591119700'}).should.eql('06759111970005186229');
    calculator.execute({date: '01012018', amount: '0.01',reference: '1'}).should.eql('114887233');
    calculator.execute({date: '29072015', amount: '60.00',reference: '12010282'}).should.eql('1201028205862203');
    done();
  });

  it('should throw an error if reference length is longer than 12',function(done) {
    (function() {
      calculator.execute({date: '23051997', amount: '4256.50',reference: '0675911197001'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference is zero length',function(done) {
    (function() {
      calculator.execute({date: '23051997', amount: '4256.50',reference: ''});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if amount is zero length',function(done) {
    (function() {
      calculator.execute({date: '23051997', amount: '',reference: '067591119700'});
    }).should.throw('Longitud invalida');
    done();
  });
  it('should throw an error if date is zero length',function(done) {
    (function() {
      calculator.execute({date: '', amount: '4256.50',reference: '067591119700'});
    }).should.throw('Longitud invalida');
    done();
  });
});

describe('alg 21', function() {

  beforeEach(function() {
    calculator = new CIECalculator();
    calculator.setStrategy(new Alg21());
  });

  it('should calculate the check digit', function(done) {
    calculator.execute({date: '24082015', amount: '235.00',reference: '000200730804'}).should.eql('00020073080406008486');
    calculator.execute({date: '24082018', amount: '190.00',reference: '11111111111'}).should.eql('1111111111116804243');
    calculator.execute({date: '18062018', amount: '3678.05',reference: '00191768'}).should.eql('0019176816123297');
    calculator.execute({date: '19102018', amount: '1.50',reference: '428972'}).should.eql('42897217283268');
    calculator.execute({date: '24092018', amount: '1.10',reference: '975163'}).should.eql('97516317115087');
    calculator.execute({date: '27082018', amount: '1.40',reference: '138256'}).should.eql('13825616831998');
    calculator.execute({date: '08072018', amount: '1.20',reference: '643974'}).should.eql('64397416277357');
    done();
  });

  it('should throw an error if reference length is longer than 20',function(done) {
    (function() {
      calculator.execute({date: '23051997', amount: '4256.50',reference: '0675911197001128392012'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference is zero length',function(done) {
    (function() {
      calculator.execute({date: '23051997', amount: '4256.50',reference: ''});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if amount is zero length',function(done) {
    (function() {
      calculator.execute({date: '23051997', amount: '',reference: '067591119700'});
    }).should.throw('Longitud invalida');
    done();
  });
  it('should throw an error if date is zero length',function(done) {
    (function() {
      calculator.execute({date: '', amount: '4256.50',reference: '067591119700'});
    }).should.throw('Longitud invalida');
    done();
  });
});

describe('alg 35', function() {

  beforeEach(function() {
    calculator = new CIECalculator();
    calculator.setStrategy(new Alg35());
  });

  it('should calculate the check digit', function(done) {
    calculator.execute({reference: 'ANGELICABA1'}).should.eql('ANGELICABA18');
    calculator.execute({reference: 'ALGOSHOT1234'}).should.eql('ALGOSHOT12343');
    calculator.execute({reference: 'PUMBA81'}).should.eql('PUMBA819');
    calculator.execute({reference: '49CQJA5A0QO8LVU'}).should.eql('49CQJA5A0QO8LVU0');
    done();
  });

  it('should accept lower case', function(done) {
    calculator.execute({reference: '00011772xxya21'}).should.eql('00011772XXYA213');
    done();
  });

  it('should throw an error if length is longer than 19',function(done) {
    (function() {
      calculator.execute({reference: '12345678901234567890'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference length is less than 1',function(done) {
    (function() {
      calculator.execute({reference: ''});
    }).should.throw('Longitud invalida');
    done();
  });
});

describe('alg 36', function() {

  beforeEach(function() {
    calculator = new CIECalculator();
    calculator.setStrategy(new Alg36());
  });

  it('should calculate the check digit', function(done) {
    calculator.execute({reference: 'AZ00035RG00002L87'}).should.eql('AZ00035RG00002L871');
    calculator.execute({reference: 'ALGOSHOT1234'}).should.eql('ALGOSHOT12349');
    calculator.execute({reference: '123400001AXY'}).should.eql('123400001AXY0');
    calculator.execute({reference: '123400001AXG'}).should.eql('123400001AXG0');
    done();
  });

  it('should accept lower case', function(done) {
    calculator.execute({reference: 'az00035sg00002l87'}).should.eql('AZ00035SG00002L879');
    done();
  });

  it('should throw an error if length is longer than 19',function(done) {
    (function() {
      calculator.execute({reference: '12345678901234567890'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference length is less than 1',function(done) {
    (function() {
      calculator.execute({reference: ''});
    }).should.throw('Longitud invalida');
    done();
  });
});

describe('alg 37', function() {

  beforeEach(function() {
    calculator = new CIECalculator();
    calculator.setStrategy(new Alg37());
  });

  it('should calculate the check digit', function(done) {
    calculator.execute({reference: '0GFH0500000U000P0'}).should.eql('0GFH0500000U000P014');
    calculator.execute({reference: '0GFH0500000U000P3'}).should.eql('0GFH0500000U000P314');
    calculator.execute({reference: 'ALGOSHOT1234'}).should.eql('ALGOSHOT123407');
    calculator.execute({reference: 'A001BZ12'}).should.eql('A001BZ1273');
    done();
  });

  it('should accept lower case', function(done) {
    calculator.execute({reference: '0gfh0500000u000p0'}).should.eql('0GFH0500000U000P014');
    done();
  });

  it('should throw an error if length is longer than 18',function(done) {
    (function() {
      calculator.execute({reference: '12345678901234567890'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference length is less than 1',function(done) {
    (function() {
      calculator.execute({reference: ''});
    }).should.throw('Longitud invalida');
    done();
  });
});

describe('alg 62', function() {

  beforeEach(function() {
    calculator = new CIECalculator();
    calculator.setStrategy(new Alg62());
  });

  it('should calculate the check digit', function(done) {
    calculator.execute({date: '23051997', amount: '845.15',reference: '0675911197'}).should.eql('067591119734946552');
    done();
  });

  it('should throw an error if reference length is less than 1',function(done) {
    (function() {
      calculator.execute({date: '19112014', amount: '601.00',reference: '', digit: '2'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference length is greater than 10',function(done) {
    (function() {
      calculator.execute({date: '19112014', amount: '601.00',reference: '123456789012', digit: '2'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference is zero length',function(done) {
    (function() {
      calculator.execute({date: '23051997', amount: '4256.50',reference: '', digit: '1'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if amount is zero length',function(done) {
    (function() {
      calculator.execute({date: '23051997', amount: '',reference: '067591119700', digit: '1'});
    }).should.throw('Longitud invalida');
    done();
  });
  it('should throw an error if date is zero length',function(done) {
    (function() {
      calculator.execute({date: '', amount: '4256.50',reference: '067591119700', digit: '1'});
    }).should.throw('Longitud invalida');
    done();
  });
  it('should throw an error if var digit is zero length',function(done) {
    (function() {
      calculator.execute({date: '', amount: '4256.50',reference: '067591119700', digit: ''});
    }).should.throw('Longitud invalida');
    done();
  });
});
describe('alg 77', function() {

  beforeEach(function() {
    calculator = new CIECalculator();
    calculator.setStrategy(new Alg77());
  });

  it('should calculate the check digit', function(done) {
    calculator.execute({date: '23052014', amount: '4256.50',reference: '067591119700'}).should.eql('06759111970005186229');
    calculator.execute({date: '18082015', amount: '92832.32',reference: '121341234123'}).should.eql('12134123412309785253');
    calculator.execute({date: '01012016', amount: '0.01',reference: '1'}).should.eql('111167288');
    done();
  });

  it('should throw an error if reference length is longer than 12',function(done) {
    (function() {
      calculator.execute({date: '23051997', amount: '4256.50',reference: '0675911197001'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference is zero length',function(done) {
    (function() {
      calculator.execute({date: '23051997', amount: '4256.50',reference: ''});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if amount is zero length',function(done) {
    (function() {
      calculator.execute({date: '23051997', amount: '',reference: '067591119700'});
    }).should.throw('Longitud invalida');
    done();
  });
  it('should throw an error if date is zero length',function(done) {
    (function() {
      calculator.execute({date: '', amount: '4256.50',reference: '067591119700'});
    }).should.throw('Longitud invalida');
    done();
  });
});

describe('alg 82', function() {

  beforeEach(function() {
    calculator = new CIECalculator();
    calculator.setStrategy(new Alg82());
  });

  it('should calculate the check digit', function(done) {
    calculator.execute({date: '19112014', amount: '601.00',reference: '123456789012345', digit: '2'}).should.eql('12345678901234503289251');
    calculator.execute({date: '19112014', amount: '601.00',reference: 'ABCDE6789012345', digit: '2'}).should.eql('ABCDE678901234503289251');
    calculator.execute({date: '10112015', amount: '184956215.69',reference: '111111111111111111111111111111111', digit: '9'}).should.eql('11111111111111111111111111111111106910903');
    calculator.execute({date: '30072015', amount: '220.00',reference: '222222222222222222222222222222222', digit: '3'}).should.eql('22222222222222222222222222222222205870359');
    calculator.execute({date: '15092015', amount: '1378.60',reference: 'ABC19692014LA278969458', digit: '6'}).should.eql('ABC19692014LA27896945806345673');
    done();
  });

  it('should throw an error if reference length is less than 15',function(done) {
    (function() {
      calculator.execute({date: '19112014', amount: '601.00',reference: '12345', digit: '2'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference length is greater than 42',function(done) {
    (function() {
      calculator.execute({date: '19112014', amount: '601.00',reference: '1234567890123456789012345678901234567890123', digit: '2'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if reference is zero length',function(done) {
    (function() {
      calculator.execute({date: '23051997', amount: '4256.50',reference: '', digit: '1'});
    }).should.throw('Longitud invalida');
    done();
  });

  it('should throw an error if amount is zero length',function(done) {
    (function() {
      calculator.execute({date: '23051997', amount: '',reference: '067591119700', digit: '1'});
    }).should.throw('Longitud invalida');
    done();
  });
  it('should throw an error if date is zero length',function(done) {
    (function() {
      calculator.execute({date: '', amount: '4256.50',reference: '067591119700', digit: '1'});
    }).should.throw('Longitud invalida');
    done();
  });
  it('should throw an error if var digit is zero length',function(done) {
    (function() {
      calculator.execute({date: '', amount: '4256.50',reference: '067591119700', digit: ''});
    }).should.throw('Longitud invalida');
    done();
  });
});
