void setup() {
  pinMode(2, INPUT);
  pinMode(3, INPUT);
  pinMode(4, INPUT);
  pinMode(5, INPUT);
  pinMode(6, INPUT);
  pinMode(7, INPUT);
  pinMode(8, INPUT);
  pinMode(9, INPUT);
  pinMode(10, INPUT);
  pinMode(11, INPUT);
  pinMode(12, INPUT);

  Serial.begin(9600);
}

void loop() {
  Serial.print("2");
  Serial.print("     ");
  Serial.print("4");
  Serial.print("     ");
  Serial.print("5");
  Serial.print("     ");
  Serial.print("6");
  Serial.print("     ");
  Serial.print("7");
  Serial.print("     ");
  Serial.print("8");
  Serial.print("     ");
  Serial.print("9");
  Serial.print("     ");
  Serial.print("10");
  Serial.print("    ");
  Serial.print("11");
  Serial.print("    ");
  Serial.println("12");

  Serial.print(digitalRead(2));
  Serial.print("     ");
  Serial.print(digitalRead(3));
  Serial.print("     ");
  Serial.print(digitalRead(4));
  Serial.print("     ");
  Serial.print(digitalRead(5));
  Serial.print("     ");
  Serial.print(digitalRead(6));
  Serial.print("     ");
  Serial.print(digitalRead(7));
  Serial.print("     ");
  Serial.print(digitalRead(8));
  Serial.print("     ");
  Serial.print(digitalRead(9));
  Serial.print("     ");
  Serial.print(digitalRead(10));
  Serial.print("     ");
  Serial.print(digitalRead(11));
  Serial.print("     ");
  Serial.println(digitalRead(12));

  Serial.println("");

  delay(500);

}
