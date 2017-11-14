(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Div = exports.Div = function () {
    function Div(initFlag) {
        _classCallCheck(this, Div);

        this.div = document.createElement("div");
        this.div1 = document.createElement("div");
        this.div2 = document.createElement("div");
        this.buttonVertical = document.createElement("button");
        this.buttonHorizontal = document.createElement("button");
        this.direction = null;
        this.init(initFlag);
        this.horizontalEvent();
        this.verticalEvent();
        this.divConfirm();
    }

    _createClass(Div, [{
        key: "init",
        value: function init(initFlag) {
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
    }, {
        key: "getOffsetTop",
        value: function getOffsetTop(dom, dis) {

            var flag = dom.offsetParent.className.indexOf("father") != -1;
            dis += dom.offsetTop;
            if (flag) {
                return this.getOffsetTop(dom.offsetParent, dis);
            } else return dis;
        }
    }, {
        key: "getOffsetLeft",
        value: function getOffsetLeft(dom, dis) {

            var flag = dom.offsetParent.className.indexOf("father") != -1;
            dis += dom.offsetLeft;
            if (flag) {
                return this.getOffsetLeft(dom.offsetParent, dis);
            } else return dis;
        }
    }, {
        key: "horizontalEvent",
        value: function horizontalEvent() {
            var _this2 = this;

            this.buttonHorizontal.onclick = function (e) {
                _this2.direction = "horizontal";
                var dash = document.createElement("div");
                _this2.dash = dash;
                dash.className = "dash-horizontal";
                _this2.div.appendChild(dash);
                var offsetTop = _this2.getOffsetTop(_this2.div, 0);
                _this2.div.onmousemove = function (e) {
                    var currentTop = e.clientY - offsetTop;
                    console.log(e.clientY);
                    console.log(offsetTop);
                    dash.style.top = currentTop + "px";
                    var cilentHeight = _this2.div.clientHeight;
                    var topPercent = currentTop / cilentHeight;
                    var bottomPercent = 1 - topPercent;
                    _this2.div1.style.height = topPercent * 100 + "%";
                    _this2.div2.style.height = bottomPercent * 100 + "%";
                };
                e.stopPropagation();
            };
        }
    }, {
        key: "verticalEvent",
        value: function verticalEvent() {
            var _this3 = this;

            this.buttonVertical.onclick = function (e) {
                _this3.direction = "vertical";
                var dash = document.createElement("div");
                _this3.dash = dash;
                dash.className = "dash-vertical";
                _this3.div.appendChild(dash);
                var offsetLeft = _this3.getOffsetLeft(_this3.div, 0);
                _this3.div.onmousemove = function (e) {
                    var currentLeft = e.clientX - offsetLeft;
                    dash.style.left = currentLeft + "px";
                    var clientWidth = _this3.div.clientWidth;

                    var leftPercent = currentLeft / clientWidth;
                    var rightPercent = 1 - leftPercent;
                    _this3.div1.style.width = leftPercent * 100 + "%";
                    _this3.div2.style.width = rightPercent * 100 + "%";
                };
                e.stopPropagation();
            };
        }
    }, {
        key: "divConfirm",
        value: function divConfirm() {
            var _this4 = this;

            var _this = this;
            this.div.onclick = function (e) {
                if (!!_this.dash) {
                    _this.div.onmousemove = null;
                    _this.div1.style.backgroundColor = _this.randomColor();
                    _this.div2.style.backgroundColor = _this.randomColor();
                    if (_this4.direction == "vertical") {
                        _this4.div1.style.cssFloat = "left";
                        _this4.div2.style.cssFloat = "left";
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
            };
        }
    }, {
        key: "randomColor",
        value: function randomColor() {
            return '#' + '0123456789abcdef'.split('').map(function (v, i, a) {
                return i > 5 ? null : a[Math.floor(Math.random() * 16)];
            }).join('');
        }
    }]);

    return Div;
}();

},{}],2:[function(require,module,exports){
'use strict';

var _divloop = require('./divloop');

window.Div = _divloop.Div;

},{"./divloop":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMC4yQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyY1xcZGl2bG9vcC5qcyIsInNyY1xcbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBYSxHLFdBQUEsRztBQUNULGlCQUFZLFFBQVosRUFBc0I7QUFBQTs7QUFDbEIsYUFBSyxHQUFMLEdBQVcsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVg7QUFDQSxhQUFLLElBQUwsR0FBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLGFBQUssSUFBTCxHQUFZLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0EsYUFBSyxjQUFMLEdBQXNCLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUF0QjtBQUNBLGFBQUssZ0JBQUwsR0FBd0IsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQXhCO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsYUFBSyxJQUFMLENBQVUsUUFBVjtBQUNBLGFBQUssZUFBTDtBQUNBLGFBQUssYUFBTDtBQUNBLGFBQUssVUFBTDtBQUNIOzs7OzZCQUNJLFEsRUFBVTtBQUNYLGlCQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLFFBQXZCO0FBQ0EsaUJBQUssSUFBTCxDQUFVLFNBQVYsR0FBc0IsT0FBdEI7QUFDQSxpQkFBSyxJQUFMLENBQVUsU0FBVixHQUFzQixPQUF0QjtBQUNBLGlCQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLEtBQUssSUFBMUI7QUFDQSxpQkFBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixLQUFLLElBQTFCO0FBQ0EsaUJBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsS0FBSyxnQkFBMUI7QUFDQSxpQkFBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixLQUFLLGNBQTFCO0FBQ0EsaUJBQUssZ0JBQUwsQ0FBc0IsU0FBdEIsQ0FBZ0MsR0FBaEMsQ0FB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QUNBLDBCQUFNLElBQU4sQ0FBVyxXQUFYLENBQXVCLE9BQU8sR0FBOUI7QUFDQSwwQkFBTSxjQUFOLENBQXFCLE1BQXJCO0FBQ0EsMEJBQU0sZ0JBQU4sQ0FBdUIsTUFBdkI7QUFDSDtBQUNELGtCQUFFLGVBQUY7QUFDSCxhQXBCRDtBQXFCSDs7O3NDQUNhO0FBQ1YsbUJBQU8sTUFBTSxtQkFBbUIsS0FBbkIsQ0FBeUIsRUFBekIsRUFBNkIsR0FBN0IsQ0FBaUMsVUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQjtBQUM3RCx1QkFBTyxJQUFJLENBQUosR0FBUSxJQUFSLEdBQWUsRUFBRSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsRUFBM0IsQ0FBRixDQUF0QjtBQUNILGFBRlksRUFFVixJQUZVLENBRUwsRUFGSyxDQUFiO0FBR0g7Ozs7Ozs7OztBQ3BITDs7QUFHQSxPQUFPLEdBQVAiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNsYXNzIERpdiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0RmxhZykge1xyXG4gICAgICAgIHRoaXMuZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0aGlzLmRpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHRoaXMuZGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdGhpcy5idXR0b25WZXJ0aWNhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgdGhpcy5idXR0b25Ib3Jpem9udGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IG51bGw7Ly92ZXJ0aWNhbCAgb3IgaG9yaXpvbnRhbFxyXG4gICAgICAgIHRoaXMuaW5pdChpbml0RmxhZyk7XHJcbiAgICAgICAgdGhpcy5ob3Jpem9udGFsRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnZlcnRpY2FsRXZlbnQoKTtcclxuICAgICAgICB0aGlzLmRpdkNvbmZpcm0oKTtcclxuICAgIH1cclxuICAgIGluaXQoaW5pdEZsYWcpIHtcclxuICAgICAgICB0aGlzLmRpdi5jbGFzc0xpc3QuYWRkKFwiZmF0aGVyXCIpO1xyXG4gICAgICAgIHRoaXMuZGl2MS5jbGFzc05hbWUgPSBcImNoaWxkXCI7XHJcbiAgICAgICAgdGhpcy5kaXYyLmNsYXNzTmFtZSA9IFwiY2hpbGRcIjtcclxuICAgICAgICB0aGlzLmRpdi5hcHBlbmRDaGlsZCh0aGlzLmRpdjEpO1xyXG4gICAgICAgIHRoaXMuZGl2LmFwcGVuZENoaWxkKHRoaXMuZGl2Mik7XHJcbiAgICAgICAgdGhpcy5kaXYuYXBwZW5kQ2hpbGQodGhpcy5idXR0b25Ib3Jpem9udGFsKTtcclxuICAgICAgICB0aGlzLmRpdi5hcHBlbmRDaGlsZCh0aGlzLmJ1dHRvblZlcnRpY2FsKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbkhvcml6b250YWwuY2xhc3NMaXN0LmFkZChcImJ1dHRvbkhvcml6b250YWxcIik7XHJcbiAgICAgICAgdGhpcy5idXR0b25Ib3Jpem9udGFsLmlubmVyVGV4dCA9IFwiLS1cIjtcclxuICAgICAgICB0aGlzLmJ1dHRvblZlcnRpY2FsLmlubmVyVGV4dCA9IFwifFwiO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uVmVydGljYWwuY2xhc3NMaXN0LmFkZChcImJ1dHRvblZlcnRpY2FsXCIpO1xyXG4gICAgICAgIGluaXRGbGFnICYmIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5kaXYpO1xyXG4gICAgfVxyXG4gICAgZ2V0T2Zmc2V0VG9wKGRvbSwgZGlzKSB7XHJcblxyXG4gICAgICAgIHZhciBmbGFnID0gZG9tLm9mZnNldFBhcmVudC5jbGFzc05hbWUuaW5kZXhPZihcImZhdGhlclwiKSAhPSAtMTtcclxuICAgICAgICBkaXMgKz0gZG9tLm9mZnNldFRvcDtcclxuICAgICAgICBpZiAoZmxhZykgeyByZXR1cm4gdGhpcy5nZXRPZmZzZXRUb3AoZG9tLm9mZnNldFBhcmVudCwgZGlzKTsgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRpcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T2Zmc2V0TGVmdChkb20sIGRpcykge1xyXG5cclxuICAgICAgICB2YXIgZmxhZyA9IGRvbS5vZmZzZXRQYXJlbnQuY2xhc3NOYW1lLmluZGV4T2YoXCJmYXRoZXJcIikgIT0gLTE7XHJcbiAgICAgICAgZGlzICs9IGRvbS5vZmZzZXRMZWZ0O1xyXG4gICAgICAgIGlmIChmbGFnKSB7IHJldHVybiB0aGlzLmdldE9mZnNldExlZnQoZG9tLm9mZnNldFBhcmVudCwgZGlzKTsgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIGRpcztcclxuXHJcbiAgICB9XHJcbiAgICBob3Jpem9udGFsRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5idXR0b25Ib3Jpem9udGFsLm9uY2xpY2sgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgICAgICAgICB2YXIgZGFzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGFzaCA9IGRhc2g7XHJcbiAgICAgICAgICAgIGRhc2guY2xhc3NOYW1lID0gXCJkYXNoLWhvcml6b250YWxcIjtcclxuICAgICAgICAgICAgdGhpcy5kaXYuYXBwZW5kQ2hpbGQoZGFzaCk7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXRUb3AgPSB0aGlzLmdldE9mZnNldFRvcCh0aGlzLmRpdiwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGl2Lm9ubW91c2Vtb3ZlID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VG9wID0gZS5jbGllbnRZIC0gb2Zmc2V0VG9wOy8v55u45a+554i2ZGl255qEdG9wXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLmNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2Zmc2V0VG9wKTtcclxuICAgICAgICAgICAgICAgIGRhc2guc3R5bGUudG9wID0gY3VycmVudFRvcCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIHZhciBjaWxlbnRIZWlnaHQgPSB0aGlzLmRpdi5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9wUGVyY2VudCA9IGN1cnJlbnRUb3AgLyBjaWxlbnRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgYm90dG9tUGVyY2VudCA9IDEgLSB0b3BQZXJjZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXYxLnN0eWxlLmhlaWdodCA9IHRvcFBlcmNlbnQgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGl2Mi5zdHlsZS5oZWlnaHQgPSBib3R0b21QZXJjZW50ICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2ZXJ0aWNhbEV2ZW50KCkge1xyXG4gICAgICAgIHRoaXMuYnV0dG9uVmVydGljYWwub25jbGljayA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG4gICAgICAgICAgICB2YXIgZGFzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGFzaCA9IGRhc2g7XHJcbiAgICAgICAgICAgIGRhc2guY2xhc3NOYW1lID0gXCJkYXNoLXZlcnRpY2FsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZGl2LmFwcGVuZENoaWxkKGRhc2gpO1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0TGVmdCA9IHRoaXMuZ2V0T2Zmc2V0TGVmdCh0aGlzLmRpdiwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGl2Lm9ubW91c2Vtb3ZlID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50TGVmdCA9IGUuY2xpZW50WCAtIG9mZnNldExlZnQ7Ly/nm7jlr7nniLZkaXbnmoR0b3BcclxuICAgICAgICAgICAgICAgIGRhc2guc3R5bGUubGVmdCA9IGN1cnJlbnRMZWZ0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsaWVudFdpZHRoID0gdGhpcy5kaXYuY2xpZW50V2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxlZnRQZXJjZW50ID0gY3VycmVudExlZnQgLyBjbGllbnRXaWR0aDtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodFBlcmNlbnQgPSAxIC0gbGVmdFBlcmNlbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpdjEuc3R5bGUud2lkdGggPSBsZWZ0UGVyY2VudCAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXYyLnN0eWxlLndpZHRoID0gcmlnaHRQZXJjZW50ICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGRpdkNvbmZpcm0oKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmRpdi5vbmNsaWNrID0gKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCEhX3RoaXMuZGFzaCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZGl2Lm9ubW91c2Vtb3ZlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIF90aGlzLmRpdjEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gX3RoaXMucmFuZG9tQ29sb3IoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmRpdjIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gX3RoaXMucmFuZG9tQ29sb3IoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpdjEuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpdjIuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLmRhc2gucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kYXNoID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZDEgPSBuZXcgRGl2KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZDIgPSBuZXcgRGl2KGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kaXYxLmFwcGVuZENoaWxkKGNoaWxkMS5kaXYpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZGl2Mi5hcHBlbmRDaGlsZChjaGlsZDIuZGl2KTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmJ1dHRvblZlcnRpY2FsLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYnV0dG9uSG9yaXpvbnRhbC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJhbmRvbUNvbG9yKCkge1xyXG4gICAgICAgIHJldHVybiAnIycgKyAnMDEyMzQ1Njc4OWFiY2RlZicuc3BsaXQoJycpLm1hcChmdW5jdGlvbiAodiwgaSwgYSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaSA+IDUgPyBudWxsIDogYVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNildXHJcbiAgICAgICAgfSkuam9pbignJyk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGl2IH0gZnJvbSAnLi9kaXZsb29wJ1xyXG5cclxuXHJcbndpbmRvdy5EaXYgPSBEaXY7XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19

//# sourceMappingURL=maps/main.js.map
