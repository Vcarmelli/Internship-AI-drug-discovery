from flask import current_app
import json
import os
import re


def extract_unit(unit):
    if "Numeric" in unit:
        match = re.search(r'\((.*?)\)', unit)
        extracted = f"({match.group(1).strip()})"
        return extracted
    else:
        return ''
    

def assign_class(value):
    if value == "Yes":
        return "value-positive"
    elif value == "No":
        return "value-negative"
    else:
        return "value-number"
    
    
def get_sequence(peptide_id):
    seq_path = os.path.join(current_app.root_path, 'static', 'results', 'sequences.json')
    with open(seq_path, 'r') as file:
        data = json.load(file)        
    return data.get(peptide_id)