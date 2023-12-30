document.addEventListener("DOMContentLoaded", function() {
  function resetAnimation() {
      var marqueeContent = document.getElementById('marquee-content');
      marqueeContent.style.animation = 'none';
      void marqueeContent.offsetWidth;

      // 固定的滾動速度，可以根據需要調整
      var scrollSpeed = 3; // 調整此值以改變滾動速度

      // 設置動畫
      marqueeContent.style.animation = `marquee ${scrollSpeed}s linear infinite 0s`;
      marqueeContent.style.animationTimingFunction = 'linear';
  }

  var marqueeContent = document.getElementById('marquee-content');
  marqueeContent.addEventListener('animationiteration', resetAnimation);
  resetAnimation(); // 在加入事件監聽器後立即調用一次，以確保初始計算
});
