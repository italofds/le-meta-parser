/**
 * A parser to convert specific structures from Meta's HTML response files into hierarchical JSON objects.
 * @param {Document|Element} root - The document or element to be parsed.
 */
export function LEMetaParser(root) {
    const allGroups = root.querySelectorAll('div.t.o');
    let result = [];
    let stack = [result];

    allGroups.forEach(el => {
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
        
        if (groupKey) {
            let childrenNodes = [];
            let parentObj = stack[level];
            stack[level + 1] = childrenNodes;
            
            if (parentObj) {
                parentObj.push({
                    key: groupKey,
                    value: groupText,
                    level: level,
                    children: childrenNodes
                });
            }
            
        } else if(groupText) {
            let parentObj = stack[level];			
			let obj = parentObj[parentObj.length-1];
			obj.value = groupText;
		}
    });

    return formatList(result)[0];
}

function getTexts(el) {
    if (!el) return null;
    const texts = Array.from(el.childNodes)
        .filter(node => node.nodeType === 3 && node.textContent.trim() !== "")
        .map(node => node.textContent.trim());    
    return texts && texts.length ? (texts.length == 1 ? texts[0] : texts) : null;
}

function formatObj(obj, data) {
    if (data.children && data.children.length) {
        if (data.value) {
            obj[data.key] = [data.value, formatList(data.children)];
        } else {
            obj[data.key] = formatList(data.children);
        }
    } else {
        obj[data.key] = data.value;
    }
    return obj;
}

function formatList(list) {    
    if (!list || list.length === 0) return {};
    if (list.length == 1) {
        return formatObj({}, list[0]);
    } else {
        let array = [];        
        list.forEach(el => {
            if (!array.length || array[array.length - 1][el.key] !== undefined) {
                array.push({});
            }
            let obj = array[array.length - 1];
            formatObj(obj, el);
        });        
        return array;
    }
}
