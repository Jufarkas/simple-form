// found this regex for a 'universal' postal code check (more of a 'better than nothing')
// can plug into regex101 and get full description of what it does
// (?i)^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$

(function() {
    let emailInput = document.getElementById('emailInput');
    let zipInput = document.getElementById('zipCode');
    let passInput = document.getElementById('password');
    let passConfirmInput = document.getElementById('passConfirm');
    const FORM = document.querySelector('form');

    function inputFocusLoss() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focusout', () => {
                if (input.classList.contains('correct') || input.id.includes('passConfirm')){
                    return;
                } else {
                    input.classList.add('error');
                }
            });
        })
    };

    function emailValidation(){
        emailInput.addEventListener('keyup', () => {
            if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailInput.value) === false){
                emailInput.classList.add('error');
                emailInput.setCustomValidity("Email must contain @ followed by domain");
                emailInput.reportValidity();
            } else {
                emailInput.setCustomValidity('');
                emailInput.classList.remove('error');
                emailInput.classList.add('correct');
            }
        })
    };

    function zipCodeValidation() {
        zipInput.addEventListener('keyup', () => {
            if (zipInput.value.length < 4){
                zipInput.classList.add('error');
                zipInput.setCustomValidity("Invalid ZIP, min 4 characters");
                zipInput.reportValidity();
            } else {
                zipInput.setCustomValidity('');
                zipInput.classList.remove('error');
                zipInput.classList.add('correct');
            }
        })
    };

    function passwordValidation(){
        passInput.addEventListener('keyup', () => {
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(passInput.value)){
                passInput.classList.add('error');
                passInput.setCustomValidity("Invalid password, see rules below");
                passInput.reportValidity();
            } else {
                passInput.setCustomValidity('');
                passInput.classList.remove('error');
                passInput.classList.add('correct');
            }
        })        
    };

    inputFocusLoss();
    emailValidation();
    zipCodeValidation();
    passwordValidation()

    FORM.addEventListener('submit', (e) => {
        if (passInput.value != passConfirmInput.value){
            e.preventDefault();
            passConfirmInput.classList.add('error');
            passConfirmInput.setCustomValidity("Passwords do not match");
            passConfirmInput.reportValidity();
            passConfirmInput.addEventListener('keyup', () => {
                validatePassword();
            })
        } else {
            passConfirmInput.setCustomValidity('');
            passConfirmInput.classList.remove('invalid');
        }
    });

    function validatePassword(){
        if(passInput.value != passConfirmInput.value) {
            passConfirmInput.setCustomValidity("Passwords do not match");
        } else {
            passConfirmInput.setCustomValidity('');
        }
    };
})();