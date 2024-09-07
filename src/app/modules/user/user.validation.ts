import { z } from "zod";

const userSchemaValidation = z.object({
    
    password:z.string({
        invalid_type_error:"password must be string"
    }).max(20,{message:"password must be under 20 character"}).optional(),
    status:z.enum(['in-progress','blocked']).default('in-progress'),
})
export const userValidation={
    userSchemaValidation
}