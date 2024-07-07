// Importa el modelo de datos 'User'
import User from '../models/user.model.js';
import Role from '../models/role.model.js';

export async function getUser(req, res) {
    try {
        const rutUser = req.query.rut;

        if (!rutUser) {
            res.status(400).json({
                message: "El parámetro 'rut' es requerido.",
                data: null
            });
            return;
        }

        const user = await User.findOne({rut: rutUser});

        if(!user){
            res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            })
            return;
        }

        res.status(200).json({
            message: "Usuario encontrado!",
            data: user
        })
    } catch (error) {
        console.log("Error en user.controller.js -> getUser(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function getUsers(req, res) {
    try {
        const users = await User.find().populate('roles', 'name');
        res.status(200).json({
            message: "Lista de usuarios",
            data: users
        });
    } catch (error) {
        console.log("Error en user.controller.js -> getUsers(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function updateUser(req, res) {
    try {
        const rutUser = req.query.rut;
        const updatedData = req.body;

        if (!rutUser) {
            res.status(400).json({
                message: "El parámetro 'rut' es requerido.",
                data: null
            });
            return;
        }

        // Verificar si el usuario tiene permisos para asignar roles
        const userRole = req.session.user.rolName;
        if (userRole !== 'administrador' && userRole !== 'decano'  && userRole !== 'ayudante') {
            return res.status(403).json({
                message: 'No tienes permisos para asignar roles a usuarios',
                data: null
            });
        }



    // se cambia esta parte para realizar el requerimiento
        if (updatedData.roles) {
            const rolesNames = updatedData.roles;
            // busca los reoles en la BD por el nombre
            
            const roles = await Role.find({ name: { $in: rolesNames } });
            // Verifica si todos los roles proporcionados son válidos


            if (roles.length !== rolesNames.length) {
                res.status(400).json({
                    message: "Uno o más roles no son válidos.",
                    data: null
                });
                return;
            }
                // Obtiene los IDs de los roles válidos y los asigna a updatedData.roles
            const rolesIds = roles.map(role => role._id);
            updatedData.roles = rolesIds;
        }


        
        if (updatedData.password) {
            updatedData.password = await User.encryptPassword(updatedData.password);
        }


        const userMod = await User.findOneAndUpdate({ rut: rutUser }, updatedData, { new: true });

        if (!userMod) {
            res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
            return;
        }

        res.status(200).json({
            message: "Usuario actualizado correctamente!",
            data: userMod
        });

    } catch (error) {
        console.log("Error en user.controller.js -> updateUser(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function deleteUser(req, res) {
    try {
        const rutUser = req.query.rut;
        if (!rutUser) {
            res.status(400).json({
                message: "El parámetro 'rut' es requerido.",
                data: null
            });
            return;
        }

        const user = await User.findOneAndDelete({ rut: rutUser });

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            });
        }

        res.status(200).json({
            message: "Usuario eliminado exitosamente!",
            data: user
        });

    } catch (error) {
        console.log("Error en user.controller.js -> deleteUser(): ", error);
        res.status(500).json({ message: error.message });
    }
}
