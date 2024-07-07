// unlike previously now we will not have to use ! for env variable because of ts
const conf = {
    appwriteUrl:String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteprojectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
}

export default conf