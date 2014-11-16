dataSrcs.push("gfx/rails.png");
dataSrcs.push("gfx/dirt1.gif");
for(var i = 1; i <= 3; i++) dataSrcs.push("gfx/rock" + i + ".png");
dataSrcs.push("gfx/caveWall.png");

function SpawnMine()
{
	var ground = new Parallax(data["gfx/dirt1.gif"], 0);
	ground.layer = -3;
	AddEntity(ground);
	
	var rails =
	{
		Draw: TiledDraw,
		image: data["gfx/rails.png"],
		width: 37,
		height: 3000,
		x: 0,
		y: 0,
		layer: -2
	};
	AddEntity(rails);
	
	for(var i = 0; i < 45; i++)
	{
		var image = data["gfx/rock" + Math.ceil(Math.random() * 3) + ".png"];
		var rock =
		{
			Draw: ImageDraw,
			image: image,
			width: image.width,
			height: image.height,
			x: 1450 - Math.random() * 2900,
			y: 1450 - Math.random() * 2900,
			layer: 0,
			IsSolidTo: AlwaysReturnTrue
		};
		AddEntity(rock);
	}
	
	var m = new MineExit();
	m.x = 1450 - Math.random() * 2900;
	m.y = 1450 - Math.random() * 2900;
	AddEntity(m);
	
	var wallSouth =
	{
		Draw: TiledDraw2,
		image: data["gfx/caveWall.png"],
		width: 3000,
		height: 100,
		x: 0,
		y: 1450,
		layer: -1,
		IsSolidTo: AlwaysReturnTrue
	};
	AddEntity(wallSouth);
	
	var wallNorth =
	{
		Draw: TiledDraw2,
		image: data["gfx/caveWall.png"],
		width: 3000,
		height: 100,
		x: 0,
		y: -1450,
		layer: -1,
		IsSolidTo: AlwaysReturnTrue
	};
	AddEntity(wallNorth);
	
	var wallWest =
	{
		Draw: TiledDraw2,
		image: data["gfx/caveWall.png"],
		width: 100,
		height: 3000,
		x: -1450,
		y: 0,
		layer: -1,
		IsSolidTo: AlwaysReturnTrue
	};
	AddEntity(wallWest);
	
	var wallEast =
	{
		Draw: TiledDraw2,
		image: data["gfx/caveWall.png"],
		width: 100,
		height: 3000,
		x: 1450,
		y: 0,
		layer: -1,
		IsSolidTo: AlwaysReturnTrue
	};
	AddEntity(wallEast);
	
	this.roomWidth = 3000;
	this.roomHeight = 3000;
}

dataSrcs.push("gfx/mineEntrance.png");

function MineEntrance()
{
	this.x = 500 - Math.random() * 1000;
	this.y = 500 - Math.random() * 1000;
	this.width = 120;
	this.height = 105;
	this.image = data["gfx/mineEntrance.png"];
	
	this.Draw = ImageDraw;
}

MineEntrance.prototype = new Entrance();

MineEntrance.prototype.SpawnWorld = SpawnMine;

dataSrcs.push("gfx/mineExit2.png");

function MineExit()
{
	this.x = 0;
	this.y = 0;
	this.width = 85;
	this.height = 70;
	this.offsetY = 15;
	this.image = data["gfx/mineExit2.png"];
	
	this.Draw = ImageDraw;
}

MineExit.prototype = new Entrance();

MineExit.prototype.SpawnWorld = SpawnWoods;