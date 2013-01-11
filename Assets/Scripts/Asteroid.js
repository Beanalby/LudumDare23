#pragma strict

public var deathEffect: GameObject;
public var deathSound: AudioClip;

function Start () {
}

function Update () {
}

function AsteroidDie(makeNoise: boolean) {
	Instantiate(deathEffect, transform.position, Quaternion.identity);
	if(makeNoise)
		AudioSource.PlayClipAtPoint(deathSound, Camera.main.transform.position);
	Destroy(gameObject);
}

function OnTriggerEnter(other: Collider) {
	AsteroidDie(true);
}

function OnCollisionEnter(collision: Collision) {
	var g = collision.gameObject;
	if(g.name=="BigDaddy") {
		var bigDaddy = g.GetComponent(BigDaddy);
		bigDaddy.AsteroidHit(gameObject, collision);
	}
}
