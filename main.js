// Placeholder for future JS (e.g., waitlist form handling)
document.querySelector('.waitlist-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    fetch('http://localhost:4000/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(async res => {
        if (res.ok) {
            alert('Thank you for joining the waitlist, ' + email + '!');
            this.reset();
        } else {
            const data = await res.json();
            alert(data.error || 'Something went wrong.');
        }
    })
    .catch(() => {
        alert('Could not connect to waitlist server. Please try again later.');
    });
});
