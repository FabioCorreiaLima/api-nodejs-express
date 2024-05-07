document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('.form-required');

    function validateInput(input, minLength, noNumbers) {
        const value = input.value;
        if (value.length < minLength || (noNumbers && /\d/.test(value))) {
            input.classList.add('error');
            input.classList.remove('valid');
        } else {
            input.classList.remove('error');
            input.classList.add('valid');
        }
    }

    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            validateInput(input, 3, true);
        });
    });

    form.addEventListener('submit', function(event) {
        inputs.forEach(function(input) {
            validateInput(input, 3, true);
        });

        if (form.querySelector('.error')) {
            event.preventDefault();
            alert('Por favor, corrija os erros no formulário antes de enviar.');
        }
    });
});


/**desaparecer o flash */
document.addEventListener('DOMContentLoaded', function() {
    var displayTime = 2000; // Tempo em milissegundos (2 segundos)
    var flashMessages = document.querySelectorAll('.flash-messages');
    
    flashMessages.forEach(function(message) {
        setTimeout(function() {
            // Fundo verde para sucesso
            message.style.transition = 'opacity 1s'; // Adicione uma transição de opacidade
            message.style.opacity = '0';
            setTimeout(function() {
                message.style.display = 'none';
            }, 1000); // Aguarde 1 segundo após a transição para ocultar a mensagem completamente
        }, displayTime);
    });
});
