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
        }
    }, [router]);

    return children;
};

export default GuestRoute;
