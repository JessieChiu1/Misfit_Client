import { useState, useEffect } from "react"
import * as postService from "../services/post-service"

export const usePost = (style) => {
	const [allPost, setPost] = useState([]);
  
	useEffect(() => {
	  const fetchData = async () => {
		try {
		  let data;
		  if (style === '') {
			data = await postService.getAllPost();
		  } else {
			data = await postService.getPostByStyle(style);
		  }
  
		  if (Array.isArray(data)) {
			setPost(data);
		  } else {
			setPost([]); // Set an empty array if data is not an array
		  }
		} catch (error) {
		  console.error('Error fetching posts:', error);
		  setPost([]); // Set an empty array in case of an error
		}
	  };
  
	  fetchData();
	}, [style]);
  
	return { allPost, setPost };
  };