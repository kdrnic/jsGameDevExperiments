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
	
	var pSouth =	new Portal(Math.random() < 0.5 ? SpawnWoods : SpawnVillage);
	var pNorth =	new Portal(Math.random() < 0.5 ? SpawnWoods : SpawnVillage);
	var pWest =		new Portal(Math.random() < 0.5 ? SpawnWoods : SpawnVillage);
	var pEast =		new Portal(Math.random() < 0.5 ? SpawnWoods : SpawnVillage);
	pSouth.x = pNorth.x = 0;
	pSouth.width = pNorth.width = 3000;
	pSouth.height = pNorth.height = 100;
	pEast.y = pWest.y = 0;
	pEast.height = pWest.height = 3000;
	pEast.width = pWest.width = 100;
	pSouth.y = -1500;
	pNorth.y = 1500;
	pWest.x = -1500;
	pEast.x = 1500;
	AddEntity(pSouth);
	AddEntity(pNorth);
	AddEntity(pWest);
	AddEntity(pEast);
	
	this.roomWidth = 3000;
	this.roomHeight = 3000;
}