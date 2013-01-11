#pragma strict

public var skin: GUISkin;
public var playerWorld: GameObject;
public var duration: float = 20;

public var healthPos: Vector2 = new Vector2(20, 40);
public var healthSize: Vector2 = new Vector2(200, 16);
public var healthFull: Texture2D;
public var healthEmpty: Texture2D;

public var progressPos: Vector2 = Vector2(-220, 40);
public var progressSize: Vector2 = Vector2(200, 10);
public var progressBackground: Texture2D;
public var progressIcon: Texture2D;

private var state: GameState;

private var player: PlayerWorld;
private var scrollbg: ScrollingBackground;
private var healthPercent: float = 1;
private var playingStart: float = 0;
private var progressPercent: float = 0;

private var gameState: String;
private var chucker: AsteroidChucker;

function Start() {
	var stateObj = GameObject.Find("GameState");
	if(stateObj!=null) {
		state = stateObj.GetComponent(GameState);
		playerWorld = state.playerWorldChoice;
		Debug.Log("Pulled " + playerWorld.name + " from state");
	} else {
		Debug.Log("No state :(");
		var obj = new GameObject("GameState");
		state = obj.AddComponent(GameState) as GameState;
		state.playerWorldChoice = playerWorld;
	}
	
	scrollbg = GameObject.Find("ScrollingBackground").GetComponent(ScrollingBackground);
	scrollbg.rate = state.level;
	
	chucker = GameObject.Find("AsteroidChucker").GetComponent(AsteroidChucker);
	chucker.enabled = false;
	chucker.SetLevel(state.level);

	if(progressPos.x<0)
		progressPos.x = Screen.width + progressPos.x;
		
	player = Instantiate(playerWorld, Vector3(0,0,0), Quaternion.identity).GetComponent(PlayerWorld);
	player.name="PlayerWorld";
	player.SetControllable(false);
	// player.SetControllable(false);
	gameState="intro";
	// StartGame();
}

function StartGame() {
	gameState="playing";
	playingStart = Time.time;
	player.SetControllable(true);
	chucker.enabled = true;
}

function Update () {
	if(gameState=="intro") {
		if(Input.GetButtonDown("Fire1"))
			StartGame();
	}
	if(gameState=="playing") {
		progressPercent = (Time.time-playingStart)/duration;
		if(progressPercent>=1)
			OnSuccess();
	}
}

function OnSuccess() {
	gameState="success";
	player.SetControllable(false);
	chucker.RemoveAsteroids();
	chucker.enabled=false;

}

function OnFail() {
	gameState="fail";
	player.SetControllable(false);
	chucker.enabled=false;
}


function OnGUI() {
	GUI.skin = skin;
	DrawMainGUI();
	
	if(gameState=="intro") {
		DrawIntroGUI();
	}
	if(gameState=="fail") {
		DrawFailGUI();
	}
	if(gameState=="success") {
		DrawSuccessGUI();
	}
}

function DrawMainGUI() {
	var fifthW = Screen.width / 5;
	var fifthH = Screen.height / 5;
	
	// we want our labels in a box, but left centered
	var boxStyle = skin.box;
	boxStyle.alignment = TextAnchor.UpperLeft;
	
	GUI.BeginGroup(new Rect(healthPos.x, healthPos.y, Screen.width, Screen.height));
		var healthAmt: int = healthPercent * healthSize.x;
		GUI.DrawTexture(Rect(0, 0, healthSize.x, healthSize.y), healthEmpty);
		GUI.DrawTexture(Rect(0, 0, healthAmt, healthSize.y), healthFull);
		GUI.Box(Rect(0, healthSize.y+5, healthSize.x, 25),
			"Bulbous 5's Health", boxStyle);
	GUI.EndGroup();

	var halfWidth = progressIcon.width/2;
	GUI.BeginGroup(new Rect(progressPos.x-halfWidth, progressPos.y, Screen.width, Screen.height));
		GUI.DrawTexture(Rect(halfWidth, progressIcon.height,
			progressSize.x, progressSize.y), progressBackground);
		var xpos = (progressSize.x*progressPercent);
		GUI.DrawTexture(Rect(xpos, 0, progressIcon.width, progressIcon.height), progressIcon);
		GUI.Box(Rect(halfWidth, progressSize.y+progressIcon.height+5, progressSize.x, 25), "Asteroid Field Progress", boxStyle);
	GUI.EndGroup();

	if(state.level != 1) {
		GUILayout.BeginArea(Rect(fifthW, 40, 3*fifthW, 100));
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("Level " + state.level);
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
		GUILayout.EndArea();		
	}
}

function DrawIntroGUI() {
	if(state.level==1) {
		DrawFirstIntroGUI();
	} else {
		DrawOtherIntroGUI();
	}
}

function DrawFirstIntroGUI() {
	var fifthW = Screen.width / 5;
	var fifthH = Screen.height / 5;
	GUILayout.BeginArea(Rect(fifthW, fifthH, 3*fifthW, fifthH));
	GUILayout.BeginVertical();
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("Protect the lazy jreks on Bulbous 5!");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
		
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("Destroy or push away all asteroids!");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	GUILayout.EndVertical();
	GUILayout.EndArea();
	
	GUILayout.BeginArea(Rect(fifthW, 2*fifthH, fifthW, fifthH));
		GUILayout.BeginVertical();
			GUILayout.BeginHorizontal();
			GUILayout.FlexibleSpace();
			GUILayout.Label("Move with:");
			GUILayout.FlexibleSpace();
			GUILayout.EndHorizontal();
		GUILayout.EndVertical();
		GUILayout.FlexibleSpace();
		GUILayout.BeginVertical();
			GUILayout.BeginHorizontal();
			GUILayout.FlexibleSpace();
			GUILayout.Label("Arrow keys");
			GUILayout.FlexibleSpace();
			GUILayout.EndHorizontal();
		GUILayout.EndVertical();
		GUILayout.FlexibleSpace();
		GUILayout.BeginVertical();
			GUILayout.BeginHorizontal();
			GUILayout.FlexibleSpace();
			GUILayout.Label("or");
			GUILayout.FlexibleSpace();
			GUILayout.EndHorizontal();
		GUILayout.EndVertical();
		GUILayout.FlexibleSpace();
		GUILayout.BeginVertical();
			GUILayout.BeginHorizontal();
			GUILayout.FlexibleSpace();
			GUILayout.Label("W A S D");
			GUILayout.FlexibleSpace();
			GUILayout.EndHorizontal();
		GUILayout.EndVertical();
	GUILayout.EndArea();

	GUILayout.BeginArea(Rect(3*fifthW, 2*fifthH, fifthW, fifthH));
		GUILayout.BeginVertical();
			GUILayout.BeginHorizontal();
			GUILayout.FlexibleSpace();
			GUILayout.Label("Fire with:");
			GUILayout.FlexibleSpace();
			GUILayout.EndHorizontal();
		GUILayout.EndVertical();
		GUILayout.FlexibleSpace();
		GUILayout.BeginVertical();
			GUILayout.BeginHorizontal();
			GUILayout.FlexibleSpace();
			GUILayout.Label("CTRL");
			GUILayout.FlexibleSpace();
			GUILayout.EndHorizontal();
		GUILayout.EndVertical();
		GUILayout.FlexibleSpace();
		GUILayout.BeginVertical();
			GUILayout.BeginHorizontal();
			GUILayout.FlexibleSpace();
			GUILayout.Label("or");
			GUILayout.FlexibleSpace();
			GUILayout.EndHorizontal();
		GUILayout.EndVertical();
		GUILayout.FlexibleSpace();
		GUILayout.BeginVertical();
			GUILayout.BeginHorizontal();
			GUILayout.FlexibleSpace();
			GUILayout.Label("Left Click");
			GUILayout.FlexibleSpace();
			GUILayout.EndHorizontal();
		GUILayout.EndVertical();
	GUILayout.EndArea();

	GUILayout.BeginArea(Rect(0, 4*fifthH, 5*fifthW, fifthH));
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("Press FIRE to begin!");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	GUILayout.EndArea();
}

function DrawOtherIntroGUI() {
	var fifthW = Screen.width / 5;
	var fifthH = Screen.height / 5;
	GUILayout.BeginArea(Rect(fifthW, fifthH, 3*fifthW, fifthH));
	GUILayout.BeginVertical();
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		if(state.level==2) {
			GUILayout.Label("Uh oh, even MORE asteroids!");
		} else if(state.level==3) {
			GUILayout.Label("They're coming harder, better, faster, AND stronger!");
		} else if(state.level==4) {
			GUILayout.Label("Yep, the asteroids do really change between levels.");
		} else if(state.level==5) {
			GUILayout.Label("Ok, this probably isn't fair anymore...");
		} else {
			GUILayout.Label("Didn't think you'd get here.");
		}
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
		
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		if(state.level==2) {
			GUILayout.Label("Keep saving those worthless plods!");
		} else if(state.level==3) {
			GUILayout.Label("Keep protecting the planet!");
		} else if(state.level==4) {
			GUILayout.Label("Playtest balancing?  What's that?");
		} else if(state.level==5) {
			GUILayout.Label("Good Luck!");
		} else {
			GUILayout.Label("Have fun!");
		}
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	GUILayout.EndVertical();
	GUILayout.EndArea();


	GUILayout.BeginArea(Rect(0, 4*fifthH, 5*fifthW, fifthH));
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("Press FIRE to begin!");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	GUILayout.EndArea();
}

function DrawFailGUI() {
	GUILayout.BeginArea(new Rect(Screen.width/2-100, Screen.height/2-100, 200, 200));
	GUILayout.BeginVertical();
		
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("You FAIL!");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
		
		GUILayout.FlexibleSpace();

		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		if(GUILayout.Button("Choose another planet")) {
			Restart();
		}
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
		
	GUILayout.EndVertical();	
	GUILayout.EndArea();
}

function DrawSuccessGUI() {
	GUILayout.BeginArea(new Rect(Screen.width/2-100, Screen.height/2-200, 400, 200));
	GUILayout.BeginVertical();
		
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("You win!");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();

		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("Bulbous 5 is safe!");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();

		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("But wait, what's that?!");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
		
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		if(GUILayout.Button("Continue")) {
			AdvanceLevel();
		}
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
		
	GUILayout.EndVertical();	
	GUILayout.EndArea();
}

function AdvanceLevel() {
	state.level+=1;
	Application.LoadLevel(Application.loadedLevel);
}

function Restart() {
	Destroy(state.gameObject);
	Application.LoadLevel("selectPlanet");
}

// functions invoked by other components to alter the game
function SetHealthPercent(percent: float) {
	healthPercent=percent;
}

function OnBigDaddyDeath() {
	OnFail();
}
