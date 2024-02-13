import { Card, CardFooter, CardHeader, CardPreview, makeStyles, Text, Body1, Image, Avatar, shorthands } from "@fluentui/react-components"
import { useContext, useState, useRef, useEffect } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { likePost, unlikePost } from "@/services/post-service"
import { Comment24Regular, CommentOff24Regular, Heart24Regular, Heart24Filled } from "@fluentui/react-icons"
import Comment from "./comment"

const useStyles = makeStyles({
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
        justifyContent: "flex-start",
    },
    commentContainer: {
        overflowY: "auto",
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px",
        ...shorthands.margin("15px"),
    },
    heartIcon: {
        color: "red",
    },
    image: {
        maxHeight: "60vh",
    }
})

export default function PostCard({ post, madeChanges }) {
    const styles = useStyles()
    const { user, getToken } = useContext(AuthContext)
    const [commentOpen, setCommentOpen] = useState(false)
    const cardRef = useRef(null)
    const imageRef = useRef(null)
    const commentContainerRef = useRef(null)
    const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 })
    
    // issue with scrollIntoView on chrome browser:
    // https://github.com/facebook/react/issues/23396
    useEffect(() => {
        const timer = setTimeout(() => {
            if (commentOpen && commentContainerRef.current && cardRef.current) {
                const commentRect = commentContainerRef.current.getBoundingClientRect()
                const cardRect = cardRef.current.getBoundingClientRect()
                
                //either center the commentContainer or scroll to the top depending on if the components are side by side or stack on top of one another
                if (commentRect.bottom > cardRect.bottom) {
                    commentContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                } else {
                    commentContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
            }
        }, 0)
    
        return () => clearTimeout(timer)
    }, [commentOpen])
    

    const handleImageLoad = () => {
        if (imageRef.current) {
            setCardDimensions({
                width: cardRef.current.offsetWidth,
                height: cardRef.current.offsetHeight
            })
        }
    }

    const handleLike = async () => {
        const postId = post._id
        const token = getToken()

        const response = await likePost(postId, token)

        if (response.message === "Post liked successfully") {
            madeChanges()
        }
    }

    const handleUnlike = async () => {
        const postId = post._id
        const token = getToken()

        const response = await unlikePost(postId, token)

        if (response.message === "Post unliked successfully") {
            madeChanges()
        }
    }

    function getLikeText(post) {
        if (post.like.length === 0) {
            return "0 like"
        }
        if (post.like.includes(user?.id)) {
            return post.like.length === 1 ? "You like this post" : `You and ${post.like.length - 1} ${post.like.length - 1 === 1 ? "person" : "people"} like this post`
        } else {
            return post.like.length === 1 ? "1 person likes this post" : `${post.like.length} people like this post`
        }
    }

    const handleComment = async () => {
        setCommentOpen(!commentOpen)
    }

    return (
        <div className={styles.container}>
            <Card size="small" ref={cardRef}>
                <CardHeader
                    image={<Avatar name={post.user.username} />}
                    header={
                        <Body1>
                            <Text size={500}>{post.title}</Text>
                        </Body1>
                    }
                />
                <CardPreview>
                    <Image
                        src={post.photo[0].mainUrl}
                        alt="Example"
                        loading="lazy"
                        className={styles.image}
                        onLoad={handleImageLoad}
                        ref={imageRef}
                    />
                </CardPreview>
                <CardFooter className={styles.content}>
                    <div className={styles.row}>
                        <Text size={300}>{post.style}</Text>
                        <Text size={300}>{post.type}</Text>
                        <Text size={300}>{`$${post.price}`}</Text>
                    </div>
                    <div className={styles.like_row}>
                        <div className={styles.like}>
                            {post.like.includes(user?.id) === false ? (
                                <Heart24Regular 
                                    onClick={handleLike}
                                    style={{ cursor: "pointer" }}
                                    />
                            ) : (
                                <Heart24Filled 
                                    onClick={handleUnlike} 
                                    className={styles.heartIcon}
                                    style={{ cursor: "pointer" }}
                                    />
                            )}
                            <Text size={430000}>{getLikeText(post)}</Text>
                        </div>
                        {commentOpen ? (
                            <CommentOff24Regular 
                                className={styles.comment} 
                                onClick={handleComment} 
                                style={{ cursor: "pointer" }}
                                />
                        ) : (
                            <Comment24Regular 
                                className={styles.comment} 
                                onClick={handleComment} 
                                style={{ cursor: "pointer" }}
                                />
                        )}
                    </div>
                    <Text size={300} className={styles.review_text}><div dangerouslySetInnerHTML={{ __html: post.review }} /></Text>
                </CardFooter>
            </Card>
            {commentOpen && (
                <div 
                    ref={commentContainerRef} 
                    className={styles.commentContainer} 
                    style={{ height: `${cardDimensions.height}px`, width: `${cardDimensions.width}px`}}>
                    <Comment 
                        postId={post._id} 
                        OP={post.user._id} 
                    />
                </div>
            )}
        </div>
    )
}
