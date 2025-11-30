import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import appWriteServiceObject from "../appwrite/appwrite_config"
import Container from "../components/container/Container"
import PostForm from "../components/PostForm/PostForm"

const EditPost = () => {
    const [posts, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appWriteServiceObject.getSingleDocument(slug).then((post) => {
                if(post){
                    setPosts(post)
                }
            })
        } else{
            navigate("/")
        }
    },[slug, navigate])
  return posts ? (
    <div className="py-8">
        <Container>
            <PostForm post={posts}/>
        </Container>
    </div>
  ) : null
}

export default EditPost