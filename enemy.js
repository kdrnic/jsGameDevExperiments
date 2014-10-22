function Enemy()
{
}

Enemy.prototype.health = 50;

Enemy.prototype.Hit = function(dmg)
{
	this.health -= dmg;
}