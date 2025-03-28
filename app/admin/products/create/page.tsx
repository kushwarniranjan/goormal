import { Suspense } from 'react';
import ProductForm from "@/components/admin/product-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create Product'
}

const CreateProductPage = () => {
    return (
        <div>
            <h2 className="h2-bold">Create Product</h2>
            <div className="my-8">
                <Suspense fallback={<div>Loading Product Form...</div>}>
                    <ProductForm type="Create" />
                </Suspense>
            </div>
        </div>
    );
}

export default CreateProductPage;
