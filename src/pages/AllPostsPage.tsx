import { useEffect, useState } from "react";
import appWriteServiceObject from "../appwrite/appwrite_config";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";

const AllPostsPage = () => {
  const [posts, setPost] = useState([]);
  useEffect(() => {}, []);
  appWriteServiceObject
    .getMultipleDocumentsWhoStatusIsActive([])
    .then((posts) => {
      if (posts) {
        setPost(posts.documents);
      }
    });

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post:any) => (
            <div key={post.$id} className="p-2 w-1/4">
                <PostCard $id={post?.$id} title={post?.title} featuredImage={post?.featuredImage}/>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPostsPage;
