let speed = 0
let dv = 5
forever(() => {
    modules.kitronikMotor1.setEnabled(true)
    modules.kitronikMotor2.setEnabled(true)

    modules.kitronikMotor1.setDuty(speed)
    modules.kitronikMotor2.setDuty(1 - speed)

    speed += dv
    if (speed > 100) {
        dv = -5
    } else if (speed < -100) {
        dv = 5
    }
    pause(250)
})