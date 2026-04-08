// 1. YOUR BOOK DATA (The 30 books)
const books = [
    { title: "Structural Engineering", author: "J. Smith", cover: "people-library-flat-vector-illustration/stuctural engineering.jpg" },
    { title: "Global History", author: "M. Brown", cover: "people-library-flat-vector-illustration/world-history-450-675-4102840955.jpg" },
    { title: "Computer Ethics", author: "A. Jones", cover: "people-library-flat-vector-illustration/computer ethinics.jpg" },
    { title: "Modern Physics", author: "L. Jackson", cover: "people-library-flat-vector-illustration/modern physics.jpg" },
    { title: "Sociology Principles", author: "R. Liatt", cover: "people-library-flat-vector-illustration/Principles-of-Sociology-3282007033.jpg" },
    { title: "Intro to Philosophy", author: "D. Cunker", cover: "people-library-flat-vector-illustration/into to philosophy.jpg" },
    { title: "Organic Chemistry", author: "Dr. L. Pasteur", cover: "people-library-flat-vector-illustration/organic-chemistry.jpg" },
    { title: "Artificial Intelligence", author: "S. Russell", cover: "people-library-flat-vector-illustration/ai-foundations.jpg" },
    { title: "Marine Biology", author: "Rachel Carson", cover: "people-library-flat-vector-illustration/marine-bio.jpg" },
    { title: "Calculus III", author: "James Stewart", cover: "people-library-flat-vector-illustration/calculus-3.jpg" },
    { title: "Cyber Security", author: "K. Mitnick", cover: "people-library-flat-vector-illustration/cyber-security.jpg" },
    { title: "Genetics & DNA", author: "G. Mendel", cover: "people-library-flat-vector-illustration/genetics.jpg" },
    { title: "Macroeconomics", author: "John Keynes", cover: "people-library-flat-vector-illustration/macro-econ.jpg" },
    { title: "Digital Marketing", author: "Seth Godin", cover: "people-library-flat-vector-illustration/digital-marketing.jpg" },
    { title: "Business Law", author: "B. Blackstone", cover: "people-library-flat-vector-illustration/business-law.jpg" },
    { title: "Financial Accounting", author: "L. Pacioli", cover: "people-library-flat-vector-illustration/accounting.jpg" },
    { title: "Entrepreneurship", author: "P. Drucker", cover: "people-library-flat-vector-illustration/entrepreneurship.jpg" },
    { title: "Creative Writing", author: "Maya Angelou", cover: "people-library-flat-vector-illustration/creative-writing.jpg" },
    { title: "Art History", author: "E. Gombrich", cover: "people-library-flat-vector-illustration/art-history.jpg" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "people-library-flat-vector-illustration/great-gatsby.jpg" },
    { title: "Graphic Design Basics", author: "Ellen Lupton", cover: "people-library-flat-vector-illustration/graphic-design.jpg" },
    { title: "Music Theory", author: "J.S. Bach", cover: "people-library-flat-vector-illustration/music-theory.jpg" },
    { title: "Criminal Psychology", author: "S. Freud", cover: "people-library-flat-vector-illustration/criminal-psych.jpg" },
    { title: "Political Science", author: "N. Machiavelli", cover: "people-library-flat-vector-illustration/political-sci.jpg" },
    { title: "Anthropology", author: "Margaret Mead", cover: "people-library-flat-vector-illustration/anthropology.jpg" },
    { title: "Public Speaking", author: "Dale Carnegie", cover: "people-library-flat-vector-illustration/public-speaking.jpg" },
    { title: "Human Geography", author: "C. Sauer", cover: "people-library-flat-vector-illustration/human-geography.jpg" },
    { title: "Modern Architecture", author: "Le Corbusier", cover: "people-library-flat-vector-illustration/architecture.jpg" },
    { title: "Human Anatomy", author: "Henry Gray", cover: "people-library-flat-vector-illustration/anatomy.jpg" },
    { title: "Sustainable Design", author: "V. Papanek", cover: "people-library-flat-vector-illustration/sustainable-design.jpg" }
];

const bookGrid = document.getElementById('bookGrid');
const searchInput = document.getElementById('searchInput');

// 2. WELCOME MESSAGE FEATURE
// Grabs the ID you typed in the login page
const username = localStorage.getItem('xoolUserName') || "Guest";
const welcomeElement = document.getElementById('welcomeUser');
if(welcomeElement) {
    welcomeElement.innerText = `Hello, ${username}`;
}

// 3. LOGOUT LOGIC
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('xoolUserName'); // Clear the session
        window.location.href = "landing.html"; // Go back to login
    });
}

// 4. DISPLAY FUNCTION (Handles UI and Empty State)
function displayBooks(bookList) {
    // Empty State Check
    if (bookList.length === 0) {
        bookGrid.innerHTML = `
            <div class="empty-state">
                <i class="ph ph-magnifying-glass-minus" style="font-size: 3rem; display: block; margin-bottom: 10px;"></i>
                <h3>No books found</h3>
                <p>Try searching for a different title or author.</p>
            </div>`;
        return;
    }

    // Render Books
    bookGrid.innerHTML = bookList.map((book) => `
        <div class="book-card">
            <img src="${book.cover}" alt="${book.title}" class="book-cover" onerror="this.src='https://via.placeholder.com/200x300?text=No+Cover'">
            <div class="book-info">
                <h4>${book.title}</h4>
                <p>${book.author}</p>
                <button class="borrow-btn" onclick="toggleBorrow(this, '${book.title}')">Borrow</button>
            </div>
        </div>
    `).join('');
}

// 5. BOOK INTERACTION (Borrow/Return)
function toggleBorrow(btn, bookTitle) {
    if (btn.innerText === "Borrow") {
        btn.innerText = "Return";
        btn.style.backgroundColor = "#e2e8f0"; // Change color when borrowed
        btn.style.color = "#64748b";
        alert(`Success! You have borrowed: ${bookTitle}`);
    } else {
        btn.innerText = "Borrow";
        btn.style.backgroundColor = ""; // Reset to CSS default
        btn.style.color = "";
    }
}

// 6. LIVE SEARCH LOGIC
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = books.filter(book => 
        book.title.toLowerCase().includes(term) || 
        book.author.toLowerCase().includes(term)
    );
    displayBooks(filtered);
});

// INITIAL LOAD
displayBooks(books);