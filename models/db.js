import { Sequelize } from "sequelize";

const sequelize = new Sequelize('produtosApp', 'root', 'sql123',{
    host: 'localhost',
    dialect : 'mysql'
})

sequelize.authenticate().then(() =>{
    console.log('banco de dados conectado com sucesso')
}).catch((err)=>{
    console.log('erro ao conctar ao banco de dados' + err)
})


export default sequelize;