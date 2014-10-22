function Player()
{
}

Player.prototype.layer = 1;

Player.prototype.Hit = function(dmg)
{
	this.health -= dmg;
}