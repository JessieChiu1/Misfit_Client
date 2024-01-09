import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../components/AuthProvider';
import { Label, Input, Textarea, SpinButton, Button, Select, MessageBar, MessageBarBody, MessageBarTitle, MessageBarActions, DismissRegular } from "@fluentui/react-components";
import { useRouter } from "next/router";
import UserHeader from "@/components/userHeader"
import { createPhoto } from '@/services/photo-service';
import { createPost } from '@/services/post-service';

export default function NewPostForm() {
    const { user, getToken } = useContext(AuthContext);
    const router = useRouter();

    const [title, setTitle] = useState("")
    const [type, setType] = useState("Outerwear")
    const [review, setReview] = useState("")
    const [style, setStyle] = useState("Feminine")
    const [price, setPrice] = useState(null | 0)
    const [photo, setPhoto] = useState()
    
    const handleNavigation = (route) => {
        router.push(route)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getToken()
        const photoId = await createPhoto(photo, token)
        const payload = {
            title,
            type,
            review,
            style,
            price,
            photo: [photoId],
        }

        const response = await createPost(payload, token)
        if (response.hasOwnProperty('_id')) {
            handleNavigation("/")
        }
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeType = (e) => {
        setType(e.target.value);
    }

    const handleChangeReview = (e) => {
        setReview(e.target.value);
    }

    const handleChangeStyle = (e) => {
        setStyle(e.target.value);
    }

    const handleChangePrice = useCallback(
		(_ev, data) => {
		  console.log("onSpinButtonChange", data.value);
		  if (data.value !== undefined) {
			setPrice(data.value);
		  } 
		},
		[setPrice]
	)

    const handleChangePhoto = (e) => {
        const photo = e.target.files[0]
        setPhoto(photo)
    }

    return (
        <div>

            {user ? (
                <form onSubmit={handleSubmit}>
                    <Input 
                        size="large"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={handleChangeTitle}
                    />
                    <div>
                        <Label>Apparel Type</Label>
                        <Select onChange={handleChangeType}>
                            <option>Outerwear</option>
                            <option>Top</option>
                            <option>Pant</option>
                            <option>Skirt</option>
                            <option>Accessory</option>
                        </Select>
                    </div>
                    <Textarea 
                        size="large"
                        type="text"
                        name="review"
                        placeholder="Please describe the item you are showcasing. If possible include the brand name and why this item is a great find!"
                        value={review}
                        onChange={handleChangeReview}
                    />
                    <div>
                        <Label>Style</Label>
                        <Select onChange={handleChangeStyle}>
                            <option>Feminine</option>
                            <option>Androgynous</option>
                            <option>Masculine</option>
                        </Select>
                    </div>
					<SpinButton
						value={price.toString()}
						displayValue={`$${Math.max(price, 0)}`}
						min={0}
						onChange={handleChangePrice}
					/>
                    <input 
                        type="file"
                        onChange={handleChangePhoto}
                    />
                    <Button type="submit">Create Post</Button>
                </form>
            ) : (
                <nav>
                    <Label>Please sign up or login to make a post.</Label>
                    <UserHeader />
                </nav>
            )}
        </div>
    )
}
