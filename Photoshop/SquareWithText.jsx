// c2008 Adobe Systems, Inc. All rights reserved.
// Written by Jeffrey Tranberry

/*
@@@BUILDINFO@@@ Flatten All Masks.jsx 1.0.0.3
*/

/*

// BEGIN__HARVEST_EXCEPTION_ZSTRING

<javascriptresource>
<name>$$$/JavaScripts/SquareWithText/Menu=SquareWithText</name>
<category>Create</category>
<enableinfo>true</enableinfo>
<eventid>e805a6ee-6d75-4b62-b6fe-f5873b5fdf20</eventid>
<terminology><![CDATA[<< /Version 1
                         /Events <<
                          /e805a6ee-6d75-4b62-b6fe-f5873b5fdf20 [($$$/JavaScripts/SquareWithText/Menu=SquareWithText) /noDirectParam <<
                          >>]
                         >>
                      >> ]]></terminology>
</javascriptresource>

// END__HARVEST_EXCEPTION_ZSTRING

*/

// Function to convert hex to RGB
function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [r, g, b];
}

// Check if there is an active document
if (app.documents.length > 0) {
  var doc = app.activeDocument;

  // Create a new layer for the square
  var squareLayer = doc.artLayers.add();
  squareLayer.name = "Colored Square";

  // Set the dimensions for the square
  var left = 100;
  var top = 100;
  var right = 300;
  var bottom = 300;
  var selectionBounds = [[left, top], [right, top], [right, bottom], [left, bottom]];

  // Make a selection and fill it with color using HEX
  doc.selection.select(selectionBounds);
  var squareColor = new SolidColor();
  var squareRgb = hexToRgb("C5D20A");
  squareColor.rgb.red = squareRgb[0];
  squareColor.rgb.green = squareRgb[1];
  squareColor.rgb.blue = squareRgb[2];
  doc.selection.fill(squareColor);
  doc.selection.deselect();

  // Create a text layer
  var textLayer = doc.artLayers.add();
  textLayer.kind = LayerKind.TEXT;
  textLayer.name = "Centered Text";

  // Set the text properties
  var textItem = textLayer.textItem;
  textItem.contents = "DC";
  textItem.justification = Justification.CENTER;
  textItem.position = [((right - left) / 2 + left), ((bottom - top) / 2 + top)];
  textItem.size = 20;
  textItem.font = "ArialMT";

  // Set the text color using HEX
  var textColor = new SolidColor();
  var textRgb = hexToRgb("FFFFFF");
  textColor.rgb.red = textRgb[0];
  textColor.rgb.green = textRgb[1];
  textColor.rgb.blue = textRgb[2];
  textItem.color = textColor;

  // Ensure the text layer is above the square layer
  textLayer.move(squareLayer, ElementPlacement.PLACEBEFORE);

  // Group the layers for tidiness
  var groupLayers = [textLayer, squareLayer];
  var group = doc.layerSets.add();
  group.name = "Square with Text";
  for (var i = 0; i < groupLayers.length; i++) {
    groupLayers[i].move(group, ElementPlacement.INSIDE);
  }
}
