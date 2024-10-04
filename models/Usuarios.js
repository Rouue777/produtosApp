import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Usuarios = sequelize.define('Usuarios', {
    nome :{
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type : DataTypes.STRING,
        allowNull:false
    },

    eadmin : {
        type : DataTypes.INTEGER, 
        allowNull : false,   
        defaultValue : 0
    },

    senha : {
        type : DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'usuarios', // Defina o nome da tabela como 'usuarios'
    timestamps: true // Ativa createdAt e updatedAt automaticamente
}
)



export default Usuarios;