'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "../lib/types/signup";
import { createClient } from "../lib/db";

export default function RegisterPage() {
    const supabase = createClient();
    const [registerData, setregisterData] = useState<IUser>({ email: '', password: '' });
    const [msg, setMsg] = useState('');
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setregisterData(prevData => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMsg('');

        try {
            const { data, error } = await supabase.auth.signUp({
                email: registerData.email,
                password: registerData.password
                })

            if (error) {
                console.error("Error registrasi:", error.message);
                setMsg(`Gagal registerasi: ${error.message}`);
                return;
            }

            console.log("Registrasi berhasil, data user:", data.user);
            setMsg("Registrasi berhasil! Mengarahkan ke dashboard...");

            router.push('/login');

        } catch (error) {
            console.error("Terjadi kesalahan tak terduga:", error);
            setMsg("Terjadi kesalahan pada server.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm">
                <h1 className="text-3xl font-extrabold text-center mb-4">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email"  placeholder="yourname@example.com" value={registerData.email} onChange={handleChange} required />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" placeholder="••••••••" value={registerData.password} onChange={handleChange} required />
                    </div>
                    {msg && <p className="text-sm text-red-400">{msg}</p>}
                    <Button className="w-full bg-blue-600 hover:bg-blue-400" type="submit">
                        Sign Up
                    </Button>
                    
                    <p className="text-center text-sm text-gray-700 font-medium">
                        Sudah punya akun? <Link href='/login' className="text-blue-600 hover:underline hover:text-purple-800">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}