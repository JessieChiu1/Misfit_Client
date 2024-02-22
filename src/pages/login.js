import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import LoginForm from "@/components/loginForm"
import { makeStyles } from "@fluentui/react-components"

const useStyles = makeStyles({
    container: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }
})

export default function Login() {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            <Header/>
            <LoginForm/>
            <Footer/>
        </div>
    )
}