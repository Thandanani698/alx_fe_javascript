// Sample Quotes Data
const quotes = [
    { text: "The best way to predict the future is to create it.", category: "Inspirational" },
    { text: "I used to think I was indecisive, but now I'm not so sure.", category: "Funny" },
    { text: "Don't watch the clock; do what it does. Keep going.", category: "Motivational" },
    { text: "The only way to do great work is to love what you do.", category: "Inspirational" },
    { text: "I'm writing a book. I've got the page numbers done.", category: "Funny" },
    { text: "Believe you can and you're halfway there.", category: "Motivational" }
];

// Function to populate categories dynamically
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = new Set(["all"]); // Start with the "all" category
    
    quotes.forEach(quote => {
        categories.add(quote.category); // Extract unique categories
    });

    // Clear existing options in the dropdown before adding new ones
    categoryFilter.innerHTML = "<option value='all'>All Categories</option>";

    // Add unique categories to the dropdown
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    
    // Filter quotes based on the selected category
    const filteredQuotes = selectedCategory === "all" 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);

    displayQuotes(filteredQuotes); // Display filtered quotes
    saveCategoryToLocalStorage(selectedCategory); // Save selected category to localStorage
}

// Function to display quotes
function displayQuotes(quotesToDisplay) {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ""; // Clear the current quotes
    
    quotesToDisplay.forEach(quote => {
        const quoteElement = document.createElement("p");
        quoteElement.textContent = quote.text;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Function to save the selected category to local storage
function saveCategoryToLocalStorage(category) {
    localStorage.setItem("selectedCategory", category); // Save category to local storage
}

// Function to restore the last selected category from local storage
function restoreCategoryFromLocalStorage() {
    const savedCategory = localStorage.getItem("selectedCategory");

    if (savedCategory) {
        // If a saved category exists, set the dropdown value and filter quotes
        document.getElementById("categoryFilter").value = savedCategory;
        filterQuotes(); // Filter quotes based on the saved category
    } else {
        // Default to filtering all quotes
        filterQuotes();
    }
}

// Run the following on page load
window.addEventListener("load", () => {
    populateCategories();
    restoreCategoryFromLocalStorage();
});
