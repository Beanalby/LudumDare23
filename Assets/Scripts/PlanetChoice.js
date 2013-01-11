#pragma strict
public var spinSpeed:float = 0.5;
public var choiceValue: GameObject;
public var choiceEffect: GameObject;

private var zoomSpeed:float = .05;
private var isHighlight: boolean = false;
private var isChoice: boolean = false;
private var inactivePos: Vector3;
private var highlightPos: Vector3;
private var myChoiceEffect: GameObject;

private var planet: Transform;

function Start() {
	myChoiceEffect=null;
	inactivePos = transform.position;
	highlightPos = inactivePos;
	highlightPos = Vector3.Lerp(inactivePos, Camera.main.transform.position, .25);
	planet = transform.Find("planet");
}

function Update () {
	planet.localEulerAngles.y += spinSpeed;
	if(isHighlight) {
		MoveTo(highlightPos);
	} else {
		MoveTo(inactivePos);
	}
}

function MoveTo(pos: Vector3) {
	transform.position = Vector3.Lerp(transform.position, pos, zoomSpeed);	
}

function SetHighlight(t: boolean) {
	isHighlight=t;
}

function SetChoice(t: boolean) {
	isChoice = t;
	if(isChoice) {
		if(myChoiceEffect==null) {
			myChoiceEffect = Instantiate(choiceEffect,
				transform.position, choiceEffect.transform.rotation);
			myChoiceEffect.transform.parent = transform;
		}
	} else {
		if(myChoiceEffect!=null) {
			Destroy(myChoiceEffect);
		}
	}
}

function GetDisplayName() {
	return planet.GetComponent(PlanetInfo).displayName;
}