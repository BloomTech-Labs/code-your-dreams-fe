import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        signOut({ redirect: false }).then(() => {
            router.push('/');
        });
    }, []);

    return <p>Logging out...</p>
}