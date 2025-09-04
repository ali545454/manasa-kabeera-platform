from flask import Blueprint, request, jsonify
from .controllers import ApartmentController

app_routes = Blueprint('app_routes', __name__)

@app_routes.route('/apartments', methods=['GET'])
def get_apartments():
    apartments = ApartmentController.get_all_apartments()
    return jsonify(apartments), 200

@app_routes.route('/apartments', methods=['POST'])
def add_apartment():
    data = request.get_json()
    new_apartment = ApartmentController.create_apartment(data)
    return jsonify(new_apartment), 201

@app_routes.route('/apartments/<int:apartment_id>', methods=['GET'])
def get_apartment(apartment_id):
    apartment = ApartmentController.get_apartment_by_id(apartment_id)
    if apartment:
        return jsonify(apartment), 200
    return jsonify({'message': 'Apartment not found'}), 404

@app_routes.route('/apartments/<int:apartment_id>', methods=['PUT'])
def update_apartment(apartment_id):
    data = request.get_json()
    updated_apartment = ApartmentController.update_apartment(apartment_id, data)
    if updated_apartment:
        return jsonify(updated_apartment), 200
    return jsonify({'message': 'Apartment not found'}), 404

@app_routes.route('/apartments/<int:apartment_id>', methods=['DELETE'])
def delete_apartment(apartment_id):
    success = ApartmentController.delete_apartment(apartment_id)
    if success:
        return jsonify({'message': 'Apartment deleted'}), 204
    return jsonify({'message': 'Apartment not found'}), 404