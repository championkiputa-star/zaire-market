FROM php:8.2-apache

# Installer l'extension PDO MySQL requise pour Zaïre-Market
RUN docker-php-ext-install pdo pdo_mysql

# Activer les modules Apache nécessaires (réécriture d'URL et en-têtes CORS)
RUN a2enmod rewrite headers

# Copier tous les fichiers du projet
COPY . /var/www/html/

# Donner les permissions au serveur web
RUN chown -R www-data:www-data /var/www/html

# Script d'adaptation dynamique au port injecté par Render ($PORT)
RUN echo '#!/bin/bash\n\
PORT="${PORT:-80}"\n\
sed -i "s/Listen 80/Listen $PORT/g" /etc/apache2/ports.conf\n\
sed -i "s/:80/:$PORT/g" /etc/apache2/sites-available/000-default.conf\n\
echo "Zaïre-Market démarré avec succès sur le port $PORT"\n\
exec apache2-foreground' > /usr/local/bin/start-render.sh && chmod +x /usr/local/bin/start-render.sh

EXPOSE 80

CMD ["/usr/local/bin/start-render.sh"]
