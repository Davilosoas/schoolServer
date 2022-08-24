import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { v4 as uuid} from 'uuid';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient()
const app = express();
app.use(express.json());
const read = await prisma.Grades.findMany()






app.use(cors('*'));

// const users = [{ name: 'Isaque', age: 24}, {name: 'Davi', age: 21};


app.get('/', async function(req, res) {
 
    
    res.send(await prisma.Grades.findMany());
    
});
app.post('/getUser', async function(req, res) {
  console.log(typeof parseInt(req.body.token))
    
  res.send(await prisma.Grades.findMany({
    where:{
      userId: parseInt(req.body.token),
    }
  }))
  
});

app.post('/createUser', async function(req, res){

    const userId = 1
    const teacherId = 1
    // parseFloat(req.body.userId, 10)
    async function createUser() {
      await prisma.Grades.create({
        data: {
          userId: userId,
          teacherId: teacherId
        },
      });
      res.send(await prisma.Grades.findMany())
    } 

    createUser();
    
  
})

app.post('/login', async function(req, res){
    // const email  = req.body.email;
    // const psw = parseInt(req.body.psw);
  //  console.log(psw) 
    const find = await prisma.User.findMany({
      where:{
        name: 'Everton',
        id: 1
      }
    })
    
    
    if(find.length === 1) {
      const token = uuid();
      const userId = find[0].id.toString()
      
      res.send({  token, userId })
   }
   else {
    res.send(console.log('algo deu errado'))
   }
    
  
  
})

app.put('/changeUser', async function(req, res){
  const id = req.body.id
  console.log(id)
  async function updateUser () {

    await prisma.Grades.update({
      where: {
        id: id,
      },
      data: {
        name: 'Viola the Magnificent',
      },
    })

  res.send(read)
};

})

app.put('/changeGrade1', async function(req, res){
  const id = req.body.id
  
  const newG1 = parseFloat(req.body.g1, 10)

  console.log(newG1);
  async function updateGrade () {

    await prisma.Grades.update({
      where: {
        id: id,
      },
      data: {
        grade1: newG1,
      },
    
    })
  }
updateGrade();

  res.send(read)
})

app.post('/deleteUser', async function(req, res){
  const idToDelete = parseFloat(req.body.id, 10)
  

  const find = await prisma.Grades.findMany({
    where:{
      id: idToDelete
    }
  })
  
 
  
  async function deleteUser() { 
    await prisma.Grades.delete({
    where: {
      id: idToDelete
    }
  })
  
  res.send(await prisma.Grades.findMany())
}
 
  if(find.length === 1) {
     deleteUser();
  }
 
  
})


app.listen(3001);