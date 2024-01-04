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
	const { allPost:allFemPost, setPost:setFemPost } = usePost("Feminine")

	return (
		<div>
			<Header/>

			{allFemPost.length > 0 ? (
				allFemPost.map(post => {
					<PostCard key={post._id} post={post}/>
				})
			): (
				<div>Loading...</div>
			)}

		</div>
	)
}
