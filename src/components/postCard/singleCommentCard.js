import { Avatar, Card, CardFooter, CardHeader, Link, Text, Button, makeStyles, mergeClasses} from "@fluentui/react-components"
import { useRouter } from "next/router"
import { ThumbLike16Filled, ThumbDislike16Regular, ThumbDislike16Filled, ThumbLike16Regular} from "@fluentui/react-icons"
import { AuthContext } from "../providers/AuthProvider"
import { useContext  } from "react"
import { deleteComment, downvoteComment, upvoteComment } from "@/services/comment-service"

const useStyles = makeStyles({
	footer: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	vote: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		"> *": {
			marginLeft: "5px",
			marginRight: "5px"
		}
	},
	icon: {
		cursor: "pointer",
	},
	header: {
		display: "flex",
		alignItems: "center",
	}
})

const useHoverStyles = makeStyles({
    hoverTransition: {
      transitionProperty: 'transform',
      transitionDuration: "0.25s",
      transitionTimingFunction: "linear"
    },
    hoverEffect: {
      '&:hover': {
        transform: 'scale(1.3)',
      },
    },
	hoverEffectSmall: {
		'&:hover': {
			transform: 'scale(1.1)',
		},
	}
})

export default function SingleCommentCard({ comment, madeChangesComment}) {
	const styles = useStyles()
	const hoverStyles = useHoverStyles()
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
			const response = await upvoteComment(commentId, token)

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
			const response = await downvoteComment(commentId, token)
			if (response.message === "Comment downvoted successfully") {
				madeChangesComment()
			}
		}
	}

	const handleDeleteComment = async() => {
		const userId = user?.id
		const commentId = comment._id
		const token = getToken()

		if (comment.rightToDelete.includes(userId)) {
			const response = await deleteComment(commentId, token)
			console.log(response.message)
			if (response.message === "Comment deleted successfully") {
				madeChangesComment()
			}
			
		}
	}

	return (
		<Card>
			<CardHeader
				className={styles.header}
				image={<Avatar name={comment.user.username} />}
				header={
					<Link 
						onClick={() => handleNavigation(`/user/${comment.user._id}`)}
						className={mergeClasses(styles.icon, hoverStyles.hoverEffectSmall, hoverStyles.hoverTransition)}
						>{comment.user.username}</Link>
				}
			/>
			<Text size={400} className="review_text"><div dangerouslySetInnerHTML={{ __html: comment.body }} /></Text>
			<CardFooter className={styles.footer}>
				<div className={styles.vote}>
					<Text size={200} weight="bold">{() => totalVote(comment)}</Text>
					{comment.upvote.includes(user?.id) ? (
						<ThumbLike16Filled 
							onClick={handleUpvote}
							className={mergeClasses(styles.icon, hoverStyles.hoverEffect, hoverStyles.hoverTransition)}
							/>
					) : (
						<ThumbLike16Regular 
							onClick={handleUpvote}
							className={mergeClasses(styles.icon, hoverStyles.hoverEffect, hoverStyles.hoverTransition)}
							/>
					) }
					{comment.downvote.includes(user?.id) ? (
						<ThumbDislike16Filled 
							onClick={handleDownvote}
							className={mergeClasses(styles.icon, hoverStyles.hoverEffect, hoverStyles.hoverTransition)}
							/>
					) : (
						<ThumbDislike16Regular 
							onClick={handleDownvote}
							className={mergeClasses(styles.icon, hoverStyles.hoverEffect, hoverStyles.hoverTransition)}
							/>
					)}
				</div>
				{comment.rightToDelete.includes(user?.id) && (
					<Button appearance="transparent" onClick={handleDeleteComment} className={mergeClasses(styles.icon, hoverStyles.hoverEffectSmall, hoverStyles.hoverTransition)}>Delete Comment</Button>
				)}
			</CardFooter>
		</Card>
	)
}
