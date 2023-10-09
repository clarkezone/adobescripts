// c2008 Adobe Systems, Inc. All rights reserved.
// Written by Jeffrey Tranberry

/*
@@@BUILDINFO@@@ Flatten All Masks.jsx 1.0.0.3
*/

/*

// BEGIN__HARVEST_EXCEPTION_ZSTRING

<javascriptresource>
<name>$$$/JavaScripts/FlattenAllMasks/Menu=Arrange Layers</name>
<category>Arrange</category>
<enableinfo>true</enableinfo>
<eventid>e805a6ee-6d75-4b62-b6fe-f5873b5fdf20</eventid>
<terminology><![CDATA[<< /Version 1
                         /Events <<
                          /e805a6ee-6d75-4b62-b6fe-f5873b5fdf20 [($$$/JavaScripts/FlattenAllMasks/Menu=Arrange Layers) /noDirectParam <<
                          >>]
                         >>
                      >> ]]></terminology>
</javascriptresource>

// END__HARVEST_EXCEPTION_ZSTRING

*/

#target photoshop
app.preferences.rulerUnits = Units.PIXELS
if (app.documents.length > 0) {
  var doc = app.activeDocument;

  // Configurations
  var startX = 10;
  var startY = 10;
  var gutter = 10;
  var gridWidth = 180;
  var gridHeight = 180;
  var xPos = startX;
  var yPos = startY;
  var artboardName = "YourArtboardName";

  var layersToProcess = [];

  var artboard = findArtboard(artboardName);
  if (artboard !== null) {
    // Artboard found, process layers inside the artboard
    layersToProcess = artboard.artLayers;
  } else {
    // No artboard found, process top-level layers in the document
    layersToProcess = doc.layers;
  }

  for (var i = 0; i < layersToProcess.length; i++) {
    var layer = layersToProcess[i];

    if (layer.visible) {
      resizeLayer(layer, gridWidth, gridHeight);

      var bounds = layer.bounds;
      var currentX = bounds[0];
      var currentY = bounds[1];

      if (artboard !== null) {
        // If in artboard, adjust for artboard’s position
        currentX += artboard.bounds[0];
        currentY += artboard.bounds[1];
      }

      var deltaX = xPos - currentX;
      var deltaY = yPos - currentY;

      layer.translate(-deltaX, -deltaY);

      xPos += gridWidth + gutter;

      if (xPos + gridWidth > doc.width) {
        xPos = startX;
        yPos += gridHeight + gutter;
      }
    }
  }
} else {
  alert("No document open");
}

function findArtboard(name) {
  for (var i = 0; i < app.activeDocument.layerSets.length; i++) {
    var layerSet = app.activeDocument.layerSets[i];
    if (layerSet.name === name && layerSet.kind === LayerKind.ARTBOARD) {
      return layerSet;
    }
  }
  return null;
}

function resizeLayer(layer, width, height) {
  var bounds = layer.bounds;
  var layerWidth = bounds[2] - bounds[0];
  var layerHeight = bounds[3] - bounds[1];

  var xScale = width / layerWidth;
  var yScale = height / layerHeight;

  layer.resize(xScale * 100, yScale * 100);
}
