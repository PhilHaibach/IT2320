var Main = {};

Main.Canvas = document.getElementById('myCanvas');
Main.Context = Main.Canvas.getContext('2d');
Main.StandardColor = "#999999";
Main.HighlightColor = "#FF0000";
Main.MousePressed = false;
Main.MX = 0;
Main.MY = 0;
Main.MXOffset = 0;
Main.MYOffset = 0;
Main.BoxWidth = 50;
Main.BoxHeight = 50;
Main.CarouselY = 150;
Main.CarouselX = 100;
Main.CarouselSpacing = 50;
Main.CarouselVelocity = 0;
Main.CarouselVelocityY = 0;
Main.CarouselInertiaDirection = "Right";
Main.CarouselInertiaDirectionY = "Down";
Main.VelocityToPixelTranslation = 20;
Main.VelocityDegradation = 1;
Main.Box1X = Main.CarouselX;
Main.XCoordinateHistory = new Array();
Main.XCoordinateHistorySampleSize = 10;
Main.YCoordinateHistory = new Array();
Main.YCoordinateHistorySampleSize = 10;

Main.Box = function(x, y, w, h)
{
	this.X = x;
	this.Y = y;
	this.Width = w;
	this.Height = h;

	this.IsSelected = function()
	{
		if (!Main.MousePressed) return false;
		var withinXAxisCoordinates = Main.MX > this.X && Main.MX < (this.X + this.Width);
		var withinYAxisCoordinates = Main.MY > this.Y && Main.MY < (this.Y + this.Height);
		return withinXAxisCoordinates && withinYAxisCoordinates;
	}
}

Main.Boxes = [
	new Main.Box(Main.Box1X, Main.CarouselY, Main.BoxWidth, Main.BoxHeight)
];

Main.Canvas.onmousemove = function(event)
{
	if (event.offsetX)
	{
		mouseX = event.offsetX;
	}
	else if (event.layerX)
	{
		mouseX = event.layerX;
	}
    
    if(event.offsetY)
    {
        mouseY = event.offsetY;
    }
    else if(event.layerY)
    {
        mouseY = event.layerY;
    }

	Main.MX = mouseX;
	Main.MY = mouseY;
}

Main.ComputeVelocityAndInertia = function()
{
	var oldestXCoord = Main.XCoordinateHistory[0];
	var mostRecentXCoord = Main.XCoordinateHistory[Main.XCoordinateHistorySampleSize-1]
    var oldestYCoord = Main.YCoordinateHistory[0];
    var mostRecentYCoord = Main.YCoordinateHistory[Main.YCoordinateHistorySampleSize-1]
	Main.CarouselVelocity = Math.abs(oldestXCoord - mostRecentXCoord);
    Main.CarouselVelocityY = Math.abs(oldestYCoord - mostRecentYCoord);
	Main.CarouselInertiaDirection = (oldestXCoord < mostRecentXCoord) ? "Right" : "Left";
    Main.CarouselInertiaDirectionY = (oldestYCoord < mostRecentYCoord) ? "Down" : "Up";
}

Main.MouseUp = function(mouseEvent)
{
	Main.MousePressed = false;
	Main.ComputeVelocityAndInertia();
	Main.XCoordinateHistory = new Array();
    Main.YCoordinateHistory = new Array();
}

Main.MouseDown = function(mouseEvent)
{
	if (Main.MouseWithinAnyBox())
	{
		Main.MousePressed = true;
		Main.MXOffset = Main.MX - Main.Boxes[0].X;
        Main.MYOffset = Main.MY - Main.Boxes[0].Y;
	}
}

Main.UpdateBoxes = function()
{
	if (Main.MousePressed)
	{
		Main.Boxes[0].X = Main.MX - Main.MXOffset;
        Main.Boxes[0].Y = Main.MY - Main.MYOffset;
	}
}

Main.AdjustBoxesDueToInertia = function(pixels)
{
	var adjustment = Main.CarouselVelocity / Main.VelocityToPixelTranslation;
    var Vadjustment = Main.CarouselVelocityY / Main.VelocityToPixelTranslation;
	var translationInPixels = (Main.CarouselInertiaDirection == "Right") ? adjustment : -adjustment;
    var translationInPixelsY = (Main.CarouselInertiaDirectionY == "Down") ? Vadjustment : -Vadjustment;

	Main.Boxes[0].X += translationInPixels;
    Main.Boxes[0].Y += translationInPixelsY;

	if(Main.CarouselVelocity < 1)
        Main.CarouselVelocity = 0;
    else
        Main.CarouselVelocity -= .03*Main.CarouselVelocity;
    if(Main.CarouselVelocityY < 1)
        Main.CarouselVelocityY = 0;
    else
        Main.CarouselVelocityY -= .03*Main.CarouselVelocityY;
}

Main.DrawBoxes = function()
{
	if ((Main.CarouselVelocity > 0 || Main.CarouselVelocityY > 0) && Main.MousePressed == false)
	{
		Main.AdjustBoxesDueToInertia();
	}

	for (var i=0; i<Main.Boxes.length; i++)
	{
		var box = Main.Boxes[i];
		Main.Context.fillStyle = Main.MouseWithinBox(box) ? Main.HighlightColor : Main.StandardColor;
		Main.Context.fillRect(box.X, box.Y, box.Width, box.Height);
	}
    
    //scoreboard
    //triangle
    Main.Context.moveTo(1100,50);
    Main.Context.lineTo(1100,300);
    Main.Context.stroke();
    Main.Context.moveTo(1100,50);
    Main.Context.lineTo(700,175);
    Main.Context.stroke();
    Main.Context.moveTo(700,175);
    Main.Context.lineTo(1100,300);
    Main.Context.stroke();
    //lines
    Main.Context.moveTo(1000,82);
    Main.Context.lineTo(1000,145);
    Main.Context.stroke();
    Main.Context.moveTo(1000,205);
    Main.Context.lineTo(1000,268);
    Main.Context.stroke();
    Main.Context.moveTo(900,112);
    Main.Context.lineTo(900,237);
    Main.Context.stroke();
    Main.Context.moveTo(800,144);
    Main.Context.lineTo(800,205);
    Main.Context.stroke();
    //50box
    Main.Context.rect(970,145, 60,60);
    Main.Context.stroke();
    
    //score indicators
    Main.Context.font = "20px Arial";
    Main.Context.fillText("10", 735, 155);
    Main.Context.font = "20px Arial";
    Main.Context.fillText("20", 835, 124);
    Main.Context.font = "20px Arial";
    Main.Context.fillText("30", 935, 92);
    Main.Context.font = "20px Arial";
    Main.Context.fillText("40", 1035, 62);
    Main.Context.font = "40px Arial";
    Main.Context.fillText("50", 978, 188);
}

Main.MouseWithinBox = function(box)
{
	var withinBoxHorizontally = Main.MX >= box.X && Main.MX <= (box.X + box.Width);
	var withinBoxVertically = Main.MY >= box.Y && Main.MY <= (box.Y + box.Height);
	return withinBoxVertically && withinBoxHorizontally;
}

Main.MouseWithinAnyBox = function()
{
	for (var i=0; i<Main.Boxes.length; i++)
	{
		var box = Main.Boxes[i];
		if (Main.MouseWithinBox(box)) return true;
	}

	return false;
}

Main.RememberMouseHistory = function()
{
	if (Main.MousePressed)
	{
		Main.XCoordinateHistory.push(Main.MX);
        Main.YCoordinateHistory.push(Main.MY);

		while (Main.XCoordinateHistory.length > Main.XCoordinateHistorySampleSize)
		{
			Main.XCoordinateHistory.shift();
		}
        while (Main.YCoordinateHistory.length > Main.YCoordinateHistorySampleSize)
        {
            Main.YCoordinateHistory.shift();   
        }
	}
}

Main.DrawText = function()
{
	Main.Context.fillStyle = (Main.MouseWithinAnyBox()) ? Main.HighlightColor : Main.StandardColor;
	Main.Context.font = "30px Arial";
	Main.Context.fillText("X: " + Main.MX + "  y: " + Main.MY, 50, 50);
	Main.Context.fillText("Velocity: " +  Main.CarouselVelocity, 350, 50);
	Main.Context.fillText("Direction: " + Main.CarouselInertiaDirection, 650, 50);
	Main.Context.fillStyle = Main.StandardColor;
}

Main.Animate = function()
{
	Main.Context.clearRect(0, 0, Main.Canvas.width, Main.Canvas.height);
	Main.RememberMouseHistory();
	Main.UpdateBoxes()
	Main.DrawBoxes();
	Main.DrawText();
	requestAnimFrame(function() { Main.Animate(); });
}

window.requestAnimFrame = (function(callback)
{
	return window.requestAnimationFrame
	|| window.webkitRequestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| window.oRequestAnimationFrame
	|| window.msRequestAnimationFrame
	|| function(callback) { window.setTimeout(callback, 1000 / 60); };
})();

$(document).ready(function()
{
	Main.Animate();
	Main.Canvas.addEventListener('mouseup', function(mouseEvent) { Main.MouseUp(mouseEvent); });
	Main.Canvas.addEventListener('mousedown', function(mouseEvent) { Main.MouseDown(mouseEvent); });
});