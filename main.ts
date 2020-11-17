// https://www.youtube.com/watch?v=CaD89i2Naoc
// https://www.firialabs.com/blogs/lab-notes/the-joy-of-python-connecting-a-joystick-to-the-micro-bit

const segment_size = 1024 / 5;

function Main () {
    radio.setGroup(252); // Групповой айди для общения джойстика и робота
    while (true) {
        basic.clearScreen(); // Очистить экран
        let val_X = pins.analogReadPin(AnalogPin.P0); // Считать VRX
        let val_Y = pins.analogReadPin(AnalogPin.P1); // Считать VRY
        radio.sendValue("val_X", val_X); // Передать X
        radio.sendValue("val_Y", val_Y);// Передать Y
        let va_SW = pins.digitalReadPin(DigitalPin.P2); // Нажатие джойстика
        // Вывод на экран направления
        let col = val_X / segment_size;
        let row = val_Y / segment_size;
        led.plot(col, row); // Вывод на матрицу направления
        basic.pause(10); // Задержка цикла
    }
}

Main(); // Запуск при старте