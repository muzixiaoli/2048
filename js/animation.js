function showNumAni(i,j,randNum)
{
	var numCell=$(`#num-cell-${i}-${j}`);
	numCell.css("backgroundColor",getNumBgColor(randNum));
	numCell.css("color",getNumColor(randNum));
	numCell.text(randNum)
	numCell.animate(
		{
			width: "100px",
			height: "100px",
			top:getPosTop(i,j),
			left:getPosLeft(i,j)
		}, 500)
}
function showAni(fromx,fromy,tox,toy)
{
	$(`#num-cell-${fromx}-${fromy}`).animate({
								top:getPosTop(tox,toy),
								left:getPosLeft(tox,toy)
							},200);

}
