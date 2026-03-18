async function addExpense() {
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    await fetch("http://127.0.0.1:5000/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            amount: Number(amount),
            category: category
        })
    });

    loadExpenses();
}

async function loadExpenses() {
    let res = await fetch("http://127.0.0.1:5000/get");
    let data = await res.json();

    let list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(e => {
        let li = document.createElement("li");
        li.textContent = `${e.category}: ₹${e.amount}`;
        list.appendChild(li);
    });

    let insightRes = await fetch("http://127.0.0.1:5000/insight");
    let insightData = await insightRes.json();

    document.getElementById("insight").textContent = insightData.message;
}

loadExpenses();
