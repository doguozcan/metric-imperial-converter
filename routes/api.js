'use strict'

const expect = require('chai').expect
const ConvertHandler = require('../controllers/convertHandler.js')

module.exports = function (app) {
  let convertHandler = new ConvertHandler()

  app.get('/api/convert', (req, res) => {
    // /api/convert?input=1kg
    // input => 1kg
    // initNum => 1
    // initUnit => kg

    let input = req.query.input

    let initNum = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input)

    // if both of the inputs are not present
    if (!initNum && !initUnit) {
      return res.send('invalid number and unit')
    }

    // if number is not valid
    if (!initNum) {
      return res.send('invalid number')
    }

    // if unit is not valid
    if (!initUnit) {
      return res.send('invalid unit')
    }

    let returnNum = convertHandler.convert(initNum, initUnit)
    let returnUnit = convertHandler.getReturnUnit(initUnit)

    let spellOutUnit = convertHandler.spellOutUnit(initUnit)
    let spellOutReturnUnit = convertHandler.spellOutUnit(returnUnit)

    let string = convertHandler.getString(
      initNum,
      spellOutUnit,
      returnNum,
      spellOutReturnUnit
    )

    res.json({ initNum, initUnit, returnNum, returnUnit, string })
  })
}
