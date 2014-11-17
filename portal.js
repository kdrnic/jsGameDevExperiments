function Portal(sw)
{
	this.SpawnWorld = sw;
}

Portal.prototype.Update = function(dt)
{
	for(var i = 0; i < entities.length; i++)
	{
		if(entities[i] == this) continue;
		if(!ExistentAndAlive(entities[i])) continue;
		if(Collision(this, entities[i]))
		{
			if(entities[i] instanceof Player)
			{
				// Remove all entities except player and create new world ones
				var player = entities[i];
				entities = [];
				this.SpawnWorld();
				player.x = 0;
				player.y = 0;
				AddEntity(player);
			}
		}
	}
}