"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import conf from "./main";

const AuthRoute = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();

    useEffect(() => {
        const jwt = sessionStorage.getItem(conf.jwtSessionStorageKey);
        const role = sessionStorage.getItem(conf.roleSessionStorageKey);

        if (jwt && role !== conf.authorizedStorageKey) {
            router.replace("/dashboard"); 
        }  else if (jwt) {
            router.replace("/unauthorized");
        }
    }, [router]);

    return children;
};

export default AuthRoute;
