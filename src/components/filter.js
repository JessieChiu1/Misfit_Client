import { makeStyles, Button, Label, shorthands } from "@fluentui/react-components";
import { useRouter } from 'next/router';

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        ...shorthands.margin("10px")
    },
    button: {
        ...shorthands.padding("10px"),
        width: "fit-content",
    },
    label: {
        fontSize: "1.5em",
    }
});

export default function Filter() {
    const styles = useStyles()
    const router = useRouter()

    const handleNavigation = (route) => {
        router.push(route)
    }

    return (
        <nav className={styles.wrapper}>
            <Button appearance="transparent" className={styles.button} onClick={() => handleNavigation("/feminine")}>
                <Label className={styles.label} weight="bold">Feminine</Label>
            </Button>
            <Button appearance="transparent" className={styles.button} onClick={() => handleNavigation("/androgynous")}>
                <Label className={styles.label} weight="bold">Androgynous</Label>
            </Button>
            <Button appearance="transparent" className={styles.button} onClick={() => handleNavigation("/masculine")}>
                <Label className={styles.label} weight="bold">Masculine</Label>
            </Button>
        </nav>
    )
}