Blockly.Blocks.io.HUE = '#5CA65C'

Blockly.Blocks['IoT_nhietdo'] = {
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
Blockly.Blocks['IoT_web'] = {
  init: function() {
    this.appendValueInput('text')
        .setCheck(null)
        .appendField("Tạo nút tên");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['IoT_web_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["OFF","0"], ["ON","1"]]), "value");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['IoT_Blynk'] = {
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
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['IoT_Blynk_tran'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gửi lên cổng")
        .appendField(new Blockly.FieldDropdown([["V0","V0"], ["V1","V1"], ["V2","V2"], ["V3","V3"], ["V4","V4"], ["V5","V5"], ["V6","V6"], ["V7","V7"], ["V8","V8"], ["V9","V9"]]), "com")
        this.appendValueInput("y")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField("Dữ liệu");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['IoT_web_kidscode'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Dữ liệu nhận được")
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['IoT_thing'] = {
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
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
}
};
Blockly.Blocks['IoT_sotrungvi'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.kcbot_sotrungvi);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['IoT_tds'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Đọc giá trị TDS tại các chân (A0, D2, D5)')
        .appendField();
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['IoT_tdssai'] = {
  init: function() {
    this.appendValueInput('text')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField("Giá trị sai số");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['IoT_nhietdo'] = {
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
Blockly.Blocks['IoT_hieuchinh'] = {
  init: function() {
    this.appendValueInput('text')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField("Giá trị hiệu chỉnh");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['IoT_trans'] = {
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
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['IoT_123'] = {
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
    this.setColour(Blockly.Blocks.io.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};