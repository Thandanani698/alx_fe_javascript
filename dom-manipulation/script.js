const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Simulated API for server sync

let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Fetch quotes from server (Simulated)
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data && Array.isArray(data)) {
            quotes = [...new Map([...data, ...quotes].map(q => [q.text, q])).values()]; // Merge without duplicates
            saveQuotes();
            updateQuoteDisplay();
            showNotification("Quotes updated from server!");
        }
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}

// Send a new quote to the server (Simulated)
async function sendQuoteToServer(quote) {
    try {
        await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(quote),
            headers: { "Content-Type": "application/json" }
        });
        console.log("Quote saved to server:", quote);
    } catch (error) {
        console.error("Error sending quote:", error);
    }
}

// Display a random quote
function showRandomQuote() {
    if (quotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quoteDisplay").innerHTML = `
        <p>"${quotes[randomIndex].text}"</p>
        <small>— ${quotes[randomIndex].category}</small>
    `;
}

// Add a new quote
function addQuote() {
    const text = document.getElementById("newQuoteText").value.trim();
    const category = document.getElementById("newQuoteCategory").value.trim();

    if (text && category) {
        const newQuote = { text, category };
        quotes.push(newQuote);
        saveQuotes();
        sendQuoteToServer(newQuote);
        updateQuoteDisplay();
        populateCategories();

        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
    }
}

// Populate category dropdown
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

    const categories = [...new Set(quotes.map(q => q.category))];
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes by category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const filteredQuotes = selectedCategory === "all"
        ? quotes
        : quotes.filter(q => q.category === selectedCategory);

    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = filteredQuotes.map(q => `<p>"${q.text}"</p><small>— ${q.category}</small>`).join("");
}

// Export quotes as JSON
function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "quotes.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            updateQuoteDisplay();
            populateCategories();
            showNotification("Quotes imported successfully!");
        } catch (error) {
            console.error("Error importing JSON:", error);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Show notifications
function showNotification(message) {
    const notification = document.createElement("div");
    notification.innerText = message;
    notification.style.position = "fixed";
    notification.style.top = "10px";
    notification.style.right = "10px";
    notification.style.padding = "10px";
    notification.style.backgroundColor = "green";
    notification.style.color = "white";
    notification.style.borderRadius = "5px";
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// Auto-sync with server every 30 seconds
setInterval(fetchQuotesFromServer, 30000);

// Event Listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("exportBtn").addEventListener("click", exportQuotes);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Initial setup
populateCategories();
updateQuoteDisplay();
showRandomQuote();
