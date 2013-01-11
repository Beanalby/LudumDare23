#pragma strict

public var skin: GUISkin;

private var currentChoice: PlanetChoice;
private var currentMouseover: GameObject;
private var state: GameState;

function Start () {
	state = GameObject.Find("GameState").GetComponent(GameState);
}

function Update () {
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hit: RaycastHit;
	if(Physics.Raycast(ray, hit, Mathf.Infinity)) {
		var obj = hit.collider.gameObject;
		if(obj != currentMouseover) {
			if(currentMouseover!=null)
				currentMouseover.GetComponent(PlanetChoice).SetHighlight(false);
			currentMouseover = obj;
			currentMouseover.GetComponent(PlanetChoice).SetHighlight(true);
		}
		if(Input.GetButtonDown("Fire1")) {
			SetChoice(hit.collider.gameObject.GetComponent(PlanetChoice));
		}
	} else {
		if(currentMouseover!=null) {
			currentMouseover.GetComponent(PlanetChoice).SetHighlight(false);
			currentMouseover=null;
			
		}
	}
}

function SetChoice(choice: PlanetChoice) {
	if(currentChoice!=null) {
		currentChoice.SetChoice(false);
	}
	state.playerWorldChoice = choice.choiceValue;
	currentChoice=choice;
	currentChoice.SetChoice(true);
}

function SubmitChoice() {
	if(currentChoice==null) {
		return;
	}
	Application.LoadLevel("asteroidField");
}

function OnGUI() {
	GUI.skin = skin;
	GUILayout.BeginArea(Rect(0, 10, Screen.width, 200));
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("Choose your tiny planet");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	GUILayout.EndArea();
	
	var fifthW = Screen.width*.2;
	var fifthH = Screen.height*.2;
	
	GUILayout.BeginArea(Rect(fifthW, fifthH, fifthW, fifthH));
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("Mechania");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	GUILayout.EndArea();
	
	GUILayout.BeginArea(Rect(.5*fifthW, 3*fifthH, 1.5*fifthW, fifthH));
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("The Silastic Armorfiends of Mechania are an avanced tech civilization using lasers to conquer neighboring galaxies for their bacon.");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	GUILayout.EndArea();
	
	GUILayout.BeginArea(Rect(3*fifthW, fifthH, fifthW, fifthH));
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("Conflagus");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	GUILayout.EndArea();

	GUILayout.BeginArea(Rect(3*fifthW, 3*fifthH, 1.5*fifthW, fifthH));
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("A sentient world of fire, Conflagus hurls fireballs at any threats.  Or nearby kittens.  Conflagus hates kittens.");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	GUILayout.EndArea();

	var buttonMessage: String;
	if(currentChoice==null) {
		buttonMessage="Choose a planet!";
	} else {
		buttonMessage=currentChoice.GetDisplayName() + ", I choose you!";
	}

	GUILayout.BeginArea(Rect(0, 4*fifthH, 5*fifthW, fifthH));
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		if(GUILayout.Button(buttonMessage)) {
			SubmitChoice();
		}
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	GUILayout.EndArea();
}
