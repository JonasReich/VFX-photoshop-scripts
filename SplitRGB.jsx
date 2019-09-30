// Split RGB channels of selected Layers into individual layers
//
// Copyright (c) 2019 Jonas Reich

main();

function main() {
	if (activeDocument.mode == DocumentMode.RGB)
	{
		var selectedLayers = getSelectedLayers();

		activeDocument.selection.deselect();
		
		var layers = activeDocument.artLayers;
		
		fillColor = new SolidColor;
		fillColor.rgb.red = 0;
		fillColor.rgb.green = 0;
		fillColor.rgb.blue = 0;
		
		for (var i = 0; i < selectedLayers.length; i++)
		{
			var sourceLayer = selectedLayers[i];
			sourceLayer.visible = false;			
			
			// Start with 3rd color channel so the output is in "right" order
			for (var j = 2; j >= 0; j--)
			{
				activeDocument.activeLayer = sourceLayer;
				var newLayer = layers.add();
				if(j == 0)
					var suffix = "R";
				else
					var suffix = j == 1 ? "G" : "B";
				
				newLayer.name = sourceLayer.name + " - " + suffix;
				activeDocument.selection.selectAll();
				newLayer.visible = false;
				activeDocument.activeLayer = sourceLayer;
				activeDocument.activeChannels = [activeDocument.channels[j]];
				activeDocument.selection.copy();
				activeDocument.selection.deselect();
				activeDocument.activeLayer = newLayer;
				activeDocument.activeChannels = [activeDocument.channels[0], activeDocument.channels[1], activeDocument.channels[2]];
				activeDocument.paste();
			}
		}
		
		activeDocument.selection.deselect();
	}
}

function getSelectedLayers() {
  var resultLayers=new Array();

	try {
		var idGrp = stringIDToTypeID( "groupLayersEvent" );
		var descGrp = new ActionDescriptor();
		var refGrp = new ActionReference();

		refGrp.putEnumerated(charIDToTypeID( "Lyr " ),charIDToTypeID( "Ordn" ),charIDToTypeID( "Trgt" ));
		descGrp.putReference(charIDToTypeID( "null" ), refGrp );
		executeAction( idGrp, descGrp, DialogModes.NO );

		for (var ix=0; ix < app.activeDocument.activeLayer.layers.length; ix++)
		{
			resultLayers.push(app.activeDocument.activeLayer.layers[ix]);
		}

		var id8 = charIDToTypeID( "slct" );
		var desc5 = new ActionDescriptor();
		var id9 = charIDToTypeID( "null" );
		var ref2 = new ActionReference();
		var id10 = charIDToTypeID( "HstS" );
		var id11 = charIDToTypeID( "Ordn" );
		var id12 = charIDToTypeID( "Prvs" );

		ref2.putEnumerated( id10, id11, id12 );
		desc5.putReference( id9, ref2 );
		executeAction( id8, desc5, DialogModes.NO );
	} 
	catch (e) {
		alert(e);
	}

	return resultLayers;
}   

$.writeln(getSelectedLayers());
