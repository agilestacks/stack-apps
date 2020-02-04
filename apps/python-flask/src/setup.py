import io

from setuptools import find_packages, setup

with io.open('README.md', 'rt', encoding='utf8') as f:
    readme = f.read()

setup(
    name='python-flask',
    version='1.0.0',
    url='https://controlplane.agilestacks.io',
    maintainer='Agile Stacks Inc',
    maintainer_email='support@agilestacks.com',
    description='Python Computer Vision Application.',
    long_description=readme,
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'flask',
        'flask-json',
        'uptime'
    ],
    extras_require={
        'test': [
            'pytest'
        ],
    },
)
