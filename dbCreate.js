const express = require('express');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const inquirer = require("inquirer");

const app = express();
const router = require('./router');
const { sequelize } = require("./models/index");
const { Console } = require('console');
const PORT = 3000;

app.use(express.json());
app.use(router);

const dropFunc= async()=> {
    let salida = await exec("npx sequelize db:drop");
    console.log(salida.stdout);
    salida = await exec("npx sequelize db:create");
    console.log(salida.stdout);
    salida = await exec("npx sequelize db:migrate");
    console.log(salida.stdout);
};
const popullateFunc= async()=> {
    let salida =await exec("npx sequelize db:seed:all");
    console.log(salida.stdout);
};
const pedirDrop= async()=>{
    let drop;
    await inquirer
    .prompt([
    {
        type: 'list',
        message: '¿Quieres recargar el schema de la base de datos?',
        name: 'drop',
        choices: [
            new inquirer.Separator(' = Select = '),
            {
                name: 'Si',
            },
            {
                name: 'No',
            }
        ]
    }])
    .then((answers) => {
        drop= JSON.stringify(answers.drop);
    })
    .catch((error) => {
        drop= ("Error: "+error);
    });
    return new Promise ((resolve, reject)=>{
        resolve(drop);
    });
};
const pedirPopullate = async ()=>{
    let popullate;
    await inquirer
    .prompt([
    {
        type: 'list',
        message: '¿Quieres poblar la base de datos?',
        name: 'popullate',
        choices: [
            new inquirer.Separator(' = Select = '),
            {
                name: 'Si',
            },
            {
                name: 'No',
            }
        ]
    }])
    .then((answers) => {
        popullate= JSON.stringify(answers.popullate);
    })
    .catch((error) => {
        popullate= ("Error: "+error);
    });
    return new Promise ((resolve, reject)=>{
        resolve(popullate);
    });
};
const todo=async()=>{
    try{
        let drop= await pedirDrop();
        if(drop=='"Si"'){
            console.log("dropping");
            await dropFunc();
            let popullate = await pedirPopullate();
            if(popullate=='"Si"'){
                console.log("popullating");
                await popullateFunc();
            }
        }
    }catch(error){
        console.log("Error: "+error);
    }
    
};

todo();