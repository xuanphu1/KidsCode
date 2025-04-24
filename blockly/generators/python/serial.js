Blockly.Python.bluetooth_setup = function() {
    var text =Blockly.Python.valueToCode(
        this, 'text', Blockly.Python.ORDER_ATOMIC) || '""';
    Blockly.Python.definitions_['from KC_bot_lib import BLEUART'] =
    'from KC_bot_lib import BLEUART'; 
    Blockly.Python.definitions_['import bluetooth'] =
    'import bluetooth'; 
    Blockly.Python.definitions_['ble'] =
    'ble = bluetooth.BLE()'; 
    Blockly.Python.definitions_['ble_uart'] =
    'ble_uart = BLEUART(ble,name='+text+')\n'; 
    var code = '';                                 
    return code;
  };
Blockly.Python['bluetooth_read']=function(block){
      var code = 'ble_uart.read().decode().strip()\n';
    return [code, Blockly.Python.ORDER_ATOMIC];    
};
Blockly.Python['bluetooth_write']=function(block){
  var content = Blockly.Python.valueToCode(
    block, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '0';
    var code = 'ble_uart.write('+content+')\n';
    return code; 
};
Blockly.Python['serial_python_print'] = function(block) {
    var content = Blockly.Python.valueToCode(
        block, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '0';
      var code = 'print(' + content + ');\n';
    return code;
  };
Blockly.Python['bluetooth_run'] = function(block) {
  var text = Blockly.Python.khongngoac_(block.getFieldValue('text'))
  var code = 'ble_uart.irq(handler=' + text + ');\n';
return code;
  };  