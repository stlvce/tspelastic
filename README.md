### Описание информационной системы
Приложение для создания маршрута по магазину после выбора интересующих продуктов. Можно изменить параметры построения для нужного результата. Имеются 3 страницы:
+ «Домой» — это основная страница, на которой происходят все действия. Здесь можно выбрать продукт, узнать их нахождение в магазине, выбрать параметры построения, а также начать построение и лицезреть результат создания маршрута.
+ «Помощь» - страница с инструкции по использованию системы.
+ «Админ» - панель администратора, где можно обновлять свойства продуктов/категорий, добавлять и удалять продукты.

Также имеется функция изменения языка (русский/английский).

Приложение построенно на базе фреймвороков JS -> React и Python -> Flask, 
***
### Требования к системе
+ Отказоустойчивость при росте числа посетителей.
+ Исправная работа всех описанных функций приложения.
***
### CRUD-операции
+ _Create_ – создание продуктов в панели администратора.
```python
@app.route('/api/product', methods=['POST'])
def add_product():
    id = request.json.get("id", None)
    name = request.json.get("name", None)
    image = request.json.get("image", None)
    description = request.json.get("description", None)
    category_id = request.json.get("category_id", None)

    with app.app_context():
        product = db.session.query(Product).filter(Product.id==id).first()
        if id == None:
            new_product = Product()
            new_product.name = name
            new_product.image = image
            new_product.category_id = category_id
            new_product.description = description
            db.session.add(new_product)
            db.session.commit()
            return jsonify({'msg': 'Вы добавили продукт'}), 200
        elif id != None:
            product.name = name
            product.image = image
            product.description= description
            product.category_id = category_id
            db.session.commit()
            return jsonify({'msg': 'Вы обновили продукт'}), 200
        return jsonify({'msg': 'Не правильные данные'}), 401
```
+ _Read_ – загрузка категорий и продуктов из базы данных.
```python
@app.route('/categories', methods=['GET'])
def categories_get():
    categories = Category.query.all()
    categoriesarray = []
    for category in categories:
        categoriesarray.append(category.to_json)
    return jsonify(categories=categoriesarray)
```
```python
@app.route('/categories', methods=['GET'])
def categories_get():
    categories = Category.query.all()
    categoriesarray = []
    for category in categories:
        categoriesarray.append(category.to_json)
    return jsonify(categories=categoriesarray)
```
+ _Update_ – обновление свойств категорий/продуктов в панели администратора.
```python
@app.route('/category', methods=['POST'])
def update_category():
    id = request.json.get("id", None)
    name = request.json.get("name", None)
    start_x = request.json.get("start_x", None)
    start_y = request.json.get("start_y", None)
    end_x = request.json.get("end_x", None)
    end_y = request.json.get("end_y", None)
    with app.app_context():
        category = db.session.query(Category).filter(Category.id == id).first()
        if id != None:
            category.name = name
            category.start_x = start_x
            category.start_y= start_y
            category.end_x = end_x
            category.end_y = end_y
            db.session.commit()
            return jsonify({'msg': 'Вы обновили категорию'}), 200
        return jsonify({'msg': 'Не правильные данные'}), 401
```
+ _Delete_ – удаление продуктов в панели администратора.
```python
@app.route('/api/productremove', method=['POST'])
def delete_product():
    id = request.json.get("id", None)
    with app.app_context():
        product = db.session.query(Product.filter(Product.id == id).first())
        if product:
            db.session.delete(product)
            db.session.commit()
            return jsonify({'msg': 'Вы удалили продукт'}), 200
        return jsonify({'msg': 'Неправильные данные'}), 401
```
***
### Стек разработки
Система запущена на виртуальной машине (Compute Cloud), создана сеть с подсетями и группа безопасности для входящего и исходящего трафика (Virtual Private Cloud), кластер MySQL для хранения продуктов и их категорий (Managed Service for MySQL). Для хранения части статических файлов используется Object Storage. Для получения файлов из бакета используется API Gateway.
***
### Структура хранения данных
В качестве хранения данных используется кластер MySQL.

Таблица продуктов:

![Screenshot](./screenshots/1_table_prod.jpg)

Таблица категорий:

![Screenshot](./screenshots/2_table_category.jpg)
***
### Использование Object Storage
Используется для хранения статических файлов приложения.

![Screenshot](./screenshots/10_backet.png)
***
### Terraform-спецификации
Не использовался
***
### Serverless-решение
Используется API Gateway для получения статических файлов из бакета Object Storage. <a href="https://github.com/stlvce/tspelastic/blob/main/api-obj-storage.yaml">Спецификация</a>

![Screenshot](./screenshots/11_load_static.png)
***
### Приложение
1.Главная страница yandex cloud:

![Screenshot](./screenshots/3_main_page.png)

2.Виртуальная машина с проектом

![Screenshot](./screenshots/4_vm.jpg)

3.Диск виртуальной машины

![Screenshot](./screenshots/5_vm_disk.jpg)

4.База данных MySQL

![Screenshot](./screenshots/6_db.jpg)

5.Виртуальная сеть default и её подсети, используемые в проекте

![Screenshot](./screenshots/7_network.jpg)

6.Группа безопасности на исходящий трафик

![Screenshot](./screenshots/8_secgroup1.jpg)

7.Группа безопасности на входящий трафик

![Screenshot](./screenshots/9_secgroup2.jpg)

8.Object Storage

![Screenshot](./screenshots/12_object_storage.png)

9.API Gateway

![Screenshot](./screenshots/13_api_gateway.png)

10.Чтение данных из бд

![Screenshot](./screenshots/14_read.png)

11.Обновление свойств продукта

![Screenshot](./screenshots/15_update.png)

12.Добавление продукта

![Screenshot](./screenshots/16_add_1.png)
![Screenshot](./screenshots/16_add_2.png)
![Screenshot](./screenshots/16_add_3.png)
![Screenshot](./screenshots/16_add_4.png)

13.Удаление продукта

![Screenshot](./screenshots/17_delete_1.png)
![Screenshot](./screenshots/17_delete_2.png)
![Screenshot](./screenshots/17_delete_3.png)

14.Работоспособность системы

![Screenshot](./screenshots/18_system_1.png)
![Screenshot](./screenshots/18_system_2.png)
![Screenshot](./screenshots/18_system_3.png)
![Screenshot](./screenshots/18_system_4.png)
![Screenshot](./screenshots/18_system_5.png)
![Screenshot](./screenshots/18_system_6.png)
