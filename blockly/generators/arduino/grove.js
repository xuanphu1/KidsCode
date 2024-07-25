Blockly.Arduino.robocarv2 = function() {
  Blockly.Arduino.addInclude('arduino','#include <Arduino.h>');
  Blockly.Arduino.addInclude('wire','#include <Wire.h>');
  Blockly.Arduino.addInclude('serial','#include <SoftwareSerial.h>');
  var code = ''                                 //will be used in loop()
 return code;
};


Blockly.Arduino.kcbot_bluetooth = function() {
  Blockly.Arduino.addInclude['bluetooth']=['#include "bluetooth.h"'];
  Blockly.Arduino.addDeclaration('bluetooth','bluetooth _bluetooth(true);');
  Blockly.Arduino.addSetup('bluetooth_cauhinh', '_bluetooth.cauhinh();',false);
  Blockly.Arduino.addSetup('bluetooth_nhan', '_bluetooth.nhan();',false);
  var code = ''                                 //will be used in loop()
 return code;
};

Blockly.Arduino.kcbot_motor = function() {
  var motor =this.getFieldValue("MOTOR") ;
  var speed = Blockly.Arduino.valueToCode(
    this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.includes_['motor']=['#include "kmotor.h"'];
  Blockly.Arduino.addDeclaration('motor','kmotor _kmotor(true);');
  Blockly.Arduino.addSetup('motor','_kmotor.cauhinh();',false);
  var code = '_kmotor.tien('+motor+', '+speed+');\n';                                 
  return code;
};
  Blockly.Arduino.kcbot_run_forward = function() {
 var motor =this.getFieldValue("MOTOR") ;
  var speed = Blockly.Arduino.valueToCode(
    this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.includes_['motor']=['#include "kmotor.h"'];
  Blockly.Arduino.addDeclaration('motor','kmotor _kmotor(true);');
  Blockly.Arduino.addSetup('motor','_kmotor.cauhinh();',false);
  var code = '_kmotor.run('+motor+', '+speed+');\n';                                                       
  return code;
};
Blockly.Arduino.kcbot_run_forward_at_sec = function() {
 var motor =this.getFieldValue("MOTOR") ;
  var speed = Blockly.Arduino.valueToCode(
    this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var secs = Blockly.Arduino.valueToCode(
    this, 'sec', Blockly.Arduino.ORDER_ATOMIC) || '0';;
  Blockly.Arduino.includes_['motor']=['#include "kmotor.h"'];
  Blockly.Arduino.addDeclaration('motor','kmotor _kmotor(true);');
  Blockly.Arduino.addSetup('motor','_kmotor.cauhinh();',false);
  var code = '_kmotor.run('+motor+', '+speed+');\ndelay(1000*'+secs+');\n_kmotor.stop();\n';                                                       
  return code;
};
Blockly.Arduino.kcbot_stop_moving = function() {
  Blockly.Arduino.includes_['motor']=['#include "kmotor.h"'];
  Blockly.Arduino.addDeclaration('motor','kmotor _kmotor(true);');
  Blockly.Arduino.addSetup('motor','_kmotor.cauhinh();',false);
  var code = '_kmotor.stop();\n';                                                       
  return code;
};
Blockly.Arduino.kcbot_ledrgb = function() {
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
  Blockly.Arduino.addDeclaration('ledrgb','#define PIN A4');
  Blockly.Arduino.addDeclaration('ledrgb1','Adafruit_NeoPixel pixels = Adafruit_NeoPixel(7, PIN, NEO_GRB + NEO_KHZ800);');
  Blockly.Arduino.addSetup('ledrgb_begin','pixels.begin();',false);
  var code = 'theaterChase('+mode+','+red+','+green+','+blue+');\n';                                 
  return code;
};
Blockly.Arduino.kcbot_servo = function() {
  var servo =this.getFieldValue("servo") ;
  var angle = this.getFieldValue('angle');
  Blockly.Arduino.addInclude('servo','#include <Servo.h>');
  Blockly.Arduino.addDeclaration('servo'+servo, 'Servo servo_'+servo+';'); 
  Blockly.Arduino.addSetup('servo_attach'+servo,'servo_'+servo+'.attach(A0+'+servo+');',false);
  var code = 'servo_'+servo+'.write('+angle+');\n';                                 
  return code;
};

Blockly.Arduino.kcbot_tone = function() {
  var note =this.getFieldValue("note") ;
  var tone = this.getFieldValue('tone');
  Blockly.Arduino.addSetup('tone_mode'+note,'pinMode('+note+',OUTPUT);',false);
  var code = 'tone(3,'+note+','+tone+');\ndelay(2);\n';                                 
  return code;
};

Blockly.Arduino.kcbot_lcd = function() {
  var text =Blockly.Arduino.valueToCode(
      this, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
  var x = Blockly.Arduino.valueToCode(
      this, 'x', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var y = Blockly.Arduino.valueToCode(
      this, 'y', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var data =this.getFieldValue("data") ;
  Blockly.Arduino.addInclude('lcd','#include <LiquidCrystal_I2C.h>');
  Blockly.Arduino.addDeclaration('lcd','LiquidCrystal_I2C lcd('+data+',16,2);');
  Blockly.Arduino.addSetup('lcd_init','lcd.init();',false);
  Blockly.Arduino.addSetup('lcd_backlinght','lcd.backlight();',false);
  var code = 'lcd.setCursor('+x+','+y+');\nlcd.print('+text+');\n';                                 
  return code;
};
Blockly.Arduino.kcbot_lcd_clear = function() {
  Blockly.Arduino.addInclude('lcd','#include "LiquidCrystal_I2C.h"');
  Blockly.Arduino.addDeclaration('lcd','LiquidCrystal_I2C lcd(0x20,16,2);');
  Blockly.Arduino.addSetup('lcd_init','lcd.init();',true);
  Blockly.Arduino.addSetup('lcd_backlinght','lcd.backlight();',true);
  var code = 'lcd.clear();\n';                                 
  return code;
};


Blockly.Arduino.kcbot_rtc_set_time = function() {
  var hour =this.getFieldValue("hour") ;
  var min = this.getFieldValue('min');
  var sec = this.getFieldValue('sec');
  var week = this.getFieldValue('week');
  var day = this.getFieldValue('day');
  var month = this.getFieldValue('month');
  var year = this.getFieldValue('year');
  Blockly.Arduino.addInclude('rtc','#include "SparkFunDS1307RTC.h"');
  Blockly.Arduino.addSetup('rtc_begin','rtc.begin();',false);
  //Blockly.Arduino.setups_['rct_set'+hour+min+sec+week+day+month+year]=['rtc.setTime('+hour+', '+min+', '+sec+', '+week+', '+day+', '+month+', '+year+');'];
  var code ='rtc.setTime('+hour+', '+min+', '+sec+', '+week+', '+day+', '+month+', '+year+');\n';                                 
  return code;
};

Blockly.Arduino.kcbot_rtc_update = function() {
  Blockly.Arduino.addInclude('rtc','#include "SparkFunDS1307RTC.h"');
  Blockly.Arduino.addSetup('rtc_begin','rtc.begin();',false);
  var code = 'rtc.update();\n';                                 
  return code;
};
Blockly.Arduino.kcbot_Blynk_tran = function() {
  var com =this.getFieldValue("com") ;
 var x = Blockly.Arduino.valueToCode(
      this, 'y', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.addInclude('Blynk','BLYNK_CONNECTED()\n{\nBlynk.syncAll();\n}\n');
  var code = 'Blynk.virtualWrite('+com+', '+x+');\n';                                 
  return code;
};
Blockly.Arduino.kcbot_rtc_read_time = function() {
  Blockly.Arduino.addInclude('rtc','#include "SparkFunDS1307RTC.h"');
  Blockly.Arduino.addSetup('rtc_begin','rtc.begin();',false);
  var code = 'String(rtc.hour()) + ":" + String(rtc.minute()) + ":" + String(rtc.second())';                                 
  return [code, Blockly.Arduino.ORDER_ADDITIVE];
};

Blockly.Arduino.kcbot_rtc_read_date = function() {
  Blockly.Arduino.addInclude('rtc','#include "SparkFunDS1307RTC.h"');
  Blockly.Arduino.addSetup('rtc_begin','rtc.begin();',false);
  var code = 'String(rtc.date()) + "/" + String(rtc.month()) + "/" + String(rtc.year())';                                 
  return [code, Blockly.Arduino.ORDER_ADDITIVE];
};
Blockly.Arduino.kcbot_rtc_read = function() {
  Blockly.Arduino.addInclude('rtc','#include "SparkFunDS1307RTC.h"');
  Blockly.Arduino.addSetup('rtc_begin','rtc.begin();',false);
  Blockly.Arduino.addFunction('rtc_read_value',`
  int getDateTimeRTC(int data)
  {
      int datetime;
      switch (data) {
          case 0:
          datetime = rtc.hour(); break;
          case 1:
          datetime = rtc.minute(); break;
          case 2:
          datetime = rtc.second(); break;
          case 3:
          datetime = rtc.day(); break;
          case 4:
          datetime = rtc.date(); break;
          case 5:
          datetime = rtc.month(); break;
          case 6:
          datetime = rtc.year(); break;
      }
      return datetime;
   }`)
   var value=this.getFieldValue("value");
  var code = 'getDateTimeRTC('+value+')';                                 
  return [code, Blockly.Arduino.ORDER_ADDITIVE];
};
Blockly.Arduino.kcbot_web_read = function() {
  var value=this.getFieldValue("value");
  var code = '('+value+')';                                 
  return [code, Blockly.Arduino.ORDER_ADDITIVE];
};
Blockly.Arduino.kcbot_web_kidscode = function() {
  var code = 'kidscode';                                 
  return [code, Blockly.Arduino.ORDER_ADDITIVE];
};

Blockly.Arduino.kcbot_read_Doam = function() {
  var pin =this.getFieldValue("MOTOR") ;
  Blockly.Arduino.addSetup('readlm35','pinMode('+pin+',INPUT);',true);
  var code = '((1023-analogRead('+pin+')/1023)*100 )';
  return [code, Blockly.Arduino.ORDER_ADDITIVE];
};

Blockly.Arduino.kcbot_readlm35 = function() {
  var pin =this.getFieldValue("MOTOR") ;
  Blockly.Arduino.addSetup('read_Doam','pinMode('+pin+',INPUT);',true);
  var code = 'analogRead('+pin+') *0.488';
  return [code, Blockly.Arduino.ORDER_ADDITIVE];
};

Blockly.Arduino.kcbot_dht11_humi=function(){
var read =this.getFieldValue("MOTOR") ;
var pin =this.getFieldValue("PIN") ;
      Blockly.Arduino.addInclude('dht11','#include "DHT.h"');
      Blockly.Arduino.addDeclaration('dht11_pin','#define DHTPIN  '+pin+'',false);
      Blockly.Arduino.addDeclaration('dht11_type','#define DHTTYPE  DHT11',false);
      Blockly.Arduino.addDeclaration('dht11','DHT dht(DHTPIN, DHTTYPE);');
      Blockly.Arduino.addSetup('dht11','dht.begin();',false);
      Blockly.Arduino.addFunction('kcbot_dht11_temp',`
      double getdht11(int data)
      {
          int readdht11;
          switch (data) {
              case 1:
              readdht11 = dht.readHumidity(); break;
              case 2:
              readdht11 = dht.readTemperature(); break;
          }
          return readdht11;
       }`)
      var code = 'getdht11('+read+')'
      return [code, Blockly.Arduino.ORDER_ADDITIVE];
      
};
Blockly.Arduino.kcbot_read_irf=function(){
    var state1 =this.getFieldValue("STATE1") ;;
    var state2 =this.getFieldValue("STATE2") ;(
    this, 'echo', Blockly.Arduino.ORDER_ATOMIC) || '0';
      var code = '('+state1+'*10+'+state2+')';
      return [code, Blockly.Arduino.ORDER_ADDITIVE];
      
};
Blockly.Arduino.kcbot_ultrasonic=function(){
    var trig1 = Blockly.Arduino.valueToCode(
    this, 'trig', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var echo1 = Blockly.Arduino.valueToCode(
    this, 'echo', Blockly.Arduino.ORDER_ATOMIC) || '0';
      Blockly.Arduino.addFunction('kcbot_ultrasonic',`
      float getDistance(int trig,int echo){
        float dem=0;
          pinMode(trig,OUTPUT);
          digitalWrite(trig,LOW);
          delayMicroseconds(2);
          digitalWrite(trig,HIGH);
          delayMicroseconds(10);
          digitalWrite(trig,LOW);
          pinMode(echo, INPUT);
          dem = pulseIn(echo,HIGH,30000)/58.0;
          if(dem==0) dem=30;
          return dem;
      }`);
      var code = 'getDistance('+trig1+','+echo1+')';
      return [code, Blockly.Arduino.ORDER_ADDITIVE];
      
};
Blockly.Arduino.kcbot_read_data_ir=function(){
    var pin = Blockly.Arduino.valueToCode(
    this, 'trig', Blockly.Arduino.ORDER_ATOMIC) || '0';
      Blockly.Arduino.addInclude('ir','#include <IRremote.h>');
      Blockly.Arduino.addDeclaration('ir','long dem=0;\nint RECV_PIN = '+pin+';\nIRrecv irrecv(RECV_PIN);\ndecode_results results;',false);
      Blockly.Arduino.addSetup('ir','irrecv.enableIRIn();',false);
      Blockly.Arduino.addFunction('kcbot_read_data_ir',`
      int data_ir(){
          if (irrecv.decode(&results)) {
          dem=results.value;
          irrecv.resume(); // Receive the next value
          }
          else dem=0;
          return dem;
      }`);
      var code = 'data_ir()';
      return [code, Blockly.Arduino.ORDER_ADDITIVE];
      
}
Blockly.Arduino.kcbot_Irrecive=function(){
      Blockly.Arduino.addInclude('irf','#include <IRremote.h>');
      Blockly.Arduino.addDeclaration('irf','int dem=0;\n#define k1 1\n#define k2 2\n#define k3 3\n#define k4 4\n#define k5 5\n#define k6 6\n#define k7 7\n#define k8 8\n#define len 1\n#define xuong 2\n#define phai 3\n#define trai 4\n#define f1 5\n#define f2 6\n#define f4 7\n#define f6 8\nint RECV_PIN = 11;\nIRrecv irrecv(RECV_PIN);\ndecode_results results;',false);
      Blockly.Arduino.addSetup('irf','irrecv.enableIRIn();',false);
      Blockly.Arduino.addFunction('kcbot_Irrecive',`
      int nhan()
      {
        int th=0;
        //K1------------------------------------------------
          if(results.value==370326124)
          { 
           th=k1*10+len;
          }
          if(results.value==3893169039)
          { 
           th=k1*10+xuong;
          }
          if(results.value==722094923)
          { 
           th=k1*10+phai;
          }
          if(results.value==501778864)
          { 
           th=k1*10+trai;
          }
      //    if(results.value==722094923)
      //    { 
      //     th=k1*10+f1;
      //    }
          if(results.value==87667472)
          { 
           th=k1*10+f2;
          } 
          if(results.value==1457459944)
          { 
           th=k1*10+f4;
          }
          if(results.value==1189162337)
          { 
           th=k1*10+f6;
          }
        //k2-----------------------------------------
          if(results.value==2234768866)
          { 
           th=k2*10+len;
          }
          if(results.value==1954985285)
          { 
           th=k2*10+xuong;
          }
          if(results.value==835149340)
          { 
           th=k2*10+phai;
          }
          if(results.value==781883471)
          { 
           th=k2*10+trai;
          }
      //    if(results.value==722094923)
      //    { 
      //     th=k1*10+f1;
      //    }
          if(results.value==2181502997)
          { 
           th=k2*10+f2;
          }
          if(results.value==3641320698)
          { 
           th=k2*10+f4;
          }
          if(results.value==855791861)
          { 
           th=k2*10+f6;
          }
        //k3---------------------------------
          if(results.value==4165481121)
          { 
           th=k3*10+len;
          }
          if(results.value==30903566)
          { 
           th=k3*10+xuong;
          }
          if(results.value==3146138512)
          { 
           th=k3*10+phai;
          }
          if(results.value==2759231059)
          { 
           th=k3*10+trai;
          }
      //    if(results.value==722094923)
      //    { 
      //     th=k1*10+f1;
      //    }
          if(results.value==257421278)
          { 
           th=k3*10+f2;
          }
          if(results.value==1277065657)
          { 
           th=k3*10+f4;
          }
          if(results.value==3226677438)
          { 
           th=k3+f6;
          }
        //k4-------------------------------------
          if(results.value==4215813976)
          { 
           th=k4*10+len;
          }
          if(results.value==47681187)
          { 
           th=k4*10+xuong;
          }
          if(results.value==3095805657)
          { 
           th=k4*10+phai;
          }
          if(results.value==2742453438)
          { 
           th=k4*10+trai;
          }
      //    if(results.value==722094923)
      //    { 
      //     th=k1*10+f1;
      //    }
          if(results.value==274198899)
          { 
           th=k4*10+f2;
          }
          if(results.value==1327398512)
          { 
           th=k4*10+f4;
          }
          if(results.value==3243455059)
          { 
           th=k4+f6;
          }
         //k5--------------------------------------------------
          if(results.value==4215813979)
          { 
           th=k5*10+len;
          }
          if(results.value==47681184)
          { 
           th=k5*10+xuong;
          }
          if(results.value==3095805658)
          { 
           th=k5*10+phai;
          }
          if(results.value==2742453437)
          { 
           th=k5*10+trai;
          }
      //    if(results.value==722094923)
      //    { 
      //     th=k1*10+f1;
      //    }
          if(results.value==274198896)
          { 
           th=k5*10+f2;
          }
          if(results.value==1327398515)
          { 
           th=k5*10+f4;
          }
          if(results.value==3243455056)
          { 
           th=k5+f6;
          }  
          //k6----------------------------------------
          if(results.value==3544562122)
          { 
           th=k6*10+len;
          }
          if(results.value==718933041)
          { 
           th=k6*10+xuong;
          }
          if(results.value==1216271043)
          { 
           th=k6*10+phai;
          }
          if(results.value==327020756)
          { 
           th=k6*10+trai;
          }
      //    if(results.value==722094923)
      //    { 
      //     th=k1*10+f1;
      //    }
          if(results.value==945450753)
          { 
           th=k6*10+f2;
          }
          if(results.value==656146658)
          { 
           th=k6*10+f4;
          }
          if(results.value==3914706913)
          { 
           th=k6+f6;
          }
         //k7------------------------------------------
          if(results.value==2483161182)
          { 
           th=k7*10+len;
          }
          if(results.value==1780333981)
          { 
           th=k7*10+xuong;
          }
          if(results.value==1618831895)
          { 
           th=k7*10+phai;
          }
          if(results.value==2614613922)
          { 
           th=k7*10+trai;
          }
      //    if(results.value==722094923)
      //    { 
      //     th=k1*10+f1;
      //    }
          if(results.value==402038415)
          { 
           th=k7*10+f2;
          }
          if(results.value==1199558996)
          { 
           th=k7*10+f4;
          }
          if(results.value==3371294575)
          { 
           th=k7+f6;
          }    
        //k8----------------------------------------------------------------------------
          if(results.value==397148545)
          { 
           th=k8*10+len;
          }
          if(results.value==3059046297)
          { 
           th=k8*10+xuong;
          }
          if(results.value==4182939477)
          { 
           th=k8*10+phai;
          }
        //  if(results.value==2742453438)
         // { 
         //  th=k8*10+trai;
        //  }
      //    if(results.value==722094923)
      //    { 
      //     th=k1*10+f1;
      //    }
          if(results.value==274198899)
          { 
           th=k8*10+f2;
          }
          if(results.value==1199558996)
          { 
           th=k8*10+f4;
          }
          if(results.value==1680019374)
          { 
           th=k8*10+f6;
          }     
         return th;
        }
        int nhan_Ir()
        {

          if (irrecv.decode(&results)) {
          dem=nhan();
          irrecv.resume(); // Receive the next value
        }
        else dem=0;
          return dem;
        } `);
      var code = 'nhan_Ir()';
      return [code, Blockly.Arduino.ORDER_ADDITIVE];
      
}

Blockly.Arduino.kcbot_Serial=function(){
      var code = 'Serial.read()';
      return [code, Blockly.Arduino.ORDER_ADDITIVE];
      
}
Blockly.Arduino['kcbot_nhietdo'] = function(block) {
var pin = block.getFieldValue('PIN');
Blockly.Arduino.reservePin(
    block, pin, Blockly.Arduino.PinTypes.INPUT, 'Analogue Read');

var pinSetupCode = 'pinMode(' + pin + ', INPUT);';
Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

var code = '(analogRead(' + pin + ')* 0.488)';
return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.kcbot_tds=function(){
var x = Blockly.Arduino.valueToCode(
      this, 'x', Blockly.Arduino.ORDER_ATOMIC) || '0';
Blockly.Arduino.addFunction('kcbot_tds',`
      int GetEC(){
          int ECPin= A0;
          int ECGround=2;
          int ECPower =5;
          float PPMconversion=0.7;
          float TemperatureCoef = 0.019; //this changes depending on what chemical we are measuring
          float K=2.88;
          //***************************** END Of Recomended User Inputs *****************************************************************//
          float Temperature=10;
          float EC=0;
          float EC25 =0;
          int ppm =0;
          float raw= 0;
          float Vin= 5;
          float Vdrop= 0;
          float Rc= 0;
          int R1= 1000;
          int Ra=25; 
          pinMode(ECPin,INPUT);
          pinMode(ECPower,OUTPUT);//Setting pin for sourcing current
          pinMode(ECGround,OUTPUT);//setting pin for sinking current
          digitalWrite(ECGround,LOW);//We can leave the ground connected permanantly
          R1=(R1+Ra);// Taking into acount Powering Pin Resitance
          Temperature=25; //Stores Value in Variable
          digitalWrite(ECPower,HIGH);
          raw= analogRead(ECPin);
          raw= analogRead(ECPin);// This is not a mistake, First reading will be low beause if charged a capacitor
          digitalWrite(ECPower,LOW);
          Vdrop= (Vin*raw)/1024.0;
          Rc=(Vdrop*R1)/(Vin-Vdrop);
          Rc=Rc-Ra; //acounting for Digital Pin Resitance
          EC = 1000/(Rc*K);
          EC25  =  EC/ (1+ TemperatureCoef*(Temperature-25.0));
          ppm=((EC25)*(PPMconversion*1000)-70);
          if(ppm<=0) ppm=0;
          return ppm;
      }`);
      var code = 'GetEC()';
      return [code, Blockly.Arduino.ORDER_ADDITIVE];
};

Blockly.Arduino.kcbot_123 = function() {
  var text =Blockly.Arduino.valueToCode(
      this, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
  var text1 =Blockly.Arduino.valueToCode(
      this, 'text1', Blockly.Arduino.ORDER_ATOMIC) || '""';
  Blockly.Arduino.addInclude();
  Blockly.Arduino.addSetup('WiFi.begin','Serial.print("AT+CWJAP=\\"");Serial.print('+text+');Serial.print("\\",\\"");Serial.print('+text1+');Serial.println("\\"");\n delay(5000);',false);
  var code = '';                                 
  return code;
};
Blockly.Arduino.kcbot_trans = function() {
  var text =Blockly.Arduino.valueToCode(
      this, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
  var text1 =Blockly.Arduino.valueToCode(
      this, 'text1', Blockly.Arduino.ORDER_ATOMIC) || '""';
  Blockly.Arduino.addInclude();
  Blockly.Arduino.addSetup('WiFi.begin','delay(3000);\nSerial.begin(115200);\nSerial.println("AT+RST");\ndelay(2000);\nSerial.println("AT+CWMODE=2");\ndelay(3000);\nSerial.println("AT+CIFSR");\ndelay(1000);\nSerial.println("AT+CIPMUX=1");\ndelay(1000);\nSerial.print("AT+CIPSERVER=1,");Serial.println(80);\ndelay(1000);\nSerial.print("AT+CWSAP=\\"");Serial.print('+text+');Serial.print("\\",\\"");Serial.print('+text1+');Serial.print("\\"");Serial.println(",1,4");\n delay(5000);\npinMode(13,OUTPUT);\ndigitalWrite(13,1);\ndelay(1000);digitalWrite(13,0);',false);
  var code = '';                                 
  return code;
};
Blockly.Arduino.kcbot_web = function() {
  var text =Blockly.Arduino.valueToCode(
      this, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
  var text1 =Blockly.Arduino.valueToCode(
      this, 'text1', Blockly.Arduino.ORDER_ATOMIC) || '""';
      Blockly.Arduino.addDeclaration('web','bool kidscode=0;\n#define CMD_SEND_BEGIN  "AT+CIPSEND=0"\n#define CMD_SEND_END    "AT+CIPCLOSE=0"\n#define KIDSCODE_PROTOCOL_HTTP     80\n#define KIDSCODE_PROTOCOL_HTTPS    443\n#define KIDSCODE_PROTOCOL_FTP      21\n#define KIDSCODE_PROTOCOL_CURRENT  KIDSCODE_PROTOCOL_HTTP\n#define KIDSCODE_CHAR_CR     0x0D\n#define KIDSCODE_CHAR_LF     0x0A\n#define KIDSCODE_STRING_EMPTY  ""\nbool hasRequest = false;\nstatic String bufferData = KIDSCODE_STRING_EMPTY;',false);
      Blockly.Arduino.addSetup('web','',false);
      Blockly.Arduino.addFunction('kcbot_web_local',`
        void web_local(String a)
        {
        while(Serial.available())
        {   
        bufferingRequest(Serial.read(),a);
        }
        if(hasRequest == true) 
        {
        String htmlResponse = "<!doctype html>"
        "<html>"
        "<head>"
        "<title>KIDSCODE ESP8266 DEMO</title>"
        "</head>"
        "<body>"
        "<h1>KIDSCODE ESP8266 DEMO</h1>"
        "<form action='' method='GET'>"
        "<input type='radio' name='LED' name='KIDSCODE' value="+a+"_ON /> "+a+" on<br/>"
        "<input type='radio' name='LED' name='D2K' value="+a+"_OFF /> "+a+" off<br/>"
        "<input type='submit' value='Submit' />"
        "</form>"
        "</body>"
        "</html>";
        String beginSendCmd = String(CMD_SEND_BEGIN) + "," + htmlResponse.length();
        Serial.println(beginSendCmd);delay(1000);
        Serial.println(htmlResponse);delay(1000);
        Serial.println(CMD_SEND_END);delay(1000);
        hasRequest = false;
        }
        }
        void bufferingRequest(char c,String b)
        {
        switch (c)
        {
          case KIDSCODE_CHAR_CR:
            break;
          case KIDSCODE_CHAR_LF:
          {
          hasRequest = bufferData.startsWith("+IPD,");
            if(bufferData.indexOf(""+b+"_OFF") != -1)
        {
          kidscode=0;
        }
        else if(bufferData.indexOf(""+b+"_ON") != -1)
        {
          kidscode=1;
        }
            //KIDSCODEProcedure(bufferData);
            bufferData = KIDSCODE_STRING_EMPTY;
          }
            break;
          default:
            bufferData += c;
        }
        }`);

  var code = 'web_local('+text+');\n';                                 
  return code;
};
Blockly.Arduino.kcbot_Blynk = function() {
  var text =Blockly.Arduino.valueToCode(
      this, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
  var text1 =Blockly.Arduino.valueToCode(
      this, 'text1', Blockly.Arduino.ORDER_ATOMIC) || '""';
  var text2 =Blockly.Arduino.valueToCode(
      this, 'text2', Blockly.Arduino.ORDER_ATOMIC) || '""';
  Blockly.Arduino.addInclude('Blynk','#include <ESP8266_Lib.h>\n#include <BlynkSimpleShieldEsp8266.h>\n');
  Blockly.Arduino.addDeclaration('Blynk1', '#define BLYNK_PRINT Serial\n#define ESP8266_BAUD 115200\nESP8266 wifi(&Serial);\nchar auth[] = '+text+';\nchar ssid[] = '+text1+';\nchar pass[] = '+text2+';\n',false);
  Blockly.Arduino.addSetup('Blynk_setup','Serial.begin(115200);\ndelay(10);\n Serial.begin(ESP8266_BAUD);\n delay(10);\nBlynk.begin(auth, wifi, ssid, pass);\npinMode(13,OUTPUT);\ndigitalWrite(13,1);\ndelay(1000);\ndigitalWrite(13,0);\n',false);
  var code = 'Blynk.run();';                                
  return code;
};
Blockly.Arduino.kcbot_motor_phenikaa = function() {
  var id = Blockly.Arduino.valueToCode(
    this, 'ID', Blockly.Arduino.ORDER_ATOMIC) || '0';    
  var motor =this.getFieldValue("MOTOR") ;
  var speed = Blockly.Arduino.valueToCode(
    this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.addFunction('kcbot_robot_phenikaa',`
  void send_motor(uint8_t diachi, uint8_t chieuquay, uint8_t tocdo)
    {
      uint8_t byte_send[3] = {0, 0, 0};
      byte_send[0] = chieuquay << 7 | diachi;
      byte_send[1] = tocdo;
      byte_send[2] = 255;
      Serial.write(byte_send, 3);
    }`);  
  var code = 'send_motor('+id+','+motor+','+speed+');\n';                                 
  return code;
};
Blockly.Arduino.kcbot_thing = function() {
  var text =Blockly.Arduino.valueToCode(
      this, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
  var chart =this.getFieldValue("bang") ;
 var x = Blockly.Arduino.valueToCode(
      this, 'x', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.addInclude();
  Blockly.Arduino.addSetup('esp1','Serial.println("AT+RST");\n delay(11000);\n');
  Blockly.Arduino.addSetup('esp2','Serial.println("AT+CWMODE=1");\n delay(11000);\n');
  Blockly.Arduino.addSetup('esp3','Serial.println("AT+CIPMUX=1");\n delay(11000);\n');
  Blockly.Arduino.addSetup('esp1','Serial.println("AT+CIPSERVER=1,8888");\n delay(11000);\n');
  Blockly.Arduino.addDeclaration('esp1','String writeAPIKey = '+text+';\n' );
  Blockly.Arduino.addFunction('kcbot_guidulieu',`
  void guidulieu(int x, int b)
          {
          String text= "GET /update?key="+ writeAPIKey;
          Serial.println("AT+CIPSTART=0,\\"TCP\\",\\"184.106.153.149\\",80");
          delay(1000);
          text +="&field";
          text += String(b);
          text +="=";
          text +=String(x);
          // text +="&field3=";
          //text +=String(z);
          text +="\\r\\n";
          String sumtext = "AT+CIPSEND=0,";
          sumtext +=String(text.length());//data.length()
          Serial.println(sumtext);
          delay(1000);
          Serial.println(text);
          //Serial.println("GET /update?key=N1UB5SWQTA83UQWK&field1=40\\r\\n");
      }`);    
  var code = 'guidulieu('+x+','+chart+');\n';                                 
  return code;
};
Blockly.Arduino.loop_forever=function(){
var branch = Blockly.Arduino.statementToCode(this, 'DO');
return' while (1) {\n' + branch + '}\n';

}

Blockly.Arduino.kcbot_readDS18b20 = function() {
var pin =this.getFieldValue('PIN') ;
    Blockly.Arduino.addInclude('dht11','#include <OneWire.h>\n#include <DallasTemperature.h>\n');
    Blockly.Arduino.addDeclaration('DS18b20+pin','#define ONE_WIRE_BUS_1  '+pin+'',false);
    Blockly.Arduino.addDeclaration('DS18b20_type','OneWire oneWire_in(ONE_WIRE_BUS_1);',false);
    Blockly.Arduino.addDeclaration('DS18b20','DallasTemperature sensor_inhouse(&oneWire_in);');
    Blockly.Arduino.addSetup('DS18b20','sensor_inhouse.begin();',false);
    Blockly.Arduino.addFunction('kcbot_readDS18b20',`
    int gettempds18b20()
    {
        int readds18b20;
        sensor_inhouse.requestTemperatures();
        readds18b20 = sensor_inhouse.getTempCByIndex(0);
        return readds18b20;
     }`)
var code = 'gettempds18b20()';
return [code];
};

// ---------------------------------------Airsense----------------------------------------


// Hàm chuyển từ kí tự có dấu thành không dấu
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
  str = str.replace(/đ/g,"d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g," ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  return str;
}

function removeSpaces(str) {
return str.replace(/\s/g, '');
};

Blockly.Arduino.freeRTOS = function(){
  var name_task_unsign = removeVietnameseTones(removeSpaces(this.getFieldValue('Name task')));
  var name_task = this.getFieldValue('Name task');
  var memory_task = this.getFieldValue('Memory task');
  var priority_task = this.getFieldValue('Priority task');
  var function_task = Blockly.Arduino.valueToCode(
    this, 'Text', Blockly.Arduino.ORDER_ATOMIC) || '""';
  Blockly.Arduino.addInclude('Library freeRTOS','#include <Arduino_FreeRTOS.h>');
  Blockly.Arduino.addDeclaration('Task','void ' +name_task_unsign+ '(void *pvParameters);',false);
  Blockly.Arduino.addDeclaration('Function of task','void '+removeVietnameseTones(removeSpaces(this.getFieldValue('Name task')))+'(void *pvParameters)\n{\n(void) pvParamemters;\nwhile(1){'+function_task+'}\n};');
  Blockly.Arduino.addSetup('Setup task','xTaskCreate('+name_task_unsign+',(const portCHAR *)"'+name_task+'",'+memory_task+',NULL,'+priority_task+',NULL);');
  

  var code = '// updating';
  return code ;
};



Blockly.Arduino.AirsenseReadDataBME280 = function(){
var pin_sda = this.getFieldValue('I2C_port_SDA');
var pin_scl = this.getFieldValue('I2C_port_SCL');
var type_data = this.getFieldValue('Type data BME280');

Blockly.Arduino.addInclude('bme280','#include <Wire.h>\n#include <Adafruit_Sensor.h>\n#include <Adafruit_BME280.h>\n');
Blockly.Arduino.addDeclaration('Line head BME280','//------BME280------\n');
Blockly.Arduino.addDeclaration('parameter Pressure','#define SEALEVELPRESSURE_HPA (1013.25)');
Blockly.Arduino.addDeclaration('BME280_Address','#define BME280_I2C_ADDRESS  0x76',false);
Blockly.Arduino.addDeclaration('PORT I2C SDA','#define I2C_PORT_SDA  '+pin_sda+'',false);
Blockly.Arduino.addDeclaration('PORT I2C SCL','#define I2C_PORT_SCL  '+pin_scl+'',false);
Blockly.Arduino.addDeclaration('BME280_object','Adafruit_BME280 bme;',false);
Blockly.Arduino.addDeclaration('Line tail BME280','//------BME280------\n');
Blockly.Arduino.addDeclaration('Function select data',`

int selectDataOfBME280(String data){
  double dataBME;
  if(data == "Nhiệt độ") dataBME = bme.readTemperature() ;
  if(data == "Độ ẩm") dataBME = bme.readHumidity();
  if(data == "Áp suất") dataBME = bme.readPressure();
  return (int)(dataBME);
}

`)

Blockly.Arduino.addSetup('Line head1 BME280','//------BME280------\n');
Blockly.Arduino.addSetup('Serialpr','Serial.println("Initializing BME280 sensor...");')
Blockly.Arduino.addSetup('BME280_setup_PORT_I2C_2',
`if (!bme.begin(BME280_I2C_ADDRESS, &Wire)) {
  Serial.println("Could not find a valid BME280 sensor, check wiring!");
  while (1) {
    delay(10);
  }
}`)
Blockly.Arduino.addSetup('Set ip mode','bme.takeForcedMeasurement();',false);
Blockly.Arduino.addSetup('Line tail1 BME280','//------BME280------\n');


var code = 'selectDataOfBME280("'+type_data+'")';
return [code, Blockly.Arduino.ORDER_ADDITIVE];
};

Blockly.Arduino.AirsenseReadDataPMS7003 = function () {
var Port_uart = this.getFieldValue('Port uart');
var Port_rx = this.getFieldValue('Port rx');
var Baud_speed = this.getFieldValue('Baud speed');
var type_data_PMS7003 = this.getFieldValue('Type data PMS7003');

Blockly.Arduino.addDeclaration('Line head PMS7003','//------PMS7003------\n');
Blockly.Arduino.addInclude('Library Uart Hardware & PMS7003','#include "PMS.h"');
Blockly.Arduino.addDeclaration('PORT UART RX PMS','#define RX_PORT_PMS7003 '+Port_rx+'',false);
Blockly.Arduino.addDeclaration('PORT UART  PMS','#define UART_PORT_PMS7003 '+Port_uart+'',false);
Blockly.Arduino.addDeclaration('Initialize PMS1','HardwareSerial SerialPMS(UART_PORT_PMS7003);',false);
Blockly.Arduino.addDeclaration('Initialize PMS2','PMS pms(SerialPMS);',false);
Blockly.Arduino.addDeclaration('Initialize PMS3','PMS::DATA dataPMS7003;',false);
Blockly.Arduino.addDeclaration('Line tail PMS7003','//------PMS7003------\n');
Blockly.Arduino.addDeclaration('Function select type data of PMS7003',`
int selectDataOfPMS7003(String type_data, PMS::DATA data) {
  int dataPMS7003_value;
  pms.requestRead();
  if (type_data == "PM1" && pms.readUntil(dataPMS7003)) dataPMS7003_value = data.PM_AE_UG_1_0;
  else if (type_data == "PM2.5" && pms.readUntil(dataPMS7003)) dataPMS7003_value = data.PM_AE_UG_2_5;
  else if (type_data == "PM10" && pms.readUntil(dataPMS7003)) dataPMS7003_value = data.PM_AE_UG_10_0;
  return dataPMS7003_value;
}

`);

Blockly.Arduino.addSetup('Line head1 PMS7003','//------PMS7003------\n');
Blockly.Arduino.addSetup('SetupSeial','Serial.println("Initializing PMS7003 sensor...");\n');
Blockly.Arduino.addSetup('Set up pms1','SerialPMS.begin('+Baud_speed+', SERIAL_8N1, RX_PORT_PMS7003);');
Blockly.Arduino.addSetup('Set up pms2',`pms.passiveMode();\npms.wakeUp();\ndelay(3000);`);
Blockly.Arduino.addSetup('Line tail1 PMS7003','//------PMS7003------\n');


var code = 'selectDataOfPMS7003("'+type_data_PMS7003+'",dataPMS7003)';
return [code, Blockly.Arduino.ORDER_ADDITIVE];


}



Blockly.Arduino.ESP32_wireless = function(){

Blockly.Arduino.addInclude('Library wireless','#include <WiFi.h>\n#include "BluetoothSerial.h"');

var nameWifi = this.getFieldValue('Name_wifi');
var passwordWifi = this.getFieldValue('Password');
var Name_bluetooth = this.getFieldValue('Name_bluetooth');

Blockly.Arduino.addDeclaration('head wifi','//---------------WIFI-------------------',false);
Blockly.Arduino.addDeclaration('SSID wifi','#define SSID  "'+nameWifi+'"',false);
Blockly.Arduino.addDeclaration('Password wifi','#define PASSWORD "'+passwordWifi+'"',false);
Blockly.Arduino.addDeclaration('Function wifi','void initWifi(){\nWiFi.mode(WIFI_STA);\nWiFi.begin(SSID, PASSWORD);\n Serial.print("Connecting to WiFi ..");\nwhile (WiFi.status() != WL_CONNECTED) {\nSerial.print(".");\ndelay(1000);}}',false);
Blockly.Arduino.addDeclaration('tail wifi','//---------------WIFI-------------------',false);


Blockly.Arduino.addDeclaration('head ble','//---------------BLUETOOTH-------------------',false);
Blockly.Arduino.addDeclaration('Name bluetooth','#define NAME_BLUETOOTH  "'+Name_bluetooth+'"',false);
Blockly.Arduino.addDeclaration('tail ble','//---------------BLUETOOTH-------------------',false);






var Status_wireless = this.getFieldValue("Select");

Blockly.Arduino.addSetup('wireless','//---------------WIRELESS-------------------',false);
Blockly.Arduino.addSetup('Set up wireless','if("'+Status_wireless+'" == "Wifi"){\ninitWifi();\nSerial.print("RRSI: ");\nSerial.println(WiFi.RSSI());}\nelse {\nBluetoothSerial SerialBT;\nSerialBT.begin(NAME_BLUETOOTH);\n}');
Blockly.Arduino.addSetup('wireless tail','//---------------WIRELESS-------------------',false);

var code = ' ';
return code ;
}


Blockly.Arduino['FormatStringData'] = function() {
  //var numData = this.getFieldValue('NumData');
  // var code = '';
  var dataInputs = [];
  var numberSelect = this.getFieldValue('NUM_INPUTS');
  // Collect all input values
  for (var i = 1; i <= numberSelect; i++) {
       var input = Blockly.Arduino.valueToCode(this, 'Text' + i, Blockly.Arduino.ORDER_ATOMIC) || '""';
       dataInputs.push('(double)'+input);
   }

  // Generate snprintf format string and variables
  //var formatStringDataToMQTT = ["Nhiệt độ: ","Độ ẩm: ","Áp suất: ","PM1: ","PM2.5: ","PM10: ","CO2: "]
  var formatTypeStringDataToMQTT = ["%d"]
  
  var formatString = '"';
  var variables = '';
  for (var i = 1; i <= numberSelect; i++) {
      var nameData = this.getFieldValue('nameData'+i)
      // formatString += formatStringDataToMQTT[i-1];
      // formatString += formatTypeStringDataToMQTT[i-1];
      // formatString += '\\n';

      formatString += nameData;
      formatString += formatTypeStringDataToMQTT[0];
      formatString += '\\n';

      
      variables += dataInputs[i-1];
      if (i <= numberSelect) variables += ', ';
  }
  variables = variables.slice(0, -2);
  formatString += '"';

  // Create the buffer and snprintf code
  Blockly.Arduino.addDeclaration('funtion format','char* dataFormat(){\nstatic char bufferDataToMQTT[256];\n\nsnprintf(bufferDataToMQTT, sizeof(bufferDataToMQTT), ' + formatString + ', ' + variables + ');\n return bufferDataToMQTT;\n}')
  var code = 'dataFormat()\n'
  return [code, Blockly.Arduino.ORDER_ADDITIVE];

};


Blockly.Arduino.AirsenseReadDataMHZ14A = function(){
var Port_uart = this.getFieldValue('Port uart');
var Port_rx = this.getFieldValue('Port rx');
var Port_tx = this.getFieldValue('Port tx');
var Baud_speed = this.getFieldValue('Baud speed')

Blockly.Arduino.addDeclaration('Line head MHZ14A','//------MHZ14A------\n');
Blockly.Arduino.addInclude('Library Uart Hardware & MHZ14A','#include <MH-Z14A.h>\n#include<Arduino.h>');
Blockly.Arduino.addDeclaration('PORT UART RX MHZ14A','#define RX_PORT_MHZ14A '+Port_rx+'',false);
Blockly.Arduino.addDeclaration('PORT UART TX  MHZ14A','#define TX_PORT_MHZ14A '+Port_tx+'',false);
Blockly.Arduino.addDeclaration('PORT UART MHZ14A','#define UART_PORT_MHZ14A '+Port_uart+'',false);
Blockly.Arduino.addDeclaration('Initialize MHZ14A','HardwareSerial SerialMHZ14A(UART_PORT_MHZ14A);',false);
Blockly.Arduino.addDeclaration('Init MHZ14A','MHZ14A mhz14a_sensor;',false);
Blockly.Arduino.addDeclaration('function convert',`int dataMHZ14A(int data){
  return data;
}`)
Blockly.Arduino.addDeclaration('Line tail MHZ14A','//------MHZ14A------\n');
Blockly.Arduino.addSetup('Line head MHZ14A','//------MHZ14A------\n');
Blockly.Arduino.addSetup('SetupSeialMHZ14A','Serial.println("Initializing MH-Z14A sensor...");\n');
Blockly.Arduino.addSetup('setup1_mhz14a','SerialMHZ14A.begin('+Baud_speed+');');
Blockly.Arduino.addSetup('setup2_mhz14a','mhz14a_sensor.begin(SerialMHZ14A,Serial,4000);');
Blockly.Arduino.addSetup('setup3_mhz14a','mhz14a_sensor.setDebug(true);');
Blockly.Arduino.addSetup('setup4_mhz14a','mhz14a_sensor.setAutoCal(0x01, true);  ');
Blockly.Arduino.addSetup('setup5_mhz14a','mhz14a_sensor.setDetectionRange(0x01, mhz14a_sensor.MR_2000);');
Blockly.Arduino.addSetup('Line tail MHZ14A','//------MHZ14A------\n');

var code =  'dataMHZ14A(mhz14a_sensor.readConcentrationPPM(0x01))';
return [code, Blockly.Arduino.ORDER_ADDITIVE];
}


Blockly.Arduino.setUpDS3231 = function(){
  var SDA_3231=this.getFieldValue('SDA_ds3231');
  var SCL_3231=this.getFieldValue('SCL_ds3231');
  var Year = this.getFieldValue('Nam');
  var Month = this.getFieldValue('Thang');
  var Day = this.getFieldValue('Ngay');
  var WeekDay = this.getFieldValue('Thu ngay');
  var Hour = this.getFieldValue('Gio');
  var Minute = this.getFieldValue('Phut');
  var Second = this.getFieldValue('Giay');

  Blockly.Arduino.addInclude('Lib DS3231', '#include <DS3231.h>');
  Blockly.Arduino.addDeclaration('DS3231_SDA','#define SDA_DS3231 '+SDA_3231+'');
  Blockly.Arduino.addDeclaration('DS3231_SCL','#define SCL_DS3231 '+SCL_3231+'');
  Blockly.Arduino.addDeclaration('parameter DS3231','DS3231 myRTC;')
  Blockly.Arduino.addSetup('DS3231_setup','Wire.begin(SDA_DS3231,SCL_DS3231);');
  Blockly.Arduino.addSetup('Year_setup', 'myRTC.setYear('+Year+'- 2000);');
  Blockly.Arduino.addSetup('Month_setup', 'myRTC.setMonth(' + Month + ');');
  Blockly.Arduino.addSetup('Date_setup', 'myRTC.setDate(' + Day + ');');
  Blockly.Arduino.addSetup('WeekDay_setup', 'myRTC.setDoW(' + WeekDay + ');');
  Blockly.Arduino.addSetup('Hour_setup', 'myRTC.setHour(' + Hour + ');');
  Blockly.Arduino.addSetup('Minute_setup', 'myRTC.setMinute(' + Minute + ');');
  Blockly.Arduino.addSetup('Second_setup', 'myRTC.setSecond(' + Second + ');');
  var code = '';
  return code;

}

Blockly.Arduino.getDataOfDS3231 = function(){

  var type_data_ds3231 = this.getFieldValue('TypeData')
  Blockly.Arduino.ad 
  Blockly.Arduino.addDeclaration('function select data of ds3231',`
  
  String getDataOfDS3231(String data) {
    bool status;  // Placeholder variable for functions that require additional arguments
    bool century; // Another placeholder for century information
    
    if (data == "Năm") {
      return String(myRTC.getYear());
    } else if (data == "Tháng") {
      return String(myRTC.getMonth(century));  // Use the required argument
    } else if (data == "Ngày") {
      return String(myRTC.getDate());
    } else if (data == "Thứ ngày") {
      return String(myRTC.getDoW());
    } else if (data == "Giờ") {
      return String(myRTC.getHour(status, status));  // Use the required arguments
    } else if (data == "Phút") {
      return String(myRTC.getMinute());
    } else if (data == "Giây") {
      return String(myRTC.getSecond());
    } else {
      return "Invalid Data";
    }
  }
  `)
  var code = 'getDataOfDS3231("'+type_data_ds3231+'")';
  return [code, Blockly.Arduino.ORDER_ADDITIVE];

}

Blockly.Arduino.ConnectMQTT = function(){
  var Port = this.getFieldValue('PORT');
  var IP = this.getFieldValue('IP');
  var ID = this.getFieldValue('ID');
  var PW = this.getFieldValue('PassWord');
 

  Blockly.Arduino.addInclude('MQTT client', '#include <PubSubClient.h>');
  Blockly.Arduino.addDeclaration('Setup IP','#define MQTT_SERVER  "'+IP+'"');
  Blockly.Arduino.addDeclaration('Setup port','#define MQTT_PORT  '+Port+'');
  Blockly.Arduino.addDeclaration('setup ID', '#define MQTT_USER  "'+ID+'"');
  Blockly.Arduino.addDeclaration('setup PW', '#define MQTT_PASSWORD  "'+PW+'"');
  Blockly.Arduino.addDeclaration('create wifi client', 'WiFiClient espClient;');
  Blockly.Arduino.addDeclaration('connect MQTT client','PubSubClient client(espClient);');
  Blockly.Arduino.addDeclaration('initMQTT',`
  void initMQTT() {
    client.setServer(MQTT_SERVER, MQTT_PORT);
    while (!client.connected()) {
      if (client.connect("ESP32Client", MQTT_USER, MQTT_PASSWORD)) {
        Serial.println("Connected to MQTT Broker!");
      } else {
        Serial.print("Failed to connect to MQTT Broker, retrying in 5 seconds - ");
        Serial.print(client.state());
        delay(5000);
      }
    }
  }
  `)
  Blockly.Arduino.addSetup('ConnectMQTT',`initMQTT();`)

  var code =`if (!client.connected()) {
    initMQTT(); // Reconnect if disconnected
  }
  client.loop();\n`;
  return code;
}

Blockly.Arduino.SendDataMQTT = function(){
  var data_MQTT = Blockly.Arduino.valueToCode(
    this, 'Text', Blockly.Arduino.ORDER_ATOMIC) || '""';
  var topic_mqtt = this.getFieldValue('TOPIC'); 
  Blockly.Arduino.addInclude('include lib','#include "stdio.h"')
  Blockly.Arduino.addFunction('checkTypeData',`char* converData(double data){
        static char _bufferData[256];
        snprintf(_bufferData, sizeof(_bufferData),"%0.2f",data);
        return _bufferData;
      }`)
  var code ='client.publish("'+topic_mqtt+'",converData('+data_MQTT+'));';
  return code;
}


Blockly.Arduino.ReceiveMQTTData=function(){
  var type_sensor=this.getFieldValue("type sensor data")
  Blockly.Arduino.addDeclaration('Broker','const char broker[] = "test.mosquitto.org";')
  Blockly.Arduino.addDeclaration('Port','int        port     = 1883;')
  Blockly.Arduino.addDeclaration('set interval','const long interval = 8000;\nunsigned long previousMillis = 0;')
  Blockly.Arduino.addDeclaration('Topic','const char sensor[]  = "Dữ liệu '+type_sensor+'";')
  Blockly.Arduino.addSetup('Receive sensor','mqttClient.onMessage(onMqttMessage);')
  Blockly.Arduino.addSetup('Sub sensor',' mqttClient.subscribe(sensor);')
  Blockly.Arduino.addFunction('Rec func',
    `
    void onMqttMessage(int messageSize) {
      // we received a message, print out the topic and contents
      Serial.println("Nhận dữ liệu từ : '");
      Serial.print(mqttClient.messageTopic());
         
      // use the Stream interface to print the contents
      while (mqttClient.available()) {
        Serial.print((char)mqttClient.read());
      }
      Serial.println();
    }
    `
  )
  var code = 'mqttClient.poll();';
  return code;

}