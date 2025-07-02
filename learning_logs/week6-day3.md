## 学习简报 - 2024年7月2日

**总学习时长 (此期间合计)：** 约 8 小时

**学习课程/内容：** JS 进阶理论收尾 & “百度外卖”实战项目启动

**核心任务：完成JS核心理论的学习，并立即在大型实战项目中应用所学，重点实践移动端响应式布局与Sass工程化。**

**完成内容与学习点：**

### **第一部分：JavaScript 进阶理论收尾**

1.  **原型 (Prototype) 与 原型链 (Prototype Chain) 深入:**
    *   **`.constructor` 属性:** 掌握了其从原型对象指回构造函数的作用，并实践了在使用对象字面量覆盖原型时**手动修复 `constructor` 指向**的重要技巧。
    *   **“铁三角”关系:** 通过图例和代码，彻底理清了`构造函数`、`实例对象`、`原型对象`三者之间通过 `.prototype`, `.__proto__`, `.constructor` 形成的闭环关系。
    *   **原型链查找规则:** 明确了JS引擎遵循“**先自身 -> 再原型 -> 直至`Object.prototype`**”的链式查找规则。

2.  **`this` 的显式绑定 (`call`/`apply`/`bind`):**
    *   **核心目的:** 理解了这三个方法主要用于**方法借用**和**固定回调函数中的`this`指向**。
    *   **方法辨析:**
        *   `.call()` / `.apply()`: **立即执行**函数，区别在于参数是**逐个传递**还是以**数组形式**传递。
        *   `.bind()` (重点): **不立即执行**，而是**返回一个`this`被永久绑定的新函数**。

3.  **防抖 (Debounce) 与 节流 (Throttle) (理论深入):**
    *   **核心区别:**
        *   **防抖:** 频繁触发，只执行**最后一次**。
        *   **节流:** 频繁触发，**按固定频率**执行。
    *   **闭包的应用 (重点):**
        > 深刻理解了**为什么必须使用闭包**来实现防抖/节流——因为需要一个**私有的、持久化的“记忆单元”(`timer`变量)**，来跨越多次事件调用，管理定时器状态。

### **第二部分：“百度外卖”实战项目启动 (重点)**

通过从零开始搭建项目，将大量理论知识应用到了工程实践中。

4.  **响应式布局方案 (`rem` + 动态JS):**
    *   **技术选型:** 采用 **`rem` 单位** + **JavaScript动态计算 `<html>` 的 `font-size`** 的方案，以实现平滑的、无级的页面缩放。
    *   **JS 动态适配脚本:**
        ```javascript
        function setRemUnit() {
          const designWidth = 640; // 设定设计稿宽度
          const designFontSize = 24; // 设定基准字号
          const screenWidth = document.documentElement.clientWidth;
          const actualFontSize = (screenWidth / designWidth) * designFontSize;
          document.documentElement.style.fontSize = actualFontSize + 'px';
        }
        setRemUnit();
        window.addEventListener('resize', setRemUnit);
        ```
    *   **最佳实践:** 将该脚本放置在HTML的 **`<head>`** 标签内，以**避免页面加载时的布局抖动**。

5.  **Sass/SCSS 工程化实践:**
    *   **文件组织:** 使用 `@import` 规则引入 `normalize.scss` 等基础样式，实现了CSS的模块化。
    *   **`@mixin` (混入) 的应用:**
        > [!TIP]
        > 创建并使用了多个 `@mixin` 来封装可复用的CSS代码块，如 `bgc()`(背景图居中), `wh()`(设置宽高), `center()`(绝对定位居中)等，极大地提高了代码的可维护性和减少了重复。
        ```scss
        // 示例：设置宽高的mixin
        @mixin wh($w, $h) {
          width: px2rem($w);
          height: px2rem($h);
        }
        ```
    *   **单位换算函数:** 解决了在Sass中进行`px`到`rem`单位换算时，因**单位运算**导致的编译错误，掌握了正确的函数实现方式。

6.  **项目静态页面搭建 (Loading / Welcome):**
    *   **HTML 结构:** 完成了加载页和欢迎页的完整HTML结构搭建。
    *   **CSS 实现:** 综合运用 `position: absolute`, `z-index`, 以及封装好的 `@mixin`，完美地实现了设计稿的静态布局和样式。

7.  **第三方库/插件使用 (Swiper.js & Zepto.js):**
    *   **环境搭建:** 在项目中正确引入了 Swiper 和 Zepto 的 JS 库文件。
    *   **初步初始化:** 尝试并成功初始化了 Swiper 实例，并为后续的交互功能（如 `fadeOut`）绑定了事件监听。
    *   **问题排查 (Debugging):** 在实践中，对可能出现的HTML结构错误、CSS引入混乱、JS初始化时机等问题进行了预判和解决。

---

### 🤔 思考与心得

*   **从理论到实践的跨越:** 今天是理论知识向项目实战转化的关键一天。将抽象的`rem`适配方案、Sass工程化思想，具体地应用到一个真实的项目骨架中，这种感觉非常有成就感。
*   **`@mixin`的威力:** 通过封装`mixin`，深刻体会到了CSS预处理器在提升代码复用性和可维护性方面的巨大价值。
*   **工程化思维:** 在项目开始时，就规划好文件结构 (`normalize` -> `base` -> `index`) 和通用工具 (如`px2rem`函数, `@mixin`)，这是良好工程化习惯的体现。

---

### 🚀 后续计划

*   **首要任务:** 继续完成“百度外卖”项目的交互逻辑，特别是 `loading` 页和 `welcome` 页的动画与页面切换效果。
*   **下一步:** 正式开启 **React 框架** 的学习。
