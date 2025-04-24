
Blockly.Arduino.Mbot_robot = function() {
  Blockly.Arduino.addInclude('arduino','#include <Arduino.h>');
  //Blockly.Arduino.addInclude('wire','#include <Wire.h>');
  //Blockly.Arduino.addInclude('serial','#include <SoftwareSerial.h>');
  var code = ''                                 //will be used in loop()
 return code;
};
Blockly.Arduino.Mbot_motor = function() {
  var motor =this.getFieldValue("MOTOR") ;
  var speed = Blockly.Arduino.valueToCode(
    this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.includes_['motor']=['#include "Mmotor.h"'];
  Blockly.Arduino.addDeclaration('motor','Mmotor kMmotor(true);');
  Blockly.Arduino.addSetup('motor','kMmotor.cauhinh();',false);
  var code = 'kMmotor.tien('+motor+', '+speed+');\n';                                 
  return code;
};
Blockly.Arduino.Mbot_run_forward = function() {
  var motor =this.getFieldValue("MOTOR") ;
   var speed = Blockly.Arduino.valueToCode(
     this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
   Blockly.Arduino.includes_['motor']=['#include "Mmotor.h"'];
   Blockly.Arduino.addDeclaration('motor','Mmotor kMmotor(true);');
   Blockly.Arduino.addSetup('motor','kMmotor.cauhinh();',false);
   var code = 'kMmotor.run('+motor+', '+speed+');\n';                                                       
   return code;
 };
 Blockly.Arduino.Mbot_servo = function() {
  var port =this.getFieldValue("Port") ;
  var slot =this.getFieldValue("Slot") ;
  var angle = this.getFieldValue('angle');
   Blockly.Arduino.includes_['Servo']=['#include "Servo.h"'];
   Blockly.Arduino.addDeclaration('Servo','Servo kservo;');
   Blockly.Arduino.addSetup('Servo','kservo.attachport('+port+','+slot+');\n',false);
   var code = 'kservo.write('+angle+');\n';                                                       
   return code;
 };
 Blockly.Arduino.Mbot_ledrgb = function() {
  var mode =this.getFieldValue("slectMode") ;
      var red =Blockly.Arduino.valueToCode(
    this, 'red', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var blue =Blockly.Arduino.valueToCode(
    this, 'blue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var green =Blockly.Arduino.valueToCode(
    this, 'green', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var codeFunction=`
  void theaterChase(int id ,int red ,int green,int blue ) {
    if(id<7)
    {
      pixels.setPixelColor(id,pixels.Color(red,green,blue));\n        pixels.show();\n        delay(5);\n
    }
    if(id>=7)
    {
        for(int i=0;i<7;i++)
        {
          pixels.setPixelColor(i,pixels.Color(red,green,blue));\n        pixels.show();\n        delay(5);\n
        }
    }
}`;
  Blockly.Arduino.addFunction('ledrgb',codeFunction);
  Blockly.Arduino.addInclude('ledrgb','#include "Adafruit_NeoPixel.h"');
  Blockly.Arduino.addDeclaration('ledrgb','#define PIN 13');
  Blockly.Arduino.addDeclaration('ledrgb1','Adafruit_NeoPixel pixels = Adafruit_NeoPixel(7, PIN, NEO_GRB + NEO_KHZ800);');
  Blockly.Arduino.addSetup('ledrgb_begin','pixels.begin();',false);
  var code = 'theaterChase('+mode+','+red+','+green+','+blue+');\n';                                 
  return code;
};
Blockly.Arduino.Mbot_tone = function() {
  var tone =this.getFieldValue("Tone") ;
  var beat =this.getFieldValue("time") ;
  // Blockly.Arduino.includes_['Tone']=['"'];
   Blockly.Arduino.addDeclaration('Tone','#define pin 8 ');
  //Blockly.Arduino.addSetup('motor','tone.cauhinh;',false);
  var code = 'tone(pin,'+tone+', '+beat+');\n';                                 
  return code;
};