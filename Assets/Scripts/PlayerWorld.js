#pragma strict

public var accelRate: float = .2;
public var maxSpeed: float = 5;
public var spinSpeed: float = 1;

public var boundHorizontal:float = 15;
public var boundVertical:float = 10;

private var controllable: boolean= false;
private var planet: Transform = null;

function Start () {
	planet = transform.Find("planet");
}

function FixedUpdate() {
	planet.localEulerAngles.y += spinSpeed;
	if(controllable) {
   		rigidbody.velocity.x = AdjustVelocity(rigidbody.velocity.x,
   			accelRate * Input.GetAxisRaw("Horizontal"));
		rigidbody.velocity.y = AdjustVelocity(rigidbody.velocity.y,
			accelRate * Input.GetAxisRaw("Vertical"));
	}
	AdjustPosition();
}

function AdjustVelocity(v: float, adj: float) {
	if(adj!=0) {
		// apply the adjustment, within maxSpeed
		v+=adj;
		v=Mathf.Max(v, -maxSpeed);
		v=Mathf.Min(v, maxSpeed);
	}
	return v;
}

function AdjustPosition() {
	if(transform.position.x <= -boundHorizontal && rigidbody.velocity.x<0) {
		transform.position.x=-boundHorizontal;
		rigidbody.velocity.x=0;
	}
	if(transform.position.x >= boundHorizontal && rigidbody.velocity.x>0) {
		transform.position.x=boundHorizontal;
		rigidbody.velocity.x=0;
	}
	if(transform.position.y <= -boundVertical && rigidbody.velocity.y<0) {
		transform.position.y=-boundVertical;
		rigidbody.velocity.y=0;
	}
	if(transform.position.y >= boundVertical && rigidbody.velocity.y>0) {
		transform.position.y=boundVertical;
		rigidbody.velocity.y=0;
	}
}

function SetControllable(t: boolean) {
	controllable=t;
	BroadcastMessage("BroadcastControllable", t);
}