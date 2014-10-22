function Player()
{
}

Player.prototype.Hit = function(dmg)
{
	this.health -= dmg;
}