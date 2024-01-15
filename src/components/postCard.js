import { Card, CardFooter, CardHeader, CardPreview, makeStyles, Text, Body1, Image, Label, shorthands, Avatar} from "@fluentui/react-components";

const useStyles = makeStyles({
	card: {
		...shorthands.margin("20px"),
	  	width: "500px",
	  	maxWidth: "100%",
	},
	review_text: {
		whiteSpace: "pre-line",
	}
})

export default function PostCard({ post }) {
	const styles = useStyles();

	return (
		<Card className={styles.card} size="large">
			<CardHeader
				image={<Avatar name={post.user.username} />}
                header={
                    <Body1>
                        <Label size="large">{post.title}</Label>
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
				<Text className="review_text">{post.review}</Text>
			</CardFooter>
	  	</Card>
	)
}
