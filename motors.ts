/**
 * Blocks for driving the Kitronik Motor Driver Board
 */
//% weight=100 color=#00A654 icon="\uf21c" block="Motor Driver"
namespace kitronik_motor_driver {
	/************************************************************************************************************************************************
	* micro:bit motor driver blocks 
	************************************************************************************************************************************************/
    /*Note that Forward and reverse are slightly arbitrary, as it depends on how the motor is wired...*/
    export enum MotorDirection {
        //% block="forward"
        Forward,
        //% block="reverse"
        Reverse
    }

    export enum Motors {
        //%blockId=kitronik_motordriver_motor_one
        //% block="motor 1"
        Motor1,
        //%blockId=kitronik_motordriver_motor_two
        //% block="motor 2"
        Motor2
    }

    let stepperState = 0;
    let stepSequence: MotorDirection[] = [MotorDirection.Forward, MotorDirection.Reverse, MotorDirection.Reverse, MotorDirection.Forward];
    export let stepperSteps = 200;

	/**
     * Turns on motor specified by eMotors in the direction specified
     * by eDirection, at the requested speed 
     *
	 * @param motor which motor to turn on
	 * @param dir   which direction to go
	 * @param speed how fast to spin the motor
     */
    //% blockId=kitronik_motordriver_motor_on
    //% block="%motor|on direction %dir|speed %speed"
    //% speed.min=0 speed.max=100
    export function motorOn(motor: Motors, dir: MotorDirection, speed: number): void {
        /*first convert 0-100 to 0-1024 (approx) We wont worry about the lsat 24 to make life simpler*/
        let OutputVal = Math.clamp(0, 100, speed) * 10;

        switch (motor) {
            case Motors.Motor1: /*Motor 1 uses Pins 8 and 12*/
                switch (dir) {
                    case MotorDirection.Forward:
                        pins.analogWritePin(AnalogPin.P8, OutputVal);
                        pins.digitalWritePin(DigitalPin.P12, 0); /*Write the low side digitally, to allow the 3rd PWM to be used if required elsewhere*/
                        break
                    case MotorDirection.Reverse:
                        pins.analogWritePin(AnalogPin.P12, OutputVal);
                        pins.digitalWritePin(DigitalPin.P8, 0);
                        break
                }

                break;
            case Motors.Motor2: /*Motor 2 uses Pins 0 and 16*/
                switch (dir) {
                    case MotorDirection.Forward:
                        pins.analogWritePin(AnalogPin.P0, OutputVal);
                        pins.digitalWritePin(DigitalPin.P16, 0); /*Write the low side digitally, to allow the 3rd PWM to be used if required elsewhere*/
                        break
                    case MotorDirection.Reverse:
                        pins.analogWritePin(AnalogPin.P16, OutputVal);
                        pins.digitalWritePin(DigitalPin.P0, 0);
                        break
                }

                break;
        }
    }
	/**
     * Turns off the motor specified by eMotors
     * @param motor :which motor to turn off
     */
    //% blockId=kitronik_motordriver_motor_off
    //%block="turn off %motor"
    export function motorOff(motor: Motors): void {
        switch (motor) {
            case Motors.Motor1:
                pins.digitalWritePin(DigitalPin.P8, 0);
                pins.digitalWritePin(DigitalPin.P12, 0);
                break
            case Motors.Motor2:
                pins.digitalWritePin(DigitalPin.P0, 0);
                pins.digitalWritePin(DigitalPin.P16, 0);
                break
        }
    }

    /**
     * Sets the stepper motor to a chosen angle relative to the start position.
     * @param dir   which direction to go
     * @param angle how far to turn the motor relative to start
     */
    //% blockId=kitronik_stepper_motor_turn_angle
    //% block="stepper turn |%dir|%angle|degrees"
    //% angle.min=1 angle.max=360
    export function stepperMotorTurnAngle(dir: MotorDirection, angle: number): void {
        let angleToSteps = 0;

        //convert angle to motor steps, depends on which stepper is being turned to set the number of steps for a full rotation
        angleToSteps = pins.map(angle, 1, 360, 1, stepperSteps);

        stepperMotorTurnSteps(dir, angleToSteps);
    }

    /**
     * Sets the stepper motor to turn a set number of steps.
     * @param dir   which direction to go
     * @param stepperSteps how many steps to turn the motor
     */
    //% blockId=kitronik_motordriver_stepper_motor_turn_steps
    //% block="stepper turn |%dir|%steps| steps"
    export function stepperMotorTurnSteps(dir: MotorDirection, steps: number): void {
        let stepCount = 0;

        while (stepCount < steps) {
            if (dir == MotorDirection.Forward) {
                // Move the stepper forward by 1 step
                stepperState++;
            } else {
                // Move the stepper backward by 1 step
                stepperState--;
            }

            if (stepperState > 3) {
                // Wrap stepper state down to 0
                stepperState = 0;
            }

            if (stepperState < 0) {
                // Wrap stepper state up to 3
                stepperState = 3;
            }

            if (stepperState % 2 == 0) {
                // Turn Motor1 on in the direction set in stepSequence
                motorOn(Motors.Motor1, stepSequence[stepperState], 100);
                // Set Motor2 to be inactive
                motorOff(Motors.Motor2);
            } else {
                // Turn Motor2 on in the direction set in stepSequence
                motorOn(Motors.Motor2, stepSequence[stepperState], 100);
                // Set Motor1 to be inactive
                motorOff(Motors.Motor1);
            }

            stepCount++;
            basic.pause(50);
        }
    }

    /**
     * Set the number of steps per full rotation for the stepper motor.
     * stepperSteps is defaulted to 200.
     * @param steps number of steps for a full rotation, eg: 200
     */
    //% subcategory=Settings
    //% group=Settings
    //% blockId=kitronik_motordriver_set_stepper_steps
    //% block="stepper has |%steps| steps in one full rotation"
    //% weight=100 blockGap=8
    export function setStepperMotorSteps(steps: number): void {
        kitronik_motor_driver.stepperSteps = steps;
    }
}