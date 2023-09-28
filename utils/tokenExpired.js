import jwtDecode from 'jwt-decode';

export default function tokenExpired (token) {
    try {
        const decoded = jwtDecode(token);
        const current = Date.now() / 1000;

        return decoded.exp < current;
    } catch (error) {
        console.error('Failed to decode JWT token:', error)
        return true;
    }
}