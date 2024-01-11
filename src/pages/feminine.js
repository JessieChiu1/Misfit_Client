import PostCard from "@/components/postCard"
import Header from "@/components/header"
import { usePost } from "@/hooks/usePost"
import { makeStyles, shorthands, Spinner } from "@fluentui/react-components";

const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "100vh",
		...shorthands.padding("20px"),
		"background-color": "#FFD2E2",
	},
})
  

export default function Feminine() {
	const styles = useStyles();
	const { allPost:allFemPost } = usePost("")

	return (
		<div>
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

		</div>
	)
}
