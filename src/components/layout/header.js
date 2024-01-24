import UserHeader from "@/components/layout/userHeader"
import Filter from "@/components/layout/filter"
import { makeStyles, Image, shorthands, Button } from "@fluentui/react-components"
import ToggleMenu from "@/components/layout/toggleMenu"
import { useRouter } from "next/router"


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
        width: "100%",
        height: "auto"
    },
    logo: {
        width: "25%",
        height: "auto",
    },
})

export default function Header() {
    const styles = useStyles()
    const router = useRouter()

    const handleNavigation = () => {
        router.push("/")
    }

    return (
        <nav>
            <div  id="top_banner" className={styles.top_banner}>
                <ToggleMenu/>
                <UserHeader/>
            </div>
            <Button appearance="transparent" className={styles.logo_container}>
                <Image 
                    className={styles.logo}
                    src="/logo.png"
                    alt="logo"
                    onClick={handleNavigation}
                />
            </Button>
            <div id="filter">
                <Filter/>
            </div>
        </nav>
    )
}