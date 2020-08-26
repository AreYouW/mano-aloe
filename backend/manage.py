from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from main.server import app, db, models

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


@manager.command
def test():
    return 1


@manager.command
def create_db():
    """Create database table"""
    db.create_all()


@manager.command
def drop_db():
    """Drop all the database tables"""
    db.drop_all()


if __name__ == '__main__':
    manager.run()
