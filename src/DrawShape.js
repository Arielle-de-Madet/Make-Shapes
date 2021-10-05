import { PonerLetras } from "../utils/utils.js";

function ShapeController(c1, c2, outputType, shapeType, ratio){

  switch (shapeType) {
    case "diamond":
      return MakeDiamond(c1, c2, outputType, ratio);
      break;
    case "square":
      return MakeSquare(c1, c2, outputType, ratio);
      break;
    case "rhombus":
      return MakeRhombus(c1, c2, outputType, ratio);
    default:
      return "shape not implemented"
      break;
  }
}

function MakeDiamond(c1, c2, outputType, ratio) {

   // console.log("Output Type Requested: " + outputType);

   var rows = 30 * ratio;
   var Shape = "";
   var lineFeed = "\n";
 

   if (outputType == "web") {
     lineFeed = "<br>";
   } else {
     lineFeed = "\n";
   }

   //  var headerDiamond = Izquierda(rows-i+1, c1) + "^" + Derecha(rows-i+1, c1) + lineFeed; (for the refactory)
   var tamanoDelCentro = 1;
   
   for (var i = 0; i <= rows; i++) {
     if( i == 0 ){
       Shape += Izquierda(rows-i+1, c1) + "^" + Derecha(rows-i+1, c1) + lineFeed;
     } else {
       tamanoDelCentro += 2;
       Shape += Izquierda(rows-i, c1) + "/" + Centro((tamanoDelCentro), c2) + "\\" + Derecha(rows-i, c1) + lineFeed;
     }
     if (outputType != "web") process.stdout.write("\n");
   }

   for (var i = rows; i >= 0; i--) {
     if( i == 0 ){
       Shape += Izquierda(rows-i+1, c1) + "v" + Derecha(rows-i+1, c1) + lineFeed;
     } else {
      Shape += Izquierda(rows-i, c1) + "\\" + Centro((tamanoDelCentro), c2) + "/" + Derecha(rows-i, c1) + lineFeed;
      tamanoDelCentro -= 2;
     }
     if (outputType != "web") process.stdout.write("\n");
   }
   return Shape;

   
};

/*

........................ (24) columnas
........................
........................
[3] limite arriba = columnas / 4
.....(5)++++++++++++++(14)..... apertura = limite + 1
.....|............(12)|.....
.....|............|.....
.....|............|.....
.....|............|.....
.....++++++++++++++..... cierre = limite abajo - 1
[6] limite abajo = rows - limite arriba 
........................
........................
........................
[12] rows = columnas / 2

*/

function MakeSquare(c1, c2, outputType, ratio) {

  var columnas =Math.round (24 * ratio) ;                   // # de columnas del area del trabajo
  var rows = Math.round(columnas * 0.25);       // # de vueltas de una mitad  
  var tamanoDelCentro = Math.round(columnas * 0.50);    // # de columnas dentro del shape
  var lateral = Math.round(columnas * 0.25);   // # de columnas afuera del shape

  var Shape = "";                                        // contenido del shape
  var lineFeed = "\n";

  const cuerpoFinal =  (lateral * 2 + tamanoDelCentro);

  if (columnas < cuerpoFinal) {
    columnas = cuerpoFinal;
  } else if (columnas > cuerpoFinal){
    tamanoDelCentro += (columnas - cuerpoFinal) 
  }

  var headerFooter = Centro(columnas + 2, c1 ) +  lineFeed ;
  var aperturaCierre = Izquierda(lateral, c1)  + Centro(tamanoDelCentro +2, "-") +  Derecha(lateral, c1) + lineFeed;
  var cuerpo = Izquierda(lateral, c1) + "|" + Centro(tamanoDelCentro, c2) + "|" + Derecha(lateral, c1) + lineFeed;
  

  if (outputType == "web") {
    lineFeed = "<br>";
  } else {
    lineFeed = "\n";
  }

   var limite = Math.round ((rows*2) * 0.3);
   var limiteDeAbajo = rows*2 - limite;

  Shape = "ratio: " + ratio  +  ", columnas: " + columnas  + ", rows: " + (rows * 2)  + ", lateral: " +  lateral  + ", tamanoDelCentro: "  +  tamanoDelCentro +  ", limite: " + limite  + lineFeed;

  // First Half
  for (var i=0; i<rows*2; i++) {
    
    switch (true){
     
      // Header de arriba
      case ( i < limite - 1):
        Shape += headerFooter;
        break;

      // limite de arriba
      // Apertura del Cuadrado
      case (i == limite -1):
        Shape += aperturaCierre;
        break;
        
      // Cierre del Cuadrado
      case (i == limiteDeAbajo):
        Shape += aperturaCierre;
        break;

      // limite de abajo
      case ( i > limiteDeAbajo):
        Shape += headerFooter;
        break;

      // Cuerpo del Cuadrado 
      default:
        Shape += cuerpo;
    }
     GetLineFeed(outputType);
   }

    //  Second Half
    //  for (var i=0; i<=rows; i++) {

    //   switch (true) {

    //     // Apertura del Cuadrado
    //     case (i == (limite + 1)):
    //       Shape += aperturaCierre;
    //       break;

    //      // Header
    //     case ( i >= limite + 1 ):
    //       Shape += headerFooter;
    //      break;
        
    //     // Cuerpo del Cuadrado 
    //     default:
    //       Shape += cuerpo;
    //    }
    //    GetLineFeed(outputType);
    // }
   return Shape;
}
/*
........................ (24 columnas)
........................ <-header
........................
limiteArriba (3) = columns / 4
.....+-----------------+ <-apertura = limite + 1
..../+++++++++++++++++/.
.../+++++++++++++++++/.. <-cuerpo (4 rows) de (17)
../+++++++++++++++++/...
./+++++++++++++++++/....
+-----------------+..... <-cierre = limiteAbajo -1
limiteAbajo = row- limiteArriba
........................ 
........................ <-footer
........................
(12 rows) 






........................ (24 columnas)
.........+---------------+
......../++++++++++++/..
......./++++++++++++/.
.........+---------------+
........................
........................


*/

function MakeRhombus (c1, c2, outputType, ratio){

  var columnas =Math.round (24 * ratio) ;                         // # de columnas del area del trabajo
  var rows = Math.round(columnas * 0.25);                // # de vueltas de una mitad  
  var tamanoDelCentro = Math.round(columnas * 0.70);    // # de columnas dentro del shape
  var lateral = Math.round(columnas * 0.20);            // # de columnas afuera del shape

  var Shape = "";                                                 // contenido del shape
  var lineFeed = "\n";

  // const cuerpoFinal =  (lateral * 2 + tamanoDelCentro);

  // if (columnas < cuerpoFinal) {
  //   columnas = cuerpoFinal;
  // } else if (columnas > cuerpoFinal){
  //   tamanoDelCentro += (columnas - cuerpoFinal) 
  // }
  var offSet = 0;
  var headerFooter = Centro(columnas, c1 ) +  lineFeed ;
  var aperturaCierre = "";
  var lateralIzquierda =  Math.round (columnas - (tamanoDelCentro + 2));
  var cuerpo = "";
  

  if (outputType == "web") {
    lineFeed = "<br>";
  } else {
    lineFeed = "\n";
  }

   var limite = Math.round ((rows*2) * 0.3);
   var limiteDeAbajo = rows*2 - limite;

  Shape = "ratio: " + ratio  +  ", columnas: " + columnas  + ", rows: " + (rows * 2)  + ", lateral: " +  lateral  + ", tamanoDelCentro: "  +  tamanoDelCentro +  ", limite: " + limite  + lineFeed;

  // First Half
  for (var i=0; i<rows*2; i++) {
    
    switch (true){
     
      // Header de arriba
      case ( i < limite - 1):
        Shape += headerFooter;
        break;

      // limite de arriba
      // Apertura del Cuadrado
      case (i == limite - 1):
       aperturaCierre = Izquierda(lateralIzquierda - offSet, c1) + "/" + Centro(tamanoDelCentro, "-" ) + "/"  + Derecha (offSet, c1) + lineFeed;
       Shape += aperturaCierre;
       offSet += 1;
        break;
        
      // Cierre del Cuadrado
      case (i == limiteDeAbajo):
        aperturaCierre = Izquierda(lateralIzquierda - offSet, c1) + "/" + Centro(tamanoDelCentro, "-" ) + "/"  + Derecha (offSet, c1) + lineFeed;
        Shape += aperturaCierre;
        offSet += 1;
        break;

      // limite de abajo
      case ( i > limiteDeAbajo):
        Shape += headerFooter;
        break;

      // Cuerpo del Cuadrado 
      default:
        cuerpo = Izquierda(lateralIzquierda - offSet, c1) + "/" + Centro(tamanoDelCentro, c2) + "/"  + Derecha (offSet, c1) + lineFeed;
        Shape += cuerpo;
        offSet+= 1;
     }
     GetLineFeed(outputType);
   }
  return Shape;
}
function MakeRhombusV1 (c1, c2, outputType){

    var columns = Math.round (24)
    var rangee =Math.round (columns * 0.25)
    var centerSize =Math.round  (columns * 0.50)
    var latéral = Math.round (columns * 0.25)

    var Shape = ""
    var lineFeed = "\n";

    if (outputType == "web") {
        lineFeed = "<br>";
      } else {
        lineFeed = "\n";
    }

    // var limiteArriba = Math.round ((rangee*2) * 0.3);
    // var limiteAbajo = rangee*2 - limiteArriba;

    // for (var i = 0; i < rangee; i++) {
    //   if( i < (limiteArriba -1)) {
    //     Shape += Centro(columns, c1) + lineFeed;
    //   } else{
    //     if (i <= (limiteArriba-1)) {
    //       Shape += Izquierda((latéral*2)-i, c1) + "+"  + Centro((centerSize + i), "-") + "+" + lineFeed;
    //     } else{
    //       Shape += Izquierda((latéral*2)-i, c1) + "/" + Centro (centerSize, c2) + "/" + Derecha (latéral-i, c1) + lineFeed;
    //     }  
          
    //   }
    //  if (outputType != "web") process.stdout.write("\n");
    // }

    // for (var i = rangee; i > 0; i--) {
    //   if( i == limiteAbajo ) {
    //     Shape += Centro(columns, c1) + lineFeed;
    //   } else{
    //     if (i > limiteAbajo){
    //       Shape += Izquierda((latéral*2)-i, c1) +  "+"  + Centro(centerSize + i, "-") + "+" + Derecha ((latéral*2), c1) + lineFeed;
    //     } else{
    //       Shape +=  Izquierda((latéral*2) -i, c1) + "/" + Centro (centerSize, c2) + "/" + Derecha (latéral-i, c1) + lineFeed;
    //     }  
          
    //   }
    // }
    
    GetLineFeed(outputType);

  return Shape;

};


function GetLineFeed(outputType){
  if (outputType != "web")
  return process.stdout.write("\n"); 
}

// function PonerLetras(Tamano, LetraDeseada) {
//     var MiFila = "";
//     for (var i = 0; i < Tamano; i++) {
//       MiFila += LetraDeseada;
//     }
//     return MiFila;
// }
function Izquierda(Tamano, CaracterDeseado){
  return PonerLetras(Tamano, CaracterDeseado);
}
function Centro(Tamano, CaracterDeseado){
    return PonerLetras(Tamano, CaracterDeseado);
}
function Derecha(Tamano, CaracterDeseado){
    return PonerLetras(Tamano, CaracterDeseado);
}

export { ShapeController};

/*

...............................^............................... <- 31 + 1 + 31  i = 0
............................./+++\............................. <- 29 + 3 + 29  i = 1 -Izquierda(rows-i+1, c1) ; -Centro = i +2  ; -Derecha(rows-i+1, c1)
............................/+++++\............................ <- 28 + 5 + 28  i = 2
.........................../+++++++\........................... <- 27 + 7 + 27  i = 3
........................../+++++++++\..........................
........................./+++++++++++\.........................
......................../+++++++++++++\........................
......................./+++++++++++++++\.......................
....................../+++++++++++++++++\......................
...................../+++++++++++++++++++\.....................
..................../+++++++++++++++++++++\....................
.................../+++++++++++++++++++++++\...................
................../+++++++++++++++++++++++++\..................
................./+++++++++++++++++++++++++++\.................
................/+++++++++++++++++++++++++++++\................
.............../+++++++++++++++++++++++++++++++\...............
............../+++++++++++++++++++++++++++++++++\..............
............./+++++++++++++++++++++++++++++++++++\.............
............/+++++++++++++++++++++++++++++++++++++\............
.........../+++++++++++++++++++++++++++++++++++++++\...........
........../+++++++++++++++++++++++++++++++++++++++++\..........
........./+++++++++++++++++++++++++++++++++++++++++++\.........
......../+++++++++++++++++++++++++++++++++++++++++++++\........
......./+++++++++++++++++++++++++++++++++++++++++++++++\.......
....../+++++++++++++++++++++++++++++++++++++++++++++++++\......
...../+++++++++++++++++++++++++++++++++++++++++++++++++++\.....
..../+++++++++++++++++++++++++++++++++++++++++++++++++++++\....
.../+++++++++++++++++++++++++++++++++++++++++++++++++++++++\...
../+++++++++++++++++++++++++++++++++++++++++++++++++++++++++\..
./+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\.
/+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\
\+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++/
.\+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++/.
..\+++++++++++++++++++++++++++++++++++++++++++++++++++++++++/..
...\+++++++++++++++++++++++++++++++++++++++++++++++++++++++/...
....\+++++++++++++++++++++++++++++++++++++++++++++++++++++/....
.....\+++++++++++++++++++++++++++++++++++++++++++++++++++/.....
......\+++++++++++++++++++++++++++++++++++++++++++++++++/......
.......\+++++++++++++++++++++++++++++++++++++++++++++++/.......
........\+++++++++++++++++++++++++++++++++++++++++++++/........
.........\+++++++++++++++++++++++++++++++++++++++++++/.........
..........\+++++++++++++++++++++++++++++++++++++++++/..........
...........\+++++++++++++++++++++++++++++++++++++++/...........
............\+++++++++++++++++++++++++++++++++++++/............
.............\+++++++++++++++++++++++++++++++++++/.............
..............\+++++++++++++++++++++++++++++++++/..............
...............\+++++++++++++++++++++++++++++++/...............
................\+++++++++++++++++++++++++++++/................
.................\+++++++++++++++++++++++++++/.................
..................\+++++++++++++++++++++++++/..................
...................\+++++++++++++++++++++++/...................
....................\+++++++++++++++++++++/....................
.....................\+++++++++++++++++++/.....................
......................\+++++++++++++++++/......................
.......................\+++++++++++++++/.......................
........................\+++++++++++++/........................
.........................\+++++++++++/.........................
..........................\+++++++++/..........................
...........................\+++++++/...........................
............................\+++++/............................
.............................\+++/.............................
...............................v...............................

*/