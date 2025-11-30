import { useEffect, useState } from "react"
import appWriteServiceObject from "../appwrite/appwrite_config"
import Container from "../components/container/Container"
import PostCard from "../components/PostCard"

const HomePage = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appWriteServiceObject.getMultipleDocumentsWhoStatusIsActive().then((posts) => {
            if(posts){
                setPosts(posts)
            }
        })
    },[])

    if(posts.length === 0){
        return(
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
  return (
    <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
                {
                    posts.map((post:any) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
  )
}

export default HomePage