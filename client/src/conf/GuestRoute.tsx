"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import conf from "./main";

const GuestRoute = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();

    useEffect(() => {
        const role = sessionStorage.getItem(conf.roleSessionStorageKey);

        if (!role) {
            router.replace("/login"); 
        } else if (role === conf.authorizedStorageKey) {
            router.replace("/unauthorized");
        };
    }, [router]);

    return children;
};

export default GuestRoute;
