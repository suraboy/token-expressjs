#!/bin/sh

if [ $APP_ENV == "local" ]; then
    sed -i "s/\$SERVER_NAME/api-payment.eggsmartpos.local/g" /etc/nginx/sites-enabled/app.conf;
    sed -i "s/\$REDIRECT_URL/api-payment.eggsmartpos.local/g" /etc/nginx/sites-enabled/app.conf;
    sed -i "s/\$HTTP_X_FORWARDED_HOST/api-payment.eggsmartpos.local/g" /etc/nginx/sites-enabled/app.conf;
fi

if [ $APP_ENV == "alpha" ]; then
    cp /usr/src/app/.env.alpha /usr/src/app/.env;
    sed -i "s/\$SERVER_NAME/alpha-api-payment.eggsmartpos.com/g" /etc/nginx/sites-enabled/app.conf;
    sed -i "s/\$REDIRECT_URL/alpha-api-payment.eggsmartpos.com/g" /etc/nginx/sites-enabled/app.conf;
    sed -i "s/\$HTTP_X_FORWARDED_HOST/alpha-api-payment.eggsmartpos.com/g" /etc/nginx/sites-enabled/app.conf;
fi

if [ $APP_ENV == "staging" ]; then
    cp /usr/src/app/.env.staging /usr/src/app/.env;
    sed -i "s/\$SERVER_NAME/staging-api-payment.eggsmartpos.com/g" /etc/nginx/sites-enabled/app.conf;
    sed -i "s/\$REDIRECT_URL/staging-api-payment.eggsmartpos.com/g" /etc/nginx/sites-enabled/app.conf;
    sed -i "s/\$HTTP_X_FORWARDED_HOST/staging-api-payment.eggsmartpos.com/g" /etc/nginx/sites-enabled/app.conf;
fi

if [ $APP_ENV == "preprod" ]; then
    sed -i "s/\$SERVER_NAME/preprod-api-payment.eggsmartpos.com/g" /etc/nginx/sites-enabled/app.conf;
    sed -i "s/\$REDIRECT_URL/preprod-api-payment.eggsmartpos.com/g" /etc/nginx/sites-enabled/app.conf;
    sed -i "s/\$HTTP_X_FORWARDED_HOST/preprod-api-payment.eggsmartpos.com/g" /etc/nginx/sites-enabled/app.conf;
    sed -i "s/'use strict'/'use strict'\nvar _newrelic = _interopRequireDefault(require(\"newrelic\"));/g" dist/server.js;
fi

if [ $APP_ENV == "production" ]; then
    sed -i "s/\$SERVER_NAME/api-payment.eggsmartpos.com/g" /etc/nginx/sites-enabled/app.conf;
    sed -i "s/\$REDIRECT_URL/api-payment.eggsmartpos.com/g" /etc/nginx/sites-enabled/app.conf;
    sed -i "s/\$HTTP_X_FORWARDED_HOST/api-payment.eggsmartpos.com/g" /etc/nginx/sites-enabled/app.conf;
    sed -i "s/'use strict'/'use strict'\nvar _newrelic = _interopRequireDefault(require(\"newrelic\"));/g" dist/server.js;
fi

supervisord -n -c /etc/supervisord.conf