import { Card, CardFooter, CardHeader, CardPreview, makeStyles, Text, Body1, Image, Avatar, shorthands} from "@fluentui/react-components"
import { useContext, useState } from "react"
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

export default function PostCard({ post, madeChanges }) {
	const styles = useStyles()
	const { user, getToken } = useContext(AuthContext)
	const [commentOpen, setCommentOpen] = useState(false)

	const handleLike = async() => {
		const postId = post._id
		const token = getToken()

		const response = await likePost(postId, token)
		
		if(response.message === "Post liked successfully") {
			madeChanges()
		}
	}

	const handleUnlike = async() => {
		const postId = post._id
		const token = getToken()
	
		const response = await unlikePost(postId, token)
	
		if(response.message === "Post unliked successfully"){
			madeChanges()
		}
	}
	
	function getLikeText(post) {
		if (post.like.length === 0){
			return "0 like"
		}
		if (post.like.includes(user.id)) {
			return post.like.length === 1 ? "You like this post" : `You and ${post.like.length - 1} ${post.like.length - 1 === 1 ? "person" : "people"} like this post`
		} else {
			return post.like.length === 1 ? "1 person likes this post" : `${post.like.length} people like this post`;
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
							{post.like.includes(user.id) === false ? (
								<Heart28Regular onClick={handleLike} />
							) : (
								<Heart28Filled onClick={handleUnlike} className={styles.heartIcon}/>
							)}
							<Text size={500}>{getLikeText(post)}</Text>
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
