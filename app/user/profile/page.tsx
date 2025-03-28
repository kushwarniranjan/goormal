import { auth } from "@/auth";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import ProfileForm from "./profile-form";

export const metadata: Metadata = {
    title: 'Customer Profile'
}

const Profile = async () => {

    const session = await auth()
    return (<SessionProvider session={session}>
        <div className="max-w-md mx-auto space-y-">
            <div className="h2-bold">Profile</div>
            <ProfileForm />
        </div>
    </SessionProvider>);
}

export default Profile;