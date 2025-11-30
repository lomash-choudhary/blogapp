import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import appWriteServiceObject from "../appwrite/appwrite_config"
import fileUploadServiceObject from "../appwrite/file_uplod_service"
import Container from "../components/container/Container"
import CustomButton from "../components/CustomButton"
import parse from "html-react-parser"

const Post = () => {
    const [post, setPost]:any = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state:any) => state.authSlice.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if(slug){
            appWriteServiceObject.getSingleDocument(slug).then((post) => {
                if(post) setPost(post)
                else navigate("/")
            })
        }else{
            navigate("/")
        }
    },[slug, navigate])

    const deletePost = () => {
        appWriteServiceObject.deleteDocument(post.$id).then((status) => {
            if(status){
                fileUploadServiceObject.deleteFile(post.featuredImage);
                navigate("/")
            }
        })
    }

  return post ? (
    <div className="py-8">
        <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img 
                    src={fileUploadServiceObject.getFilePreviewService(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl"
                />

                {
                    isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <CustomButton bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </CustomButton>
                            </Link>
                            <CustomButton bgColor="bg-red-500" onClick={deletePost}>
                                Delete Post
                            </CustomButton>
                        </div>
                    )
                }
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {parse(post.content)}
            </div>
        </Container>
    </div>
  ):null
}

export default Post