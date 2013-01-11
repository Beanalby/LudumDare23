#pragma strict
public var fireball: GameObject;
public var soundFire: AudioClip;
public var cooldown: float = .5;

private var lastFired: float = 0;

private var controllable: boolean = true;

// firing starts the game, don't make that same press
// also fire the weapons.
private var consumeFire = false;

function Start () {

}

function Update () {
	if(!controllable)
		return;
	if(Input.GetButtonDown("Fire1") && lastFired+cooldown < Time.time) {
		if(consumeFire) {
			consumeFire=false;
			return;
		}
		LaunchFireball();
	}
}

function LaunchFireball() {
	var ball = Instantiate(fireball, transform.position, Quaternion.identity);
	AudioSource.PlayClipAtPoint(soundFire, Camera.main.transform.position);
	lastFired=Time.time;
}

function BroadcastControllable(t: boolean) {
	controllable=t;
	consumeFire=true;
}
