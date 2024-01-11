import { makeStyles, ToggleButton } from "@fluentui/react-components";
import { useRouter } from 'next/router';

const useStyles = makeStyles({
    wrapper: {
      display: "flex",
      justifyContent: "space-evenly",
    },
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
                Feminine
            </ToggleButton>
            <ToggleButton size="large" onClick={() => handleNavigation("/androgynous")}>
                Androgynous
            </ToggleButton>
            <ToggleButton size="large" onClick={() => handleNavigation("/masculine")}>
                Masculine
            </ToggleButton>
        </nav>
    )
}