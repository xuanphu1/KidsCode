  Blockly.Python.Python_robot = function() {
    var code = ''                                 //will be used in loop()
  return code;
  };
  Blockly.Python.Python_start = function() {
    var code = ''                                 //will be used in loop()
  return code;
  };
  Blockly.Python.Python_robot_motor = function() {
    var motor =this.getFieldValue("MOTOR") ;
    var speed = Blockly.Arduino.valueToCode(
      this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Python.definitions_['from KC_bot_lib import KCMORTOR'] =
    'from KC_bot_lib import KCMORTOR';   
    Blockly.Python.definitions_['kcbot = KCMORTOR'] =
    'kcbot = KCMORTOR()';
    var code = 'kcbot.motor('+motor+','+speed+')\n'                          
  return code;
  };
  Blockly.Python.Python_run_forward = function() {
    var motor =this.getFieldValue("MOTOR") ;
    var speed = Blockly.Arduino.valueToCode(
      this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
   Blockly.Python.definitions_['from KC_bot_lib import KCMORTOR'] =
   'from KC_bot_lib import KCMORTOR';   
   Blockly.Python.definitions_['kcbot = KCMORTOR'] =
   'kcbot = KCMORTOR()';
    var code = 'kcbot.motorrun('+motor+','+speed+')\n';                                                       
    return code;
  };
  Blockly.Python.Python_run_forward_at_sec = function() {
    var motor =this.getFieldValue("MOTOR") ;
    var speed = Blockly.Arduino.valueToCode(
      this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var secs = Blockly.Python.valueToCode(
      this, 'sec', Blockly.Python.ORDER_ATOMIC) || '0';
      Blockly.Python.definitions_['from KC_bot_lib import KCMORTOR'] =
      'from KC_bot_lib import KCMORTOR';   
      Blockly.Python.definitions_['kcbot = KCMORTOR'] =
      'kcbot = KCMORTOR()';
    // Blockly.Python.addDeclaration('motor','Pythonrobot _Pythonrobot(true);');
    var code =  'kcbot.motortime('+motor+','+speed+','+secs+')\n'                                                
    return code;
  };
  Blockly.Python.Python_stop_moving = function() {
    Blockly.Python.definitions_['from KC_bot_lib import KCMORTOR'] =
    'from KC_bot_lib import KCMORTOR';   
    Blockly.Python.definitions_['kcbot = KCMORTOR'] =
    'kcbot = KCMORTOR()';
    var code = 'kcbot.motorstop();\n';                                                       
    return code;
  };
Blockly.Python['Python_ultrasonic']=function(block){
      var trig1 = Blockly.Arduino.valueToCode(
      this, 'trig', Blockly.Arduino.ORDER_ATOMIC) || '0';
      var echo1 = Blockly.Arduino.valueToCode(
      this, 'echo', Blockly.Arduino.ORDER_ATOMIC) || '0';
      Blockly.Python.definitions_['from KC_bot_lib import HCSR04'] =
      'from KC_bot_lib import HCSR04';   
      Blockly.Python.definitions_['sensor = HCSR04'] =
      'sensor = HCSR04(echo_timeout_us=10000)';
        var code = 'sensor.distance_cm('+trig1+','+echo1+')';
      return [code, Blockly.Python.ORDER_ATOMIC];    
};
Blockly.Python.Python_run_out_put = function() {
  var pinout =this.getFieldValue("Pinout") ;
  var MUC =this.getFieldValue("muc") ;
  Blockly.Python.definitions_['from machine import Pin'] =
  'from machine import Pin';   
  Blockly.Python.definitions_['Pinout'+pinout+''] =
  'pin'+pinout+'=Pin('+pinout+',Pin.OUT)';
  var code = 'pin'+pinout+'.value('+MUC+')\n'                          
return code;
};
Blockly.Python.Python_pwm_out_put = function() {
  var pinout =this.getFieldValue("Pinout") ;
  var speed = Blockly.Arduino.valueToCode(
    this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Python.definitions_['from machine import PWM'] =
  'from machine import PWM';   
  Blockly.Python.definitions_['PWM'+pinout+''] =
  'PWM'+pinout+'=PWM(Pin('+pinout+'),freq=50)';
  var code = 'PWM'+pinout+'.duty('+speed+')\n'                          
return code;
};
Blockly.Python.Python_digital_read = function() {
  var pinin =this.getFieldValue("Pinin") ;
  Blockly.Python.definitions_['from machine import Pin'] =
  'from machine import Pin';   
  Blockly.Python.definitions_['Pinin'+pinin+''] =
  'pinin'+pinin+'=Pin('+pinin+',Pin.IN)';
  var code = 'pinin'+pinin+'.value()'                          
  return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.Python_analog_read = function() {
  var Pinanalogin =this.getFieldValue("Pinanalogin") ;
  Blockly.Python.definitions_['from machine import Pin'] =
  'from machine import Pin';   
  Blockly.Python.definitions_['from machine import ADC'] =
  'from machine import ADC';   
  Blockly.Python.definitions_['Pinadc'+Pinanalogin+''] =
  'pinadc'+Pinanalogin+'=ADC(Pin('+Pinanalogin+'))\npinadc'+Pinanalogin+'.atten(ADC.ATTN_11DB)\n';
  var code = 'pinadc'+Pinanalogin+'.read()'                          
  return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.kcbot_Python_servo = function() {
  var servo =this.getFieldValue("servo") ;
  var angle = Blockly.Python.valueToCode(
    this, 'GOC', Blockly.Python.ORDER_ATOMIC) || '0';
  Blockly.Python.definitions_['from machine import PWM'] =
  'from machine import PWM';    
  Blockly.Python.definitions_['from machine import Pin'] =
  'from machine import Pin';   
  Blockly.Python.definitions_['Servo'+servo+''] =
  'Servo'+servo+'=PWM(Pin('+servo+'),freq=50)';
  var code = 'Servo'+servo+'.duty(int(('+angle+'/180)*115 + 20))\n'                        
  return code;
};