const chai = require('chai')
let assert = chai.assert
const ConvertHandler = require('../controllers/convertHandler.js')

let convertHandler = new ConvertHandler()

suite('Unit Tests', () => {
  test('read a whole number input', (done) => {
    let input = '1L'
    assert.equal(convertHandler.getNum(input), 1)
    done()
  })
  test('read a decimal number input', (done) => {
    let input = '1.5L'
    assert.equal(convertHandler.getNum(input), 1.5)
    done()
  })
  test('read a fractional input', (done) => {
    let input = '1/5L'
    assert.equal(convertHandler.getNum(input), 1 / 5)
    done()
  })
  test('read a fractional input with a decimal', (done) => {
    let input = '1.5/5L'
    assert.equal(convertHandler.getNum(input), 1.5 / 5)
    done()
  })
  test('return an error on a double-fraction', (done) => {
    let input = '3/2/3L'
    assert.equal(convertHandler.getNum(input), undefined)
    done()
  })
  test('default to a numerical input of 1 when no numerical input is provided', (done) => {
    let input = 'L'
    assert.equal(convertHandler.getNum(input), 1)
    done()
  })
  test('read each valid input unit', (done) => {
    assert.equal(convertHandler.getUnit('42gal'), 'gal')
    assert.equal(convertHandler.getUnit('24L'), 'L')
    assert.equal(convertHandler.getUnit('1.5/2.5mi'), 'mi')
    assert.equal(convertHandler.getUnit('km'), 'km')
    assert.equal(convertHandler.getUnit('1/2lbs'), 'lbs')
    assert.equal(convertHandler.getUnit('6.5kg'), 'kg')
    done()
  })
  test('return an error for an invalid input unit', (done) => {
    assert.equal(convertHandler.getReturnUnit('kilomegagram'), undefined)
    done()
  })
  test('return the correct return unit for each valid input unit', (done) => {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L')
    assert.equal(convertHandler.getReturnUnit('L'), 'gal')
    assert.equal(convertHandler.getReturnUnit('mi'), 'km')
    assert.equal(convertHandler.getReturnUnit('km'), 'mi')
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
    done()
  })
  test('return the spelled-out string unit for each valid input unit', (done) => {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
    assert.equal(convertHandler.spellOutUnit('L'), 'liters')
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
    done()
  })
  test('convert gal to L', (done) => {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541)
    done()
  })
  test('convert L to gal', (done) => {
    assert.equal(convertHandler.convert(1, 'L'), 0.26417)
    done()
  })
  test('convert mi to km', (done) => {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934)
    done()
  })
  test('convert km to mi', (done) => {
    assert.equal(convertHandler.convert(1, 'km'), 0.62137)
    done()
  })
  test('convert lbs to kg', (done) => {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359)
    done()
  })
  test('convert kg to lbs', (done) => {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462)
    done()
  })
})
