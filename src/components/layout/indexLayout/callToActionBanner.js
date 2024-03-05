import SignUpForm from "@/components/signUpForm"
import { makeStyles, Title1, shorthands, Button } from "@fluentui/react-components"
import { useRouter } from "next/router"

const useStyles = makeStyles({
    container: {
        backgroundColor: "#fffff9",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        ...shorthands.padding("20px"),
        width: "100%",
    },
    text: {
        color: "#B2B29B",
        textAlign: "center",
    },
    text_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        "> *": {
            ...shorthands.margin("20px")
        }
    },
})

export default function CallToActionBanner() {
    const styles = useStyles()
    const router = useRouter()

    const handleNavigation = (route) => {
        router.push(route)
    }

    return (
        <div className={styles.container}>
            <div className={styles.text_container}>
                <Title1 className={styles.text}>Sign up or start exploring to find your perfect fit today!</Title1>
                <Button 
                    size="large" 
                    appearance="primary"
                    onClick={() => handleNavigation("/home")}
                    >Explore Now!</Button>
            </div>
            <SignUpForm/>
        </div>
    )
}
