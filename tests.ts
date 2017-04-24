// go round
input.onButtonPressed(Button.A, () => {
    kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, 100);
    kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, 100);
})
// go forward
input.onButtonPressed(Button.B, () => {
    kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 100);
    kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, 100);
})
// stop
input.onButtonPressed(Button.AB, () => {
    kitronik.motorOff(kitronik.Motors.Motor1);
    kitronik.motorOff(kitronik.Motors.Motor2);
})
