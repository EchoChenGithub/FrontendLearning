## 学习简报 - 2024年05月16日

**今日学习时长：5小时**

**学习课程：** 黑马程序员 - 前端Web开发HTML5+CSS3+移动web视频教程 (CSS部分)

**今日完成内容：**

1.  **CSS (层叠样式表) 基础：**
    *   **CSS 简介：** 了解其作用是定义HTML元素的显示样式。
    *   **CSS 引入方式：**
        *   **内部样式表：** 使用 `<style>` 标签包裹在 `<head>` 内。
        *   **外部样式表：** CSS代码写在独立的 `.css` 文件中，通过 `<link rel="stylesheet" href="path/to/file.css">` 引入。 (最常用)
        *   **行内样式：** 直接在HTML元素的 `style` 属性中编写CSS规则 (通常配合JS或特殊情况使用)。

2.  **CSS 基础选择器：**
    *   **标签选择器：** 以HTML标签名作为选择器 (如 `p`, `div`)，选中所有同名标签。
    *   **类选择器：**
        *   定义：`.className { ... }`
        *   使用：`<element class="className anotherClass">`
        *   理解到：一个类可用于多个标签，一个标签也可拥有多个类。
    *   **ID 选择器：**
        *   定义：`#idName { ... }`
        *   使用：`<element id="idName">`
        *   核心规则：ID在单个HTML页面中必须唯一，常配合JavaScript使用。
        *   通过实践解决了ID选择器与类选择器混淆的问题。
    *   **通配符选择器 `*`：** 选中页面所有元素，常用于CSS Reset清除默认样式 (如 `margin: 0; padding: 0; box-sizing: border-box;`)。

3.  **CSS 复合选择器：**
    *   **后代选择器：** `ancestor descendant` (空格隔开)，选中所有层级的后代。
    *   **子代选择器：** `parent > child` (`>`连接)，只选中直接子元素。
    *   **并集选择器：** `selector1, selector2, ...` (逗号隔开)，同时为多个选择器应用样式。
    *   **交集选择器：** `element.class` 或 `.class1.class2` (无空格连接)，选中同时满足所有条件的元素。

4.  **CSS 伪类选择器：**
    *   **鼠标悬停状态 `选择器:hover`：** 当鼠标悬停在元素上时应用样式。
    *   **超链接伪类 (LVHA顺序建议：LoVe HAte)：**
        *   `:link` (访问前)
        *   `:visited` (访问后，样式受限)
        *   `:hover` (鼠标悬停)
        *   `:active` (点击时)

5.  **CSS 三大特性：**
    *   **继承性：** 子级默认继承父级的某些文本相关属性 (如 `color`, `font-*`, `line-height`)。
    *   **层叠性：** 相同属性会覆盖，不同属性会叠加；顺序、来源重要性、特异性决定最终样式。
    *   **优先级 (特异性)：**
        *   理解了 `!important` > 行内样式 > ID > 类/属性/伪类 > 标签/伪元素 > 通配符 > 继承 的基本顺序。
        *   学习了特异性的叠加计算规则 (行内 > ID数量 > 类数量 > 标签数量，从左到右比较)。

6.  **Emmet 语法：** 学习了使用Emmet缩写快速生成HTML结构和CSS代码，以提高编码效率。

7.  **CSS 盒模型与背景、文字属性：**
    *   **尺寸与背景：** 使用 `width`, `height`, `background-color` 设置元素尺寸和背景色。
    *   **文字属性：**
        *   `font-size` (字体大小，理解单位 `px` 及浏览器默认值)
        *   `font-weight` (字体粗细，如 `400` normal, `700` bold)
        *   `font-style` (字体倾斜，如 `normal`, `italic`)
        *   `line-height` (行高，理解其组成及单行文本垂直居中技巧 `height = line-height`)
        *   `font-family` (字体族，理解字体栈和通用字体族如 `sans-serif`)
        *   `font` (字体复合属性，注意顺序和必需值 `font-size`, `font-family`)
        *   `color` (文本颜色，掌握 `rgb`, `rgba`, `#RRGGBB` 等表示法)
    *   **文本修饰属性：**
        *   `text-indent` (首行缩进，如 `2em`)
        *   `text-align` (文本水平对齐，理解其作用于内联内容，以及图片居中技巧)
        *   `text-decoration` (文本装饰线，如 `none`, `underline`)
    *   **背景属性：**
        *   `background-image: url(...)` (背景图)
        *   `background-repeat` (平铺方式：`no-repeat`, `repeat`, `repeat-x`, `repeat-y`)
        *   `background-position` (位置：关键词、数值、百分比)
        *   `background-size` (缩放：`contain`, `cover`, 百分比、数值)
        *   `background-attachment: fixed` (背景图固定)
        *   `background` (复合属性，注意各值顺序及省略值的重置行为，特别是 `position/size` 的 `/` 分隔)

8.  **CSS 显示模式 (`display`)：**
    *   **块级元素 (`block`)：** 独占一行，可设宽高，默认宽为父级100%。
    *   **行内元素 (`inline`)：** 一行共存，尺寸由内容撑开，宽高无效。
    *   **行内块元素 (`inline-block`)：** 一行共存，可设宽高，尺寸默认由内容撑开。
    *   学习了通过 `display` 属性转换这三种基本显示模式。

9.  **浏览器开发者工具：** 学习了使用谷歌浏览器DevTools检查HTML结构、调试CSS样式。

**今日实践与项目：**

*   独立完成并成功还原了两个CSS综合案例：
    1.  **"新闻详情" 页面案例**
    2.  **"CSS 简介" 页面案例**
*   独立完成并成功实现了另外两个CSS综合案例：
    1.  **"热词" 效果案例**
    2.  **"Banner 效果" 案例**

**思考与心得：**

*   **选择器使用策略：** 在使用CSS选择器定位元素时，应尽量避免直接使用宽泛的标签选择器来定义具体样式，而是更多地利用后代关系、子代关系以及类选择器来限定样式的作用范围，以提高代码的可维护性和减少全局污染。
*   通过多个综合案例的实践，加深了对CSS基础属性、选择器和三大特性的理解与应用。
*   熟练使用浏览器开发者工具对于调试CSS问题至关重要。

**明日计划 (预估)：**

*   结构伪类和伪元素选择器、PxCook 软件、盒子模型

---
