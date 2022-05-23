// https://www.youtube.com/watch?v=CaD89i2Naoc
// https://www.firialabs.com/blogs/lab-notes/the-joy-of-python-connecting-a-joystick-to-the-micro-bit

const segment_size = 1024 / 5;

function Main () {
    radio.setGroup(252); // Групповой айди для общения джойстика и робота
    while (true) {
        basic.clearScreen(); // Очистить экран
        let jValX = pins.analogReadPin(AnalogPin.P0); // Считать VRX
        let jValY = pins.analogReadPin(AnalogPin.P1); // Считать VRY
        let jBtnL = pins.digitalReadPin(DigitalPin.P2); // Нажатие джойстика
        let jBtnR = pins.digitalReadPin(DigitalPin.P3); // Нажатие джойстика
        radio.sendValue("jValX", jValX); // Передать X
        radio.sendValue("jValY", jValY); // Передать Y
        radio.sendValue("jBtnL", jBtnL); // Передать состоянии о нажатии левого джойстика
        radio.sendValue("jBtnR", jBtnR); // Передать состоянии о нажатии левого джойстика
        // Вывод на экран направления
        let col = jValX / segment_size, row = jValY / segment_size;
        led.plot(col, row); // Вывод на матрицу направления
        basic.pause(10); // Задержка цикла
    }
}

Main(); // Запуск при старте