for(var i = 1; i <= 5; i++) dataSrcs.push("gfx/tree" + i + ".png");
dataSrcs.push("gfx/grass3.jpg");

function SpawnWoods()
{
	var ground = new Parallax(data["gfx/grass3.jpg"], 0);
	ground.layer = -3;
	AddEntity(ground);
	
	for(var i = 0; i < 45; i++)
	{
		var image = data["gfx/tree" + Math.ceil(Math.random() * 5) + ".png"];
		var tree =
		{
			Draw: ImageDraw,
			image: image,
			width: 30,
			height: 75,
			offsetY: 96,
			layer: 2,
			x: 1450 - Math.random() * 2900,
			y: 1450 - Math.random() * 2900,
			IsSolidTo: AlwaysReturnTrue
		};
		AddEntity(tree);
	}
	
	for(var i = 0; i < 5; i++)
	{
		var s = new Skull();
		s.x = 1450 - Math.random() * 2900;
		s.y = 1450 - Math.random() * 2900;
		AddEntity(s);
	}
	
	var m = new MineEntrance();
	m.x = 1450 - Math.random() * 2900;
	m.y = 1450 - Math.random() * 2900;
	AddEntity(m);
	
	this.roomWidth = 3000;
	this.roomHeight = 3000;
}