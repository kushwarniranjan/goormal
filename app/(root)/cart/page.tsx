import { getMyCart } from "@/lib/actions/card.actions";
import CardTable from "./card-table";
export const metadata = {
    title: 'Shopping Cart',
}

const CartPage = async () => {
    const cart = await getMyCart()
    return (<><CardTable cart={cart} /></>);
}

export default CartPage;