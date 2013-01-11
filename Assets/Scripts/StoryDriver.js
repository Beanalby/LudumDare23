#pragma strict

public var skin: GUISkin;

function Update() {
	if(Input.GetButtonDown("Fire1")) {
		Application.LoadLevel("selectPlanet");
	}
}

function OnGUI() {
	GUI.skin = skin;
	var fifthW = Screen.width/5;
	var fifthH = Screen.height/5;
	
	GUILayout.BeginArea(Rect(fifthW, fifthH, 3*fifthW, 4*fifthH));
	GUILayout.BeginVertical();
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("For many generations, the gigantic, glutunous people of Bulbous 5 have lorded their rotund advantages over the many tiny planets.");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();

		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("But now, a cluster of tiny asteroids approach, and only the tiny planets can save the short-sighted clods of Bulbous 5!");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	
	GUILayout.EndVertical();
	GUILayout.EndArea();
	
	GUILayout.BeginArea(Rect(0, 4*fifthH, 5*fifthW, fifthH));
	GUILayout.BeginVertical();
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		if(Mathf.Floor(Time.time*2) % 2) {
			GUILayout.Label("Left Click or CTRL to Continue");
		} else {
			GUILayout.Label("");
		}
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();

	GUILayout.EndVertical();
	GUILayout.EndArea();
	
}
