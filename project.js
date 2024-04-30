function handleSubmit() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const dob = document.getElementById('dob').value;

    const errorMessages = [];

    if (name === '') {
        errorMessages.push('Name is required.');
    }

    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
        errorMessages.push('Invalid email format.');
    }

    if (isNaN(age) || age < 1) {
        errorMessages.push('Age must be a positive integer.');
    }

    if (errorMessages.length > 0) {
        document.getElementById('errorMessages').innerHTML = errorMessages.join('<br>');
    } else {
        saveData(name, email, age, dob);
        document.getElementById('userForm').reset();
    }
}

function saveData(id,name, email, age, dob) {
    const userData = {
        id:id,
        name: name,
        email: email,
        age: age,
        dob: dob
    };

    let users = [];
    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
    }
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    displayUserData();
}

function displayUserData() {
    const users = JSON.parse(localStorage.getItem('users'));
    const userDataDiv = document.getElementById('userData');
    userDataDiv.innerHTML = '';

    if (users && users.length > 0) {
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Date of Birth</th>
            </tr>
        `;
        users.forEach(user => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>${user.dob}</td>
            `;
        });
        userDataDiv.appendChild(table);
    } else {
        userDataDiv.innerHTML = 'No user data available.';
    }
}

window.onload = function () {
    displayUserData();
};