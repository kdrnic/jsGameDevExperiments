for(var i = 1; i <= 6; i++) dataSrcs.push("gfx/house" + i + ".png");

function SpawnHouse()
{
}

function House()
{
	this.x = 0;
	this.y = 0;
	this.width = 96;
	this.height = 96;
	this.image = data["gfx/house" + Math.ceil(Math.random() * 6) + ".png"];
	
	this.Draw = ImageDraw;
}

House.prototype = new Entrance();

House.prototype.SpawnWorld = SpawnHouse;

dataSrcs.push("gfx/grass2.jpg");
(function(){ var t = AutoTileNames("gfx/path%U%R%D%L.png"); for(var i = 0; i < t.length; i++) dataSrcs.push(t[i]); })();

function SpawnVillage()
{
	var ground = new Parallax(data["gfx/grass2.jpg"], 0);
	ground.layer = -3;
	AddEntity(ground);
	
	var size = Math.ceil(Math.random() * 12);
	var boxes = [];
	var numBoxes = Math.ceil(Math.random() * 3) + 3;
	for(var i = 0; i < numBoxes; i++)
	{
		var b =
		{
			x: Math.floor((size - 6) * Math.random()),
			y: Math.floor((size - 6) * Math.random()),
			s: 4
		};
		for(var j = 0; j < boxes.length; j++)
		{
			var o = boxes[j];
			if(b.x + b.s < o.x) continue;
			if(b.x > o.x + o.s) continue;
			if(b.y + b.s < o.y) continue;
			if(b.y > o.y + o.s) continue;
			if(b.x + b.s / 2 > o.x + o.s / 2) b.x += 6;
			else b.x -= 6;
			if(b.y + b.s / 2 > o.y + o.s / 2) b.y += 6;
			else b.y -= 6;
		}
		boxes.push(b);
	}
	
	var minX = 99;
	var minY = 99;
	var maxX = -99;
	var maxY = -99;
	for(var j = 0; j < boxes.length; j++)
	{
		var o = boxes[j];
		if(o.x < minX) minX = o.x;
		if(o.y < minY) minY = o.y;
		if(o.y + o.s > maxY) maxY = o.y + o.s;
		if(o.x + o.s > maxX) maxX = o.x + o.s;
	}
	for(var j = 0; j < boxes.length; j++)
	{
		boxes[j].x -= minX;
		boxes[j].y -= minY;
	}
	
	size = Math.max(maxX - minX, maxY - minY);
	var binMap = [];
	for(var c = 0; c < size; c++)
	{
		binMap[c] = [];
		for(var r = 0; r < size; r++) binMap[c][r] = false;
	}
	
	for(var i = 0; i < boxes.length; i++)
	{
		var b = boxes[i];
		var obi = i;
		while(obi == i) obi = Math.floor(boxes.length * Math.random());
		var ob = boxes[obi];
		
		var sx = b.x + 1 + (i % 2);
		var sy = b.y + 1 + (i % 2);
		var ex = ob.x + 1 + (obi % 2);
		var ey = ob.y + 1 + (obi % 2);
		var xFirst = Math.random() < 0.5 ? true : false;
		
		while((sx != ex) || (sy != ey))
		{
			binMap[sx][sy] = true;
			if(xFirst)
			{
				if(sx < ex) sx++;
				else if(sx > ex) sx--;
				else if(sy < ey) sy++;
				else if(sy > ey) sy--;
			}
			else
			{
				if(sy < ey) sy++;
				else if(sy > ey) sy--;
				else if(sx < ex) sx++;
				else if(sx > ex) sx--;
			}
		}
	}
	
	var indexChurch = Math.floor(Math.random() * boxes.length);
	
	for(var i = 0; i < boxes.length; i++)
	{
		for(var x = boxes[i].x; x < boxes[i].x + boxes[i].s; x++)
		{
			for(var y = boxes[i].y; y < boxes[i].y + boxes[i].s; y++)
			{
				if((x == boxes[i].x) || (y == boxes[i].y) || (x == boxes[i].x + boxes[i].s - 1) || (y == boxes[i].y + boxes[i].s - 1)) binMap[x][y] = true;
				else binMap[x][y] = false;
			}
		}
		
		if(i != indexChurch)
		{
			var h = new House();
			h.x = (boxes[i].x - size * 0.5 + boxes[i].s * 0.5) * 128;
			h.y = (boxes[i].y - size * 0.5 + boxes[i].s * 0.5) * 128;
			AddEntity(h);
		}
		else
		{
			Church = House;
			var c = new Church();
			c.x = (boxes[i].x - size * 0.5 + boxes[i].s * 0.5) * 128;
			c.y = (boxes[i].y - size * 0.5 + boxes[i].s * 0.5) * 128;
			AddEntity(c);
		}
	}
	
	var path =
	{
		Draw: TileMapDraw,
		x: -size * 128 * 0.5,
		y: -size * 128 * 0.5,
		tiles: AutoTileMap(binMap),
		tileset: AutoTileSet("gfx/path%U%R%D%L.png"),
		layer: -2
	};
	AddEntity(path);
}