from flask.views import MethodView
from flask import render_template, request, redirect, flash, url_for
from src.db import sql_manager, Error
import secrets

class Index(MethodView):
    def get(self):
        return render_template('index.html')

class Cargo(MethodView):
    def get(self):
        setor = sql_manager.execute_query("SELECT * FROM setor")
        return render_template('public/cargo.html', setor=setor)

    def post(self):
        nome = request.form['nome']
        setor_nome = request.form['setor']  
        data = (nome, setor_nome)
        query = "INSERT INTO cargos (nome, id_setor) VALUES (%s, %s)"
        try:
            sql_manager.execute_update(query, data)
            flash("Cargo cadastrado com sucesso!", "flash-message-success")  
        except Error as e:
            error_message = "Ocorreu um erro durante a inserção! " 
            flash(error_message, "error") 
        return redirect(url_for('cargo'))

class Setor(MethodView):
    def get(self):
        return render_template('public/Setor.html')

    def post(self):
        nome = request.form['nome'].upper()
        data = (nome,)
        query = "INSERT INTO setor (nome) VALUES (%s)"
        
        try:
            sql_manager.execute_update(query, data)
            flash("Setor cadastrado com sucesso!", "flash-message-success")
        except Error as e:
            error_message = "Ocorreu um erro durante a inserção: " 
            flash(error_message, "flash-message-error")
        return redirect(url_for('setor'))
        

class Funcionario(MethodView):
    def get(self):
        cargos = sql_manager.execute_query("SELECT c.id AS id_cargo, c.nome AS nome_cargo, s.id AS id_setor, s.nome AS nome_setor FROM cargos AS c JOIN setor AS s ON c.id_setor = s.id")
        return render_template('public/funcionario.html', cargo=cargos)

    def post(self):
        primeiro_nome = request.form['primeiro_nome'].upper()
        sobrenome = request.form['sobrenome'].upper()
        data_admissao = request.form['data_admissao']
        cargo_id, setor_id = request.form['cargo'].split('_')
        status_funcionario = request.form['status_funcionario']
        
        query = "INSERT INTO funcionarios (primeiro_nome, sobrenome, data_admissao, status_funcionario, id_setor, id_cargo) VALUES (%s, %s, %s, %s, %s, %s)"
        data = (primeiro_nome, sobrenome, data_admissao, status_funcionario, setor_id, cargo_id,)
        error_message = None  
        
        try:
            sql_manager.execute_update(query, data)
            flash("Funcionario cadastrado com sucesso!", "flash-message-success") 
        except Error as e:
            error_message = "Ocorreu um erro durante a inserção! " 
            flash(error_message, "error")  
        
        return redirect(url_for('funcionario'))
