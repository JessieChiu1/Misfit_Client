import { useState, useContext } from 'react'
import { Label, Input, Button, makeStyles, shorthands } from "@fluentui/react-components"
import { useRouter } from "next/router"
import { AuthContext } from "@/components/providers/AuthProvider"
import { login } from "../services/auth-service"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"


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
        alignItems: "center",
        minWidth: "300px",
        width: "30%",
        ...shorthands.border("solid"),
        ...shorthands.borderRadius("15px"),
        ...shorthands.padding("20px"),
        "> *": {
            ...shorthands.margin("15px"),
            width: "90%",
            fontSize: "1.5em",
        }
    },
    title: {
        display: "flex",
        justifyContent: "center",
        fontSize: "2.5em",
    },
    label : {
        display: "flex",
        justifyContent: "center",
        fontSize: "2em",
    },
    button: {
        ...shorthands.padding("15px"),
        verticalAlign: "center",
        width: "50%",
        "> *": {
            fontSize: "1em",
        }
    }
})

export default function Login() {
    const router = useRouter()
    const styles = useStyles()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { setToken } = useContext(AuthContext)

    const handleNavigation = (route) => {
        router.push(route)
    }

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (username && password) {
                const payload = {
                    username,
                    password,
                }

                const response = await login(payload)
                console.log(response.token)
                if (response.token) {
                    setToken(response.token)
                    handleNavigation("/")
                } else {
                    setErrorMessage(response.message)
                    console.log(errorMessage)
                    setUsername("")
                    setPassword("")
                }
            }
        } catch (error) {
            console.error("Error during login:", error)
        }
    }
    

    return (
        <>
        <Header/>
        <div className={styles.form_container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Label className={styles.title} weight='bold'>Login</Label>
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
                <Button className={styles.button} appearance="primary" type="submit">Login</Button>
            </form>
        </div>
        <Footer/>
        </>
    )
}