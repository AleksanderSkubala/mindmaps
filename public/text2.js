var width = window.innerWidth;
var height = window.innerHeight;

var stage2 = new Konva.Stage({
  container: "first-canvas",
  width: 0.75 * width,
  height: 0.75 * height
});

var layer2 = new Konva.Layer();
stage2.add(layer2);

var abc1 = new Konva.Text({
  x: 200,
  y: 500,
  text: "Simple Text",
  fontSize: 30,
  fontFamily: "Calibri",
  padding: 5,
  fill: "red",
  draggable: true
});
layer2.add(abc1);

abc1.on("mouseenter", function() {
  stage2.container().style.cursor = "move";
});
abc1.on("mouseleave", function() {
  stage2.container().style.cursor = "default";
});

var abc2 = new Konva.Text({
  x: 600,
  y: 300,
  text: "Simple Text 2",
  fontSize: 30,
  fontFamily: "Calibri",
  padding: 5,
  fill: "blue",
  draggable: true
});
layer2.add(abc2);

abc2.on("mouseenter", function() {
  stage2.container().style.cursor = "move";
});
abc2.on("mouseleave", function() {
  stage2.container().style.cursor = "default";
});

var dashedLine = new Konva.Line({
  stroke: "green",
  strokeWidth: 4
});
layer2.add(dashedLine);

const getPointsText = (el1, el2) => {
  const x1 = el1.x();
  const x2 = el2.x();
  const y1 = el1.y();
  const y2 = el2.y();

  const width1 = el1.width();
  const width2 = el2.width();
  const height1 = el1.height();
  const height2 = el2.height();

  if (x1 < x2) {
    return [
      x1,
      y1 + height1,
      x1 + width1,
      y1 + height1,
      x2,
      y2 + height2,
      x2 + width2,
      y2 + height2
    ];
  } else {
    return [
      x2,
      y2 + height2,
      x2 + width2,
      y2 + height2,
      x1,
      y1 + height1,
      x1 + width1,
      y1 + height1
    ];
  }
};

function updateLine() {
  dashedLine.points(getPointsText(abc1, abc2));
  layer2.batchDraw();
}
updateLine();

abc1.on("dragmove", updateLine);
abc2.on("dragmove", updateLine);
