var pressed = [];
var entities = [];
var camera = {};
var canvas;
var context;
var frame;
var mouse = {};
var preventDefault = false;
var freeze;

function KeyDownEvent(event)
{
	pressed[event.keyCode] = true;
	if((!event.shiftKey) && (!event.ctrlKey) && (!event.altKey) && (!event.metaKey) && (preventDefault)) event.preventDefault();
}

function KeyUpEvent(event)
{
	pressed[event.keyCode] = false;
}

function MouseMoveEvent(event)
{
	mouse.x = event.x - canvas.offsetLeft;
	mouse.y = event.y - canvas.offsetTop;
}

function MouseUpEvent(event)
{
	mouse.pressed[event.button] = false;
}

function MouseDownEvent(event)
{
	mouse.pressed[event.button] = true;
}

function Start()
{
	window.addEventListener("keyup", KeyUpEvent);
	window.addEventListener("keydown", KeyDownEvent);
	canvas = document.getElementById("canvas");
	mouse.pressed = [];
	canvas.addEventListener("mousemove", MouseMoveEvent);
	canvas.addEventListener("mousedown", MouseDownEvent);
	canvas.addEventListener("mouseup", MouseUpEvent);
	context = canvas.getContext("2d");
	frame = 0;
	camera.x = 0;
	camera.y = 0;
	StartLoadingData();
	freeze = true;
	setTimeout("DoFrame()", 1000.0 / 60.0);
}

function NewEntity()
{
	for(var i = 0; i < entities.length; i++)
	{
		if(!entities[i].alive)
		{
			entities[i] = {};
			entities[i].alive = true;
			return entities[i];
		}
	}
	entities[entities.length] = {};
	entities[entities.length - 1].alive = true;
	return entities[entities.length - 1];
}

function AddEntity(e)
{
	e.alive = true;
	for(var i = 0; i < entities.length; i++)
	{
		if(!entities[i].alive)
		{
			entities[i] = e;
			return;
		}
	}
	entities[entities.length] = e;
}

function RemoveDeadEntities()
{
	entities = entities.filter(function(e){return e.alive});
}

function ClearEntities()
{
	entities = [];
}

function DoFrame()
{
	Update();
	Draw();
	if(!freeze) frame++;
	setTimeout("DoFrame()", 1000.0 / 60.0);
}

function Update()
{
	UpdateKeys();
	if(!freeze) UpdateEntities();
}

function UpdateEntities()
{
	for(var i = 0; i < entities.length; i++)
	{
		var entity = entities[i];
		if(!entity.alive) continue;
		if(entity.Update) entity.Update();
	}
	if(frame % 90 == 0) RemoveDeadEntities();
}

function Draw()
{
	DrawEntities();
}

function CompareLayers(a, b)
{
	var layerA = 0, layerB = 0;
	if(a.layer) layerA = a.layer;
	if(b.layer) layerB = b.layer;
	if(b.zSorting)
	{
		if((a.y) && (a.height))
		{
			if(a.y + a.height * 0.5 < b.y + b.zHeight * 0.5) layerB = b.zBottomLayer;
			else layerB = b.zTopLayer;
		}
	}
	return layerA - layerB;
}

function DrawEntities()
{
	if(frame % 10 == 0) entities.sort(CompareLayers); // Sorts every 10 frames for greater speed
	for(var i = 0; i < entities.length; i++)
	{
		var object = entities[i];
		if(!object.alive) continue;
		if(object.Draw) object.Draw();
	}
}