import UserHeader from "@/components/layout/userHeader"
import Filter from "@/components/layout/filter"
import { makeStyles, Image, shorthands, Button } from "@fluentui/react-components"
import ToggleMenu from "@/components/layout/toggleMenu"
import { useRouter } from "next/router"


const useStyles = makeStyles({
    top_banner: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...shorthands.padding("20px"),
    },
    logo: {
        width: "25%",
        height: "auto",
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
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
            <div className={styles.container}>
                <Image 
                    className={styles.logo}
                    src="/logo.png"
                    alt="logo"
                    onClick={handleNavigation}
                />
            </div>
            <div id="filter">
                <Filter/>
            </div>
        </nav>
    )
}