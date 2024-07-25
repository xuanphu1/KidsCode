/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.texts.HUE = '#5CA65C';
Blockly.Blocks['bluetooth_setup'] = {
  init: function() {
    this.appendValueInput("text")
        .setCheck(null)
        .appendField(Blockly.Msg.bluetooth_setup);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.texts.HUE);
  this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['bluetooth_read'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(Blockly.Msg.bluetooth_read)
    .appendField();
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.texts.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['bluetooth_write'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_bluetooth_write);
    this.appendValueInput('CONTENT')
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_bluetooth);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SERIAL_PRINT_TIP);
  }
};
Blockly.Blocks['serial_python_print'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.serial), 'SERIAL_ID')
        .appendField(Blockly.Msg.ARD_SERIAL_PRINT);
    this.appendValueInput('CONTENT');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SERIAL_PRINT_TIP);
  }
};
Blockly.Blocks['bluetooth_run'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField("Ngắt Bluetooth với chương trình")
        .appendField(new Blockly.FieldTextInput(''), 'text')
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SERIAL_PRINT_TIP);
  }
};