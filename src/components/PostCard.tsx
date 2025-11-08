import { Link } from "react-router-dom"
import fileUploadServiceObject from "../appwrite/file_uplod_service"


const PostCard = ({$id, title, featuredImage}:{
    $id:any,
    title:any,
    featuredImage:any
}) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className="w-full justify-center mb-4">
            <img src={fileUploadServiceObject.getFilePreviewService(featuredImage)} alt={title} className="rounded-xl"/>
            </div>
            <h2 className="text-xl font-bold">
                {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard