from .public import userdata

def init_app(app):
    app.register_blueprint(userdata, url_prefix='/public')