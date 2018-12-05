// for our deterministic random number generator
var a = 1664525 * Math.random();
var c = 1013904223;
var seed = 1234;


//function seedDeterministicRandomNumberGenerator(newSeed) {
function seedDRand(newSeed) {
	seed = newSeed;
	//console.log("seed = " + seed + "\n");
}


function dRandom() {
  // define the recurrence relationship
  seed = parseInt(a * seed + c) % 982451497;
  // return an integer 
  // Could return a float in (0, 1) by dividing by m
  return seed;
}


// helper function which returns an integer from 0 to spread - 1
// for 4 it would be 0, 1, 2, or 3 (not 4)
function dRandomInt(spread) {
	return (dRandom() % spread);
}


// returns an integer from min to max (inclusive)
function dRandomIn(min, max) {
	return min + dRandom() % (max - min + 1);
}


// return a float in the 0-1 range
function dRandomFloat() {
	return dRandom() / 982451497;
}


// return a float in the 0-1 range
function dRandomFloatIn(min, max) {
	return min + (max - min) * dRandom() / 982451497;
}


// uses the fibonacci sequence to generate pseudorandom numbers
function fibonacci(a, b) {
	var period = Math.pow(10, 6);
	//console.log("testing fibonacci sequence. inputs are " + a + " and " + b);
	var iterations = 128;
	a += 552219;
	var c;
	for (var i = 0; i < iterations; i ++) {
		c = a + b;
		if (c > period)
			c = c % period;
		a = b;
		b = c;
		//console.log(c);
	}
	return b;
}

// for drawing
var canvas;
var context;

// wallpaper groups
var groupNameString = ["p1", "pm", "pmm", "pg", "cm", "pmg", "cmm", "pgg", "p2", "p3", "p3m1", "p31m", "p4", "p4m", "p4g", "p6", "p6m"];
var group = groupNameString[groupNameString.length - 1]; //pick(groupNameString);

var errorSubdivisions = 8;
var errorRange = 2;

var baseRotation = Math.random()*30 * Math.PI * 2;
var group = pick(groupNameString);

var polygonSides = 3;
var angle0 = Math.PI / 3;
var xSpacing = 64;
var ySpacing = 64;
var rotationOffset = Math.random(); 
var rotateRule = Math.random(); 
var rowRotateRule = Math.random(); 
var shear =  Math.random(); 
var xFlip = false; 
var yFlip = false; 
var yFlipPairs = false; 
var yFlipRows = false;
var instancesPerStep = 1; 
var mirrorInstances = false;
var autoInvert = false;

var canvasCount = 3;


function pick(array) {
	return array[dRandomInt(array.length)];
}


function jitter(input, amount) {
	return input - amount + 2 * amount * (Math.random() * 20); 
}


// returns the specified corner point as an array {x, y}
function getCorner(index, groupName) {
	var newPoint = {x:0, y:0};
	var distance = xSpacing;

	if (groupName == "p3m1")
		distance = 2 / Math.sqrt(3) * xSpacing / 2;
	if ((groupName == "p4") || (groupName == "p4m")
	|| (groupName == "p4g"))
		distance = xSpacing / 2;
	
	if (index == 0) {
		newPoint.x = 0;
		newPoint.y = 0;
	}
	else if (index == 1) {
		if ((groupName == "p3"))
			distance = 0.5 * xSpacing / Math.sqrt(3/4);
		if ((groupName == "p6m"))
			distance = 0.5 * xSpacing;
		newPoint.x = distance;
		newPoint.y = 0;
	}
	else if (index == 2) {
		if ((groupName == "p3"))
			distance = 0.5 * xSpacing / Math.sqrt(3/4);
		if ((groupName == "p31m") || (groupName == "p6")
		|| (groupName == "p6m"))
			distance = 2 / Math.sqrt(3) * xSpacing / 2;
		if ((groupName == "p4m"))
			distance = 0.5 * Math.sqrt(2) * xSpacing;
		newPoint.x = distance * Math.cos(angle0);
		newPoint.y = distance * Math.sin(angle0);
	}
	else if (index == 3) { // used for quadrilaterals only- optional fourth corner
		if ((groupName == "p3"))
			distance = 0.5 * xSpacing / Math.sqrt(3/4);
		if ((groupName == "p1") || (groupName == "p2"))
			distance = 2 * (Math.sqrt(3) / 2) * xSpacing;
		if ((groupName == "pm") || (groupName == "pmm") 
		|| (groupName == "pg") || (groupName == "cm")
		|| (groupName == "cmm") || (groupName == "pgg")
		|| (groupName == "pmg"))
			distance = xSpacing * Math.sqrt(2);
		if ((groupName == "p4") || (groupName == "p4m")
		|| (groupName == "p4g"))
			distance = Math.sqrt(2) * xSpacing / 2;
		newPoint.x = distance * Math.cos(angle0 / 2);
		newPoint.y = distance * Math.sin(angle0 / 2);
	}
	
	return newPoint;
}


function lerp(n1, n2, blend) {
	return (1.0 - blend) * n1 + blend * n2;
}

function randArr(arr){
		var rand = arr[Math.floor(Math.random() * arr.length)];
		return rand;
	}

function drawPattern(canvasName, groupName) {
	canvas = document.getElementById(canvasName);
	context = canvas.getContext("2d");
	context.save();
	//context.globalCompositeOperation= randArr(["multiply", "screen", "darken", "overlay", "xor", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "luminosity"]);
	// set the pattern parameters 
	setRules(groupName);
	
	context.save();
context.globalCompositeOperation = 'destination-under';
context.fillStyle= "333";
context.fillRect(0, 0, canvas.width, canvas.height);
context.restore();
	//context.fillStyle = "#888";
	//var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
	//gradient.addColorStop(0, "#555");
	//gradient.addColorStop(1, "#fff");
	//context.fillStyle = gradient;
	//context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.save();
	context.translate(canvas.width / 2, canvas.height / 2);
	context.rotate(baseRotation);

	// the pattern zone
	group = groupName;
	
	// test corners
	context.lineWidth = 2;
	var corner0 = getCorner(0, groupName);
	var corner1 = getCorner(1, groupName);
	context.strokeStyle = "#333";
	//drawStroke(corner0.x, corner0.y, corner1.x, corner1.y);
	var corner2 = getCorner(2, groupName);
	context.strokeStyle = "#fff";
	//drawStroke(corner0.x, corner0.y, corner2.x, corner2.y);
	var center = {x:0, y:0};
	var corner3;
	if (polygonSides == 4) {
		corner3 = getCorner(3, groupName);
		context.strokeStyle = "#666";
		//drawStroke(corner0.x, corner0.y, corner3.x, corner3.y);
		center.x = (corner3.x + corner0.x) / 2;
		center.y = (corner3.y + corner0.y) / 2;
	}
	else {
		center.x = (corner0.x + corner1.x + corner2.x) / 3;
		center.y = (corner0.y + corner1.y + corner2.y) / 3;
	}

	// outline
	context.strokeStyle = "#333";
	//drawStroke(corner0.x, corner0.y, corner1.x, corner1.y);
	if (polygonSides == 3) {
		drawStroke(corner1.x, corner1.y, corner2.x, corner2.y);
		drawStroke(corner2.x, corner2.y, corner0.x, corner0.y);
	}
	else {
		drawStroke(corner1.x, corner1.y, corner3.x, corner3.y);
		drawStroke(corner3.x, corner3.y, corner2.x, corner2.y);
		drawStroke(corner2.x, corner2.y, corner0.x, corner0.y);
	}
	
	// inset outline
	var blend = 0.25;
	inset0 = {x:lerp(corner0.x, center.x, blend), y:lerp(corner0.y, center.y, blend)};
	inset1 = {x:lerp(corner1.x, center.x, blend), y:lerp(corner1.y, center.y, blend)};
	inset2 = {x:lerp(corner2.x, center.x, blend), y:lerp(corner2.y, center.y, blend)};
	if (polygonSides == 4)
		inset3 = {x:lerp(corner3.x, center.x, blend), y:lerp(corner3.y, center.y, blend)};
	context.lineWidth = 2;
	context.strokeStyle = pick(["#333", "#ddd"]);
	drawStroke(inset0.x, inset0.y, inset1.x, inset1.y);
	if (polygonSides == 3) {
		drawStroke(inset1.x, inset1.y, inset2.x, inset2.y);
		drawStroke(inset2.x, inset2.y, inset0.x, inset0.y);
	}
	else {
		drawStroke(inset1.x, inset1.y, inset3.x, inset3.y);
		drawStroke(inset3.x, inset3.y, inset2.x, inset2.y);
		drawStroke(inset2.x, inset2.y, inset0.x, inset0.y);
	}
	
	for (var i = 0; i < 64; i ++) {
		context.save();
		context.lineWidth = 8;
		context.globalAlpha = 1.0;
		//context.lineCap = "round";
		context.strokeStyle = pick(["#333", "#ddd"]);
		
		var x0 = dRandomFloatIn(-xSpacing, xSpacing);
		var y0 = dRandomFloatIn(-ySpacing, ySpacing);
		var x1 = dRandomFloatIn(-xSpacing, xSpacing);
		var y1 = dRandomFloatIn(-ySpacing, ySpacing);
		if (dRandomFloat() < 0.5)
			drawStroke(x0, y0, x1, y0);
		else
			drawStroke(x0, y0, x0, y1);
		
		//drawStroke(x0, y0, x1, y0);
		context.restore();
	}
	// end of pattern zone
	

	context.restore();
}


// each pattern has a single smallest atomic unit which everything else is made out of
// this function returns a point {x, y} which is within that region
// (0, 0) is the center of rotation or lower left corner in non-rotated patterns
function getRandomPointInFundamentalDomain(groupName) {
	var corner0 = getCorner(0, groupName);
	var corner1 = getCorner(1, groupName);
	var corner2 = getCorner(2, groupName);
	var corner3;
	var center = {x:0, y:0};
	if (polygonSides == 4) {
		corner3 = getCorner(3, groupName);
		center.x = (corner3.x + corner0.x) / 2;
		center.y = (corner3.y + corner0.y) / 2;
	}
	else {
		center.x = (corner0.x + corner1.x + corner2.x) / 3;
		center.y = (corner0.y + corner1.y + corner2.y) / 3;
	}

	var blend = 0.25;
	var inset0 = {x:lerp(corner0.x, center.x, blend), y:lerp(corner0.y, center.y, blend)};
	var inset1 = {x:lerp(corner1.x, center.x, blend), y:lerp(corner1.y, center.y, blend)};
	var inset2 = {x:lerp(corner2.x, center.x, blend), y:lerp(corner2.y, center.y, blend)};
	if (polygonSides == 4)
		var inset3 = {x:lerp(corner3.x, center.x, blend), y:lerp(corner3.y, center.y, blend)};

	var newPoint = {x:corner0.x, y:corner0.y};
	
	var blend = dRandomFloat();
	newPoint.x = lerp(newPoint.x, corner1.x, blend);
	newPoint.y = lerp(newPoint.y, corner1.y, blend);
	if (polygonSides == 3) {
		blend = dRandomFloat();
		newPoint.x = lerp(newPoint.x, corner2.x, blend);
		newPoint.y = lerp(newPoint.y, corner2.y, blend);
	}
	if (polygonSides == 4) {
		blend = dRandomFloat();
		newPoint.y = lerp(newPoint.y, corner2.y, blend);
		// shear
		newPoint.x += (corner2.x - corner0.x) * blend;
	}	
	
	return newPoint;
}


// set symmetry rules for the requested wallpaper group
function setRules(group) {
	polygonSides = 4;
	angle0 = Math.PI / 2;
	xSpacing = 128;
	ySpacing = 128;
	rotationOffset = 0; // tweak orientation of each rotational center by this much
	rotateRule = 0; // rotate this much times x (for flipping orientation, etc.)
	rowRotateRule = 0; // rotate this much times y
	shear = 0; // for nonrectilinear grids, also used for triangular and hexagonal grids
	xFlip = false; // for lines of x symmetry
	yFlip = false; // for glide reflections
	yFlipPairs = false; // flip every other pair along y
	yFlipRows = false; // flip every other row along y
	instancesPerStep = 1; // we're doing hex grids by spacing things more widely and doing one radial arrangement in each place we'd normally have a single instance
	mirrorInstances = false;

	// p1
	// translation only
	// can be sheared
	if (group == "p1") {
		polygonSides = 4;
		ySpacing = Math.sqrt(3/4) * xSpacing;
		angle0 = Math.PI / 3; // link this to shear if we randomize
		rotateRule = 0;
		shear = 0.5;
		xSpacing *= 0.5;
	}
	// pm
	// no rotation
	// reflected along one axis
	// cannot be sheared, because of the reflection
	if (group == "pm") {
		polygonSides = 4;
		rotateRule = 0;
		xFlip = true;
		shear = 0.0;
		xSpacing *= 0.5;
	}
	// pmm
	// no rotation
	// reflected along one axis
	// cannot be sheared, because of the reflection
	if (group == "pmm") {
		polygonSides = 4;
		rotateRule = 0;
		xFlip = true;
		yFlipRows = true;
		xSpacing *= 0.5;
		shear = 0.0;
	}
	// pg
	// no rotation
	// has glide reflections
	// (cannot be sheared because of reflection)
	if (group == "pg") {
		polygonSides = 4;
		rotateRule = 0;
		yFlip = true;
		shear = 0.0;
		xSpacing *= 0.5;
	}	
	// pmg
	// no rotation
	// pairs of mirrored units
	// every other pair is flipped vertically
	// (cannot be sheared because of reflection)
	if (group == "pmg") {
		polygonSides = 4;
		rotateRule = 0;
		xFlip = true;
		yFlipPairs = true;
		shear = 0.0;
		xSpacing *= 0.5;
	}	
	// cmm
	// no rotation
	// pairs of mirrored units
	// every other pair is flipped vertically
	// also, every other row is flipped vertically
	// (cannot be sheared because of reflection)
	// note: this one is going to come out oddly if we try to get base unit outlines
	// there is a diagonal line which is part of the rule
	// it should obey the rule, but this line won't necessarily show- 
	// might need a special case to work with drawing correctly
	if (group == "cmm") {
		polygonSides = 4;
		rotateRule = 0;
		xFlip = true;
		yFlipPairs = true;
		yFlipRows = true;
		shear = 0.0;
		xSpacing *= 0.5;
	}	
	// pgg
	// "this type of tiling has glide reflections in two directions,
	// and can also be turned upside-down"
	// the two axes of the glide reflections are perpendicular
	// this forces a rectangular base
	if (group == "pgg") {
		polygonSides = 4;
		rotateRule = 0;
		rowRotateRule = Math.PI;
		xFlip = false;
		yFlip = true;
		yFlipPairs = false;
		yFlipRows = false;
		shear = 0.0;
		xSpacing *= 0.5;
	}	
	// p2
	// 2 fold rotational symmetry
	// can be sheared
	if (group == "p2") {
		polygonSides = 4;
		ySpacing = Math.sqrt(3/4) * xSpacing;
		angle0 = Math.PI / 3;
		rotateRule = Math.PI;
		shear = 0.5;
		xSpacing *= 0.5;
	}
	// p4
	// 4 fold rotational symmetry
	// cannot be sheared
	if (group == "p4") {
		polygonSides = 4;
		xSpacing *= 2;
		ySpacing *= 2;
		instancesPerStep = 4;
	}
	// p4m
	// 4 fold rotational symmetry
	// each instance is mirrored
	// cannot be sheared
	if (group == "p4m") {
		polygonSides = 3;
		angle0 = Math.PI / 4;
		xSpacing *= 2;
		ySpacing *= 2;
		instancesPerStep = 4;
		mirrorInstances = true;
	}
	// p4g
	// 4 fold rotational symmetry
	// each instance is mirrored
	// cannot be sheared
	if (group == "p4g") {
		polygonSides = 4;
		rotateRule = Math.PI / 2;
		xSpacing *= 2;
		ySpacing *= 2;
		shear = 1;
		instancesPerStep = 2;
		mirrorInstances = true;
	}
	// cm
	// no rotation
	// has reflections and glide reflections
	// (cannot be sheared because of reflection)
	if (group == "cm") {
		polygonSides = 4;
		rotateRule = 0;
		xFlip = true;
		yFlip = false;
		shear = 1.0;
		xSpacing *= 0.5;
	}	
	// p3
	//  points of rotational symmetry
	// no reflections
	if (group == "p3") {
		polygonSides = 4; // wait, is this two equilateral triangles attached? maybe it's 4...
		rotationOffset = Math.PI / 6;
		angle0 = Math.PI * 2 / 3;
		rotateRule = 0;
		xSpacing *= 2;
		ySpacing = Math.sqrt(3/4) * xSpacing;
		shear = 0.5; // we're using shear here to offset every other row and get a hex grid
		// also turn on florets of 6 instances
		instancesPerStep = 3;
	}
	// p3m1
	// equilateral triangle (each triangle is threefold rotationally symmetric, no internal mirroring)
	// threefold points of rotational symmetry
	// each instance around the rotational center is also mirrored (for a total of 6 instances)
	if (group == "p3m1") {
		polygonSides = 3;
		angle0 = Math.PI / 3;
		rotationOffset = Math.PI / 6;
		rotateRule = Math.PI * 2 / 3;
		xSpacing *= 2;
		ySpacing = Math.sqrt(3/4) * xSpacing;
		shear = 0.5; // we're using shear here to offset every other row and get a hex grid
		// also turn on florets of 6 instances
		instancesPerStep = 3;
		mirrorInstances = true;
	}	
	// p31m
	// threefold points of rotational symmetry
	// no reflections
	if (group == "p31m") {
		polygonSides = 3; // same- perhaps 4?
		angle0 = Math.PI / 6;
		rotateRule = 0;
		xSpacing *= 2;
		ySpacing = Math.sqrt(3/4) * xSpacing;
		shear = 0.5; // we're using shear here to offset every other row and get a hex grid
		// also turn on florets of 6 instances
		instancesPerStep = 3;
		mirrorInstances = true;
	}	
	// p6
	// sixfold points of rotational symmetry
	// no reflections
	if (group == "p6") {
		polygonSides = 3;
		angle0 = Math.PI / 6;
		rotateRule = 0;
		xSpacing *= 2;
		ySpacing = Math.sqrt(3/4) * xSpacing;
		shear = 0.5; // we're using shear here to offset every other row and get a hex grid
		// also turn on florets of 6 instances
		instancesPerStep = 6;
		mirrorInstances = false;
	}	
	// p6m
	// sixfold points of rotational symmetry
	// no reflections
	if (group == "p6m") {
		polygonSides = 3;
		angle0 = Math.PI / 6;
		rotateRule = 0;
		xSpacing *= 2;
		ySpacing = Math.sqrt(3/4) * xSpacing;
		shear = 0.5; // we're using shear here to offset every other row and get a hex grid
		// also turn on florets of 6 instances
		instancesPerStep = 6;
		mirrorInstances = true;
	}	
}


/*
draws a single linear stroke
respects the symmetries of the pattern
*/
function drawStroke(startX, startY, endX, endY) {		
	context.save();
	
	var xCount = canvas.height / xSpacing + 2;
	var yCount = canvas.height / ySpacing + 2;
	
	var jitterAmount = 0.1;
	
	for (var y = 0; y < yCount; y ++) {
		for (var x = 0; x < xCount; x ++) {
			context.save();
			context.translate((x - xCount / 2 + (y - yCount / 2) * shear)* xSpacing, (y - yCount / 2) * ySpacing);
			
			// determine rotation for this instance
			var currentRotation = rotateRule * x + rowRotateRule * y + rotationOffset;
			context.rotate(currentRotation);
			// determine x flip for this instance
			if ((xFlip) && (x % 2 == 0)) {
				context.scale(-1, 1);
				context.translate(xSpacing, 0);
			}
			// determine y flip for this instance
			if ((yFlip) && (x % 2 == 0))
				context.scale(1, -1);
			if ((yFlipPairs) && (Math.floor(x / 2) % 2 == 0))
				context.scale(1, -1);
			if ((yFlipRows) && (y % 2 == 0)) {
				context.scale(1, -1);
				context.translate(0, ySpacing);
			}
			
			for (var i = 0; i < instancesPerStep; i ++) {
				context.save();
				context.rotate(i * (2.0 * Math.PI / instancesPerStep));
				// replace with bounds awareness
				//if (instancesPerStep > 1)
					//context.translate(xSpacing * 0.25, 0);
				// for radial rules with mirroring per instance
				var flipMax = 0;
				if (mirrorInstances)
					flipMax = 2;
				for (var flip = -1; flip <= flipMax; flip += 2) {
					context.save();
					//if (mirrorInstances)
						//context.translate(0, flip * ySpacing * 0.22);
					context.scale(1, flip);
					context.beginPath();
					context.moveTo(jitter(startX, jitterAmount), jitter(startY, jitterAmount));
					context.lineTo(jitter(endX, jitterAmount), jitter(endY, jitterAmount));
					context.stroke();
					context.restore();
				}
				context.restore();
			}
			context.restore();
		}
	}
	
	context.restore();
}


/*
draws a single linear stroke
respects the symmetries of the pattern
*/
function drawTriangle(x0, y0, x1, y1, x2, y2, groupName) {
	context.save();
		
	var xCount = canvas.height / xSpacing + 2;
	var yCount = canvas.height / ySpacing + 2;
	
	var jitterAmount = 0.1;
	
	//for (var y = Math.floor(yCount / 2); y <= yCount / 2; y ++) {
		//for (var x = Math.floor(xCount / 2); x <= xCount / 2; x ++) {
	for (var y = 0; y < yCount; y ++) {
		for (var x = 0; x < xCount; x ++) {
			context.save();
			context.translate((x - xCount / 2 + (y - yCount / 2) * shear)* xSpacing, (y - yCount / 2) * ySpacing);
			
			if (autoInvert) {
				var adjust = 0;
				if ((groupName == "p1")
				|| (groupName == "cm"))
					adjust = y % 2;
				if (groupName == "pg")
					adjust = x % 2;
				var colorGroup = (x + y + adjust) % 2;
			}

			// determine rotation for this instance
			var currentRotation = rotateRule * x + rowRotateRule * y + rotationOffset;
			context.rotate(currentRotation);
			// determine x flip for this instance
			if ((xFlip) && (x % 2 == 0)) {
				context.scale(-1, 1);
				context.translate(xSpacing, 0);
			}
			// determine y flip for this instance
			if ((yFlip) && (x % 2 == 0))
				context.scale(1, -1);
			if ((yFlipPairs) && (Math.floor(x / 2) % 2 == 0))
				context.scale(1, -1);
			if ((yFlipRows) && (y % 2 == 0)) {
				context.scale(1, -1);
				context.translate(0, ySpacing);
			}
			
			for (var i = 0; i < instancesPerStep; i ++) {
			
				
				context.save();
				context.rotate(i * (2.0 * Math.PI / instancesPerStep));
				// replace with bounds awareness
				//if (instancesPerStep > 1)
					//context.translate(xSpacing * 0.25, 0);
				// for radial rules with mirroring per instance
				var flipMax = 0;
				if (mirrorInstances)
					flipMax = 2;
				for (var flip = -1; flip <= flipMax; flip += 2) {
					context.save();
				
					// color group for radial rules
					if (groupName == "p31m")
						colorGroup = flip < 0;
					if (groupName == "p3m1")
						colorGroup = flip < 0;
					if (groupName == "p6") {
						colorGroup = i % 2;
					}
					if (groupName == "p6m") {
						colorGroup = flip > 0;
					}
				
					
					if (autoInvert) {
						if (colorGroup == 0)
							context.fillStyle = "#333";
						else
							context.fillStyle = "#ddd";	
					}
						//if (mirrorInstances)
						//context.translate(0, flip * ySpacing * 0.22);
					context.scale(1, flip);
					context.beginPath();
					context.moveTo(jitter(x0, jitterAmount), jitter(y0, jitterAmount));
					context.lineTo(jitter(x1, jitterAmount), jitter(y1, jitterAmount));
					context.lineTo(jitter(x2, jitterAmount), jitter(y2, jitterAmount));
					context.closePath();
					context.fill();
					context.restore();
				}
				context.restore();
			}
			context.restore();
		}
	}
	
	context.restore();
	context.restore();
}


function makePatternCanvas(parentDiv,r) {
	parentDiv.innerHTML = "";
	
	var newCanvas = document.createElement("canvas");
	newCanvas.width = parentDiv.clientWidth;
	newCanvas.height = parentDiv.clientHeight;
	newCanvas.id = "patternCanvas"+r;
	newCanvas.style.border = 0;
	newCanvas.style.margin = 0;
	parentDiv.appendChild(newCanvas);

}


function setupTilingPatterns(parentDiv, poem, r) {
	parentDiv.style.padding = 0;
	makePatternCanvas(parentDiv, r);
	
	randomize(); // dither pattern
	group = pick(groupNameString);
	baseRotation = dRandomFloat() * Math.PI * 2;
	if (Math.random()>0.33){
	console.log("wallpaper " + group);
	drawPattern("patternCanvas"+r, group);
}
	else if (Math.random()<0.33){
	console.log("glass");
	drawGlass("patternCanvas"+r);
}
else{
	console.log("flower ");
	drawFlower("patternCanvas"+r, poem);
	};
	//document.getElementById("pattern name").innerHTML = "pattern no. " + placeseed;
}


function mutate() {
	//which should we mutate?
	var targetIndex = dRandomInt(neighbor.length);
	var maximum = 8;
	neighbor[targetIndex].fraction = Math.floor(Math.max(1, Math.min(maximum, neighbor[targetIndex].fraction + dRandomFloat() * 3 - 1)));
	
	// check how high the total error displacement is
	var total = 0;
	for (var i = 0; i < neighbor.length; i ++) {
		total += neighbor[i].fraction;
	}
	//console.log("total error = " + total + " / " + errorSubdivisions);

	// if we aren't distributing all error, consider adding a new neighbor
	if (total < errorSubdivisions) {
		if (dRandomFloat() > 0.5) {
			var newY = Math.floor(dRandomFloat() * (errorRange + 1));
			var newX = Math.floor(dRandomFloat() * (errorRange + 1));
			if (newY > 0)
				newX = Math.floor(dRandomFloat() * (2 * errorRange + 1)) - errorRange;
			var newFraction = Math.max(1, Math.floor(dRandomFloat() * Math.min(errorSubdivisions / 3, errorSubdivisions - total)));
			neighbor.push({x:newX, y:newY, fraction:newFraction});
		}
	}
	
	// if we're over, delete one
	else {
		var targetIndex = dRandomInt(neighbor.length);
		neighbor.splice(targetIndex, 1);
	}
	
	var ditherString = "";
	ditherString += "error range = " + errorRange + "\n";
	for (var i = 0; i < neighbor.length; i ++) {
		ditherString += "(" + neighbor[i].x + ", " + neighbor[i].y + ": " + neighbor[i].fraction + ")";
		if (i < neighbor.length)
			ditherString += "\n";
	}
	document.getElementById("ditherOutput").innerHTML = ditherString;
	
	refresh();
}


function randomize() {
	neighbor = [];
	errorRange = dRandomInt(403) + 1;
	errorSubdivisions = 32;
	var remainder = 32;
	var threshold = Math.max(0, dRandomFloat() - 0.5); // when this is greater than zero, it doesn't distribute all the difference.
	var neighborCount = 4 + dRandomFloat() * 8;
	for (var i = 0; i < neighborCount; i ++) {
		var newY = dRandomInt(errorRange + 1);
		var newX = dRandomInt(errorRange + 1);
		if (newY > 0)
		newX = dRandomInt(2 * errorRange + 1) - errorRange;
		var newFraction = Math.max(1, dRandomInt(Math.min(errorSubdivisions / 3, remainder)));
		neighbor.push({x:newX, y:newY, fraction:newFraction});
		remainder -= newFraction;
	}
	
	var ditherString = "";
	ditherString += "error range = " + errorRange + "\n";
	for (var i = 0; i < neighbor.length; i ++) {
		ditherString += "(" + neighbor[i].x + ", " + neighbor[i].y + ": " + neighbor[i].fraction + ")";
		if (i < neighbor.length)
			ditherString += "\n";
	}
}

function rand(array){
var rand = array[Math.floor(Math.random()*array.length)]; 
return rand;
}

function drawFlower(c, poem){


var canvas = document.getElementById(c);
context = canvas.getContext( '2d' ),
width = canvas.clientWidth,
height = canvas.clientHeight;

context.globalCompositeOperation="source-over";
context.globalAlpha = 1;


var hm = Math.random() < 0.5 ? -1 : 1;




function shuffle(splitChoice, string){

function randOrd(){
  return (Math.round(Math.random())-0.5);
}

var splitArray = [];
var splitEnd = splitChoice;
splitArray = string.split(splitEnd);
var shuffledArray =  splitArray.sort(randOrd);
var um = shuffledArray.join(splitChoice);
return um;
}


var text = poem.toString();

console.log (text);

var textlength = text.length;
var period = (text.match(/\./g) || []).length * (Math.random()*10);
var comma = (text.match(/,/g) || []).length * (Math.random()*10);
var space = (text.match(/ /g) || []).length* (Math.random()*10);
var dash = (text.match(/-/g) || []).length* (Math.random()*10);
var upper = text.replace(/[a-z]/g, '').length* (Math.random()*10);
var lower = text.replace(/[A-Z]/g, '').length* (Math.random()*10);

/*
console.log (text);
console.log (period);
console.log (comma);
console.log (dash);
console.log (lower);
console.log (upper);
*/

quality = textlength/ (0.007*textlength);


canvas = document.getElementById(c);
context = canvas.getContext( '2d' ),
width = canvas.clientWidth,
height = canvas.clientHeight,
radius = (Math.random()*(period + comma + dash)),

// number of layers
quality= quality,
layers = [],
// width/height of layers
layerSize =  comma * (Math.random()*30) + (Math.random()*quality)*0.2;



function initialize() {
for( var i = 0; i < quality; i++ ) {
layers.push({
x: width/2 + Math.sin( i / quality * 2 * Math.PI ) * ( radius - layerSize ),
y: height/2 + Math.cos( i / quality * 2 * Math.PI ) * ( radius - layerSize ),
r:  i/1000  * Math.PI
});
}

resize();

for (d=50;d<Math.floor(Math.random()*350);d++){
update();}
}

function resize() {
canvas.width = width;
canvas.height = height;
}

function update() {
step();
paint();
}

// step take
function step () {
for( var i = 0, len = layers.length; i < len; i++ ) {
layers[i].r += 1;
}

}


// current state
function paint() {
var layersLength = layers.length;
for( var i = 0, len = layersLength; i < len; i++ ) {
context.save();
context.globalCompositeOperation = 'screen';
paintLayer( layers[i] );
context.restore();
}

}

// paints one layer
function paintLayer( layer, mask ) {


context.save();
context.globalCompositeOperation = 'destination-under';
context.fillStyle= "555";
context.fillRect(0, 0, canvas.width, canvas.height);
context.restore();

context.beginPath();
context.arc(width/2, height/2, width/2, 0, Math.PI * 2);

context.beginPath();
context.translate( layer.x, layer.y );
context.rotate( layer.r );
context.strokeStyle = "#fff";

context.globalAlpha = ((Math.random()*10)*1);

function first() {

context.lineWidth = (Math.random()*comma);
var randwidth= (Math.random()*width)/(((Math.random()*6)*0.1) + 4);
var randheight= (Math.random()*height)/(((Math.random()*6)*0.1) + 4);

context.globalAlpha = 0.4;
context.moveTo(randwidth,randheight);
context.lineTo(randwidth - Math.random()*4, randheight- Math.random()*4);
context.stroke();
context.globalAlpha = 0.3;
context.moveTo(randwidth + comma*0.3, randheight + comma*0.3);
context.lineTo(randwidth - period, randheight - period);
context.stroke();
context.lineTo(randwidth - period - 3, randheight - period - 3);
context.globalAlpha = 0.2;
context.lineWidth = Math.random()*4;
context.lineCap = 'round';
context.arcTo(randwidth + space*0.03, randheight  + space*0.03, randwidth + space*0.03, randheight  + space*0.03, dash);
context.stroke();

}

function second() {

context.lineWidth = (Math.random()*10) + 0.2;
var randwidth= (Math.random()*width)/(((Math.random()*6)*0.6) + 2);
var randheight= (Math.random()*height)/(((Math.random()*6)*0.6) + 2);

context.globalAlpha = (Math.floor(Math.random()*40)*0.05 + 0.01);

context.moveTo(randwidth,randheight);
context.lineTo(randwidth - Math.random()*2, randheight- Math.random()*3);
context.stroke();

context.lineTo(randwidth - Math.random()*2, randheight- Math.random()*2);
context.stroke();

context.lineWidth = (Math.random()*10) + 0.2;
context.moveTo(randwidth + Math.random()*3, randheight + Math.random()*2);
context.lineTo(randwidth - Math.random()*3, randheight - Math.random()*1);
context.stroke();

context.lineTo(randwidth - Math.random()*3, randheight - Math.random()*4);
context.stroke();
context.setLineDash([Math.random()*comma, Math.random()*upper, Math.random()*space]);
context.lineDashOffset = (Math.random()*dash);
context.globalAlpha = (Math.floor(Math.random()*20)*0.05 + 0.1);
context.arcTo(randwidth + (Math.random()*space)*0.05, randheight  + (Math.random()*space)*0.05, randwidth + space*0.05, randheight  + space*0.05, (Math.random()*textlength));
context.strokeRect( lower* Math.random()*0.9, -period* Math.random()*0.9, -period* Math.random()*0.9, comma* Math.random()*0.9 );



}

function third() {

context.lineWidth = (Math.random()*10)*0.3;

var randwidth= width/(Math.random()*100);
var randheight= height/(Math.random()*100);

context.globalAlpha = 0.1;
context.arcTo(randwidth + (Math.random()*space)*0.05, randheight  + (Math.random()*space)*0.05, randwidth + space*0.05, randheight  + space*0.05, (Math.random()*textlength));
context.stroke();

}

function fourth() {

context.lineWidth = 3.1;

context.setLineDash([comma, period, dash]);
context.lineDashOffset = 2;
context.globalAlpha = 0.3;
context.strokeRect( -upper * Math.random()*0.7, -comma * Math.random()*0.7, period* Math.random()*0.7, period * Math.random()*0.7);
context.globalAlpha = 0.3;
context.strokeRect( lower* Math.random()*0.9, -period* Math.random()*0.9, -period* Math.random()*0.9, comma* Math.random()*0.9 );


}

function fifth() {

context.lineWidth = (Math.random()*10) + 1;


var randwidth= (Math.random()*width)/(((Math.random()*6)*0.1) + 4);
var randheight= (Math.random()*height)/(((Math.random()*6)*0.1) + 4);
var um= Math.random()*5;

context.globalAlpha = 0.3;
context.moveTo(randwidth,randheight);
context.lineTo(randwidth - Math.random()*um, randheight- Math.random()*um);
context.stroke();
context.lineTo(randwidth - Math.random()*um, randheight- Math.random()*um);
context.stroke();
//
context.globalAlpha = 0.2;
context.moveTo(randwidth + comma, randheight + comma);
context.lineTo(randwidth - period, randheight - period);
context.stroke();
context.globalAlpha = 0.1;
context.arcTo(randwidth + space*0.02, randheight  + space*0.02, randwidth + space*0.03, randheight  + space*0.03, dash);
context.stroke();

}

function sixth() {

context.lineWidth = (Math.random()*10) + 0.4;
var randwidth= (Math.random()*width)/(((Math.random()*6)*0.1) + 5);
var randheight= (Math.random()*height)/(((Math.random()*6)*0.1) + 5);

context.globalAlpha = (Math.floor(Math.random()*100)*0.005 + 0.1);

context.moveTo(randwidth,randheight);
context.lineTo(randwidth - Math.random()*2, randheight- Math.random()*2);
context.stroke();

context.lineTo(randwidth - Math.random()*2, randheight- Math.random()*2);
context.stroke();

context.moveTo(randwidth + Math.random()*3, randheight + Math.random()*3);
context.lineTo(randwidth - Math.random()*3, randheight - Math.random()*3);
context.stroke();

context.lineTo(randwidth - Math.random()*3, randheight - Math.random()*3);
context.stroke();

context.moveTo(randwidth + Math.random()*3+20, randheight + Math.random()*3+20);
context.lineTo(randwidth + Math.random()*2+19, randheight + Math.random()*2+19);
context.stroke();

}

var modifier = (Math.floor(Math.random()*100))*hm*0.01;
var option = text.length*0.005 + modifier;
if (option < 1) {first();}
else if (option > 1 && option < 2) {second();}
else if (option > 2 && option < 3) {sixth();}
else if (option > 3 && option < 4) {fourth();}
else if (option > 4 && option < 5) {fifth();}
else {sixth();}


}


initialize();
}




function drawGlass(c){



var canvas = document.getElementById(c);
context = canvas.getContext( '2d' ),
width = canvas.clientWidth,
height = canvas.clientHeight;

context.globalCompositeOperation="source-over";
context.globalAlpha = 1;


function rand(array){
var rand = array[Math.floor(Math.random()*array.length)]; 
return rand;
}

function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//roll variables
var sides = Math.floor(Math.random()*16+3)
var angleRotate = Math.floor(Math.random()*360)
var sizeGen = Math.floor(Math.random()*25+5)

var context=canvas.getContext("2d");
context.fillStyle="#555";
context.fillRect(0,0,canvas.width,canvas.height);

// center
var numberOfSides = sides,
    size = sizeGen;
    //Xcenter = canvas.width/2,
    //Ycenter = canvas.height/2;

context.translate(canvas.width/2, canvas.height/2);
context.rotate(angleRotate*Math.PI/180);

context.beginPath();
context.moveTo (size * Math.cos(0), size *  Math.sin(0));          
 
for (var i = 1; i <= numberOfSides;i += 1) {
    context.lineTo (size * Math.cos(i * 2 * Math.PI / numberOfSides), size * Math.sin(i * 2 * Math.PI / numberOfSides));
}
 
context.strokeStyle = "#000000";
context.lineWidth = size/5;
context.lineCap="round";
context.lineJoin="round";
    context.save();
    context.globalAlpha = 0.4;
    context.globalCompositeOperation = "overlay";
    context.fillStyle=randomColor();
	context.fill();
	context.restore();
context.stroke();
context.closePath();

//inital shape
context.moveTo (size * Math.cos(0), size *  Math.sin(0));          
 
for (var i = 1; i <= numberOfSides;i += 1) {
	context.beginPath();
    context.moveTo (size * Math.cos(i * 2 * Math.PI / numberOfSides), size * Math.sin(i * 2 * Math.PI / numberOfSides));
    context.lineTo (size * 3 * Math.cos(i * 2 * (Math.PI / numberOfSides)), size * 3 * Math.sin(i * 2 * (Math.PI / numberOfSides)));
    context.lineTo (size * 3 * Math.cos((i+1) * 2 * Math.PI / numberOfSides), size * 3 * Math.sin((i+1) * 2 * Math.PI / numberOfSides));
    context.lineTo (size * 5 * Math.cos((i+1) * 2 * Math.PI / numberOfSides), size * 5 * Math.sin((i+1) * 2 * Math.PI / numberOfSides));
     context.save();
    context.globalAlpha = 0.4;
    context.globalCompositeOperation = "overlay";
    context.fillStyle=randomColor();
	//context.fill();
	context.restore();
    context.lineTo (size * 5 * Math.cos((i) * 2 * Math.PI / numberOfSides), size * 5 * Math.sin((i) * 2 * Math.PI / numberOfSides));
    context.save();
    context.globalAlpha = 0.4;
    context.globalCompositeOperation = "overlay";
    context.fillStyle=randomColor();
	context.fill();
	context.restore();
    context.stroke();
    context.closePath();
}

//for inner structure
context.moveTo (size * Math.cos(0), size *  Math.sin(0));          
 
for (var i = 1; i <= numberOfSides;i += 1) {

    context.moveTo (size * 3 * Math.cos((i+0.5) * 2 * (Math.PI / numberOfSides)), size * 3 * Math.sin((i+0.5) * 2 * (Math.PI / numberOfSides)));
    context.beginPath();
    context.arc(size * 3 * Math.cos((i+0.5) * 2 * (Math.PI / numberOfSides)),
    	size * 3 * Math.sin((i+0.5) * 2 * (Math.PI / numberOfSides)),
    	size * 3,
    	0,
    	2*Math.PI);
    context.save();
    context.globalAlpha = 0.4;
    context.globalCompositeOperation = "overlay";
    context.fillStyle=randomColor();
	context.fill();
	context.restore();
    context.stroke();
    context.closePath();


    context.moveTo (size * Math.cos(i * 2 * Math.PI / numberOfSides), size * Math.sin(i * 2 * Math.PI / numberOfSides));
    	context.beginPath();

    context.stroke();
    context.closePath();


    context.moveTo (size * 3 * Math.cos((i+1) * 2 * Math.PI / numberOfSides), size * 3 * Math.sin((i+1) * 2 * Math.PI / numberOfSides));
    context.moveTo (size * 5 * Math.cos((i+1) * 2 * Math.PI / numberOfSides), size * 5 * Math.sin((i+1) * 2 * Math.PI / numberOfSides));
    context.moveTo (size * 5 * Math.cos((i) * 2 * Math.PI / numberOfSides), size * 5 * Math.sin((i) * 2 * Math.PI / numberOfSides));
}


for (var i = 1; i <= numberOfSides;i += 1) {
        context.moveTo (size * Math.cos(i * 2 * Math.PI / numberOfSides), size * Math.sin(i * 2 * Math.PI / numberOfSides));
    context.save()
    context.lineWidth=size/10;
    context.beginPath();
    context.arc((size*Math.cos(Math.PI *2 /numberOfSides)) * Math.cos(i * 2 * Math.PI / numberOfSides), (size*Math.cos(Math.PI * 2/numberOfSides)) * Math.sin(i * 2 * Math.PI / numberOfSides), size/numberOfSides,0,2*Math.PI);
    context.save()
    //context.globalAlpha = 0.4;
    context.globalCompositeOperation = "lighter";
    context.fillStyle=randomColor();
	context.fill();
    context.restore();
    context.stroke();
    context.closePath();
    context.restore();
}


}