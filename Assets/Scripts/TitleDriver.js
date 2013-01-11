#pragma strict

public var skin: GUISkin;
public var title: Texture2D;

function Update() {
	if(Input.GetButtonDown("Fire1")) {
		Application.LoadLevel("storyScene");
	}
}

function OnGUI() {
	GUI.skin = skin;
	var fifthW = Screen.width/5;
	var fifthH = Screen.height/5;
	
	var padLeft: int = (Screen.width - title.width) / 2;
	GUI.DrawTexture(Rect(padLeft, 0, title.width, title.height), title);
	
	GUILayout.BeginArea(Rect(0, 4*fifthH, 5*fifthW, fifthH));
	GUILayout.BeginVertical();
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		if(Mathf.Floor(Time.time) % 2) {
			GUILayout.Label("FREE PLAY");
		} else {
			GUILayout.Label("");
		}
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();

		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("Left Click or CTRL to Start");
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	
	GUILayout.EndVertical();
	GUILayout.EndArea();
}

