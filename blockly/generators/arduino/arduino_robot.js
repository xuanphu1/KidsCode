Blockly.Arduino.Arduino_robot = function() {
    Blockly.Arduino.addInclude('arduino','#include <Arduino.h>');
    Blockly.Arduino.addInclude('wire','#include <Wire.h>');
    Blockly.Arduino.addInclude('serial','#include <SoftwareSerial.h>');
    var code = ''                                 //will be used in loop()
   return code;
  };
Blockly.Arduino.Arduino_start = function() {
    Blockly.Arduino.addInclude('arduino','#include <Arduino.h>');
    Blockly.Arduino.addInclude('wire','#include <Wire.h>');
    Blockly.Arduino.addInclude('serial','#include <SoftwareSerial.h>');
    var code = ''                                 //will be used in loop()
   return code;
  };
  
  Blockly.Arduino.Arduino_robot_motor = function() {
    var motor =this.getFieldValue("MOTOR") ;
    var spin = this.getFieldValue("SPIN") ;
    Blockly.Arduino.includes_['motor']=['#include "arduinorobot.h"'];
    Blockly.Arduino.addDeclaration('motor','arduinorobot _arduinorobot(true);');
    Blockly.Arduino.addDeclaration('motor1','// IN1 4\n //IN2 5\n// IN3 6\n// IN4 7\n  ');
    Blockly.Arduino.addSetup('motor','_arduinorobot.cauhinh();',false);
    var code = '_arduinorobot.motor('+motor+', '+spin+');\n';                                 
    return code;
  };
    Blockly.Arduino.Arduino_robot_run_forward = function() {
   var motor =this.getFieldValue("MOTOR") ;
    Blockly.Arduino.includes_['motor']=['#include "arduinorobot.h"'];
    Blockly.Arduino.addDeclaration('motor','arduinorobot _arduinorobot(true);');
    Blockly.Arduino.addDeclaration('motor1','// IN1 4\n //IN2 5\n// IN3 6\n// IN4 7\n  ');
    Blockly.Arduino.addSetup('motor','_arduinorobot.cauhinh();',false);
    var code = '_arduinorobot.run('+motor+');\n';                                                       
    return code;
  };
  Blockly.Arduino.Arduino_robot_run_forward_at_sec = function() {
   var motor =this.getFieldValue("MOTOR") ;
    var secs = Blockly.Arduino.valueToCode(
      this, 'sec', Blockly.Arduino.ORDER_ATOMIC) || '0';;
    Blockly.Arduino.includes_['motor']=['#include "arduinorobot.h"'];
    Blockly.Arduino.addDeclaration('motor','arduinorobot _arduinorobot(true);');
    Blockly.Arduino.addDeclaration('motor1','// IN1 4\n //IN2 5\n// IN3 6\n// IN4 7\n  ');
    Blockly.Arduino.addSetup('motor','_arduinorobot.cauhinh();',false);
    var code = '_arduinorobot.run('+motor+');\ndelay(1000*'+secs+');\n_arduinorobot.run(0);\n';                                                       
    return code;
  };
    Blockly.Arduino.Arduino_robot_rtc_set_time = function() {
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

  Blockly.Arduino.Arduino_robot_rtc_update = function() {
    Blockly.Arduino.addInclude('rtc','#include "SparkFunDS1307RTC.h"');
    Blockly.Arduino.addSetup('rtc_begin','rtc.begin();',false);
    var code = 'rtc.update();\n';                                 
    return code;
  };
 Blockly.Arduino.Arduino_robot_Blynk_tran = function() {
    var com =this.getFieldValue("com") ;
   var x = Blockly.Arduino.valueToCode(
        this, 'y', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.addInclude('Blynk','BLYNK_CONNECTED()\n{\nBlynk.syncAll();\n}\n');
    var code = 'Blynk.virtualWrite('+com+', '+x+');\n';                                 
    return code;
  };
  Blockly.Arduino.Arduino_robot_rtc_read_time = function() {
    Blockly.Arduino.addInclude('rtc','#include "SparkFunDS1307RTC.h"');
    Blockly.Arduino.addSetup('rtc_begin','rtc.begin();',false);
    var code = 'String(rtc.hour()) + ":" + String(rtc.minute()) + ":" + String(rtc.second())';                                 
    return [code, Blockly.Arduino.ORDER_ADDITIVE];
  };

  Blockly.Arduino.Arduino_robot_rtc_read_date = function() {
    Blockly.Arduino.addInclude('rtc','#include "SparkFunDS1307RTC.h"');
    Blockly.Arduino.addSetup('rtc_begin','rtc.begin();',false);
    var code = 'String(rtc.date()) + "/" + String(rtc.month()) + "/" + String(rtc.year())';                                 
    return [code, Blockly.Arduino.ORDER_ADDITIVE];
  };
  Blockly.Arduino.Arduino_robot_rtc_read = function() {
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
Blockly.Arduino.Arduino_robot_web_read = function() {
    var value=this.getFieldValue("value");
    var code = '('+value+')';                                 
    return [code, Blockly.Arduino.ORDER_ADDITIVE];
  };
Blockly.Arduino.Arduino_robot_web_kidscode = function() {
    var code = 'kidscode';                                 
    return [code, Blockly.Arduino.ORDER_ADDITIVE];
  };

Blockly.Arduino.Arduino_robot_read_Doam = function() {
    var pin =this.getFieldValue("MOTOR") ;
    Blockly.Arduino.addSetup('readlm35','pinMode('+pin+',INPUT);',true);
    var code = '((1023-analogRead('+pin+')/1023)*100 )';
    return [code, Blockly.Arduino.ORDER_ADDITIVE];
};

Blockly.Arduino.Arduino_robot_readlm35 = function() {
    var pin =this.getFieldValue("MOTOR") ;
    Blockly.Arduino.addSetup('read_Doam','pinMode('+pin+',INPUT);',true);
    var code = 'analogRead('+pin+') *0.488';
    return [code, Blockly.Arduino.ORDER_ADDITIVE];
};
Blockly.Arduino.Arduino_robot_readDS18b20 = function() {
    var pin =this.getFieldValue('PIN') ;
        Blockly.Arduino.addInclude('dht11','#include <OneWire.h>\n#include <DallasTemperature.h>\n');
        Blockly.Arduino.addDeclaration('DS18b20+pin','#define ONE_WIRE_BUS_1  '+pin+'',false);
        Blockly.Arduino.addDeclaration('DS18b20_type','OneWire oneWire_in(ONE_WIRE_BUS_1);',false);
        Blockly.Arduino.addDeclaration('DS18b20','DallasTemperature sensor_inhouse(&oneWire_in);');
        Blockly.Arduino.addSetup('DS18b20','sensor_inhouse.begin();',false);
        Blockly.Arduino.addFunction('Arduino_robot_readDS18b20',`
        int gettempds18b20()
        {
            int readds18b20;
            sensor_inhouse.requestTemperatures();
            readds18b20 = sensor_inhouse.getTempCByIndex(0);
            return readds18b20;
         }`)
    var code = 'gettempds18b20()';
    return [code, Blockly.Arduino.ORDER_ADDITIVE];
};
Blockly.Arduino.Arduino_robot_dht11_humi=function(){
  var read =this.getFieldValue("MOTOR") ;
  var pin =this.getFieldValue("PIN") ;
        Blockly.Arduino.addInclude('dht11','#include "DHT.h"');
        Blockly.Arduino.addDeclaration('dht11_pin','#define DHTPIN  '+pin+'',false);
        Blockly.Arduino.addDeclaration('dht11_type','#define DHTTYPE  DHT11',false);
        Blockly.Arduino.addDeclaration('dht11','DHT dht(DHTPIN, DHTTYPE);');
        Blockly.Arduino.addSetup('dht11','dht.begin();',false);
        Blockly.Arduino.addFunction('Arduino_robot_dht11_temp',`
        int getdht11(int data)
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

Blockly.Arduino.Arduino_robot_read_irf=function(){
      var state1 =this.getFieldValue("STATE1") ;;
      var state2 =this.getFieldValue("STATE2") ;(
      this, 'echo', Blockly.Arduino.ORDER_ATOMIC) || '0';
        var code = '('+state1+'*10+'+state2+')';
        return [code, Blockly.Arduino.ORDER_ADDITIVE];
        
};
Blockly.Arduino.Arduino_robot_ultrasonic=function(){
      var trig1 = Blockly.Arduino.valueToCode(
      this, 'trig', Blockly.Arduino.ORDER_ATOMIC) || '0';
      var echo1 = Blockly.Arduino.valueToCode(
      this, 'echo', Blockly.Arduino.ORDER_ATOMIC) || '0';
        Blockly.Arduino.addFunction('Arduino_robot_ultrasonic',`
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
Blockly.Arduino.Arduino_robot_read_data_ir=function(){
      var pin = Blockly.Arduino.valueToCode(
      this, 'trig', Blockly.Arduino.ORDER_ATOMIC) || '0';
        Blockly.Arduino.addInclude('ir','#include <IRremote.h>');
        Blockly.Arduino.addDeclaration('ir','long dem=0;\nint RECV_PIN = '+pin+';\nIRrecv irrecv(RECV_PIN);\ndecode_results results;',false);
        Blockly.Arduino.addSetup('ir','irrecv.enableIRIn();',false);
        Blockly.Arduino.addFunction('Arduino_robot_read_data_ir',`
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
Blockly.Arduino.Arduino_robot_Irrecive=function(){
        Blockly.Arduino.addInclude('irf','#include <IRremote.h>');
        Blockly.Arduino.addDeclaration('irf','int dem=0;\n#define k1 1\n#define k2 2\n#define k3 3\n#define k4 4\n#define k5 5\n#define k6 6\n#define k7 7\n#define k8 8\n#define len 1\n#define xuong 2\n#define phai 3\n#define trai 4\n#define f1 5\n#define f2 6\n#define f4 7\n#define f6 8\nint RECV_PIN = 11;\nIRrecv irrecv(RECV_PIN);\ndecode_results results;',false);
        Blockly.Arduino.addSetup('irf','irrecv.enableIRIn();',false);
        Blockly.Arduino.addFunction('Arduino_robot_Irrecive',`
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

Blockly.Arduino['Arduino_robot_nhietdo'] = function(block) {
  var pin = block.getFieldValue('PIN');
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Analogue Read');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = '(analogRead(' + pin + ')* 0.488)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.Arduino_robot_tds=function(){
  var x = Blockly.Arduino.valueToCode(
        this, 'x', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.addFunction('Arduino_robot_tds',`
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