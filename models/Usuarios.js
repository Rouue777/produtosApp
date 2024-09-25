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
})



export default Usuarios;