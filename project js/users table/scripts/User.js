import { drawTableRows } from "./domService.js";

export class User {
    static usersList = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    // עדכון המונה לפי המספר הגבוה ביותר הקיים
    static count = User.usersList.length > 0
        ? Math.max(...User.usersList.map(user => user.id))
        : 0;

    id;
    firstName;
    lastName;
    email;
    password;
    isLogedIn = false;

    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.id = ++User.count;

        User.usersList.push(this);
        localStorage.setItem('users', JSON.stringify(User.usersList));
        drawTableRows(User.usersList);
    }

    static removeUser(id) {
        User.usersList = User.usersList.filter(user => user.id !== id);
        localStorage.setItem('users', JSON.stringify(User.usersList));
        drawTableRows(User.usersList);
    }

    static login(id) {
        const user = User.usersList.find((user) => user.id === id);
        if (user) {
            user.isLogedIn = true;
            localStorage.setItem('users', JSON.stringify(User.usersList));
            drawTableRows(User.usersList);
        }
    }

    static logout(id) {
        const user = User.usersList.find((user) => user.id === id);
        if (user) {
            user.isLogedIn = false;
            localStorage.setItem('users', JSON.stringify(User.usersList));
            drawTableRows(User.usersList);
        }
    }

    static editUser(id, firstName, lastName, email, password) {
        console.log('Editing user:', { id, firstName, lastName, email, password });

        // מציאת האינדקס של המשתמש במערך
        const userIndex = User.usersList.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            throw new Error('משתמש לא נמצא');
        }
        User.usersList[userIndex] = {
            ...User.usersList[userIndex],
            firstName,
            lastName,
            email,
            password
        };

        console.log('Updated user:', User.usersList[userIndex]);
        localStorage.setItem('users', JSON.stringify(User.usersList));
        drawTableRows(User.usersList);

        return User.usersList[userIndex];
    }
}