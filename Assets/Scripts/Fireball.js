#pragma strict

public var speed: float = .75;
public var deathEffect: GameObject;

function Start () {

}

function Update () {
	transform.position.x+=speed;
}

function OnCollisionEnter(collision: Collision) {
	Debug.Log("Fireball collided with " + collision.collider.name);
	if(collision.collider.name=="PlayerWorld") {
		return;
	}
	Instantiate(deathEffect, transform.position, Quaternion.identity);
	Destroy(gameObject);
}