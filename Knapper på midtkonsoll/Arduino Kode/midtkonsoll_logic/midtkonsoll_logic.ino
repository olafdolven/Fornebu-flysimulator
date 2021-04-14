void setup() {
  pinMode(2, INPUT);  //Both
  pinMode(3, INPUT);  //COM1/COM2
  pinMode(4, OUTPUT); //Transmitt COM1/COM2
  pinMode(5, OUTPUT); //COM2
  pinMode(6, OUTPUT); //COM1
}

void loop() {
  if (digitalRead(3) == HIGH){
    //Transmitt COM1
    digitalWrite(4, HIGH);
  }
  else{
    //Transmitt COM2
    digitalWrite(4, LOW);
  }

  if(digitalRead(2) == HIGH){
    //Begge på
    digitalWrite(5, HIGH);
    digitalWrite(6, HIGH);
  }
  else if(digitalRead(3) == HIGH){
    //COM1 på begge av
    digitalWrite(5, LOW); //COM2 av
    digitalWrite(6, HIGH);//COM1 på
  }
  else if(digitalRead(3) == LOW){
    //COM2 på begge av
    digitalWrite(6,LOW);  //COM1 av
    digitalWrite(5, HIGH);//COM2 på
  }

  
}
