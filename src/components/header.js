import UserHeader from "@/components/userHeader"
import Filter from "@/components/filter"
import { makeStyles, Image, shorthands } from "@fluentui/react-components";
import ToggleMenu from "@/components/toggleMenu"


const useStyles = makeStyles({
    top_banner: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        ...shorthands.padding("20px"),
    },
    logo_container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: "25%",
        height: "auto",
    },
})

export default function Header() {
    const styles = useStyles()

    return (
        <nav>
            <div  id="top_banner" className={styles.top_banner}>
                <ToggleMenu/>
                <UserHeader/>
            </div>
            <div className={styles.logo_container}>
                <Image className={styles.logo}
                    src="https://misfit-photo.s3.us-east-2.amazonaws.com/logo.png"
                />
            </div>
            <div id="filter">
                <Filter/>
            </div>
        </nav>
    )
}