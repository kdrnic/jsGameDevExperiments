function Enemy()
{
}

Enemy.prototype.health = 50;
Enemy.prototype.layer = 1;

Enemy.prototype.Hit = function(dmg)
{
	this.health -= dmg;
}

Enemy.prototype.IsSolidTo = function(ent)
{
	return (ent instanceof Player);
}