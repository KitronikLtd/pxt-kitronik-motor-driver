let speed = 0
let dv = 5
forever(() => {
    modules.kitronikMotor1.run(speed)
    modules.kitronikMotor2.run(- speed)

    speed += dv
    if (speed > 100) {
        dv = -5
    } else if (speed < -100) {
        dv = 5
    }
    pause(250)
})