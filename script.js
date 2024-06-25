document.addEventListener('DOMContentLoaded', () => {
    const profilesContainer = document.getElementById('container');
    const profilesTable = document.querySelector('#table tbody');
    const fetchUsersButton = document.getElementById('fetch-users');

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://randomuser.me/api/?results=5');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const users = data.results;

            profilesContainer.innerHTML = '';
            profilesTable.innerHTML = '';

            users.forEach(user => {
                const profileElement = document.createElement('div');
                profileElement.classList.add('user-profile');
                profileElement.innerHTML = `
                    <img src="${user.picture.large}" alt="User Picture">
                    <h2>${user.name.first} ${user.name.last}</h2>
                    <p>${user.email}</p>
                `;
                profilesContainer.appendChild(profileElement);

                const tableRow = document.createElement('tr');
                tableRow.innerHTML = `
                    <td>${user.name.first} ${user.name.last}</td>
                    <td>${user.email}</td>
                `;
                profilesTable.appendChild(tableRow);
            });
        } catch (error) {
            profilesContainer.innerHTML = `<p>Error fetching user data: ${error.message}</p>`;
        }
    };

    fetchUsersButton.addEventListener('click', fetchUsers);

    fetchUsers();
});