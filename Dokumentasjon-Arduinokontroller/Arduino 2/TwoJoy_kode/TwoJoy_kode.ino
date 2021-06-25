// Joystick kode til joystick PCB
// Skrevet av Olaf Dolven
// mail: olaf.h.dolven@gmail.com
// bruker UnoJoy library fra github
// https://github.com/AlanChatham/UnoJoy
// skrevet av AllanChatham



#include "UnoJoy.h"

//       Kalibrering
//  <------------------------------------------------------------------------------------------->
double minA20 = 180 - 10;         //A0    -   UnoJoy
double maxA20 = 805 + 10;      //A0    -   UnoJoy

double minA21 = 290 -10;         //A1    -   UnoJoy    
double maxA21 = 1020 + 10;      //A1    -   UnoJoy

double minA22 = 0 - 10;         //A2    -   UnoJoy
double maxA22 = 1023 + 10;      //A2    -   UnoJoy

double minA23 = 320 - 10;         //A3    -   UnoJoy
double maxA23 = 660 + 10;      //A3    -   UnoJoy
//  <------------------------------------------------------------------------------------------->





//        Variabler 
//  <------------------------------------------------------------------------------------------->
double inA20;
double inA21;
double inA22;
double inA23;

int outA20;
int outA21;
int outA22;
int outA23;
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
  pinMode(2, INPUT);        //D2.0  Pin 2
  pinMode(3, INPUT);        //D2.0  Pin 3
  pinMode(4, INPUT);        //D2.0  Pin 4
  pinMode(5, INPUT);        //D2.0  Pin 5
  pinMode(6, INPUT);        //D2.0  Pin 6
  pinMode(7, INPUT);        //D2.0  Pin 7
  pinMode(8, INPUT);        //D2.0  Pin 8
  pinMode(9, INPUT);        //D2.1  Pin 8
  pinMode(10, INPUT);       //D2.1  Pin 7
  pinMode(11, INPUT);       //D2.1  Pin 6
  pinMode(12, INPUT);       //D2.1  Pin 5
  pinMode(A5, INPUT);       //D2.1  Pin 4
  pinMode(A4, INPUT);       //D2.1  Pin 3
}
//  <------------------------------------------------------------------------------------------->







//        Controller Data
//  <------------------------------------------------------------------------------------------->
dataForController_t getControllerData(void){
  dataForController_t controllerData = getBlankDataForController();

  //Digitale outputs
  if (analogRead(A3) >= 500) {
    controllerData.squareOn = HIGH;
  }
  else{
    controllerData.squareOn = LOW;
  }
  //controllerData.squareOn = digitalRead(2);             //Windows 1
  controllerData.crossOn = digitalRead(3);              //Windows 2
  controllerData.circleOn = digitalRead(4);             //Windows 3
  controllerData.triangleOn = digitalRead(5);           //Windows 4
  controllerData.l1On = digitalRead(6);                 //Windows 5
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
  inA20 = analogRead(A0);
  inA21 = analogRead(A1);
  inA22 = analogRead(A2);
  inA23 = analogRead(A3);

  outA20 = (int)(((inA20 - minA20)/(maxA20 - minA20))*255);
  outA21 = (int)(((inA21 - minA21)/(maxA21 - minA21))*255);
  outA22 = (int)(((inA22 - minA22)/(maxA22 - minA22))*255);
  outA23 = (int)(((inA23 - minA23)/(maxA23 - minA23))*255);
  //endepunkt kalibrering ferdig
  
  //Analoge outputs
  controllerData.leftStickX = outA20;        //Windows X Axis
  controllerData.leftStickY = outA21;        //Windows Y Axis
  controllerData.rightStickX = outA22;       //Windows Z Axis
  controllerData.rightStickY = outA23;       //Windows Z Rotation
  //Analoge aoutputs ferdig


  //Send tilbake Dataen 
  return controllerData;
}
