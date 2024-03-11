import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const GenericForm = ({ formFields, initialValues, onSubmit }) => {
  const [formValues, setFormValues] = useState(initialValues || {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Grid container spacing={2}>
        {formFields.map((field) => (
          <Grid item xs={12} sm={field.sm} key={field.id}>
            {field.type === 'select' ? (
              <FormControl fullWidth margin="normal" required={field.required}>
                <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
                <Select
                  labelId={`${field.id}-label`}
                  id={field.id}
                  name={field.id}
                  value={formValues[field.id] || ''}
                  onChange={handleInputChange}
                  label={field.label}
                  disabled={field.disabled}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                id={field.id}
                name={field.id}
                label={field.label}
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={formValues[field.id] || ''}
                onChange={handleInputChange}
                type={field.type || 'text'}
                InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                required={field.required}
                disabled={field.disabled}
              />
            )}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default GenericForm;
