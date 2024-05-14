import { Link, useNavigate } from "react-router-dom"
import { Signin } from "../pages/Signin"
import { ChangeEvent, useState } from "react"
import { SignupInput } from "@akhileshm1/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data.jwt
            localStorage.setItem("token", jwt)
            navigate("/blogs")
        }
        catch(e) {
            alert("Error while signing up")
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-bold">
                            Create an account
                        </div>
                        <div className="text-slate-500 flex justify-center">
                            {type === "signin" ? "Don't have an account" : "Already have an account?"}
                            <Link className="pl-1 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        {type === "signup" ? <LabelledInput label="Name" placeholder="John Doe" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                name: e.target.value
                            }))
                        }} /> : null}
                        <LabelledInput label="Email" placeholder="johndoe@example.com" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                email: e.target.value
                            }))
                        }} />
                        <LabelledInput label="Password" type={"password"} placeholder="johndoe@123" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                password: e.target.value
                            }))
                        }} />
                        <div className="pt-8 flex justify-center">
                            <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInput {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

function LabelledInput({ label, type, placeholder, onChange }: LabelledInput) {
    return (
        <div>
            <label className="block mt-2 mb-2 text-sm font-semibold text-gray-900 text-black pt-4">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-blue-500 hover:border-blue-500 focus:outline-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}