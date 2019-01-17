class Basket {
    constructor(idBasket)
    {
        this.id = idBasket;
        this.amount = 0; //Общая стоимость товаров
        this.basketItems = []; //Массив для хранения товаров

        //Получаем товары
        this.getItems();
    }

    getItems()
    {
        let appendId = `#${this.id}_items`;

        //Вариант 1
        //let self = this;

        $.ajax({
            type: 'GET',
            url: './json/get_items.json',
            context: this, //Вариант 2
            dataType: 'json',
            success: function (data) {
                let $basketData = $('<div />', {
                    id: 'basket_data'
                });

                this.amount = data.amount; //Общая стоимость товаров в корзине

                for(let i = 0; i < data.basket.length; i++)
                {
                    this.basketItems.push(data.basket[i]);
                }

                $basketData.append(`<p>Всего товаров: ${this.basketItems.length}</p>`);
                $basketData.append(`<p>Общая стоимость: ${this.amount}</p>`);

                $basketData.appendTo(appendId);
            },
            error: function (err) {
                console.log('Ошибка', err);
            }
        });
    }

    render($jQuerySelector)
    {
        let $basketDiv = $('<div />', {
            id: this.id,
            text: 'Корзина'
    });

        let $basketItemsDiv = $('<div />', {
            id: `${this.id}_items`
        });

        $basketItemsDiv.appendTo($basketDiv);
        $basketDiv.appendTo($jQuerySelector);
    }

    addProduct(idProduct, price){
        let goodItem = {
            id_product: idProduct,
            price //Так как ES6 price: price
        };

        this.amount += price;

        this.basketItems.push(goodItem);
        this.refresh(); //Перерисовываем корзину
    }

    remove(idProduct, price)
    {
        //TODO: ДЗ - реализация удаления товара из корзины
		
		let goodItem = {
            id_product: idProduct,
            price //Так как ES6 price: price
        };
		
		//Если в корзине ничего нет, выходим
		if (this.basketItems.length < 1) return;
		
    	// Уменьшаем стоимость
		if(this.amount > 0){
			this.amount -= price;
		} 
		
		// Возможен вариант, когда корзина пуста и цена существует в + или -
		// Не очень получается сбросить цену к нулю
		// Возможно так же исправить это, запретив удалять товар, которого нет в корзине, что бы не происходило случая выше
		if(this.amount <= 0 || this.basketItems.length == 0){
			this.amount == price == 0;
		}	
		
    	// Удаляем товар из массива
		if(this.basketItems.length > 0){
			this.basketItems.pop();
		}
		
        this.refresh();
    	}

	refresh()
    {
        let $basketData = $('#basket_data');
        $basketData.empty(); //Очищаем содержимое контейнера
        $basketData.append(`<p>Всего товаров: ${this.basketItems.length}</p>`);
        $basketData.append(`<p>Общая стоимость: ${this.amount}</p>`);

        //TODO: для отладки
        console.log(this.basketItems);
    }
}