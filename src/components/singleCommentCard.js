import { Avatar, Card, CardFooter, CardHeader, Link, Text} from "@fluentui/react-components"
import { useRouter } from "next/router"
import { ThumbLike16Filled, ThumbDislike16Regular, ThumbDislike16Filled, ThumbLike16Regular} from "@fluentui/react-icons"

export default function SingleCommentCard({ comment }) {
	const router = useRouter()
	const handleNavigation = (route) => {
		router.push(route)
	}

	return (
		<Card>
			<CardHeader
				image={<Avatar name={comment.user.username} />}
				header={
				<Link onClick={() => handleNavigation(`/user/${comment.user._id}`)}>{comment.user.username}</Link>
				}
			/>
			<Text size={400} className="review_text"><div dangerouslySetInnerHTML={{ __html: comment.body }} /></Text>
			<CardFooter>
				<Text size={200}>{comment.upvote}</Text>
				<ThumbLike16Regular/>
				<ThumbDislike16Regular/>
			</CardFooter>
		</Card>
	)
}
