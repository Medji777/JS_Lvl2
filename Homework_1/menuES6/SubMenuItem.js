//������� ���������� ������ Menu, SubMenuItem, ������� ����� ���� �� ���������� ��������
class SubMenuItem extends Menu {
	constructor(myId, myClass, myItems, subItem, subSource){
		super(myId, myClass, myItems);
		this.subitem = subItem;
		this.subsource = subSource
	}
	
	render() {
		var result = '';
		if(this.subitem){
			result = `<li class="sub-items"><a href="${this.subsource}">${this.subitem}</a>`;
		}
		
        result += `<ul class="${this.className}" id="${this.id}">`;

		for(let key in this.items){
			if(this.items[key].className){
			   result += this.items[key].render();
			} else {
			   result += this.items[key].renderItem();
			}
		}
        result += '</ul>';
		if(this.subitem){
			result += '</li>'
		}
        
		return result;
	}
}