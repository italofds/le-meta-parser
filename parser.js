const allGroups = document.querySelectorAll('div.t.o');

let result = [];
let stack = [result];

const results = Array.from(allGroups).forEach(el => {
	let parent = el.parentElement;
	let level = 0;    
    while (parent) {
        if (parent.classList && parent.classList.contains('t') && parent.classList.contains('o')) {
            level++;
        }
        parent = parent.parentElement;
    }	
	
	const titleEl = el.querySelector('div.t.i');
    let groupKey;
    if (titleEl) {
        const textNode = Array.from(titleEl.childNodes)
            .find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "");
		groupKey = textNode ? textNode.textContent.trim() : null;
    }
	
	const valueEl = el.querySelector('div.m > div');
	let groupText = null;
    if (valueEl && valueEl.querySelector('div.t.o') === null && valueEl.textContent.trim()) {
		const DIVIDER = "[LIST BREAK]"
		const markedHTML = valueEl.innerHTML.replace(/<div class="p"><\/div>/g, DIVIDER);
		valueEl.innerHTML = markedHTML;
		const listValues = valueEl.textContent.split(DIVIDER).map(item => item.trim()).filter(item => item !== "");
		
		if(listValues.length == 1) {
			groupText = listValues[0];
		} else {
			groupText = listValues;
		}
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

console.log(formatList(result)[0]);
