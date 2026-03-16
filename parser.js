const allGroups = document.querySelectorAll('div.t.o');

let result = {};
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
	let groupText;
    if (valueEl) {
        const hasChild = valueEl.querySelector('div.t.o') !== null;
        if (!hasChild) {
            groupText = valueEl.textContent.trim()!='' ? valueEl.textContent.trim() : null;
        } else {
            groupText = null;
        }
    }
	
	if(groupKey) {	
		const isObject = groupText === null;
        const currentParent = stack[level];
    
        if (isObject) {
			var newArray = [{}];
            currentParent[groupKey] = newArray; 
            stack[level + 1] = currentParent[groupKey];
			
        } else {			
			if (Array.isArray(currentParent)) {
				if (Object.keys(currentParent[0])[0] == groupKey) {
					currentParent.push({});
				}
				var obj = currentParent[currentParent.length-1];
				obj[groupKey] = groupText;
				
			} else {
				currentParent[groupKey] = groupText;
			}
        }
	}
});

console.log(result);