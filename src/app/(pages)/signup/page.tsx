"use client "
import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation"
import React from "react"
import Signup from "@/components/signup"

const SignupPage = ()=>{
    const router = useRouter()
    const {authStatus}=useAuth()

    if (authStatus){
        router.replace("/profile")
        return <></> // returning this empty fragment is because of layout
    }

    return (
        <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <Signup/>
        </section>
    )
}


export default SignupPage