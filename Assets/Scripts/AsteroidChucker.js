#pragma strict

public var asteroid: GameObject;
public var speedVariation: float=.5;

public var baseAsteroidSpeed: float=5;
public var baseSecBetweenSpawn: float=2;

public var deltaAsteroidSpeed: float=2;
public var deltaSecBetweenSpawn: float=-.25;

public var asteroidSpin: float=5;
public var verticalRadius = 10;

private var lastSpawn: float=0;
private var count: int = 0;

private var asteroidSpeed: float=2;
private var secBetweenSpawn: float=2;

private var asteroids = Array();

function Start () {
	lastSpawn=Time.time;
}

function Update () {
	if(lastSpawn+secBetweenSpawn < Time.time) {
		var p = transform.position;
		var newpos = Vector3(p.x,
			Random.Range(p.y-verticalRadius, p.y+verticalRadius),
			p.z);
		var newobj: GameObject = Instantiate(asteroid, newpos, Quaternion.identity);
		count++;
		newobj.name = "asteroid"+count;

		var v = asteroidSpeed*speedVariation;
		newobj.rigidbody.velocity.x=-asteroidSpeed+Random.Range(-v, v);
		
		newobj.rigidbody.angularVelocity=Vector3(
			Random.Range(-asteroidSpin, asteroidSpin),
			Random.Range(-asteroidSpin, asteroidSpin),
			Random.Range(-asteroidSpin, asteroidSpin));
		lastSpawn = Time.time;
		asteroids.Add(newobj);
	}
}

function RemoveAsteroids() {
	var asteroid: GameObject;
	for(var i=0;i<asteroids.length; i++) {
		asteroid = asteroids[i] as GameObject;
		if(asteroid==null)
			continue;
		asteroid.GetComponent(Asteroid).AsteroidDie(true);
	}
}

function SetLevel(level: int) {
	level--;
	asteroidSpeed = baseAsteroidSpeed + (level*deltaAsteroidSpeed);
	secBetweenSpawn = baseSecBetweenSpawn + (level*deltaSecBetweenSpawn);
	Debug.Log("Level set to " + level + ", speed/sec = "
		+ asteroidSpeed + "," + secBetweenSpawn);
}