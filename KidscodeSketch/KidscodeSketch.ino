#include "PMS.h"
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#include <DS3231.h>
#include <MH-Z14A.h>
#include<Arduino.h>

//------PMS7003------

#define RX_PORT_PMS7003  33
#define UART_PORT_PMS7003  1
HardwareSerial SerialPMS(UART_PORT_PMS7003);
PMS pms(SerialPMS);
PMS::DATA dataPMS7003;
//------PMS7003------


int selectDataOfPMS7003(String type_data, PMS::DATA data) {
  int dataPMS7003_value;
  pms.requestRead();
  if (type_data == "PM1" && pms.readUntil(dataPMS7003)) dataPMS7003_value = data.PM_AE_UG_1_0;
  else if (type_data == "PM2.5" && pms.readUntil(dataPMS7003)) dataPMS7003_value = data.PM_AE_UG_2_5;
  else if (type_data == "PM10" && pms.readUntil(dataPMS7003)) dataPMS7003_value = data.PM_AE_UG_10_0;
  return dataPMS7003_value;
}


//------BME280------

#define SEALEVELPRESSURE_HPA (1013.25)
#define BME280_I2C_ADDRESS  0x76
#define I2C_PORT_SDA   21
#define I2C_PORT_SCL   22
Adafruit_BME280 bme;
//------BME280------



int selectDataOfBME280(String data){
  double dataBME;
  if(data == "Nhiệt độ") dataBME = bme.readTemperature() ;
  if(data == "Độ ẩm") dataBME = bme.readHumidity();
  if(data == "Áp suất") dataBME = bme.readPressure();
  return (int)(dataBME);
}


#define SDA_DS3231  21
#define SCL_DS3231  22
DS3231 myRTC;
//------MHZ14A------

#define RX_PORT_MHZ14A  16
#define TX_PORT_MHZ14A  17
#define UART_PORT_MHZ14A  2
HardwareSerial SerialMHZ14A(UART_PORT_MHZ14A);
MHZ14A mhz14a_sensor;
int dataMHZ14A(int data){
  return data;
}
//------MHZ14A------


void setup() {
  //------PMS7003------

  Serial.println("Initializing PMS7003 sensor...");

  SerialPMS.begin( 9600 , SERIAL_8N1, RX_PORT_PMS7003);
  pms.passiveMode();
pms.wakeUp();
delay(3000);
  //------PMS7003------

  //------BME280------

  Serial.println("Initializing BME280 sensor...");
  if (!bme.begin(BME280_I2C_ADDRESS, &Wire)) {
  Serial.println("Could not find a valid BME280 sensor, check wiring!");
  while (1) {
    delay(10);
  }
}
  bme.takeForcedMeasurement();
  //------BME280------

  Wire.begin(SDA_DS3231,SCL_DS3231);
  myRTC.setYear(2022- 2000);
  myRTC.setMonth(1);
  myRTC.setDate(1);
  myRTC.setDoW(1);
  myRTC.setHour(0);
  myRTC.setMinute(0);
  myRTC.setSecond(0);
  //------MHZ14A------

  Serial.println("Initializing MH-Z14A sensor...");

  SerialMHZ14A.begin( 9600 );
  mhz14a_sensor.begin(SerialMHZ14A,Serial,4000);
  mhz14a_sensor.setDebug(true);
  mhz14a_sensor.setAutoCal(0x01, true);
  mhz14a_sensor.setDetectionRange(0x01, mhz14a_sensor.MR_2000);
  //------MHZ14A------

}

void loop() {
  selectDataOfPMS7003("PM1",dataPMS7003);

  selectDataOfBME280("Nhiệt độ");

  dataMHZ14A(mhz14a_sensor.readConcentrationPPM(0x01));

}