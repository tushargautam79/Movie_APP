var k=document.querySelectorAll("#signup_modal1");
var button=document.querySelector("#done");
var message=document.querySelector("#message");
var one="";
var two="";
console.log(k);
button.addEventListener("click",function()
{
	one=k[0].value;
	two=k[1].value;
	if(one==two)
	{
		button.innerText="Submit";
		button.style.background="green";
	}
	else
	{
		message.innerText=" ! Your passwords dont match";
		message.style.color="red";
	}

});

