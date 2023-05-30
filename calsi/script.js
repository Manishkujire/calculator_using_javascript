console.log("hii")
console.log("welcome")
const numberButtons = document.querySelectorAll('[data-numbers]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operation]')
const currentOperandTextElement = document.querySelector('[data-current-operation]')
class calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        this.updateDisplay
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    append(number) {
        this.currentNumber = number
        if (number == '.' && this.currentOperand.includes('.'))
            return
        if (this.eq == 1) {
            this.currentOperand = ''
            this.eq = 0
        }
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperand == '') return
        if (this.previousOperand != '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            case '%':
                computation = prev % current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.previousOperand = ''
        this.operation = undefined
        this.eq = 1
    }
    updateDisplay() {
        if (this.currentOperand == '.') {
            this.currentOperand = `0${this.currentOperand}`
        }
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = this.previousOperand
        }
    }
}

const calsi = new calculator(previousOperandTextElement, currentOperandTextElement)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calsi.append(button.innerText)
        calsi.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calsi.chooseOperation(button.innerText)
        calsi.updateDisplay()
    })
})
equalsButton.addEventListener('click', () => {
    calsi.compute()
    calsi.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calsi.clear()
    calsi.updateDisplay()

})
deleteButton.addEventListener('click', () => {
    calsi.delete()
    calsi.updateDisplay()

})
document.body.onkeydown = function (e) {
    if (e.keyCode < 58 && e.keyCode > 47) {
        calsi.append(parseFloat(e.keyCode) - 48)
        calsi.updateDisplay()
    }

    else if (e.keyCode == 187) {
        calsi.chooseOperation('+')
        calsi.updateDisplay()
    }
    else if (e.keyCode == 8) {
        calsi.delete()
        calsi.updateDisplay()
    }
    else if (e.keyCode == 190) {
        calsi.append('.')
        calsi.updateDisplay()
    }
    else if (e.keyCode == 191) {
        calsi.chooseOperation('/')
        calsi.updateDisplay()
    }
    else if (e.keyCode == 189) {
        calsi.chooseOperation('-')
        calsi.updateDisplay()
    }
    else {
        return
    }
}
