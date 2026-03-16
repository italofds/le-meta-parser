const allGroups = document.querySelectorAll('div.t.o');

let result = [];
let stack = [result];

const results = Array.from(allGroups).forEach(el => {
	const groupKey = getTexts(el.querySelector('div.t.i'));	
	const groupText = getTexts(el.querySelector('div.m > div'));
	
	let parent = el.parentElement;
	let level = 0;    
    while (parent) {
        if (parent.classList && parent.classList.contains('t') && parent.classList.contains('o')) {
            level++;
        }
        parent = parent.parentElement;
    }	
	
	if(groupKey) {
		let childrenNodes = [];
		let parentObj = stack[level];
		stack[level+1] = childrenNodes;
		parentObj.push({
			key: groupKey,
			value: groupText,
			level: level,
			children: childrenNodes
		}); 		
	}
});

function getTexts(el) {
	const texts = Array.from(el.childNodes)
		.filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "")
		.map(node => node.textContent.trim());	
	return texts && texts.length ? (texts.length == 1 ? texts[0] : texts) : null;
}

function formatObj(obj,data) {
	if(data.children.length) {
		if(data.value) {
			obj[data.key] = {value : data.value, attributes : formatList(data.children)};
		} else {
			obj[data.key] = formatList(data.children);
		}
	} else {
		obj[data.key] = data.value;
	}
	return obj;
}

function formatList(list) {	
	if(list.length == 1) {
		return formatObj({}, list[0]);
		
	} else {
		let array = [];		
		list.forEach(el => {
			if(!array.length || Object.keys(array[0])[0] === el.key) {
				array.push({});
			}
			let obj = array[array.length-1];
			obj = formatObj(obj, el);
		});		
		return array;
	}
}

console.log(result);
console.log(formatList(result)[0]);
