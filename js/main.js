var nums=[];
var score=0;
$(function(){
	playGame();
})
function playGame()
{
	score=0;
	init();
	createRandNum();
	createRandNum();


}
function init()
{
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			var grid=$("#grid-cell-"+i+"-"+j);
			grid.css({"top":getPosTop(i,j)+"px","left":getPosLeft(i,j)})	
		}
	}
	for(var i=0;i<4;i++)
	{
		nums[i]=new Array();
		for(var j=0;j<4;j++)
		{
			nums[i][j]=0;
		}

	}
	updateView();	
}
function updateView()
{
	$("#score").html(score);
	$(".num-cell").remove();
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			$("#grid-container").append(`<div id="num-cell-${i}-${j}" class="num-cell"></div>`)
			var numCell=$(`#num-cell-${i}-${j}`);
			if(nums[i][j]!=0)
			{
				numCell.css("width","100px");
				numCell.css("height","100px");
				numCell.css("top",getPosTop(i,j)+"px");
				numCell.css("left",getPosLeft(i,j)+"px");
				numCell.css("backgroundColor",getNumBgColor(nums[i][j]));
				numCell.css("color",getNumColor(nums[i][j]));
				numCell.text(nums[i][j]);

			}
			else{
				numCell.css("width","0px");
				numCell.css("height","0px");
				numCell.css("top",getPosTop(i,j)+50+"px");
				numCell.css("left",getPosLeft(i,j)+50+"px");
			}
		}

	}

	
}

function createRandNum()
{ 
	if(noSpace(nums))
	{
		return;
	}
	var count=0;
	var array=[];
	for(var i=0; i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			if(nums[i][j]==0)
			{
				array[count]=i*4+j;
				count++;
			}
		}
	}
	var n=Math.floor(Math.random()*count);
	var randX=Math.floor(array[n]/4);
	var randY=Math.floor(array[n]%4);

	var randNum=Math.random()>0.5?2:4;
	nums[randX][randY]=randNum;
	showNumAni(randX,randY,randNum);
}
	document.onkeydown=function(event){
		//gameOver();
	if(gameOverFlag())
	{
		alert("Game Over!!");
		return;
		
	}
		event.preventDefault();
		switch (event.keyCode) {
			case 37:
				if(leftMovFlag(nums))
				{
					leftMov();
					setTimeout(createRandNum,200);
					
				}
				break;
			case 38:
				if(topMovFlag(nums))
				{
					topMov();
					setTimeout(createRandNum,200);
					
				}
				
				break;
			case 39:
				if(rightMovFlag(nums))
				{
					rightMov();
					setTimeout(createRandNum,200);
				
				}
				break;
			case 40:
				if(bottomMovFlag(nums))
				{
					bottomMov();
					setTimeout(createRandNum,200);
				
				}
				break;

			default:
				// statements_def
				break;
			}	
	}
	
	function leftMov()
	{
		var mergeFlag=false;
		for(var i=0;i<4;i++)
		{
			mergeFlag=false;
			for(var j=1;j<4;j++)
			{
				
				if(nums[i][j]!=0)
				{
					for(var k=0;k<j;k++)
					{

						if(nums[i][k]==0&&noNumFlag(i,k,j,nums))
						{
							showAni(i,j,i,k);
							nums[i][k]=nums[i][j];
							nums[i][j]=0;
							mergeFlag=false;
							break;

						}
						else if(nums[i][k]==nums[i][j]&&noNumFlag(i,k,j,nums))
						{
							
							if(mergeFlag)
							{
								showAni(i,j,i,k+1);
								nums[i][k+1]=nums[i][j];
								nums[i][j]=0;
								mergeFlag=false;
								break;
							}
							else
							{
								showAni(i,j,i,k);
								nums[i][k]+=nums[i][j];
								mergeFlag=true;
								score+=nums[i][k];
								nums[i][j]=0;
								break;
							}
							
						}

					}


				}
			}

		}
		
		setTimeout(updateView,200);
	}
	
	function rightMov()
	{
		var mergeFlag=false;
		for(var i=0;i<4;i++)
		{
			mergeFlag=false;
			for(var j=2;j>=0;j--)
			{
			
				if(nums[i][j]!=0)
				{
					for(var k=3;k>j;k--)
					{
						if(nums[i][k]==0&&noNumFlag(i,j,k,nums))
						{
							showAni(i,j,i,k);
							nums[i][k]=nums[i][j];

							nums[i][j]=0;
							mergeFlag=false;
							break;

						}
						else if(nums[i][k]==nums[i][j]&&noNumFlag(i,j,k,nums))
						{

							if(mergeFlag)
							{
								showAni(i,j,i,k-1);
								nums[i][k-1]=nums[i][j];
								nums[i][j]=0;
								mergeFlag=false;
								break;
							}
							else
							{
								showAni(i,j,i,k);
								nums[i][k]+=nums[i][j];
	
								score+=nums[i][k];
								
								nums[i][j]=0;
								mergeFlag=true;
								break;
						   }
						}
					}

					
				}
			}
		}
		setTimeout(updateView,200);
	}
	function topMov()
	{
	    var mergeFlag=false;
		for(var j=0;j<4;j++)
		{ 
			mergeFlag=false;
			for(var i=1;i<4;i++)
			{
				if(nums[i][j]!=0)
				{
					for(var k=0;k<i;k++)
					{
						if(nums[k][j]==0&&noNumTFlag(k,i,j,nums))
						{
							showAni(i,j,k,j);
							nums[k][j]=nums[i][j];
							nums[i][j]=0;
							mergeFlag=false;
							break;

						}
						else if(nums[k][j]==nums[i][j]&&noNumTFlag(k,i,j,nums))
						{
							if(mergeFlag)
							{
								showAni(i,j,k+1,j);
								nums[k+1][j]=nums[i][j];
								nums[i][j]=0;
								mergeFlag=false;
								break;
							}
							else
							{
								showAni(i,j,k,j);
								nums[k][j]+=nums[i][j];
								score+=nums[k][j];
								nums[i][j]=0;
								mergeFlag=true;
								break;
							}
						}
					}

					
				}
			}
		}
		setTimeout(updateView,200);
	}
	function bottomMov()
	{
		 var mergeFlag=false;
		for(var j=0;j<4;j++)
		{
			mergeFlag=false;
			for(var i=2;i>=0;i--)
			{
				
				if(nums[i][j]!=0)
				{
					for(var k=3;k>i;k--)
					{
						if(nums[k][j]==0&&noNumTFlag(i,k,j,nums))
						{
							showAni(i,j,k,j);
							nums[k][j]=nums[i][j];
							nums[i][j]=0;
							mergeFlag=false;
							break;

						}
						else if(nums[k][j]==nums[i][j]&&noNumTFlag(i,k,j,nums))
						{
							if(mergeFlag)
							{
								showAni(i,j,k-1,j);
								nums[k-1][j]=nums[i][j];
								nums[i][j]=0;
								mergeFlag=false;
								break;
							}
							else{
								showAni(i,j,k,j);
								nums[k][j]+=nums[i][j];
								score+=nums[k][j];
								nums[i][j]=0;
								mergeFlag=true;
								break;
							}
						
						}
					}

					
				}
			}
		}
		setTimeout(updateView,200);
	}
function gameOverFlag()
{
 	if(noSpace&&!leftMovFlag(nums)&&!rightMovFlag(nums)&&!topMovFlag(nums)&&!bottomMovFlag(nums))
	 {
	 	return true;
	 }
	 return false;
	
}	
function gameOver()
{
	if(gameOverFlag())
	{
		alert("Game Over!!");

	}
}