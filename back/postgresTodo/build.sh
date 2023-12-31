#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Building the project..."
pip install -r requirements.txt

echo "Collect Static..."
python manage.py collectstatic --no-input

echo "Make migrations..."
python manage.py migrate
