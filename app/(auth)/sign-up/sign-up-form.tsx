'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUser } from "@/lib/actions/user.action";
import { signUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";


const SignUpForm = () => {

    const [mounted, setMouted] = useState(false)

    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: ''
    })

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'


    useEffect(() => {
        setMouted(true)
    }, [])

    if (!mounted) {
        return null;
    }

    const SignUpButton = () => {
        const { pending } = useFormStatus()
        return (
            <Button className="w-full" disabled={pending} variant="default">
                {pending ? 'Submitting...' : 'Sign Up'}
            </Button>
        )
    }


    return <form action={action} >
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-6">
            <div>
                <Label htmlFor="email">Name</Label>
                <Input id="name" type="text" name="name" autoComplete="name"
                    defaultValue={signUpDefaultValues.email}></Input>
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="text" name="email" autoComplete="email"
                    defaultValue={signUpDefaultValues.email}></Input>
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" required autoComplete="password"
                    defaultValue={signUpDefaultValues.password}></Input>
            </div>
            <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" name="confirmPassword" required autoComplete="confirmPassword"
                    defaultValue={signUpDefaultValues.confirmPassword}></Input>
            </div>
            <div>
                {/* <Button className="w-full" variant="default">Sign In</Button> */}
                <SignUpButton />
                {data && !data.success && (
                    <div className="text-center text-destructive">{data.message}</div>
                )}
                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link className="link" href="/sign-in" target="_self">  Sign In</Link>

                </div>
            </div>
        </div>
    </form >;
}

export default SignUpForm;