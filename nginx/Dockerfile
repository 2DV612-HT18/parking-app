FROM nginx:latest
LABEL maintainer="Tobias Bernting"

#Update
RUN apt-get update -y

#Env
ENV DIR=/etc/nginx/

#Copy the nginx conf file.
COPY nginx.conf ${DIR}/nginx.conf

EXPOSE 80

RUN mkdir -p /var/www/app
# RUN chown -R www-data:www-data /var/www

#Start nginx
CMD ["nginx", "-g", "daemon off;"]