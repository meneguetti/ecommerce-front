export default function checkAuth() {
    const token = localStorage.getItem("accessToken");

    if (token) {
        return true;
    }

    return false;
}
