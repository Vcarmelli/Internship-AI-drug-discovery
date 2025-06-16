from flask import Blueprint, current_app, render_template, redirect, url_for, request, jsonify

views = Blueprint('views', __name__)


@views.route('/')
def index():
    return render_template('index.html')