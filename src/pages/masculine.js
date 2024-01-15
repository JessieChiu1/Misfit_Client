import PostCard from "@/components/postCard"
import Header from "@/components/header"
import { usePostByStyle } from "@/hooks/usePost"
import { makeStyles, shorthands, Spinner } from "@fluentui/react-components";
import Footer from "@/components/footer";

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
  

export default function Masculine() {
	const styles = useStyles();
	const { allPost:allMascPost } = usePostByStyle("Masculine")

	return (
		<>
			<Header/>
			<section className={styles.container}>
				{allMascPost.length > 0 ? (
					allMascPost.map((post) => (
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
