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
    
    
def get_peptide(sequence, peptide_id):
    # parameter sequence is boolean: if True return sequence, if False return inhibition
    seq_path = os.path.join(current_app.root_path, 'static', 'results', 'sequences.json')
    with open(seq_path, 'r') as file:
        data = json.load(file)       

    peptide = data.get(peptide_id)
    if not sequence:
        return peptide.get('inhibition')
    return peptide.get('sequence')


def convert_sequence(sequence):
    amino_map = {
        'A': 'Ala', 'R': 'Arg', 'N': 'Asn', 'D': 'Asp', 'C': 'Cys',
        'Q': 'Gln', 'E': 'Glu', 'G': 'Gly', 'H': 'His', 'I': 'Ile',
        'L': 'Leu', 'K': 'Lys', 'M': 'Met', 'F': 'Phe', 'P': 'Pro',
        'S': 'Ser', 'T': 'Thr', 'W': 'Trp', 'Y': 'Tyr', 'V': 'Val'
    }
    
    return [amino_map[aa] for aa in sequence]