import { useState, useContext } from 'react'
import { Text, Input, Button, makeStyles, shorthands, mergeClasses } from "@fluentui/react-components"
import { useRouter } from "next/router"
import { AuthContext } from "@/components/providers/AuthProvider"
import { login } from "../services/auth-service"

const useStyles = makeStyles({
    form_container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        ...shorthands.border("solid"),
        ...shorthands.borderRadius("15px"),
        ...shorthands.padding("20px"),
        "> *": {
            marginBottom: "15px"
        }
    },
    centerElement: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

const useHoverStyles = makeStyles({
    hoverTransition: {
      transitionProperty: 'transform',
      transitionDuration: "0.25s",
      transitionTimingFunction: "linear"
    },
    hoverEffectSmall: {
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
})


export default function LoginForm() {
    const router = useRouter()
    const styles = useStyles()
    const hoverStyles = useHoverStyles()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { setToken } = useContext(AuthContext)

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
                    router.push("/home")
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
        <div className={styles.form_container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.centerElement}>
                    <Text size={500} weight='semibold'>Login</Text>
                </div>
                <Text size={400}  weight='semibold'>Username</Text>
                <Input 
                    size="large"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleChangeUsername}
                />
                <Text size={400}  weight='semibold'>Password</Text>
                <Input 
                    size="large"
                    type="password" 
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChangePassword}
                />
                <div className={styles.centerElement}>
                    <Button 
                        appearance="primary" 
                        type="submit"
                        className={mergeClasses(hoverStyles.hoverEffectSmall, hoverStyles.hoverTransition)}
                        >Login</Button>
                </div>
            </form>
        </div>
        </>
    )
}