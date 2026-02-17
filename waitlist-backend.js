const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const WAITLIST_FILE = path.join(__dirname, 'waitlist.json');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure waitlist file exists
if (!fs.existsSync(WAITLIST_FILE)) {
    fs.writeFileSync(WAITLIST_FILE, '[]');
}

app.post('/api/waitlist', (req, res) => {
    const { email } = req.body;
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    const waitlist = JSON.parse(fs.readFileSync(WAITLIST_FILE));
    if (waitlist.find(e => e.email === email)) {
        return res.status(409).json({ error: 'Email already registered' });
    }
    waitlist.push({ email, date: new Date().toISOString() });
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Waitlist backend running on port ${PORT}`);
});
