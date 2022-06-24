const {sequelize,DataTypes}=require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Student=sequelize.define("Student",{

        symbolnumber: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        registrationnumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notEmpty: true,
      },
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
            notEmpty: true,
      },
        },
     photo:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
     }  
    }, 
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
  },
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
  },  
    },
    phone:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
  },
    }
})
return Student;
}