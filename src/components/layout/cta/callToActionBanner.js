import { makeStyles, Display } from "@fluentui/react-components"

const useStyles = makeStyles({
    container: {
        backgroundColor: "#fffff9",
        height: "500px",
        width: "100vw"
    },
    text: {
        color: "#B2B29B"
    }
})

export default function CallToActionBanner() {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            <Display className={styles.text}>placeholder text</Display>
        </div>
    )
}