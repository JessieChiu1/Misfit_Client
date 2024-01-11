import { Card, CardFooter, CardHeader, CardPreview, makeStyles, Text, Body1, Image} from "@fluentui/react-components";

const useStyles = makeStyles({
	card: {
	  width: "300px",
	  maxWidth: "100%",
	},
  });

export default function PostCard({ post }) {
	const styles = useStyles();

	return (
		<Card className={styles.card}>
			<CardHeader
				header={
					<Body1>
						<Text>{post.title}</Text >
					</Body1>
				}
			/>
			<CardPreview>
				<Image
					src={post.photo[0].mainUrl}
					alt="Example"
				/>
			</CardPreview>
			<CardFooter>
				<Text>{post.review}</Text>
			</CardFooter>
	  	</Card>
	)
}
