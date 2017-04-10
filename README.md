# pxt-kitronik-motor-driver
Blocks that support [Kitronik kits and shields for the micro:bit](https://www.kitronik.co.uk/microbit.html)

## Motors

* turn around

```blocks
input.onButtonPressed(Button.A, () => {
    Kitronik.motorOn(Kitronik.Motors.Motor1, Kitronik.MotorDirection.Forward, 100);
    Kitronik.motorOn(Kitronik.Motors.Motor2, Kitronik.MotorDirection.Reverse, 100);
})
```

* go forward

```blocks
input.onButtonPressed(Button.B, () => {
    kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 100);
    kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, 100);
})
```

* stop both motors when pressing ``A+B``

```blocks
input.onButtonPressed(Button.AB, () => {
    kitronik.motorOff(kitronik.Motors.Motor1);
    kitronik.motorOff(kitronik.Motors.Motor2);
})
```
