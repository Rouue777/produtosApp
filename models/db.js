import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOSTNAME,
    dialect : 'mysql'
})

sequelize.authenticate().then(() =>{
    console.log('banco de dados conectado com sucesso')
}).catch((err)=>{
    console.log('erro ao conctar ao banco de dados' + err)
})


export default sequelize;