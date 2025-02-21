
const validators = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^[a-zA-Z0-9]{8,}$/,
    text: /^[\u0590-\u05FF\w\s]{2,}$/,
    tel: /^(0[57])[0-9]{8}$/
};

// CSS לשליטה במראה השדות
const style = document.createElement('style');
style.textContent = `
    .form-control {
        border-bottom: 4px solid #007bff !important;
        transition: border-color 0.3s ease;
    }
    
    .form-control.valid {
        border-bottom: 4px solid #28a745 !important;
    }
    
    .form-control.invalid {
        border-bottom: 4px solid #dc3545 !important;
    }

    #success-message {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

function validateField(input) {
    const validator = validators[input.id] || validators[input.type];
    if (validator && input.value) {
        return validator.test(input.value);
    }
    return false;
}

function areAllFieldsValid(inputs) {
    return Array.from(inputs).every(input => validateField(input));
}

function setupValidation() {
    const inputs = document.querySelectorAll('.form-control');
    const submitBtn = document.getElementById('submit');
    const successMessage = document.getElementById('success-message');
    const form = document.getElementById('form');

    if (!submitBtn || !successMessage || !form) {
        console.error('חלק מהאלמנטים חסרים בדף');
        return;
    }

    inputs.forEach(input => {
        input.addEventListener('input', function () {
            const validator = validators[this.id];
            if (validator) {
                const isValid = validator.test(this.value);
                this.classList.remove('valid', 'invalid');
                if (this.value) {
                    this.classList.add(isValid ? 'valid' : 'invalid');
                }
            }
        });
    });

    function checkAllFields() {
        let allValid = true;
        inputs.forEach(input => {
            const validator = validators[input.id];
            if (validator) {
                if (!validator.test(input.value)) {
                    allValid = false;
                }
            }
        });
        return allValid;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (checkAllFields()) {
            successMessage.style.display = 'block';
            successMessage.style.opacity = '1';

            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 300);

                form.reset();
                inputs.forEach(input => {
                    input.classList.remove('valid', 'invalid');
                });
            }, 3000);
        } else {
            console.log('יש שדות לא תקינים בטופס');
        }
    });

    submitBtn.addEventListener('click', function (e) {
        if (!e.target.form) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
}

setupValidation();  