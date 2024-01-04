import { useState, useContext } from 'react'
import { signup } from "../services/auth-service"
import { AuthContext } from '../components/AuthProvider'
import { Label,Input } from "@fluentui/react-components";
import { useRouter } from "next/router"


export default function Signup() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")

    const { setToken } = useContext(AuthContext);

    const handleNavigation = (route) => {
        router.push(route)
    }

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangePassword1 = (e) => {
        setPassword1(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(password === password1 && username) {
            const payload = {
                username,
                password,
            }
            console.log(payload)
            const token = await signup(payload)
            setToken(token)
            handleNavigation("/")
        } else {
            alert("password does not match or missing username")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Label size='large' weight='bold'>Username</Label>
                <Input 
                    size="large"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleChangeUsername}
                />
                <Label size='large' weight='bold'>Password</Label>
                <Input 
                    size="large"
                    type="password" 
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChangePassword}
                />
                <Input 
                    size="large"
                    type="password" 
                    name="password1"
                    placeholder="Re-type Password"
                    value={password1}
                    onChange={handleChangePassword1}
                />
                <input 
                    type="submit"
                    value="Signup"
                />
            </form>
        </>
    )
}