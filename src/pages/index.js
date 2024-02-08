import PostCard from "@/components/postCard/postCard"
import Header from "@/components/layout/header"
import { usePostByStyle } from "@/hooks/usePost"
import { makeStyles, shorthands, Spinner, Button, Text } from "@fluentui/react-components"
import Footer from "@/components/layout/footer"
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
  loadMoreButton: {
    marginTop: "20px",
  },
});

export default function Home() {
  const styles = useStyles()
  const { allPost, isLoading } = usePostByStyle("")
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
  };

  return (
    <>
      <Header />
      <section className={styles.container}>
        {isLoading ? (
          <Spinner size="large" />
        ) : allPost.length > 0 ? (
          allPost.slice(0, indexShown).flat().map((post) => (
            <PostCard size="large" key={post._id} post={post} />
          ))
        ) : (
          <Text size={500} className={styles.text}>
            No posts here yet
          </Text>
        )}
        {allPost.length > indexShown && (
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
