'use client'

import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/order.actions";
import { Check, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";

const PlaceOrderForm = () => {
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const res = await createOrder()
        console.log(res)
        if (res.redirectTo) { // Check the redirect URL
            router.push(res.redirectTo);
        } else {
            // console.error("No redirectTo found in response");
        }
    }
    const PlaceOrderButton = () => {
        const { pending } = useFormStatus()
        return (
            <Button className="w-full" disabled={pending}>
                {pending ? (
                    <Loader className="w-4 h-4 animate-spin"></Loader>
                ) : (
                    <Check className="w-4 h-4"></Check>
                )
                }{' '}Place Order

            </Button>
        )

    }


    return (<form className="w-full" onSubmit={handleSubmit} >
        <PlaceOrderButton />
    </form>);
}

export default PlaceOrderForm;