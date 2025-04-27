 document.addEventListener('DOMContentLoaded', function() {
        const userInfoDiv = document.getElementById('user-info');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            userInfoDiv.innerHTML = `Xin chào, <b>${currentUser.username}</b>`;
        } else {
            userInfoDiv.innerHTML = `<a href="login.html">Đăng nhập</a>`;
        }
    });

   document.addEventListener('DOMContentLoaded', function() {
        const loginButton = document.getElementById('login-button');
        const userInfo = document.getElementById('user-info');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            loginButton.style.display = 'none'; // Ẩn nút đăng nhập
            userInfo.style.display = 'block'; // Hiện thông tin user
            userInfo.innerHTML = `Xin chào, <b>${currentUser.username}</b> | <a href="#" onclick="logout()">Đăng xuất</a>`;
        } else {
            loginButton.style.display = 'block'; // Hiện nút đăng nhập
            userInfo.style.display = 'none'; // Ẩn phần user
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload(); // Reload lại trang để cập nhật giao diện
    }

