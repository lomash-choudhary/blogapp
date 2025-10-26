import { Client, Account, ID } from "appwrite";
import config from "../config/config";
export class AuthService {
  client: any;
  account: any;

  constructor() {
    // we will write all the logic of setting project endpoints and setting projects keys because we want that when ever someone uses the object of AuthService class only then we need to intialise all of this data, inorder to get rid of vandalize situation because what if we have to move out of appwrite at some point, so we will only have to modify this constructor part.
    // this.client.setProject(config.appwriteProjectId).setEndpoint(config.appwriteUrl);
    this.client = new Client()
      .setProject(config.appwriteProjectId)
      .setEndpoint(config.appwriteUrl);
    this.account = new Account(this.client);
  }

  async createUserAccount({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another function to also login the user into the app
        return this.loginUser({email, password})
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUser({ email, password }: { email: string; password: string }) {
    try {
        const userLogin = await this.account.createEmailPasswordSession(
            email, 
            password
        )
        return userLogin
    } catch (error) {
        throw error
    }
  }

  async getCurrentLoggedInUser(){
    try {
        return await this.account.get()
        // we can also use if and else here as well in order to return if anydata is prenset or not, or we can just return null after the try catch so that if any error comes inside the try catch block we return something that is null.
    } catch (error) {
        console.log(`Appwrite service :: getCurrentLoggedInUser :: error ${error}`)
    }

    return null;
  }

  async logout(){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        console.log(`Appwrite service :: logout :: error ${error}`)
    }
  }
}

const authServiceObject = new AuthService();

export default authServiceObject;
