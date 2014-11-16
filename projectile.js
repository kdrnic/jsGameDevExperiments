function Projectile()
{
}

Projectile.prototype.layer = 2;

Projectile.prototype.Update = function(dt)
{
	if(this.lifeTime)
	{
		this.lifeTime -= dt;
		if(this.lifeTime <= 0)
		{
			this.alive = false;
			return;
		}
	}
	this.x += this.dx * dt;
	this.y += this.dy * dt;
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