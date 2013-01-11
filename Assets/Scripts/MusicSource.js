#pragma strict

public var clip: AudioClip;

private var source: AudioSource;

function Awake() {
	DontDestroyOnLoad(transform.gameObject);
	source = GetComponent(AudioSource);
	source.playOnAwake=false;
	source.loop=true;
}

function Start()
{
	source.clip = clip;
	source.Play();
}

	
function Update() {
	Debug.Log("Playing? - " + source.isPlaying);
}
