import { makeStyles, Title1, shorthands } from "@fluentui/react-components"

const useStyles = makeStyles({
    container: {
        backgroundColor: "#FEEEF1",
        height: "500px",
        width: "100vw",
        ...shorthands.padding("20px"),
        width: "100%",
    },
    text: {
        color: "#CC526A"
    }
})

export default function ProblemBanner() {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            <Title1 className={styles.text}>problem</Title1>
        </div>
    )
}