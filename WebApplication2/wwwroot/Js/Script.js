document.addEventListener('DOMContentLoaded', function () {
    GetUsers();
});

function GetUsers() {
    const url = `https://localhost:7127/api/home`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let tbody = document.getElementById('_users_tbody_id');
            tbody.innerHTML = '';
            let rows = '';

            data.forEach(u => {
                rows += "<tr>";
                rows += `<td>${u.id}</td>`;
                rows += `<td>${u.firstName}</td>`;
                rows += `<td>${u.lastName}</td>`;
                rows += `<td>${u.email}</td>`;
                rows += `<td><button type="button" class="btn btn-primary update" data-id="${u.id}" data-bs-toggle="modal" data-bs-target="#upd">Update</button></td>`;
                rows += `<td><button type="button" class="btn btn-danger delete" data-id="${u.id}">Delete</button></td>`;
                rows += "</tr>";
            });

            tbody.innerHTML = rows;

            const deleteButtons = document.getElementsByClassName('delete');
            for (let i = 0; i < deleteButtons.length; i++) {
                deleteButtons[i].addEventListener('click', function () {
                    const userId = this.getAttribute('data-id');
                    document.getElementById('deleteModal').style.display = 'flex';
                    document.getElementById('confirmDelete').setAttribute('data-id', userId);
                });
            }

            const updButtons = document.getElementsByClassName('update');
            for (let i = 0; i < updButtons.length; i++) {
                updButtons[i].addEventListener('click', function () {
                    const userId = this.getAttribute('data-id');
                    const user = data.find(u => u.id == userId);

                    document.getElementById('FirstName').value = user.firstName;
                    document.getElementById('LastName').value = user.lastName;
                    document.getElementById('Email').value = user.email;

                    document.getElementById('upd').style.display = 'flex';

                    document.getElementById('sub').setAttribute('data-id', userId);
                });
            }
        });
}



document.getElementById('searchBtn').addEventListener('click', function (event) {
    event.preventDefault();
    const url = `https://localhost:7127/api/home`;
    const id = document.getElementById('search').value;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let tbody = document.getElementById('_users_tbody_id');
            tbody.innerHTML = '';
            let rows = '';
            data.forEach(u => {
                if (u.id == id) {
                    rows += "<tr>";
                    rows += `<td>${u.id}</td>`;
                    rows += `<td>${u.firstName}</td>`;
                    rows += `<td>${u.lastName}</td>`;
                    rows += `<td>${u.email}</td>`;
                    rows += `<td><button type="button" class="btn btn-primary update" data-id="${u.id}" data-bs-toggle="modal" data-bs-target="#upd">Update</button></td>`;
                    rows += `<td><button type="button" class="btn btn-danger delete" data-id="${u.id}">Delete</button></td>`;
                    rows += "</tr>";
                }
            });
            tbody.innerHTML += rows;
        })
        
});



document.getElementById('cancelDelete').addEventListener('click', function () {
    document.getElementById('deleteModal').style.display = 'none';
});




document.getElementById('confirmDelete').addEventListener('click', function () {
    const userId = this.getAttribute('data-id');
    const url = `https://localhost:7127/api/home/${userId}`;

    fetch(url, {
        method: 'DELETE'
    })
        .then(res => {
            if (res.ok) {
                document.getElementById('deleteModal').style.display = 'none';
                GetUsers();
            } 
        })
});



document.getElementById('sub').addEventListener('click', function () {
    const userId = this.getAttribute('data-id');
    const updatedUser = {
        id: userId,
        firstName: document.getElementById('FirstName').value,
        lastName: document.getElementById('LastName').value,
        email: document.getElementById('Email').value
    };
    console.log(JSON.stringify(updatedUser))
    fetch(`https://localhost:7127/api/home`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify(updatedUser)
    })
        .then(() => {
            
            GetUsers();

            document.getElementById('upd').style.display = 'none';
        })
       
});