#pragma strict

public var playerWorldChoice: GameObject;
public var level: int=1;

function Awake() {
	DontDestroyOnLoad(transform.gameObject);
}
