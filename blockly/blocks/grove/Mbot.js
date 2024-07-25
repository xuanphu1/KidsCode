Blockly.Blocks.io.HUE = '#0A8698'
Blockly.Blocks['Mbot_robot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.Mbot_robot);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Mbot_motor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.Mbot_motor_motor)
        .appendField(new Blockly.FieldDropdown([["M1","0"], ["M2","1"]]), "MOTOR")
    this.appendValueInput("SPEED")
        .setCheck("Number")    
        .appendField(Blockly.Msg.Mbot_motor_speed)
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Mbot_run_forward'] = {
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
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Mbot_servo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Cài đặt Servo")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.appendDummyInput()
        .appendField()
        .appendField(new Blockly.FieldDropdown([["chân 1","0"], ["chân 2","1"]]), "Slot")
        .appendField(Blockly.Msg.kcbot_servo_angle)
        .appendField(new Blockly.FieldAngle(90), "angle");
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Mbot_ledrgb'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.kcbot_ledrgb)
        .appendField(new Blockly.FieldDropdown([["Tất cả","2"],["Led trái","0"], ["led phải","1"]]), "slectMode")
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
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Mbot_tone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Phát nhạc nốt")
        .appendField(new Blockly.FieldDropdown([["C1","33"], ["D1","37"], ["E1","41"], ["F1","44"], ["G1","49"], ["A1","55"], ["B1","62"], ["C2","65"], ["D2","73"], ["E2","82"], ["F2","87"], ["G2","98"], ["A2","110"], ["B2","123"], ["C3","131"], ["D3","147"], ["E3","165"], ["F3","175"], ["G3","196"], ["A3","220"], ["B3","247"], ["C4","262"], ["D4","294"], ["E4","330"], ["F4","349"], ["G4","392"]]), "Tone")
        this.appendDummyInput()
        .appendField("beat")
        .appendField(new Blockly.FieldDropdown([["Half","500"], ["Quarter","250"], ["Eighth","125"], ["Whole","1000"], ["Double","2000"]]), "time")
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Mbot_show_face'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Hiển thin mặt")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.appendValueInput("text")
        .setCheck(null)
        .appendField("ký tự:");
    this.appendValueInput("x")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.kcbot_lcd_pos);
    this.appendValueInput("y")
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Mbot_led7seg'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Hiển thị led 7 thanh")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.appendValueInput("SPEED")
        .setCheck("Number")    
        .appendField("số:")
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Mbot_minifan'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Đặt quạt mini")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.appendDummyInput()
        .appendField("blow")
        .appendField(new Blockly.FieldDropdown([["Theo chiều kim đồng hồ","0"], ["Ngược chều kim đồng hồ","1"], ["Dừng lại","2"]]), "Port")
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Mbot_ultrasonic'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("Đọc cảm biến siêu âm tại ")
    .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Mbot_line'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("Đọc cảm biến dò vạch tại ")
    .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Mbot_line_pin'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Đọc cảm biến dò vạch tại")
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.appendDummyInput()
      .appendField()
      .appendField(new Blockly.FieldDropdown([["Mắt trái","0"], ["Mắt phải","1"]]), "Port")
    this.appendDummyInput()
      .appendField("là màu ")
      .appendField(new Blockly.FieldDropdown([["đen","0"], ["trắng","1"]]), "Port")
      this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Mbot_bt'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("Đọc biến trở tại")
    .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Mbot_son_sensor'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Đọc cảm biến âm thanh tại")
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Mbot_nut'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Đọc nút bấm tại ")
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.appendDummyInput()
      .appendField("")
      .appendField(new Blockly.FieldDropdown([["Chân 1","0"], ["Chân 2","1"]]), "Port")    
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Mbot_nhiet_do'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Đọc cảm biến nhiệt độ tại")
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.appendDummyInput()
      .appendField("")
      .appendField(new Blockly.FieldDropdown([["Chân 1","0"], ["Chân 2","1"]]), "Port")    
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Mbot_pir'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Đọc cảm biến PIR tại")
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Mbot_dht11'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Đọc cảm biến DHT11 tại")
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.appendDummyInput()
      .appendField("")
      .appendField(new Blockly.FieldDropdown([["Nhiệt độ","0"], ["Độ ẩm 2","1"]]), "Port")    
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Mbot_lua'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Đọc cảm biến lửa tại")
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['Mbot_gas'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Đọc cảm biến khí gas tại")
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.Mbot_port_1,"0"], [Blockly.Msg.Mbot_port_2,"1"], [Blockly.Msg.Mbot_port_3,"2"], [Blockly.Msg.Mbot_port_4,"3"]]), "Port")
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};