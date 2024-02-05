import { useCommentByPostId } from "@/hooks/useComment"
import { Button, Spinner, Text } from "@fluentui/react-components"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useState, useEffect, useContext } from "react"
import SingleCommentCard from "./singleCommentCard"
import { AuthContext } from './providers/AuthProvider'
import { createRootComment } from "@/services/comment-service"
const { min } = Math

export default function Comment({ postId }) {
	const { user, getToken } = useContext(AuthContext)
	const [commentBody, setCommentBody] = useState("")
	const [indexShown, setIndexShown] = useState(0)
	const { allComment, isLoading } = useCommentByPostId(postId)

	console.log(allComment, isLoading)
	
	useEffect(() => {
		if (allComment.length < 10) {
		  setIndexShown(allComment.length)
		} else {
		  setIndexShown(10)
		}
	}, [allComment])

	const editor = useEditor({
		extensions: [
		StarterKit,
		Placeholder.configure({
			placeholder: "Comment here!",
		}),
		],
		onUpdate: ({ editor }) => {
		const formattedReview = editor
			.getHTML()
			.replace(`</p><p>`, "</p><br/><p>");
			setCommentBody(formattedReview);
		},
	})

	const handleLoadMore = () => {
		const newIndex = min(allComment.length, indexShown + 10);
		setIndexShown(newIndex);
	}

	const handleSubmit = async(e) => {
		try {
			e.preventDefault()
			const token = getToken()
			const payload = {
				user: user.id,
				body: commentBody,
				parent: postId,
			}
			const response = await createRootComment(payload, token)
			console.log(response)
		} catch (e) {
			console.log(e)
		}
	}

return (
	<div>
	<form onSubmit={handleSubmit}>
		<EditorContent editor={editor} />
		<Button appearance="primary" type="submit">Submit Comment</Button>
	</form>
	<div>
		{isLoading ? (
			<Spinner size="large" />
			) : allComment.length > 0 ? (
			allComment.slice(0, indexShown + 1).flat().map((comment) => (
				<SingleCommentCard comment={comment} key={comment._id} />
			))
			) : (
			<Text size={500} >
				No Comment here yet
			</Text>
			)}
			{allComment.length > indexShown + 1 && (
			<Button
				size="large"
				appearance="primary"
				onClick={handleLoadMore}
			>
				Load More
			</Button>
		)}
		</div>
	</div>
)
}
