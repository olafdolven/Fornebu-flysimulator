void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.print("  A20 = ");
  Serial.print(analogRead(A0));
  
  Serial.print("  A21 = ");
  Serial.print(analogRead(A1));
  
  Serial.print("  A22 = ");
  Serial.print(analogRead(A2));
  
  Serial.print("  A23 = ");
  Serial.println(analogRead(A3));
}
