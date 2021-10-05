'use strict';

import * as Shaper from './DrawShape.js';
import { writeToFile, deleteFile, readFromFile, jsonReader, EnviarShapeToClient} from  './fileOperations.js'
import fs from 'fs';

var lado = "";
var centro = "";
var outpuType = "web";
var numOfShapes = 0;
const inicio = Date.now();

var momento = new Date();

var DiaDeHoy =  momento.getDate()  + '-' + (momento.getMonth() +1 ) + '-' + momento.getFullYear();
var horaInicial = momento.getHours() + ":" + momento.getMinutes() + ":" + momento.getSeconds();

console.log("Inicio: -> " + horaInicial)

for (let j = 0; j < process.argv.length; j++) {

    console.log(j + ' -> ' + (process.argv[j]));

    if (j==2) {
        lado = process.argv[j];
    } else if (j==3) {
        centro = process.argv[j];
    } else if (j==4)  {
        if (process.argv[j].length != 0){
            outpuType = process.argv[j];
        }
    } else if (j==5) {
      var filePath = process.argv[j];
    }
}



// Now Let's Process all json requests from the file
 processJsonRequests(filePath);
// TrabajandoConArreglos('Nuestro programa es muy chulo');

function TrabajandoConArreglos(nombreDelUsuario){

  let ListaDeElementos = nombreDelUsuario.split("");
  console.log(ListaDeElementos);

  for (let i = ListaDeElementos.length; i >= 0 ; i--) {
    // ListaDeElementos.push(i);
    console.log(ListaDeElementos[i]);
  }

  
};


function processJsonRequests(filePath){
 
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file:', err);
      return;
    }

    // console.log(data);

    try {

      const collections = JSON.parse(data);
  
      // una vuelta para cada solicitudes
      for (let index = 0; index < collections.Solicitudes.length; index++) { 
        
        const nombre = collections.Solicitudes[index].nombre; 
        const tipoDeEntrega = collections.Solicitudes[index].tipoDeEntrega;
        const correo = collections.Solicitudes[index].correo; 
        const multipleFiles =  collections.Solicitudes[index].multipleFiles;
        const totalDeOrders = collections.Solicitudes[index].orders.length;
        
      
        var fileContent = "";

        // una vuelta para cada orders
        for (let i = 0; i < totalDeOrders; i++) {

          const lado = collections.Solicitudes[index].orders[i].lado;
          const centro = collections.Solicitudes[index].orders[i].centro;
          const cantidad = collections.Solicitudes[index].orders[i].cantidad;
          const ratio = collections.Solicitudes[index].orders[i].ratio;
          var shape = collections.Solicitudes[index].orders[i].shape;

          console.log('Inicio-> Cliente: ' + nombre + ' Cantidad de Shapes: ' + cantidad + "\n\n");
    
          // producir e imprimir solo un shape en la pantalla
         
          var fileName = "";

          if (multipleFiles == true) {
            fileName = "./Data/"  + nombre + "." + shape + "."  + "orders[" + i + "].txt"
            fileContent = "";

          } else if (multipleFiles == false) {
            fileName = "./Data/" + nombre + ".txt"
          }

          var tempFileContent = "";
          tempFileContent = Shaper.ShapeController(lado , centro, outpuType, shape, ratio);
          // console.log(tempFileContent + "\n\n");

          // una vuelta para cada shapes
          for (let j = 0; j < cantidad; j++) {
           
            // acumular shapes
            fileContent += tempFileContent;
            numOfShapes ++

          } // for para Shapes
          

          writeToFile(fileName, fileContent, (err)=>{ 
            if (err) { 
              console.log('Error Message:' + err);
            }
          });

        } // for para orders
        
        if (tipoDeEntrega == "correo") {       
            EnviarShapeToClient(nombre+ ".txt", correo);
        }
        console.log('Final: Cliente:' + nombre + "\n\n");

      } // for para solicitudes

       
      var momento = new Date ();
      var horaFinal = momento.getHours() + ":" + momento.getMinutes() + ":" + momento.getSeconds();

      const final = Date.now();
      const duracion = (final - inicio)/ 1000;
      
      
      console.log("****************************************");
      console.log("*");
      console.log("*  Programa: -> ShapeMaker ");
      console.log("*");
      console.log("*  Fecha de ejecucion: -> "+ DiaDeHoy);
      console.log("*  Numero de Shapes: -> " + numOfShapes);
      console.log("*  Inicio: -> " + horaInicial);
      console.log("*  Final: -> " + horaFinal);
      console.log("*");
      console.log("*  Duracion de Ejecucion = " + duracion);
      console.log("*");
      console.log("****************************************");


    } catch (err) {
      console.log('Error parsing JSON:', err);
    }

  });

};

/*

****************************************
*
*  Programa: -> ShapeMaker
*
*  Fecha de ejecucion: -> 21-9-2021
*  Numero de Shapes: -> 103
*  Inicio: -> 12:58:47
*  Final: -> 12:59:3
*
*  Duracion de Ejecucion = 15.874
*
****************************************

****************************************
*
*  Programa: -> ShapeMaker
*
*  Fecha de ejecucion: -> 21-9-2021
*  Numero de Shapes: -> 103
*  Inicio: -> 13:25:6
*  Final: -> 13:25:7
*
*  Duracion de Ejecucion = 0.658
*
****************************************
*/