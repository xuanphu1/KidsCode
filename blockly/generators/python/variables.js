/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Generating Python for variable blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Python.variables');

goog.require('Blockly.Python');


// Blockly.Python['variables_get'] = function(block) {
//   // Variable getter.
//   var code = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
//       Blockly.Variables.NAME_TYPE);
//   return [code, Blockly.Python.ORDER_ATOMIC];
// };
Blockly.Python['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.Python.khongngoac_(block.getFieldValue('VAR'));
  return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_NONE) || '0';
  var varName = Blockly.Python.khongngoac_(block.getFieldValue('VAR'));
  return varName + ' = ' + argument0 + '\n';
};
Blockly.Python['variables_str'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_NONE) || '0';
  var varName = Blockly.Python.khongngoac_(block.getFieldValue('VAR'));
  return varName + ' = ' + argument0 + '\n';
};
// Blockly.Python['variables_str_add'] = function(block) {
//   // Variable setter.
//   var so = Blockly.Python.valueToCode(block, 'add',
//       Blockly.Python.ORDER_NONE) || '0';
//  //var varName = Blockly.Python.khongngoac_(block.getFieldValue('VAR'));
//   code = varName +'['+so+']';
//   return [code, Blockly.Python.ORDER_ATOMIC];
// };
// Blockly.Python['variables_str_add']=function(block){
//   var trig1 = Blockly.Arduino.valueToCode(
//   this, 'add', Blockly.Arduino.ORDER_ATOMIC) || '0';
//   //var argument0 = Blockly.Python.valueToCode(block, 'A', order) || '0';
//   var code = 'sensor.distance_cm('+trig1+','+echo1+')';
//   return [code, Blockly.Python.ORDER_ATOMIC];    
//   }
Blockly.Python['variables_str_add']=function(block){
  var trig1 = Blockly.Arduino.valueToCode(
  this, 'add', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var echo1 = Blockly.Python.valueToCode(block, 'BOOL',
      Blockly.Python.ORDER_LOGICAL_NOT) || 'buff';;
    var code = echo1+'['+trig1+']';
  return [code, Blockly.Python.ORDER_ATOMIC];    
};
// Blockly.Python['logic_negate'] = function(block) {
//   // Negation.
//   var argument0 = Blockly.Python.valueToCode(block, 'BOOL',
//       Blockly.Python.ORDER_LOGICAL_NOT) || 'True';
//   var code = 'not ' + argument0;
//   return [code, Blockly.Python.ORDER_LOGICAL_NOT];
// };