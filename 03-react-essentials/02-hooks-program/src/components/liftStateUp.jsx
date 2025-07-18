import React, { useState } from 'react';

// 温度转换函数
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

// 辅助函数：尝试将字符串转换为数字，并进行四舍五入
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000; // 保留三位小数
    return rounded.toString();
}

// -------------------------------------------------------------
// 【原始设计 - 未进行状态提升】
// 每个 TemperatureInput 实例独立管理自己的温度状态
// -------------------------------------------------------------

function TemperatureInput({ scale, temperature, onTemperatureChange }) {

    const scaleNames = {
        c: 'Celsius',
        f: 'Fahrenheit'
    };

    const handleChange = (e) => {
        onTemperatureChange(e.target.value);
    };

    return (
        <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}:</legend>
            <input
                value={temperature}
                onChange={handleChange} />
        </fieldset>
    );
}

// 这是一个容器组件，它组合了两个 TemperatureInput
// 但目前，它无法让两个输入框同步
// export default function Calculator() { // <-- 就是这个 Calculator 组件
//     return (
//         <div>
//             <h1>Temperature Converter (Initial - No Lifting)</h1>
//             <TemperatureInput scale="c" />
//             <TemperatureInput scale="f" />
//         </div>
//     );
// }

export default function Calculator() {

    const [temperature, setTemperature] = useState('');
    const [scale, setScale] = useState('c');
    const handleCelsiusChange = (temp) => {
        setTemperature(temp);
        setScale('c');
    }
    const handleFahrenheitChange = (temp) => {
        setTemperature(temp);
        setScale('f');
    }

    const celsius = scale === 'f'
        ? tryConvert(temperature, toCelsius) : temperature;

    const fahrenheit = scale === 'c'
        ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
        <div>
            <h1>Temperature Converter (Lifting)</h1>
            <TemperatureInput scale="c"
            temperature= {celsius}
            onTemperatureChange={handleCelsiusChange} />
            <TemperatureInput scale="f"
            temperature={fahrenheit}
            onTemperatureChange={handleFahrenheitChange} />
        </div>
    );
}


