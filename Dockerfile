FROM nginx:alpine AS frontend

COPY FRONTEND/ /usr/share/nginx/html/


EXPOSE 5500

FROM python:3.10-slim AS backend
WORKDIR /sms_backend
COPY BACKEND/ .
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5500
CMD ["python", "app1.py"]


