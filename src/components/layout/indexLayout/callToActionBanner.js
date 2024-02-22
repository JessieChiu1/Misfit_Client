import SignUpForm from "@/components/signUpForm"
import { makeStyles, LargeTitle, shorthands } from "@fluentui/react-components"

const useStyles = makeStyles({
    container: {
        backgroundColor: "#fffff9",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItem: "center",
        ...shorthands.padding("20px"),
        "> *": {
            width: "50%",
        }
    },
    text: {
        color: "#B2B29B"
    }
})

export default function CallToActionBanner() {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            <div>
                <LargeTitle className={styles.text}>Sign up to find your perfect fit today!</LargeTitle>
            </div>
            <SignUpForm/>
        </div>
    )
}