import { useState, useContext } from 'react'
import { Label,Input } from "@fluentui/react-components";
import { useRouter } from "next/router"
import { AuthContext } from '../components/AuthProvider'
import { login } from "../services/auth-service"

export default function Login() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(username && password) {
            const payload = {
                username,
                password,
            }
            console.log(payload)
            const token = await login(payload)
            setToken(token)
            handleNavigation("/")
        } else {
            alert("password does not match or missing username")
        }
    }

    return (
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
            <input 
                type="submit"
                value="Signup"
            />
        </form>
    )
}