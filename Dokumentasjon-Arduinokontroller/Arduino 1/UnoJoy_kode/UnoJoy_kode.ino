// Joystick kode til joystick PCB
// Skrevet av Olaf Dolven
// mail: olaf.h.dolven@gmail.com
// bruker UnoJoy library fra github
// https://github.com/AlanChatham/UnoJoy
// skrevet av AllanChatham



#include "UnoJoy.h"

//       Kalibrering
//  <------------------------------------------------------------------------------------------->
double minA10 = 0 - 10;         //A0    -   UnoJoy
double maxA10 = 1023 + 10;      //A0    -   UnoJoy

double minA11 = 0 - 10;         //A1    -   UnoJoy    
double maxA11 = 1023 + 10;      //A1    -   UnoJoy

double minA12 = 0 - 10;         //A2    -   UnoJoy
double maxA12 = 1023 + 10;      //A2    -   UnoJoy

double minA13 = 0 - 10;         //A3    -   UnoJoy
double maxA13 = 1023 + 10;      //A3    -   UnoJoy
//  <------------------------------------------------------------------------------------------->





//        Variabler 
//  <------------------------------------------------------------------------------------------->
double inA10;
double inA11;
double inA12;
double inA13;

int outA10;
int outA11;
int outA12;
int outA13;
//  <------------------------------------------------------------------------------------------->






//        Setup
//  <------------------------------------------------------------------------------------------->
void setup() {
  setupPins();
  setupUnoJoy();
}
//  <------------------------------------------------------------------------------------------->






//        Void Loop
//  <------------------------------------------------------------------------------------------->
void loop() {
  dataForController_t controllerData = getControllerData();
  setControllerData(controllerData);
}
//  <------------------------------------------------------------------------------------------->






//        Pin Setup
//  <------------------------------------------------------------------------------------------->
void setupPins(void){
  pinMode(2, INPUT);        //D1.0  Pin 2
  pinMode(3, INPUT);        //D1.0  Pin 3
  pinMode(4, INPUT);        //D1.0  Pin 4
  pinMode(5, INPUT);        //D1.0  Pin 5
  pinMode(6, INPUT);        //D1.0  Pin 6
  pinMode(7, INPUT);        //D1.0  Pin 7
  pinMode(8, INPUT);        //D1.0  Pin 8
  pinMode(9, INPUT);        //D1.1  Pin 8
  pinMode(10, INPUT);       //D1.1  Pin 7
  pinMode(11, INPUT);       //D1.1  Pin 6
  pinMode(12, INPUT);       //D1.1  Pin 5
  pinMode(A5, INPUT);       //D1.1  Pin 4
  pinMode(A4, INPUT);       //D1.1  Pin 3
}
//  <------------------------------------------------------------------------------------------->







//        Controller Data
//  <------------------------------------------------------------------------------------------->
dataForController_t getControllerData(void){
  dataForController_t controllerData = getBlankDataForController();

  //Digitale outputs
  controllerData.squareOn = digitalRead(2);           //Windows 1
  controllerData.crossOn = digitalRead(3);            //Windows 2
  controllerData.circleOn = digitalRead(4);           //Windows 3
  controllerData.triangleOn = digitalRead(5);         //Windows 4
  controllerData.l1On = digitalRead(6);               //Windows 5
  controllerData.r1On = digitalRead(7);                 //Windows 6
  controllerData.l2On = digitalRead(8);                 //Windows 7
  controllerData.r2On = digitalRead(9);                 //Windows 8
  controllerData.selectOn = digitalRead(10);            //Windows 9
  controllerData.startOn = digitalRead(11);             //Windows 10
  controllerData.l3On = digitalRead(12);                //Windows 11
  controllerData.r3On = digitalRead(A5);                //Windows 12
  controllerData.homeOn = digitalRead(A4);              //Windows 13
  //Digital outputs ferdig

  //enepunkts klibrering
  inA10 = analogRead(A0);
  inA11 = analogRead(A1);
  inA12 = analogRead(A2);
  inA13 = analogRead(A3);

  outA10 = (int)(((inA10 - minA10)/(maxA10 - minA10))*255);
  outA11 = (int)(((inA11 - minA11)/(maxA11 - minA11))*255);
  outA12 = (int)(((inA12 - minA12)/(maxA12 - minA12))*255);
  outA13 = (int)(((inA13 - minA13)/(maxA13 - minA13))*255);
  //endepunkt kalibrering ferdig
  
  //Analoge outputs
  controllerData.leftStickX = outA10;        //Windows X Axis
  controllerData.leftStickY = outA11;        //Windows Y Axis
  controllerData.rightStickX = outA12;       //Windows Z Axis
  controllerData.rightStickY = outA13;       //Windows Z Rotation
  //Analoge aoutputs ferdig


  //Send tilbake Dataen 
  return controllerData;
}
