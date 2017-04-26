function slideCancel(selector, options) {

  var elemArray = document.querySelectorAll(selector || ".weui-cell__cancel");

  for (var index = 0; index < elemArray.length; index++) {
    var $this = (function (elem, options) {
      var startX = 0, moveWidth;
      var elemWidth = elem.offsetWidth;
      var parentElem = elem.parentNode;

      options = Object.assign({
        mixOffsetWdith: function(){
          return elemWidth * .3
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
      }
      function move(event) {
        var touch = event.touches[0];
        moveWidth = startX - touch.pageX;

        if (moveWidth >= elemWidth) {
          moveWidth = elemWidth;
        }
        render();
      }
      function end(event) {
        if (moveWidth < options.mixOffsetWdith()) {
          moveWidth = 0;
        }else{
          moveWidth = elemWidth;
        }
        render();
        document.getElementsByTagName("body")[0].addEventListener("click", reset);
      }
      function render() {
        console.log("moveWidth:" + moveWidth)
        parentElem.style.left = -moveWidth + "px";
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