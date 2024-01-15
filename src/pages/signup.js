import { useState, useContext } from 'react'
import { signup } from "../services/auth-service"
import { AuthContext } from '../components/AuthProvider'
import { Label, Input, Button, makeStyles, shorthands } from "@fluentui/react-components";
import { useRouter } from "next/router"
import Header from "@/components/header"
import Footer from '@/components/footer';

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


export default function Signup() {
    const router = useRouter()
    const styles = useStyles()

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
        <Header/>
        <div className={styles.form_container}>
            <form onSubmit={handleSubmit} className={styles.form}>
            <Label className={styles.label} weight='bold'>Sign up</Label>
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
                <div className={styles.buttonContainer}>
                    <Button className={styles.button}type="submit"><Label>Sign up</Label></Button>
                </div>
            </form>
        </div>
        <Footer/>
        </>
    )
}