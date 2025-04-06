/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./distribution/*.html", 
    "./views/index.ejs"
  ],
  // content: ["./views/**/*.{html,js,css}", "./views/**/*.ejs"],
 
  theme: {
    extend: {},
    fontFamily: {
      'main': ['Helvetica', 'Poppins']
      
    }
  },
  
  plugins: [],
}

