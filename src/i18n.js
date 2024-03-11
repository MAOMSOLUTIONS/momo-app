import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//import translationEN from './locales/en/translation.json';
//import translationES from './locales/es/translation.json';

// Traducciones
const resources = {
  es: {
    translation: {
      "Iniciar sesión": "Iniciar sesión",
      "Nombre de usuario": "Nombre de usuario",
      "Contraseña": "Contraseña",
      "Olvidé mi contraseña": "Olvidé mi contraseña",
      "Herramientas": "Herramientas",
      "Cubicuadraje": "Cubicuadraje",
      "Usuarios": "Usuarios",
      "Reportes": "Reportes",
      "Home": "Inicio",
      "Pedidos": "Pedidos",
      "Inventarios": "Inventarios",
      "Devoluciones": "Devoluciones",    
      "Subir Archivo Excel": "Subir Archivo Excel",    
      "Camiones Utilizados": "Camiones Utilizados",
      "Volumetría": "Volumetría",
      "Asignaciones": "Asignaciones",
      "Productos": "Productos",
      "Descargar Excel": "Descargar Excel",
      "Paquetería": "Paquetería",      
      "Administración de Usuarios": "Administración de Usuarios",
      "First Name": "Nombre",
      "Last Name": "Apellido Paterno",
      "Middle Name": "Apellido Materno",
      "Date of Birth": "Fecha de nacimiento",
      "Email Address": "Correo Electrónico",
      "Phone": "Teléfono",
      "Street": "Calle",
      "Interior Number": "Número Interior",
      "Exterior Number": "Número Exterior",
      "Borough or Municipality": "Delegación o Municipio",
      "City or State": "Ciudad o Estado",
      "Country": "País",
      "Zip Code": "Código Postal",
      "Save Basic Data": "Guardar Datos Básicos",
      "Datos Básicos":"Datos Básicos",
      "Crear Usuario":"Crear Usuario",
      "Lista de Usuarios":"Lista de Usuarios",
      "Datos de Acceso":"Datos de Acceso",
      "Empresas":"Empresas"
      


    },
  },
  en: {
    translation: {
      "Iniciar sesión": "Sign In",
      "Nombre de usuario": "Username",
      "Contraseña": "Password",
      "Olvidé mi contraseña": "Forgot my password",
      "Herramientas": "Tools",
      "Cubicuadraje": "Cubing",
      "Usuarios": "Users",
      "Reportes": "Reports",
      "Home": "Home",
      "Pedidos": "Orders",
      "Inventarios": "Inventories",
      "Devoluciones": "Returns",
      "Subir Archivo Excel": "Upload Excel File",
      "Camiones Utilizados": "Used Trucks",
      "Volumetría": "Volumetrics",
      "Asignaciones": "Assignments",
      "Productos": "Products",
      "Descargar Excel": "Download Excel",
      "Paquetería": "Freight",    
      "Administración de Usuarios": "User Administration",
      "Nombre": "First Name",
      "Apellido Paterno": "Last Name",
      "Apellido Materno": "Middle Name",
      "Fecha de nacimiento": "Date of Birth",
      "Correo Electrónico": "Email Address",
      "Teléfono": "Phone",
      "Calle": "Street",
      "Número Interior": "Interior Number",
      "Número Exterior": "Exterior Number",
      "Delegación o Municipio": "Borough or Municipality",
      "Ciudad o Estado": "City or State",
      "País": "Country",
      "Código Postal": "Zip Code",
      "Guardar Datos Básicos": "Save Basic Data",     
      "Datos Básicos":"Basic Data", 
      "Crear Usuario":"Create User",
      "Lista de Usuarios":"User List",
      "Datos de Acceso":"Access Data",
      "Empresas":"Enterprise"


    },
  },
  fr: {
    translation: {
      "Iniciar sesión": "Se connecter",
      "Nombre de usuario": "Nom d'utilisateur",
      "Contraseña": "Mot de passe",
      "Olvidé mi contraseña": "J'ai oublié mon mot de passe",
      "Herramientas": "Outils",
      "Cubicuadraje": "Cubage",
      "Usuarios": "Utilisateurs",
      "Reportes": "Rapports",
      "Home": "Accueil",
      "Pedidos": "Commandes",
      "Inventarios": "Inventaires",
      "Devoluciones": "Retours",
      "Subir Archivo Excel": "Télécharger le fichier Excel",
      "Camiones Utilizados": "Camions Utilisés",
      "Volumetría": "Volumétrie",
      "Asignaciones": "Assignations",
      "Productos": "Produits",
      "Descargar Excel": "Télécharger Excel",
      "Paquetería": "Fret",     
      "Administración de Usuarios": "Administration des utilisateurs",
      "Nombre": "Prénom",
      "Apellido Paterno": "Nom de famille",
      "Apellido Materno": "Deuxième nom",
      "Fecha de nacimiento": "Date de naissance",
      "Correo Electrónico": "Adresse e-mail",
      "Teléfono": "Téléphone",
      "Calle": "Rue",
      "Número Interior": "Numéro d'intérieur",
      "Número Exterior": "Numéro d'extérieur",
      "Delegación o Municipio": "Arrondissement ou Municipalité",
      "Ciudad o Estado": "Ville ou État",
      "País": "Pays",
      "Código Postal": "Code Postal",
      "Guardar Datos Básicos": "Enregistrer les données de base",     
      "Datos Básicos":"Données de Base",   
      "Crear Usuario":"Créer un utilisateur",
      "Lista de Usuarios":"Liste des utilisateurs",
      "Datos de Acceso":"Données d'Accès",
      "Empresas":"Société"

            // ... otras traducciones para francés
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es", // idioma por defecto
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
