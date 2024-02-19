import { useCommentByPostId } from "@/hooks/useComment"
import { Button, Spinner, Text, makeStyles, mergeClasses, shorthands } from "@fluentui/react-components"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useState, useContext } from "react"
import SingleCommentCard from "./singleCommentCard"
import { AuthContext } from '../providers/AuthProvider'
import { createRootComment } from "@/services/comment-service"

const useStyles = makeStyles({
	container: {
		...shorthands.padding("20px"),
		height: "100%",
		width: "100%",
	},
	form: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	button: {
        ...shorthands.margin("5px"),
	},
	editor: {
		width: "100%",
	},
	review_text: {
		whiteSpace: "pre-line",
	},
	text: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		...shorthands.padding("20px")
	}
})

const useHoverStyles = makeStyles({
    hoverTransition: {
      transitionProperty: 'transform',
      transitionDuration: "0.25s",
      transitionTimingFunction: "linear"
    },
    hoverEffectSmall: {
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
})

export default function Comment({ postId, OP }) {
	const styles = useStyles()
	const hoverStyles = useHoverStyles()
	const { user, getToken } = useContext(AuthContext)
	const [commentBody, setCommentBody] = useState("")
	const { allComment, isLoading, madeChangesComment } = useCommentByPostId(postId)

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
			.replace(`</p><p>`, "</p><br/><p>")
			setCommentBody(formattedReview)
		},
	})

	const handleSubmit = async(e) => {
		try {
			e.preventDefault()
			const trimComment = commentBody.replaceAll("<p>", "").replaceAll("</p>","").replaceAll("<br/>", "").trim()
			if(trimComment === ""){
				console.log("please write something")
				return
			}

			const token = getToken()
			const payload = {
				user: user?.id,
				body: commentBody,
				rightToDelete: [user?.id, OP],
				parent: postId,
				upvote: [user?.id]
			}
			const response = await createRootComment(payload, token)
			if(response._id){
				madeChangesComment()
				setCommentBody("")
				editor.commands.setContent('')
			}
		} catch (e) {
			console.log(e)
		}
	}

return (
	<div className={styles.container}>
		{user ? (
			<form onSubmit={handleSubmit} className={styles.form}>
				<EditorContent editor={editor} className={styles.editor}/>
				<Button 
					appearance="primary" 
					type="submit"
					className={mergeClasses(styles.button, hoverStyles.hoverEffectSmall, hoverStyles.hoverTransition)}
					>
					Submit Comment
				</Button>
			</form>
		) : (
			<Text size={500} className={styles.text}>
				Please login to make a comment
			</Text>
		)}
		{isLoading ? (
			<Spinner size="large" />
			) : allComment.length > 0 ? (
			allComment.map((comment) => (
				<SingleCommentCard comment={comment} madeChangesComment={madeChangesComment} key={comment._id} />
			))
			) : (
			<Text size={500} className={styles.text}>
				No Comment here yet
			</Text>
			)}
	</div>
)
}
