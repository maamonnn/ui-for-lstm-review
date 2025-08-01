'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "../lib/types/signup";
import { createClient } from "../lib/db";

export default function LoginPage() {
    const supabase = createClient();
    const [loginData, setLoginData] = useState<IUser>({ email: '', password: '' });
    const [msg, setMsg] = useState('');
    const [status, setStatus] = useState(false)
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginData(prevData => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMsg('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: loginData.email,
                password: loginData.password,
            });

            if (error) {
                console.error("Error login:", error.message);
                setMsg(`Gagal login: ${error.message}`);
                return;
            }

            console.log("Login berhasil, data user:", data.user);
            setMsg("Login berhasil! Mengarahkan ke dashboard...");
            setStatus(true)

            router.push('/dashboard');

        } catch (error) {
            console.error("Terjadi kesalahan tak terduga:", error);
            setMsg("Terjadi kesalahan pada server.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg py-16 px-16 rounded-lg border shadow-xl bg-card">
                <h1 className="text-3xl font-extrabold text-center mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email"  placeholder="yourname@example.com" value={loginData.email} onChange={handleChange} required />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" placeholder="••••••••" value={loginData.password} onChange={handleChange} required />
                    </div>
                    {msg && (status ? (<p className="text-sm text-green-700 bg-green-300 rounded-lg p-2 w-fit border border-green-700">{msg}</p>) : (<p className="text-sm text-red-700 bg-red-300 rounded-lg p-2 w-fit border border-red-700">{msg}</p>))}
                    <Button className="w-full bg-blue-600 hover:bg-blue-400 text-secondary-foreground" type="submit">
                        Sign In
                    </Button>
                    
                    <p className="text-center text-sm text-muted-foreground font-medium">
                        Belum punya akun? <Link href='/register' className="text-blue-600 hover:underline hover:text-purple-800">Daftar</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}