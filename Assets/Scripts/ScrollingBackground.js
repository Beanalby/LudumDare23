#pragma strict

public var rate: float=1;

private var panel: Transform;
private var fast: ParticleSystem;
private var slow: ParticleSystem;

function Start () {
	panel = transform.Find("StarsPanel");
	slow = transform.Find("StarsSlow").GetComponent(ParticleSystem);	
	fast = transform.Find("StarsFast").GetComponent(ParticleSystem);
	ApplyRate();
}

function ApplyRate() {
	if(rate==0) {
		slow.enableEmission = false;
		fast.enableEmission = false;
	} else {
		slow.enableEmission = true;
		fast.enableEmission = true;

		slow.startSpeed=10*rate;
		slow.emissionRate=3*rate;
	
		fast.startSpeed=rate*30;
		fast.emissionRate=6*rate;
	}
}

function Update () {
	var offset: float = -(rate/100) * Time.time;
	panel.renderer.material.mainTextureOffset= Vector2(offset,0);
}