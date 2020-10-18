import os
if os.environ.get('SECRET_KEY'):
    from .settings_prod import *
else:
    from .settings_local import *
