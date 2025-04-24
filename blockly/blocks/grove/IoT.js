
Blockly.Arduino['IoT_nhietdo'] = function(block) {
  var pin = block.getFieldValue('PIN');
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Analogue Read');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = '(analogRead(' + pin + ')* 0.488)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.IoT_tds=function(){
  var x = Blockly.Arduino.valueToCode(
        this, 'x', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.addFunction('IoT_tds',`
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

Blockly.Arduino.IoT_123 = function() {
    var text =Blockly.Arduino.valueToCode(
        this, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
    var text1 =Blockly.Arduino.valueToCode(
        this, 'text1', Blockly.Arduino.ORDER_ATOMIC) || '""';
    Blockly.Arduino.addInclude();
    Blockly.Arduino.addSetup('WiFi.begin','Serial.print("AT+CWJAP=\\"");Serial.print('+text+');Serial.print("\\",\\"");Serial.print('+text1+');Serial.println("\\"");\n delay(5000);',false);
    var code = '';                                 
    return code;
};
Blockly.Arduino.IoT_trans = function() {
    var text =Blockly.Arduino.valueToCode(
        this, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
    var text1 =Blockly.Arduino.valueToCode(
        this, 'text1', Blockly.Arduino.ORDER_ATOMIC) || '""';
    Blockly.Arduino.addInclude();
    Blockly.Arduino.addSetup('WiFi.begin','delay(3000);\nSerial.begin(115200);\nSerial.println("AT+RST");\ndelay(2000);\nSerial.println("AT+CWMODE=2");\ndelay(3000);\nSerial.println("AT+CIFSR");\ndelay(1000);\nSerial.println("AT+CIPMUX=1");\ndelay(1000);\nSerial.print("AT+CIPSERVER=1,");Serial.println(80);\ndelay(1000);\nSerial.print("AT+CWSAP=\\"");Serial.print('+text+');Serial.print("\\",\\"");Serial.print('+text1+');Serial.print("\\"");Serial.println(",1,4");\n delay(5000);\npinMode(13,OUTPUT);\ndigitalWrite(13,1);\ndelay(1000);digitalWrite(13,0);',false);
    var code = '';                                 
    return code;
};
Blockly.Arduino.IoT_web = function() {
    var text =Blockly.Arduino.valueToCode(
        this, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
    var text1 =Blockly.Arduino.valueToCode(
        this, 'text1', Blockly.Arduino.ORDER_ATOMIC) || '""';
        Blockly.Arduino.addDeclaration('web','bool kidscode=0;\n#define CMD_SEND_BEGIN  "AT+CIPSEND=0"\n#define CMD_SEND_END    "AT+CIPCLOSE=0"\n#define KIDSCODE_PROTOCOL_HTTP     80\n#define KIDSCODE_PROTOCOL_HTTPS    443\n#define KIDSCODE_PROTOCOL_FTP      21\n#define KIDSCODE_PROTOCOL_CURRENT  KIDSCODE_PROTOCOL_HTTP\n#define KIDSCODE_CHAR_CR     0x0D\n#define KIDSCODE_CHAR_LF     0x0A\n#define KIDSCODE_STRING_EMPTY  ""\nbool hasRequest = false;\nstatic String bufferData = KIDSCODE_STRING_EMPTY;',false);
        Blockly.Arduino.addSetup('web','',false);
        Blockly.Arduino.addFunction('IoT_web_local',`
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
Blockly.Arduino.IoT_Blynk = function() {
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
Blockly.Arduino.IoT_thing = function() {
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
    Blockly.Arduino.addFunction('IoT_guidulieu',`
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
 Blockly.Arduino.IoT_Blynk_tran = function() {
    var com =this.getFieldValue("com") ;
   var x = Blockly.Arduino.valueToCode(
        this, 'y', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.addInclude('Blynk','BLYNK_CONNECTED()\n{\nBlynk.syncAll();\n}\n');
    var code = 'Blynk.virtualWrite('+com+', '+x+');\n';                                 
    return code;
  };
Blockly.Arduino.IoT_web_read = function() {
    var value=this.getFieldValue("value");
    var code = '('+value+')';                                 
    return [code, Blockly.Arduino.ORDER_ADDITIVE];
  };
Blockly.Arduino.IoT_web_kidscode = function() {
    var code = 'kidscode';                                 
    return [code, Blockly.Arduino.ORDER_ADDITIVE];
  };