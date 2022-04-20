const add = document.getElementById('add')
const subtract = document.getElementById('subtract')
const multiply = document.getElementById('multiply')
const divide = document.getElementById('divide')

const x = document.getElementById('x')
const y = document.getElementById('y')

const result = document.getElementById('result')

add.addEventListener('click', doAdd)
subtract.addEventListener('click', doSubtract)
multiply.addEventListener('click', doMultiply)
divide.addEventListener('click', doDivide)

add.addEventListener('mouseover', checkNumbers)
subtract.addEventListener('mouseover', checkNumbers)
multiply.addEventListener('mouseover', checkNumbers)
divide.addEventListener('mouseover', checkNumbers)




function checkNumbers() {
    if ((x.value.trim()) == '' || y.value.trim() == '') {
        alert('Введите число x и число y')
    }

}
function doAdd() {
    const expression = +(x.value) + +(y.value)
    result.value = expression
    saveCalcValues()
}

function doSubtract() {

}

function doMultiply() {

}

function doDivide() {

}

function createCalc() {
    return {
        x: '0',
        y: '0',
        result: '0'
    }
}

function saveCalcValues() {
    calc.x = x.value
    calc.y = y.value
    calc.result = result.value
    localStorage.setItem('calc', JSON.stringify(calc))
}

function getCalcValues() {
    if (localStorage.getItem('calc')) {
        const js = JSON.parse(localStorage.getItem('calc'))
        console.log(js)
        return JSON.parse(localStorage.getItem('calc'))
    }else {
        return createCalc()
    }
}

function renderValues(){
    x.value = calc.x
    y.value = calc.y
    result.value = calc.result
}


const calc = getCalcValues()
renderValues()
