import { useState, useContext, useCallback, } from 'react'
import { AuthContext } from './providers/AuthProvider'
import { Card, CardFooter, CardHeader, CardPreview, makeStyles, Input, Body1, Image, shorthands, Avatar, Select, SpinButton, Button} from "@fluentui/react-components" 
import { createPhoto } from '@/services/photo-service'
import { editPost } from '@/services/post-service'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

const optionList = ["Accessory", "Activewear", "Blouses", "Bra", "Coats", "Dress Pants", "Dress Shirt", "Dresses", "Jackets & Blazers", "Jeans & Denim", "Loungewear", "Outfit Showcase", "Pants & Leggings", "Shoes", "Shorts", "Skirts", "Sleepwear", "Suits & Separates", "Sweaters", "Sweatshirts & Hoodies", "Swimwear", "T-Shirt", "Underwear"]

const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
    },
    row: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        alignContent: "center",
        "> *": {
            marginRight: "10px",
        },
    },
    image: {
        maxHeight: "60vh",
    },
    button_container: {
        ...shorthands.margin("10px"),
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
    },
    file: {
        minHeight: "50vh",
        width:"100%"
    }
})

export default function EditPostForm({ post, setEditPost, madeChanges }) {
    const { user, getToken } = useContext(AuthContext)
    const styles = useStyles()

    const [title, setTitle] = useState(post.title)
    const [type, setType] = useState(post.type)
    const [review, setReview] = useState(post.review)
    const [style, setStyle] = useState(post.style)
    const [price, setPrice] = useState(post.price)
    const [photo, setPhoto] = useState(post.photo[0].mainUrl)
    const [photoChanged, setPhotoChanged] = useState(false)

    const editor = useEditor({
        extensions: [
            StarterKit, 
            Placeholder.configure({
                placeholder: 'Please tell us about the item(s) you are showcasing!\n Why are they a great find?', 
            }),
        ],
        onUpdate: ({ editor }) => {
            const formattedReview = editor.getHTML().replace(`</p><p>`, '</p><br/><p>')
            setReview(formattedReview)
        },
    })

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const token = getToken()
            let payload
            if (photoChanged) {
                const photoId = await createPhoto(photo, token)
                payload = {
                    title,
                    type,
                    review,
                    style,
                    price,
                    photo: [photoId],
                }
            } else {
                payload = {
                    title,
                    type,
                    review,
                    style,
                    price,
                }
            }
            const response = await editPost(payload, post._id, token)
            if (response.message === "Post Updated successfully") {
                madeChanges()
                setEditPost(null)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleClose = () => {
        setEditPost(null)
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeType = (e) => {
        setType(e.target.value);
    }

    const handleChangeStyle = (e) => {
        setStyle(e.target.value);
    }

    const handleChangePrice = useCallback(
        (_ev, data) => {
            if (data.value !== undefined) {
                setPrice(data.value);
            } 
        },
        [setPrice]
    )

    const handleChangePhoto = (e) => {
        const photo = e.target.files[0]
        setPhoto(photo)
        setPhotoChanged(true)
    }

    const handleRemovePhoto = () => {
        setPhoto()
        setPhotoChanged(true)
    }

    return (
        <div >
            {user && (
                <form onSubmit={handleSubmit}>
                    <Card size="small">
                        <CardHeader
                            image={<Avatar name={user.username} />}
                            header={
                                <Body1>
                                    <Input 
                                        size="large"
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        value={title}
                                        onChange={handleChangeTitle}
                                    />
                                </Body1>
                            }
                        />
                        <CardPreview>
                            {photo ? (
                                <Image 
                                    src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)} 
                                    alt="Example"
                                    className={styles.image}/>
                            ) : (
                                <div>
                                    <Input
                                        id="photo_upload"
                                        type="file"
                                        onChange={handleChangePhoto}
                                        accept="image/*"
                                        className={styles.file}
                                    />
                                </div>
                            )}
                        </CardPreview>
                        <CardFooter className={styles.content}>
                            <div className={styles.row}>
                                <Select 
                                    onChange={handleChangeStyle} defaultValue={style}>
                                    <option>Feminine</option>
                                    <option>Androgynous</option>
                                    <option>Masculine</option>
                                </Select>
                                <Select 
                                    onChange={handleChangeType} 
                                    defaultValue={type}>
                                    {optionList.map((option) => (
                                        <option key={option}>{option}</option>
                                    ))}
                                </Select>
                            </div>
                            <div className={styles.row}>
                                <SpinButton
                                    value={price.toString()}
                                    displayValue={`$${Math.max(price, 0)}`}
                                    min={0}
                                    onChange={handleChangePrice}
                                />
                                <Button 
                                    onClick={() => handleRemovePhoto()}>Remove Photo</Button>
                            </div>
                            <EditorContent editor={editor} />
                        </CardFooter>
                    </Card>
                    <div className={styles.button_container}>
                        <Button 
                            appearance="primary" 
                            onClick={() => handleClose()}>Close</Button>
                        <Button 
                            appearance="primary" type="submit">
                            Update Post
                        </Button>
                    </div>
                </form>
            )}
        </div>
    )
}
