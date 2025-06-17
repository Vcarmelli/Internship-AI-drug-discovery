from flask import Blueprint, send_from_directory, render_template, redirect, url_for, request, jsonify

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





@views.route('/docking/<path:filename>')
def docking_results(filename):
    return send_from_directory('static/docking', filename)

