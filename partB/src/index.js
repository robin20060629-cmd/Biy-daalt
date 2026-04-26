const express = require('express');
const app = express();
app.use(express.json());

// Fake Database
let books = [
    { id: 1, title: "Clean Code", author: "Robert Martin", available: true },
    { id: 2, title: "Design Patterns", author: "Gang of Four", available: true }
];

let rentals = []; // { userId: string, bookId: number }

 // Б.1 - Ном зээлэх API
 // Бизнес дүрэм: Хэрэглэгч хамгийн ихдээ 5 ном зээлж болно.

app.post('/rent', (req, res) => {
    const { userId, bookId } = req.body;

    // 1. Хэрэглэгчийн зээлсэн номын тоог шалгах
    const userRentals = rentals.filter(r => r.userId === userId);
    if (userRentals.length >= 5) {
        return res.status(400).json({ 
            error: "Limit Exceeded", 
            message: "Та хамгийн ихдээ 5 ном зээлэх боломжтой." 
        });
    }

    // 2. Ном байгаа эсэхийг шалгах
    const book = books.find(b => b.id === bookId);
    if (!book || !book.available) {
        return res.status(404).json({ error: "Ном олдохгүй байна эсвэл зээлэгдсэн байна." });
    }

    // 3. Зээлүүлэх
    book.available = false;
    rentals.push({ userId, bookId });
    
    res.json({ message: "Амжилттай зээллээ!", currentRentals: userRentals.length + 1 });
});

 // Б.2 - Ном буцаах API

app.post('/return', (req, res) => {
    const { userId, bookId } = req.body;
    
    const rentalIndex = rentals.findIndex(r => r.userId === userId && r.bookId === bookId);
    if (rentalIndex === -1) {
        return res.status(404).json({ error: "Зээлийн түүх олдсонгүй." });
    }

    rentals.splice(rentalIndex, 1);
    const book = books.find(b => b.id === bookId);
    if (book) book.available = true;

    res.json({ message: "Амжилттай буцаалаа." });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Library API running on http://localhost:${PORT}`));
