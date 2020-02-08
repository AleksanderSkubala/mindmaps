import Konva from "konva";

let globalStage;
let subject;
let objects = [];

const addSubject = (parent, stage) => {
  globalStage = stage;
  const main = new Konva.Group({
    x: parent.width() / 2,
    y: parent.height() / 2,
    draggable: true,
  });
  parent.add(main);
  subject = main;

  main.on('dragmove', updateLines(parent));
  updateLines(parent);

  const mainTxt = new Konva.Text({
    text: "Subject",
    fontSize: 34,
    fontFamily: "Roboto",
    fill: "#000",
    padding: 10,
  });
  const mainBg = new Konva.Rect({
    width: mainTxt.width(),
    height: mainTxt.height(),
    fill: "#00ff00",
  });

  main.add(mainBg);
  main.add(mainTxt);

  editableText(mainTxt, main, parent, mainBg);
};

const newElement = (parent, stage) => {
  globalStage = stage;
  const main = new Konva.Group({
    x: parent.width() / 2,
    y: parent.height() / 2,
    draggable: true,
  });
  parent.add(main);
  objects.push(main);

  main.on('dragmove', updateLines(parent));
  updateLines(parent);

  const mainTxt = new Konva.Text({
    text: "element",
    fontSize: 22,
    fontFamily: "Roboto",
    fill: "#fff",
    padding: 10,
  });
  const mainBg = new Konva.Rect({
    width: mainTxt.width(),
    height: mainTxt.height(),
    fill: "#0000ff",
  });

  main.add(mainBg);
  main.add(mainTxt);
  stage.draw();

  editableText(mainTxt, main, parent, mainBg);
};

//everything about editting text
const editableText = (txt, group, parent, bg) => {
  //background isn't required
  txt.on("dblclick", () => {
    txt.hide();
    group.setAttr("draggable", false);
    parent.draw();

    const textPosition = txt.absolutePosition();
    const stageBox = globalStage.container().getBoundingClientRect();
    const areaPosition = {
      x: stageBox.left + textPosition.x + txt.padding(),
      y: stageBox.top + textPosition.y + txt.padding(),
    };

    const textarea = document.createElement("textarea");
    textarea.classList.add("nodeTextArea");
    textarea.value = txt.text();
    document.body.appendChild(textarea);
    //position
    textarea.style.left = areaPosition.x + "px";
    textarea.style.top = areaPosition.y + "px";
    //other styles
    textarea.style.width = txt.width() - txt.padding() * 2 + "px";
    textarea.style.height = txt.height() - txt.padding() * 2 + 5 + "px";
    textarea.style.fontSize = txt.fontSize() + "px";
    textarea.style.lineHeight = txt.lineHeight();
    textarea.style.fontFamily = txt.fontFamily();
    textarea.style.textAlign = txt.align();
    textarea.style.color = txt.fill();
    textarea.style.height = textarea.scrollHeight + 3 + "px";

    textarea.focus();

    //fun for closing textarea
    function removeTextarea() {
      textarea.parentNode.removeChild(textarea);
      window.removeEventListener("click", handleOutsideClick);
      txt.show();
      if (bg) {
        bg.width(txt.width());
        bg.height(txt.height());
      }
      group.setAttr("draggable", true);
      parent.draw();
    }

    //end editting by clicking outside of textarea
    function handleOutsideClick(e) {
      if (e.target !== textarea) {
        txt.text(textarea.value);
        removeTextarea();
      }
    }
    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    });

    //end editting by typing
    textarea.addEventListener("keydown", function(e) {
      // hide on enter but don't on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        txt.text(textarea.value);
        removeTextarea();
      }
      // hide on esc
      if (e.keyCode === 27) {
        removeTextarea();
      }
    });

    textarea.addEventListener("keydown", () => {
      const scale = txt.getAbsoluteScale().x;
      textarea.style.width = txt.width() * scale + "px";
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + txt.fontSize() + "px";
    });
  });
};

const attachTransormer = (parent, el, nodeText) => {
  const tr = new Konva.Transformer({
    node: el,
    enabledAnchors: ["middle-left", "middle-right"],
    boundBoxFunc: function(oldBox, newBox) {
      newBox.width = Math.max(30, newBox.width);
      return newBox;
    },
  });

  el.on("transform", function() {
    nodeText.setAttrs({
      width: el.width() * el.scaleX(),
      scaleX: 1,
    });
  });

  parent.add(tr);
  parent.draw();
};

const shortcuts = (parent, stage) => {
  window.addEventListener("keydown", e => {
    if (e.ctrlKey && e.which == 191) {
      newElement(parent, stage);
    }
  });
};

const updateLines = (parent) => {
  const sx = subject.x();
  const sy = subject.y();
  console.log(objects);

  objects.forEach(el => {
    const ex = el.x();
    const ey = el.y();
    const line = new Konva.Arrow({
      stroke: 'black',
      id: el.id,
      fill: 'black'
    });
    line.points([ sx, sy, ex, ey ]);

    parent.add(line);
    // parent.batchDraw();
  });
};

export {
  addSubject,
  attachTransormer,
  shortcuts,
  updateLines,
};
