import { makeStyles, Display } from "@fluentui/react-components"

const useStyles = makeStyles({
    container: {
        backgroundColor: "#FEEEF1",
        height: "500px",
        width: "100vw"
    },
    text: {
        color: "#CC526A"
    }
})

export default function ProblemBanner() {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            <Display className={styles.text}>placeholder text</Display>
        </div>
    )
}