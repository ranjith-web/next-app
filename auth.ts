import NextAuth, { User } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';

function getUser(email: string): Promise<User | undefined> {
    // Static data simulating user records
    const staticUsers = [
        { id: '1', email: 'alice@example.com', name: 'Alice Smith', role: 'admin', password: "123456" },
        { id: '2', email: 'bob@example.com', name: 'Bob Johnson', role: 'user', password: "123456" },
        { id: '3', email: 'charlie@example.com', name: 'Charlie Brown', role: 'editor', password: "123456" },
        { id: '4', email: 'user@nextmail.com', name: 'User', role: 'editor', password: "123456" },
    ];

    // Find the user with the matching email
    const user = staticUsers.find(user => user.email === email);

    // Simulate asynchronous behavior
    return Promise.resolve(user);
}


export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email) as any;
                if (!user) return null;

                const saltRounds = 10;
                const plainPassword = user.password;

                const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
                const passwordsMatch = await bcrypt.compare(password, hashedPassword);

                if (passwordsMatch) return user;
            }

            return null;
        },
    })],
});