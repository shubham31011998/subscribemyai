import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignupForm({
    className,
}: React.ComponentProps<"form">) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [error, setError] = useState("")
    const router = useRouter();

    const handleSignup = async () => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    displayName,
                },
            },
        })
        console.log(name);
        if (error) return setError(error.message)
        router.push("/dashboard")
    }

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            },
        })
    }
    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Let&apos;s get started. Fill in the details below to create your account.
                </p>
                <small>{error}</small>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Name</Label>
                    <Input id="name" type="text" placeholder="Jhon Doe" onChange={(e) => setDisplayName(e.target.value)} required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required />
                    <p className="text-muted-foreground text-sm">
                        Minimum 8 characters.
                    </p>
                </div>
                <Button onClick={handleSignup} className="w-full">
                    Signup
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                        Or continue with
                    </span>
                </div>
                <Button variant="outline" onClick={handleGoogleLogin} className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                        />
                    </svg>
                    Signup with Google
                </Button>
            </div>
            <div className="text-center text-sm">
                have an account?{" "}
                <a onClick={() => router.push("/login")} className="underline underline-offset-4">
                    Login
                </a>
            </div>
        </div>
    )
}
