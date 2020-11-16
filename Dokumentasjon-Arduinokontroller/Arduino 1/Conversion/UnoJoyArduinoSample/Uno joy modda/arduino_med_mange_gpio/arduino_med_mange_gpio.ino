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
  
  pinMode(2, INPUT);    //C3 Opp
  pinMode(3, INPUT);    //C4 Opp
  pinMode(4, INPUT);    //C5 Opp
  pinMode(5, INPUT);    //C6 Opp
  pinMode(6, INPUT);    //C7 Opp
//pinMode(7, INPUT);    // n/c
  pinMode(8, INPUT);    //B1 Opp
  pinMode(9, INPUT);    //B2 Ned
  pinMode(10, INPUT);   //B3 Opp
  pinMode(11, INPUT);   //B4 Ned
//pinMode(12, INPUT);   //n/c
}

dataForController_t getControllerData(void){
  
  dataForController_t controllerData = getBlankDataForController();



    //Digitale Inputs
//  <------------------------------------------------------------------------------------------->
  controllerData.triangleOn = !digitalRead(2);     //C3 Opp (inverted)
  controllerData.circleOn = !digitalRead(3);       //C4 Opp (inverted)
  controllerData.squareOn = !digitalRead(4);       //C5 Opp (inverted)
  controllerData.crossOn = !digitalRead(5);        //C6 Opp (inverted)
  controllerData.l1On = !digitalRead(6);       //C7 Opp (inverted)
//controllerData.dpadDownOn = !digitalRead(7);     // n/c
  controllerData.r1On = digitalRead(8);     //B1 Opp
  controllerData.selectOn = digitalRead(9);     //B2 Ned
  controllerData.startOn = digitalRead(10);   //B3 Opp
  controllerData.homeOn = digitalRead(11);          //B4 Ned
//controllerData.r1On = digitalRead(12);          // n/c
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
