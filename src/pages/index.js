import PostCard from "@/components/postCard"
import Header from "@/components/layout/header"
import { usePostByStyle } from "@/hooks/usePost"
import { makeStyles, shorthands, Spinner, Button, Text } from "@fluentui/react-components"
import Footer from "@/components/layout/footer"
import { useState, useEffect } from "react"

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
  

export default function Home() {
	const styles = useStyles()
	const { allPost, isLoading } = usePostByStyle("")
	const [pagePost, setPagePost] = useState([])
	const [sortBy, setSortBy] = useState()
	const [currentPage, setCurrentPage] = useState(0)

	useEffect(() => {
		// This will create a 2D array where each subArray contains all of the post for their respective page 
		// [[0-9 post],[10-19 post], [20-29 post]]
		const createSubPageArray = (allPost, postPerPage) => {
			const output = []
	
			for (let i = 0; i < allPost.length; i += postPerPage) {
			const pageArray = allPost.slice(i, i + postPerPage)
			output.push(pageArray)
			}
	
			setPagePost(output)
		}
	
		createSubPageArray(allPost, 10)
	}, [sortBy, allPost])
	
	const handleLoadMore = () => {
		setCurrentPage(currentPage + 1)
	}

	return (
		<>
		  <Header />
		  <section className={styles.container}>
			{isLoading ? (
			  <Spinner size="large" />
			) : pagePost.length > 0 ? (
			  pagePost.slice(0, currentPage + 1).flat().map((post) => (
				<PostCard size="large" key={post._id} post={post} />
			  ))
			) : (
			  <Text size={500} className={styles.text}>
				No posts here yet
			  </Text>
			)}
			{pagePost.length > currentPage + 1 && (
			  <Button
				appearance="primary"
				size="large"
				className={styles.loadMoreButton}
				onClick={handleLoadMore}
			  >
				Load More
			  </Button>
			)}
		  </section>
		  <Footer />
		</>
	)
}
