import PostCard from "@/components/postCard"
import Header from "@/components/layout/header"
import { usePostByStyle } from "@/hooks/usePost"
import { makeStyles, shorthands, Spinner } from "@fluentui/react-components"
import Footer from "@/components/layout/footer"
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'

const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "100vh",
		...shorthands.padding("20px"),
	},
})
  

export default function PostList() {
	const cssStyles = useStyles()
    const router = useRouter()
    console.log(router.query)
    const { style, type } = router.query

	const { allPost } = usePostByStyle(style, type)

	return (
		<>
			<Header/>
			<section className={cssStyles.container}>
				{allPost.length > 0 ? (
					allPost.map((post) => (
						<PostCard size="large" key={post._id} post={post}/>
					))
				) : (
					<Spinner size="large" />
				)}
			</section>
			<Footer/>
		</>
	)
}
