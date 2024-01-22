import { useRouter } from "next/router"
import { usePostByUserId } from "@/hooks/usePost"
import PostCard from "@/components/postCard"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { makeStyles, shorthands, Spinner, Label, Button } from "@fluentui/react-components"
import { AuthContext } from "@/components/providers/AuthProvider"
import { useContext } from "react"
import { deletePost } from "@/services/post-service"



const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "100vh",
		...shorthands.padding("20px"),
	},
	button_container: {
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
	}
})

export default function UserProfile() {
    const router = useRouter()
    const styles = useStyles()
    const { userId } = router.query
	const { user, getToken } = useContext(AuthContext)

    const { allPost, isLoading } = usePostByUserId(userId)

	const handleDeletePost = async(postId) => {
		try {
			const token = getToken()
			const response = await deletePost(postId, token)
			if(response.message === "Deleted Post"){
				router.reload()
			}

		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div>
			<Header/>
			<section className={styles.container}>
                {isLoading ? (
                    <Spinner size="large" />
                ) : allPost.length === 0 ? (
                    <Label>You have no post!</Label>
                ) : (
                    allPost.map((post) => (
						<div key={post._id}>
							<PostCard size="large" post={post} />
							{user && user.id === post.user ? (
							<div className={styles.button_container}>
							<Button appearance="primary">Edit Post</Button>
							<Button appearance="primary" onClick={() => handleDeletePost(post._id)}>Delete Post</Button>
							</div>
						) : null}
						</div>
                    ))
                )}

			</section>
			<Footer/>   
		</div>
	)
}