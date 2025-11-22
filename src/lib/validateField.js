 export const validateField = (col, value) => {
    if (!col.validation) return null;

    const { required, min, max, pattern } = col.validation;
    
    if (required && (!value || value.toString().trim() === "")) {
      return `${col.label} wajib diisi`;
    }

    if (col.type === "number" && value) {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return `${col.label} harus berupa angka`;
      }
      if (min !== undefined && numValue < min) {
        return `${col.label} minimal ${min}`;
      }
      if (max !== undefined && numValue > max) {
        return `${col.label} maksimal ${max}`;
      }
    }

    if ((col.type === "text" || col.type === "textarea") && value) {
      if (min !== undefined && value.length < min) {
        return `${col.label} minimal ${min} karakter`;
      }
      if (max !== undefined && value.length > max) {
        return `${col.label} maksimal ${max} karakter`;
      }
      if (pattern && !new RegExp(pattern).test(value)) {
        return `Format ${col.label} tidak valid`;
      }
    }

    if (col.type === "date" && value) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return `${col.label} tidak valid`;
      }
    }

    return null;
  };

  export const validateAllFields = (columns, editedData, setErrors) => {
    const newErrors = {};
    columns.forEach((col) => {
      const error = validateField(col, editedData[col.key]);
      if (error) {
        newErrors[col.key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };