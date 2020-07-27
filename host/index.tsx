// @ts-nocheck

function test(val) {
  alert(val);
  // creates a text layer
  var activeComp = app.project.activeItem;
  var textLayer = activeComp.layers.addText(val);

  var position = textLayer
    .property("ADBE Transform Group")
    .property("ADBE Position");

  position.expression = wiggleExpression;
}
