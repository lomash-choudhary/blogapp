import { Client, Databases, ID, Storage } from "appwrite";
import config from "../config/config";

export class FileUploadService {
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

  //   file upload services
  async uploadFile(file: any) {
    try {
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log(`Appwrite service :: uploadFile :: error ${error}`)
        return false
    }
  }

  async deleteFile(fileId:string){
    try {
        await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId
        )
        return true
    } catch (error) {
        console.log(`Appwrite service :: deleteFile :: error ${error}`)
        return false
    }
  }

  getFilePreviewService(fileId:any){
    try {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    } catch (error) {
        console.log(`Appwrite service :: getFilePreview :: error ${error}`)
        return false
    }
  }
}

const fileUploadServiceObject = new FileUploadService();

export default fileUploadServiceObject;
