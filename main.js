let userForm = document.getElementById('user-form');
let editUserForm = document.getElementById('edit-user-form');
let userTableBody = document.getElementById('user-table-body');
let editUserModal = document.getElementById('edit-user-modal');
let editUserIndexInput = document.getElementById('edit-user-index');
let editNameInput = document.getElementById('edit-name');
let editLastNameInput = document.getElementById('edit-last-name');
let editAgeInput = document.getElementById('edit-age');
let editEmailInput = document.getElementById('edit-email');
let AddNew = document.getElementById('AddNew')
let CloseUser = document.getElementById('CloseUser')
let content = document.getElementById('content')
AddNew.addEventListener('click', () => {
    content.style.display = 'block'
    AddNew.style.display = 'none'
})

CloseUser.addEventListener('click', () => {
    content.style.display = 'none'
    AddNew.style.display = 'block'
})
let users = [];

function renderUserTable() {
    userTableBody.innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td><button class="edit-user-button" style = "	background-color: #000; color: white; padding: 5px 18px; border: none;border-radius: 8px;cursor: pointer;"data-index="${i}">Edit</button></td>
            <td><button class="delete-user-button"style = "	background-color: rgb(255, 36, 36); color: white; padding: 5px 18px; border: none;border-radius: 8px;cursor: pointer; data-index="${i}">Delete</button></td>
        `;
        userTableBody.appendChild(row);
    }
}

function addUser(event) {
    event.preventDefault();
    let nameInput = document.getElementById('name');
    let lastNameInput = document.getElementById('last-name');
    let ageInput = document.getElementById('age');
    let emailInput = document.getElementById('email');
    let user = {
        name: nameInput.value,
        lastName: lastNameInput.value,
        age: ageInput.value,
        email: emailInput.value
    };
    users.push(user);
    renderUserTable();
    nameInput.value = '';
    lastNameInput.value = '';
    ageInput.value = '';
    emailInput.value = '';
}

function deleteUser(event) {
    let button = event.target;
    let index = button.dataset.index;
    users.splice(index, 1);
    renderUserTable();
}

function editUser(event) {
    let button = event.target;
    let index = button.dataset.index;
    let user = users[index];
    editUserIndexInput.value = index;
    editNameInput.value = user.name;
    editLastNameInput.value = user.lastName;
    editAgeInput.value = user.age;
    editEmailInput.value = user.email;
    editUserModal.style.display = 'block';
}

function saveUser(event) {
    event.preventDefault();
    let index = editUserIndexInput.value;
    let user = users[index];
    user.name = editNameInput.value;
    user.lastName = editLastNameInput.value;
    user.age = editAgeInput.value;
    user.email = editEmailInput.value;
    renderUserTable();
    editUserModal.style.display = 'none';
}

function closeModal() {
    editUserModal.style.display = 'none';
}

userForm.addEventListener('submit', addUser);

userTableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-user-button')) {
        deleteUser(event);
    } else if (event.target.classList.contains('edit-user-button')) {
        editUser(event);
    }
});

editUserForm.addEventListener('submit', saveUser);

editUserModal.addEventListener('click', function (event) {
    if (event.target === editUserModal) {
        closeModal();
    }
});
