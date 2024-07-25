/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview XML toolbox embedded into a JavaScript text string.
 */
'use strict';

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};


Ardublockly.TOOLBOX_XML_PYTHON =function() {
  return '<xml>' +
  '  <sepgroup gap="36"></sepgroup>' +
  '  <category id="catevent" name="Logic" colour="#FFBF00">' +
  '    <block type="Python_robot"></block>' +
  '    <block type="Python_start"></block>' +
  // '    <block type="Arduino_start"></block>' +
  // '    <block type="controls_if"></block>' +
  // '    <block type="logic_compare"></block>' +
  // '    <block type="logic_operation"></block>' +
  // '    <block type="logic_negate"></block>' +
  // '    <block type="logic_boolean"></block>' +
  // '    <block type="logic_null"></block>' +
  // '    <block type="logic_ternary"></block>' +
  '  </category>' +
  '  <sep></sep>' +
  '  <category id="catcontrol" name="Loops" colour="#FFAB19">' +
  '    <block type="controls_if"></block>' +
  '    <block type="logic_ternary"></block>' +
  '    <block type="loop_forever"></block>' +
  '    <block type="controls_repeat_ext">' +
  '      <value name="TIMES">' +
  '        <block type="math_number">' +
  '          <field name="NUM">10</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="controls_whileUntil"></block>' +
  '    <block type="controls_for">' +
  '      <value name="FROM">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  '        </block>' +
  '      </value>' +
  '      <value name="TO">' +
  '        <block type="math_number">' +
  '          <field name="NUM">10</field>' +
  '        </block>' +
  '      </value>' +
  '      <value name="BY">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="controls_flow_statements"></block>' +
  '  </category>' +
  '  <sep></sep>' +
  '  <category id="catMath" name="Math" colour="#59C059">' +
  '    <block type="math_arithmetic"></block>' +
  '    <block type="logic_compare"></block>' +
  '    <block type="logic_operation"></block>' +
  '    <block type="logic_negate"></block>' +
  '    <block type="logic_boolean"></block>' +
  '    <block type="logic_null"></block>' +
  '    <block type="math_single"></block>' +
  '    <block type="math_trig"></block>' +
  '    <block type="math_constant"></block>' +
  '    <block type="math_number_property"></block>' +
  '    <block type="math_change">' +
  '      <value name="DELTA">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="math_round"></block>' +
  '    <block type="math_modulo"></block>' +
  '    <block type="math_constrain">' +
  '      <value name="LOW">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  '        </block>' +
  '      </value>' +
  '      <value name="HIGH">' +
  '        <block type="math_number">' +
  '          <field name="NUM">100</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="math_random_int">' +
  '      <value name="FROM">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  '        </block>' +
  '      </value>' +
  '      <value name="TO">' +
  '        <block type="math_number">' +
  '          <field name="NUM">100</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="math_random_float"></block>' +
  '    <block type="base_map"></block>' +
  '  </category>' +
  '  <sep></sep>' +
  '  <category id="catdata" name="Text" colour="#E49CDC">' +
  '    <block type="math_number"></block>' +
  '    <block type="text"></block>' +
  // '    <block type="textchar"></block>' +
  // '    <block type="textkt"></block>' +
  '    <block type="text_join"></block>' +
  '    <block type="text_append">' +
  '      <value name="TEXT">' +
  '        <block type="text"></block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="text_length"></block>' +
  '    <block type="text_isEmpty"></block>' +
  // '    <!--block type="text_trim"></block Need to update block -->' +
  // '    <!--block type="text_print"></block Part of the serial comms -->' +
  '  </category>' +
  '  <sep></sep>' +
  '  <category id="catVariables" name="Variables" colour="#F58413">' +
  '    <block type="variables_get"></block>' +
  '    <block type="variables_set"></block>' +
  '    <block type="variables_str"></block>' +
  '    <block type="variables_str_add"></block>' +
  '    <block type="variables_set">' +
  '      <value name="VALUE">' +
  '        <block type="variables_set_type"></block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="variables_set_type"></block>' +
  '    <block type="textbien"></block>' +
  '  </category>' +
  '  <sep></sep>' +
  '  <category id="catFunctions" name="Functions" custom="PROCEDURE" colour="#FF6680">' +
  '   </category>' +
  '  <sep></sep>' +
  // '  <category id="catInputOutput" name="Input/Output" colour= "#594AA5">' +
  // '    <block type="io_digitalwrite">' +
  // '      <value name="STATE">' +
  // '        <block type="io_highlow"></block>' +
  // '      </value>' +
  // '    </block>' +
  // '    <block type="io_digitalread"></block>' +
  // // '    <block type="io_builtin_led">' +
  // // '      <value name="STATE">' +
  // // '        <block type="io_highlow"></block>' +
  // // '      </value>' +
  // // '    </block>' +
  // '    <block type="io_analogwrite"></block>' +
  // '    <block type="io_analogread"></block>' +
  // '    <block type="io_highlow"></block>' +
  // '    <block type="io_pulsein">' +
  // '      <value name="PULSETYPE">' +
  // '        <shadow type="io_highlow"></shadow>' +
  // '      </value>' +
  // '    </block>' +
  // '    <block type="io_pulsetimeout">' +
  // '      <value name="PULSETYPE">' +
  // '        <shadow type="io_highlow"></shadow>' +
  // '      </value>' +
  // '      <value name="TIMEOUT">' +
  // '        <shadow type="math_number">' +
  // '          <field name="NUM">100</field>' +
  // '        </shadow>' +
  // '      </value>'+
  // '    </block>' +
  // '  </category>' +
  // '  <sep></sep>' +
  '  <category id="catTime" name="Time" colour="#00CC66">' +
  '    <block type="time_delay">' +
  '      <value name="DELAY_TIME_MILI">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1000</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="time_delaymicros">' +
  '      <value name="DELAY_TIME_MICRO">' +
  '        <block type="math_number">' +
  '          <field name="NUM">100</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  // '    <block type="time_millis"></block>' +
  // '    <block type="time_micros"></block>' +
  // '    <block type="infinite_loop"></block>' +
  '  </category>' +
  '  <sep></sep>' +
  // '  <category id="catAudio" name="Audio" colour="#5C68A6">' +
  // '    <block type="io_tone">' +
  // '      <field name="TONEPIN">0</field>' +
  // '      <value name="FREQUENCY">' +
  // '        <shadow type="math_number">' +
  // '          <field name="NUM">220</field>' +
  // '        </shadow>' +
  // '      </value>' +
  // '    </block>' +
  // '    <block type="io_notone"></block>' +
  // '  </category>' +
  // '  <sep></sep>' +
  // '  <category id="catLcd" name="Display" colour="#844957">' +
  // '    <block type="kcbot_lcd">'+
  // '      <value name="text">' +
  // '        <block type="text">' +
  // '            <field name="NUM">0</field>' +
  // '        </block>' +
  // '      </value>' +
  // '      <value name="x">' +
  // '        <shadow type="math_number">' +
  // '          <field name="NUM">0</field>' +
  // '        </shadow>' +
  // '      </value>' +
  // '      <value name="y">' +
  // '        <shadow type="math_number">' +
  // '          <field name="NUM">0</field>' +
  // '        </shadow>' +
  // '      </value>' +
  // '    </block>' +
  // '    <block type="kcbot_lcd_clear"></block>' +
  // '  </category>' +
  // '  <sep></sep>' +
  // '  <category id="catMotors" name="Motors" colour="#768E3B">' +
  // '    <block type="servo_write">' +
  // '      <value name="SERVO_ANGLE">' +
  // '        <block type="math_number">' +
  // '          <field name="NUM">90</field>' +
  // '        </block>' +
  // '      </value>' +
  // '    </block>' +
  // '    <block type="servo_read"></block>' +
  // '    <block type="stepper_config">' +
  // '      <field name="STEPPER_NUMBER_OF_PINS">2</field>' +
  // '      <field name="STEPPER_PIN1">1</field>' +
  // '      <field name="STEPPER_PIN2">2</field>' +
  // '      <value name="STEPPER_STEPS">' +
  // '        <block type="math_number">' +
  // '          <field name="NUM">100</field>' +
  // '        </block>' +
  // '      </value>' +
  // '      <value name="STEPPER_SPEED">' +
  // '        <block type="math_number">' +
  // '          <field name="NUM">10</field>' +
  // '        </block>' +
  // '      </value>' +
  // '    </block>' +
  // '    <block type="stepper_step">' +
  // '      <value name="STEPPER_STEPS">' +
  // '        <block type="math_number">' +
  // '          <field name="NUM">10</field>' +
  // '        </block>' +
  // '      </value>' +
  // '    </block>' +
  // '  </category>' +
  // '  <sep></sep>' +
  '  <category  id="catComms" name="Comms" colour="#5CA65C">' +
  '    <block type="bluetooth_setup">'+
  '      <value name="text">' +
  '        <block type="text">' +
  '            <field name="NUM">0</field>' +
  '        </block>' +
  '      </value>' +
  '    </block>' +
  '    <block type="bluetooth_read"></block>' +
  '    <block type="bluetooth_write"></block>' +
  '    <block type="bluetooth_run"></block>' +
  '    <block type="serial_python_print"></block>' +
  // '    <block type="text_prompt_ext">' +
  // '      <value name="TEXT">' +
  // '        <block type="text"></block>' +
  // '      </value>' +
  // '    </block>' +
  // '    <block type="spi_setup"></block>' +
  // '    <block type="spi_transfer"></block>' +
  // '    <block type="spi_transfer_return"></block>' +
  '  </category>' +
'  <sepgroup gap="36"></sepgroup>' +
'  <category id="KC-Bot 02" name= "KC-Bot 02" colour="#5C81A6">' +
'    <block type="Python_robot_motor">'+
'       <value name="SPEED">'+
'           <block type="math_number">' +
'               <field name="NUM">500</field>' +
'           </block>' +
'       </value>'+
'    </block>' +
' <block type="Python_run_forward">' +
'       <value name="SPEED">'+
'           <block type="math_number">' +
'               <field name="NUM">500</field>' +
'           </block>' +
'       </value>'+
'    </block>' +
' <block type="Python_run_forward_at_sec">'+
'       <value name="SPEED">'+
'           <block type="math_number">' +
'               <field name="NUM">500</field>' +
'           </block>' +
'       </value>'+
'       <value name="sec">'+
'           <block type="math_number">' +
'               <field name="NUM">1</field>' +
'           </block>' +
'       </value>'+
'    </block>' +
'    <block type="Python_stop_moving"></block>' +
'    <block type="Python_ultrasonic"> '+
'      <value name="trig">' +
'        <shadow type="math_number">' +
'          <field name="NUM">2</field>' +
'        </shadow>' +
'      </value>' +
'      <value name="echo">' +
'        <shadow type="math_number">' +
'          <field name="NUM">12</field>' +
'        </shadow>' +
'      </value>' +
'       </block>'+
'    <block type="Python_run_out_put"></block>' +
'    <block type="Python_pwm_out_put">'+
'       <value name="SPEED">'+
'           <block type="math_number">' +
'               <field name="NUM">500</field>' +
'           </block>' +
'       </value>'+
'    </block>' +
'    <block type="Python_digital_read"></block>' +
'    <block type="Python_analog_read"></block>' +
'    <block type="kcbot_Python_servo">' +
'       <value name="GOC">'+
'           <block type="math_number">' +
'               <field name="NUM">90</field>' +
'           </block>' +
'       </value>'+
'    </block>' +
  '  </category>';
}