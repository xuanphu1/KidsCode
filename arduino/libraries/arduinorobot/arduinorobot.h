#ifndef arduinorobot_h
#define arduinorobot_H
#include <Arduino.h>
class arduinorobot
{
  public:
   arduinorobot(bool msg);
  void cauhinh();
  void motor(int b,int a);
  void run(int a);
  private:
  bool _msg;
};
#endif
//Make by Kidscode STEM
//Website: https://kidscode.edu.vn/