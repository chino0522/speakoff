'use client'
import { Button } from '@radix-ui/themes';
import { useState } from 'react';

interface SignInFormData {
    email: string;
    password: string;
}

export default function SignInForm() {
    const [formData, setFormData] = useState<SignInFormData>({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Sign in failed');
            }

            // Handle successful sign in (e.g., redirect, close modal, etc.)
            const data = await response.json();
            console.log('Sign in successful:', data);
            // Example: window.location.href = '/dashboard';
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-theme-lime transition-all duration-200"
                    placeholder="you@example.com"
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-theme-lime transition-all duration-200"
                    placeholder="••••••••"
                    required
                />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <div className="pt-2">
                <Button
                    type="submit"
                    variant="solid"
                    size="3"
                    disabled={isLoading}
                    className="px-6 py-2 w-full font-medium text-black bg-theme-lime hover:bg-[#d4e89b] rounded-lg transition-all duration-200 shadow-md cursor-pointer"
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
            </div>
        </form>
    );
}