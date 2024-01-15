import { useState, useContext } from 'react'
import { Label, Input, Button, makeStyles, shorthands } from "@fluentui/react-components";
import { useRouter } from "next/router"
import { AuthContext } from '../components/AuthProvider'
import { login } from "../services/auth-service"
import Header from "@/components/header"
import Footer from "@/components/footer"

const useStyles = makeStyles({
    form_container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        minWidth: "50%",
        "> *": {
            ...shorthands.margin("10px"),
            width: "100%",
        }
    },
    label : {
        "font-size": "1.5em",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
    },
    button: {
        ...shorthands.padding("10px"),
        width: "fit-content",
    },
})

export default function Login() {
    const router = useRouter()
    const styles = useStyles()

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
        <>
        <Header/>
        <div className={styles.form_container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Label className={styles.label} weight='bold'>Login</Label>
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
                <div className={styles.buttonContainer}>
                    <Button className={styles.button}type="submit"><Label>Login</Label></Button>
                </div>
            </form>
        </div>
        <Footer/>
        </>
    )
}