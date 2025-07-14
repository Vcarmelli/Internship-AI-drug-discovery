from flask import Blueprint, send_from_directory, render_template, jsonify, current_app
from .util import extract_unit, assign_class, get_peptide, convert_sequence
import csv
import os
import json

views = Blueprint('views', __name__)


@views.route('/')
def index():
    return render_template('index.html')

@views.route('/docking')
def docking():
    return render_template('docking.html')

@views.route('/peptides')
def peptides():
    json_path = os.path.join(current_app.root_path, 'static', 'results', 'sequences.json')
    with open(json_path, 'r') as f:
        peptides_data = json.load(f)

    grouped_peptides = {}
    for peptide_id, data in peptides_data.items():
        denv_type = peptide_id[:5]  # Extract DENV1, DENV2, etc.
        if denv_type not in grouped_peptides:
            grouped_peptides[denv_type] = {}
        grouped_peptides[denv_type][peptide_id] = data
    
    return render_template('peptides.html', grouped_peptides=grouped_peptides)

    # return render_template('peptides.html', peptides=peptides_data)

@views.route('/peptides/<path:peptide_id>')
def peptide(peptide_id):
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

    sequence = get_peptide(True, peptide_id)
    amino_acids = convert_sequence(sequence)    
    
    return render_template('properties.html', admet_data=results, peptide_id=peptide_id, sequence=sequence, amino_acids=amino_acids)



@views.route('/docking/<path:filename>')
def docking_results(filename):
    return send_from_directory('static/docking', filename)

