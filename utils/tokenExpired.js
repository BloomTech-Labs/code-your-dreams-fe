import jwtDecode from 'jwt-decode';

export default function tokenExpired (token) {
    try {
        const decoded = jwtDecode(token);
        const current = Date.now() / 1000;
        console.log(`Expiration in seconds: ${decoded.exp} / Current time in seconds: ${current}`);
        console.log(decoded.exp < current);

        return decoded.exp < current;
    } catch (error) {
        console.error('Failed to decode JWT token:', error)
        return true;
    }
}