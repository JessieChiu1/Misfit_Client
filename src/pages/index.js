import PostCard from "@/components/postCard"
import Header from "@/components/header"
import { usePost } from "@/hooks/usePost"
import { makeStyles, shorthands, Spinner } from "@fluentui/react-components";

const useStyles = makeStyles({
	container: {
	  "> div": { ...shorthands.padding("20px") },
	},
  });

export default function Home() {
	const styles = useStyles();
	const { allPost } = usePost("")

	return (
		<div>
			<Header/>
			{allPost.length > 0 ? (
				allPost.map(post => (
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
