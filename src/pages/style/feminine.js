import PostCard from "@/components/postCard"
import Header from "@/components/header"
import { usePostByStyle } from "@/hooks/usePost"
import { makeStyles, shorthands, Spinner } from "@fluentui/react-components";

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
  

export default function Feminine() {
	const styles = useStyles();
	const { allPost:allFemPost } = usePostByStyle("Feminine")

	return (
		<>
			<Header/>
			<section className={styles.container}>
				{allFemPost.length > 0 ? (
					allFemPost.map((post) => (
						<PostCard size="large" key={post._id} post={post}/>
					))
				) : (
					<Spinner size="large" />
				)}
			</section>
			<Footer/>
		</>
	)
}
