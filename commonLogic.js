function Collision(a, b)
{
	if((Math.abs(a.x - b.x) < (a.width + b.width) * 0.5) && (Math.abs(a.y - b.y) < (a.height + b.height) * 0.5)) return true;
	return false;
}

function Parallax(img, spd)
{
	this.image = img;
	this.speed = spd;
}

Parallax.prototype.Draw = ParallaxDraw;

function AvoidSolids(object)
{
	var colliders = [false, false, false, false];
	for(var i = 0; i < entities.length; i++)
	{
		var other = entities[i];
		if(other == object) continue;
		if(!other.IsSolidTo) continue;
		if(!other.IsSolidTo(object)) continue;
		var vX = object.x - other.x, vY = object.y - other.y;
		var halfWidths = (object.width + other.width) * 0.5, halfHeights = (object.height + other.height) * 0.5;
		var oX = halfWidths - Math.abs(vX), oY = halfHeights - Math.abs(vY);
		if((Math.abs(vX) < halfWidths) && (Math.abs(vY) < halfHeights))
		{
			if(oX >= oY)
			{
				if(vY > 0)
				{
					colliders[0] = other;
					object.y += oY;
				}
				else
				{
					colliders[1] = other;
					object.y -= oY;
				}
			}
			else
			{
				if(vX > 0)
				{
					colliders[2] = other;
					object.x += oX;
				}
				else
				{
					colliders[3] = other;
				object.x -= oX;
				}
			}
		}
	}
	return colliders;
}

function ApplyFriction(object, xCoefficient, yCoefficient)
{
	if(!xCoefficient) xCoefficient = 1.0;
	if(!yCoefficient) yCoefficient = 0.0;
	var xFriction = 0;
	var yFriction = 0;
	if((object.colliders[1]) && (object.colliders[1].friction)) xFriction = object.colliders[1].friction;
	if((object.colliders[0]) && (object.colliders[0].friction)) xFriction = object.colliders[0].friction;
	if((object.colliders[2]) && (object.colliders[2].friction)) yFriction = object.colliders[2].friction;
	if((object.colliders[3]) && (object.colliders[3].friction)) yFriction = object.colliders[3].friction;
	xFriction *= xCoefficient;
	yFriction *= yCoefficient;
	xFriction *= Math.abs(object.ySpeed);
	yFriction *= Math.abs(object.xSpeed);
	if(xFriction < Math.abs(object.xSpeed)) object.xSpeed -= (xFriction * object.xSpeed) / Math.abs(object.xSpeed);
	else object.xSpeed = 0;
	if(yFriction < Math.abs(object.ySpeed)) object.ySpeed -= (yFriction * object.ySpeed) / Math.abs(object.ySpeed);
	else object.ySpeed = 0;
}

function PlatformerPhysicsUpdate()
{
	this.ySpeed += gravity;
	if(this.colliders[1])
	{
		this.oldX = this.x;
		this.oldY = this.y;
		if(this.colliders[1].dx) this.x += this.colliders[1].dx;
		if(this.colliders[1].dy) this.y += this.colliders[1].dy;
		AvoidSolids(this);
	}
	ApplyFriction(this);
	this.oldX = this.x;
	this.oldY = this.y;
	this.x += this.xSpeed;
	this.y += this.ySpeed;
	this.colliders = AvoidSolids(this);
	this.xSpeed = this.x - this.oldX;
	this.ySpeed = this.y - this.oldY;
}

function AlwaysReturnTrue(useless)
{
	return true;
}

function CameraFocusOn(obj)
{
	camera.x = obj.x - canvas.width * 0.5;
	camera.y = obj.y - canvas.height * 0.5;
}

function IsVisible(obj)
{
	var box = { x: camera.x, y: camera.y, width: canvas.width, height: canvas.height};
	return Collision(obj, box);
}

function IsVisibleTo(obj, obj2)
{
	if((Math.abs(obj.x - obj2.x) < (canvas.width + obj.width + obj2.width) * 0.5) && (Math.abs(obj.y - obj2.y) < (canvas.height + obj.height + obj2.height) * 0.5)) return true;
	return false;
}

function ExistentAndAlive(obj)
{
	if(!obj) return false;
	if(!obj.alive) return false;
	return true;
}

function BackAndForthUpdate()
{
	if(this.dx > 0)
	{
		this.flipH = true;
		this.x = Math.min(this.x1, this.x + this.dx);
		if(this.x == this.x1)
		{
			this.y = this.y1;
			this.dx *= -1;
			this.dy *= -1;
		}
		else this.y += this.dy;
	}
	else
	{
		this.flipH = false;
		this.x = Math.max(this.x0, this.x + this.dx);
		if(this.x == this.x0)
		{
			this.y = this.y0;
			this.dx *= -1;
			this.dy *= -1;
		}
		else this.y += this.dy;
	}
}

// tileName: tile filename string where %U, %R, %D and %L can be replaced by 0 or 1
function AutoTileNames(tileName)
{
	var autoMap =
	{
		tiles: [],
		tileset: [],
		x: 0,
		y: 0
	};
	
	for(var u = 0; u < 2; u++)
	{
		for(var r = 0; r < 2; r++)
		{
			for(var d = 0; d < 2; d++)
			{
				for(var l = 0; l < 2; l++)
				{
					autoMap.tileset.push(tileName.replace("%U", u).replace("%R", r).replace("%D", d).replace("%L", l));
				}
			}
		}
	}
	
	return autoMap.tileset;
}

// tileName: tile filename string where %U, %R, %D and %L can be replaced by 0 or 1
function AutoTileSet(tileName)
{
	var autoMap =
	{
		tiles: [],
		tileset: [],
		x: 0,
		y: 0
	};
	
	for(var u = 0; u < 2; u++)
	{
		for(var r = 0; r < 2; r++)
		{
			for(var d = 0; d < 2; d++)
			{
				for(var l = 0; l < 2; l++)
				{
					autoMap.tileset.push(data[tileName.replace("%U", u).replace("%R", r).replace("%D", d).replace("%L", l)]);
				}
			}
		}
	}
	
	return autoMap.tileset;
}

// binMap: 2D matrix of booleans
function AutoTileMap(binMap)
{
	var autoMap =
	{
		tiles: [],
		tileset: [],
		x: 0,
		y: 0
	};
	
	for(var c = 0; c < binMap.length; c++)
	{
		autoMap.tiles[c] = [];
		for(var r = 0; r < binMap[c].length; r++)
		{
			if(binMap[c][r] == false)
			{
				autoMap.tiles[c][r] = -1;
				continue;
			}
			
			var up =	(r > 0 						? binMap[c][r - 1] : false) ? 1 : 0;
			var right =	(c < binMap.length - 1		? binMap[c + 1][r] : false) ? 1 : 0;
			var down =	(r < binMap[c].length - 1	? binMap[c][r + 1] : false) ? 1 : 0;
			var left =	(c > 0						? binMap[c - 1][r] : false) ? 1 : 0;
			
			autoMap.tiles[c][r] = (up * 8) + (right * 4) + (down * 2) + left;
		}
	}
	
	return autoMap.tiles;
}