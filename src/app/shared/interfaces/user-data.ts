export interface LoginData {
    email: string
    password:string
}

export interface UserData extends LoginData {
    name: string
    rePassword:string
    dateOfBirth:Date
    gender:string
    photo:File
    createdAt:Date
}

export interface changePassword {

    password:string
    newPassword:string
}

export interface photo {
    photo:File
}

