import { Card, CardFooter, CardHeader, CardPreview, makeStyles, Text, Body1, Image, Avatar, shorthands} from "@fluentui/react-components"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { likePost, unlikePost } from "@/services/post-service"
import { Comment24Regular, CommentOff24Regular, Heart28Regular, Heart28Filled } from "@fluentui/react-icons"
import Comment from "./comment"


const useStyles = makeStyles({
	card: {
	  	width: "500px",
	  	maxWidth: "100%",
	},
	review_text: {
		whiteSpace: "pre-line",
	},
	content: {
		display: "flex",
		flexDirection: "column",
	},
	row: {
		display: "flex",
		justifyContent: "space-between",
		alignContent: "center",
		"> *": {
			marginRight: "10px",
		},
	},
	like_row: {
		display: "flex",
		alignContent: "center",
		justifyContent: "space-between",
	},
	like: {
		display: "flex",
		alignContent: "center",
		justifyContent: "flex-start",
		"> *": {
			marginRight: "10px",
		}
	},
	comment: {
		display: "flex",
		alignContent: "center",
		justifyContent: "center",
	},
	container: {
		display: "flex",
		flexWrap: "wrap",
		...shorthands.margin("20px")
	},
	heartIcon: {
        color: "red",
    },
})

export default function PostCard({ post }) {
	const styles = useStyles()
	const { user, getToken } = useContext(AuthContext)
	const [like, setLike] = useState(false)
	const [totalLike, setTotalLike] = useState(post.like.length)
	const [commentOpen, setCommentOpen] = useState(false)

	useEffect(() => {
	  if (post && user) {
		setLike(post.like.includes(user.id))
	  }
	}, [post, user])

	const handleLike = async() => {
		const userId = user?.id
		const postId = post._id
		const token = getToken()

		const response = await likePost(postId, userId, token)
		
		if(response.message === "Post liked successfully") {
			setLike(true)
			const newTotal = totalLike + 1
			setTotalLike(newTotal)
		}
	}

	const handleUnlike = async() => {
		const userId = user?.id
		const postId = post._id
		const token = getToken()
	
		const response = await unlikePost(postId, userId, token)
	
		if(response.message === "Post unliked successfully"){
			setLike(false)
			const newTotal = totalLike - 1
			setTotalLike(newTotal)
		}
	}
	
	function getLikeText(totalLike, like) {
		if (totalLike === 0){
			return "0 like"
		}
		if (like) {
			return totalLike === 1 ? "You like this post" : `You and ${totalLike - 1} ${totalLike - 1 === 1 ? "person" : "people"} like this post`
		} else {
			return totalLike === 1 ? "1 person likes this post" : `${totalLike} people like this post`;
		}
	}

	const handleComment = async() => {
		setCommentOpen(!commentOpen)
	}
	
	return (
		<div className={styles.container}>
			<Card className={styles.card} size="large">
				<CardHeader
					image={<Avatar name={post.user.username} />}
					header={
						<Body1>
							<Text size={700}>{post.title}</Text>
						</Body1>
					}
				/>
				<CardPreview>
					<Image
						src={post.photo[0].mainUrl}
						alt="Example"
						loading="lazy"
					/>
				</CardPreview>
				<CardFooter className={styles.content}>
					<div className={styles.row}>
						<Text size={500}>{post.style}</Text>
						<Text size={500}>{post.type}</Text>
						<Text size={500}>{`$${post.price}`}</Text>
					</div>
					<div className={styles.like_row}>
						<div className={styles.like}>
							{like === false ? (
								<Heart28Regular onClick={handleLike} />
							) : (
								<Heart28Filled onClick={handleUnlike} className={styles.heartIcon}/>
							)}
							<Text size={500}>{getLikeText(totalLike, like)}</Text>
						</div>
						{commentOpen ? (
							<CommentOff24Regular className={styles.comment} onClick={handleComment}/>
						) : (
							<Comment24Regular className={styles.comment} onClick={handleComment}/>
						)}
					</div>
					<Text size={600} className="review_text"><div dangerouslySetInnerHTML={{ __html: post.review }} /></Text>
				</CardFooter>
			</Card>
			{commentOpen && <Comment postId={post._id} OP={post.user._id}/>}
		</div>
	)
}
