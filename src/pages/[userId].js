import { useRouter } from "next/router"
import { usePostByUserId } from "@/hooks/usePost"
import PostCard from "@/components/postCard"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { makeStyles, shorthands, Spinner, Label } from "@fluentui/react-components";

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

export default function UserProfile() {
    const router = useRouter()
    const styles = useStyles()
    const { userId } = router.query
    console.log(userId)
    const { allPost, isLoading } = usePostByUserId(userId)

	return (
		<>
			<Header/>
			<section className={styles.container}>
                {isLoading ? (
                    <Spinner size="large" />
                ) : allPost.length === 0 ? (
                    <Label>You have no post!</Label>
                ) : (
                    allPost.map((post) => (
                        <PostCard size="large" key={post._id} post={post} />
                    ))
                )}
			</section>
            <Footer/>    
		</>
	)
}