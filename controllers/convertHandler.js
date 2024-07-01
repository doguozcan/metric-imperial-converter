function ConvertHandler() {
  this.getNum = function (input) {
    // input => 1L
    // result => 1

    // input => 1.5L
    // result => 1.5

    // input => 1.5/0.5L
    // result => 3

    let result = input.match(/[\d\/\.-]+/)?.at(0)

    // mi => 1mi
    if (!result) return 1

    // 1 => ['1']
    // 1.5/0.5 => ['1.5', '0.5']
    // 1.5, 1.5, 1.5 => ['1.5', '1.5', '1.5']

    let possibleDividentDisivor = result.split('/')

    // if there are more elements than divident and divisor
    if (possibleDividentDisivor.length > 2) return undefined

    let dividend = possibleDividentDisivor[0]

    // if there is no divisor, divide the divident by 1 in order to get the same value
    let divisor = possibleDividentDisivor[1] || '1'

    // if the number of dots is more than 1 in dividend or divisor
    if (
      dividend.split('').filter((char) => char === '.').length > 1 ||
      divisor.split('').filter((char) => char === '.').length > 1
    )
      return undefined

    result = parseFloat(dividend) / parseFloat(divisor)

    // number should not have a negative value
    if (result < 0) return undefined

    return result
  }

  this.getUnit = function (input) {
    // possible units
    let validUnits = ['gal', 'mi', 'lbs', 'l', 'km', 'kg']

    let result = input
      .match(/[a-z]+/gi)
      ?.at(0)
      .toLowerCase()

    // if the unit is not present in possible units do not accept it
    if (!validUnits.includes(result)) return undefined

    // convert liters to upper case
    if (result === 'l') return 'L'

    return result
  }

  this.getReturnUnit = function (initUnit) {
    return {
      gal: 'L',
      mi: 'km',
      lbs: 'kg',
      L: 'gal',
      km: 'mi',
      kg: 'lbs',
    }[initUnit]
  }

  this.spellOutUnit = function (unit) {
    return {
      gal: 'gallons',
      mi: 'miles',
      lbs: 'pounds',
      L: 'liters',
      km: 'kilometers',
      kg: 'kilograms',
    }[unit]
  }

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541
    const lbsToKg = 0.453592
    const miToKm = 1.60934

    let result

    if (initUnit === 'gal') {
      result = initNum * galToL
    } else if (initUnit === 'L') {
      result = initNum / galToL
    } else if (initUnit === 'lbs') {
      result = initNum * lbsToKg
    } else if (initUnit === 'kg') {
      result = initNum / lbsToKg
    } else if (initUnit === 'mi') {
      result = initNum * miToKm
    } else if (initUnit === 'km') {
      result = initNum / miToKm
    }

    return parseFloat(result.toFixed(5))
  }

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
  }
}

module.exports = ConvertHandler
