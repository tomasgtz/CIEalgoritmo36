# CIE Calculator

[![Build Status](https://travis-ci.org/slopezm-adquira/cie-calculator.svg)](https://travis-ci.org/slopezm-adquira/cie-calculator)
[![Dependency Status](https://gemnasium.com/slopezm-adquira/cie-calculator.svg)](https://gemnasium.com/slopezm-adquira/cie-calculator)
[![GitHub version](https://badge.fury.io/gh/slopezm-adquira%2Fcie-calculator.svg)](http://badge.fury.io/gh/slopezm-adquira%2Fcie-calculator)

---

> Easily generate CIE References for BBVA Bancomer

## Install

### NPM

```
npm install cie-calculator
```

### Bower

```
bower install cie-calculator
```

### Standalone

```
 <script src='../dist/ciecalculator.min.js' type='text/javascript'></script>
```

## Minimal Usage

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
  <script src="../dist/ciecalculator.js" type="text/javascript"></script>
</head>
<body>
  <script type="text/javascript" charset="utf-8">
    console.log(CIECalculator({alg: '35', reference: '12346342'}));
  </script>
</body>
</html>

```

## Supported Algorithms

* 00
* 02
* 03
* 04
* 06
* 10
* 21
* 35
* 36
* 37
* 62
* 77
* 82


## Changelog

`0.1.16` : Added Algorithm 21

`0.1.15` : Fixes

`0.1.14` : Fix for Algorithm 04 when there is only one check digit

`0.1.13` : Fixes

`0.1.12` : Fixes

`0.1.11` : Update dependencies

`0.1.10` : Fixes

`0.1.9` : Added Algorithm 62

`0.1.8` : Use correct files for dist directory

`0.1.7` : Fix for Algorithm 82

`0.1.6` : Added Algorithm 82

`0.1.5` : Fixes

`0.1.4` : Fixes

`0.1.3` : Fixes

`0.1.2` : Fixes

`0.1.1` : Updated Algorithm 10 to use 2014 as base year

`0.1.0` : Added Algorithm 77

`0.0.1` : Initial release

## Contribute


### Dev

```
npm run watch
```

### Test

```
npm test
```

### Build

```
npm run build-debug
npm run build
```
