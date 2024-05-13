'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import Publication from '../src/publication/publication.model.js';
import publicationRoutes from '../src/publication/publication.routes.js';
import commentRoutes from '../src/comment/comment.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.publicationPath = '/blog/v1/publication';
        this.commentPath = '/blog/v1/comment';

        this.middlewares();
        this.conectarDB();
        this.routes();
        this.crearPublicaciones()
    }

    async conectarDB() {
        await dbConnection();
    }

    async crearPublicaciones() {
        const existenPublicaciones = await Publication.findOne({ title: 'Sistema de adopción de mascotas' });

        if (!existenPublicaciones) {

            const firstPublication = {
                title: 'Sistema de adopción de mascotas',
                descript: 'En este proyecto trabajamos en un sistema de adopción de mascotas',
                text: 'En este proyecto trabajamos en un sistema de adopción de mascotas (solamente Backend) la cual servirá para: poder llevar el Control de un Sistema de adopción de mascotas. Este proyecto se trabajo con Nodejs, MongoDB y Express',
                img: '123456'
            };

            const publication = new Publication(firstPublication);
            await publication.save();

            const secondPublication = {
                title: 'Control Académico',
                descript: 'En este proyecto trabajamos en un sistema de control académico',
                text: 'El proyecto consiste en una aplicación de ambiente web (solamente Backend) la cual servirá para: poder llevar el Control de Alumnos de un Centro Educativo. Este proyecto se trabajo con Nodejs, MongoDB y Express',
                img: '123456'
            };

            const segundaPublication = new Publication(secondPublication);
            await segundaPublication.save();

            const thirdPublication = {
                title: 'Beneficios de la utilización de ReactJS',
                descript: 'En este proyecto informamos sobre los beneficios de la utilizar de ReactJS',
                text: 'React tiene varios beneficios que lo hacen una opción popular para el desarrollo de aplicaciones web ofreciendo ofrece una combinación de rendimiento, eficiencia, facilidad de desarrollo y una amplia comunidad de soporte que lo convierten en una opción atractiva para el desarrollo de aplicaciones web modernas y escalables.',
                img: '123456'
            };

            const terceraPublication = new Publication(thirdPublication);
            await terceraPublication.save();
        }
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.publicationPath, publicationRoutes);
        this.app.use(this.commentPath, commentRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }
}

export default Server;