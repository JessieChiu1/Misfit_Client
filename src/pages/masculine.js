import PostCard from "@/components/postCard"
import { usePost } from "../hooks/usePost"
import Header from "@/components/header"
import { makeStyles, shorthands, Spinner } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    "> div": { ...shorthands.padding("20px") },
  },
});

export default function Masculine() {
	const { allPost:allMascPost, setPost:setMascPost } = usePost("Masculine")

	return (
		<div>
			<Header/>

			{allMascPost.length > 0 ? (
				allMascPost.map(post => {
					<PostCard key={post._id} post={post}/>
				})
			): (
				<div>Loading....</div>
			)}
		</div>
	)
}
