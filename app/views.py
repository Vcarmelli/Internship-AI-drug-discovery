from flask import Blueprint, send_from_directory, render_template, jsonify, current_app
from .util import extract_unit, assign_class, get_sequence
import csv
import os

views = Blueprint('views', __name__)


@views.route('/')
def index():
    return render_template('index.html')

@views.route('/docking')
def docking():
    return render_template('docking.html')

@views.route('/peptides')
def peptides():
    return render_template('peptides.html')

@views.route('/peptides/<path:peptide_id>')
def peptide(peptide_id):
    print(f"Requested peptide file: {peptide_id}")
    csv_path = os.path.join(current_app.root_path, 'static', 'results', 'admet.csv')
    results = {}

    with open(csv_path, newline='') as csvfile:
        reader = csv.reader(csvfile)
        headers = next(reader)  # First row is header
        try:
            seq_index = headers.index(peptide_id)
        except ValueError:
            return jsonify({'error': 'Sequence not found'}), 404

        for row in reader:
            if len(row) > seq_index:
                property_group = row[0]

                item = {
                    'property': row[1],
                    'unit': extract_unit(row[2]),
                    'value': row[seq_index],
                    'class': assign_class(row[seq_index])
                }
                if property_group not in results:
                    results[property_group] = []
                results[property_group].append(item)
    
    #print(f"Results for {peptide_id}: {results}")
    return render_template('properties.html', admet_data=results, peptide_id=peptide_id, sequence=get_sequence(peptide_id))



@views.route('/docking/<path:filename>')
def docking_results(filename):
    return send_from_directory('static/docking', filename)

