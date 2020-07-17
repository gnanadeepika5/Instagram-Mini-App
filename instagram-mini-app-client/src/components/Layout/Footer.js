import React from 'react'

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Instagram-Mini-App
    </footer>
  )
}

export default Footer;