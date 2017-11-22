import { fail } from "assert";

 class Divloop {
    constructor(initFlag) {
        this.direction = null;//vertical  or horizontal
        this.isEditing = false;
        this.hasChild=this.hasChild||false;
        this.initDiv();
        this.initBtn();
        this.organizeDom(initFlag);
        this.horizontalEvent();
        this.verticalEvent();
       
        this.divConfirm();
    }

    // first init
    organizeDom(initFlag) {
        this.div.appendChild(this.div1);
        this.div1.appendChild(this.border);
        this.div.appendChild(this.div2);
        this.div.appendChild(this.btnHorizontal);
        this.div.appendChild(this.btnVertical);
        this.div.appendChild(this.btnCancel);
        initFlag || document.body.appendChild(this.div);
    }

    initDiv() {
        this.div = document.createElement("div");
        this.div1 = document.createElement("div");
        this.div2 = document.createElement("div");
        this.border = document.createElement("div");
        this.div.classList.add("father");
        this.div1.className = "child";
        this.div2.className = "child";
    }

    initBtn() {
        this.btnVertical = document.createElement("i");
        this.btnHorizontal = document.createElement("i");
        this.btnHorizontal.classList.add("iconfont");
        this.btnHorizontal.classList.add("icon-hengxian");
        this.btnVertical.classList.add("iconfont");
        this.btnVertical.classList.add("icon-shu");
        this.btnHorizontal.classList.add("btnHorizontal");
        this.btnVertical.classList.add("btnVertical");
        this.btnCancel = document.createElement("i");
        this.btnCancel.classList.add("btnCancel");
        this.btnCancel.classList.add("btnCancel");
        this.btnCancel.classList.add("iconfont");
        this.btnCancel.classList.add("icon-cross");
    }

    getOffsetTop(dom, dis) {
        var flag = dom.offsetParent.className.indexOf("father") != -1 || dom.offsetParent.className.indexOf("child") >= 0;
        dis += dom.offsetTop;
        if (flag) { return this.getOffsetTop(dom.offsetParent, dis); }
        else return dis;
    }

    getOffsetLeft(dom, dis) {

        var flag = dom.offsetParent.className.indexOf("father") != -1 || dom.offsetParent.className.indexOf("child") >= 0;
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
                var width = this.div.clientWidth;

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
            var rightPercent = 1 - leftPercent;
            this.div1.style.width = leftPercent * 100 + "%";
            this.div2.style.width = rightPercent * 100 + "%";
            e.stopPropagation();
        }


    }

    horizontalDragEvent(height, offsetTop) {
        this.div.onmousemove = (e) => {
            var topPercent = (e.clientY - offsetTop) / height;
            var bottomPercent = 1 - topPercent;
            this.div1.style.height = topPercent * 100 + "%";
            this.div2.style.height = bottomPercent * 100 + "%";
            e.stopPropagation();
        }
    }

    cancelEvent(){
        this.btnCancel.onclick=(e)=>{
            console.log(this.div);
            if(!!this.parent) this.parent.div.appendChild(this.parent.btnCancel);
            this.resetChild.apply(this);
            
            e.stopPropagation();
        }

    }
    //***btn cancel bubble issue active the root parent but I  need the closest parent
    getParentDivObj(){
        if(this.hasChild) return this.getParentDivObj.apply(this.child1);
        else return this;
    }

    resetChild(){
        if (!this.hasChild) return  ;
        this.child1.div.remove();
        this.child2.div.remove();
        this.div.appendChild(this.btnHorizontal);
        this.div.appendChild(this.btnVertical);
        this.border.classList.remove("border-v");
        this.border.classList.remove("border-h");
        this.div1.style.background="transparent";
        this.div2.style.background="transparent";
        this.div1.style.width="100%";
        this.div2.style.width="100%";
        this.div1.style.height="100%";
        this.div2.style.height="100%";
        this.hasChild=false;
        this.btnCancel.style.opacity=0;
    }

    horizontalEvent() {
        this.btnHorizontal.onclick = (e) => {
            this.isEditing = true;
            this.div1.setAttribute("dir", "h");
            this.border.classList.add("border-h");
            this.div.classList.add("cross");
            this.direction = "horizontal";
            var offsetTop = this.getOffsetTop(this.div, 0);
            this.div.onmousemove = (e) => {
                var currentTop = e.clientY - offsetTop;//相对父div的top
                var clientHeight = this.div.clientHeight;
                var topPercent = currentTop / clientHeight;
                var bottomPercent = 1 - topPercent;
                this.div1.style.height = topPercent * 100 + "%";
                this.div2.style.height = bottomPercent * 100 + "%";
            };
            e.stopPropagation();
        };
    }

    verticalEvent() {
        this.btnVertical.onclick = (e) => {
            this.isEditing = true;
            this.div1.setAttribute("dir", "v");
            this.border.classList.add("border-v");
            this.div.classList.add("cross");
            this.direction = "vertical";
            var offsetLeft = this.getOffsetLeft(this.div, 0);
            this.div.onmousemove = (e) => {
                var currentLeft = e.clientX - offsetLeft;//相对父div的top
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
        this.div.onclick = (e) => {
            this.div.classList.remove("cross");
            this.div.onmousemove = null;
            if (this.isEditing) {
                this.div.onmousemove = null;
                var color = this.randomColor();
                this.div1.style.background = color;
                this.div2.style.background = color;
                if (this.direction == "vertical") {
                    this.div1.style.cssFloat = "left";
                    this.div2.style.cssFloat = "left";
                }
                this.isEditing = false;
                var child1 = new Divloop(true);
                var child2 = new Divloop(true);
                this.child1=child1;
                this.child2=child2;
                child1.parent = this;
                child2.parent = this;
                this.div1.appendChild(child1.div);
                this.div2.appendChild(child2.div);
                this.btnVertical.remove();
                this.btnHorizontal.remove();
                
                this.hasChild=true;
                this.btnCancel.style.opacity="1";
                if(!!this.parent) this.parent.btnCancel.remove();
                this.cancelEvent();
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

export default Divloop;