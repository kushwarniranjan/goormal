import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Unauthorized'
}

const Unauthorized = () => {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center space-y-4 h-[calc(100vh-200px)">
            <h1 className="h1-bold text-4xl">Unauthorized Access</h1>
            <p className="text-muted-foreground">You are not authorized to access this page</p>
            <Button asChild>
                <Link href="/">Go Home</Link>
            </Button>
        </div>
    );
}

export default Unauthorized;
