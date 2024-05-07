import mysql.connector
from mysql.connector import Error

class SQLManager:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )

    def execute_query(self, query, data=None):
        return self._execute(query, data, fetch=True)

    def execute_update(self, query, data=None):
        return self._execute(query, data, fetch=False)

    def _execute(self, query, data, fetch=True):
        cursor = self.conn.cursor()
        result = None

        try:
            if data:
                cursor.execute(query, data)
                c = cursor
                print(c)
            else:
                cursor.execute(query)

            if fetch:
                result = cursor.fetchall()
            self.conn.commit()
        except Exception as e:
            raise e  

        finally:
            cursor.close()

        return result


# Uso da classe
db_host = 'localhost'
db_user = 'root'
db_password = ''
db_name = 'sistema_cadastro'

sql_manager = SQLManager(db_host, db_user, db_password, db_name)
