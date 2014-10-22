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

MineEntrance.prototype.SpawnWorld = function()
{
	var ground = new Parallax(data["gfx/dirt1.gif"], 0);
	ground.layer = -2;
	AddEntity(ground);
	
	var rails =
	{
		Draw: TiledDraw,
		image: data["gfx/rails.png"],
		width: 37,
		height: 3000,
		x: 0,
		y: 0,
		layer: -1
	};
	AddEntity(rails);
}