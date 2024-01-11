import PostCard from "@/components/postCard"
import { usePost } from "../hooks/usePost"
import Header from "@/components/header"
import { makeStyles, shorthands, Spinner } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    "> div": { ...shorthands.padding("20px") },
  },
});

export default function Feminine() {
	const styles = useStyles();
	const { allPost:allAndroPost } = usePost("Androgynous")

	return (
		<div>
			<Header/>

			{allAndroPost.length > 0 ? (
				allAndroPost.map(post => (
					<PostCard key={post._id} post={post}/>
				))
			): (
				<div className={styles.container}>
					<Spinner size="large"/>
				</div>
			)}

		</div>
	)
}
