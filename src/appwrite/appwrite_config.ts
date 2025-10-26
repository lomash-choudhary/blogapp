import { Client, Databases, Query, Storage } from "appwrite";
import config from "../config/config";

export class AppwriteServices {
  client: any;
  databases: any;
  bucket: any;
  constructor() {
    this.client = new Client()
      .setProject(config.appwriteProjectId)
      .setEndpoint(config.appwriteUrl);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImages,
    status,
    userId,
  }: {
    title: string;
    slug: string;
    content: string;
    featuredImages: string;
    status: string;
    userId: string;
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        // we are considering the slug as the document id
        slug,
        {
          title,
          content,
          featuredImages,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(`Appwrite service :: createPost :: error ${error}`);
    }
  }

  async updatePost(
    slug: string,
    {
      title,
      content,
      featuredImages,
      status,
    }: {
      title: string;
      content: string;
      featuredImages: string;
      status: string;
    }
  ) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImages,
          status,
        }
      );
    } catch (error) {
      console.log(`Appwrite service :: updatePost :: error ${error}`);
    }
  }

  async deleteDocument(slug: string) {
    try {
        await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
            // here we treat slug as a document id
        )
        return true;
    } catch (error) {
        console.log(`Appwrite service :: deleteDocument :: error ${error}`)
        return false
    }
  }

  async getSingleDocument(slug:string){
    try {
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log(`Appwrite service :: getSingleDocument :: error ${error}`)
        return false
    }
  }

//   we can only apply queries to those columns whom we have indexed.
// so we want to only get those documents whose status is active.
  async getMultipleDocumentsWhoStatusIsActive(queries = [Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries
        )
    } catch (error) {
       console.log(`Appwrite service :: getMultipleDocumentsWhoStatusIsActive :: error ${error}`)
        return false 
    }
  }
}
