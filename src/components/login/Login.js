import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LogoImage from "../../images/returns.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './LoginStyles.css';

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const handleLogin = async () => {
    try {
      // Sanitiza los datos antes de enviarlos al servidor
      const sanitizedUsername = sanitizeInput(username);
      const sanitizedPassword = sanitizeInput(password);

      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        username: sanitizedUsername,
        password: sanitizedPassword,
      });

      if (response.data.success) {        
        setApiResponse(response.data);
        localStorage.setItem('userName', response.data.usuario);        
        localStorage.setItem('sessionToken', response.data.sessionToken);
        navigate("/home");
      } else {
        setApiResponse({ message: t('Error en el inicio de sesión. Por favor, intenta de nuevo.') }); // Mensaje general
      }
    } catch (error) {
      setApiResponse({ message: t('Error en el inicio de sesión. Por favor, intenta de nuevo.') }); // Manejo genérico de errores
      console.error(error);
    }
  };

  // Función para sanitizar la entrada (eliminar caracteres no deseados)
  const sanitizeInput = (input) => {
    return input.replace(/[^a-zA-Z0-9]/g, "");
  };

  useEffect(() => {
    // Al montar el componente, se verifica si hay un idioma guardado y se establece
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      changeLanguage(savedLanguage);
    }
  }, []);

  return (  
    <div style={{ display: 'flex', height: '70vh' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={LogoImage} alt="Logo" className="logo-image" />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <div className="language-buttons">
          <Button size="small" onClick={() => changeLanguage("es")}>Español</Button>
          <Button size="small" onClick={() => changeLanguage("en")}>English</Button>
          <Button size="small" onClick={() => changeLanguage("fr")}>Français</Button>
        </div>
        <Container component="main" maxWidth="xs">
          <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography component="h1" variant="h5">
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label={t('Nombre de usuario')}
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label={t('Contraseña')}
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ mt: 3, mb: 2 }}
            >
              {t('Iniciar sesión')}
            </Button>
            <Link component="button" variant="body2" onClick={() => navigate("/reset-password")}>
              {t('Olvidé mi contraseña')}
            </Link>
            {apiResponse && (
              <Typography variant="body2" color="error" align="center">
                {apiResponse.message}
              </Typography>
            )}
          </Box>
        </Container>

          {/* ... tus componentes de TextField y Button para el login */}
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
