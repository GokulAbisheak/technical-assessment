const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    if (!phone) return true
    const phoneRegex = /^(?:\+94|94|0)?7\d{8}$/
    return phoneRegex.test(phone)
  }

  export { validateEmail, validatePhone }
