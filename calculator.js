// Name: Colin Tounalom
// Date: 9.3.24
// This is my JavaScript code that makes all of the functions on my webpage
// usable. I have allowed the user to drag either of the color pickers and because
// of that action the hex values will be shown to the user and of course the contrast ratio.
// I have also implemented the ability to change the color of the text and the
// background of the example text box.

function norm(x) {
    if (x <= 0.04045) {
      return x / 12.92;
    } else {
      return ((x + 0.055) / 1.055) ** 2.4;
    }
  }
  
  function hexToNum(hexNum) {
    let r = parseInt(hexNum.substring(1, 3), 16);
    let g = parseInt(hexNum.substring(3, 5), 16);
    let b = parseInt(hexNum.substring(5, 7), 16);
    return {r, g, b};
  }
  
  function lum(r, g, b) {
    return 0.2126 * norm(r / 255) + 0.7152 * norm(g / 255) + 0.0722 * norm(b / 255);
  }
  
  function contrast(lum1, lum2) {
    if (lum1 > lum2) {
      return (lum1 + 0.05) / (lum2 + 0.05);
    } else {
      return (lum2 + 0.05) / (lum1 + 0.05);
    }
  }
  
  // Function to update text color: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
  function updateAll(colorObject) {
    document.querySelectorAll("body").forEach(colorStyle => {
      colorStyle.style.color = colorObject.value;
      console.log(colorObject.value);
    });
  
    updateHex();
    updateColorRatio();
  }
  
  // Function to update preview background color: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
  function updatePreviewBackground(colorBackground) {
    let preview = document.querySelector(".preview");
  
    preview.style.backgroundColor = colorBackground.value;
    console.log(colorBackground.value);
  
    updateColorRatio();
  }
  
  // Function to update hex value displays
  function updateHex() {
    let color1 = document.getElementById("color1");
    let color2 = document.getElementById("color2");
    let hex1 = document.getElementById("hex1");
    let hex2 = document.getElementById("hex2");
  
    hex1.innerHTML = color1.value.toUpperCase();
    hex2.innerHTML = color2.value.toUpperCase();
  
    console.log(hex2.value);
    console.log(hex1.value);
  }
  
  // Function to calculate and update color ratio
  function updateColorRatio() {
    let colorRatio = document.getElementById("color-ratio");
    let color1 = document.getElementById("color1");
    let color2 = document.getElementById("color2");
    let num = document.getElementById("num");
  
    let rgb1 = hexToNum(color1.value);
    let rgb2 = hexToNum(color2.value);
  
    let lum1 = lum(rgb1.r, rgb1.g, rgb1.b);
    let lum2 = lum(rgb2.r, rgb2.g, rgb2.b);
  
    let contrastRatio = contrast(lum1, lum2);
    contrastRatio = Math.floor(contrastRatio * 10) / 10;
  
    if (contrastRatio >= 7) {
      colorRatio.innerHTML = "Great!";
      num.innerHTML = contrastRatio;
    } else if (contrastRatio >= 4.5) {
      colorRatio.innerHTML = "Good";
      num.innerHTML = contrastRatio;
    } else {
      colorRatio.innerHTML = "Poor";
      num.innerHTML = contrastRatio;
    }
    console.log(contrastRatio);
  }
  
  window.onload = function() {
    // References
    let title = document.getElementById("title");
    let color1 = document.getElementById("color1");
    let color2 = document.getElementById("color2");
  
    // This is the title
    title.style = "display: flex; justify-content: center; font-size: 50px;";
  
    // Event listeners, Lauren added the function() to this eventListener
    // from Monday office hours 9 pm
    color1.addEventListener("input", function() {
      updateAll(color1);
    });
    color2.addEventListener("input", function() {
      updatePreviewBackground(color2);
      updateHex();
    });
  };