document.getElementById('logout').addEventListener('click', (e) => {
    document.cookie = "AccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "RefreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
})

// 2. no access to app.html if not login
// 3. setup messagerie