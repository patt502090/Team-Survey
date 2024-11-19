"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import conf from "./main";

const AuthRoute = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();

    useEffect(() => {
        const jwt = sessionStorage.getItem(conf.jwtSessionStorageKey);

        if (jwt) {
            router.replace("/dashboard"); 
        }
    }, [router]);

    return children;
};

export default AuthRoute;
