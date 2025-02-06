// Sample quotes array with categories
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" },
    { text: "Act as if what you do makes a difference. It does.", category: "Motivation" },
    { text: "Believe you can and you're halfway there.", category: "Inspiration" }
];

// ** Populate Categories in Dropdown **
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset options

    // Extract unique categories
    const categories = [...new Set(quotes.map(quote => quote.category))];

    // Populate dropdown with unique categories
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected category
    const lastSelectedCategory = localStorage.getItem("selectedCategory");
    if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory;
        filterQuotes();
    }
}

// ** Filter Quotes Based on Selected Category **
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory); // Save to local storage

    const quoteContainer = document.getElementById("quoteContainer");
    quoteContainer.innerHTML = ""; // Clear existing quotes

    // Filter and display quotes
    const filteredQuotes = selectedCategory === "all"
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement("p");
        quoteElement.textContent = quote.text;
        quoteContainer.appendChild(quoteElement);
    });
}

// ** Call populateCategories when the page loads **
document.addEventListener("DOMContentLoaded", () => {
    populateCategories();
    filterQuotes();
});
