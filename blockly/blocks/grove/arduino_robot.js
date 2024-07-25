Blockly.Blocks.time.HUE = '#5C81A6';
Blockly.Blocks['Arduino_robot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.Arduino_robot);
    this.setNextStatement(true, null);
    this.setColour('#FFBF00');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Arduino_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.Arduino);
    this.setNextStatement(true, null);
    this.setColour('#FFBF00');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Arduino_robot_motor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.Arduino_robot_motor)
        .appendField(new Blockly.FieldDropdown([["M1","0"], ["M2","1"]]), "MOTOR")
    this.appendDummyInput()
        .appendField(Blockly.Msg.Arduino_robot_motor_ch)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Arduino_robot_motor_stop,"0"],[Blockly.Msg.Arduino_robot_motor_up,"1"], [Blockly.Msg.Arduino_robot_motor_down,"2"]]), "SPIN")
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Arduino_robot_setup'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("Khởi tạo động cơ");
  this.setNextStatement(true, null);
  this.setColour(Blockly.Blocks.time.HUE);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
Blockly.Blocks['Arduino_robot_at_sec'] = {
  init: function() {
//.appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_run_stop,"0"],[Blockly.Msg.kcbot_run_forward,"1"], [Blockly.Msg.kcbot_run_back,"2"], [Blockly.Msg.kcbot_run_left,"3"], [Blockly.Msg.kcbot_run_right,"4"]]), "MOTOR")
    this.appendValueInput("sec")
        .appendField("Chờ trong");
    this.appendDummyInput()
        .appendField(Blockly.Msg.sec);
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Arduino_robot_run_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.Arduino_robot_run)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_run_stop,"0"],[Blockly.Msg.kcbot_run_forward,"1"], [Blockly.Msg.kcbot_run_back,"2"], [Blockly.Msg.kcbot_run_left,"3"], [Blockly.Msg.kcbot_run_right,"4"]]), "MOTOR")
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Arduino_robot_run_forward_at_sec'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.Arduino_robot_run)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_run_stop,"0"],[Blockly.Msg.kcbot_run_forward,"1"], [Blockly.Msg.kcbot_run_back,"2"], [Blockly.Msg.kcbot_run_left,"3"], [Blockly.Msg.kcbot_run_right,"4"]]), "MOTOR")
    this.appendValueInput("sec")
        .appendField(Blockly.Msg.sec);
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Arduino_robot_rtc_set_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_rtc_set_time)
        .appendField(new Blockly.FieldNumber(1, 0, 23, 1), "hour")
        .appendField(":")
        .appendField(new Blockly.FieldNumber(1, 0, 59, 1), "min")
        .appendField(":")
        .appendField(new Blockly.FieldNumber(1, 0, 59, 1), "sec")
        .appendField(Blockly.Msg.kcbot_rtc_set_time_dayofweek )
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_rtc_set_time_sun,"8"], [Blockly.Msg.kcbot_rtc_set_time_mon,"2"], [Blockly.Msg.kcbot_rtc_set_time_tues,"3"], [Blockly.Msg.kcbot_rtc_set_time_wed,"4"], [Blockly.Msg.kcbot_rtc_set_time_thur,"5"], [Blockly.Msg.kcbot_rtc_set_time_fri,"6"], [Blockly.Msg.kcbot_rtc_set_time_sat,"7"]]), "week")
        .appendField(new Blockly.FieldNumber(1, 0, 31, 1), "day")
        .appendField("-")
        .appendField(new Blockly.FieldNumber(1, 0, 12, 1), "month")
        .appendField("-")
        .appendField(new Blockly.FieldNumber(2018, 0, Infinity, 1), "year")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['Arduino_robot_rtc_update'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_rtc_update);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['Arduino_robot_rtc_read_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_rtc_read_time);
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['Arduino_robot_rtc_read_date'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_rtc_read_date);
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['Arduino_robot_readDS18b20'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_readDS18b20)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN');
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Arduino_robot_readlm35'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_readlm35)
        .appendField(new Blockly.FieldDropdown([["A0","A0"], ["A1","A1"], ["A2","A2"], ["A3","A3"], ["A4","A4"], ["A5","A5"], ["A6","A6"], ["A7","A7"]]), "MOTOR")
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Arduino_robot_read_Doam'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_read_Doam)
        .appendField(new Blockly.FieldDropdown([["A0","A0"], ["A1","A1"], ["A2","A2"], ["A3","A3"], ["A4","A4"], ["A5","A5"], ["A6","A6"], ["A7","A7"]]), "MOTOR")
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Arduino_robot_dht11_humi'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_dht11_read)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_dht11_humi,"1"], [Blockly.Msg.kcbot_dht11_temp,"2"]]), "MOTOR")
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_dht11_pin)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN')
        //.appendField(Blockly.Msg.ARD_WRITE_TO)
        //.setCheck(Blockly.Types.NUMBER.output);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
    updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'pwmPins');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Arduino_robot_Irrecive'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("IR");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Arduino_robot_read_irf'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_getIr)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_getIr_k1, '1'], [Blockly.Msg.kcbot_getIr_k2, '2'], [Blockly.Msg.kcbot_getIr_k3, '3'], [Blockly.Msg.kcbot_getIr_k4, '4'], [Blockly.Msg.kcbot_getIr_k5, '5'], [Blockly.Msg.kcbot_getIr_k6, '6'], [Blockly.Msg.kcbot_getIr_k7, '7']]),'STATE1');
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_getIr_key)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_getIr_key_go, '1'], [Blockly.Msg.kcbot_getIr_key_back, '2'], [Blockly.Msg.kcbot_getIr_key_right, '3'], [Blockly.Msg.kcbot_getIr_key_left, '4'], [Blockly.Msg.kcbot_getIr_key_f2, '6'], [Blockly.Msg.kcbot_getIr_key_f4, '7'], [Blockly.Msg.kcbot_getIr_key_f6, '8']]),'STATE2');
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Arduino_robot_read_data_ir'] = {
  init: function() {
    this.appendValueInput("trig")
        .setCheck("Number")    
        .appendField(Blockly.Msg.kcbot_read_data_ir)
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};

Blockly.Blocks['Arduino_robot_ultrasonic'] = {
  init: function() {
    this.appendValueInput("trig")
        .setCheck("Number")    
        .appendField(Blockly.Msg.kcbot_ultrasonic_trig)
    this.appendValueInput("echo")
        .setCheck("Number")    
        .appendField(Blockly.Msg.kcbot_ultrasonic_echo)
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Arduino_robot_rtc_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_rtc_read)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_rtc_read_hour,"0"], [Blockly.Msg.kcbot_rtc_read_min,"1"], [Blockly.Msg.kcbot_rtc_read_sec,"2"], [Blockly.Msg.kcbot_rtc_read_dayofweek,"3"], [Blockly.Msg.kcbot_rtc_read_date,"4"], [Blockly.Msg.kcbot_rtc_read_month,"5"], [Blockly.Msg.kcbot_rtc_read_year,"6"]]), "value");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.time.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};