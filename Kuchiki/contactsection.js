document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the form from actually submitting
           
            // Get the form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
           
            // Output the data (alert popup and console log)
            alert(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
            console.log('Contact Data:', { name, email, message });
           
            // Optional: Clear the form
            form.reset();
        });
    }
});