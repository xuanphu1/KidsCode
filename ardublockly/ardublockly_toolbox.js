/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview XML toolbox embedded into a JavaScript text string.
 */
'use strict';

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};




var Airsense_toolbox = 
'<sep></sep>' +
'   <category id="Airsense" name="Airsense" colour="#00abd6">' +


        '<block type="AirsenseWriteAnalog">'+
            '<field name="Analog_Pin"> 4 </field>' +
        '</block>' +

        '<block type="AirsenseWriteDigital">'+
            '<field name="Digital_Pin"> 2 </field>' +
        '</block>' +


        '<block type="AirsenseReadAnalog">'+
            '<field name="Analog_Pin"> 4 </field>' +
        '</block>' +

        '<block type="AirsenseReadDigital">'+
            '<field name="Digital_Pin"> 2 </field>' +
        '</block>' +

        '<block type="AirsenseReadDataPMS7003">'+
            '<field name="Port uart"> 1 </field>' +
            '<field name="Port rx"> 33 </field>' +
            '<field name="Baud speed"> 9600 </field>' +
        '</block>' +


        '<block type="AirsenseReadDataBME280">'+
            '<field name="I2C_port_SDA"> 21 </field>' +
            '<field name="I2C_port_SCL"> 22 </field>' +
        '</block>' +

         '<block type="freeRTOS">'+
           
         '</block>' +

        '<block type="AirsenseReadDataPMS7003">'+
            '<field name="Port uart"> 1 </field>' +
            '<field name="Port rx"> 33 </field>' +
            '<field name="Baud speed"> 9600 </field>' +
        '</block>' +

        '<block type="ESP32_wireless">'+

            '<field name="Select"> Wifi </field>' +
         '</block>' +

         '<block type="AirsenseReadDataMHZ14A">'+

         '<field name="Port uart"> 2 </field>' +
         '<field name="Port rx"> 16 </field>' +
         '<field name="Port tx"> 17 </field>' +
         '<field name="Baud speed"> 9600 </field>' +
         '</block>' +

         '<block type = "FormatStringData">'+
        '</block>'+

        '<block type="setUpDS3231">'+
        '<field name="SDA_ds3231"> 21 </field>' +
        '<field name="SCL_ds3231"> 22 </field>' +
        '</block>'+

        '<block type="getDataOfDS3231">'+
        '</block>'+

        '<block type="ConnectMQTT">'+
        '</block>'+

        '<block type = "SendDataMQTT">'+
        '</block>'+


    

            
'</category>';


var kcbot_toolbox=
'<sep></sep>' +
'  <category id="kcbot" name="KC-Bot" colour="#00abd6">' +
//'    <block type="robocarv2"></block>' +
' <block type="kcbot_run_forward">'+
'       <value name="SPEED">'+
'           <block type="math_number">' +
'               <field name="NUM">100</field>' +
'           </block>' +
'       </value>'+
'    </block>' +
'    <block type="kcbot_motor">'+
'       <value name="SPEED">'+
'           <block type="math_number">' +
'               <field name="NUM">100</field>' +
'           </block>' +
'       </value>'+
'    </block>' +
' <block type="kcbot_run_forward_at_sec">'+
'       <value name="SPEED">'+
'           <block type="math_number">' +
'               <field name="NUM">100</field>' +
'           </block>' +
'       </value>'+
'       <value name="sec">'+
'           <block type="math_number">' +
'               <field name="NUM">1</field>' +
'           </block>' +
'       </value>'+
'    </block>' +
'    <block type="kcbot_stop_moving"></block>' +
'    <block type="kcbot_motor_phenikaa">'+
'      <value name="ID">' +
'        <shadow type="math_number">' +
'          <field name="NUM">0</field>' +
'        </shadow>' +
'      </value>' +
'      <value name="SPEED">' +
'        <shadow type="math_number">' +
'          <field name="NUM">0</field>' +
'        </shadow>' +
'      </value>' +
'    </block>' +
'    <block type="kcbot_servo"></block>' +
'    <block type="kcbot_ledrgb">'+
'       <value name="red">'+
'           <block type="math_number">' +
'               <field name="NUM">100</field>' +
'           </block>' +
'       </value>'+
'       <value name="green">'+
'           <block type="math_number">' +
'               <field name="NUM">100</field>' +
'           </block>' +
'       </value>'+
'       <value name="blue">'+
'           <block type="math_number">' +
'               <field name="NUM">100</field>' +
'           </block>' +
'       </value>'+
'    </block>' +
'    <block type="kcbot_Irrecive"></block>' +
'    <block type="kcbot_read_irf"></block>' +
'    <block type="kcbot_read_data_ir">'+
'      <value name="trig">' +
'        <shadow type="math_number">' +
'          <field name="NUM">2</field>' +
'        </shadow>' +
'      </value>' +
'            </block>' +
'    <block type="kcbot_ultrasonic"> '+
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
'    <block type="kcbot_readlm35"></block>' +
'    <block type="kcbot_readDS18b20"></block>' +
'    <block type="kcbot_dht11_humi"></block>' +
'    <block type="kcbot_rtc_set_time"></block>' +
'    <block type="kcbot_rtc_update"></block>' +
'    <block type="kcbot_rtc_read_date"></block>' +
'    <block type="kcbot_rtc_read_time"></block>' +
'    <block type="kcbot_rtc_read"></block>' +

'  </category>';


Ardublockly.TOOLBOX_XML =function(obj){
    if(obj.name.indexOf("kcbot")==-1) kcbot_toolbox="";
    if(obj.name.indexOf("Airsense") == -1) Airsense_toolbox="";
return '<xml>' +
'  <sepgroup gap="36"></sepgroup>' +
'  <category id="catevent" name="Logic" colour="#FFBF00">' +
'    <block type="robocarv2"></block>' +
'    <block type="Arduino_robot"></block>' +
'    <block type="Arduino_start"></block>' +
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
'    <block type="textchar"></block>' +
'    <block type="textkt"></block>' +
'    <block type="text_join"></block>' +
'    <block type="text_append">' +
'      <value name="TEXT">' +
'        <block type="text"></block>' +
'      </value>' +
'    </block>' +
'    <block type="text_length"></block>' +
'    <block type="text_isEmpty"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catVariables" name="Variables" colour="#F58413">' +
'    <block type="variables_get"></block>' +
'    <block type="variables_set"></block>' +
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
'  <category id="catInputOutput" name="Input/Output" colour= "#594AA5">' +
'    <block type="io_digitalwrite">' +
'      <value name="STATE">' +
'        <block type="io_highlow"></block>' +
'      </value>' +
'    </block>' +
'    <block type="io_digitalread"></block>' +
'    <block type="io_analogwrite"></block>' +
'    <block type="io_analogread"></block>' +
'    <block type="io_highlow"></block>' +
'    <block type="io_pulsein">' +
'      <value name="PULSETYPE">' +
'        <shadow type="io_highlow"></shadow>' +
'      </value>' +
'    </block>' +
'    <block type="io_pulsetimeout">' +
'      <value name="PULSETYPE">' +
'        <shadow type="io_highlow"></shadow>' +
'      </value>' +
'      <value name="TIMEOUT">' +
'        <shadow type="math_number">' +
'          <field name="NUM">100</field>' +
'        </shadow>' +
'      </value>'+
'    </block>' +
'  </category>' +
'  <sep></sep>' +
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
'    <block type="time_millis"></block>' +
'    <block type="time_micros"></block>' +
'    <block type="infinite_loop"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catLcd" name="Display" colour="#844957">' +
'    <block type="kcbot_lcd">'+
'      <value name="text">' +
'        <block type="text">' +
'            <field name="NUM">0</field>' +
'        </block>' +
'      </value>' +
'      <value name="x">' +
'        <shadow type="math_number">' +
'          <field name="NUM">0</field>' +
'        </shadow>' +
'      </value>' +
'      <value name="y">' +
'        <shadow type="math_number">' +
'          <field name="NUM">0</field>' +
'        </shadow>' +
'      </value>' +
'    </block>' +
'    <block type="kcbot_lcd_clear"></block>' +


'  </category>' +
'  <sep></sep>' +
'  <category  id="catComms" name="Comms" colour="#5CA65C">' +
'    <block type="serial_setup"></block>' +
'    <block type="kcbot_Serial"></block>' +
'    <block type="serial_print"></block>' +
'    <block type="text_prompt_ext">' +
'      <value name="TEXT">' +
'        <block type="text"></block>' +
'      </value>' +
'    </block>' +
'    <block type="spi_setup"></block>' +
'    <block type="spi_transfer"></block>' +
'    <block type="spi_transfer_return"></block>' +
'  </category>' +
'  <sepgroup gap="36"></sepgroup>' +

kcbot_toolbox+
Airsense_toolbox+
'</xml>';
}