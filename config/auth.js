import { Strategy as LocalStrategy } from 'passport-local';
import { Sequelize } from 'sequelize';
import sequelize from '../models/db.js';
import bcrypt from 'bcryptjs';


//model
import Usuarios from '../models/Usuarios.js';
import { removeTicks } from 'sequelize/lib/utils';

export default function (passport) {
    // Configuração da estratégia local
    passport.use(new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        (email, senha, done) => {
            Usuarios.findOne({ where: { email: email } })
                .then((usuario) => {
                    if (!usuario) {
                        return done(null, false, { message: 'Esta conta não existe' });
                    }
                    
                    // Comparando a senha
                    bcrypt.compare(senha, usuario.senha, (erro, batem) => {

                        if (batem) {
                            return done(null, usuario); // Autenticação bem-sucedida
                        } else {
                            return done(null, false, { message: 'Senha incorreta' });
                        }
                    });
                })
                .catch((err) => {
                    console.log('Erro: ' + err);
                    return done(err); // Retorna erro se houver um problema
                });
        }
    ));

    // Serialização do usuário
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id);
    });

    // Desserialização do usuário
    passport.deserializeUser((id, done) => {
        Usuarios.findOne({ where: { id: id } })
            .then((usuario) => {
                done(null, usuario);
            })
            .catch((err) => {
                console.error('Erro ao desserializar usuário: ' + err);
                done(err, null);
            });
    });
}