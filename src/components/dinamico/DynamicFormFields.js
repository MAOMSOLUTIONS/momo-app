import React, { forwardRef } from 'react';

import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

const DynamicFormFields = forwardRef(({ formConfig, formValues, errors, handleInputChange }) => {

  return (
    <Grid container spacing={2}>
      {formConfig
        .filter((field) => field.visible !== false)
        .map((field) => (
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
                  error={!!errors[field.id]}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
                {errors[field.id] && (
                  <div style={{ color: 'red' }}>{errors[field.id]}</div>
                )}
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
                error={!!errors[field.id]}
                helperText={errors[field.id] ? errors[field.id] : ''}
              />
            )}
          </Grid>
        ))}
    </Grid>
  );
}
);

export default DynamicFormFields;
