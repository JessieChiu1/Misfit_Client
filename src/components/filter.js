import { makeStyles, ToggleButton, Label, shorthands } from "@fluentui/react-components";
import { useRouter } from 'next/router';

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        ...shorthands.padding("20px"),
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
            <ToggleButton size="large" onClick={() => handleNavigation("/feminine")}>
                <Label size="large" weight="bold">Feminine</Label>
            </ToggleButton>
            <ToggleButton size="large" onClick={() => handleNavigation("/androgynous")}>
                <Label size="large" weight="bold">Androgynous</Label>
            </ToggleButton>
            <ToggleButton size="large" onClick={() => handleNavigation("/masculine")}>
                <Label size="large" weight="bold">Masculine</Label>
            </ToggleButton>
        </nav>
    )
}