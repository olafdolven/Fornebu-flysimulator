void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.print("  D2.0 pin2 = ");
  Serial.print(digitalRead(2));

  Serial.print("  D2.0 pin3 = ");
  Serial.print(digitalRead(2));

  Serial.print("  D2.2 pin4 = ");
  Serial.print(digitalRead(2));

  Serial.print("  D2.0 pin5 = ");
  Serial.print(digitalRead(2));

  Serial.print("  D2.0 pin6 = ");
  Serial.print(digitalRead(2));

  Serial.print("  D2.0 pin7 = ");
  Serial.print(digitalRead(2));

  Serial.print("  D2.0 pin8 = ");
  Serial.print(digitalRead(2));

  Serial.print("  D2.1 pin8 = ");
  Serial.print(digitalRead(2));

  Serial.print("  D2.1 pin7 = ");
  Serial.print(digitalRead(2));

  Serial.print("  D2.1 pin6 = ");
  Serial.print(digitalRead(2));

  Serial.print("  D2.1 pin5 = ");
  Serial.print(digitalRead(2));

  Serial.print("  D2.1 pin4 = ");
  Serial.print(digitalRead(2));

  Serial.print("  D2.1 pin3 = ");
  Serial.print(digitalRead(2));

  Serial.print("  |  ");

  Serial.print("  A20 = ");
  Serial.print(analogRead(A0));
  
  Serial.print("  A21 = ");
  Serial.print(analogRead(A1));
  
  Serial.print("  A22 = ");
  Serial.print(analogRead(A2));
  
  Serial.print("  A23 = ");
  Serial.println(analogRead(A3));

  delay(10);
}
