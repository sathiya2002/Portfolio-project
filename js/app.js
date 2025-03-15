// Smooth scrolling for navbar links
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

document.getElementById('cvButton').addEventListener('click', function() {
    const cvUrl = 'assets/SathiyaPriya.pdf';  // Relative path to the CV file
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'SathiyaPriya.pdf';  // Optional: specify the name of the file
    link.click();
});

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    // Prevent default form submission
    e.preventDefault();

    // Create FormData object and convert to JSON
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Show loading message
    result.innerHTML = "Please wait...";
    result.style.display = "block";  // Make sure result is visible

    // Submit data using Fetch API
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        const jsonResponse = await response.json();
        if (response.status === 200) {
            result.innerHTML = jsonResponse.message; // Success message
        } else {
            result.innerHTML = jsonResponse.message; // Error message
        }
    })
    .catch(error => {
        console.log(error);
        result.innerHTML = "Something went wrong!"; // Show error if something goes wrong
    })
    .finally(() => {
        form.reset(); // Reset the form after submission
        setTimeout(() => {
            result.style.display = "none"; // Hide the result message after a while
        }, 3000);
    });
});

