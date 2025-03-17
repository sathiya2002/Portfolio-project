
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
    const cvUrl = 'assets/SathiyaPriya.pdf';  
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'SathiyaPriya.pdf';  
    link.click();
});

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    
    e.preventDefault();

   
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    
    result.innerHTML = "Please wait...";
    result.style.display = "block";  

    
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
            result.innerHTML = jsonResponse.message; 
        } else {
            result.innerHTML = jsonResponse.message; 
        }
    })
    .catch(error => {
        console.log(error);
        result.innerHTML = "Something went wrong!"; 
    })
    .finally(() => {
        form.reset(); 
        setTimeout(() => {
            result.style.display = "none"; 
        }, 3000);
    });
});

