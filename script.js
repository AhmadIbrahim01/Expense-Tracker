let amount_removed_history = JSON.parse(localStorage.getItem('transactions'));

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

let amount_added_history = []



const add_expense = document.getElementById("add_expense")
const expense_name = document.getElementById("expense_name")

const expense_amount = document.getElementById("expense_amount")

const category = document.getElementById("category")

const date = document.getElementById("date")


const table = document.getElementById("table")

let id = 0

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
        
        amount_removed_history.push({id: id, name:expense_name.value, amount:expense_amount.value, category: category.value, date: date.value })
        id += 1
        
        // table.innerHTML += 
        // `
        // <tr id="${id}">
        //     <td contenteditable="true">${expense_name.value}</td>
        //     <td contenteditable="true">${expense_amount.value}</td>
        //     <td contenteditable="true">${category.value}</td>
        //     <td contenteditable="true">${date.value}</td> 
        //     <td>
        //         <button onclick="editRow(${id})">Save Changes</button>
        //         <button>Delete</button>
        //     </td>
        // </tr>    
        // `
        display()
        saveToLocal()

        // expense_name.value = ""
        // expense_amount.value = ""
        
    }
    expense_name.value = ""
    expense_amount.value = ""

    
})



function display(){
    let table_inner = ""

    for (let i = 0; i < amount_removed_history.length; i++) {
        table_inner += `
            <tr id="${i}">
                <td contenteditable="true">${amount_removed_history[i].name}</td>
                <td contenteditable="true">${amount_removed_history[i].amount}</td>
                <td contenteditable="true">${amount_removed_history[i].category}</td>
                <td contenteditable="true">${amount_removed_history[i].date}</td>

                <td>
                    <button onclick="editRow(${i})">Edit</button>
                    <button onclick="deleteRow(${i})">Delete</button>
                </td>
            </tr>
            `

            
        }
        table.innerHTML = `
        <tr>
          <th>Expense Name</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
        ${table_inner}
        `
}
display()

function editRow(index) {
    const row = table.rows[index + 1];
    const name = row.cells[0].innerText;
    const amountt = row.cells[1].innerText;
    const categoryy = row.cells[2].innerText;
    const datee = row.cells[3].innerText;

    amount_removed_history[index].name = name
    amount_removed_history[index].amount = amountt
    amount_removed_history[index].category = categoryy
    amount_removed_history[index].date = datee
    
    saveToLocal()
    display()

}

function deleteRow(index) {
    number_of_transactions -= 1
    transactions.innerHTML = number_of_transactions


    
    
    balance.value += parseInt(amount_removed_history[index].amount)
    balance.innerText = balance.value + "$"

    expenses.value -= parseInt(amount_removed_history[index].amount)
    expenses.innerHTML = expenses.value + "$"
    
    amount_removed_history.splice(index, 1);
    saveToLocal()
    display();
}


function saveToLocal() {
    localStorage.setItem('transactions', JSON.stringify(amount_removed_history));
    display();
}
