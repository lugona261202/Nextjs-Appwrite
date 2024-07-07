// this is the file that directly interacts with appwrite
import conf from "@/conf/config";
import {Client,Account,ID} from 'appwrite'

type CreateUserAccount = {
    email:string,
    password:string,
    name:string,
}

type LoginUserAccount = {
    email:string,
    password:string,
}

// referencing to client from appwrite

const appwriteClient = new Client()

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteprojectId)

// referencing to account from appwrite

export const account = new Account (appwriteClient)

// now we are making an appwrite class which will be very helpful later 

export class AppwriteService{
    // create a new record of user inside appwrite
    async createUserAccount({email,password,name}:CreateUserAccount){
        try {
          const userAccount =   await account.create(ID.unique(),email,password,name)// this ID is provided by appwrite itself

            if(userAccount){
                return this.login({email,password})
            }else {
                return userAccount
            }

        } catch (error:any) {
            throw error
        }
       
    }

    async login({email,password}:LoginUserAccount){
        try {
           return await account.createEmailPasswordSession(email,password) 
        } catch (error:any) {
            throw error
        }
    }

    async isLoggedIn():Promise<boolean>{
        try {
            const data = await this.getCurrentUser()
            return Boolean(data)
        } catch (error) {}

        return false
    }

    async getCurrentUser(){
        try {
            return account.get()
        } catch (error:any) {
            console.log("getcurrentUser error"+error)
        }
        return null
    }

    async logout(){
        try {
            return await account.deleteSession("current")
        } catch (error:any) {
            console.log("logout error:"+error)
        }
    }



}

// rather than exporting class we can direct export its object

const appwriteService = new AppwriteService()

export default appwriteService



