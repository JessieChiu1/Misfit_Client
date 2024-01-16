import { makeStyles, Button, Label, shorthands } from "@fluentui/react-components";
import FilterMenu from "./filterMenu";

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

    return (
        <nav className={styles.wrapper}>
           <FilterMenu style="Feminine"/>
           <FilterMenu style="Androgynous"/>
           <FilterMenu style="Masculine"/>
        </nav>
        
    )
}