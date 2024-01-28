import PostCard from "@/components/postCard"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { usePostByStyle } from "@/hooks/usePost"
import { makeStyles, shorthands, Spinner, Text, Button } from "@fluentui/react-components"
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"

const { min } = Math

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    ...shorthands.padding("20px"),
  },
  text: {
    marginTop: "20px",
  },
  loadMoreButton: {
    marginTop: "20px",
  },
})

export default function PostList() {
  const styles = useStyles()
  const router = useRouter()
  const { style, type } = router.query
  const { allPost, isLoading } = usePostByStyle(style, type)
  const [indexShown, setIndexShown] = useState(0)

  useEffect(() => {
    if (allPost.length < 10) {
      setIndexShown(allPost.length)
    } else {
      setIndexShown(10)
    }
  }, [allPost])

  const handleLoadMore = () => {
    const newIndex = min(allPost.length, indexShown + 10)
    setIndexShown(newIndex)
  }

  return (
    <>
      <Header />
      <section className={styles.container}>
        {isLoading ? (
          <Spinner size="large" />
        ) : allPost.length > 0 ? (
          allPost.slice(0, indexShown + 1).flat().map((post) => (
            <PostCard size="large" key={post._id} post={post} />
          ))
        ) : (
          <Text size={500} className={styles.text}>
            No posts here yet
          </Text>
        )}
        {allPost.length > indexShown + 1 && (
          <Button
            size="large"
            appearance="primary"
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
