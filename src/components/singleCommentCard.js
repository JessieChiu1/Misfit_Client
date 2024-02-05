import { Avatar, Card, CardHeader, Text} from "@fluentui/react-components"

export default function SingleCommentCard({ comment }) {
  return (
    <Card>
        <CardHeader
            image={<Avatar name={comment.user.username} />}
        />
        <Text size={400} className="review_text"><div dangerouslySetInnerHTML={{ __html: comment.body }} /></Text>
    </Card>
  );
}
