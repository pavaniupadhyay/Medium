import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign ,verify} from 'hono/jwt'
import { signupInput}from "../../../common/src/index"

  


export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET:string
  }
  }>()
  userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const {success} =signupInput.safeParse(body);
    if (!success) {
      return c.status(411);
      c.json({
         message: 'Invalid request'
         });
      }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Parse the request body correctly

  const user=await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });
 
  const token= await sign({id: user.id},c.env.JWT_SECRET)  
  return c.json({jwt:token});
});
 
userRouter.post('/signin', async(c) => {

const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Parse the request body correctly
  const body = await c.req.json();

   const user=await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if(!user){
     c.status(401);
     return c.json({message:'Invalid credentials'})
  }
 
  const token= await sign({id: user.id},c.env.JWT_SECRET)  
  return c.json({jwt:token});
});
