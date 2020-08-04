const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());

const users = [];

///obter os usuarios
app.get("/users", (req, res) => {
  res.json(users);
});


/** A encriptação se dará atraves de um 'sal'
 *  mais a senha criptografada
 * Pega o usuario e a senha do corpo da requisiçao
 * genSal()            - gera o sal
 * hash('passord')     - encripta a senha
 */
app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    hashedPwd = await bcrypt.hash(req.body.password, salt);
    //hashedPwd = await bcrypt.hash(req.body.password, 10);

    const user = { name: req.body.name, password: hashedPwd };

    users.push(user);
    res.status(201).send();
  } catch (err) {
    console.log(err.message);
    res.status(500).send();
  }
});

/**LOGAR O USARIO - se ele tiver as credenciais la
 * mostra a tela de boas vindas apos ele entrar 
 * com nome e senha
 * bcrypt.compare(senhaEntrada,senhaSalva) se bater bacana
 * usuario validado
 */
app.post('/users/login',async (req,res)=>{
    //procura um usuario que bate com o usuario  q passamos
    const user = users.find(user=>user.name===req.body.name)
    if(user==null){
        return res.status(400).send('Usuario nao encontrado');
    }
    ///verificar o passwd
    try {
       if(await bcrypt.compare(req.body.password,user.password)){
           res.send('Sucesso');
       }else{
           res.send('Nao autorizado');
       }
    } catch {
        res.status(500).send();
    }
})




app.listen(3000, () => {
  console.log("ouvindo a porta 3000");
});
