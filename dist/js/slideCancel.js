function slideCancel(options) {

  var elemArray = document.querySelectorAll(options.selector || ".weui-cell__cancel");

  for (var index = 0; index < elemArray.length; index++) {
    var $this = (function (elem, options) {
      var startX, startY,  moveWidth, moveHeight;
      var elemWidth = elem.offsetWidth;
      var elemHeight = elem.offsetHeight;
      var parentElem = elem.parentNode;

      options = Object.assign({
        mixOffsetWdith: function(){
          return elemWidth * .6
        },
        ok: function (e) {
          console.log("ok");
        }
      }, options);

      this.reset = reset;

      function reset() {
        moveWidth = 0;
        render();
        document.getElementsByTagName("body")[0].removeEventListener("click", reset);
      }

      function start(event) {
        var touch = event.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
      }
      function move(event) {
        var touch = event.touches[0];
        moveHeight = Math.abs(startY - touch.pageY);
        //有上下移动的时候，判断为用户不是想使用左滑删除功能
        if(moveHeight > 10)
          return;

        moveWidth = startX - touch.pageX;

        if (moveWidth >= elemWidth) {
          moveWidth = elemWidth;
        }
        render();
      }
      function end(event) {
        var touch = event.touches[0];
        if (moveWidth < options.mixOffsetWdith() || moveHeight > elemHeight) {
          moveWidth = 0;
        }else{
          moveWidth = elemWidth;
        }
        render();
        document.getElementsByTagName("body")[0].addEventListener("click", reset);
      }
      function render() {
        console.log("moveWidth:" + moveWidth)
        parentElem.style.transform  =` translateX(${-moveWidth}px)`;
      }
      elem.addEventListener("click", options.ok);
      parentElem.addEventListener("touchstart", start);
      parentElem.addEventListener("touchmove", move);
      parentElem.addEventListener("touchend", end);

      //样式
      elem.style.lineHeight = elem.offsetHeight + "px";

      return this;
    })(elemArray[index], options)
  }
}