import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOSTNAME,
    dialect : 'mysql',
    dialectOptions: {
        connectTimeout: 60000
    }
});

sequelize.authenticate().then(() =>{
    console.log('banco de dados conectado com sucesso')
}).catch((err)=>{
    console.log('erro ao conectar ao banco de dados' + err)
})


export default sequelize;