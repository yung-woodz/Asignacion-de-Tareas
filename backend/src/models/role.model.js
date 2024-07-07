"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
import { Schema, model } from "mongoose";
import ROLES from "../constants/roles.constants.js";

// Crea el esquema de la coleccion 'roles'
const roleSchema = new Schema(
  {
    name: {
      type: String,
      enum: ROLES,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

// Define los roles predefinidos
const roles = [
  { name: "decano" },
  { name: "ayudante" },
  { name: "jefe de carrera" },
  { name: "secretaria" },
  { name: "tecnico" },
  { name: "docente" },
];

// Función para inicializar los roles en la base de datos
export async function initializeRoles() {
  try {
    // Itera sobre los roles y crea cada uno si no existe
    for (let role of roles) {
      await Role.findOneAndUpdate({ name: role.name }, role, { upsert: true });
    }
    console.log("Roles inicializados correctamente.");
  } catch (error) {
    console.error("Error al inicializar roles:", error);
  }
}

// Crea el modelo de datos 'Role' a partir del esquema 'roleSchema'
const Role = model("Role", roleSchema);

export default Role;