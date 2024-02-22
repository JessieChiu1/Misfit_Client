import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import SignUpForm from "@/components/signUpForm"
import { makeStyles } from "@fluentui/react-components"

const useStyles = makeStyles({
    container: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }
})

export default function SignUp() {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            <Header/>
            <SignUpForm/>
            <Footer/>
        </div>
    )
}