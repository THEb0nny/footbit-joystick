// https://www.youtube.com/watch?v=CaD89i2Naoc
// https://www.firialabs.com/blogs/lab-notes/the-joy-of-python-connecting-a-joystick-to-the-micro-bit

const segmentSize = 1024 / 5;
let oldCol = 0, oldRow = 0; // Переменная для хранения позиции старого светодиода

function Main () {
    radio.setGroup(252); // Групповой айди для общения джойстика и робота
    while (true) {
        let j1ValX = pins.analogReadPin(AnalogPin.P1); // Считать VRX джойстика 1
        let j1ValY = Math.map(pins.analogReadPin(AnalogPin.P0), 0, 1023, 1023, 0); // Считать VRY джойстика 1
        let j2ValX = pins.analogReadPin(AnalogPin.P2); // Считать X  джойстика 2, который отвечает за Yaw - рысканье робота
        let j1Btn = pins.digitalReadPin(DigitalPin.P8); // Нажатие джойстика 1
        let j2Btn = pins.digitalReadPin(DigitalPin.P13); // Нажатие джойстика 2
        radio.sendValue("j1ValX", j1ValX); // Передать X джойстика 1
        radio.sendValue("j1ValY", j1ValY); // Передать Y джойстика 1
        radio.sendValue("j2ValX", j1ValX); // Передать X джойстика 2
        radio.sendValue("jBtnL", j1Btn); // Передать состоянии о кнопке левого джойстика
        radio.sendValue("jBtnR", j2Btn); // Передать состоянии о кнопке левого джойстика
        // Вывод на экран направления
        let col = j1ValX / segmentSize, row = j1ValY / segmentSize;
        if (col != oldCol || row != oldRow) { // Если новые значения не совпадают со старыми
            led.unplot(oldCol, oldRow); // Выключить старый светодиод
            led.plot(col, row); // Включить светодиод на матрице
            oldCol = col; // Переписываем старое положение по столбцу
            oldRow = row; // Переписываем старое положение по строке
        }
        basic.pause(10); // Задержка цикла
    }
}

Main(); // Запуск при старте