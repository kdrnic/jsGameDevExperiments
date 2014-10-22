function Projectile()
{
}

Projectile.prototype.Update = function()
{
	if((this.frameDeath) && (frame >= this.frameDeath))
	{
		this.alive = false;
		return;
	}
	this.x += this.dx;
	this.y += this.dy;
	// Why two loops? So that objects spawned in positions they would die instantly do no harm (PRIMVM NON NOCERE)
	for(var i = 0; i < entities.length; i++)
	{
		var obj = entities[i];
		if(!obj.alive) continue;
		if(obj == this) continue;
		
		if(Collision(this, obj))
		{
			if((obj.IsSolidTo) && (obj.IsSolidTo(this)))
			{
				this.alive = false;
				return;
			}
		}
	}
	for(var i = 0; i < entities.length; i++)
	{
		var obj = entities[i];
		if(!obj.alive) continue;
		if(obj == this) continue;
		
		if(Collision(this, obj))
		{
			if(obj.Hit == this.targetHit)
			{
				obj.Hit(this.damage);
				this.alive = false;
			}
		}
	}
}