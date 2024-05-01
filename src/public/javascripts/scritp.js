document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.ok) {
            console.log('Redirecionando...');
            window.location.href = 'http://localhost:2000/'; 
        } else {
            alert(data.message); 
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
