import { DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";


const Produtos = sequelize.define('Produtos', {
    nome : {
        type : DataTypes.STRING,
        allowNull : false
    },

    detalhes : {
        type : DataTypes.TEXT,
        allowNull: false
    },

    preco : {
        type : DataTypes.FLOAT,
        allowNull: false
    },
    slug : {
        type : DataTypes.STRING,
        allowNull: false
    },

    imagem : {
        type : DataTypes.TEXT,
        allowNull: true
    },

    estoque : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
},
{
    tableName: 'produtos', // Nome exato da tabela no banco de dados
});


export default Produtos