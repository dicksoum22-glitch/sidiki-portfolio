const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // sert index.html, style.css, script.js, images... directement

function readMessages() {
    if (!fs.existsSync(MESSAGES_FILE)) return [];
    try { return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8')); }
    catch { return []; }
}

app.post('/contact', (req, res) => {
    const { fullname, email, message } = req.body;
    if (!fullname || !email || !message) {
        return res.status(400).json({ ok: false, error: 'All fields are required.' });
    }
    const entry = { fullname, email, message, receivedAt: new Date().toISOString() };
    const messages = readMessages();
    messages.push(entry);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    console.log('New contact message saved:', entry);
    res.status(200).json({ ok: true, message: 'Thanks! Your message has been received.' });
});

app.get('/messages', (req, res) => res.json(readMessages()));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));