/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./distribution/*.html", 
    "./views/index.ejs"
  ],
 
  theme: {
    extend: {},
    fontFamily: {
      'main': ['Helvetica', 'Poppins']
      
    }
  },
  
  plugins: [],
}

