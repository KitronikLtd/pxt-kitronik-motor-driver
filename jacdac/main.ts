//% deprecated
namespace kitronik_motor_driver { }

namespace modules {
    /**
     * Motor 1 client
     */
    //% fixedInstance whenUsed block="kitronik motor1"
    export const kitronikMotor1 = new MotorClient("kitronik motor1?device=self")

    /**
     * Motor 2 client
     */
    //% fixedInstance whenUsed block="kitronik motor2"
    export const kitronikMotor2 = new MotorClient("kitronik motor2?device=self")
}

namespace servers {
    class MotorServer extends jacdac.Server {
        motor: kitronik_motor_driver.Motors
        speed: number
        enabled: boolean

        constructor(motor: kitronik_motor_driver.Motors) {
            super(jacdac.SRV_MOTOR)
            this.motor = motor
            this.enabled = false

            kitronik_motor_driver.motorOff(this.motor)
        }

        handlePacket(pkt: jacdac.JDPacket) {
            this.handleRegValue(pkt, jacdac.MotorReg.Reversible, jacdac.MotorRegPack.Reversible, true)
            this.speed = this.handleRegValue(pkt, jacdac.MotorReg.Duty, jacdac.MotorRegPack.Duty, this.speed)
            this.enabled = this.handleRegBool(pkt, jacdac.MotorReg.Enabled, this.enabled)

            this.sync()
        }
        
        sync() {
            if (!this.enabled)
                kitronik_motor_driver.motorOff(this.motor)
            else {
                const direction = this.speed < 0 ? kitronik_motor_driver.MotorDirection.Reverse
                    : kitronik_motor_driver.MotorDirection.Forward
                kitronik_motor_driver.motorOn(this.motor, direction, Math.abs(this.speed))
            }
        }
    }
    jacdac.productIdentifier = 0x31ee311d
    function start() {
        jacdac.startSelfServers(() => [
            new MotorServer(kitronik_motor_driver.Motors.Motor1),
            new MotorServer(kitronik_motor_driver.Motors.Motor2)
        ])
    }
    start()
}