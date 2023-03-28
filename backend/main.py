from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import datetime
import json

db = SQLAlchemy()
app = Flask(__name__)
app.secret_key = 'mynewsecrettokenforme'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text(), nullable=False)
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


if __name__ == "__main__":
    """ with app.app_context():
        db.create_all()
        db.session.commit()
    """
    app.run(debug=True)