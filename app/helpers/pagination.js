import models from "../models/mysql";
import moment from "moment/moment";
import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'local';
dotenv.config();

exports.getFullUrl = (req) => {

    let url = req.protocol + '://' + req.hostname + req.originalUrl;

    if(env === 'local') {
        url = process.env.APP_URL + req.originalUrl;
    }

    return url
}

exports.getOptions = (req) => {

    const notAllow = ['orderBy', 'sortedBy', 'page', 'limit',  'created_date', 'created_at', 'updated_date', 'updated_at', 'total'];

    const filtered = Object.keys(req.query)
        .filter(key => !notAllow.includes(key))
        .reduce((obj, key) => {
            obj[key] = req.query[key];
            return obj;
        }, {});

    let options = {
        raw: true,
        page:  parseInt(req.query.page) || 1, // Default 1
        paginate: parseInt(req.query.limit) || 15, // Default 15
        order: [],
        where: filtered
    };

    if (req.query.created_at) {

        const Op = models.Sequelize.Op;

        options['where']['created_at'] = {
            [Op.eq]: moment.utc(req.query.created_at).format()
        }
    }

    if (req.query.created_date) {

        const Op = models.Sequelize.Op;

        options['where']['created_at'] = {
            [Op.gt]: moment.utc(req.query.created_date).startOf('day').format(),
            [Op.lt]: moment.utc(req.query.created_date).endOf('day').format()
        }
    }

    if (req.query.updated_at) {

        const Op = models.Sequelize.Op;

        options['where']['updated_at'] = {
            [Op.eq]: moment.utc(req.query.updated_at).format()
        }
    }

    if (req.query.updated_date) {

        const Op = models.Sequelize.Op;

        options['where']['updated_at'] = {
            [Op.gt]: moment.utc(req.query.updated_date).startOf('day').format(),
            [Op.lt]: moment.utc(req.query.updated_date).endOf('day').format()
        }
    }

    if (req.query.orderBy) {
        const field = req.query.orderBy;
        const order = req.query.sortedBy || 'ASC';
        options.order.push([field, order]);
    } else {
        // default ordering (createdAt)
        // findOptions.order.push(['created_at', 'DESC']);
    }

    return options
}


exports.paginate = (fullUrl, count, totalPages, total, perPage, currentPage) => {

    let links = [];

    if(count > 0) {

        let url = fullUrl

        let regex = /(page=)(\d)(&)/i;

        if(url.search(regex) === -1) {
            regex = /(&page=)(\d)/i;
        }

        url = url.replace(regex, '');

        if(currentPage === 1) {
            links = { next: url + '&page=' + 2 }
        } else if (currentPage === totalPages) {
            const previousPage = currentPage - 1
            links = { previous: url + '&page=' + previousPage }
        } else {
            const previousPage = currentPage - 1
            const nextPage = currentPage + 1

            links = {
                previous: url + '&page=' + previousPage,
                next: url + '&page=' + nextPage
            }
        }
    }

    return {
        total: total,
        count: count,
        per_page: perPage,
        current_page: currentPage,
        total_pages: totalPages,
        links: links
    }
}

