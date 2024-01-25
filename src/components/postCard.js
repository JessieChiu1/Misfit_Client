import { Card, CardFooter, CardHeader, CardPreview, makeStyles, Text, Body1, Image, Label, shorthands, Avatar} from "@fluentui/react-components"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "./providers/AuthProvider"
import { likePost, unlikePost } from "@/services/post-service"


const useStyles = makeStyles({
	card: {
		...shorthands.margin("20px"),
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
		"> *": {
			marginRight: "10px",
		},
	}
})

export default function PostCard({ post }) {
	const styles = useStyles()
	const { user, getToken } = useContext(AuthContext)
	const [like, setLike] = useState(false);

	useEffect(() => {
	  if (post && user) {
		setLike(post.like.includes(user.id));
	  }
	}, [post, user])

	//I manually do setLike for these 2 function because I don't want to trigger a page refresh on liking/unliking post
	const handleLike = async() => {
		const userId = user?.id
		const postId = post._id
		const token = getToken()

		const response = await likePost(postId, userId, token)
		
		if(response.message === "Post liked successfully") {
			setLike(true)
		}
	}

	const handleUnlike = async() => {
		const userId = user?.id
		const postId = post._id
		const token = getToken()
		console.log(`postId: ${postId}, userId: ${userId}, token: ${token}`)
		
		console.log("Trying to unlike post...");
	
		const response = await unlikePost(postId, userId, token)
	
		console.log(response.message)
		if(response.message === "Post unliked successfully"){
			setLike(false)
		}
	}
	
	
	return (
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
				/>
			</CardPreview>
			<CardFooter className={styles.content}>
				<div className={styles.row}>
					<Text size={500}>{post.style}</Text>
					<Text size={500}>{post.type}</Text>
					<Text size={500}>{`$${post.price}`}</Text>
				</div>
				<div className={styles.like_row}>
					{like === false ? (
							<Image 
								onClick={() => handleLike()}
								src="/orange_heart_high_contrast.svg"/>
						) : (
							<Image
								onClick={() => handleUnlike()}
								src="/orange_heart_flat.svg"/>
					)}
					<Text size={500}>{`${post.like.length} ${post.like.length === 1 ? "person" : "people"} like this post`}</Text>
				</div>
				<Text size={600} className="review_text">{post.review}</Text>
			</CardFooter>
	  	</Card>
	)
}
