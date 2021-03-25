void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.print("  A10 = ");
  Serial.print(analogRead(A0));
  
  Serial.print("  A11 = ");
  Serial.print(analogRead(A1));
  
  Serial.print("  A12 = ");
  Serial.print(analogRead(A2));
  
  Serial.print("  A13 = ");
  Serial.println(analogRead(A3));

  delay(100);
}
