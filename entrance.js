function Entrance()
{
}

Entrance.prototype.Update = function(dt)
{
	for(var i = 0; i < entities.length; i++)
	{
		if(entities[i] == this) continue;
		if(!ExistentAndAlive(entities[i])) continue;
		if(Collision(this, entities[i]))
		{
			if(entities[i] instanceof Player)
			{
				if(keys["keyAction"].state == 1)
				{
					// Remove all entities except player and create new world ones
					var player = entities[i];
					entities = [];
					AddEntity(player);
					this.SpawnWorld();
				}
			}
		}
	}
}