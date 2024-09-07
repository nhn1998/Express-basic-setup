export type TUser ={
    id:string;
    password:string;
    needsPasswordChange:boolean;
    role:'student'|'faculty'|'admin';
    staus:'in-progress'|'blocked';
    isDeleted: boolean
}

