# Kitronik blocks for micro:bit

Blocks that support [Kitronik kits and shields for the micro:bit](https://www.kitronik.co.uk/microbit.html)
This package is for the [Motor Driver Board](https://www.kitronik.co.uk/5620-motor-driver-board-for-the-bbc-microbit-v2.html)

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

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

```package
pxt-kitronik-motor-driver=github:KitronikLtd/pxt-kitronik-motor-driver
```
