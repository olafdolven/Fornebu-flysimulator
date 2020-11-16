#include "UnoJoy.h"

void setup(){
  setupPins();
  setupUnoJoy();
}

void loop(){
  // Always be getting fresh data
  dataForController_t controllerData = getControllerData();
  setControllerData(controllerData);
}

void setupPins(void){
  
//pinMode(2, INPUT);    // n/c
//pinMode(3, INPUT);    // n/c
//pinMode(4, INPUT);    // n/c
//pinMode(5, INPUT);    // n/c
//pinMode(6, INPUT);    // n/c
//pinMode(7, INPUT);    // n/c
  pinMode(8, INPUT);    //A1 Opp
  pinMode(9, INPUT);    //A2 Opp
  pinMode(10, INPUT);   //A3 Opp
  pinMode(11, INPUT);   //C1 Opp
  pinMode(12, INPUT);   //C2 Opp
}

dataForController_t getControllerData(void){
  
  dataForController_t controllerData = getBlankDataForController();



    //Digitale Inputs
//  <------------------------------------------------------------------------------------------->
//controllerData.triangleOn = !digitalRead(2);     // n/c
//controllerData.circleOn = !digitalRead(3);       // n/c
//controllerData.squareOn = !digitalRead(4);       // n/c
//controllerData.crossOn = !digitalRead(5);        // n/c
//controllerData.dpadUpOn = !digitalRead(6);       // n/c
//controllerData.dpadDownOn = !digitalRead(7);     // n/c
  controllerData.triangleOn = digitalRead(8);      //A1 Opp
  controllerData.circleOn = digitalRead(9);      //A2 Opp
  controllerData.squareOn = digitalRead(10);    //A3 Opp
  controllerData.crossOn = !digitalRead(11);          //C1 Opp
  controllerData.r1On = !digitalRead(12);          //C2 Opp
//  <------------------------------------------------------------------------------------------->



  // Analoge Inputs
//  <------------------------------------------------------------------------------------------->
  controllerData.leftStickX = analogRead(A0) >> 2;
  controllerData.leftStickY = analogRead(A1) >> 2;
  controllerData.rightStickX = analogRead(A2) >> 2;
//controllerData.rightStickY = analogRead(A3) >> 2; // n/c
//  <------------------------------------------------------------------------------------------->


  // And return the data!
  return controllerData;
}
