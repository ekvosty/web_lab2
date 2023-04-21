let depositcalc = document.getElementById("depositcalc");
let deposittype = document.getElementById("deposittype");
let deposittime = document.getElementById("deposittime");
let result = document.getElementById("result");

deposittype.onchange = function()
{
	removeAll(deposittime);
	if(deposittype.value == "Пополняемый")
	{
		addOption(deposittime, "6 месяцев - 20%", "6 месяцев|6|20");
		addOption(deposittime, "1 год - 22%", "1 год|12|22");
		addOption(deposittime, "1,5 года - 15%", "1,5 года|18|15");
		addOption(deposittime, "2 года - 10%", "2 года|24|10");
	}
	else if(deposittype.value == "Срочный")
	{
		addOption(deposittime, "3 месяца - 20%", "3 месяца|3|20");
		addOption(deposittime, "6 месяцев - 22%", "6 месяцев|6|22");
		addOption(deposittime, "9 месяцев - 23%", "9 месяцев|9|23");
		addOption(deposittime, "1 год - 24%", "1 год|12|24");
		addOption(deposittime, "1,5 года - 18%", "1,5 года|18|18");
		addOption(deposittime, "2 года - 15%", "2 года|24|15");
	}
}

function removeAll(selectBox) {
    while (selectBox.options.length > 1) {
        selectBox.remove(1);
    }
}

function addOption(selectBox, title, value)
{
	const newOption = document.createElement('option');
	const optionText = document.createTextNode(title);

	newOption.appendChild(optionText);

	newOption.setAttribute('value',value);
	selectBox.appendChild(newOption);
}

depositcalc.onsubmit = function()
{
	let formData = new FormData(depositcalc);
	if(formData.get("sum") > 0)
	{
		let data = deposittime.value.split("|");
		result.innerHTML = "Вклад " + deposittype.value + " на срок \"" + data[0] + "\" на сумму " + formData.get("sum") + "\n\nВ конце срока вы получите " +  (parseInt(formData.get("sum")) + (formData.get("sum") / 100 * parseInt(data[2]) / 12) * parseInt(data[1])) + " руб";
	}
	else
	{
		result.innerHTML = "Сумма вклада не может быть меньше нуля";
	}
	return false;
}