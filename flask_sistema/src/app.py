from flask import Flask, render_template, request, redirect, url_for
from src.routes.routes import *

app = Flask(__name__)
app.config['STATIC_FOLDER'] = 'static'
app.secret_key = secrets.token_hex(16)

app.add_url_rule(routes["index"], view_func=Index.as_view("index"))
app.add_url_rule(routes["funcionario"], view_func=Funcionario.as_view('funcionario'))
app.add_url_rule(routes["cargo"], view_func=Cargo.as_view('cargo'))
app.add_url_rule(routes["setor"], view_func=Setor.as_view('setor'))
