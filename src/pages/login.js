import { useState } from 'react'

// sign up -static component
export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    //before this have setToken from AuthContext

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(password && username) {
            const payload = {
                username,
                password
            }
            console.log(payload)
            //before this have token
        }else {
            alert("password does not match or missing username")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleChangeUsername}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChangePassword}
            />
            <input
                type="submit"
                value="Login"
            />
        </form>
    )
}