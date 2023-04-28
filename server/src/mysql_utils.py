from sqlalchemy import create_engine
from src.config import mysql

def mysql_replace_into(table, conn, keys, data_iter):
    from sqlalchemy.dialects.mysql import insert
    from sqlalchemy.ext.compiler import compiles
    from sqlalchemy.sql.expression import Insert

    @compiles(Insert)
    def replace_string(insert, compiler, **kw):
        s = compiler.visit_insert(insert, **kw)
        s = s.replace("INSERT INTO", "REPLACE INTO")
        return s

    data = [dict(zip(keys, row)) for row in data_iter]

    conn.execute(table.table.insert(replace_string=""), data)

def add_to_db(table, table_name):
    """
    Connect to the database and add the table into
    the table name.
    @param table
        a dataframe to be added into the db
    @param table_name
        the name of the table in the db to add the data into
    """
    engine_connection = f"mysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}"
    engine = create_engine(engine_connection)

    dbConnection = engine.connect()

    try: # Adding to the database
        table.drop_duplicates().to_sql(name=table_name, con=dbConnection, if_exists='append',
                                       index=False, method=mysql_replace_into)  

    except ValueError as vx:
        print(vx)

    except Exception as ex:
        print(ex)

    finally:
        dbConnection.close()