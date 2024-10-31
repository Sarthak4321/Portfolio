// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Custom Alert Modal</title>
//   <style>
//     /* Basic modal styling */
//     #myModal {
//       display: none;
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background-color: rgba(0, 0, 0, 0.5);
//       justify-content: center;
//       align-items: center;
//     }
//     .modal-content {
//       background-color: #fff;
//       padding: 60px;
//       border-radius: 8px;
//       text-align: center;
//     }
//     .close {
//       cursor: pointer;
//       color: #aaa;
//     }
//   </style>
// </head>
// <body>
//   <button onclick="openModal()">Show Custom Alert</button>

//   <div id="myModal">
//     <div class="modal-content">
//       <span class="close" onclick="closeModal()">&times;</span>
//       <p>This is a custom alert message!</p>
//     </div>
//   </div>

//   <script>
//     function openModal() {
//       document.getElementById("myModal").style.display = "flex";
//     }

//     function closeModal() {
//       document.getElementById("myModal").style.display = "none";
//     }
//   </script>


// window.onload = function addIng() {
//     setTimeout(function() {
//         alert("Hello! Welcome to our website.")
//         alert.classList.add('bg-red-500');
//     }, 2000); 
    
// };