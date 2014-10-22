function InitJigga()
{
	var j = NewEntity();
	j.x = j.y = 0;
	j.width = j.height = 75;
	j.image = data["gfx/jiggawattOfficial.jpg"];
	j.Draw = ImageDraw;
	j.Update = JiggaUpdate;
	j.speed = 5;
	j.health = 100;
	j.Hit = JiggaHit;
}

function JiggaHit(dmg)
{
	this.health -= dmg;
}

function JiggaUpdate()
{
	var dx = 0, dy = 0;
	if(keys["keyLeft"].state != 0) dx = -1;
	if(keys["keyRight"].state != 0) dx = 1;
	if(keys["keyUp"].state != 0) dy = -1;
	if(keys["keyDown"].state != 0) dy = 1;
	var dl = Math.sqrt((dx * dx) + (dy * dy));
	if(dl != 0)
	{
		dx *= this.speed / dl;
		dy *= this.speed / dl;
	}
	
	this.x += dx;
	this.y += dy;
	AvoidSolids();
	
	CameraFocusOn(this);
}