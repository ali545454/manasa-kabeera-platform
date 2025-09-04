from flask import request, jsonify
from app.models import Apartment  # Assuming you have an Apartment model defined in models.py

def get_apartments():
    apartments = Apartment.query.all()  # Fetch all apartments from the database
    return jsonify([apartment.to_dict() for apartment in apartments])  # Convert to dict and return as JSON

def add_apartment():
    data = request.get_json()  # Get JSON data from the request
    new_apartment = Apartment(**data)  # Create a new Apartment instance
    new_apartment.save()  # Save to the database
    return jsonify(new_apartment.to_dict()), 201  # Return the created apartment with a 201 status

def update_apartment(apartment_id):
    apartment = Apartment.query.get(apartment_id)  # Fetch the apartment by ID
    if not apartment:
        return jsonify({'message': 'Apartment not found'}), 404  # Return 404 if not found
    data = request.get_json()  # Get JSON data from the request
    for key, value in data.items():
        setattr(apartment, key, value)  # Update apartment attributes
    apartment.save()  # Save changes to the database
    return jsonify(apartment.to_dict())  # Return the updated apartment

def delete_apartment(apartment_id):
    apartment = Apartment.query.get(apartment_id)  # Fetch the apartment by ID
    if not apartment:
        return jsonify({'message': 'Apartment not found'}), 404  # Return 404 if not found
    apartment.delete()  # Delete the apartment from the database
    return jsonify({'message': 'Apartment deleted'}), 204  # Return 204 status for successful deletion