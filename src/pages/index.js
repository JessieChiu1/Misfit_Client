import PostCard from "@/components/postCard"
import Header from "@/components/header"
import { usePost } from "@/hooks/usePost"
import { Spinner } from "@fluentui/react-components";

export default function Home() {
	const { allPost, setPost } = usePost("")

	return (
		<div>
			<Header/>
			<Spinner/>
			{/* {allPost.map(post => (
				<PostCard key={post._id} post={post}/>
			))} */}

		</div>
	)
}
