import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.action";
import { Metadata } from "next";
import PaymentMethodForm from "./payment-method-form";
import CheckoutSteps from "@/components/shared/checkout-steps";


export const metadata: Metadata = {
    title: 'Payment Method'
}

const PaymentMethodPage = async () => {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) throw new Error('User not found')
    const user = getUserById(userId)

    return (<>
        <CheckoutSteps current={2} />
        <PaymentMethodForm preferredPaymentMethod={(await user).paymentMethod} />
    </>);
}

export default PaymentMethodPage;