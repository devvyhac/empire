// Form validation function
export const validateForm = (formData) => {
  let newErrors = {};
  const requiredFields = [
    "email",
    "address",
    "country",
    "city",
    "state",
    "zipCode",
  ];

  requiredFields.forEach((field) => {
    if (!formData[field] || String(formData[field]).trim() === "") {
      newErrors[field] = "This field is required.";
    }
  });

  return {
    errors: newErrors,
    isValid: Object.keys(newErrors).length === 0,
  };
};
