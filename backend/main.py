from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import datetime
import json
from flask_cors import CORS

db = SQLAlchemy()
app = Flask(__name__)
app.secret_key = 'mynewsecrettokenforme'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
CORS(app, supports_credentials=True)


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text(), nullable=True)
    image = db.Column(db.Text(), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    category = db.relationship('Category', backref=db.backref('products', lazy=True))
    
    @property
    def to_json(self):
        return {"id": self.id, "name": self.name, "description": self.description,"image": self.image, "category_id": self.category_id }
    

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    start_x = db.Column(db.Integer, nullable=False)
    start_y = db.Column(db.Integer, nullable=False)
    end_x = db.Column(db.Integer, nullable=False)
    end_y = db.Column(db.Integer, nullable=False)
    
    @property
    def to_json(self):
        return {"id": self.id, "name": self.name, "start_x": self.start_x, "start_y": self.start_y,
                "end_x": self.end_x, "end_y": self.end_y }

@app.route('/categories', methods=['GET'])
def categories_get():
    categories = Category.query.all()
    categoriesarray = []
    for category in categories:
        categoriesarray.append(category.to_json)
    return jsonify(categories=categoriesarray)

@app.route('/products', methods=['GET'])
def products_get():
    products = Product.query.all()
    productssarray = []
    for product in products:
        productssarray.append(product.to_json)
    return jsonify(products=productssarray)

@app.route('/category', methods=['POST'])
def update_category():
    id = request.json.get("id", None)
    name = request.json.get("name", None)
    start_x = request.json.get("start_x", None)
    start_y = request.json.get("start_y", None)
    end_x = request.json.get("end_x", None)
    end_y = request.json.get("end_y", None)

    # проверяем есть ли такая категория
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
 
@app.route('/product', methods=['POST'])
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


if __name__ == "__main__":
    """
    with app.app_context():
        db.create_all()
        db.session.commit()
    """
    app.run(debug=True)