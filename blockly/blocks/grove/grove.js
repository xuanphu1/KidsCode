

Blockly.Blocks['robocarv2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.robocarv2);
    this.setNextStatement(true, null);
    this.setColour('#FFBF00');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['kcbot_motor_phenikaa'] = {
  init: function() {
    this.appendValueInput("ID")
        .setCheck("Number")    
        .appendField(Blockly.Msg.kcbot_phenikee_id)
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_phenikee_tien)
        .appendField(new Blockly.FieldDropdown([["Tiến","1"], ["lùi","0"]]), "MOTOR")
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
Blockly.Blocks['kcbot_run_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField()
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_run_forward,"0"], [Blockly.Msg.kcbot_run_back,"1"], [Blockly.Msg.kcbot_run_left,"2"], [Blockly.Msg.kcbot_run_right,"3"]]), "MOTOR")
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
Blockly.Blocks['kcbot_run_forward_at_sec'] = {
  init: function() {
    this.appendDummyInput()
        .appendField()
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_run_forward,"0"], [Blockly.Msg.kcbot_run_back,"1"], [Blockly.Msg.kcbot_run_left,"2"], [Blockly.Msg.kcbot_run_right,"3"]]), "MOTOR")
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
Blockly.Blocks['kcbot_stop_moving'] = {
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
Blockly.Blocks['kcbot_bluetooth'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Điều khiển bluetooth");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['kcbot_ledrgb'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_ledrgb)
        .appendField(new Blockly.FieldDropdown([["Tất cả","7"],["Led 1","0"], ["led 2","1"], ["led 3","2"], ["led 4","3"], ["led 5","4"], ["led 6","5"], ["led 7","6"]]), "slectMode")
        this.appendValueInput("red")
        .setCheck("Number")    
        .appendField(Blockly.Msg.kcbot_ledrgb_red)
        this.appendValueInput("green")
        .setCheck("Number") 
        .appendField(Blockly.Msg.kcbot_ledrgb_green)
        this.appendValueInput("blue")
        .setCheck("Number") 
        .appendField(Blockly.Msg.kcbot_ledrgb_blue)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['kcbot_servo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_servo_setup)
        .appendField(new Blockly.FieldDropdown([["S1","1"], ["S2","0"], ["S3","2"], ["S4","3"]]), "servo")
        .appendField(Blockly.Msg.kcbot_servo_angle)
        .appendField(new Blockly.FieldAngle(90), "angle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['kcbot_tone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_tone_note)
        .appendField(new Blockly.FieldDropdown([["B0","31"],["C1","33"],["D1","37"],["E1","41"],["F1","44"],["G1","49"],["A1","55"],["B1","62"],["C2","65"],["D2","73"],["E2","82"],["F2","87"],["G2","98"],["A2","110"],["B2","123"],["C3","131"],["D3","147"],["E3","165"],["F3","175"],["G3","196"],["A3","220"],["B3","247"],["C4","262"],["D4","294"],["E4","330"],["F4","349"],["G4","392"],["A4","440"],["B4","494"],["C5","523"],["D5","587"],["E5","659"],["F5","698"],["G5","784"],["A5","880"],["B5","988"],["C6","1047"],["D6","1175"],["E6","1319"],["F6","1397"],["G6","1568"],["A6","1760"],["B6","1976"],["C7","2093"],["D7","2349"],["E7","2637"],["F7","2794"],["G7","3136"],["A7","3520"],["B7","3951"],["C8","4186"],["D8","4699"]]), "note")
        .appendField(Blockly.Msg.kcbot_tone)
        .appendField(new Blockly.FieldDropdown([["Halft","500"], ["Phần tư","250"], ["Thứ tám","125"], ["Whole","1000"], ["Double","2000"], ["0","0"]]), "tone");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
}
Blockly.Blocks['kcbot_lcd'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_lcd_dia_chi)
        .appendField(new Blockly.FieldDropdown([["0x27","0x27"], ["0x3F","0x3F"]]), "data")
     this.appendValueInput("text")
         .setCheck(null)
         .appendField(Blockly.Msg.kcbot_lcd_display);
    this.appendValueInput("x")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.kcbot_lcd_pos);
    this.appendValueInput("y")
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#844957");
    this.setTooltip("test");
    this.setHelpUrl("test");
  }
};

Blockly.Blocks['kcbot_lcd_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_lcd_clear);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#844957");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['kcbot_rtc_set_time'] = {
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
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['kcbot_rtc_update'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_rtc_update);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['kcbot_rtc_read_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_rtc_read_time);
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['kcbot_rtc_read_date'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_rtc_read_date);
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['kcbot_readlm35'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_readlm35)
        .appendField(new Blockly.FieldDropdown([["A0","A0"], ["A1","A1"], ["A2","A2"], ["A3","A3"], ["A4","A4"], ["A5","A5"], ["A6","A6"], ["A7","A7"]]), "MOTOR")
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
Blockly.Blocks['kcbot_read_Doam'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_read_Doam)
        .appendField(new Blockly.FieldDropdown([["A0","A0"], ["A1","A1"], ["A2","A2"], ["A3","A3"], ["A4","A4"], ["A5","A5"], ["A6","A6"], ["A7","A7"]]), "MOTOR")
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
Blockly.Blocks['kcbot_dht11_humi'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_dht11_read)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_dht11_humi,"1"], [Blockly.Msg.kcbot_dht11_temp,"2"]]), "MOTOR")
    //this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_dht11_pin)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN')
        //.appendField(Blockly.Msg.ARD_WRITE_TO)
        //.setCheck(Blockly.Types.NUMBER.output);
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour('#00abd6');
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


Blockly.Blocks['kcbot_Irrecive'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("IR");
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
Blockly.Blocks['kcbot_read_irf'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_getIr)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_getIr_k1, '1'], [Blockly.Msg.kcbot_getIr_k2, '2'], [Blockly.Msg.kcbot_getIr_k3, '3'], [Blockly.Msg.kcbot_getIr_k4, '4'], [Blockly.Msg.kcbot_getIr_k5, '5'], [Blockly.Msg.kcbot_getIr_k6, '6'], [Blockly.Msg.kcbot_getIr_k7, '7']]),'STATE1');
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_getIr_key)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_getIr_key_go, '1'], [Blockly.Msg.kcbot_getIr_key_back, '2'], [Blockly.Msg.kcbot_getIr_key_right, '3'], [Blockly.Msg.kcbot_getIr_key_left, '4'], [Blockly.Msg.kcbot_getIr_key_f2, '6'], [Blockly.Msg.kcbot_getIr_key_f4, '7'], [Blockly.Msg.kcbot_getIr_key_f6, '8']]),'STATE2');
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
Blockly.Blocks['kcbot_read_data_ir'] = {
  init: function() {
    this.appendValueInput("trig")
        .setCheck("Number")    
        .appendField(Blockly.Msg.kcbot_read_data_ir)
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

Blockly.Blocks['kcbot_ultrasonic'] = {
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
Blockly.Blocks['kcbot_rtc_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_rtc_read)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.kcbot_rtc_read_hour,"0"], [Blockly.Msg.kcbot_rtc_read_min,"1"], [Blockly.Msg.kcbot_rtc_read_sec,"2"], [Blockly.Msg.kcbot_rtc_read_dayofweek,"3"], [Blockly.Msg.kcbot_rtc_read_date,"4"], [Blockly.Msg.kcbot_rtc_read_month,"5"], [Blockly.Msg.kcbot_rtc_read_year,"6"]]), "value");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['kcbot_Serial'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_Serial_read)
        .appendField();
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.serial.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
},
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['kcbot_apikey'] = {
 init: function() {
    this.appendValueInput("text")
        .setCheck(null)
        .appendField("APIkey gửi:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['kcbot_123'] = {
  init: function() {
    this.appendValueInput('text')
        .setCheck(null)
        .appendField(Blockly.Msg.kcbot_123);
    this.appendValueInput('text1')
        .setCheck(null)
        .appendField(Blockly.Msg.kcbot_mat);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['kcbot_trans'] = {
  init: function() {
    this.appendValueInput('text')
        .setCheck(null)
        .appendField(Blockly.Msg.kcbot_trans_name);
    this.appendValueInput('text1')
        .setCheck(null)
        .appendField(Blockly.Msg.kcbot_trans_pass);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['kcbot_web'] = {
  init: function() {
    this.appendValueInput('text')
        .setCheck(null)
        .appendField("Tạo nút tên");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['kcbot_web_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["OFF","0"], ["ON","1"]]), "value");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['kcbot_Blynk'] = {
  init: function() {
        this.appendValueInput("text")
        .setCheck(null)   
        .appendField(Blockly.Msg.kcbot_Blynk_Api)
        this.appendValueInput("text1")
        .setCheck(null)
        .appendField(Blockly.Msg.kcbot_Blynk_Name)
        this.appendValueInput("text2")
        .setCheck(null)
        .appendField(Blockly.Msg.kcbot_Blynk_Pass)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['kcbot_Blynk_tran'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gửi lên cổng")
        .appendField(new Blockly.FieldDropdown([["V0","V0"], ["V1","V1"], ["V2","V2"], ["V3","V3"], ["V4","V4"], ["V5","V5"], ["V6","V6"], ["V7","V7"], ["V8","V8"], ["V9","V9"]]), "com")
        this.appendValueInput("y")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField("Dữ liệu");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['kcbot_web_kidscode'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Dữ liệu nhận được")
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['kcbot_thing'] = {
 init: function() {
    this.appendValueInput("x")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.kcbot_api);
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_bang)
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["7","7"], ["8","8"]]), "bang")
    this.appendValueInput("text")
        .setCheck(null)
        .appendField(Blockly.Msg.kcbot_Write);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
}
};
Blockly.Blocks['kcbot_sotrungvi'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.kcbot_sotrungvi);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['kcbot_tds'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Đọc giá trị TDS tại các chân (A0, D2, D5)')
        .appendField();
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['kcbot_tdssai'] = {
  init: function() {
    this.appendValueInput('text')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField("Giá trị sai số");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['kcbot_nhietdo'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_nhietdo)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.analogPins), 'PIN');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setColour('#00abd6');
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
  }
};
Blockly.Blocks['kcbot_hieuchinh'] = {
  init: function() {
    this.appendValueInput('text')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField("Giá trị hiệu chỉnh");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['loop_forever'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.loop_forever);
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField(Blockly.Msg.loop_forever_do);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setColour('#FFAB19');
 this.setTooltip("");
 this.setHelpUrl("");
  }
};






Blockly.Blocks['kcbot_motor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_motor_motor)
        .appendField(new Blockly.FieldDropdown([["M1","0"], ["M2","1"]]), "MOTOR")
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

Blockly.Blocks['kcbot_readDS18b20'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_readDS18b20)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN');
            //Blockly.Arduino.Boards.selected.digitalPins_esp32;
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

// ---------------------------------------Airsense----------------------------------------



var Analog_pin_esp32 = [
  ['2', '2'],
  ['4', '4'],
  ['12', '12'],
  ['13', '13'],
  ['14', '14'],
  ['15', '15'],
  ['25', '25'],
  ['26', '26'],
  ['27', '27'],
  ['32', '32'],
  ['33', '33'],
  ['34', '34'],
  ['35', '35'],
  ['36', '36'],
  ['39', '39']
];

var Digital_pin_esp32 = [
  ['2', '2'],
  ['4', '4'],
  ['5', '5'],
  ['15', '15'],
  ['13', '13'],
  ['12', '12'],
  ['14', '14'],
  ['16', '16'],
  ['17', '17'],
  ['18', '18'],
  ['19', '19'],
  ['21', '21'],
  ['22', '22'],
  ['23', '23'],
  ['26', '26'],
  ['27', '27'],
  ['25', '25'],
  ['33', '33'],
  ['32', '32'],
  ['35', '35'],
  ['34', '34'],
  ['36', '36'],
  ['39', '39']
];

var Priority_task_RTOS = [
  ['1', '1'],
  ['2', '2'],
  ['3', '3'],
  ['4', '4'],
  ['5', '5'],
  ['6', '6'],
  ['7', '7'],
  ['8', '8'],
  ['9', '9'],
  ['10', '10'],
  ['11', '11'],
  ['12', '12'],
  ['13', '13'],
  ['14', '14'],
  ['15', '15'],
  ['16', '16'],
  ['17', '17'],
  ['18', '18'],
  ['19', '19'],
  ['20', '20'],
  ['21', '21'],
  ['22', '22'],
  ['23', '23'],
  ['24', '24'],
  ['25', '25']
];

var Day_values = [
  ['1', '1'],
  ['2', '2'],
  ['3', '3'],
  ['4', '4'],
  ['5', '5'],
  ['6', '6'],
  ['7', '7'],
  ['8', '8'],
  ['9', '9'],
  ['10', '10'],
  ['11', '11'],
  ['12', '12'],
  ['13', '13'],
  ['14', '14'],
  ['15', '15'],
  ['16', '16'],
  ['17', '17'],
  ['18', '18'],
  ['19', '19'],
  ['20', '20'],
  ['21', '21'],
  ['22', '22'],
  ['23', '23'],
  ['24', '24'],
  ['25', '25'],
  ['26', '26'],
  ['27', '27'],
  ['28', '28'],
  ['29', '29'],
  ['30', '30'],
  ['31', '31']
];

var Month_values = [
  ['1', '1'],
  ['2', '2'],
  ['3', '3'],
  ['4', '4'],
  ['5', '5'],
  ['6', '6'],
  ['7', '7'],
  ['8', '8'],
  ['9', '9'],
  ['10', '10'],
  ['11', '11'],
  ['12', '12']
];

var Year_values = [
  ['2022', '2022'],
  ['2023', '2023'],
  ['2024', '2024'],
  ['2025', '2025'],
  ['2026', '2026'],
  ['2027', '2027'],
  ['2028', '2028'],
  ['2029', '2029'],
  ['2030', '2030']
];

var WeekDay_values = [
  ['1', '1'],
  ['2', '2'],
  ['3', '3'],
  ['4', '4'],
  ['5', '5'],
  ['6', '6'],
  ['7', '7']
];

var Hour_values = [
  ['0', '0'],
  ['1', '1'],
  ['2', '2'],
  ['3', '3'],
  ['4', '4'],
  ['5', '5'],
  ['6', '6'],
  ['7', '7'],
  ['8', '8'],
  ['9', '9'],
  ['10', '10'],
  ['11', '11'],
  ['12', '12'],
  ['13', '13'],
  ['14', '14'],
  ['15', '15'],
  ['16', '16'],
  ['17', '17'],
  ['18', '18'],
  ['19', '19'],
  ['20', '20'],
  ['21', '21'],
  ['22', '22'],
  ['23', '23']
];

var Minute_values = [
  ['0', '0'],
  ['1', '1'],
  ['2', '2'],
  ['3', '3'],
  ['4', '4'],
  ['5', '5'],
  ['6', '6'],
  ['7', '7'],
  ['8', '8'],
  ['9', '9'],
  ['10', '10'],
  ['11', '11'],
  ['12', '12'],
  ['13', '13'],
  ['14', '14'],
  ['15', '15'],
  ['16', '16'],
  ['17', '17'],
  ['18', '18'],
  ['19', '19'],
  ['20', '20'],
  ['21', '21'],
  ['22', '22'],
  ['23', '23'],
  ['24', '24'],
  ['25', '25'],
  ['26', '26'],
  ['27', '27'],
  ['28', '28'],
  ['29', '29'],
  ['30', '30'],
  ['31', '31'],
  ['32', '32'],
  ['33', '33'],
  ['34', '34'],
  ['35', '35'],
  ['36', '36'],
  ['37', '37'],
  ['38', '38'],
  ['39', '39'],
  ['40', '40'],
  ['41', '41'],
  ['42', '42'],
  ['43', '43'],
  ['44', '44'],
  ['45', '45'],
  ['46', '46'],
  ['47', '47'],
  ['48', '48'],
  ['49', '49'],
  ['50', '50'],
  ['51', '51'],
  ['52', '52'],
  ['53', '53'],
  ['54', '54'],
  ['55', '55'],
  ['56', '56'],
  ['57', '57'],
  ['58', '58'],
  ['59', '59']
];

var Second_values = [
  ['0', '0'],
  ['1', '1'],
  ['2', '2'],
  ['3', '3'],
  ['4', '4'],
  ['5', '5'],
  ['6', '6'],
  ['7', '7'],
  ['8', '8'],
  ['9', '9'],
  ['10', '10'],
  ['11', '11'],
  ['12', '12'],
  ['13', '13'],
  ['14', '14'],
  ['15', '15'],
  ['16', '16'],
  ['17', '17'],
  ['18', '18'],
  ['19', '19'],
  ['20', '20'],
  ['21', '21'],
  ['22', '22'],
  ['23', '23'],
  ['24', '24'],
  ['25', '25'],
  ['26', '26'],
  ['27', '27'],
  ['28', '28'],
  ['29', '29'],
  ['30', '30'],
  ['31', '31'],
  ['32', '32'],
  ['33', '33'],
  ['34', '34'],
  ['35', '35'],
  ['36', '36'],
  ['37', '37'],
  ['38', '38'],
  ['39', '39'],
  ['40', '40'],
  ['41', '41'],
  ['42', '42'],
  ['43', '43'],
  ['44', '44'],
  ['45', '45'],
  ['46', '46'],
  ['47', '47'],
  ['48', '48'],
  ['49', '49'],
  ['50', '50'],
  ['51', '51'],
  ['52', '52'],
  ['53', '53'],
  ['54', '54'],
  ['55', '55'],
  ['56', '56'],
  ['57', '57'],
  ['58', '58'],
  ['59', '59']
];




Blockly.Blocks['AirsenseReadDataBME280'] = {
  init: function() {
  this.appendDummyInput()
      .appendField(Blockly.Msg.AirsenseReadDataBME280)
      .appendField(new Blockly.FieldDropdown([["Nhiệt độ","Nhiệt độ"],["Độ ẩm","Độ ẩm"],["Áp suất","Áp suất"]]), "Type data BME280")
      .appendField("SDA")
      .appendField(new Blockly.FieldDropdown(Digital_pin_esp32), "I2C_port_SDA")
      .appendField("SCL")
      .appendField(new Blockly.FieldDropdown(Digital_pin_esp32), "I2C_port_SCL")
  this.setColour('#00abd6');
  this.setInputsInline(false);
  this.setOutput(true, "Number");
  //this.setNextStatement(true, null);
  //this.setPreviousStatement(true, null);
  this.setTooltip("");
  this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};

  var nameTask = ["Nhiệm vụ 1"];
  var firsPriority = 1 ;

  Blockly.Blocks['freeRTOS'] = {
    init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.freeRTOS)      
        .appendField(new Blockly.FieldTextInput(nameTask), "Name task")
    this.appendDummyInput()
        .appendField("Bộ nhớ task")
        .appendField(new Blockly.FieldDropdown([["128","128"], ["256","256"], ["512","512"],["1024","1024"]]),"Memory task")
        .appendField("Độ ưu tiên")
        .appendField(new Blockly.FieldDropdown(Priority_task_RTOS), "Priority task")
    this.appendValueInput("Text")
        .setCheck(null)
        .appendField("Hàm")
      
    this.setColour('#00abd6');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);


    this.setTooltip("");
    this.setHelpUrl("");
    },
    getBlockType: function() {
      return Blockly.Types.NUMBER;
    },
  };


Blockly.Blocks['AirsenseReadDataPMS7003'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.AirsenseReadDataPMS7003)
        .appendField(new Blockly.FieldDropdown([["PM1","PM1"],["PM2.5","PM2.5"],["PM10","PM10"]]), "Type data PMS7003")
    this.appendDummyInput()
        .appendField("Tốc độ truyền dữ liệu")
        .appendField(new Blockly.FieldDropdown([["9600","9600"],["115200","1152200"]]),"Baud speed")
        .appendField("Cổng UART")
        .appendField(new Blockly.FieldDropdown([["1","1"],["2","2"]]),"Port uart")
        .appendField("Chân RX")
        .appendField(new Blockly.FieldDropdown(Digital_pin_esp32),"Port rx")



    this.setColour('#00abd6');
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip("");
    this.setHelpUrl("");
    },
    getBlockType: function() {
      return Blockly.Types.NUMBER;
    },
}

Blockly.Blocks['ESP32_wireless'] = {
  init: function() {
      var dropdown = new Blockly.FieldDropdown([["Select","Select"],["Wifi","Wifi"],["Bluetooth","Bluetooth"]], function(option) {
          this.updateShape_(option);
      }.bind(this));
      
      this.appendDummyInput()
          .appendField("Lựa chọn kết nối không dây (Wifi/Bluetooth)")
          .appendField(dropdown, "Select");
      
      this.appendDummyInput("WifiInputs")
          .appendField("WiFi Settings")
          .appendField(new Blockly.FieldTextInput("WiFi Name"), "Name_wifi")
          .appendField(new Blockly.FieldTextInput("Password"), "Password")
          .setVisible(false);
      
      this.appendDummyInput("BluetoothInputs")
          .appendField("Bluetooth Settings")
          .appendField(new Blockly.FieldTextInput("Bluetooth Name"), "Name_bluetooth")
          .setVisible(false);
    
      this.setColour('#00abd6');
      this.setInputsInline(false);
      this.setNextStatement(true, null);
      this.setPreviousStatement(true, null);
      this.setTooltip("");
      this.setHelpUrl("");
  },
  onchange: function() {
      var option = this.getFieldValue("Select");
      this.updateShape_(option);
  },
  updateShape_: function(option) {
      var wifiInputs = (option == "Wifi");
      var bluetoothInputs = (option == "Bluetooth");
      
      this.getInput("WifiInputs").setVisible(wifiInputs);
      this.getInput("BluetoothInputs").setVisible(bluetoothInputs);
  },
  getBlockType: function() {
      return Blockly.Types.NUMBER;
  },
}


Blockly.Blocks['setUpDS3231'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Đọc dữ liệu thời gian thực(DS3231)");
    this.appendDummyInput()
        .appendField("Cấu hình chân DS3231")
        .appendField("SDA")
        .appendField(new Blockly.FieldDropdown(Digital_pin_esp32), "SDA_ds3231")
        .appendField("SCL")
        .appendField(new Blockly.FieldDropdown(Digital_pin_esp32), "SCL_ds3231")

    this.appendDummyInput()
        .appendField("Cài đặt thời gian")
        .appendField("Năm")
        .appendField(new Blockly.FieldDropdown(Year_values), "Nam")
        .appendField("Tháng")
        .appendField(new Blockly.FieldDropdown(Month_values), "Thang")
        .appendField("Ngày")
        .appendField(new Blockly.FieldDropdown(Day_values), "Ngay")
        .appendField("Thứ ngày")
        .appendField(new Blockly.FieldDropdown(WeekDay_values), "Thu ngay")
        .appendField("Giờ")
        .appendField(new Blockly.FieldDropdown(Hour_values), "Gio")
        .appendField("Phút")
        .appendField(new Blockly.FieldDropdown(Minute_values), "Phut")
        .appendField("Giây")
        .appendField(new Blockly.FieldDropdown(Second_values), "Giay")

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
    this.setInputsInline(false);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks['getDataOfDS3231'] = {
  init: function(){
    this.appendDummyInput()
        .appendField("Dữ liệu thời gian thực cần lấy (DS3231)")
        .appendField(new Blockly.FieldDropdown([["Năm","Năm"],["Tháng","Tháng"],["Ngày","Ngày"],["Thứ ngày","Thứ ngày"],["Giờ","Giờ"],["Phút","Phút"],["Giây","Giây"]]),'TypeData')
    this.setColour('#00abd6');
    this.setInputsInline(true);
    this.setOutput(true , "Number");
    this.setTooltip("");
    this.setHelpUrl("");
  }
}

Blockly.Blocks['FormatStringData'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gộp dữ liệu");
    this.appendDummyInput()
        .appendField("Số lượng dữ liệu")
        .appendField(new Blockly.FieldDropdown([
          ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"],
          ["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["14","14"],["15","15"]
        ]), "NUM_INPUTS");
    this.setColour('#00abd6');
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setTooltip("");
    this.setHelpUrl("");
    this.updateShape_();
  },
  
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var count = this.getFieldValue('NUM_INPUTS');
    container.setAttribute('inputs', count);
    return container;
  },

  domToMutation: function(xmlElement) {
    var count = parseInt(xmlElement.getAttribute('inputs'), 15);
    this.updateShape_(count);
  },
  
  updateShape_: function(count) {
    if (count === undefined) {
      count = this.getFieldValue('NUM_INPUTS');
    }
    //var inputFields = ['Nhiệt độ', 'Độ ẩm', 'Áp suất', 'PM1', 'PM2.5', 'PM10', 'CO2'];
    
    // Remove existing inputs
    for (var i = 1; i <= 7; i++) {
      if (this.getInput('Text' + i)) {
        this.removeInput('Text' + i);
      }
    }
    
    // Add new inputs
    for (var i = 1; i <= count; i++) {
      this.appendValueInput('Text' + i)
          .setCheck(null)
          .appendField("Tên dữ liêu")
          .appendField(new Blockly.FieldTextInput("text"), "nameData" +  i);
    }
  },
  
  onchange: function(event) {
    if (event.blockId === this.id && event.element === 'field' && event.name === 'NUM_INPUTS') {
      this.updateShape_();
    }
  },

  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
}

Blockly.Blocks['AirsenseReadDataMHZ14A'] =  {
  init: function(){
    this.appendDummyInput()
        .appendField(Blockly.Msg.AirsenseReadDataMHZ14A);
    this.appendDummyInput()
        .appendField("Tốc độ truyền dữ liệu")
        .appendField(new Blockly.FieldDropdown([["9600","9600"],["115200","1152200"]]),"Baud speed")
        .appendField("Cổng UART")
        .appendField(new Blockly.FieldDropdown([["1","1"],["2","2"]]),"Port uart")
        .appendField("Chân RX")
        .appendField(new Blockly.FieldDropdown(Digital_pin_esp32),"Port rx")
        .appendField("Chân TX")
        .appendField(new Blockly.FieldDropdown(Digital_pin_esp32),"Port tx")
    
        this.setColour('#00abd6');
        this.setInputsInline(true);
        this.setOutput(true , "Number");
        this.setTooltip("");
        this.setHelpUrl("");

  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },

}



Blockly.Blocks['ConnectMQTT'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Kết nối MQTT");
    this.appendDummyInput()
        .appendField("IP:")
        .appendField(new Blockly.FieldTextInput("ip mqtt"), "IP");
    this.appendDummyInput()
        .appendField("PORT:")
        .appendField(new Blockly.FieldTextInput("port mqtt"), "PORT");
    this.appendDummyInput()
        .appendField("ID:")
        .appendField(new Blockly.FieldTextInput("ssid mqtt"), "ID");
    this.appendDummyInput()
        .appendField("Password:")
        .appendField(new Blockly.FieldTextInput("password mqtt"), "PassWord");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6'); // assuming you want to use the same color as serial blocks
    this.setTooltip("Connect to MQTT broker");
    this.setHelpUrl("");
  },
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }
    // Check if there's a wifi setup block
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var wifiSetupPresent = false;
    for (var x = 0; x < blocks.length; x++) {
      if (blocks[x].type == 'ESP32_wireless') {
        wifiSetupPresent = true;
        break;
      }
    }
    if (!wifiSetupPresent) {
      this.setWarningText("ConnectMQTT block requires ESP32 wireless setup", 'wifi_setup');
    } else {
      this.setWarningText(null, 'wifi_setup');
    }
  }
};





Blockly.Blocks['SendDataMQTT'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gửi dữ liệu thông qua MQTT");
    this.appendDummyInput()
      .appendField("TOPIC:")
      .appendField(new Blockly.FieldTextInput("topic"), "TOPIC");
    this.appendValueInput("Text")
      .setCheck(null)
      .appendField("Dữ liệu")
    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
    this.setTooltip("");
    this.setHelpUrl("");
  },
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }
    // Check if there's a ConnectMQTT block
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var connectMQTTPresent = false;
    for (var x = 0; x < blocks.length; x++) {
      if (blocks[x].type == 'ConnectMQTT') {
        connectMQTTPresent = true;
        break;
      }
    }
    if (!connectMQTTPresent) {
      this.setWarningText("SendDataMQTT block requires ConnectMQTT setup", 'connect_mqtt');
    } else {
      this.setWarningText(null, 'connect_mqtt');
    }
  }
};

Blockly.Blocks['ReceiveMQTTData']={
  init: function() {
    this.appendDummyInput()
        .appendField("Nhận dữ liệu qua MQTT ")
        .appendField(new Blockly.FieldDropdown([["Nhiệt độ","Nhiệt độ"],["Độ ẩm","Độ ẩm"],["Áp suất","Áp suất"],["PM1","PM1"],["PM2.5","PM2.5"],["PM10","PM10"],["MHZ14A","MHZ14A"]]), "type sensor data")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00abd6');
 this.setTooltip("");
 this.setHelpUrl("");
}
};