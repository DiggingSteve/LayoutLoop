export class Div {

    constructor(initFlag) {
        this.div = document.createElement("div");
        this.div1 = document.createElement("div");
        this.div2 = document.createElement("div");
        this.border = document.createElement("div");
        this.buttonVertical = document.createElement("button");
        this.buttonHorizontal = document.createElement("button");
        this.direction = null;//vertical  or horizontal
        this.isEditing=false;
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
        this.div1.appendChild(this.border);
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

        var flag = dom.offsetParent.className.indexOf("father") != -1||dom.offsetParent.className.indexOf("child")>=0;
        dis += dom.offsetTop;
        if (flag) { return this.getOffsetTop(dom.offsetParent, dis); }
        else return dis;

    }

    getOffsetLeft(dom, dis) {

        var flag = dom.offsetParent.className.indexOf("father") != -1||dom.offsetParent.className.indexOf("child")>=0;
        dis += dom.offsetLeft;
        if (flag) { return this.getOffsetLeft(dom.offsetParent, dis); }
        else return dis;

    }
    getRootChild(obj, direction) {
        if (!!obj) {
            if (obj.div1.getAttribute("dir") == direction) {
                return obj;
            }
            if (obj.div1.getAttribute("dir") == direction
                && obj.parent
                && obj.parent.div1.getAttribute("dir") != direction) {
                return this.getRootChild(obj.parent, direction);
            }
            else {
                return this.getRootChild(obj.parent, direction);
            }
        }
    }

    borderDrag() {
        this.border.onmousedown = (e) => {
            var dir = this.div1.getAttribute("dir");
            console.log(dir);
            if (dir === "v") {
                var width =this.div.clientWidth;
                
                var offsetLeft = this.getOffsetLeft(this.div, 0);
                this.verticalDragEvent(width, offsetLeft);
            }
            if (dir == "h") {
                var height = this.div1.clientHeight + this.div2.clientHeight + this.border.clientHeight;

                var offsetTop = this.getOffsetTop(this.div, 0);
                this.horizontalDragEvent(height, offsetTop);
            }
        }
        this.div.onmouseup = () => {
            this.div.onmousemove = null;
        }
    }

    verticalDragEvent(width, offsetLeft) {
        this.div.onmousemove = (e) => {
            var leftPercent = (e.clientX - offsetLeft) / width;
            var rightPercent = 1 - leftPercent ;
            this.div1.style.width = leftPercent * 100 + "%";
            this.div2.style.width = rightPercent * 100 + "%";
            e.stopPropagation();
        }


    }

    horizontalDragEvent(height, offsetTop) {
        this.div.onmousemove = (e) => {
            var topPercent = (e.clientY - offsetTop) / height;
            var bottomPercent = 1 - topPercent ;
            this.div1.style.height = topPercent * 100 + "%";
            this.div2.style.height = bottomPercent * 100 + "%";
            e.stopPropagation();
        }
    }

    horizontalEvent() {
        this.buttonHorizontal.onclick = (e) => {
            this.isEditing=true;
            this.div1.setAttribute("dir", "h");
            this.border.classList.add("border-h");
            this.div.classList.add("cross");
            this.direction = "horizontal";
            // var dash = document.createElement("div");
            // this.dash = dash;
            // dash.className = "dash-horizontal";
            // this.div.appendChild(dash);
            var offsetTop = this.getOffsetTop(this.div, 0);
            this.div.onmousemove = (e) => {
                var currentTop = e.clientY - offsetTop;//相对父div的top
               // dash.style.top = currentTop + "px";
                var clientHeight = this.div.clientHeight;
                var topPercent = currentTop / clientHeight;
                var bottomPercent = 1 - topPercent ;
                this.div1.style.height = topPercent * 100 + "%";
                
                this.div2.style.height = bottomPercent * 100 + "%";
            };
            e.stopPropagation();
        };
    }

    verticalEvent() {
        this.buttonVertical.onclick = (e) => {
            this.isEditing=true;
            this.div1.setAttribute("dir", "v");
            this.border.classList.add("border-v");
            this.div.classList.add("cross");
            this.direction = "vertical";
            // var dash = document.createElement("div");
            // this.dash = dash;
            // dash.className = "dash-vertical";
            // this.div.appendChild(dash);
            var offsetLeft = this.getOffsetLeft(this.div, 0);
            this.div.onmousemove = (e) => {
                console.log(e.clientX);
                console.log(offsetLeft);
                var currentLeft = e.clientX - offsetLeft;//相对父div的top
              //  dash.style.left = currentLeft + "px";
                var clientWidth = this.div.clientWidth;
                var leftPercent = currentLeft / clientWidth;
                var rightPercent = 1 - leftPercent ;
                this.div1.style.width = leftPercent * 100 + "%";
                this.div2.style.width = rightPercent * 100 + "%";
            };
            e.stopPropagation();
        };
    }
    divConfirm() {
        var _this = this;
        this.div.onclick = (e) => {
            this.div.classList.remove("cross");
            
            this.div.onmousemove = null;
            if (this.isEditing) {
                _this.div.onmousemove = null;
                var color = _this.randomColor();
                
                _this.div1.style.background = color;
                _this.div2.style.background = color;

                if (this.direction == "vertical") {
                    this.div1.style.cssFloat = "left";
                    this.div2.style.cssFloat = "left";

                }
                // _this.dash.remove();
                _this.isEditing = false;
                var child1 = new Div(false);
                var child2 = new Div(false);
                child1.parent = this;
                child2.parent = this;
                _this.div1.appendChild(child1.div);
                _this.div2.appendChild(child2.div);
                _this.buttonVertical.remove();
                _this.buttonHorizontal.remove();
            }
            this.borderDrag();
            e.stopPropagation();
        }
    }
    randomColor() {
        return '#' + '0123456789abcdef'.split('').map(function (v, i, a) {
            return i > 5 ? null : a[Math.floor(Math.random() * 16)]
        }).join('');
    }
}
