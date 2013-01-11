#pragma strict

public var soundDamage: AudioClip;
public var maxHealth: float = 5;

private var currentHealth: float;
private var driver: GameDriver;

function Start () {
	currentHealth=maxHealth;
	driver = GameObject.Find("GameDriver").GetComponent(GameDriver);
	driver.SetHealthPercent(currentHealth/maxHealth);
}

function Update () {

}

function AsteroidHit(asteroid: GameObject, collision: Collision) {
	var c: ContactPoint = collision.contacts[0];
	AudioSource.PlayClipAtPoint(soundDamage, Camera.main.transform.position);
	var asteroidScript: Asteroid = asteroid.GetComponent("Asteroid") as Asteroid;
	asteroidScript.AsteroidDie(false);
	TakeDamage(1);
}

function TakeDamage(amount: float) {
	currentHealth -= amount;
	if(currentHealth <=0) {
		currentHealth=0;
	}
	driver.SetHealthPercent(currentHealth/maxHealth);
	if(currentHealth==0) {
		driver.OnBigDaddyDeath();
	}
}