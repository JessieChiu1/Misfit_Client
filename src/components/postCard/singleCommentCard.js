import { Avatar, Card, CardFooter, CardHeader, Link, Text} from "@fluentui/react-components"
import { useRouter } from "next/router"
import { ThumbLike16Filled, ThumbDislike16Regular, ThumbDislike16Filled, ThumbLike16Regular} from "@fluentui/react-icons"
import { AuthContext } from "../providers/AuthProvider"
import { useContext  } from "react"
import { downvoteComment, upvoteComment } from "@/services/comment-service"

export default function SingleCommentCard({ comment, madeChangesComment }) {
	const router = useRouter()
	const { user, getToken } = useContext(AuthContext)

	const handleNavigation = (route) => {
		router.push(route)
	}

	const totalVote = (comment) => {
		const total = comment.upvote.length - comment.downvote.length
		return total
	}

	const handleUpvote = async() => {
		const userId = user?.id
		const commentId = comment._id
		const token = getToken()

		if(comment.upvote.includes(userId)){
			console.log("already upvoted")
			return
		}else {
			const response = await upvoteComment(commentId, userId, token)

			if (response.message === "Comment upvoted successfully") {
				madeChangesComment()
			}
		}

	}

	const handleDownvote = async() => {
		const userId = user?.id
		const commentId = comment._id
		const token = getToken()

		if(comment.downvote.includes(userId)){
			console.log("already downvoted")
			return
		} else {
			const response = await downvoteComment(commentId, userId, token)
			if (response.message === "Comment downvoted successfully") {
				madeChangesComment()
			}
		}

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
				<Text size={200} weight="bold">{() => totalVote(comment)}</Text>
				{comment.upvote.includes(user.id) ? (
					<ThumbLike16Filled onClick={handleUpvote}/>
				) : (
					<ThumbLike16Regular onClick={handleUpvote}/>
				) }
				{comment.downvote.includes(user.id) ? (
					<ThumbDislike16Filled onClick={handleDownvote}/>
				) : (
					<ThumbDislike16Regular onClick={handleDownvote}/>
				)}
			</CardFooter>
		</Card>
	)
}
