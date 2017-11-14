export class Div {
    constructor(initFlag) {
        this.div = document.createElement("div");
        this.div1 = document.createElement("div");
        this.div2 = document.createElement("div");
        this.buttonVertical = document.createElement("button");
        this.buttonHorizontal = document.createElement("button");
        this.direction = null;//vertical  or horizontal
        this.init(initFlag);
        this.horizontalEvent();
        this.verticalEvent();
        this.divConfirm();
    }
    init(initFlag) {
        this.div.classList.add("father");
        this.div1.className = "child";
        this.div2.className = "child";
        this.div.appendChild(this.div1);
        this.div.appendChild(this.div2);
        this.div.appendChild(this.buttonHorizontal);
        this.div.appendChild(this.buttonVertical);
        this.buttonHorizontal.classList.add("buttonHorizontal");
        this.buttonHorizontal.innerText = "--";
        this.buttonVertical.innerText = "|";
        this.buttonVertical.classList.add("buttonVertical");
        initFlag && document.body.appendChild(this.div);
    }
    getOffsetTop(dom, dis) {

        var flag = dom.offsetParent.className.indexOf("father") != -1;
        dis += dom.offsetTop;
        if (flag) { return this.getOffsetTop(dom.offsetParent, dis); }
        else return dis;

    }

    getOffsetLeft(dom, dis) {

        var flag = dom.offsetParent.className.indexOf("father") != -1;
        dis += dom.offsetLeft;
        if (flag) { return this.getOffsetLeft(dom.offsetParent, dis); }
        else return dis;

    }
    horizontalEvent() {
        this.buttonHorizontal.onclick = (e) => {
            this.direction = "horizontal";
            var dash = document.createElement("div");
            this.dash = dash;
            dash.className = "dash-horizontal";
            this.div.appendChild(dash);
            var offsetTop = this.getOffsetTop(this.div, 0);
            this.div.onmousemove = (e) => {
                var currentTop = e.clientY - offsetTop;//相对父div的top
                console.log(e.clientY);
                console.log(offsetTop);
                dash.style.top = currentTop + "px";
                var cilentHeight = this.div.clientHeight;
                var topPercent = currentTop / cilentHeight;
                var bottomPercent = 1 - topPercent;
                this.div1.style.height = topPercent * 100 + "%";
                this.div2.style.height = bottomPercent * 100 + "%";
            };
            e.stopPropagation();
        };
    }

    verticalEvent() {
        this.buttonVertical.onclick = (e) => {
            this.direction = "vertical";
            var dash = document.createElement("div");
            this.dash = dash;
            dash.className = "dash-vertical";
            this.div.appendChild(dash);
            var offsetLeft = this.getOffsetLeft(this.div, 0);
            this.div.onmousemove = (e) => {
                var currentLeft = e.clientX - offsetLeft;//相对父div的top
                dash.style.left = currentLeft + "px";
                var clientWidth = this.div.clientWidth;

                var leftPercent = currentLeft / clientWidth;
                var rightPercent = 1 - leftPercent;
                this.div1.style.width = leftPercent * 100 + "%";
                this.div2.style.width = rightPercent * 100 + "%";
            };
            e.stopPropagation();
        };
    }
    divConfirm() {
        var _this = this;
        this.div.onclick = (e) => {
            if (!!_this.dash) {
                _this.div.onmousemove = null;
                _this.div1.style.backgroundColor = _this.randomColor();
                _this.div2.style.backgroundColor = _this.randomColor();
                if (this.direction == "vertical") {
                    this.div1.style.cssFloat = "left";
                    this.div2.style.cssFloat = "left";
                }
                _this.dash.remove();
                _this.dash = null;
                var child1 = new Div(false);
                var child2 = new Div(false);

                _this.div1.appendChild(child1.div);
                _this.div2.appendChild(child2.div);
                _this.buttonVertical.remove();
                _this.buttonHorizontal.remove();
            }
            e.stopPropagation();
        }
    }
    randomColor() {
        return '#' + '0123456789abcdef'.split('').map(function (v, i, a) {
            return i > 5 ? null : a[Math.floor(Math.random() * 16)]
        }).join('');
    }
}
