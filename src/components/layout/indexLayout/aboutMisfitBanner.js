import { makeStyles, LargeTitle } from "@fluentui/react-components"

const useStyles = makeStyles({
    container: {
        backgroundColor: "#BAEBFD",
        height: "500px",
        width: "100vw"
    },
    text: {
        color: "#0AACEA"
    }
})

export default function AboutMisfitBanner() {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            <LargeTitle className={styles.text}>placeholder text</LargeTitle>
        </div>
    )
}