// go round
input.onButtonPressed(Button.A, () => {
    kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 100);
    kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 100);
})
// go forward
input.onButtonPressed(Button.B, () => {
    kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Reverse, 100);
    kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Forward, 100);
})
// stop
input.onButtonPressed(Button.AB, () => {
    kitronik_motor_driver.motorOff(kitronik_motor_driver.Motors.Motor1);
    kitronik_motor_driver.motorOff(kitronik_motor_driver.Motors.Motor2);
})
