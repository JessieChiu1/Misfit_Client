import { useState, useEffect } from "react"
import * as postService from "../services/post-service"

export const useCommentByPostId = (postId) => {
    const [allComment, setAllComment] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [commentAdded, setCommentAdded] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)

                const data = await postService.getCommentByPostId(postId)

                if (Array.isArray(data)) {
                    const sortedComments = data.sort((a, b) => {
                        const totalVoteA = a.upvote.length - a.downvote.length;
                        const totalVoteB = b.upvote.length - b.downvote.length;
                        return totalVoteB - totalVoteA;
                    });

                    setAllComment(sortedComments);
                } else {
                    setAllComment([])
                }
            } catch (e) {
                console.error('Error fetching posts:', e)
                setAllComment([])
            } finally {
                setIsLoading(false);
            }
        }

        fetchData()
    }, [postId, commentAdded])

    const madeChangesComment = () => {
        setCommentAdded(prevState => !prevState)
    }

    return { allComment, isLoading, madeChangesComment }
}
