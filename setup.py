from setuptools import setup, find_packages

setup(name='corkspaces',
      version='1.0',
      description='Corkspaces',
      author='Joshua D. Boyd',
      author_email='jdboyd@jdboyd.net',
      url='https://github.com/jd-boyd/corkspaces',
      packages=find_packages(),
      install_requires=['sqlalchemy', 'psycopg2', 'corker', 'pystache'],
      tests_require=['nose', 'webtest'],
     )
