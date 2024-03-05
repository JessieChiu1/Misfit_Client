import { makeStyles, Title1, shorthands } from "@fluentui/react-components"

const useStyles = makeStyles({
    container: {
        backgroundColor: "#BAEBFD",
        height: "500px",
        width: "100vw",
        ...shorthands.padding("20px"),
        width: "100%",
    },
    text: {
        color: "#0AACEA"
    }
})

export default function AboutMisfitBanner() {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            <Title1 className={styles.text}>about</Title1>
        </div>
    )
}