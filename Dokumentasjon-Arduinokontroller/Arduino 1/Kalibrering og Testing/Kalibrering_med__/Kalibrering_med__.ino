void setup() {
  Serial.begin(9600);
}


void loop() {
  Serial.print("Vanlig:");
  Serial.print(analogRead(A3));
  Serial.print(" <50>:");
  Serial.print(analogRead(A3)+(analogRead(A2)/400));
  Serial.print(" <25>:");
  Serial.println(analogRead(A3)+(analogRead(A2)/25));
}
