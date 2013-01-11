#pragma strict

public var soundCharge: AudioClip;
public var soundFire: AudioClip;

public var delay: float = 1;
public var duration: float = 1;

private var charging: boolean = false;
private var charged: float=0;
private var firing: boolean = false;
private var fired: float=0;

private var controllable: boolean = true;
// firing starts the game, don't make that same press
// also fire the weapons.
private var consumeFire = false;

function Start () {
	// Just in case the unity project has the laser on...
	StopLaser();
}

function Update () {
	if(controllable) {
		if(Input.GetButtonDown("Fire1")) {
			if(consumeFire) {
				consumeFire=false;
				return;
			}
			// only allow them to charge if they aren't mashing
			if(charged+(delay/2) < Time.time && fired+(delay/2) < Time.time)
				ChargeLaser();
		}
		if(Input.GetButtonUp("Fire1")) {
			// Releasing the button always stops
			StopLaser();
		}
		if(charging && !firing) {
			// we're charging teh lazer, see if we can fire
			if(charged+delay < Time.time)	{
				FireLaser();
			}
		}
	}
	if(firing) {
		// shut it off if it's going too long
		if(fired+duration < Time.time) {
			StopLaser();
		}
	}
}

function ChargeLaser() {
	Debug.Log("Charging @ " + Time.time);
	AudioSource.PlayClipAtPoint(soundCharge, Camera.main.transform.position);
	charging=true;
	charged = Time.time;
}

function FireLaser() {
	Debug.Log("Firing @ " + Time.time);	
	GetComponent(LineRenderer).enabled = true;
	GetComponent(BoxCollider).enabled = true;
	AudioSource.PlayClipAtPoint(soundFire, Camera.main.transform.position);
	firing=true;
	fired=Time.time;
	charging=false;
}

function StopLaser() {
	Debug.Log("Stopping @ " + Time.time);
	GetComponent(LineRenderer).enabled = false;
	GetComponent(BoxCollider).enabled = false;
	charging=false;
	firing=false;
}

function BroadcastControllable(t: boolean) {
	controllable = t;
	consumeFire=true;
}