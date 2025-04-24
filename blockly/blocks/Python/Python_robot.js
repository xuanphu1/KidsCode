Blockly.Blocks.time.HUE = '#5C81A6';
Blockly.Blocks['Python_robot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.python_robot);
    this.setNextStatement(true, null);
    this.setColour('#FFBF00');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Python_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.Python_start);
    this.setNextStatement(true, null);
    this.setColour('#FFBF00');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['Python_robot_motor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_motor_motor)
        .appendField(new Blockly.FieldDropdown([["M1","1"], ["M2","2"]]), "MOTOR")
    this.appendValueInput("SPEED")
        .setCheck("Number")    
        .appendField(Blockly.Msg.kcbot_motor_speed)
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Python_run_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField()
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_run_forward,"1"], [Blockly.Msg.kcbot_run_back,"4"], [Blockly.Msg.kcbot_run_left,"3"], [Blockly.Msg.kcbot_run_right,"2"]]), "MOTOR")
    this.appendValueInput("SPEED")
        .setCheck("Number")    
        .appendField(Blockly.Msg.kcbot_run)
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Python_run_forward_at_sec'] = {
  init: function() {
    this.appendDummyInput()
        .appendField()
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_run_forward,"1"], [Blockly.Msg.kcbot_run_back,"4"], [Blockly.Msg.kcbot_run_left,"3"], [Blockly.Msg.kcbot_run_right,"2"]]), "MOTOR")
    this.appendValueInput("SPEED")
        .setCheck("Number")    
        .appendField(Blockly.Msg.kcbot_run)
    this.appendValueInput("sec")
        .setCheck("Number")    
        .appendField(Blockly.Msg.kcbot_run_forward_at_sec)
    this.appendDummyInput()
        .appendField(Blockly.Msg.sec);
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Python_stop_moving'] = {
  init: function() {
    this.appendDummyInput()   
        .appendField(Blockly.Msg.kcbot_stop_moving)
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Python_ultrasonic'] = {
  init: function() {
    this.appendValueInput("trig")
        .setCheck("Number")    
        .appendField(Blockly.Msg.kcbot_ultrasonic_trig)
    this.appendValueInput("echo")
        .setCheck("Number")    
        .appendField(Blockly.Msg.kcbot_ultrasonic_echo)
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Python_run_out_put'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.Python_run_out_put)
        .appendField(new Blockly.FieldDropdown([["2","2"], ["3","3"], ["4","4"], ["5","5"], ["10","10"], ["12","12"], ["13","13"], ["14","14"], ["15","15"], ["16","16"], ["17","17"], ["18","18"], ["19","19"], ["21","21"], ["22","22"], ["23","23"], ["25","25"], ["26","26"], ["27","27"], ["32","32"], ["33","33"]]), "Pinout")
        // this.appendDummyInput()
        .appendField(Blockly.Msg.Python_run_out)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Python_run_out_put_high,"1"], [Blockly.Msg.Python_run_out_put_low,"0"]]), "muc")
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Python_pwm_out_put'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.Python_pwm_out_put)
        .appendField(new Blockly.FieldDropdown([["2","2"], ["3","3"], ["4","4"], ["5","5"], ["10","10"], ["12","12"], ["13","13"], ["14","14"], ["15","15"], ["16","16"], ["17","17"], ["18","18"], ["19","19"], ["21","21"], ["22","22"], ["23","23"], ["25","25"], ["26","26"], ["27","27"], ["32","32"], ["33","33"]]), "Pinout")
    this.appendValueInput("SPEED")
        .setCheck("Number")    
        .appendField(Blockly.Msg.Python_pwm_out)
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Python_digital_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.Python_digital_read)
        .appendField(new Blockly.FieldDropdown([["2","2"], ["3","3"], ["4","4"], ["5","5"], ["10","10"], ["12","12"], ["13","13"], ["14","14"], ["15","15"], ["16","16"], ["17","17"], ["18","18"], ["19","19"], ["21","21"], ["22","22"], ["23","23"], ["25","25"], ["26","26"], ["27","27"], ["32","32"], ["33","33"], ["33","33"], ["34","34"], ["35","35"], ["36","36"], ["37","37"], ["38","38"], ["39","39"]]), "Pinin")
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Python_analog_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.Python_analog_read)
        .appendField(new Blockly.FieldDropdown([["33","33"], ["34","34"], ["35","35"], ["36","36"], ["37","37"], ["38","38"], ["39","39"]]), "Pinanalogin")
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['kcbot_Python_servo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_servo_setup)
        .appendField(new Blockly.FieldDropdown([["S1","27"], ["S2","23"]]), "servo")
    this.appendValueInput("GOC")
        .setCheck("Number")    
        .appendField(Blockly.Msg.kcbot_Python_servo)
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};