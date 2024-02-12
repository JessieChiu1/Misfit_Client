import Header from "@/components/layout/header"
import NewPostForm from "@/components/newPostForm"
import Footer from "@/components/layout/footer"
import { makeStyles, shorthands} from "@fluentui/react-components"

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        ...shorthands.padding("20px"),
    },
 })

export default function CreateNewPost() {
    const styles = useStyles()
    return (
        <>
            <Header/>
            {/* add this div so that the NewPostForm is not taking up 100% of the width */}
            <div className={styles.container}>
                <NewPostForm/>
            </div>
            <Footer/>
        </>
    )
}
