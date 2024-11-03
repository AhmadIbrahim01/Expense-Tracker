const budget_amount = document.getElementById("budget_amount")
const budget_name = document.getElementById("budget_name")

const income = document.getElementById("income")
const add_income = document.getElementById("add_income")

const transactions = document.getElementById("transactions")
const balance = document.getElementById("balance")
const expenses = document.getElementById("expenses")

balance.innerHTML = 0
balance.value = 0
expenses.innerHTML = 0
expenses.value = 0
number_of_transactions = 0
transactions.innerHTML = 0
income.innerHTML = 0
let new_income = 0

amount_added_history = []
amount_removed_history = []



const add_expense = document.getElementById("add_expense")
const expense_name = document.getElementById("expense_name")

const expense_amount = document.getElementById("expense_amount")

const category = document.getElementById("category")

const date = document.getElementById("date")

add_income.addEventListener("click", (e)=>{
    e.preventDefault()
    if (budget_amount.value > 0 && budget_name.value !== ""){
        number_of_transactions += 1
        new_income = parseInt(budget_amount.value) + parseInt(income.innerHTML)
        income.innerText = new_income + "$"

        balance.value = parseInt(balance.value) + parseInt(budget_amount.value)
        balance.innerText = balance.value + "$"

        amount_added_history.push({name:budget_name.value, amount:budget_amount.value })
        

        transactions.innerHTML = number_of_transactions
        console.log(amount_added_history)
    }
    budget_amount.value = ""
    budget_name.value = ""
})


add_expense.addEventListener("click", (e)=>{
    e.preventDefault()
    if(expense_name.value !== "" && expense_amount.value > 0){
        number_of_transactions += 1
        expenses.value += parseInt(expense_amount.value)
        expenses.innerHTML = expenses.value + "$"
        transactions.innerHTML = number_of_transactions

        balance.value = parseInt(balance.value) - parseInt(expense_amount.value)
        balance.innerText = balance.value + "$"    
        
        amount_removed_history.push({name:expense_name.value, amount:expense_amount.value, category: category.value, date: date.value })

        console.log(amount_removed_history)
        console.log(amount_removed_history.length)
    }
    expense_name.value = ""
    expense_amount.value = ""
})


