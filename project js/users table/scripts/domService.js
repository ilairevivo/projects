import { User } from './User.js';

const drawTableRows = (users) => {
    const tableBody = document.querySelector('#users-table-body');
    tableBody.innerHTML = '';

    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.isLogedIn ? 'מחובר' : 'מנותק'}</td>
        `;

        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'התנתקות';
        logoutBtn.addEventListener('click', () => {
            User.logout(user.id);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'מחיקה';
        deleteBtn.addEventListener('click', () => {
            User.removeUser(user.id);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'עריכה';
        editButton.addEventListener('click', () => {
            const container = document.querySelector('.container');
            container.style.display = 'none';

            const newContainer = document.createElement('div');
            newContainer.classList.add('edit-container');

            newContainer.innerHTML = `
            <h1>עריכת משתמש</h1>
            <form class="edit-form">
                <div class="form-control">
                <label for="firstName">שם פרטי:</label>
                <input type="text" name="firstName" id="firstName" class="inputDOM" value="${user.firstName}">
                </div>
                <div class="form-control">
                <label for="lastName">שם משפחה:</label>     
                <input type="text" name="lastName" id="lastName" class="inputDOM" value="${user.lastName}">
                </div>
                <div class="form-control">
                <label for="email">אימייל:</label>
                <input type="email" name="email" id="email" class="inputDOM"  value="${user.email}">
                </div>
                <div class="form-control">
                <label for="password">סיסמה:</label>
                <input type="password" name="password" id="password" class="inputDOM" value="${user.password}">
                </div>
                <button type="submit"   class="btn">שמירה</button>
            </form>
            `;
            
            newContainer.style.textAlign = 'center';
            newContainer.style.display = 'flex';
            newContainer.style.justifyContent = 'center';
            newContainer.style.alignItems = 'center';
            newContainer.style.height = '100vh';
            newContainer.style.width = '80%';
            newContainer.style.margin = 'auto';
            newContainer.style.flexDirection = 'column';
            newContainer.style.backgroundColor = '#f1f1f16c';
            newContainer.style.borderRadius = '10px';
            newContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';

            document.body.appendChild(newContainer);

            const form = newContainer.querySelector('.edit-form');
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                console.log('Form submitted');

                const updatedFirstName = form.querySelector('#firstName').value;
                const updatedLastName = form.querySelector('#lastName').value;
                const updatedEmail = form.querySelector('#email').value;
                const updatedPassword = form.querySelector('#password').value;
                    User.editUser(user.id, updatedFirstName, updatedLastName, updatedEmail, updatedPassword);

                    newContainer.remove();
                    container.style.display = 'block';
                
            });
        });

        row.appendChild(logoutBtn);
        row.appendChild(deleteBtn);
        row.appendChild(editButton);
        tableBody.appendChild(row);
    });
};
const registerForm = document.querySelector('.register-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const users = User.usersList;

    if (users.find((user) => user.email === email)) {
        alert('משתמש עם כתובת דוא"ל זו כבר קיים');
        return;
    }
    new User(firstName, lastName, email, password);
    e.target.reset();
});

const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const user = User.usersList.find((user) => user.email === email);
    if (user && user.password === password) {
        User.login(user.id);
        e.target.reset();
    } else {
        alert('שם משתמש או סיסמה לא נכונים');
    }
});

export { drawTableRows, registerForm, loginForm };